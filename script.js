// -----------------------------
// script.js — Nathaniel Portfolio
// -----------------------------

// ===== Reveal elements on scroll =====
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));


// ===== Simple form handler (demo) =====
function handleForm(e) {
  e.preventDefault();
  const name = e.target.name?.value || 'there';
  e.target.reset();

  const toast = document.createElement('div');
  toast.textContent = `Thanks ${name}! Message received (demo)`;
  toast.style.position = 'fixed';
  toast.style.right = '18px';
  toast.style.bottom = '18px';
  toast.style.padding = '12px 16px';
  toast.style.borderRadius = '10px';
  toast.style.background = 'linear-gradient(90deg,var(--glow),var(--accent))';
  toast.style.color = '#02020a';
  toast.style.boxShadow = '0 12px 40px rgba(11,11,13,0.6)';
  toast.style.zIndex = 200;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3600);
}

// ===== Smooth scroll for internal links =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (ev) => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('#')) {
      ev.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        const headerHeight = 100; // match your navbar height
        const rect = el.getBoundingClientRect();
        const scrollTop = window.scrollY + rect.top - headerHeight;

        // Scroll to top if "about"
        if (href === '#about') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: scrollTop, behavior: 'smooth' });
        }
      }
    }
  });
});


// ===== Mobile menu toggle =====
const toggleBtn = document.getElementById('menu-toggle');
const nav = document.getElementById('navbar');

if (toggleBtn && nav) {
  toggleBtn.addEventListener('click', () => {
    nav.classList.toggle('show');
    toggleBtn.querySelector('i')?.classList.toggle('bx-x');
  });

  // Close menu when clicking a link
  nav.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => nav.classList.remove('show'))
  );
}


// ===== Popup system (Overview + Skills) =====
function setupPopup(triggerSelector, popupId) {
  const triggers = document.querySelectorAll(triggerSelector);
  const popup = document.getElementById(popupId);

  if (!popup) {
    console.warn(`Popup with ID "${popupId}" not found.`);
    return;
  }

  const closeBtn = popup.querySelector('.close-btn');

  // When clicking any trigger (e.g. Overview or Skills button)
  triggers.forEach(trigger => {
    trigger.style.cursor = 'pointer';
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      // Close other open popups before opening new one
      document.querySelectorAll('.local-popup.show').forEach(openPopup => {
        if (openPopup !== popup) openPopup.classList.remove('show');
      });
      popup.classList.toggle('show');
    });
  });

  // Close when clicking "×"
  if (closeBtn) {
    closeBtn.addEventListener('click', () => popup.classList.remove('show'));
  }

  // Close when clicking outside the popup
  window.addEventListener('click', (e) => {
    if (e.target === popup) popup.classList.remove('show');
  });

  // Close on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup.classList.contains('show')) {
      popup.classList.remove('show');
    }
  });
}

// Initialize both popups
setupPopup('.overview-btn', 'bugmart-overview');
setupPopup('.skills-btn', 'bugmart-skills');
