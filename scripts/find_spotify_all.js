const fs = require('fs');
const path = require('path');

const results = [];

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== '.next' && file !== 'out') {
        searchDir(fullPath);
      }
    } else if (file.endsWith('.json') || file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.md') || file.endsWith('.ts')) {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('spotify.com')) {
          // extract all spotify urls
          const regex = /https?:\/\/[a-zA-Z0-9.\-_/]*spotify\.com[a-zA-Z0-9.\-_/?&=%]*/g;
          let match;
          while ((match = regex.exec(content)) !== null) {
            results.push({
              file: path.relative(process.cwd(), fullPath),
              url: match[0]
            });
          }
        }
      } catch (e) {}
    }
  }
}

searchDir(process.cwd());

const unique = {};
results.forEach(r => {
  // clean url
  let cleanUrl = r.url.replace(/&amp;/g, '&').replace(/\\"/g, '').replace(/"/g, '');
  if (!unique[cleanUrl]) {
    unique[cleanUrl] = [];
  }
  if (!unique[cleanUrl].includes(r.file)) {
    unique[cleanUrl].push(r.file);
  }
});

console.log('Found', Object.keys(unique).length, 'unique Spotify URLs:');
console.log(JSON.stringify(unique, null, 2));
