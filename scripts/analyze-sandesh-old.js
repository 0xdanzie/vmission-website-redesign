const fs = require('fs');
const path = require('path');

const sOld = JSON.parse(fs.readFileSync(path.join(__dirname, 'archive_data', 'vedanta-sandesh.json'), 'utf8'));
const html = sOld.content?.rendered || '';
const h2s = [...html.matchAll(/<h[234][^>]*>([\s\S]*?)<\/h[234]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('Headings in older Vedanta Sandesh archive:', h2s);
