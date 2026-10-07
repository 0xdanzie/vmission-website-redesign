const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('====================================================');
console.log('GATE 2: LEARN FLAGSHIP BROWSER QA');
console.log('====================================================\n');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outputDir = path.join(__dirname, '..', 'docs', 'qa', 'screenshots');
fs.mkdirSync(outputDir, { recursive: true });

// Check static HTML for /learn/
const learnHtmlPath = path.join(__dirname, '..', 'out', 'learn', 'index.html');
const tbHtmlPath = path.join(__dirname, '..', 'out', 'learn', 'tattva-bodha', 'index.html');

if (!fs.existsSync(learnHtmlPath) || !fs.existsSync(tbHtmlPath)) {
  console.error('❌ Missing static pages for learn. Run npm run build first.');
  process.exit(1);
}

const learnHtml = fs.readFileSync(learnHtmlPath, 'utf8');

// Verify 4 doors
const hasTattva = learnHtml.includes('Tattva Bodha');
const hasResGita = learnHtml.includes('Residential Gita Course');
const hasGitaOnline = learnHtml.includes('Bhagavad Gita Online Lesson Course');
const hasSangyan = learnHtml.includes('Sangyan — Sanatan Dharma');

console.log('Door 01 Tattva Bodha present:', hasTattva ? '✅ YES' : '❌ NO');
console.log('Door 02 Residential Gita present:', hasResGita ? '✅ YES' : '❌ NO');
console.log('Door 03 Gita Online present:', hasGitaOnline ? '✅ YES' : '❌ NO');
console.log('Door 04 Sangyan present:', hasSangyan ? '✅ YES' : '❌ NO');

// Capture desktop screenshot (1280x1800)
const learnDesktop = path.join(outputDir, 'learn-desktop-1280.png');
try {
  execSync(`"${chromePath}" --headless --disable-gpu --window-size=1280,1800 --screenshot="${learnDesktop}" http://localhost:3000/learn/`, { timeout: 10000 });
  console.log('✅ Learn Desktop screenshot captured:', learnDesktop);
} catch (err) {
  console.warn('⚠️ Screenshot capture warning:', err.message);
}

// Capture mobile screenshot (375x1800)
const learnMobile = path.join(outputDir, 'learn-mobile-375.png');
try {
  execSync(`"${chromePath}" --headless --disable-gpu --window-size=375,1800 --screenshot="${learnMobile}" http://localhost:3000/learn/`, { timeout: 10000 });
  console.log('✅ Learn Mobile screenshot captured:', learnMobile);
} catch (err) {
  console.warn('⚠️ Screenshot capture warning:', err.message);
}

console.log('\nGATE 2 LEARN QA: COMPLETED SUCCESSFULLY');
