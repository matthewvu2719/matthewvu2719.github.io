// ── LOADER ──
window.addEventListener('load', function () {
  setTimeout(function () { document.querySelector('.loader').classList.add('hidden'); }, 700);
});

// ── NAV SCROLL ──
function scrollTo(id) {
  var el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ── FOOTER YEAR ──
document.addEventListener('DOMContentLoaded', function () {
  var fy = document.getElementById('footer-year');
  if (fy) fy.textContent = new Date().getFullYear();
});

// ── CLOCK ──
function tick() {
  var t = new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'America/Toronto' });
  var el = document.getElementById('clock');
  var fc = document.getElementById('footer-clock');
  if (el) el.textContent = 'Toronto · ' + t;
  if (fc) fc.textContent = t + ' ET';
}
tick(); setInterval(tick, 1000);

// ── FILTER ──
document.addEventListener('DOMContentLoaded', function () {
  // default to web
  document.querySelectorAll('.project-card').forEach(function (c) {
    c.classList.toggle('hidden', c.dataset.cat !== 'web');
  });

  document.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach(function (c) {
        c.classList.toggle('hidden', c.dataset.cat !== f);
      });
    });
  });
});

// ── CARD CLICKS ──
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.project-card[data-index]').forEach(function (card) {
    card.addEventListener('click', function () {
      openModal(parseInt(card.dataset.index, 10));
    });
  });
});

// ── PROJECT DATA ──
var projects = [
  {
    title: 'Ren',
    desc: 'Ren turns your new tab into a sushi restaurant that evolves with your habits. Compete with global users or your friends. Log daily habits to grow your streak, unlock restaurant upgrades, and fill your dining room with guests.',
    slides: ['img/ren1.mp4','img/ren2.mp4','img/ren5.mp4','img/ren3.mp4','img/ren4.mp4','img/ren6.mp4'],
    tech: ['nextjs','react','zustand','supabase','gemini'],
    demo: 'https://ren-habit.vercel.app/'
  },
  {
    title: 'Sheep Guard',
    desc: 'This Chrome extension is more than a site blocker - it\'s a companion that understands you. Whether you\'re managing ADHD, battling procrastination, or simply trying to stay focused, Sheep Guard adapts to your unique needs with AI-powered personalization and a rewarding gamification system.',
    slides: ['img/sheepguard1.mp4','img/sheepguard2.mp4','img/sheepguard3.mp4','img/sheepguard4.mp4','img/sheepguard5.mp4'],
    tech: ['threejs','vite','supabase','vercel', 'gemini'],
    demo: 'https://sheep-guard.vercel.app/info'
  },
  {
    title: 'Admittree',
    desc: 'A centralized hub for Canadian university programs admission, which feature specialized and personalized roadmap with an actionable checklist and an AI consultant.',
    slides: ['img/admittree1.mp4','img/admittree2.mp4','img/admittree3.mp4','img/admittree4.mp4'],
    tech: ['mongodb','python','react','flask','digitalocean'],
    demo: 'https://github.com/matthewvu2719/admit-tree/tree/consultant',
    github: 'https://github.com/matthewvu2719/admit-tree/tree/consultant'
  },
  {
    title: 'Journey',
    desc: 'A gamified habit tracker with an AI-powered companion named Bobo that helps users build consistent habits through intelligent obstacle detection, personalized solutions, and achievement-based rewards. Features real-time analytics, smart friction removal, chat bot.',
    slides: ['img/bobo1.mp4','img/bobo2.mp4','img/bobo3.mp4','img/bobo4.mp4'],
    tech: ['supabase','python','react','fastapi','groq','docker'],
    demo: 'https://github.com/matthewvu2719/Journey',
    github: 'https://github.com/matthewvu2719/Journey'
  },
  {
    title: 'TestQuest!',
    desc: 'A gamified study with me web app for kids. User can study using pomodoro sessions, AI generated quizzes and answers, and earn rewards which will be used in the 2D platformer game.',
    slides: ['img/testQuest.mp4','img/testQuest1.mp4','img/testQuest2.mp4','img/testQuest3.mp4'],
    tech: ['react','nodejs','c#','unity','webgl'],
    demo: 'https://test-quest-zeta.vercel.app',
    github: 'https://github.com/matthewvu2719/TestQuest'
  },
  {
    title: 'Lucid Souls',
    desc: 'Immersive lucid dreaming simulation exploring psychological dream awareness. Features multi-level lucidity progression from sub-lucid to fully lucid states with dynamic perspective changing and real-time object manipulation.',
    slides: ['img/lucidsouls1.mp4','img/lucidsouls2.mp4','img/lucidsouls3.mp4','img/lucidsouls4.mp4'],
    tech: ['unreal engine','c++'],
    github: 'https://github.com/matthewvu2719/LucidSouls/tree/MatthewBranch'
  },
  {
    title: 'Adventure Time',
    desc: 'A 2D platformer built in Unity with C#.',
    slides: ['img/adventureTime1.mp4','img/adventureTime2.mp4','img/adventureTime3.mp4'],
    tech: ['unity','c#'],
    demo: 'https://matthewvu.itch.io/adventure-time',
    github: 'https://github.com/matthewvu2719/AdventureTime'
  },
  {
    title: 'Future Shock 2099',
    desc: 'This project is an online multiplayer shooting game. Players can create name, host, find and join rooms to play with other players in real time.',
    slides: ['img/futureshock1.mp4','img/futureshock2.mp4'],
    tech: ['unity','c#','photon'],
    demo: 'https://matthewvu.itch.io/future-shock-2099',
    github: 'https://github.com/matthewvu2719/Future-Shock-2099'
  },
  {
    title: 'MR Patient',
    desc: 'This project is a mixed reality application using Hololens 2. User can register patient and connect to vitaliti devices to read patient\'s vitals.',
    slides: ['img/hololens1.mp4','img/hololens2.mp4'],
    tech: ['unity','c#','hololens'],
    github: 'https://github.com/matthewvu2719/MR-Patient'
  },
  {
    title: 'ShopFun POS',
    desc: 'Full-featured market POS system with user auth, cart management, checkout, inventory CRUD, and complete transaction recording.',
    slides: [],
    image: 'img/6.png',
    tech: ['mongodb','express','react','node.js'],
    github: 'https://github.com/matthewvu2719/ShopFun-POS'
  }
];

