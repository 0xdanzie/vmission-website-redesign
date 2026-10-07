const fs = require('fs');
const path = require('path');

// Read files
const sandeshJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'archive_data', 'vedanta-sandesh-ezine.json'), 'utf8'));
const piyushJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'archive_data', 'vedanta-piyush-ezine.json'), 'utf8'));
const ebooksJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'archive_data', 'e-books.json'), 'utf8'));
const videosJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'archive_data', 'vm-videos-2.json'), 'utf8'));

// Helper to parse Sandesh & Piyush Elementor HTML
function parseEzine(html, typePrefix, publicationType, defaultLang) {
  // We know there are sections VS -2026, VS -2025, etc.
  // Let's find each toggle item or table
  // Each item has an image, a month, and a table with links
  // Pattern: in HTML, <img ... src="..."> is followed by <a class="elementor-toggle-title">Month</a> and <table>...</table>
  
  const items = [];
  // Regex matching the column or widget block
  // A clean approach: split into toggle items or match sequentially
  const blockRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>[\s\S]*?<a class=["']elementor-toggle-title["'][^>]*>([\s\S]*?)<\/a>[\s\S]*?<table[^>]*>([\s\S]*?)<\/table>/gi;
  let m;
  let currentYear = 2026;
  
  // Also track year headers
  const yearSplits = html.split(/(?:VS|VP)\s*-\s*(20[12][0-9])/gi);
  // yearSplits has [before, '2026', chunk2026, '2025', chunk2025, ...]
  for (let i = 1; i < yearSplits.length; i += 2) {
    const year = parseInt(yearSplits[i], 10);
    const chunk = yearSplits[i + 1] || '';
    
    let match;
    const chunkRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>[\s\S]*?<a class=["']elementor-toggle-title["'][^>]*>([\s\S]*?)<\/a>[\s\S]*?<table[^>]*>([\s\S]*?)<\/table>/gi;
    
    while ((match = chunkRegex.exec(chunk)) !== null) {
      const cover = match[1];
      const monthRaw = match[2].trim();
      const tableHtml = match[3];
      
      // Normalize month
      let month = monthRaw;
      if (month.toLowerCase().startsWith('jan')) month = 'January';
      else if (month.toLowerCase().startsWith('feb')) month = 'February';
      else if (month.toLowerCase().startsWith('mar')) month = 'March';
      else if (month.toLowerCase().startsWith('apr')) month = 'April';
      else if (month.toLowerCase().startsWith('may')) month = 'May';
      else if (month.toLowerCase().startsWith('jun')) month = 'June';
      else if (month.toLowerCase().startsWith('jul')) month = 'July';
      else if (month.toLowerCase().startsWith('aug')) month = 'August';
      else if (month.toLowerCase().startsWith('sep')) month = 'September';
      else if (month.toLowerCase().startsWith('oct')) month = 'October';
      else if (month.toLowerCase().startsWith('nov')) month = 'November';
      else if (month.toLowerCase().startsWith('dec')) month = 'December';

      // Extract links from table
      const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
      let lm;
      const links = {};
      while ((lm = linkRegex.exec(tableHtml)) !== null) {
        const href = lm[1].replace(/&amp;/g, '&');
        const text = lm[2].replace(/<[^>]+>/g, '').trim().toLowerCase();
        if (text.includes('archive flip') || text === 'archive fb') links.archiveFlip = href;
        else if (text.includes('archive')) links.archive = href;
        else if (text.includes('gdrive') || text.includes('google')) links.gdrive = href;
        else if (text.includes('box')) links.box = href;
        else if (text.includes('pcloud')) links.pcloud = href;
        else if (text.includes('flipbook')) links.flipbook = href;
        else if (text.includes('issuu')) links.issuu = href;
        else if (text.includes('scribd')) links.scribd = href;
      }

      // Canonical download url: Archive.org PDF > GDrive > Box > pCloud
      const downloadUrl = links.archive || links.gdrive || links.box || links.pcloud || '#';
      const readOnlineUrl = links.archiveFlip || links.flipbook || links.issuu || links.archive || undefined;

      const slugMonth = month.toLowerCase().slice(0, 3);
      const id = `${typePrefix}-${year}-${slugMonth}`;

      items.push({
        id,
        type: publicationType,
        title: `${publicationType} — ${month} ${year}`,
        month,
        year,
        coverImage: cover,
        language: defaultLang,
        downloadUrl,
        archiveUrl: links.archiveFlip || links.gdrive || links.archive || '#',
        readOnlineUrl,
        mirrors: links,
        description: `${publicationType} ${month} ${year} monthly issue sharing discourses by Swami Atmananda Saraswati, scriptural commentaries, and Ashram updates.`,
        isLatest: (year === 2026 && (month === 'August' || month === 'July')),
        pageCount: 36
      });
    }
  }

  return items;
}

const sandeshItems = parseEzine(sandeshJson.content.rendered, 'vs', 'Vedanta Sandesh', 'English');
const piyushItems = parseEzine(piyushJson.content.rendered, 'vp', 'Vedanta Piyush', 'Hindi / Gujarati');

console.log(`Parsed ${sandeshItems.length} Vedanta Sandesh issues.`);
console.log(`Parsed ${piyushItems.length} Vedanta Piyush issues.`);

fs.writeFileSync(path.join(__dirname, 'sandesh_extracted.json'), JSON.stringify(sandeshItems, null, 2));
fs.writeFileSync(path.join(__dirname, 'piyush_extracted.json'), JSON.stringify(piyushItems, null, 2));
