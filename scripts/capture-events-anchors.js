const { execSync } = require('child_process');
const path = require('path');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const p1 = path.join(__dirname, '..', 'docs', 'qa', 'phase52', 'events-active-1280px.png');
const p2 = path.join(__dirname, '..', 'docs', 'qa', 'phase52', 'events-archive-1280px.png');
execSync(`"${chromePath}" --headless=new --disable-gpu --window-size=1280,1200 --screenshot="${p1}" http://localhost:3000/events/#active-gathering`);
execSync(`"${chromePath}" --headless=new --disable-gpu --window-size=1280,1200 --screenshot="${p2}" http://localhost:3000/events/#archive`);
console.log('Captured anchor shots successfully');
