const fs = require('fs');
const path = require('path');

const sOld = JSON.parse(fs.readFileSync(path.join(__dirname, 'archive_data', 'vedanta-sandesh.json'), 'utf8'));
const html = sOld.content?.rendered || '';

// extract all links with their surrounding text
const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
const links = [];
let m;
while ((m = linkRegex.exec(html)) !== null) {
  const text = m[2].replace(/<[^>]+>/g, '').trim();
  if (text) {
    links.push({ href: m[1], text });
  }
}
console.log('Total non-empty links in older Sandesh:', links.length);
console.log('Sample links:', links.slice(0, 20));
