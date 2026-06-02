/* ==========================================================================
   OMBRE-1 - Architectural & Design Site Logic (Silent Luxury)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavigation();
  initSectors();
  initPlayground();
  initProjects();
  initProjectsFilter();
  initCertifications();
  initContactForm();
  initScrollReveal();
});

/* ==========================================================================
   1. Theme Switching (Text-Based Toggle)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;
  
  if (!toggleBtn) return;
  
  const textSpan = toggleBtn.querySelector('.toggle-text-theme');
  
  function updateButtonText(theme) {
    if (textSpan) {
      textSpan.textContent = theme === 'dark' ? 'LIGHT' : 'DARK';
    }
  }
  
  let currentTheme = htmlEl.getAttribute('data-theme') || 'dark';
  updateButtonText(currentTheme);
  
  toggleBtn.addEventListener('click', () => {
    if (currentTheme === 'dark') {
      currentTheme = 'light';
      htmlEl.setAttribute('data-theme', 'light');
    } else {
      currentTheme = 'dark';
      htmlEl.setAttribute('data-theme', 'dark');
    }
    currentTheme = htmlEl.getAttribute('data-theme');
    updateButtonText(currentTheme);
  });
}

/* ==========================================================================
   2. Sticky Navigation Header & Active States
   ========================================================================== */
