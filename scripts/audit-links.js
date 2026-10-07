const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

function getFiles(dir, list = []) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) getFiles(full, list);
    else if (/\.(tsx|jsx)$/.test(item.name)) list.push(full);
  }
  return list;
}

const files = getFiles(path.join(rootDir, 'src'));
let issues = 0;
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const regex = /target\s*=\s*["']_blank["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const snippet = content.slice(Math.max(0, match.index - 100), Math.min(content.length, match.index + 120));
    if (!snippet.includes('noopener') || !snippet.includes('noreferrer')) {
      console.log('Missing rel in ' + path.relative(rootDir, f) + ':\n  ' + snippet.replace(/\r?\n/g, ' '));
      issues++;
    }
  }
}
console.log('Total external links missing rel="noopener noreferrer": ' + issues);
