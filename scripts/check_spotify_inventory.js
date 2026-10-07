const fs = require('fs');

const master = JSON.parse(fs.readFileSync('docs/migration/PHASE-3D3-LEGACY-MASTER-INVENTORY.json', 'utf8'));
const matchesInMaster = [];

master.forEach(item => {
  const str = JSON.stringify(item);
  if (str.toLowerCase().includes('spotify')) {
    matchesInMaster.push({
      legacyId: item.legacyId,
      url: item.url,
      title: item.title,
      type: item.type
    });
  }
});

console.log('Matches in Master Inventory:', matchesInMaster.length);
console.log(JSON.stringify(matchesInMaster, null, 2));

const matrix = JSON.parse(fs.readFileSync('docs/migration/PHASE-3D4-CANONICAL-MIGRATION-MATRIX.json', 'utf8'));
const matchesInMatrix = [];

matrix.canonicalEntities.forEach(item => {
  const str = JSON.stringify(item);
  if (str.toLowerCase().includes('spotify')) {
    matchesInMatrix.push({
      canonicalId: item.canonicalId,
      title: item.title,
      type: item.type
    });
  }
});

console.log('Matches in Canonical Matrix:', matchesInMatrix.length);
console.log(JSON.stringify(matchesInMatrix, null, 2));
