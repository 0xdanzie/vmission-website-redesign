const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'videos.html'), 'utf8');

// In Elementor, each column or section has heading + video or button
// Let's parse all sections/columns
const blocks = html.split(/class="elementor-column /);
console.log('Total column blocks:', blocks.length);

const items = [];

for (const b of blocks) {
  const plMatch = b.match(/href="https:\/\/www\.youtube\.com\/playlist\?list=([^"&]+)/);
  if (plMatch) {
    const pid = plMatch[1];
    // Find the heading in this block
    const hMatch = b.match(/<h[2-6][^>]*>([\s\S]*?)<\/h[2-6]>/);
    let heading = hMatch ? hMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : 'Unknown';
    // Check if there is an embed video url too
    const vMatch = b.match(/youtube_url&quot;:&quot;([^&]+)&quot;/);
    const videoUrl = vMatch ? vMatch[1].replace(/\\\//g, '/') : null;
    items.push({ pid, heading, videoUrl });
  }
}

console.log(`Found ${items.length} playlists with headings:`);
items.forEach((it, idx) => {
  console.log(`${idx + 1}. [${it.pid}] -> "${it.heading}" (Video: ${it.videoUrl || 'none'})`);
});
