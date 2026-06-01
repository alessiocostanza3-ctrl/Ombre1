const fs = require('fs');
const path = require('path');

const rawDir = path.join(__dirname, 'raw_pages_projects');
const files = fs.readdirSync(rawDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(rawDir, file);
  const html = fs.readFileSync(filePath, 'utf-8');
  const matches = [...html.matchAll(/https?:\/\/[^\s"'`<>]*\.(?:jpg|jpeg|png|gif|webp)/gi)];
  if (matches.length > 0) {
    console.log(`=== Matches in ${file} ===`);
    const unique = [...new Set(matches.map(m => m[0]))].filter(m => m.includes('wp-content/uploads/'));
    unique.forEach(m => console.log('  ', m));
  }
});
