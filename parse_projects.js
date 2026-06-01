const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const rawDir = path.join(__dirname, 'raw_pages_projects');
const files = fs.readdirSync(rawDir).filter(f => f.endsWith('.html'));

const output = {};

files.forEach(file => {
  const name = path.basename(file, '.html');
  const filePath = path.join(rawDir, file);
  const html = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(html);

  // Remove scripts/styles
  $('script').remove();
  $('style').remove();
  $('header').remove();
  $('footer').remove();
  $('#cookie-law-info-bar').remove();
  $('.cli-modal').remove();

  const title = $('title').text().trim();
  const headings = [];
  $('h1, h2, h3, h4, h5, h6').each((i, el) => {
    headings.push({
      tag: el.name,
      text: $(el).text().trim()
    });
  });

  const paragraphs = [];
  $('p').each((i, el) => {
    const txt = $(el).text().trim();
    if (txt && !txt.includes('Cookies') && !txt.includes('Yoast')) {
      paragraphs.push(txt);
    }
  });

  const imgs = [];
  $('img').each((i, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src') || $(el).attr('data-lazy-src');
    const alt = $(el).attr('alt') || '';
    if (src && !src.includes('wp-emoji') && !src.includes('cropped-elemento_grafico1-32x32.png')) {
      imgs.push({ src, alt });
    }
  });

  output[name] = {
    title,
    headings,
    paragraphs,
    imgs
  };
});

fs.writeFileSync(path.join(__dirname, 'parsed_projects.json'), JSON.stringify(output, null, 2));
console.log('Parsed projects content saved to parsed_projects.json');
