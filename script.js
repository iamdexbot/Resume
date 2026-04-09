/* =============================================
   CHANNY JO M. CATIRI - Portfolio Resume JS
============================================= */

document.addEventListener('DOMContentLoaded', function () {

  // ---- Scroll Reveal ----
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ---- Active Nav Link Highlight ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + id) {
              link.style.color = '#ffffff';
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => navObserver.observe(s));

  // ---- Stagger Timeline Items ----
  document.querySelectorAll('.timeline-item').forEach((item, i) => {
    item.style.animationDelay = `${i * 0.1}s`;
  });

  // ---- Smooth Scroll for nav links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navH = document.querySelector('nav').offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- Hero subtle parallax ----
  window.addEventListener('scroll', () => {
    const hero = document.getElementById('hero');
    if (hero) {
      const scrolled = window.scrollY;
      hero.style.backgroundPositionY = `${scrolled * 0.3}px`;
    }
  }, { passive: true });

  console.log('Portfolio loaded ✔');
});
