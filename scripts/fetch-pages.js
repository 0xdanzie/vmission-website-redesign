const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('Fetching pages metadata from WordPress REST API...');
  const pages = await fetchJson('https://www.vmission.org.in/wp-json/wp/v2/pages?per_page=100&_fields=id,slug,title,link');
  console.log(`Discovered ${pages.length} pages in WP API.`);
  
  // Save page directory
  const outDir = path.join(__dirname, 'archive_data');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
  fs.writeFileSync(path.join(outDir, 'pages_index.json'), JSON.stringify(pages, null, 2));

  // Find target slugs
  const targets = [
    'vedanta-sandesh-ezine',
    'vedanta-sandesh',
    'vedanta-piyush-ezine',
    'vedanta-piyush',
    'e-books',
    'general-pdf',
    'pravachan-text',
    'vishnu-sahasranaam',
    'vm-audios',
    'vm-videos-2',
    'gita-pravachans-2',
    'gita-pravachans',
    'atmabodha-talks',
    'upanishad-talks',
    'prakarana-granth',
    'hanuman-chalisa-talks',
    'sundarkand-talks',
    'chanting',
    'inspiring-stories',
    'meditation',
    'albums'
  ];

  for (const slug of targets) {
    const p = pages.find(item => item.slug === slug);
    if (p) {
      console.log(`Fetching full content for ${slug} (id: ${p.id})...`);
      try {
        const full = await fetchJson(`https://www.vmission.org.in/wp-json/wp/v2/pages/${p.id}`);
        fs.writeFileSync(path.join(outDir, `${slug}.json`), JSON.stringify(full, null, 2));
      } catch (err) {
        console.error(`Failed to fetch ${slug}:`, err.message);
      }
    } else {
      console.log(`Slug not found in first 100 pages: ${slug}`);
    }
  }
}

main().catch(console.error);
