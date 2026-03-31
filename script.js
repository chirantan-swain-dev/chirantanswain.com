 // Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
    } else {
        mobileMenu.classList.add('hidden');
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuButton = document.querySelector('[data-testid="mobile-menu-btn"]');
    
    if (mobileMenu && !mobileMenu.contains(event.target) && !menuButton.contains(event.target)) {
        mobileMenu.classList.add('hidden');
    }
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active state to current page in navigation
window.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a[href]');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('border-b-2', 'border-accent');
        }
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
window.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.stat-item, [data-testid*="card"]');
    animateElements.forEach(el => observer.observe(el));
});

// Add scroll effect to navbar
let lastScroll = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('shadow-lg');
    } else {
        navbar.classList.add('shadow-lg');
    }
    
    lastScroll = currentScroll;
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statElements = entry.target.querySelectorAll('.stat-item > div:first-child');
            statElements.forEach(stat => {
                const text = stat.textContent;
                const numberMatch = text.match(/\d+/);
                if (numberMatch) {
                    const number = parseInt(numberMatch[0]);
                    const prefix = text.includes('$') ? '$' : '';
                    const suffix = text.replace(/[\d$]/g, '');
                    stat.textContent = prefix + '0' + suffix;
                    setTimeout(() => {
                        let current = 0;
                        const interval = setInterval(() => {
                            current += Math.ceil(number / 50);
                            if (current >= number) {
                                stat.textContent = prefix + number + suffix;
                                clearInterval(interval);
                            } else {
                                stat.textContent = prefix + current + suffix;
                            }
                        }, 30);
                    }, 300);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

window.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('[data-testid="stats-section"]');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});