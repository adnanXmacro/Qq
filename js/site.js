(function () {
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.scroll-progress');
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  function onScrollChrome() {
    const y = window.scrollY || 0;
    if (header) header.classList.toggle('is-scrolled', y > 12);
    if (progress) {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      progress.style.width = (Math.min(1, y / max) * 100) + '%';
    }
  }
  onScrollChrome();
  window.addEventListener('scroll', onScrollChrome, { passive: true });

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const dragons = [
    {
      name: 'Baby',
      img: 'img/dragons/dragon-tier0-baby.gif',
      copy: 'Log in and the egg cracks. A Baby dragon hatches on day one of your streak.',
    },
    {
      name: 'Young',
      img: 'img/dragons/dragon-tier1-young.gif',
      copy: 'Seven days later it sheds the nest. Young dragons grow only if you return tomorrow.',
    },
    {
      name: 'Juvenile',
      img: 'img/dragons/dragon-tier2-juvenile.gif',
      copy: 'The Juvenile stage is restless. Miss three days in a row and the shield fails.',
    },
    {
      name: 'Mature',
      img: 'img/dragons/dragon-tier3-mature.gif',
      copy: 'A Mature dragon is a warning. Your house sees the fire before you walk in.',
    },
    {
      name: 'Adult',
      img: 'img/dragons/dragon-tier4-adult.gif',
      copy: 'Adult. Fully grown. Keep the daily alive and the creature stays yours.',
    },
  ];

  const img = document.getElementById('dragon-img');
  const name = document.getElementById('dragon-name');
  const copy = document.getElementById('dragon-copy');
  const dots = document.getElementById('dragon-dots');
  const prev = document.getElementById('dragon-prev');
  const next = document.getElementById('dragon-next');

  if (img && name && copy && dots) {
    let i = 0;
    let timer = null;

    function render(index) {
      i = (index + dragons.length) % dragons.length;
      const d = dragons[i];
      img.classList.add('is-out');
      const apply = () => {
        img.src = d.img;
        img.alt = d.name + ' dragon';
        name.textContent = d.name + ' Dragon';
        copy.textContent = d.copy;
        img.classList.remove('is-out');
        dots.querySelectorAll('button').forEach((btn, n) => {
          btn.setAttribute('aria-current', n === i ? 'true' : 'false');
          btn.setAttribute('aria-label', 'Show ' + dragons[n].name + ' dragon');
        });
      };
      if (reduce) apply();
      else setTimeout(apply, 220);
    }

    dragons.forEach((_, n) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.addEventListener('click', () => {
        stop();
        render(n);
        start();
      });
      dots.appendChild(b);
    });

    function start() {
      if (reduce) return;
      stop();
      timer = setInterval(() => render(i + 1), 4200);
    }
    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    if (prev) prev.addEventListener('click', () => { stop(); render(i - 1); start(); });
    if (next) next.addEventListener('click', () => { stop(); render(i + 1); start(); });

    const stage = document.querySelector('.dragon-stage');
    if (stage) {
      stage.addEventListener('mouseenter', stop);
      stage.addEventListener('mouseleave', start);
      stage.addEventListener('focusin', stop);
      stage.addEventListener('focusout', start);
    }

    render(0);
    start();
  }

  function splitHeadline(el) {
    if (!el) return [];
    const chars = [];
    Array.from(el.childNodes).forEach((node) => {
      if (node.nodeType !== Node.TEXT_NODE) return;
      const text = node.textContent || '';
      const frag = document.createDocumentFragment();
      text.split('').forEach((ch) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = ch === ' ' ? '\u00A0' : ch;
        frag.appendChild(span);
        chars.push(span);
      });
      node.parentNode.replaceChild(frag, node);
    });
    return chars;
  }

  function magnetic(el) {
    const strength = 18;
    function move(e) {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = 'translate(' + (x / r.width) * strength + 'px,' + (y / r.height) * strength + 'px)';
    }
    function reset() {
      el.style.transform = '';
    }
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', reset);
    el.addEventListener('blur', reset);
  }

  function initMotion() {
    if (reduce || !window.gsap) return;
    const gsap = window.gsap;
    if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

    const lines = document.querySelectorAll('.logo-stack span');
    const chars = [];
    lines.forEach((line) => chars.push.apply(chars, splitHeadline(line)));

    const heroTl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    if (chars.length) {
      gsap.set(chars, { opacity: 0, y: 28, rotateX: -40 });
      heroTl.to(chars, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.7,
        stagger: 0.035,
      }, 0.08);
    }
    heroTl.from('.hero-kicker', { opacity: 0, y: 12, duration: 0.45, clearProps: 'transform' }, 0);
    heroTl.from('.hero-sub', { opacity: 0, y: 16, duration: 0.5, clearProps: 'transform' }, 0.35);
    heroTl.from('.hero-actions > *', { opacity: 0, y: 18, duration: 0.45, stagger: 0.08, clearProps: 'transform' }, 0.5);
    heroTl.from('.hero-meta span', { opacity: 0, y: 10, duration: 0.35, stagger: 0.06, clearProps: 'transform' }, 0.62);

    const reveal = (selector, extra) => {
      const el = document.querySelector(selector);
      if (!el) return;
      gsap.from(el, Object.assign({
        opacity: 0,
        y: 28,
        duration: 0.7,
        ease: 'power2.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      }, extra || {}));
    };

    const staggerKids = (parentSel, childSel) => {
      const parent = document.querySelector(parentSel);
      if (!parent) return;
      const kids = childSel ? parent.querySelectorAll(childSel) : parent.children;
      if (!kids.length) return;
      gsap.from(kids, {
        opacity: 0,
        y: 24,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: parent, start: 'top 85%', once: true },
      });
    };

    staggerKids('.stats', '.stat');
    reveal('#dragons .section-head');
    reveal('.dragon-stage');
    reveal('#modes .section-head');
    staggerKids('.modes', '.mode-card');
    reveal('#houses .section-head');
    staggerKids('.houses', '.house-card');
    reveal('#shots .section-head');
    staggerKids('.shots', '.shot-frame');
    reveal('#download .section-head');
    staggerKids('.steps', '.step');
    reveal('.download-cta');
    reveal('#faq .section-head');
    staggerKids('.faq', 'details');
    reveal('.cta-band');

    if (window.ScrollTrigger) {
      gsap.to('.orb-a', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1.2 },
      });
      gsap.to('.orb-b', {
        yPercent: -14,
        ease: 'none',
        scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1.4 },
      });
      gsap.to('.orb-c', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1.6 },
      });
      const dragonView = document.querySelector('.dragon-view');
      if (dragonView) {
        gsap.fromTo(dragonView, { y: 18 }, {
          y: -12,
          ease: 'none',
          scrollTrigger: { trigger: '.dragon-stage', start: 'top bottom', end: 'bottom top', scrub: 1 },
        });
      }
    }

    if (finePointer) {
      document.querySelectorAll('.js-magnetic').forEach(magnetic);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMotion);
  } else {
    initMotion();
  }
})();
