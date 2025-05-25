# EduFlix Video Processing Backend

A comprehensive backend system that processes video files to extract audio, transcribe speech to text using OpenAI Whisper via Groq SDK, and translate the transcription into multiple languages.

## Features

- 🎥 **Video Processing**: Accepts various video formats (.mp4, .mov, .avi, .webm)
- 🎵 **Audio Extraction**: Uses FFmpeg to extract high-quality audio from videos  
- 🗣️ **Speech Transcription**: Leverages Groq's Whisper API for accurate transcription
- 🌍 **Multi-language Translation**: Translates content into multiple target languages
- 📊 **Detailed Metadata**: Returns timestamps, segments, and word-level data
- 🚀 **Batch Processing**: Process multiple videos simultaneously
- 🛡️ **Error Handling**: Comprehensive error handling and cleanup

## Prerequisites

1. **Node.js** (v18 or higher)
2. **FFmpeg** installed on your system
3. **Groq API Key** - Get one from [Groq Console](https://console.groq.com/)

### Installing FFmpeg

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install ffmpeg
```

**macOS:**
```bash
brew install ffmpeg
```

**Windows:**
Download from [https://ffmpeg.org/download.html](https://ffmpeg.org/download.html)

## Installation

1. **Install dependencies:**
```bash
npm install express multer cors dotenv groq-sdk nodemon
```

2. **Create environment file:**
```bash
cp .env.example .env
```

3. **Configure your `.env` file:**
```env
GROQ_API_KEY=your_groq_api_key_here
PORT=3001
```

4. **Create required directories:**
```bash
mkdir uploads temp
```

## Usage

### Start the Server

**Development mode:**
```bash
npm run server:dev
```

**Production mode:**
```bash
npm run server
```

The server will start on `http://localhost:3001`

### API Endpoints

#### 1. Health Check
```http
GET /api/health
```

#### 2. Process Single Video
```http
POST /api/process-video
Content-Type: multipart/form-data

Form Data:
- video: (file) Video file to process
- targetLanguages: (optional) JSON array of target languages
```

**Example using cURL:**
```bash
curl -X POST \
  http://localhost:3001/api/process-video \
  -F "video=@your-video.mp4" \
  -F 'targetLanguages=["Spanish", "French", "German"]'
```

#### 3. Batch Process Videos
```http
POST /api/process-videos-batch
Content-Type: multipart/form-data

Form Data:
- videos: (files) Multiple video files (max 5)
- targetLanguages: (optional) JSON array of target languages
```

### Response Format

**Success Response:**
```json
{
  "success": true,
  "data": {
    "original": {
      "text": "Hello, welcome to our presentation...",
      "language": "en",
      "duration": 45.2,
      "segments": [
        {
          "start": 0,
          "end": 3.5,
          "text": "Hello, welcome to our presentation"
        }
      ],
      "words": [
        {
          "word": "Hello",
          "start": 0,
          "end": 0.8
        }
      ]
    },
    "translations": {
      "Spanish": "Hola, bienvenidos a nuestra presentación...",
      "French": "Bonjour, bienvenue à notre présentation...",
      "German": "Hallo, willkommen zu unserer Präsentation..."
    },
    "metadata": {
      "processedAt": "2024-01-15T10:30:00.000Z",
      "videoFile": "presentation.mp4",
      "targetLanguages": ["Spanish", "French", "German"]
    }
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message here",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Supported Languages

The system can translate to any language supported by the Groq LLM. Common languages include:

- Spanish
- French  
- German
- Italian
- Portuguese
- Dutch
- Russian
- Chinese (Simplified/Traditional)
- Japanese
- Korean
- Arabic
- Hindi

## File Size Limits

- Maximum file size: 100MB per video
- Supported formats: .mp4, .mov, .avi, .webm, .mpeg
- Batch processing: Up to 5 videos simultaneously

## Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## Architecture

```
├── server.js              # Express server setup
├── src/
│   └── api/
│       ├── videoProcessor.js    # Main processing logic
│       └── videoProcessor.test.js # Unit tests
├── uploads/               # Temporary video storage
├── temp/                 # Temporary audio files
└── .env                  # Environment configuration
```

## Error Handling

The system includes comprehensive error handling for:

- Invalid file formats
- FFmpeg processing errors  
- Groq API failures
- File system operations
- Network timeouts
- Memory constraints

## Performance Considerations

- Audio files are processed in memory when possible
- Temporary files are automatically cleaned up
- Concurrent processing is limited to prevent resource exhaustion
- File size limits prevent system overload

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Check the [Issues](https://github.com/your-repo/issues) page
- Review the API documentation
- Ensure FFmpeg is properly installed
- Verify your Groq API key is valid