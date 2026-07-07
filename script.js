const navbar = document.querySelector('.navbar');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.fade-in').forEach((item) => observer.observe(item));

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 24);
});

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver(
  (entries, observerInstance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = Number(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1200;
        const startTime = performance.now();

        const animate = (currentTime) => {
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const value = Math.floor(progress * target);
          el.textContent = value + suffix;

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            el.textContent = target + suffix;
          }
        };

        requestAnimationFrame(animate);
        observerInstance.unobserve(el);
      }
    });
  },
  { threshold: 0.7 }
);

counters.forEach((counter) => counterObserver.observe(counter));

document.querySelector('.year').textContent = new Date().getFullYear();
