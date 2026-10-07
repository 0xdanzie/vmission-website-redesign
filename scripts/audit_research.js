const fs = require('fs');
const path = require('path');

const pt = JSON.parse(fs.readFileSync(path.join(__dirname, 'archive_data', 'pravachan-text.json'), 'utf8'));
const html = pt.content.rendered;

const regex = /<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
let match;
while ((match = regex.exec(html)) !== null) {
  const href = match[1];
  const text = match[2].replace(/<[^>]+>/g, '').trim();
  // find preceding text or heading
  const pre = html.substring(Math.max(0, match.index - 150), match.index).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log(`LINK: ${href} | TEXT: ${text} | CONTEXT: ${pre}`);
}