function initNavigation() {
  const header = document.getElementById('mainHeader');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  const body = document.body;

  function setMenuState(isOpen) {
    if (!navToggle || !navMenu) return;
    navToggle.classList.toggle('open', isOpen);
    navMenu.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    body.classList.toggle('nav-open', isOpen);
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (navToggle && navMenu) {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.addEventListener('click', () => {
      const isOpen = !navMenu.classList.contains('open');
      setMenuState(isOpen);
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      setMenuState(false);
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      setMenuState(false);
    }
  });

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -40% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   3. Sectors Tab Controls
   ========================================================================== */
const SECTORS_DATA = {
  architetturale: {
    title: "Illuminazione Architetturale",
    desc: "Sistemi e corpi illuminanti studiati per esaltare il patrimonio storico, artistico e le facciate di edifici civici o residenze di pregio. Un connubio indissolubile tra estetica, precisione cromatica e affidabilità strutturale in ambienti esterni soggetti ad agenti atmosferici.",
    tags: ["Sistemi Custom", "Efficienza Cromatica", "Resistenza IP66/IP67", "Sistemi DMX/DALI"],
    vector: `
      <!-- Column illuminated by two spotlights -->
      <path d="M40 80 L60 80 L60 76 L40 76 Z" fill="currentColor" opacity="0.6" />
      <path d="M44 76 L56 76 L56 30 L44 30 Z" fill="currentColor" opacity="0.4" />
      <path d="M38 30 L62 30 L62 24 L38 24 Z" fill="currentColor" opacity="0.5" />
      
      <!-- Spotlights -->
      <rect x="23" y="78" width="8" height="6" rx="2" fill="var(--color-accent)" transform="rotate(-30, 27, 81)" />
      <rect x="69" y="78" width="8" height="6" rx="2" fill="var(--color-accent)" transform="rotate(30, 73, 81)" />
      
      <!-- Light Beams -->
      <polygon points="27,78 32,18 62,16 45,76" fill="url(#beamGrad1)" opacity="0.5" />
      <polygon points="73,78 68,18 38,16 55,76" fill="url(#beamGrad2)" opacity="0.5" />
      
      <defs>
        <linearGradient id="beamGrad1" x1="0" y1="1" x2="0.6" y2="0">
          <stop offset="0%" stop-color="var(--color-accent)" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="var(--color-accent)" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="beamGrad2" x1="1" y1="1" x2="0.4" y2="0">
          <stop offset="0%" stop-color="var(--color-accent)" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="var(--color-accent)" stop-opacity="0"/>
        </linearGradient>
      </defs>
    `
  },
  civile: {
    title: "Illuminazione Civile / Residenziale",
    desc: "Soluzioni illuminotecniche raffinate per interni residenziali di pregio, uffici e spazi commerciali moderni. Sviluppiamo ambienti in cui il benessere visivo delle persone incontra la flessibilità dell'integrazione domotica, l'efficienza energetica e una resa cromatica eccellente.",
    tags: ["Human Centric Lighting", "Comfort Visivo", "Integrazione Domotica", "UGR < 16"],
    vector: `
      <!-- Room with table and pendant lamp -->
      <line x1="20" y1="85" x2="80" y2="85" stroke="currentColor" stroke-width="2" opacity="0.3" />
      <line x1="30" y1="85" x2="30" y2="65" stroke="currentColor" stroke-width="1.5" opacity="0.3" />
      <line x1="70" y1="85" x2="70" y2="65" stroke="currentColor" stroke-width="1.5" opacity="0.3" />
      <line x1="25" y1="65" x2="75" y2="65" stroke="currentColor" stroke-width="2.5" opacity="0.5" />
      
      <!-- Pendant Light -->
      <line x1="50" y1="15" x2="50" y2="40" stroke="currentColor" stroke-width="1.5" opacity="0.4" />
      <path d="M42 40 L58 40 L54 34 L46 34 Z" fill="currentColor" opacity="0.6" />
      <path d="M40 40 C40 46, 60 46, 60 40 Z" fill="var(--color-accent)" />
      
      <!-- Radial Light Cone -->
      <polygon points="50,43 15,85 85,85" fill="url(#coneGrad)" opacity="0.4" />
      
      <defs>
        <linearGradient id="coneGrad" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stop-color="var(--color-accent)" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="var(--color-accent)" stop-opacity="0"/>
        </linearGradient>
      </defs>
    `
  },
  industriale: {
    title: "Illuminazione Industriale",
    desc: "Apparecchi di illuminazione a LED ad elevatissime prestazioni meccaniche e termiche per stabilimenti industriali, depositi logistici e impianti sportivi. Massima robustezza (IK10, IP66), efficienza lm/W leader del settore e ridottissima manutenzione negli anni.",
    tags: ["High-Bay Cappe", "Alta Efficienza (lm/W)", "Resistenza Termica", "IK10 Antivandalo"],
    vector: `
      <!-- Industrial warehouse beams and highbay lamp -->
      <polyline points="10,15 50,30 90,15" fill="none" stroke="currentColor" stroke-width="2" opacity="0.3" />
      <line x1="50" y1="30" x2="50" y2="42" stroke="currentColor" stroke-width="1.5" opacity="0.4" />
      
      <!-- Industrial Lamp -->
      <ellipse cx="50" cy="42" rx="14" ry="4" fill="currentColor" opacity="0.5" />
      <path d="M38 42 L62 42 L58 48 L42 48 Z" fill="currentColor" opacity="0.7" />
      
      <!-- Wide industrial beam -->
      <polygon points="50,48 5,85 95,85" fill="url(#indGrad)" opacity="0.35" />
      
      <defs>
        <linearGradient id="indGrad" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stop-color="var(--color-text)" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="var(--color-accent)" stop-opacity="0"/>
        </linearGradient>
      </defs>
    `
  },
  ferrotramviario: {
    title: "Illuminazione Ferrotramviaria",
    desc: "Soluzioni certificate e consolidate per veicoli su rotaia (treni, tram, metropolitane) e stazioni di transito. I nostri corpi illuminanti e le nostre schede elettroniche rispondono ai più rigidi standard di isolamento alle vibrazioni (EN 50155) e conformità fuoco-fumi.",
    tags: ["Standard EN 50155", "Conformità Fuoco-Fumi", "Inverter d'Emergenza", "Vibrazioni Zero"],
    vector: `
      <!-- Subway train profile and lighting lines -->
      <rect x="20" y="30" width="60" height="40" rx="10" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4" />
      <rect x="25" y="35" width="20" height="15" rx="3" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3" />
      <rect x="55" y="35" width="20" height="15" rx="3" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3" />
      
      <!-- Interior lights (LED strip representation) -->
      <line x1="28" y1="38" x2="42" y2="38" stroke="var(--color-accent)" stroke-width="2" />
      <line x1="58" y1="38" x2="72" y2="38" stroke="var(--color-accent)" stroke-width="2" />
      
      <!-- Train Headlight -->
      <circle cx="50" cy="60" r="4" fill="#ffffff" />
      <polygon points="50,60 10,80 90,80" fill="url(#railGrad)" opacity="0.4" />
      
      <defs>
        <linearGradient id="railGrad" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
        </linearGradient>
      </defs>
    `
  },
  navale: {
    title: "Illuminazione Navale",
    desc: "Corpi illuminanti a LED e sistemi integrati adatti ad ambienti corrosivi e marittimi (yacht privati, navi passeggeri, aree tecniche esterne). Massima attenzione all'ingombro (sistemi a bassissimo profilo), all'impermeabilità assoluta e all'inossidabilità dei materiali.",
    tags: ["Resistenza alla Salsedine", "Materiali AISI 316L", "Profilo Ultra-Slim", "Protezione Galvanica"],
    vector: `
      <!-- Yacht bow and water illumination -->
      <path d="M15 70 C40 70, 60 65, 80 50 L80 75 L15 75 Z" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4" />
      
      <!-- Deck Spotlight -->
      <circle cx="68" cy="52" r="3" fill="var(--color-accent)" />
      <polygon points="68,52 95,30 95,85" fill="url(#shipGrad)" opacity="0.4" />
      
      <!-- Underwater Light -->
      <circle cx="45" cy="70" r="2.5" fill="#00e5ff" />
      <polygon points="45,70 65,88 85,80" fill="url(#waterGrad)" opacity="0.4" />
      
      <defs>
        <linearGradient id="shipGrad" x1="0" y1="0.5" x2="1" y2="0.5">
          <stop offset="0%" stop-color="var(--color-accent)" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="var(--color-accent)" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="waterGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#00e5ff" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#00e5ff" stop-opacity="0"/>
        </linearGradient>
      </defs>
    `
  }
};

function initSectors() {
  const tabs = document.getElementById('settoriTabs');
  if (!tabs) return;

  const buttons = tabs.querySelectorAll('.sector-tab-btn');
  const title = document.getElementById('sectorDisplayName');
  const desc = document.getElementById('sectorDisplayDesc');
  const visual = document.getElementById('sectorVectorIcon');
  const container = document.getElementById('sectorDisplayCard');
  const tagWrap = container ? container.querySelector('.sector-features') : null;

  function renderSectorVisual(sectorId) {
    const data = SECTORS_DATA[sectorId];
    if (visual && data) {
      visual.innerHTML = data.vector;
    }
  }

  // Initial draw
  renderSectorVisual('architetturale');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const sectorId = btn.getAttribute('data-sector');
      const data = SECTORS_DATA[sectorId];

      if (!data) return;

      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (container) {
        container.style.opacity = 0;
        container.style.transform = 'translateY(8px)';
      }

      setTimeout(() => {
        if (title) title.textContent = data.title;
        if (desc) desc.textContent = data.desc;
        
        if (tagWrap) {
          tagWrap.innerHTML = '';
          data.tags.forEach(t => {
            const span = document.createElement('span');
            span.className = 'feature-tag';
            span.textContent = t;
            tagWrap.appendChild(span);
          });
        }

        renderSectorVisual(sectorId);

        if (container) {
          container.style.opacity = 1;
          container.style.transform = 'translateY(0)';
        }
      }, 200);
    });
  });
}

