const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'sandesh.html'), 'utf8');

// Find headings or year sections
const yearMatches = [...html.matchAll(/(?:VS\s*-\s*|VEDANTA SANDESH\s*-\s*|Year\s*|VS\s*)?(20[12][0-9])/gi)];
console.log('Detected year references:', Array.from(new Set(yearMatches.map(m => m[1]))));

// Look at some sample image tags and surrounding links
const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
const images = [];
let m;
while ((m = imgRegex.exec(html)) !== null) {
  images.push(m[1]);
}
console.log('Found total images in sandesh:', images.length);
console.log('Sample images:', images.slice(0, 10));

// Look at tables or link blocks
const tableRegex = /<table[^>]*>([\s\S]*?)<\/table>/gi;
const tables = [];
while ((m = tableRegex.exec(html)) !== null) {
  tables.push(m[1]);
}
console.log('Found total tables:', tables.length);
if (tables.length > 0) {
  console.log('Sample table 1:', tables[0]);
}
