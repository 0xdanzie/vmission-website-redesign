const http = require('http');

http.get('http://localhost:3000/teachings/drig-drushya-viveka-01/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const iframeMatch = data.match(/<iframe[^>]+src="([^"]+)"/);
    console.log('Status code:', res.statusCode);
    console.log('Iframe src:', iframeMatch ? iframeMatch[1] : 'NOT FOUND');
    const h1Match = data.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    console.log('H1:', h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : 'NOT FOUND');
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