/* ==========================================================================
   4. Playground Room Simulator (Warm Architectural Studies)
   ========================================================================== */
function kelvinToRGB(kelvin) {
  let r, g, b;
  if (kelvin <= 4000) {
    const t = (kelvin - 2700) / 1300;
    r = 255;
    g = Math.round(180 + t * 60);
    b = Math.round(100 + t * 120);
  } else {
    const t = (kelvin - 4000) / 2500;
    r = Math.round(255 - t * 75);
    g = Math.round(240 - t * 30);
    b = Math.round(220 + t * 35);
  }
  return `rgb(${r}, ${g}, ${b})`;
}

function initPlayground() {
  const playgroundButtons = document.querySelectorAll('.playground-btn');
  const roomSimulator = document.getElementById('roomSimulator');
  const pgDimmer = document.getElementById('playgroundDimmer');
  const pgDimmerVal = document.getElementById('playgroundDimmerVal');
  const pgKelvin = document.getElementById('playgroundKelvin');
  const pgKelvinVal = document.getElementById('playgroundKelvinVal');
  const pgAngle = document.getElementById('playgroundAngle');
  const pgAngleVal = document.getElementById('playgroundAngleVal');
  const pgAngleWrap = document.getElementById('playgroundAngleWrap');

  if (playgroundButtons.length === 0 || !roomSimulator) return;

  let activeLight = 'radente'; // Default active light
  let lightIntensity = 1.0;
  let beamAngle = 0; // Default beam angle in degrees

  // Initialize view
  setLightLayer(activeLight);

  // Initialize Kelvin Light Color
  if (pgKelvin) {
    const initialKelvin = parseInt(pgKelvin.value);
    updateKelvinColor(initialKelvin);
  }

  playgroundButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      playgroundButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      activeLight = btn.getAttribute('data-light');
      setLightLayer(activeLight);
    });
  });

  if (pgDimmer && pgDimmerVal) {
    pgDimmer.addEventListener('input', (e) => {
      lightIntensity = e.target.value / 100;
      pgDimmerVal.textContent = `${e.target.value}%`;
      updateLightIntensity();
    });
  }

  if (pgKelvin && pgKelvinVal) {
    pgKelvin.addEventListener('input', (e) => {
      const kelvin = parseInt(e.target.value);
      updateKelvinColor(kelvin);
    });
  }

  if (pgAngle && pgAngleVal) {
    pgAngle.addEventListener('input', (e) => {
      beamAngle = parseInt(e.target.value);
      let dirLabel = 'Centrato';
      if (beamAngle < 0) {
        dirLabel = 'Sinistra';
      } else if (beamAngle > 0) {
        dirLabel = 'Destra';
      }
      pgAngleVal.textContent = `${Math.abs(beamAngle)}° (${dirLabel})`;
      updateLightRotation();
    });
  }

  function updateKelvinColor(kelvin) {
    let tempLabel = 'Calda';
    if (kelvin >= 3500 && kelvin <= 4500) {
      tempLabel = 'Naturale';
    } else if (kelvin > 4500) {
      tempLabel = 'Fredda';
    }
    if (pgKelvinVal) {
      pgKelvinVal.textContent = `${kelvin}K (${tempLabel})`;
    }
    const rgbColor = kelvinToRGB(kelvin);
    document.documentElement.style.setProperty('--playground-light-color', rgbColor);
  }

  function updateLightRotation() {
    const directBeam = roomSimulator.querySelector('#light-layer-diretta');
    const shadow = roomSimulator.querySelector('#sculpture-direct-shadow');
    
    if (directBeam) {
      directBeam.setAttribute('transform', `rotate(${beamAngle} 250 20)`);
    }
    if (shadow) {
      shadow.setAttribute('transform', `rotate(${beamAngle} 250 180)`);
    }
  }

  function setLightLayer(lightId) {
    const layers = roomSimulator.querySelectorAll('.light-layer');
    const shadow = roomSimulator.querySelector('#sculpture-direct-shadow');

    layers.forEach(layer => {
      const id = layer.getAttribute('id');
      if (id === `light-layer-${lightId}`) {
        layer.style.opacity = lightIntensity;
      } else {
        layer.style.opacity = 0;
      }
    });

    if (shadow) {
      if (lightId === 'diretta') {
        shadow.style.opacity = 0.85 * lightIntensity;
      } else {
        shadow.style.opacity = 0;
      }
    }

    // Toggle angle controls visibility
    if (lightId === 'diretta') {
      if (pgAngleWrap) pgAngleWrap.style.display = 'flex';
      if (pgAngle) pgAngle.style.display = 'block';
      updateLightRotation();
    } else {
      if (pgAngleWrap) pgAngleWrap.style.display = 'none';
      if (pgAngle) pgAngle.style.display = 'none';
      
      // Reset rotation on direct layers when hidden
      const directBeam = roomSimulator.querySelector('#light-layer-diretta');
      if (directBeam) directBeam.removeAttribute('transform');
      if (shadow) shadow.removeAttribute('transform');
    }
  }

  function updateLightIntensity() {
    const activeLayer = roomSimulator.querySelector(`#light-layer-${activeLight}`);
    const shadow = roomSimulator.querySelector('#sculpture-direct-shadow');

    if (activeLayer) {
      activeLayer.style.opacity = lightIntensity;
    }
    if (shadow && activeLight === 'diretta') {
      shadow.style.opacity = 0.85 * lightIntensity;
    }
  }
}

