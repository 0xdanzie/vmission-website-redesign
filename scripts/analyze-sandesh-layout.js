const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'sandesh.html'), 'utf8');

// In Elementor, each issue is usually in a column or section containing:
// 1) An image (cover)
// 2) A title or toggle (Month, e.g. "Aug", "July")
// 3) A table with mirrors (Archive, GDrive, Box, Flipbook, Pcloud)
// Let's test regex splitting by section or column

// Look for year headers like "VS - 2026" or "VS - 2025"
const sections = html.split(/<h2[^>]*>[\s\S]*?(?:VS|VEDANTA SANDESH)[\s\S]*?<\/h2>/gi);
console.log('Split sections by H2:', sections.length);

// Let's find all instances of toggle-title or month headings
const monthTitles = [...html.matchAll(/class=["']elementor-toggle-title["'][^>]*>([\s\S]*?)<\/a>/gi)].map(m => m[1].trim());
console.log('Found month toggle titles:', monthTitles.length, monthTitles.slice(0, 15));

// Let's see how years are declared
const h2s = [...html.matchAll(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('All H2/H3 headings:', h2s);
