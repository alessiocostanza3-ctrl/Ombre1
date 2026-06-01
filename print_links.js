const fs = require('fs');
const assets = JSON.parse(fs.readFileSync('extracted_assets.json', 'utf-8'));

for (const [key, val] of Object.entries(assets)) {
  const filteredLinks = val.links.filter(l => l.href.includes('.pdf') || l.href.includes('upload') || l.href.includes('instagram') || l.href.includes('facebook'));
  if (filteredLinks.length > 0) {
    console.log(`=== Links for Page: ${key} ===`);
    filteredLinks.forEach(l => {
      console.log(`  - Href: ${l.href}`);
      console.log(`    Text: ${l.text}`);
    });
    console.log('--------------------');
  }
}
