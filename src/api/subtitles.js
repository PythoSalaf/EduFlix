import fs from 'fs';

// Add this function that's being tested
function formatTime(seconds) {
  const date = new Date(0);
  date.setSeconds(seconds);
  const timeStr = date.toISOString().substring(11, 19);
  const ms = Math.floor((seconds % 1) * 1000).toString().padStart(3, '0');
  return `${timeStr},${ms}`;
}

export function generateSRT(transcript, filePath) {
  const srtContent = transcript.segments.map((seg, i) => 
    `${i + 1}\n${formatTime(seg.start)} --> ${formatTime(seg.end)}\n${seg.text}\n`
  ).join('\n');

  fs.writeFileSync(filePath, srtContent);
}

// Export the formatTime function for testing
export { formatTime };
