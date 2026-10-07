const fs = require('fs');
const path = require('path');

// 1. Load authentic source videos map
const authenticManifest = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'authentic_videos_manifest.json'), 'utf8')
);
const sourceMap = new Map();
for (const v of authenticManifest) {
  if (!sourceMap.has(v.pid)) {
    sourceMap.set(v.pid, v);
  }
}

const teachingsContent = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'teachings.ts'), 'utf8');
const decl = 'export const teachings: Teaching[] = [';
const arrayStart = teachingsContent.indexOf(decl) + decl.length - 1;
const arrayEnd = teachingsContent.lastIndexOf('];');
const currentTeachings = JSON.parse(teachingsContent.substring(arrayStart, arrayEnd + 1));

console.log(`Auditing ${currentTeachings.length} current teachings...`);

const auditResults = [];

for (const t of currentTeachings) {
  if (t.format === 'Video' || t.youtubePlaylistId) {
    const pid = t.youtubePlaylistId;
    const src = sourceMap.get(pid);
    const srcHeading = src ? src.heading : 'NOT FOUND IN MANIFEST';
    const srcSpeaker = src ? src.speaker : 'Unknown';
    const srcVideoId = src ? src.videoId : null;

    // Check match
    const isMatch = src && (
      (t.scripture === 'Drig Drushya Viveka' && /Drig/i.test(srcHeading)) ||
      (t.scripture === 'Atma-bodha' && /Atma-Bodha/i.test(srcHeading)) ||
      (t.scripture === 'Bhagavad Gita' && /Gita/i.test(srcHeading)) ||
      (t.scripture === 'Kenopanishad' && /Kena/i.test(srcHeading)) ||
      (t.scripture === 'Kathopanishad' && /Katha|Katho/i.test(srcHeading)) ||
      (t.scripture === 'Upadesha Saram' && /Upadesh/i.test(srcHeading)) ||
      (t.scripture === 'Vivekachudamani' && /Vivek/i.test(srcHeading)) ||
      (t.scripture === 'Bhaja Govindam' && /Bhaja/i.test(srcHeading)) ||
      (t.scripture === 'Sadhana Panchakam' && /Sadhana/i.test(srcHeading)) ||
      (t.scripture === 'Hanuman Chalisa' && /Hanuman/i.test(srcHeading)) ||
      (t.scripture === 'Sundarkand' && /Sundarkand/i.test(srcHeading)) ||
      (t.scripture === 'Ramcharitmanas' && /Sundarkand/i.test(srcHeading)) ||
      (t.scripture === 'Adhyatma Ramayana' && /Ram Gita/i.test(srcHeading)) ||
      (t.scripture === 'Panchadashi' && /Panchdashi|Natak/i.test(srcHeading)) ||
      (t.scripture === 'Narada Bhakti Sutras' && /Narad/i.test(srcHeading)) ||
      (t.scripture === 'Laghu Vakyavritti' && /Laghu/i.test(srcHeading)) ||
      (t.scripture === 'Hastamalaka Stotram' && /Hastamalak/i.test(srcHeading)) ||
      (t.scripture === 'Pratah Smaran Stotram' && /Pratah/i.test(srcHeading)) ||
      (t.scripture === 'Shiva Mahimna Stotram' && /Shiv Mahimna/i.test(srcHeading)) ||
      (t.scripture === 'Gita Dhyanam' && /Gita Dhyan/i.test(srcHeading)) ||
      (t.scripture === 'Ek Shloki' && /Ek Shloki/i.test(srcHeading)) ||
      (t.scripture === 'Bhagavad Gita Yoga' && /Samatvam/i.test(srcHeading)) ||
      (t.scripture === 'Vedic Puranic Discourses' && /Ekadashi/i.test(srcHeading)) ||
      (t.scripture === 'Satsang & Prakarana' && /VDO Satsang/i.test(srcHeading))
    );

    auditResults.push({
      id: t.id,
      title: t.title,
      scripture: t.scripture,
      teacher: t.teacher,
      currentPlaylistId: pid,
      srcHeading,
      srcSpeaker,
      srcVideoId,
      match: Boolean(isMatch)
    });
  }
}

console.log(`Video Teachings Audited: ${auditResults.length}`);
const mismatches = auditResults.filter(r => !r.match);
console.log(`Mismatches Found: ${mismatches.length}`);

console.log('\n--- MISMATCHED ITEMS ---');
mismatches.forEach(m => {
  console.log(`[MISMATCH] ${m.id} -> "${m.title}"`);
  console.log(`   Current Playlist: ${m.currentPlaylistId} ("${m.srcHeading}" by ${m.srcSpeaker})`);
});
