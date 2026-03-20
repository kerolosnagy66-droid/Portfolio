// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
let scrollTimer;

window.addEventListener('scroll', () => {
    if (!scrollTimer) {
        scrollTimer = setTimeout(() => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 50) {
                navbar.style.background = 'rgba(13, 17, 23, 0.98)';
                navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
            } else {
                navbar.style.background = 'rgba(13, 17, 23, 0.85)';
                navbar.style.boxShadow = 'none';
            }
            scrollTimer = null;
        }, 50);
    }
});



// Intersection Observer Options
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Animate Project Cards on Scroll
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            projectObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    projectObserver.observe(card);

    // Check if card has a valid demo link
    const demoLink = card.querySelector('.project-link[aria-label*="Live Demo"]');
    const hasValidLink = demoLink && demoLink.getAttribute('href') &&
        demoLink.getAttribute('href') !== '#' &&
        !demoLink.getAttribute('href').startsWith('javascript');

    if (hasValidLink) {
        // Make card clickable
        card.addEventListener('click', (e) => {
            // Prevent clicking if a link inside the card was clicked directly
            if (e.target.closest('.project-link')) return;

            window.open(demoLink.href, '_blank');
        });

        // Add pointer cursor to show it's clickable
        card.style.cursor = 'pointer';
    } else {
        // Ensure cursor is default for non-clickable cards
        card.style.cursor = 'default';
    }
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
        const message = contactForm.querySelector('textarea').value;

        // Here you would normally send the data to a server
        console.log('Form submitted:', { name, email, subject, message });

        // Show success message (you can customize this)
        alert('شكراً لك! تم إرسال رسالتك بنجاح.');

        // Reset form
        contactForm.reset();
    });
}

// Active Nav Link on Scroll
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// Add active class styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--text-primary) !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Parallax Effect for Hero Section (Disabled on Mobile)
window.addEventListener('scroll', () => {
    if (window.innerWidth > 768) {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.4}px)`;
            hero.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    } else {
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = 'none';
            hero.style.opacity = '1';
        }
    }
});

// Typing Effect for Hero Title (Optional Enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Check if profile image exists
function checkProfileImage() {
    const heroImg = document.querySelector('.hero-img');
    const aboutImg = document.querySelector('.profile-image');

    function checkImage(img, placeholder) {
        if (img) {
            const testImg = new Image();
            testImg.onload = function () {
                img.style.display = 'block';
                if (placeholder) placeholder.style.display = 'none';
            };
            testImg.onerror = function () {
                img.style.display = 'none';
                if (placeholder) placeholder.style.display = 'flex';
            };
            testImg.src = img.src || 'images/profile.jpg';
        }
    }

    checkImage(heroImg, document.querySelector('.hero-placeholder'));
    checkImage(aboutImg, document.querySelector('.image-placeholder'));
}

// Initialize animations on page load
window.addEventListener('load', () => {
    // Check profile images
    checkProfileImage();

    // Add fade-in animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});


