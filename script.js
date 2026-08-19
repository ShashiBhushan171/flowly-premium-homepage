// Mobile navigation toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

function closeMenu() {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
}

function toggleMenu() {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
}

navToggle.addEventListener('click', toggleMenu);

navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
});

// Hero product card: reveal on load / scroll into view.
// This is the single deliberate motion moment for the page —
// everything else uses plain, instant state changes.
const dashboard = document.querySelector('[data-reveal]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (dashboard) {
    if (prefersReducedMotion) {
        dashboard.classList.add('is-visible');
    } else if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        dashboard.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );
        observer.observe(dashboard);
    } else {
        dashboard.classList.add('is-visible');
    }
}
