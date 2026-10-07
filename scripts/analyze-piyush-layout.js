const fs = require('fs');
const path = require('path');

const json = JSON.parse(fs.readFileSync(path.join(__dirname, 'archive_data', 'vedanta-piyush-ezine.json'), 'utf8'));
const html = json.content?.rendered || '';

const monthTitles = [...html.matchAll(/class=["']elementor-toggle-title["'][^>]*>([\s\S]*?)<\/a>/gi)].map(m => m[1].trim());
console.log('Found month toggle titles in Piyush:', monthTitles.length, monthTitles.slice(0, 15));

const h2s = [...html.matchAll(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('All H2/H3 headings in Piyush:', h2s);
