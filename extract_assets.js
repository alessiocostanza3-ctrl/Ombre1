const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const rawDir = path.join(__dirname, 'raw_pages');
const files = fs.readdirSync(rawDir).filter(f => f.endsWith('.html'));

const assets = {};

files.forEach(file => {
  const name = path.basename(file, '.html');
  const filePath = path.join(rawDir, file);
  const html = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(html);

  const imgs = [];
  $('img').each((i, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src') || $(el).attr('data-lazy-src');
    const alt = $(el).attr('alt') || '';
    if (src && !src.includes('wp-emoji') && !src.includes('cropped-elemento_grafico1-32x32.png')) {
      imgs.push({ src, alt });
    }
  });

  const links = [];
  $('a').each((i, el) => {
    const href = $(el).attr('href');
    const text = $(el).text().trim();
    if (href && (href.endsWith('.pdf') || href.includes('upload') || (!href.startsWith('#') && !href.startsWith('javascript:')))) {
      links.push({ href, text });
    }
  });

  assets[name] = {
    imgs,
    links
  };
});

fs.writeFileSync(path.join(__dirname, 'extracted_assets.json'), JSON.stringify(assets, null, 2));
console.log('Extracted assets saved to extracted_assets.json');
