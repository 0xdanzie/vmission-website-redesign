const fs = require('fs');
const { PUBLICATIONS } = require('../src/data/publications.ts');

const extracted = JSON.parse(fs.readFileSync('./scripts/sandesh_extracted.json', 'utf8'));
const currentPubIds = new Set(PUBLICATIONS.map(p => p.id));
const currentPubTitles = new Set(PUBLICATIONS.map(p => p.title));

console.log(`Extracted VS count: ${extracted.length}`);
let inPubs = 0;
let notInPubs = [];

extracted.forEach(ex => {
  if (currentPubIds.has(ex.id) || currentPubTitles.has(ex.title)) {
    inPubs++;
  } else {
    notInPubs.push(ex);
  }
});

console.log(`Extracted VS in current PUBLICATIONS: ${inPubs}`);
console.log(`Extracted VS NOT in current PUBLICATIONS: ${notInPubs.length}`);
console.log('Sample not in pubs:', notInPubs.slice(0, 5).map(x => ({ id: x.id, title: x.title, year: x.year })));
