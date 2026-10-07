const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812 });
  await page.goto('http://localhost:3000/events/', { waitUntil: 'networkidle2' });
  
  const result = await page.evaluate(() => {
    const docWidth = document.documentElement.offsetWidth;
    const scrollWidth = document.documentElement.scrollWidth;
    const elements = document.querySelectorAll('*');
    const offenders = [];
    for (const el of elements) {
      const rect = el.getBoundingClientRect();
      if (rect.right > docWidth + 1) {
        offenders.push({
          tag: el.tagName,
          id: el.id,
          className: el.className,
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          text: (el.innerText || '').slice(0, 50).replace(/\n/g, ' ')
        });
      }
    }
    return { docWidth, scrollWidth, offenders: offenders.slice(0, 15) };
  });

  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})();
