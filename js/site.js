(function () {
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
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
  if (!img || !name || !copy || !dots) return;

  let i = 0;
  let timer = null;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    else setTimeout(apply, 160);
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
})();
