/* ============================================================
   NAVIGATION: scroll state
   ============================================================ */
const nav = document.querySelector('.nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ============================================================
   MOBILE NAVIGATION
   ============================================================ */
const hamburger = document.querySelector('.nav__hamburger');
const mobileNav = document.querySelector('.nav__mobile');

if (hamburger && mobileNav) {
  const toggle = (open) => {
    hamburger.classList.toggle('open', open);
    mobileNav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  hamburger.addEventListener('click', () => toggle(!hamburger.classList.contains('open')));

  mobileNav.querySelectorAll('.nav__mobile-link').forEach(link => {
    link.addEventListener('click', () => toggle(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger.classList.contains('open')) toggle(false);
  });
}

/* ============================================================
   ACTIVE NAV LINK (sections in view)
   ============================================================ */
const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
const sections = document.querySelectorAll('section[id]');

if (sections.length && navLinks.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = '#' + entry.target.id;
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === id));
      }
    });
  }, { threshold: 0.25, rootMargin: '-80px 0px -40% 0px' });

  sections.forEach(s => sectionObserver.observe(s));
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealEls = document.querySelectorAll('.reveal');

if (revealEls.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));
}

/* ============================================================
   IMAGE MODAL / LIGHTBOX
   ============================================================ */
const modalOverlay = document.querySelector('.modal-overlay');
const modalImg = modalOverlay?.querySelector('.modal-img');
const modalClose = modalOverlay?.querySelector('.modal-close');

if (modalOverlay && modalImg) {
  const open = (src, alt) => {
    modalImg.src = src;
    modalImg.alt = alt || '';
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    modalClose?.focus();
  };

  const close = () => {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
    modalImg.src = '';
  };

  document.querySelectorAll('.screenshot-img[data-modal-src]').forEach(el => {
    el.addEventListener('click', () => open(el.dataset.modalSrc, el.dataset.modalAlt));
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') open(el.dataset.modalSrc, el.dataset.modalAlt); });
  });

  modalClose?.addEventListener('click', close);
  modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}

/* ============================================================
   SMOOTH ANCHOR SCROLL (for browsers that don't support CSS)
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
