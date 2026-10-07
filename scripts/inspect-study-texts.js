const { PUBLICATIONS } = require('../src/data/publications.ts');

const studyPubs = PUBLICATIONS.filter(p => p.type === 'Study & Chant Texts');
console.log(`Study & Chant Texts count: ${studyPubs.length}`);

// Group by parent collection or subcategories
studyPubs.forEach((p, idx) => {
  console.log(`${idx + 1}. [${p.id}] [${p.canonicalId}] "${p.title}" | Lang: ${p.language} | Cover: ${p.coverImage || 'NONE'} | DL: ${p.downloadUrl}`);
});
