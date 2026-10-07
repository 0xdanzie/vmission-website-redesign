const fs = require('fs');
const path = require('path');

const sOld = JSON.parse(fs.readFileSync(path.join(__dirname, 'archive_data', 'vedanta-sandesh.json'), 'utf8'));
const html = sOld.content?.rendered || '';
console.log('Old Sandesh text snippet:', html.slice(0, 1000));
