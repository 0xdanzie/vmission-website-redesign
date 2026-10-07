const { PUBLICATIONS } = require('../src/data/publications.ts');

const vs = PUBLICATIONS.filter(p => p.type === 'Vedanta Sandesh');
vs.forEach(p => {
  const mirrors = p.mirrors ? Object.values(p.mirrors).join(' ') : '';
  console.log(`${p.id} [${p.canonicalId}] | title: "${p.title}" | dl: ${p.downloadUrl}`);
  // Extract any month/year mentioned in links or title
  const match = (p.downloadUrl + ' ' + mirrors + ' ' + p.title).match(/(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*[-_ ]?(20\d\d|\d\d)/i);
  if (match) {
    console.log(`   -> detected date: ${match[0]}`);
  }
});