/* ==========================================================================
   5. Projects Portfolio details & Lightbox (No Custom Cursor Spotlight)
   ========================================================================== */
const PROJECTS_DETAILS = {
  david: {
    title: "David – Piazzale Michelangelo",
    location: "Firenze, Italia",
    category: "Illuminazione Monumentale",
    techMeta: "CRI > 95 | SDCM 3 | 3000K | IP67",
    cadImg: "projector_blueprint.png",
    desc: `
      <p>Ombre-1 ha curato e realizzato l'innovativo sistema di illuminazione permanente per la copia bronzea del David di Michelangelo collocata sul colle panoramico di Piazzale Michelangelo a Firenze.</p>
      <p>L'intervento valorizza i dettagli plastici del capolavoro rinascimentale, facendolo risaltare nella notte fiorentina con una precisione chirurgica. La luce proiettata è calibrata a una temperatura colore ottimale, volta ad esaltare le trame metalliche del bronzo ossidato evitando inquinamento luminoso circostante.</p>
      <h4>Dettagli Tecnici:</h4>
      <ul>
        <li>Moduli LED custom ad alta efficienza e bassissimo consumo.</li>
        <li>Resa cromatica superiore (CRI > 90) con calibrazione ottica antiriflesso.</li>
        <li>Sistemi di orientamento micrometrico e protezione climatica IP67.</li>
      </ul>
    `,
    collaborators: "In collaborazione con <strong>Griven Srl</strong> e <strong>Firenze Smart</strong>",
    imgs: [
      "https://www.ombre-1.com/wp-content/uploads/2022/02/David-copertina-1024x1024.jpg",
      "https://www.ombre-1.com/wp-content/uploads/2022/02/Griven.jpg",
      "https://www.ombre-1.com/wp-content/uploads/2022/02/firenze-smart.jpg"
    ]
  },
  "forte-marmi": {
    title: "Villa Privata Forte dei Marmi",
    location: "Forte dei Marmi, Lucca",
    category: "Collezione Glyptà da Esterni",
    techMeta: "CRI > 98 | SDCM 2 | 2700K | BRASS ED.",
    cadImg: "projector_blueprint.png",
    desc: `
      <p>Progetto integrato per l'illuminazione monumentale e funzionale degli ampi esterni e dei giardini di una prestigiosa villa privata a Forte dei Marmi.</p>
      <p>Il progetto vede come protagonista la collezione <strong>Glyptà</strong> (modelli <em>Kýklos</em>, <em>Kónos</em> e <em>Dáda</em>), lampade monumentali che fondono blocchi massicci di marmo di Carrara con i profili LED custom di Ombre-1. Il risultato è un percorso luminoso sofisticato che enfatizza il verde, i camminamenti esterni e le aree relax bordo piscina senza abbagliamento.</p>
    `,
    collaborators: "Architettura del Paesaggio: <strong>Ombre-1 Custom Lab</strong>",
    imgs: [
      "https://www.ombre-1.com/wp-content/uploads/2022/05/Ombre-1-Villa-privata-1024x1024.jpg",
      "https://www.ombre-1.com/wp-content/uploads/2022/05/Ombre-1-VillaPrivata-35.jpg",
      "https://www.ombre-1.com/wp-content/uploads/2022/05/Ombre-1-VillaPrivata-36.jpg"
    ]
  },
  panteraie: {
    title: "Le Panteraie",
    location: "Montecatini Terme, Pistoia",
    category: "Illuminazione Commerciale",
    techMeta: "LINEAR PROFILE | Ra > 95 | TUNABLE WHITE",
    cadImg: "linear_blueprint.png",
    desc: `
      <p>Riqualificazione luminosa del prestigioso complesso 'Le Panteraie'. Un intervento coordinato che coinvolge l'illuminazione di accento degli esterni in pietra, dell'area piscina notturna e degli interni della struttura commerciale.</p>
      <p>Sono state utilizzate barre lineari custom ad incasso per segnare i volumi architettonici, creando atmosfere calde e rilassanti con l'integrazione di sistemi di controllo dimmerabili e scenari RGB dinamici.</p>
    `,
    collaborators: "Lighting designer partner locali",
    imgs: [
      "https://www.ombre-1.com/wp-content/uploads/2022/05/LePanterie-1024x1024.jpg"
    ]
  },
  cascina: {
    title: "Municipio di Cascina",
    location: "Cascina, Pisa",
    category: "Illuminazione Architetturale Civica",
    techMeta: "CRI > 90 | SDCM 3 | 3000K | HIGH-POWER",
    cadImg: "projector_blueprint.png",
    desc: `
      <p>Sviluppo di proiettori lineari ad alta potenza per la valorizzazione artistica del Palazzo Municipale di Cascina.</p>
      <p>La luce lineare sfiora le facciate storiche sottolineando le nicchie, i portoni ad arco e le finestre dell'edificio con una tonalità di bianco caldo che esalta il calore dei materiali da costruzione originali del territorio toscano.</p>
    `,
    collaborators: "Direzione Lavori: <strong>Ufficio Tecnico Comune di Cascina</strong>",
    imgs: [
      "https://www.ombre-1.com/wp-content/uploads/2022/03/municipio-cascina-1024x1024.jpg"
    ]
  },
  "villa-reale": {
    title: "Villa Reale di Marlia",
    location: "Capannori, Lucca",
    category: "Illuminazione Giardini Storici",
    techMeta: "CRI > 95 | OPTICAL LENS | 2700K | IP67",
    cadImg: "projector_blueprint.png",
    desc: `
      <p>La monumentale facciata tardo-rinascimentale di Villa Reale risplende grazie a corpi illuminanti miniaturizzati installati a scomparsa sui cornicioni.</p>
      <p>L'installazione è stata studiata per minimizzare l'impatto visivo diurno dell'hardware, soddisfacendo le rigide richieste della Sovrintendenza per i Beni Culturali. Di notte, il fascio luminoso disegna le perfette geometrie della villa e si estende alla valorizzazione degli alberi monumentali e del lago interno.</p>
    `,
    collaborators: "In collaborazione con <strong>Villa Reale Holding Srl</strong>",
    imgs: [
      "https://www.ombre-1.com/wp-content/uploads/2021/09/1-3-1024x1024.jpg",
      "https://www.ombre-1.com/wp-content/uploads/2021/09/VillaReale-01.jpg",
      "https://www.ombre-1.com/wp-content/uploads/2021/09/VillaReale-02.jpg"
    ]
  },
  "venezia-mestre": {
    title: "Venezia Mestre",
    location: "Venezia, Italia",
    category: "Illuminazione Urbana",
    techMeta: "LINEAR LED | 4000K | IP68 CALPESTABILE",
    cadImg: "linear_blueprint.png",
    desc: `
      <p>Fornitura di barre LED rigide ed elementi di illuminazione lineare custom integrati nei camminamenti pedonali e nelle aree pubbliche all'aperto.</p>
      <p>I profilati in alluminio e resina poliuretanica con impermeabilità stagna garantiscono il perfetto funzionamento degli elementi luminosi anche in ambienti ad alto tasso di umidità e soggetti a calpestio pesante.</p>
    `,
    collaborators: "Imprese di Urbanizzazione ed Infrastrutture Pubbliche",
    imgs: [
      "https://www.ombre-1.com/wp-content/uploads/2021/02/venezia-mestre-1024x1024.jpg"
    ]
  },
  agliana: {
    title: "Comune di Agliana",
    location: "Agliana, Pistoia",
    category: "Illuminazione Civica",
    techMeta: "CRI > 90 | SDCM 3 | 3000K | ENERGY SAVING",
    cadImg: "projector_blueprint.png",
    desc: `
      <p>Interventi di riqualificazione a LED del Palazzo Comunale e di altri monumenti iconici del territorio di Agliana, città che ospita la manifattura e il quartier generale di Ombre-1.</p>
      <p>Il progetto mira ad incrementare l'efficienza energetica della città riducendo i costi di gestione comunali, pur migliorando sensibilmente l'estetica notturna del borgo storico.</p>
    `,
    collaborators: "Ufficio Tecnico LL.PP. <strong>Comune di Agliana</strong>",
    imgs: [
      "https://www.ombre-1.com/wp-content/uploads/2021/02/Comune-di-Agliana-1024x1024.jpg"
    ]
  },
  guicciardini: {
    title: "Villa Guicciardini Usella",
    location: "Cantagallo, Prato",
    category: "Dimore Storiche",
    techMeta: "CRI > 95 | SDCM 2 | 2700K | ACCENT LIGHT",
    cadImg: "projector_blueprint.png",
    desc: `
      <p>Illuminazione d'accento per i giardini storici e la maestosa facciata seicentesca di Villa Guicciardini.</p>
      <p>Le sorgenti LED, calde e soffuse, sono posizionate per dare profondità e teatralità notturna ai vialetti alberati e alle alberature monumentali del parco, integrandosi perfettamente con il paesaggio naturale toscano.</p>
    `,
    collaborators: "Partner architetti del paesaggio",
    imgs: [
      "https://www.ombre-1.com/wp-content/uploads/2021/02/Villa-Guicciardini-1024x1024.jpg"
    ]
  },
  showroom: {
    title: "Showroom Moment & Romance",
    location: "Prato, Italia",
    category: "Illuminazione Retail",
    techMeta: "CRI > 97 | SDCM 2 | 4000K | UGR < 16",
    cadImg: "linear_blueprint.png",
    desc: `
      <p>Soluzione illuminotecnica ad elevata fedeltà cromatica per lo showroom espositivo tessile Moment & Romance.</p>
      <p>L'integrazione di proiettori a binario con moduli LED ad altissimo CRI (Indice di Resa Cromatica > 97) permette ai clienti di percepire i tessuti e i campioni di colore esattamente come sotto la luce naturale, facilitando la selezione ed esaltando la qualità della merce.</p>
    `,
    collaborators: "Design degli Interni: <strong>Studio Architettura Prato</strong>",
    imgs: [
      "https://www.ombre-1.com/wp-content/uploads/2021/02/Showroom-Moment-1024x1024.jpg",
      "https://www.ombre-1.com/wp-content/uploads/2021/02/martinelli.jpg"
    ]
  }
};

