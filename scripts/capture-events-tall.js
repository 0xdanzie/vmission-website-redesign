const { execSync } = require('child_process');
const path = require('path');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const outDir = path.join(__dirname, '..', 'docs', 'qa', 'phase52');

// We can take full-page screenshot or window-size with high height (e.g. 1280x2800)
execSync(`"${chromePath}" --headless=new --disable-gpu --window-size=1280,2800 --screenshot="${path.join(outDir, 'events-tall-1280px.png')}" http://localhost:3000/events/`);
console.log('Tall screenshot captured');
