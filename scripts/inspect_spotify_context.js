const fs = require('fs');
const path = require('path');

function inspectPage(filename) {
  const file = path.join(__dirname, 'archive_data', filename);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  console.log('=== FILE:', filename, '===');
  console.log('Title:', data.title?.rendered);
  console.log('Slug:', data.slug);
  
  // Extract headings, links, and context around spotify/anchor
  const rendered = data.content?.rendered || '';
  
  // split into lines or paragraphs
  const regex = /(<h[1-6][^>]*>.*?<\/h[1-6]>|<iframe[^>]*>.*?<\/iframe>|<a[^>]*href="([^"]*)"[^>]*>.*?<\/a>)/gi;
  let match;
  while ((match = regex.exec(rendered)) !== null) {
    const snippet = match[0].replace(/\s+/g, ' ');
    if (snippet.includes('spotify') || snippet.includes('anchor') || snippet.includes('Archive') || snippet.includes('Download') || snippet.includes('<h')) {
      console.log('  ->', snippet);
    }
  }
}

inspectPage('atmabodha-talks.json');
inspectPage('inspiring-stories.json');
inspectPage('meditation.json');