let currentSlideIdx = 0;
let activeProjectData = null; // Track current project details

function initProjects() {
  const grid = document.getElementById('progettiGrid');
  const modal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalClose');
  const photoBtn = document.getElementById('modalViewPhoto');
  const cadBtn = document.getElementById('modalViewCAD');
  
  if (!grid || !modal) return;

  const cards = grid.querySelectorAll('.progetto-card-flashlight');

  cards.forEach(card => {
    // Click handler to open project overlay
    card.addEventListener('click', () => {
      const projId = card.getAttribute('data-project-id');
      const data = PROJECTS_DETAILS[projId];
      if (!data) return;

      activeProjectData = data;
      populateModal(data);
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    activeProjectData = null;
  }

  // Slide controls
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');

  if (prevBtn) prevBtn.addEventListener('click', () => changeSlide(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => changeSlide(1));

  // Modal view toggle
  if (photoBtn) {
    photoBtn.addEventListener('click', () => {
      setModalView('photo');
    });
  }

  if (cadBtn) {
    cadBtn.addEventListener('click', () => {
      setModalView('cad');
    });
  }
}

function setModalView(viewType) {
  if (!activeProjectData) return;
  
  const photoBtn = document.getElementById('modalViewPhoto');
  const cadBtn = document.getElementById('modalViewCAD');
  const slides = document.querySelectorAll('.slide-item:not(.slide-item-cad)');
  const cadSlide = document.querySelector('.slide-item-cad');
  const controls = document.querySelector('.slider-controls');
  const dotsContainer = document.getElementById('sliderDots');
  
  if (viewType === 'cad') {
    if (photoBtn) photoBtn.classList.remove('active');
    if (cadBtn) cadBtn.classList.add('active');
    
    // Hide photo slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Show CAD slide
    if (cadSlide) {
      cadSlide.classList.add('active');
    }
    
    // Hide slider controls
    if (controls) controls.style.display = 'none';
    if (dotsContainer) dotsContainer.style.display = 'none';
  } else {
    if (photoBtn) photoBtn.classList.add('active');
    if (cadBtn) cadBtn.classList.remove('active');
    
    // Hide CAD slide
    if (cadSlide) {
      cadSlide.classList.remove('active');
    }
    
    // Show current photo slide
    slides.forEach((slide, i) => {
      if (i === currentSlideIdx) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
    
    // Restore controls if we have multiple images
    if (activeProjectData.imgs.length > 1) {
      if (controls) controls.style.display = 'flex';
      if (dotsContainer) dotsContainer.style.display = 'flex';
    } else {
      if (controls) controls.style.display = 'none';
      if (dotsContainer) dotsContainer.style.display = 'none';
    }
  }
}

function populateModal(data) {
  currentSlideIdx = 0;

  const cat = document.getElementById('modalProjCategory');
  const title = document.getElementById('modalProjTitle');
  const loc = document.getElementById('modalProjLocation');
  const tech = document.getElementById('modalProjTechMeta');
  const info = document.getElementById('modalProjInfo');
  const collab = document.getElementById('modalProjCollaborators');

  if (cat) cat.textContent = data.category;
  if (title) title.textContent = data.title;
  if (loc) loc.textContent = data.location;
  if (tech) tech.textContent = data.techMeta || '';
  if (info) info.innerHTML = data.desc;
  if (collab) collab.innerHTML = data.collaborators || '';

  const slider = document.getElementById('modalSlider');
  const dotsContainer = document.getElementById('sliderDots');
  
  if (!slider) return;
  slider.innerHTML = '';
  if (dotsContainer) dotsContainer.innerHTML = '';

  // Append standard photo slides
  data.imgs.forEach((imgSrc, i) => {
    const slide = document.createElement('div');
    slide.className = `slide-item ${i === 0 ? 'active' : ''}`;
    slide.style.backgroundImage = `url('${imgSrc}')`;
    slider.appendChild(slide);

    if (dotsContainer) {
      const dot = document.createElement('span');
      dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  });

  // Append CAD slide
  if (data.cadImg) {
    const cadSlide = document.createElement('div');
    cadSlide.className = 'slide-item slide-item-cad';
    cadSlide.style.backgroundImage = `url('${data.cadImg}')`;
    slider.appendChild(cadSlide);
  }

  // Set default view to photo
  setModalView('photo');
}

function changeSlide(direction) {
  const slides = document.querySelectorAll('.slide-item:not(.slide-item-cad)');
  const dots = document.querySelectorAll('.slider-dot');
  if (slides.length === 0) return;

  slides[currentSlideIdx].classList.remove('active');
  if (dots[currentSlideIdx]) dots[currentSlideIdx].classList.remove('active');

  currentSlideIdx = (currentSlideIdx + direction + slides.length) % slides.length;

  slides[currentSlideIdx].classList.add('active');
  if (dots[currentSlideIdx]) dots[currentSlideIdx].classList.add('active');
}

function goToSlide(index) {
  const slides = document.querySelectorAll('.slide-item:not(.slide-item-cad)');
  const dots = document.querySelectorAll('.slider-dot');
  if (slides.length === 0 || index === currentSlideIdx) return;

  slides[currentSlideIdx].classList.remove('active');
  if (dots[currentSlideIdx]) dots[currentSlideIdx].classList.remove('active');

  currentSlideIdx = index;

  slides[currentSlideIdx].classList.add('active');
  if (dots[currentSlideIdx]) dots[currentSlideIdx].classList.add('active');
}

/* ==========================================================================
   6. Portfolio Grid Filtering
   ========================================================================== */
function initProjectsFilter() {
  const filterBar = document.getElementById('portfolioFilterBar');
  const grid = document.getElementById('progettiGrid');
  
  if (!filterBar || !grid) return;

  const buttons = filterBar.querySelectorAll('.filter-btn');
  const cards = grid.querySelectorAll('.progetto-card-flashlight');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active button state
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Apply filter to cards
      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          card.classList.remove('filtered-out');
        } else {
          card.classList.add('filtered-out');
        }
      });
    });
  });
}

