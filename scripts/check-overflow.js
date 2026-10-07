const http = require('http');

// Simple fetch to inspect DOM or we can run node with child_process
const { execSync } = require('child_process');

// Let's run a quick one-liner using chrome devtools or node script with puppeteer if installed
try {
  const puppeteer = require('puppeteer');
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 375, height: 812 });
    await page.goto('http://localhost:3000/learn/', { waitUntil: 'networkidle0' });
    const overflowing = await page.evaluate(() => {
      const docW = document.documentElement.clientWidth;
      const elements = Array.from(document.querySelectorAll('*'));
      const bad = [];
      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.right > docW + 1) {
          bad.push({
            tag: el.tagName,
            class: el.className,
            id: el.id,
            right: rect.right,
            width: rect.width
          });
        }
      }
      return { docW, scrollW: document.documentElement.scrollWidth, bad: bad.slice(0, 10) };
    });
    console.log(JSON.stringify(overflowing, null, 2));
    await browser.close();
  })();
} catch (e) {
  console.log('Puppeteer not directly installed:', e.message);
}
