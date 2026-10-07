const fs = require('fs');
const path = require('path');
const { PUBLICATIONS } = require('../src/data/publications.ts');

console.log(`Total publications loaded: ${PUBLICATIONS.length}`);

const results = [];

const imageHashMap = {}; // to detect duplicate images if needed
const coverUsage = {};

PUBLICATIONS.forEach((p, idx) => {
  const cover = p.coverImage || '';
  coverUsage[cover] = (coverUsage[cover] || 0) + 1;
  
  let exists = false;
  let absPath = '';
  if (cover && cover.startsWith('/images/')) {
    absPath = path.join(__dirname, '..', 'public', cover);
    exists = fs.existsSync(absPath);
  }
  
  results.push({
    index: idx,
    id: p.id,
    canonicalId: p.canonicalId || p.id,
    title: p.title,
    type: p.type,
    year: p.year,
    month: p.month,
    coverImage: p.coverImage,
    fileExists: exists,
    absPath
  });
});

console.log("\nSummary of coverImage values:");
const coverSummary = Object.entries(coverUsage).map(([img, count]) => ({
  cover: img || '(empty/null)',
  count,
  exists: img ? fs.existsSync(path.join(__dirname, '..', 'public', img)) : 'N/A'
}));
console.log(coverSummary);

const missingFiles = results.filter(r => r.coverImage && !r.fileExists);
console.log(`\nCover images pointing to non-existent files: ${missingFiles.length}`);
if (missingFiles.length > 0) {
  console.log(missingFiles);
}

const emptyCoversByType = {};
results.filter(r => !r.coverImage).forEach(r => {
  emptyCoversByType[r.type] = (emptyCoversByType[r.type] || 0) + 1;
});
console.log('\nEmpty/null covers by type:', emptyCoversByType);

const populatedCoversByType = {};
results.filter(r => r.coverImage).forEach(r => {
  populatedCoversByType[r.type] = (populatedCoversByType[r.type] || 0) + 1;
});
console.log('Populated covers by type:', populatedCoversByType);
