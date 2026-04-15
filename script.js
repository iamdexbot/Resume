/* =============================================
   CHANNY JO M. CATIRI - Portfolio Resume JS
============================================= */

document.addEventListener('DOMContentLoaded', function () {

  // ---- Typing Animation ----
  const typingTexts = [
    'Product Support Engineer',
    'Customer Success Specialist',
    'Cloud Management Expert',
    'Web Hosting Professional',
    'LLM Automation Enthusiast'
  ];
  const typingElement = document.querySelector('.typing-text');
  const cursorElement = document.querySelector('.typing-cursor');
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function typeText() {
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentText.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % typingTexts.length;
      typingSpeed = 500;
    }

    setTimeout(typeText, typingSpeed);
  }

  typeText();

  // ---- Theme Toggle ----
  const themeToggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;
  
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

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

  // ---- Back to Top Button ----
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '↑';
  backToTop.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  console.log('Portfolio loaded ✔');
});
