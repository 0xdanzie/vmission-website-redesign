const http = require('http');
const { execSync } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const runnerHtml = `
<!DOCTYPE html>
<html>
<body>
<iframe id="frame" src="http://localhost:3000/events/" style="width: 375px; height: 1200px; border: none;"></iframe>
<script>
window.onload = async () => {
  const iframe = document.getElementById('frame');
  await new Promise(r => setTimeout(r, 2000));
  const doc = iframe.contentDocument;
  const scrollWidth = doc.documentElement.scrollWidth;
  const innerWidth = 375;
  const overflowing = [];

  doc.querySelectorAll('*').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.right > innerWidth + 1 || rect.left < -1) {
      overflowing.push({
        tag: el.tagName,
        cls: el.className,
        id: el.id,
        right: Math.round(rect.right),
        width: Math.round(rect.width),
        text: (el.innerText || '').slice(0, 40)
      });
    }
  });

  fetch('http://localhost:3344/report', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ scrollWidth, innerWidth, overflowing: overflowing.slice(0, 15) })
  });
};
</script>
</body>
</html>
`;

const fs = require('fs');
const path = require('path');
const tempHtml = path.join(__dirname, 'overflow-runner.html');
fs.writeFileSync(tempHtml, runnerHtml);

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === '/report') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      console.log('--- OVERFLOW DIAGNOSTIC REPORT ---');
      console.log(body);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end('{"ok":true}');
      setTimeout(() => {
        server.close();
        process.exit(0);
      }, 500);
    });
  }
});

server.listen(3344, () => {
  const fileUrl = 'file:///' + tempHtml.replace(/\\/g, '/');
  try {
    execSync(`"${chromePath}" --headless=new --disable-gpu --window-size=600,1000 "${fileUrl}"`, { timeout: 15000 });
  } catch (e) {
    console.error('Exec error:', e.message);
    server.close();
  }
});