/* ==========================================================================
   7. Certifications Lightbox Zoom
   ========================================================================== */
function initCertifications() {
  const certLightbox = document.getElementById('certLightbox');
  const certLightboxImg = document.getElementById('certLightboxImg');
  const certLightboxClose = document.getElementById('certLightboxClose');
  const certCards = document.querySelectorAll('.cert-card-img');

  if (!certLightbox || !certLightboxImg) return;

  certCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      if (img) {
        certLightboxImg.src = img.src;
        certLightboxImg.alt = img.alt;
        certLightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (certLightboxClose) {
    certLightboxClose.addEventListener('click', closeLightbox);
  }
  certLightbox.addEventListener('click', (e) => {
    if (e.target === certLightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certLightbox.classList.contains('open')) {
      closeLightbox();
    }
  });

  function closeLightbox() {
    certLightbox.classList.remove('open');
    const pModal = document.getElementById('projectModal');
    if (pModal && !pModal.classList.contains('open')) {
      document.body.style.overflow = '';
    }
  }
}

/* ==========================================================================
   8. Contact Form Simulated Submit
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const submitBtn = document.getElementById('form-submit-btn');

  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const originalText = submitBtn ? submitBtn.textContent : 'Invia';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Invio in corso...';
      submitBtn.style.opacity = 0.7;
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.style.opacity = 1;
      }

      status.textContent = 'Grazie! Il messaggio è stato inviato correttamente. Ti ricontatteremo a breve.';
      status.className = 'form-status success';
      status.style.display = 'block';

      form.reset();

      setTimeout(() => {
        status.style.display = 'none';
      }, 5000);
    }, 1200);
  });
}

/* ==========================================================================
   9. Scroll-Driven Reveal Observer
   ========================================================================== */
function initScrollReveal() {
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const header = section.querySelector('.section-header-editorial');
    if (header) {
      header.classList.add('reveal-fade');
    }
    
    const elementsToReveal = section.querySelectorAll('.azienda-grid, .settori-tabs, .sector-display-card, .servizi-grid, .playground-grid, .linear-catalogue-banner, .portfolio-filter-bar, .progetti-grid, .cert-grid, .contatti-grid');
    elementsToReveal.forEach(el => {
      el.classList.add('reveal-slide-up');
    });
  });

  const revealElements = document.querySelectorAll('.reveal-fade, .reveal-slide-up, .section-header-editorial');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -12% 0px',
    threshold: 0.05
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}
