const { PUBLICATIONS } = require('../src/data/publications.ts');

const vs = PUBLICATIONS.filter(p => p.type === 'Vedanta Sandesh');
console.log(`Total VS: ${vs.length}`);

// Group by year
const byYear = {};
vs.forEach(p => {
  byYear[p.year] = (byYear[p.year] || 0) + 1;
});
console.log('VS by Year:', byYear);

// Let's print each year's VS titles
[2021, 2020, 2019].forEach(y => {
  console.log(`\n--- Year ${y} ---`);
  vs.filter(p => p.year === y).forEach(p => {
    console.log(`  ${p.id} | ${p.canonicalId} | ${p.title} | Month: ${p.month}`);
  });
});
