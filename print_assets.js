const fs = require('fs');
const assets = JSON.parse(fs.readFileSync('extracted_assets.json', 'utf-8'));

for (const [key, val] of Object.entries(assets)) {
  console.log(`=== Page: ${key} ===`);
  console.log(`Images (${val.imgs.length}):`);
  val.imgs.forEach(img => {
    console.log(`  - Src: ${img.src}`);
    console.log(`    Alt: ${img.alt}`);
  });
  console.log('--------------------');
}
