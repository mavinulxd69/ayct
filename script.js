// ============================================================
// AYCT 2026 — Premium Cinematic Interactions
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- graceful fallback for missing photos ---- */
  /* podium/venue/gallery images live under img/ and may not exist yet;
     hide the broken-image icon and show a muted placeholder instead */
  document.querySelectorAll('.podium-photo img, .venue-photo, .gallery-tile img').forEach(img => {
    img.addEventListener('error', () => {
      const container = img.closest('.podium-photo, .venue-image-wrapper, .gallery-tile');
      if (container) container.classList.add('img-missing');
      img.remove();
    }, { once: true });
  });

  /* ---- mobile nav toggle ---- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- scroll reveal for sections ---- */
  const revealTargets = document.querySelectorAll(
    '.section-title, .marker, .stat-card, .podium-card, .gallery-tile, .venue-info, .venue-image-wrapper, .org-lede, .org-divisions'
  );

  revealTargets.forEach((el, index) => {
    const isCard = el.classList.contains('stat-card') ||
                   el.classList.contains('podium-card') ||
                   el.classList.contains('gallery-tile');
    const delay = isCard ? (index % 3) * 0.08 : 0;

    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  revealTargets.forEach(el => observer.observe(el));

  /* ---- nav background solidify on scroll ---- */
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        nav.style.background = 'rgba(5, 5, 5, 0.95)';
        nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
      } else {
        nav.style.background = 'rgba(5, 5, 5, 0.85)';
        nav.style.boxShadow = 'none';
      }
    }, { passive: true });
  }

});