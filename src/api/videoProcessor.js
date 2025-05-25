// src/api/videoProcessor.js
import * as fs from 'fs/promises'; // Change import to use namespace import
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import Groq from 'groq-sdk';

const execAsync = promisify(exec);

class VideoProcessor {
  constructor() {
    this.groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });
    this.uploadsDir = 'uploads';
    this.tempDir = 'temp';
    this.ensureDirectories();
  }

  async ensureDirectories() {
    try {
      await fs.mkdir(this.uploadsDir, { recursive: true });
      await fs.mkdir(this.tempDir, { recursive: true });
    } catch (error) {
      console.error('Error creating directories:', error);
    }
  }

  // Extract audio from video file using FFmpeg
  async extractAudio(videoPath, outputPath) {
    try {
      const command = `ffmpeg -i "${videoPath}" -vn -acodec libmp3lame -ab 192k -ar 44100 -y "${outputPath}"`;
      await execAsync(command);
      return outputPath;
    } catch (error) {
      throw new Error(`Audio extraction failed: ${error.message}`);
    }
  }

  // Transcribe audio using Groq Whisper
  async transcribeAudio(audioPath) {
    try {
      const audioStream = await fs.readFile(audioPath);
      const blob = new Blob([audioStream], { type: 'audio/mpeg' });
      
      const transcription = await this.groq.audio.transcriptions.create({
        file: new File([blob], path.basename(audioPath), { type: 'audio/mpeg' }),
        model: "whisper-large-v3-turbo",
        response_format: "verbose_json",
        timestamp_granularities: ["word", "segment"],
        language: "en",
        temperature: 0.0,
      });

      return transcription;
    } catch (error) {
      throw new Error(`Transcription failed: ${error.message}`);
    }
  }

  // Translate text using Groq
  async translateText(text, targetLanguage) {
    try {
      const completion = await this.groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a professional translator. Translate the following text to ${targetLanguage}. Provide only the translation without any additional commentary.`
          },
          {
            role: "user",
            content: text
          }
        ],
        model: "llama3-8b-8192",
        temperature: 0.1,
      });

      return completion.choices[0]?.message?.content || '';
    } catch (error) {
      throw new Error(`Translation to ${targetLanguage} failed: ${error.message}`);
    }
  }

  // Translate to multiple languages
  async translateToMultipleLanguages(text, targetLanguages) {
    const translations = {};
    
    for (const language of targetLanguages) {
      try {
        translations[language] = await this.translateText(text, language);
      } catch (error) {
        console.error(`Translation to ${language} failed:`, error);
        translations[language] = { error: error.message };
      }
    }

    return translations;
  }

  // Clean up temporary files
  async cleanup(filePaths) {
    for (const filePath of filePaths) {
      try {
        await fs.unlink(filePath);
      } catch (error) {
        console.error(`Failed to delete ${filePath}:`, error);
      }
    }
  }

  // Main processing function
  async processVideo(videoFile, targetLanguages = ['Spanish', 'French', 'German', 'Italian']) {
    const timestamp = Date.now();
    const videoPath = path.join(this.uploadsDir, `video_${timestamp}${path.extname(videoFile.name)}`);
    const audioPath = path.join(this.tempDir, `audio_${timestamp}.mp3`);
    const filesToCleanup = [videoPath, audioPath];

    try {
      // Save uploaded video file
      await fs.writeFile(videoPath, videoFile.buffer);

      // Step 1: Extract audio from video
      console.log('Extracting audio from video...');
      await this.extractAudio(videoPath, audioPath);

      // Step 2: Transcribe audio
      console.log('Transcribing audio...');
      const transcription = await this.transcribeAudio(audioPath);

      // Step 3: Translate transcription
      console.log('Translating transcription...');
      const translations = await this.translateToMultipleLanguages(
        transcription.text,
        targetLanguages
      );

      // Step 4: Clean up temporary files
      await this.cleanup(filesToCleanup);

      // Return structured response
      return {
        success: true,
        data: {
          original: {
            text: transcription.text,
            language: transcription.language || 'en',
            duration: transcription.duration,
            segments: transcription.segments,
            words: transcription.words
          },
          translations: translations,
          metadata: {
            processedAt: new Date().toISOString(),
            videoFile: videoFile.name,
            targetLanguages: targetLanguages
          }
        }
      };

    } catch (error) {
      // Clean up files in case of error
      await this.cleanup(filesToCleanup);
      
      return {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
}

export default VideoProcessor;