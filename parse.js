const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const rawDir = path.join(__dirname, 'raw_pages');
const files = fs.readdirSync(rawDir).filter(f => f.endsWith('.html'));

const output = {};

files.forEach(file => {
  const name = path.basename(file, '.html');
  const filePath = path.join(rawDir, file);
  const html = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(html);

  // Remove script and style tags
  $('script').remove();
  $('style').remove();
  $('header').remove(); // remove global header
  $('footer').remove(); // remove global footer
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
    if (txt) {
      paragraphs.push(txt);
    }
  });

  const sections = [];
  // Elementor sections
  $('.elementor-section').each((i, sec) => {
    const secTexts = [];
    $(sec).find('h1, h2, h3, h4, h5, h6, p, li, a.elementor-button').each((j, el) => {
      const text = $(el).text().trim();
      if (text && !secTexts.includes(text)) {
        secTexts.push(`${el.name || 'a'}: ${text}`);
      }
    });
    if (secTexts.length > 0) {
      sections.push({
        sectionId: $(sec).attr('data-id') || i,
        content: secTexts
      });
    }
  });

  output[name] = {
    title,
    headings,
    paragraphs,
    sections
  };
});

fs.writeFileSync(path.join(__dirname, 'parsed_content.json'), JSON.stringify(output, null, 2));
console.log('Parsed content saved to parsed_content.json');
