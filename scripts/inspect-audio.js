const fs = require('fs');
const path = require('path');

const audioPages = [
  'vm-audios.json',
  'prakarana-granth.json',
  'upanishad-talks.json',
  'gita-pravachans-2.json',
  'chanting.json',
  'meditation.json',
  'atmabodha-talks.json',
  'hanuman-chalisa-talks.json',
  'inspiring-stories.json'
];

for (const p of audioPages) {
  const file = path.join(__dirname, 'archive_data', p);
  if (!fs.existsSync(file)) continue;
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));
  const html = json.content?.rendered || '';
  console.log(`\n================== ${p} ==================`);
  
  // Look for mp3
  const mp3Regex = /(?:https?:)?\/[^\s"'<>]+\.mp3/gi;
  const mp3s = [...html.matchAll(mp3Regex)].map(m => m[0]);
  console.log('MP3 matches:', mp3s.length, mp3s.slice(0, 5));

  // Look for audio tags or plugins
  const audioTagRegex = /<audio[^>]*>([\s\S]*?)<\/audio>/gi;
  const audioTags = [...html.matchAll(audioTagRegex)].map(m => m[0]);
  console.log('Audio tags:', audioTags.length);

  // Look for links to box / gdrive / pcloud / archive
  const linkRegex = /href=["']([^"']+)["']/gi;
  const links = [...html.matchAll(linkRegex)].map(m => m[1]);
  const externalAudio = links.filter(l => l.includes('box.com') || l.includes('drive.google.com') || l.includes('archive.org') || l.includes('pcloud') || l.includes('pc.cd'));
  console.log('External storage links:', externalAudio.length, externalAudio.slice(0, 5));
}
