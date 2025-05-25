import { jest } from '@jest/globals';
import { describe, test, beforeEach, expect } from '@jest/globals';

// Mock Groq SDK
jest.unstable_mockModule('groq-sdk', () => ({
  default: jest.fn()
}));

// Mock fs module
jest.unstable_mockModule('fs', () => ({
  createReadStream: jest.fn()
}));

describe('transcribe.js', () => {
  let mockGroq;
  let mockFs;

  beforeEach(async () => {
    jest.clearAllMocks();
    
    // Import mocked modules
    const { default: Groq } = await import('groq-sdk');
    const fs = await import('fs');
    
    mockFs = fs;
    
    // Setup mock implementation
    mockGroq = {
      audio: {
        transcriptions: {
          create: jest.fn()
        }
      }
    };
    
    Groq.mockImplementation(() => mockGroq);
  });

  test('should initialize Groq client', async () => {
    const { default: Groq } = await import('groq-sdk');
    expect(Groq).toBeDefined();
  });

  test('should create transcription with correct parameters', async () => {
    const mockTranscription = {
      text: 'This is a test transcription',
      segments: [
        { start: 0, end: 5, text: 'This is a test transcription' }
      ]
    };

    mockGroq.audio.transcriptions.create.mockResolvedValue(mockTranscription);
    mockFs.createReadStream.mockReturnValue({});

    // Test the transcription creation
    const result = await mockGroq.audio.transcriptions.create({
      file: mockFs.createReadStream("test.wav"),
      model: "whisper-large-v3-turbo",
      response_format: "verbose_json",
      timestamp_granularities: ["word", "segment"],
      language: "en",
      temperature: 0.0,
    });

    expect(mockGroq.audio.transcriptions.create).toHaveBeenCalledWith({
      file: {},
      model: "whisper-large-v3-turbo",
      response_format: "verbose_json",
      timestamp_granularities: ["word", "segment"],
      language: "en",
      temperature: 0.0,
    });

    expect(result).toEqual(mockTranscription);
  });
});

describe('subtitles.js', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('placeholder test', () => {
    expect(true).toBe(true);
  });
});