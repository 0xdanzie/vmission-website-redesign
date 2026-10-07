const fs = require('fs');
const path = require('path');

const sandeshRaw = JSON.parse(fs.readFileSync(path.join(__dirname, 'archive_data', 'vedanta-sandesh-ezine.json'), 'utf8'));
const html = sandeshRaw.content?.rendered || '';

console.log('HTML length:', html.length);
fs.writeFileSync(path.join(__dirname, 'sandesh.html'), html);
console.log('Written sandesh.html');
