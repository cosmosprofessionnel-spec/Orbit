/* ===== Site CosmOS / Orbit — menu, pied de page, langue, liens ===== */
(function () {
  'use strict';
  // Tous les liens importants sont ici : un seul endroit à modifier
  var LINKS = {
    invite: 'https://discord.com/oauth2/authorize?client_id=1551774049808678972&permissions=326686067728&scope=bot+applications.commands',
    vote: 'https://top.gg/bot/1551774049808678972/vote',
    dashboard: 'http://fi4.bot-hosting.cloud:26000',
    support: 'https://discord.gg/anFSkHyWSw',   // serveur support (lien donné par /structure de Polaris)
    community: 'https://discord.gg/anFSkHyWSw', // serveur CosmOS
    kofi: 'https://ko-fi.com/cosmoos'
  };
  var PAGES = [
    ['index.html', 'Accueil', 'Home'],
    ['orbit.html', 'Orbit', 'Orbit'],
    ['polaris.html', 'Polaris', 'Polaris'],
    ['services.html', 'Services', 'Services'],
    ['support.html', 'Support', 'Support']
  ];
  var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (here === '' || here.indexOf('.') === -1) here = 'index.html';

  function t(fr, en) { return '<span class="fr">' + fr + '</span><span class="en">' + en + '</span>'; }

  // ---- menu ----
  var nav = document.createElement('header');
  nav.className = 'nav';
  nav.innerHTML = '<div class="wrap">' +
    '<a class="brand" href="index.html"><img src="avatar.png" alt="">CosmOS</a>' +
    '<nav class="links" id="links">' + PAGES.map(function (p) {
      return '<a href="' + p[0] + '"' + (p[0] === here ? ' class="active"' : '') + '>' + t(p[1], p[2]) + '</a>';
    }).join('') + '<a class="mob" data-link="dashboard">⚙️ ' + t('Tableau de bord', 'Dashboard') + '</a></nav>' +
    '<div class="right"><span class="lang"><button data-l="fr">FR</button><button data-l="en">EN</button></span>' +
    '<a class="btn sm dash" data-link="dashboard">⚙️ ' + t('Tableau de bord', 'Dashboard') + '</a>' +
    '<button class="burger" id="burger" aria-label="Menu">☰</button></div></div>';
  document.body.insertBefore(nav, document.body.firstChild);
  document.getElementById('burger').addEventListener('click', function () { document.getElementById('links').classList.toggle('open'); });

  // ---- pied de page ----
  var foot = document.createElement('footer');
  foot.innerHTML = '<div class="wrap"><span class="grow">© 2026 CosmOS • ' + t('Fait avec 💜 par Cosmos', 'Made with 💜 by Cosmos') + '</span>' +
    '<a href="orbit.html">Orbit</a><a href="polaris.html">Polaris</a><a href="services.html">Services</a><a href="support.html">Support</a>' +
    '<a href="terms.html">' + t('Conditions', 'Terms') + '</a><a href="privacy.html">' + t('Confidentialité', 'Privacy') + '</a>' +
    '<a data-link="kofi">☕ Ko-fi</a></div>';
  document.body.appendChild(foot);

  // ---- liens ----
  document.querySelectorAll('[data-link]').forEach(function (a) {
    var url = LINKS[a.getAttribute('data-link')];
    if (!url) return;
    a.setAttribute('href', url);
    if (/^https?:/.test(url)) { a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener'); }
  });

  // ---- langue ----
  var gate = document.createElement('div');
  gate.className = 'gate hidden';
  gate.innerHTML = '<div class="box"><img src="avatar.png" alt=""><h2>Choisis ta langue<br><small style="color:var(--muted);font-weight:400">Choose your language</small></h2>' +
    '<button data-l="fr">🇫🇷 Français</button><button data-l="en">🇬🇧 English</button></div>';
  document.body.appendChild(gate);
  var saved = null;
  try { saved = localStorage.getItem('orbit-lang'); } catch (e) { saved = null; }
  function apply(l) {
    document.body.classList.toggle('en', l === 'en');
    document.documentElement.lang = l;
    document.querySelectorAll('.lang button').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-l') === l); });
    try { localStorage.setItem('orbit-lang', l); } catch (e) { /* navigation privée */ }
  }
  document.querySelectorAll('[data-l]').forEach(function (b) {
    b.addEventListener('click', function () { apply(b.getAttribute('data-l')); gate.classList.add('hidden'); });
  });
  apply(saved || ((navigator.language || 'fr').slice(0, 2) === 'fr' ? 'fr' : 'en'));
  if (!saved) gate.classList.remove('hidden');

  // ---- apparition au défilement ----
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }
}());
