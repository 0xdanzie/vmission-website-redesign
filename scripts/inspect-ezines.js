const fs = require('fs');

['vedanta-sandesh-ezine.json', 'vedanta-piyush-ezine.json'].forEach(file => {
  const filePath = `./scripts/archive_data/${file}`;
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    console.log(`\n=== ${file} ===`);
    console.log(`Title: ${data.title ? data.title.rendered : 'N/A'}`);
    const html = data.content.rendered;
    
    // Find all image tags
    const imgMatches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/g)].map(m => m[1]);
    console.log(`Total images found: ${imgMatches.length}`);
    
    // Extract years from images
    const years = new Set();
    imgMatches.forEach(src => {
      const ym = src.match(/(?:20)?(1[4-9]|2[0-6])/);
      if (ym) years.add(ym[0]);
    });
    console.log('Years referenced in images:', [...years].sort());
  }
});
