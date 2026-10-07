const fs = require('fs');
const path = require('path');

// 1. Read teachings.ts
const teachingsContent = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'teachings.ts'), 'utf8');

const teachingsStart = teachingsContent.indexOf('export const TEACHINGS: Teaching[] = [');
const arrayStart = teachingsContent.indexOf('[', teachingsStart);
const arrayEnd = teachingsContent.lastIndexOf('];');
const raw = teachingsContent.substring(arrayStart, arrayEnd + 1);
const teachings = JSON.parse(raw);
console.log('Total teachings loaded from teachings.ts:', teachings.length);

// 2. Read authoritative videos.html audit
const html = fs.readFileSync(path.join(__dirname, 'videos.html'), 'utf8');
const blocks = html.split(/class="elementor-column /);
const sourceMap = new Map();

for (const b of blocks) {
  const plMatch = b.match(/href="https:\/\/www\.youtube\.com\/playlist\?list=([^"&]+)/);
  if (plMatch) {
    const pid = plMatch[1];
    const hMatch = b.match(/<h[2-6][^>]*>([\s\S]*?)<\/h[2-6]>/);
    let heading = hMatch ? hMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : 'Unknown';
    const vMatch = b.match(/youtube_url&quot;:&quot;([^&]+)&quot;/);
    const videoUrl = vMatch ? vMatch[1].replace(/\\\//g, '/') : null;
    if (!sourceMap.has(pid)) {
      sourceMap.set(pid, { pid, heading, videoUrl });
    }
  }
}

console.log('Authoritative unique playlists in videos.html:', sourceMap.size);

console.log('\n--- FORENSIC CROSS-CHECK: TEACHINGS VS SOURCE PLAYLISTS ---');
teachings.forEach((t, i) => {
  const src = sourceMap.get(t.playlistId);
  const srcHeading = src ? src.heading : 'NOT FOUND IN SOURCE';
  const srcVideo = src ? src.videoUrl : 'N/A';
  
  // Simple heuristic check
  const titleLower = t.title.toLowerCase();
  const headingLower = srcHeading.toLowerCase();
  
  console.log(`[${i + 1}] ID: ${t.id} | Title: "${t.title}"`);
  console.log(`    Playlist: ${t.playlistId}`);
  console.log(`    Source Heading: "${srcHeading}"`);
  console.log(`    Source First Video: ${srcVideo}`);
  console.log('----------------------------------------------------');
});
