const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'ebooks.html'), 'utf8');
const regex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
let m;
while ((m = regex.exec(html)) !== null) {
  console.log(m[1]);
}
