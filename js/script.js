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

// ── CARD CLICKS + TECH TAGS ──
document.addEventListener('DOMContentLoaded', function () {
  var MAX_TAGS = 6;
  document.querySelectorAll('.project-card[data-index]').forEach(function (card) {
    card.addEventListener('click', function () {
      openModal(parseInt(card.dataset.index, 10));
    });

    var idx = parseInt(card.dataset.index, 10);
    var p = projects[idx];
    if (!p || !p.tech || !p.tech.length) return;

    var tech = p.tech;
    var techDiv = document.createElement('div');
    techDiv.className = 'card-tech';

    var nameEl = document.createElement('div');
    nameEl.className = 'card-name';
    nameEl.textContent = p.title;
    techDiv.appendChild(nameEl);

    var tagsRow = document.createElement('div');
    tagsRow.style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:8px';
    techDiv.appendChild(tagsRow);

    var pillsGroup = document.createElement('div');
    pillsGroup.style.cssText = 'display:flex;flex-wrap:wrap;gap:5px;align-items:center';
    tagsRow.appendChild(pillsGroup);

    var shown = tech.slice(0, MAX_TAGS);
    var rest = tech.length - MAX_TAGS;

    shown.forEach(function (t) {
      var s = document.createElement('span');
      s.textContent = t;
      pillsGroup.appendChild(s);
    });

    if (rest > 0) {
      var more = document.createElement('span');
      more.className = 'card-tech-more';
      more.textContent = '+' + rest + ' more';
      pillsGroup.appendChild(more);
    }

    if (p.demo || p.github) {
      var linksGroup = document.createElement('div');
      linksGroup.className = 'card-links';
      if (p.demo) {
        var demoA = document.createElement('a');
        demoA.href = p.demo;
        demoA.target = '_blank';
        demoA.innerHTML = '<i class="fas fa-arrow-up-right-from-square"></i>';
        demoA.onclick = function (e) { e.stopPropagation(); };
        linksGroup.appendChild(demoA);
      }
      if (p.github) {
        var ghA = document.createElement('a');
        ghA.href = p.github;
        ghA.target = '_blank';
        ghA.innerHTML = '<i class="fab fa-github"></i>';
        ghA.onclick = function (e) { e.stopPropagation(); };
        linksGroup.appendChild(ghA);
      }
      tagsRow.appendChild(linksGroup);
    }

    card.appendChild(techDiv);
  });
});

// ── PROJECT DATA ──
var projects = [
  {
    title: 'Ren',
    desc: 'Ren turns your new tab into a sushi restaurant that evolves with your habits. Compete with global users or your friends. Log daily habits to grow your streak, unlock restaurant upgrades, and fill your dining room with guests.',
    slides: ['img/ren1.mp4','img/ren2.mp4','img/ren5.mp4','img/ren3.mp4','img/ren4.mp4','img/ren6.mp4'],
    tech: ['nextjs','react','gemini','zustand','supabase'],
    demo: 'https://ren-habit.vercel.app/'
  },
  {
    title: 'Sheep Guard',
    desc: 'This Chrome extension is more than a site blocker - it\'s a companion that understands you. Whether you\'re managing ADHD, battling procrastination, or simply trying to stay focused, Sheep Guard adapts to your unique needs with AI-powered personalization and a rewarding gamification system.',
    slides: ['img/sheepguard1.mp4','img/sheepguard2.mp4','img/sheepguard3.mp4','img/sheepguard4.mp4','img/sheepguard5.mp4','img/sheepguard6.mp4'],
    tech: ['threejs','vite','supabase','vercel', 'gemini'],
    demo: 'https://sheep-guard.vercel.app/info'
  },
  {
    title: 'Admittree',
    desc: 'A centralized hub for Canadian university programs admission, which feature specialized and personalized roadmap with an actionable checklist and an AI consultant.',
    slides: ['img/admittree1.mp4','img/admittree2.mp4','img/admittree3.mp4','img/admittree4.mp4','img/admittree5.mp4','img/admittree6.mp4','img/admittree7.mp4','img/admittree8.mp4'],
    tech: ['flask','python','react','mongodb','digitalocean'],
    demo: 'https://github.com/matthewvu2719/admit-tree/tree/consultant',
    github: 'https://github.com/matthewvu2719/admit-tree/tree/consultant'
  },
  {
    title: 'Journey',
    desc: 'A gamified habit tracker with an AI-powered companion named Bobo that helps users build consistent habits through intelligent obstacle detection, personalized solutions, and achievement-based rewards. Features real-time analytics, smart friction removal, chat bot.',
    slides: ['img/bobo1.mp4','img/bobo2.mp4','img/bobo3.mp4','img/bobo4.mp4','img/bobo5.mp4','img/bobo6.mp4','img/bobo7.mp4','img/bobo8.mp4'],
    tech: ['fastapi','python','react','supabase','groq','docker'],
    demo: 'https://github.com/matthewvu2719/Journey',
    github: 'https://github.com/matthewvu2719/Journey'
  },
  {
    title: 'TestQuest!',
    desc: 'A gamified study with me web app. TestQuest! multi-agent system generate lecture notes, graphs, diagrams, flashcards, mock exams and insights based on test results for any topic user input. User also earn fruits rewards through studying which will be used in the 2D pixel platformer game.',
    slides: ['img/testQuest.mp4','img/testQuest1.mp4','img/testQuest2.mp4','img/testQuest3.mp4','img/testQuest4.mp4','img/testQuest5.mp4','img/testQuest6.mp4','img/testQuest7.mp4','img/testQuest8.mp4'],
    tech: ['langgraph','tavily','pinecone','react','python','fastapi','langsmith','clerk','docker','GCP','c#','webgl'],
    demo: 'https://test-quest-zeta.vercel.app',
    github: 'https://github.com/matthewvu2719/TestQuest'
  },
  {
    title: 'Lucid Souls',
    desc: 'Immersive lucid dreaming simulation exploring psychological dream awareness. Features multi-level lucidity progression from sub-lucid to fully lucid states with dynamic perspective changing and real-time object manipulation.',
    slides: ['img/lucidsouls1.mp4','img/lucidsouls2.mp4','img/lucidsouls3.mp4','img/lucidsouls4.mp4','img/lucidsouls5.mp4'],
    tech: ['unreal engine','c++'],
    github: 'https://github.com/matthewvu2719/LucidSouls/tree/MatthewBranch'
  },
  {
    title: 'Adventure Time',
    desc: 'A 2D platformer built in Unity with C#.',
    slides: ['img/adventureTime1.mp4','img/adventureTime2.mp4','img/adventureTime3.mp4','img/adventureTime4.mp4','img/adventureTime5.mp4'],
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