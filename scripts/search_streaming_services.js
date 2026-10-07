const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'archive_data');
const files = fs.readdirSync(dir);

const streamingLinks = [];

files.forEach(f => {
  if (f.endsWith('.json')) {
    const raw = fs.readFileSync(path.join(dir, f), 'utf8');
    const services = ['spotify', 'soundcloud', 'anchor.fm', 'apple', 'podcasts', 'jiosaavn', 'gaana', 'audible'];
    services.forEach(svc => {
      if (raw.toLowerCase().includes(svc)) {
        // extract matches
        const reg = new RegExp(`https?:\\/\\/[^"\\s<>'\\\\]*${svc}[^"\\s<>'\\\\]*`, 'gi');
        let m;
        while ((m = reg.exec(raw)) !== null) {
          streamingLinks.push({
            file: f,
            service: svc,
            link: m[0]
          });
        }
      }
    });
  }
});

console.log('Found streaming links:', streamingLinks.length);
console.log(JSON.stringify(streamingLinks, null, 2));
