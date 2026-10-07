const fs = require('fs');
const path = require('path');
const { PUBLICATIONS } = require('../src/data/publications.ts');

const studyPubs = PUBLICATIONS.filter(p => p.type === 'Study & Chant Texts');
const pubDir = path.join(__dirname, '..', 'public', 'images', 'vmission', 'publications');
const files = fs.readdirSync(pubDir).filter(f => f.startsWith('study-text-'));

console.log('Available study text files on disk:');
files.forEach(f => console.log(' - ' + f));

console.log('\nMatching against 80 Study & Chant Texts:');
studyPubs.forEach(p => {
  // Check if title or id matches any file
  const matches = [];
  files.forEach(f => {
    // If f is tb-mula, SKIP! strictly isolated to book-000353
    if (f === 'study-text-tb-mula.jpg') return;
    
    // Check keyword
    const base = f.replace('study-text-', '').replace(/\.(jpg|png)$/, '');
    const cleanTitle = p.title.toLowerCase().replace(/[^a-z0-9]/g, ' ');
    if (cleanTitle.includes(base.replace(/-/g, ' '))) {
      matches.push(f);
    }
  });
  if (matches.length > 0) {
    console.log(`[${p.id}] ${p.canonicalId}: "${p.title}" -> Matched: ${matches.join(', ')}`);
  }
});
