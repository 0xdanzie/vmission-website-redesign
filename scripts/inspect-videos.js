const fs = require('fs');
const path = require('path');

const videosRaw = JSON.parse(fs.readFileSync(path.join(__dirname, 'archive_data', 'vm-videos-2.json'), 'utf8'));
const html = videosRaw.content?.rendered || '';

console.log('Videos HTML length:', html.length);
fs.writeFileSync(path.join(__dirname, 'videos.html'), html);

// Extract all YouTube links and titles/headings
const ytRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]+)/gi;
const ytLinks = [];
let m;
while ((m = ytRegex.exec(html)) !== null) {
  ytLinks.push(m[0]);
}
console.log('Total YouTube matches:', ytLinks.length);
console.log('Unique YouTube links:', Array.from(new Set(ytLinks)));

// Look for headings or titles around them
const titleRegex = /<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi;
const headings = [];
while ((m = titleRegex.exec(html)) !== null) {
  headings.push(m[1].replace(/<[^>]+>/g, '').trim());
}
console.log('Headings found in videos page:', headings);
