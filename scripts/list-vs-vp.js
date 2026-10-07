const fs = require('fs');
const path = require('path');
const { PUBLICATIONS } = require('../src/data/publications.ts');

const vsItems = PUBLICATIONS.filter(p => p.type === 'Vedanta Sandesh');
const vpItems = PUBLICATIONS.filter(p => p.type === 'Vedanta Piyush');

console.log(`=== VEDANTA SANDESH (${vsItems.length}) ===`);
vsItems.forEach((p, idx) => {
  console.log(`${idx + 1}. [${p.id}] [${p.canonicalId}] "${p.title}" | Year: ${p.year} | Month: ${p.month} | DL: ${p.downloadUrl}`);
});

console.log(`\n=== VEDANTA PIYUSH (${vpItems.length}) ===`);
vpItems.forEach((p, idx) => {
  console.log(`${idx + 1}. [${p.id}] [${p.canonicalId}] "${p.title}" | Year: ${p.year} | Month: ${p.month} | DL: ${p.downloadUrl}`);
});
