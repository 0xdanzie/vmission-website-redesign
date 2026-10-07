const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'videos.html'), 'utf8');
const blocks = html.split(/class="elementor-column /);

const sourceVideos = [];
const seenPids = new Set();

for (const b of blocks) {
  const plMatch = b.match(/href="https:\/\/www\.youtube\.com\/playlist\?list=([^"&]+)/);
  if (plMatch) {
    const pid = plMatch[1];
    const hMatch = b.match(/<h[2-6][^>]*>([\s\S]*?)<\/h[2-6]>/);
    let heading = hMatch ? hMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : 'Unknown';
    const vMatch = b.match(/youtube_url&quot;:&quot;([^&]+)&quot;/);
    const videoUrl = vMatch ? vMatch[1].replace(/\\\//g, '/') : null;
    let videoId = null;
    if (videoUrl) {
      const vidMatch = videoUrl.match(/(?:youtu\.be\/|v=)([^?&]+)/);
      if (vidMatch) videoId = vidMatch[1];
    }
    
    // Determine speaker from heading or context
    let speaker = 'Swami Atmananda Saraswati';
    if (heading.includes('SwAmita') || heading.includes('Sw Amitananda') || heading.includes('Swamini Amitananda')) {
      speaker = 'Swamini Amitananda Saraswati';
    } else if (heading.includes('Sw Samata') || heading.includes('Swamini Samatananda')) {
      speaker = 'Swamini Samatananda Saraswati';
    } else if (heading.includes('SwPoorna') || heading.includes('Swamini Poornananda')) {
      speaker = 'Swamini Poornananda Saraswati';
    } else if (heading.includes('P. Guruji')) {
      speaker = 'Swami Atmananda Saraswati';
    }

    // Determine category
    let category = 'prakarana-granth';
    let categoryName = 'Prakarana Granth';
    if (/GITA/i.test(heading)) {
      category = 'bhagavad-gita';
      categoryName = 'Bhagavad Gita';
    } else if (/Upanishad/i.test(heading)) {
      category = 'upanishads';
      categoryName = 'Upanishads';
    } else if (/Hanuman|Sundarkand|Bhakti|Ekadashi/i.test(heading)) {
      category = 'devotional';
      categoryName = 'Devotional';
    } else if (/Chanting|Pratah Smaran|Shiv Mahimna/i.test(heading)) {
      category = 'chanting';
      categoryName = 'Chanting & Bhajans';
    } else if (/Satsang|Stories/i.test(heading)) {
      category = 'inspiring-stories';
      categoryName = 'Inspiring Stories';
    }

    sourceVideos.push({
      pid,
      heading,
      videoUrl,
      videoId,
      speaker,
      category,
      categoryName,
      isDuplicate: seenPids.has(pid)
    });
    seenPids.add(pid);
  }
}

fs.writeFileSync(
  path.join(__dirname, 'authentic_videos_manifest.json'),
  JSON.stringify(sourceVideos, null, 2)
);

console.log(`Extracted ${sourceVideos.length} source videos (${seenPids.size} unique). Saved to authentic_videos_manifest.json.`);
