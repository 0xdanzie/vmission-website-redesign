const fs = require('fs');
const path = require('path');

const piyushRaw = JSON.parse(fs.readFileSync(path.join(__dirname, 'archive_data', 'vedanta-piyush-ezine.json'), 'utf8'));
const html = piyushRaw.content?.rendered || '';

console.log('Piyush HTML length:', html.length);

const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
const images = [];
let m;
while ((m = imgRegex.exec(html)) !== null) {
  images.push(m[1]);
}
console.log('Found total images in piyush:', images.length);
console.log('Sample images:', images.slice(0, 10));

const tableRegex = /<table[^>]*>([\s\S]*?)<\/table>/gi;
const tables = [];
while ((m = tableRegex.exec(html)) !== null) {
  tables.push(m[1]);
}
console.log('Found total tables in piyush:', tables.length);
if (tables.length > 0) {
  console.log('Sample table 1:', tables[0]);
}
