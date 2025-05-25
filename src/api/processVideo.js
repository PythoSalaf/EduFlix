import ffmpeg from 'fluent-ffmpeg';

export function extractAudio(videoPath, outputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .output(outputPath)
      .audioCodec('pcm_s16le')
      .on('end', () => resolve(outputPath))
      .on('error', reject)
      .run();
  });
}