// ── MODAL ──
var curSlide = 0, totalSlides = 0;

function openModal(idx) {
  var p = projects[idx];
  if (!p) return;
  var modal = document.getElementById('modal');

  document.getElementById('modal-title').textContent = p.title;
  document.getElementById('modal-desc').textContent = p.desc;
  document.getElementById('modal-tags').innerHTML = (p.tech || []).map(function (t) {
    return '<span>' + t + '</span>';
  }).join('');

  var lh = '';
  if (p.demo)   lh += '<a class="modal-link primary" href="' + p.demo + '" target="_blank"><i class="fas fa-arrow-up-right-from-square"></i></a>';
  if (p.github) lh += '<a class="modal-link secondary" href="' + p.github + '" target="_blank"><i class="fab fa-github"></i></a>';
  document.getElementById('modal-links').innerHTML = lh;

  // Media
  var slides = (p.slides && p.slides.length) ? p.slides : (p.image ? [p.image] : []);
  totalSlides = slides.length; curSlide = 0;
  var mm = document.getElementById('modal-media');

  if (!totalSlides) {
    mm.innerHTML = '';
  } else if (totalSlides === 1) {
    var s = slides[0];
    mm.innerHTML = s.endsWith('.mp4')
      ? '<div style="position:relative"><video autoplay muted loop playsinline style="width:100%;display:block"><source src="' + s + '"></video><button class="slide-sound" onclick="toggleSnd(this)"><i class="fas fa-volume-mute"></i></button></div>'
      : '<img src="' + s + '" style="width:100%;display:block">';
  } else {
    var h = '<div class="slideshow">';
    slides.forEach(function (s, i) {
      var a = i === 0 ? ' active' : '';
      h += s.endsWith('.mp4')
        ? '<div class="modal-slide' + a + '" style="position:relative"><video ' + (i === 0 ? 'autoplay' : '') + ' muted loop playsinline style="width:100%;display:block"><source src="' + s + '"></video><button class="slide-sound" onclick="toggleSnd(this)"><i class="fas fa-volume-mute"></i></button></div>'
        : '<div class="modal-slide' + a + '"><img src="' + s + '" style="width:100%;display:block"></div>';
    });
    h += '<button class="slide-nav prev" onclick="chSlide(-1)">‹</button>';
    h += '<button class="slide-nav next" onclick="chSlide(1)">›</button>';
    h += '<span class="slide-counter" id="slc">1 / ' + totalSlides + '</span></div>';
    mm.innerHTML = h;
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
  document.querySelectorAll('#modal-media video').forEach(function (v) { v.pause(); });
}

function chSlide(d) {
  var slides = document.querySelectorAll('.modal-slide');
  var pv = slides[curSlide].querySelector('video');
  if (pv) { pv.muted = true; pv.pause(); }
  slides[curSlide].classList.remove('active');
  curSlide = (curSlide + d + totalSlides) % totalSlides;
  slides[curSlide].classList.add('active');
  var nv = slides[curSlide].querySelector('video');
  if (nv) { nv.muted = true; nv.play(); }
  var c = document.getElementById('slc');
  if (c) c.textContent = (curSlide + 1) + ' / ' + totalSlides;
}

function toggleSnd(btn) {
  var v = (btn.closest('.modal-slide') || btn.parentElement).querySelector('video');
  if (!v) return;
  v.muted = !v.muted;
  btn.querySelector('i').className = v.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
}

document.addEventListener('click', function (e) {
  if (e.target === document.getElementById('modal')) closeModal();
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeModal();
});
document.addEventListener('DOMContentLoaded', function () {
  var modal = document.getElementById('modal');
  modal.addEventListener('wheel', function (e) {
    var c = document.querySelector('.modal-inner');
    if (c && modal.classList.contains('open')) { e.preventDefault(); c.scrollTop += e.deltaY; }
  }, { passive: false });
});