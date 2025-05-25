import { generateSRT, formatTime } from './subtitles';
import { translateText } from './translate';
import { transcribeAudio } from './transcribe';
import { extractAudio } from './processVideo';
import fs from 'fs';
import fetch from 'node-fetch';
import Groq from 'groq-sdk';

// Mock dependencies
jest.mock('fs');
jest.mock('node-fetch');
jest.mock('groq-sdk');

// Mock fluent-ffmpeg manually since it's causing issues
jest.mock('fluent-ffmpeg', () => {
  return jest.fn().mockImplementation(() => {
    return {
      output: jest.fn().mockReturnThis(),
      audioCodec: jest.fn().mockReturnThis(),
      on: jest.fn(function(event, callback) {
        if (event === 'end') {
          process.nextTick(callback);
        }
        return this;
      }),
      run: jest.fn()
    };
  });
});

describe('subtitles.js', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('generateSRT should create correctly formatted SRT file', () => {
    const mockTranscript = {
      segments: [
        { start: 0, end: 2.5, text: 'Hello world' },
        { start: 2.6, end: 5.2, text: 'This is a test' }
      ]
    };
    const filePath = '/test/output.srt';
    
    generateSRT(mockTranscript, filePath);
    
    // Check if writeFileSync was called with correct parameters
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      filePath,
      '1\n00:00:00,000 --> 00:00:02,500\nHello world\n\n2\n00:00:02,600 --> 00:00:05,200\nThis is a test\n'
    );
  });

  test('generateSRT should handle empty segments', () => {
    const mockTranscript = { segments: [] };
    const filePath = '/test/empty.srt';
    
    generateSRT(mockTranscript, filePath);
    
    expect(fs.writeFileSync).toHaveBeenCalledWith(filePath, '');
  });

  test('generateSRT should throw error if file path is invalid', () => {
    const mockTranscript = { segments: [{ start: 0, end: 1, text: 'test' }] };
    const filePath = '/invalid/path/file.srt';
    
    fs.writeFileSync.mockImplementation(() => {
      throw new Error('Invalid file path');
    });
    
    expect(() => generateSRT(mockTranscript, filePath)).toThrow('Invalid file path');
  });
});

describe('translate.js', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('translateText should return translated text', async () => {
    // Mock fetch response
    const mockResponse = {
      json: jest.fn().resolves([[["Hola", "Hello"]]]),
    };
    fetch.mockResolvedValue(mockResponse);
    
    const result = await translateText('Hello', 'es');
    
    expect(fetch).toHaveBeenCalled();
    expect(result).toBe('Hola');
  });

  test('translateText should handle empty input', async () => {
    const mockResponse = {
      json: jest.fn().resolves([[["", ""]]]),
    };
    fetch.mockResolvedValue(mockResponse);
    
    const result = await translateText('', 'es');
    
    expect(result).toBe('');
  });

  test('translateText should handle fetch error', async () => {
    fetch.mockRejectedValue(new Error('Network error'));
    
    await expect(translateText('Hello', 'es')).rejects.toThrow('Network error');
  });

  test('translateText should handle unexpected response format', async () => {
    const mockResponse = {
      json: jest.fn().resolves({}), // Empty response
    };
    fetch.mockResolvedValue(mockResponse);
    
    const result = await translateText('Hello', 'es');
    
    expect(result).toBeUndefined();
  });
});

describe('transcribe.js', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('transcribeAudio should return transcription', async () => {
    // Mock transcription response
    const mockTranscription = {
      text: 'This is a transcribed text',
      segments: [
        { text: 'This is', start: 0, end: 1 },
        { text: 'a transcribed text', start: 1, end: 3 }
      ]
    };
    
    // Mock Groq instance and createReadStream
    const mockGroqInstance = {
      audio: {
        transcriptions: {
          create: jest.fn().mockResolvedValue(mockTranscription)
        }
      }
    };
    Groq.mockImplementation(() => mockGroqInstance);
    fs.createReadStream.mockReturnValue('audio-stream');
    
    const result = await transcribeAudio('/test/audio.wav');
    
    expect(fs.createReadStream).toHaveBeenCalledWith('/test/audio.wav');
    expect(mockGroqInstance.audio.transcriptions.create).toHaveBeenCalledWith({
      file: 'audio-stream',
      model: "whisper-large-v3-turbo",
      response_format: "verbose_json",
      language: "en",
    });
    expect(result).toEqual(mockTranscription);
  });

  test('transcribeAudio should handle missing file', async () => {
    fs.createReadStream.mockImplementation(() => {
      throw new Error('File not found');
    });
    
    await expect(transcribeAudio('/missing/file.wav')).rejects.toThrow('File not found');
  });

  test('transcribeAudio should handle API failure', async () => {
    const mockGroqInstance = {
      audio: {
        transcriptions: {
          create: jest.fn().mockRejectedValue(new Error('API error'))
        }
      }
    };
    Groq.mockImplementation(() => mockGroqInstance);
    fs.createReadStream.mockReturnValue('audio-stream');
    
    await expect(transcribeAudio('/test/audio.wav')).rejects.toThrow('API error');
  });
});

describe('processVideo.js', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('extractAudio should resolve with output path on success', async () => {
    // Mock ffmpeg chain
    const mockOn = jest.fn().mockImplementation(function(event, callback) {
      if (event === 'end') setTimeout(callback, 10);
      return this;
    });
    
    const mockRun = jest.fn();
    
    const mockFfmpeg = jest.fn().mockReturnValue({
      output: jest.fn().mockReturnThis(),
      audioCodec: jest.fn().mockReturnThis(),
      on: mockOn,
      run: mockRun
    });
    
    ffmpeg.mockImplementation(mockFfmpeg);
    
    const result = await extractAudio('/test/video.mp4', '/test/audio.wav');
    
    expect(mockFfmpeg).toHaveBeenCalledWith('/test/video.mp4');
    expect(result).toBe('/test/audio.wav');
  });

  test('extractAudio should reject on error', async () => {
    // Mock ffmpeg chain with error
    const mockOn = jest.fn().mockImplementation(function(event, callback) {
      if (event === 'error') setTimeout(() => callback(new Error('ffmpeg error')), 10);
      return this;
    });
    
    const mockRun = jest.fn();
    
    const mockFfmpeg = jest.fn().mockReturnValue({
      output: jest.fn().mockReturnThis(),
      audioCodec: jest.fn().mockReturnThis(),
      on: mockOn,
      run: mockRun
    });
    
    ffmpeg.mockImplementation(mockFfmpeg);
    
    await expect(extractAudio('/invalid/video.mp4', '/test/audio.wav'))
      .rejects.toThrow('ffmpeg error');
  });
});
