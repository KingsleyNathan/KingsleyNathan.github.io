  // small util: reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
  },{threshold:0.12});
  revealEls.forEach(el=>io.observe(el));

  // simple form handler (no backend) — show friendly toast
  function handleForm(e){
    e.preventDefault();
      const name = e.target.name.value||'there';
      e.target.reset();
      const toast = document.createElement('div');
      toast.textContent = `Thanks ${name}! Message received (demo)`;
      toast.style.position='fixed';toast.style.right='18px';toast.style.bottom='18px';toast.style.padding='12px 16px';toast.style.borderRadius='10px';toast.style.background='linear-gradient(90deg,var(--glow),var(--accent))';toast.style.color='#02020a';toast.style.boxShadow='0 12px 40px rgba(11,11,13,0.6)';toast.style.zIndex=200;document.body.appendChild(toast);
      setTimeout(()=>toast.remove(),3600);
    }

 // smooth scroll for internal links (with custom offset)
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

        // ✅ For "about", no offset — go flush to top
        if (href === '#about') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: scrollTop, behavior: 'smooth' });
        }
      }
    }
  });
});

    // --- Mobile menu toggle ---
const toggleBtn = document.getElementById('menu-toggle');
const nav = document.getElementById('navbar');

if (toggleBtn && nav) {
  toggleBtn.addEventListener('click', () => {
    nav.classList.toggle('show');
    toggleBtn.querySelector('i').classList.toggle('bx-x'); // change icon
  });

  // Optional: close menu when link is clicked
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('show'));
  });
}

