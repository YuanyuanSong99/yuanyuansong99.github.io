document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  const navAnchors = links.querySelectorAll('a');
  const sections = document.querySelectorAll('.section, .hero');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  navAnchors.forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });

  const observerOptions = { rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue('--nav-height').trim()} 0px -40% 0px` };
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(s => sectionObserver.observe(s));

  const fadeEls = document.querySelectorAll('.research-card, .outreach-card, .cv-block, .pub-item');
  fadeEls.forEach(el => el.classList.add('fade-in'));

  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach(el => fadeObserver.observe(el));
});
