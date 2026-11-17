// Renders the portfolio from data.js. Content edits belong in data.js, not here.
(function () {
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const { PROFILE: P, SKILLS, PROJECTS, JOURNEY, FOUNDER: F } = window;

  const ICONS = {
    cross: '<path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z"/>',
    scan: '<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><path d="M8 9h2M8 12h5M8 15h3"/>',
    pulse: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
  };
  const svg = (k) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[k] || ICONS.pulse}</svg>`;
  const isExt = (h) => /^https?:/.test(h);
  const target = (h) => (isExt(h) ? ' target="_blank" rel="noopener"' : '');

  const TYPE = {
    achievement: { label: 'Achievement', color: '#F5B942' },
    certificate: { label: 'Certificate', color: '#F5B942' },
    experience: { label: 'Experience', color: '#F472B6' },
    venture: { label: 'Venture', color: '#FB923C' },
    project: { label: 'Project', color: '#22D3EE' },
    education: { label: 'Education', color: '#A78BFA' },
  };

  // ── HERO
  $('heroStatus').textContent = `B.Tech AI & ML · New Horizon College of Engineering · ${P.location.split(',')[0]}`;
  $('heroName').textContent = P.name;
  $('heroIntro').textContent = P.intro;
  const awards = JOURNEY.filter((j) => j.type === 'achievement' || j.type === 'certificate');
  const demos = PROJECTS.filter((p) => p.demo).length;
  $('heroStats').innerHTML = [
    [PROJECTS.length, 'Projects built'],
    [demos, 'Live demos you can try'],
    [1, 'Company founded — SATH'],
    [awards.length, awards.length === 1 ? 'National-level recognition' : 'Achievements & certificates'],
  ].map(([n, l]) => `<div class="bento__cell spot"><div class="bento__num">${esc(n)}</div><div class="bento__label">${esc(l)}</div></div>`).join('');

  // Typewriter rotating roles
  (function rotate() {
    const el = $('rotator');
    const words = ['founder.', 'software builder.', 'AI & ML student.', 'problem solver.'];
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = words[0]; return; }
    let w = 0, i = 0, del = false;
    (function tick() {
      const word = words[w];
      el.textContent = word.slice(0, i);
      if (!del && i === word.length) { del = true; return setTimeout(tick, 1600); }
      if (del && i === 0) { del = false; w = (w + 1) % words.length; }
      i += del ? -1 : 1;
      setTimeout(tick, del ? 45 : 85);
    })();
  })();

  // ── MARQUEE (duplicated for a seamless loop)
  const words = [...new Set(SKILLS.flatMap((g) => g.items).concat(['GST Billing', 'Offline-first Apps', 'Smart Cities', 'Startups']))];
  $('marquee').innerHTML = [...words, ...words].map((w) => `<span>${esc(w)}</span>`).join('');

  // ── SKILLS
  $('skills').innerHTML = SKILLS.map((g) => `
    <div class="skill spot reveal"><h3>${esc(g.group)}</h3><div class="chips">${g.items.map((i) => `<span class="chip">${esc(i)}</span>`).join('')}</div></div>`).join('');

  // ── PROJECTS
  const browser = (p) => `
    <div class="browser">
      <div class="browser__bar"><i></i><i></i><i></i><span class="browser__url">maiutkarsh.github.io/${esc(p.demo.split('?')[0])}</span></div>
      <img src="${esc(p.image)}" alt="${esc(p.name)} screenshot" loading="lazy" width="1280" height="800" />
    </div>`;
  const foot = (p) => `
    <div class="project__foot">
      ${p.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}
      ${p.demo ? `<a class="btn btn--primary btn--sm" href="${esc(p.demo)}"${target(p.demo)}><span class="live-dot"></span>${esc(p.demoLabel || 'Live demo')} ↗</a>` : `<span class="status">${esc(p.status || 'Coming soon')}</span>`}
    </div>
    ${p.demoNote ? `<div class="note">${esc(p.demoNote)}</div>` : ''}`;
  const body = (p) => `
    <div class="meta">${esc(p.kind)} · ${esc(p.period)}</div>
    <h3>${esc(p.name)}</h3>
    <p class="tagline">${esc(p.tagline)}</p>
    <p class="muted">${esc(p.text)}</p>
    <ul class="points">${p.points.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`;

  const feat = PROJECTS.find((p) => p.featured);
  if (feat) {
    $('featured').innerHTML = `
      <article class="featured spot reveal" style="--pa:${feat.accent}">
        <a href="${esc(feat.demo)}" aria-label="Open ${esc(feat.name)} live demo">${browser(feat)}</a>
        <div>
          <span class="featured__badge"><span class="live-dot"></span>Featured · Live demo</span>
          ${body(feat).replace('<h3>', '<h3 class="featured__title">')}
          ${foot(feat)}
        </div>
      </article>`;
  }
  $('projects').innerHTML = PROJECTS.filter((p) => !p.featured).map((p) => `
    <article class="project spot reveal" style="--pa:${p.accent}">
      <div class="project__media">${p.image && p.demo ? `<a href="${esc(p.demo)}"${target(p.demo)} aria-label="Open ${esc(p.name)}">${browser(p)}</a>` : `<div class="project__art">${svg(p.icon)}</div>`}</div>
      <div class="project__body">${body(p)}${foot(p)}</div>
    </article>`).join('');

  // ── ACHIEVEMENTS / CERTIFICATES (newest first)
  const certs = JOURNEY.filter((j) => (j.type === 'achievement' || j.type === 'certificate') && j.image).sort((a, b) => b.date.localeCompare(a.date));
  $('certs').innerHTML = certs.map((c, i) => `
    <article class="cert spot reveal">
      <button class="cert__img" data-cert="${i}" aria-label="View certificate: ${esc(c.title)}"><img src="${esc(c.image)}" alt="${esc(c.title)}" loading="lazy" width="1400" height="990" /><span>Click to view</span></button>
      <div>
        <span class="cert__badge">★ ${esc(TYPE[c.type].label)}</span>
        <h3>${esc(c.title)}</h3>
        <div class="cert__org">${esc(c.org)}</div>
        <div class="cert__date">${esc(c.label)}</div>
        ${c.text ? `<p class="muted">${esc(c.text)}</p>` : ''}
        ${c.cert ? `<a class="btn btn--glass btn--sm" href="${esc(c.cert)}" target="_blank" rel="noopener">View certificate (PDF) ↗</a>` : ''}
      </div>
    </article>`).join('');
  const lb = $('lightbox');
  $('certs').addEventListener('click', (e) => {
    const b = e.target.closest('[data-cert]');
    if (!b) return;
    const c = certs[+b.dataset.cert];
    $('lightboxImg').src = c.image;
    $('lightboxImg').alt = c.title;
    $('lightboxPdf').href = c.cert || c.image;
    lb.showModal ? lb.showModal() : window.open(c.image, '_blank');
  });
  $('lightboxClose').addEventListener('click', () => lb.close());
  lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });

  // ── JOURNEY — sorted newest first, grouped by year, filterable
  const sorted = [...JOURNEY].sort((a, b) => b.date.localeCompare(a.date));
  const types = ['all', ...Object.keys(TYPE).filter((t) => sorted.some((j) => j.type === t))];
  let active = 'all';
  function renderTimeline() {
    let lastYear = '';
    $('timeline').innerHTML = sorted.filter((j) => active === 'all' || j.type === active).map((j) => {
      const t = TYPE[j.type] || TYPE.project;
      const year = j.date.slice(0, 4);
      const yearRow = year !== lastYear ? `<li class="year" aria-hidden="true">${year}</li>` : '';
      lastYear = year;
      const links = [
        j.cert && `<a class="event__link" href="${esc(j.cert)}" target="_blank" rel="noopener">View certificate ↗</a>`,
        j.link && `<a class="event__link" href="${esc(j.link)}"${target(j.link)}>${esc(j.linkText || 'Open')} ↗</a>`,
      ].filter(Boolean).join('');
      return `${yearRow}
        <li class="event ${j.highlight ? 'event--highlight' : ''}" style="--ec:${t.color}">
          <span class="event__dot"></span>
          <div class="event__card spot">
            <div class="event__head"><span class="badge">${t.label}</span><span class="event__date">${esc(j.label)}</span></div>
            <h3>${esc(j.title)}</h3>
            ${j.org ? `<div class="event__org">${esc(j.org)}</div>` : ''}
            ${j.text ? `<p class="event__text">${esc(j.text)}</p>` : ''}
            ${links ? `<div class="event__links">${links}</div>` : ''}
          </div>
        </li>`;
    }).join('');
  }
  $('filters').innerHTML = types.map((t) => `<button class="filter" role="tab" data-t="${t}" aria-selected="${t === 'all'}">${t === 'all' ? 'All' : TYPE[t].label}</button>`).join('');
  $('filters').addEventListener('click', (e) => {
    const b = e.target.closest('.filter');
    if (!b) return;
    active = b.dataset.t;
    document.querySelectorAll('.filter').forEach((x) => x.setAttribute('aria-selected', x === b));
    renderTimeline();
  });
  renderTimeline();

  // ── FOUNDER
  $('founderPhoto').src = F.photo;
  $('founderName').textContent = P.name;
  $('founderRole').textContent = `${F.role} · ${F.company}`;
  $('founderQuote').textContent = `“${F.quote}”`;
  $('founderText').textContent = F.text;
  $('founderSite').href = F.site;
  if (isExt(F.site)) { $('founderSite').target = '_blank'; $('founderSite').rel = 'noopener'; }

  // ── CONTACT
  const links = [
    P.email && [`mailto:${P.email}`, `Email me`],
    P.linkedin && [P.linkedin, 'LinkedIn ↗'],
    P.github && [P.github, 'GitHub ↗'],
    F.site && [F.site, 'SATH सहायता ↗'],
  ].filter(Boolean);
  $('contactLinks').innerHTML = links.map(([h, t], i) => `<a class="btn ${i === 0 ? 'btn--primary' : 'btn--glass'}" href="${esc(h)}"${target(h)}>${esc(t)}</a>`).join('');
  $('year').textContent = new Date().getFullYear();

  // ── THEME
  const root = document.documentElement;
  try { const saved = localStorage.getItem('theme'); if (saved) root.dataset.theme = saved; } catch (e) {}
  $('themeBtn').addEventListener('click', () => {
    const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  });

  // ── Spotlight glow follows the cursor on cards
  document.addEventListener('pointermove', (e) => {
    const card = e.target.closest && e.target.closest('.spot');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  });

  // ── Active nav link
  const navLinks = [...document.querySelectorAll('.nav__links a')];
  const sections = navLinks.map((a) => document.querySelector(a.getAttribute('href')));
  const onScroll = () => {
    const y = scrollY + 140;
    let idx = -1;
    sections.forEach((s, i) => { if (s && s.offsetTop <= y) idx = i; });
    navLinks.forEach((a, i) => a.classList.toggle('active', i === idx));
  };
  addEventListener('scroll', onScroll, { passive: true });

  // ── Reveal on scroll
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.1 })
    : null;
  document.querySelectorAll('.reveal').forEach((el) => (io ? io.observe(el) : el.classList.add('in')));
})();
