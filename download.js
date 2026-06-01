const fs = require('fs');
const path = require('path');

const urls = {
  home: 'https://www.ombre-1.com/',
  azienda: 'https://www.ombre-1.com/azienda-2/',
  settori: 'https://www.ombre-1.com/azienda/',
  servizi: 'https://www.ombre-1.com/servizi/',
  certificazioni: 'https://www.ombre-1.com/certificazioni/',
  contatti: 'https://www.ombre-1.com/contattis/',
  news: 'https://www.ombre-1.com/news/',
  architetturale: 'https://www.ombre-1.com/illuminazione-architetturale/',
  lineare: 'https://www.ombre-1.com/illuminazione-lineare/',
  david: 'https://www.ombre-1.com/illuminazione-architetturale/david-piazzale-michelangelo/',
  glypta: 'https://www.ombre-1.com/illuminazione-architetturale/villa-privata-forte-dei-marmi/' // just in case
};

async function download() {
  const dir = path.join(__dirname, 'raw_pages');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  for (const [key, url] of Object.entries(urls)) {
    console.log(`Fetching ${key}: ${url}...`);
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      if (!res.ok) {
        console.error(`Failed to fetch ${key}: status ${res.status}`);
        continue;
      }
      const html = await res.text();
      fs.writeFileSync(path.join(dir, `${key}.html`), html);
      console.log(`Saved ${key}.html`);
    } catch (e) {
      console.error(`Error fetching ${key}:`, e.message);
    }
  }
}

download();
