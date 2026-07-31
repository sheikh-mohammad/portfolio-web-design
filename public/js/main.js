/* =========================================================
   MAIN.JS — Premium Portfolio Interactions
   Theme Toggle | Animations | Navigation | Filters
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================
  // PRELOADER
  // ========================================
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader?.classList.add('hidden'), 300);
  });
  // Fallback: hide preloader after 2s if load event doesn't fire
  setTimeout(() => preloader?.classList.add('hidden'), 2000);

  // ========================================
  // CUSTOM CURSOR
  // ========================================
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (cursorDot && cursorRing && window.matchMedia('(hover: hover)').matches) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    // Smooth ring follow
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(animateRing);
    };
    animateRing();

    // Enlarge on hover over interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .social-link, .project-card, .btn, .skill-tag');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.style.width = '10px';
        cursorDot.style.height = '10px';
        cursorRing.style.width = '50px';
        cursorRing.style.height = '50px';
        cursorRing.style.borderColor = 'rgba(108, 99, 255, 0.6)';
      });
      el.addEventListener('mouseleave', () => {
        cursorDot.style.width = '6px';
        cursorDot.style.height = '6px';
        cursorRing.style.width = '36px';
        cursorRing.style.height = '36px';
        cursorRing.style.borderColor = 'rgba(108, 99, 255, 0.4)';
      });
    });
  }

  // ========================================
  // THEME TOGGLE
  // ========================================
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Load saved theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  themeToggle?.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // ========================================
  // MOBILE HAMBURGER MENU
  // ========================================
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks?.classList.toggle('open');
  });

  // Close menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      navLinks?.classList.remove('open');
    });
  });

  // ========================================
  // NAVBAR SCROLL BEHAVIOR
  // ========================================
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Hide/show navbar
    if (currentScroll > lastScroll && currentScroll > 100) {
      navbar?.classList.add('hidden');
    } else {
      navbar?.classList.remove('hidden');
    }
    lastScroll = currentScroll;

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';

    sections.forEach(section => {
      const top = section.offsetTop - 150;
      if (currentScroll >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    // Back to top visibility
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
      if (currentScroll > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  });

  // ========================================
  // BACK TO TOP
  // ========================================
  document.getElementById('backToTop')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ========================================
  // SCROLL ANIMATIONS (Fade In)
  // ========================================
  const fadeElements = document.querySelectorAll('.fade-in');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => observer.observe(el));

  // ========================================
  // PROJECT FILTERS
  // ========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          // Re-trigger fade animation
          card.classList.remove('visible');
          setTimeout(() => card.classList.add('visible'), 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ========================================
  // CONTACT FORM
  // ========================================
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      shakeForm(contactForm);
      return;
    }

    // Success feedback
    const btn = contactForm.querySelector('.btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
    btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });

  function shakeForm(form) {
    form.style.animation = 'shake 0.5s ease';
    setTimeout(() => form.style.animation = '', 500);
  }

  // Inject shake keyframes
  const shakeStyle = document.createElement('style');
  shakeStyle.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
      20%, 40%, 60%, 80% { transform: translateX(6px); }
    }
  `;
  document.head.appendChild(shakeStyle);

  // ========================================
  // SMOOTH ANCHOR SCROLL (for browsers that don't support scroll-behavior)
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ========================================
  // PARALLAX EFFECT ON HERO
  // ========================================
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const grid = hero.querySelector('.hero-bg-grid');
      const orb = hero.querySelector('.hero-gradient-orb');
      if (grid) grid.style.transform = `translateY(${scrolled * 0.3}px)`;
      if (orb) orb.style.transform = `translateY(${scrolled * 0.15}px)`;
    });
  }

  console.log('%c Sheikh Mohammad Ahmed Portfolio ',
    'background: linear-gradient(135deg, #6C63FF, #06B6D4); color: #fff; font-size: 1.2rem; padding: 8px 16px; border-radius: 4px; font-weight: bold;'
  );
  console.log('%c Built with ❤️ using vanilla HTML, CSS & JS ',
    'color: #9C9CB5; font-size: 0.9rem;'
  );

});
