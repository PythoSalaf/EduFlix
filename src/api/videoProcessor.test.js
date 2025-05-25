// src/api/videoProcessor.test.js
import { jest } from '@jest/globals';
import { describe, test, beforeEach, expect } from '@jest/globals';

// Mock dependencies
jest.unstable_mockModule('groq-sdk', () => ({
  default: jest.fn()
}));

// Fix fs/promises mock to use namespace pattern
jest.unstable_mockModule('fs/promises', () => ({
  mkdir: jest.fn(),
  writeFile: jest.fn(),
  readFile: jest.fn(),
  unlink: jest.fn()
}));

jest.unstable_mockModule('child_process', () => ({
  exec: jest.fn()
}));

describe('VideoProcessor', () => {
  let VideoProcessor;
  let mockGroq;
  let mockFs;

  beforeEach(async () => {
    jest.clearAllMocks();
    
    // Import mocked modules
    const { default: Groq } = await import('groq-sdk');
    const fs = await import('fs/promises');
    
    mockFs = fs;
    
    // Setup mock Groq client
    mockGroq = {
      audio: {
        transcriptions: {
          create: jest.fn()
        }
      },
      chat: {
        completions: {
          create: jest.fn()
        }
      }
    };
    
    Groq.mockImplementation(() => mockGroq);
    
    // Fix VideoProcessor import
    const videoProcessorModule = await import('./videoProcessor.js');
    VideoProcessor = videoProcessorModule.default;
  });

  test('should initialize VideoProcessor', () => {
    const processor = new VideoProcessor();
    expect(processor).toBeDefined();
  });

  test('should transcribe audio successfully', async () => {
    const processor = new VideoProcessor();
    const mockTranscription = {
      text: 'Hello, this is a test transcription.',
      language: 'en',
      duration: 10.5,
      segments: [
        { start: 0, end: 5, text: 'Hello, this is a test' },
        { start: 5, end: 10.5, text: 'transcription.' }
      ],
      words: [
        { word: 'Hello', start: 0, end: 1 },
        { word: 'this', start: 1.5, end: 2 }
      ]
    };

    mockGroq.audio.transcriptions.create.mockResolvedValue(mockTranscription);
    mockFs.readFile.mockResolvedValue(Buffer.from('fake audio data'));

    const result = await processor.transcribeAudio('test.mp3');
    
    expect(mockGroq.audio.transcriptions.create).toHaveBeenCalledWith({
      file: expect.any(File),
      model: "whisper-large-v3-turbo",
      response_format: "verbose_json",
      timestamp_granularities: ["word", "segment"],
      language: "en",
      temperature: 0.0,
    });
    
    expect(result).toEqual(mockTranscription);
  });

  test('should translate text successfully', async () => {
    const processor = new VideoProcessor();
    const mockTranslation = {
      choices: [{
        message: {
          content: 'Hola, esta es una transcripción de prueba.'
        }
      }]
    };

    mockGroq.chat.completions.create.mockResolvedValue(mockTranslation);

    const result = await processor.translateText('Hello, this is a test transcription.', 'Spanish');
    
    expect(mockGroq.chat.completions.create).toHaveBeenCalledWith({
      messages: [
        {
          role: "system",
          content: "You are a professional translator. Translate the following text to Spanish. Provide only the translation without any additional commentary."
        },
        {
          role: "user",
          content: "Hello, this is a test transcription."
        }
      ],
      model: "llama3-8b-8192",
      temperature: 0.1,
    });
    
    expect(result).toBe('Hola, esta es una transcripción de prueba.');
  });

  test('should translate to multiple languages', async () => {
    const processor = new VideoProcessor();
    const mockTranslations = {
      Spanish: { choices: [{ message: { content: 'Hola mundo' } }] },
      French: { choices: [{ message: { content: 'Bonjour le monde' } }] }
    };

    mockGroq.chat.completions.create
      .mockResolvedValueOnce(mockTranslations.Spanish)
      .mockResolvedValueOnce(mockTranslations.French);

    const result = await processor.translateToMultipleLanguages('Hello world', ['Spanish', 'French']);
    
    expect(result).toEqual({
      Spanish: 'Hola mundo',
      French: 'Bonjour le monde'
    });
  });

  test('should handle transcription errors', async () => {
    const processor = new VideoProcessor();
    
    mockGroq.audio.transcriptions.create.mockRejectedValue(new Error('API Error'));
    mockFs.readFile.mockResolvedValue(Buffer.from('fake audio data'));

    await expect(processor.transcribeAudio('test.mp3')).rejects.toThrow('Transcription failed: API Error');
  });

  test('should handle translation errors', async () => {
    const processor = new VideoProcessor();
    
    mockGroq.chat.completions.create.mockRejectedValue(new Error('Translation API Error'));

    await expect(processor.translateText('Hello', 'Spanish')).rejects.toThrow('Translation to Spanish failed: Translation API Error');
  });
});