// src/api/server.js
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';
import VideoProcessor from './videoProcessor.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize video processor
const videoProcessor = new VideoProcessor();

// Middleware
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    const isVideo = file.originalname.match(/\.(mp4|mov|avi|mkv|webm)$/i);
    if (isVideo) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed'), false);
    }
  }
});

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Video Processing API',
    version: '1.0.0',
    endpoints: {
      'POST /api/process-video': 'Process video file for transcription and translation',
      'GET /api/health': 'Health check endpoint'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
// Main video processing endpoint
app.post('/api/process-video', upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No video file uploaded'
      });
    }

    const targetLanguages = req.body.targetLanguages 
      ? JSON.parse(req.body.targetLanguages) 
      : ['Spanish', 'French', 'German', 'Italian'];

    const result = await videoProcessor.processVideo({
      name: req.file.originalname,
      buffer: req.file.buffer,
      mimetype: req.file.mimetype
    }, targetLanguages);

    res.json(result);
    
  } catch (error) {
    console.error('Error processing video:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});
// Batch processing endpoint
app.post('/api/process-videos-batch', upload.array('videos', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No video files uploaded'
      });
    }

    const targetLanguages = req.body.targetLanguages 
      ? JSON.parse(req.body.targetLanguages) 
      : ['Spanish', 'French', 'German'];

    console.log(`Processing ${req.files.length} videos`);

    const results = [];
    
    for (const file of req.files) {
      console.log(`Processing: ${file.originalname}`);
      
      const result = await videoProcessor.processVideo({
        name: file.originalname,
        buffer: file.buffer,
        mimetype: file.mimetype
      }, targetLanguages);

      results.push({
        filename: file.originalname,
        ...result
      });
    }

    res.json({
      success: true,
      processedCount: results.length,
      results: results
    });

  } catch (error) {
    console.error('Error in batch processing:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'File too large. Maximum size is 100MB.'
      });
    }
  }
  
  res.status(500).json({
    success: false,
    error: error.message || 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Video Processing Server running on port ${PORT}`);
  console.log(`📝 API Documentation available at http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
});

export default app;
