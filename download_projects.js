const fs = require('fs');
const path = require('path');

const projectUrls = {
  agliana: 'https://www.ombre-1.com/illuminazione-architetturale/comune-di-agliana-2/',
  cascina: 'https://www.ombre-1.com/illuminazione-architetturale/comune-di-cascina/',
  giaccherino: 'https://www.ombre-1.com/illuminazione-architetturale/convento-di-giaccherino/',
  lepanteraie: 'https://www.ombre-1.com/illuminazione-architetturale/le-panteraie/',
  showroom: 'https://www.ombre-1.com/illuminazione-architetturale/showroom-moment-romance/',
  mestre: 'https://www.ombre-1.com/illuminazione-architetturale/venezia-mestre/',
  villagrey: 'https://www.ombre-1.com/illuminazione-architetturale/villa-grey/',
  guicciardini: 'https://www.ombre-1.com/illuminazione-architetturale/villa-guicciardini-2/',
  villaprivata: 'https://www.ombre-1.com/illuminazione-architetturale/villa-privata/',
  villareale: 'https://www.ombre-1.com/illuminazione-architetturale/villa-reale/'
};

async function downloadProjects() {
  const dir = path.join(__dirname, 'raw_pages_projects');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  for (const [key, url] of Object.entries(projectUrls)) {
    console.log(`Fetching project ${key}: ${url}...`);
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      if (!res.ok) {
        console.error(`Failed to fetch project ${key}: status ${res.status}`);
        continue;
      }
      const html = await res.text();
      fs.writeFileSync(path.join(dir, `${key}.html`), html);
      console.log(`Saved ${key}.html`);
    } catch (e) {
      console.error(`Error fetching project ${key}:`, e.message);
    }
  }
}

downloadProjects();
