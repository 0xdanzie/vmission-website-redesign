const fs = require('fs');

if (fs.existsSync('./scripts/archive_data/e-books.json')) {
  const data = JSON.parse(fs.readFileSync('./scripts/archive_data/e-books.json', 'utf8'));
  const html = data.content.rendered;
  
  // Split into elementor columns or find pairs of img and a
  // In elementor, usually an image widget is followed by heading/button or is inside an anchor
  const regex = /<img[^>]+src=["']([^"']+)["'][\s\S]*?(?:href=["']([^"']+)["']|<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>)/g;
  
  // Let's inspect sections/columns
  const sections = html.split(/class="elementor-widget-container"/);
  console.log(`Found ${sections.length} widget containers.`);
  
  for (let i = 0; i < sections.length; i++) {
    const s = sections[i];
    const imgMatch = s.match(/<img[^>]+src=["']([^"']+)["']/);
    const hrefMatch = s.match(/href=["']([^"']+)["']/);
    const titleMatch = s.match(/<h\d[^>]*>(.*?)<\/h\d>/) || s.match(/title=["']([^"']+)["']/);
    if (imgMatch || hrefMatch) {
      console.log(`Widget ${i}:`);
      if (imgMatch) console.log(`  IMG: ${imgMatch[1]}`);
      if (hrefMatch) console.log(`  HREF: ${hrefMatch[1]}`);
      if (titleMatch) console.log(`  TITLE: ${titleMatch[1]}`);
    }
  }
}
