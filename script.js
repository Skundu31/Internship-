/* ============================================

   SUBHADEEP KUNDU - PORTFOLIO JAVASCRIPT

   Modern, Interactive Portfolio Website

   ============================================ */



// Wait for DOM to be fully loaded

document.addEventListener('DOMContentLoaded', function() {

    // Initialize all functions

    initNavigation();

    initThemeToggle();

    initScrollAnimations();

    initSkillBars();

    initCounterAnimation();

    initContactForm();

    initBackToTop();

    initHoverEffects();

});



/* ==================== NAVIGATION ==================== */

/**

 * Initialize navigation functionality:

 * - Sticky navbar on scroll

 * - Mobile menu toggle

 * - Active link highlighting

 * - Smooth scrolling to sections

 */

function initNavigation() {

    const navbar = document.getElementById('navbar');

    const navLinks = document.getElementById('nav-links');

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');

    const navLinkItems = document.querySelectorAll('.nav-link');

    

    // Sticky navbar on scroll

    window.addEventListener('scroll', function() {

        if (window.scrollY > 50) {

            navbar.classList.add('scrolled');

        } else {

            navbar.classList.remove('scrolled');

        }

        

        // Update active nav link based on scroll position

        updateActiveNavLink();

    });

    

    // Mobile menu toggle

    mobileMenuBtn.addEventListener('click', function() {

        this.classList.toggle('active');

        navLinks.classList.toggle('active');

    });

    

    // Close mobile menu when clicking on a link

    navLinkItems.forEach(link => {

        link.addEventListener('click', function() {

            mobileMenuBtn.classList.remove('active');

            navLinks.classList.remove('active');

        });

    });

    

    // Smooth scroll to section

    navLinkItems.forEach(link => {

        link.addEventListener('click', function(e) {

            e.preventDefault();

            const targetId = this.getAttribute('href');

            const targetSection = document.querySelector(targetId);

            

            if (targetSection) {

                targetSection.scrollIntoView({

                    behavior: 'smooth'

                });

            }

        });

    });

}



/**

 * Update active navigation link based on scroll position

 */

function updateActiveNavLink() {

    const sections = document.querySelectorAll('section[id]');

    const navLinks = document.querySelectorAll('.nav-link');

    

    let currentSection = '';

    

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 100;

        const sectionHeight = section.offsetHeight;

        

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {

            currentSection = section.getAttribute('id');

        }

    });

    

    navLinks.forEach(link => {

        link.classList.remove('active');

        if (link.getAttribute('href') === `#${currentSection}`) {

            link.classList.add('active');

        }

    });

}



/* ==================== THEME TOGGLE ==================== */

/**

 * Initialize light/dark mode toggle

 * Saves preference to localStorage

 */

function initThemeToggle() {

    const themeToggle = document.getElementById('theme-toggle');

    const themeIcon = themeToggle.querySelector('i');

    

    // Check for saved theme preference or default to light

    const savedTheme = localStorage.getItem('theme') || 'light';

    document.documentElement.setAttribute('data-theme', savedTheme);

    updateThemeIcon(savedTheme, themeIcon);

    

    // Toggle theme on button click

    themeToggle.addEventListener('click', function() {

        const currentTheme = document.documentElement.getAttribute('data-theme');

        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        

        document.documentElement.setAttribute('data-theme', newTheme);

        localStorage.setItem('theme', newTheme);

        updateThemeIcon(newTheme, themeIcon);

        

        // Add click animation

        this.style.transform = 'scale(0.9) rotate(180deg)';

        setTimeout(() => {

            this.style.transform = '';

        }, 300);

    });

}



/**

 * Update theme toggle icon based on current theme

 */

function updateThemeIcon(theme, iconElement) {

    if (theme === 'dark') {

        iconElement.className = 'fas fa-sun';

    } else {

        iconElement.className = 'fas fa-moon';

    }

}



/* ==================== SCROLL ANIMATIONS ==================== */

/**

 * Initialize fade-in animations when elements enter viewport

 */

function initScrollAnimations() {

    const fadeElements = document.querySelectorAll('.fade-in');

    

    // Create Intersection Observer

    const observerOptions = {

        root: null,

        rootMargin: '0px',

        threshold: 0.1

    };

    

    const observer = new IntersectionObserver(function(entries, observer) {

        entries.forEach((entry, index) => {

            if (entry.isIntersecting) {

                // Add staggered delay for multiple elements

                setTimeout(() => {

                    entry.target.classList.add('visible');

                }, index * 100);

                observer.unobserve(entry.target);

            }

        });

    }, observerOptions);

    

    fadeElements.forEach(element => {

        observer.observe(element);

    });

}



/* ==================== SKILL BARS ANIMATION ==================== */

/**

 * Animate skill progress bars when they enter viewport

 */

function initSkillBars() {

    const skillCards = document.querySelectorAll('.skill-card');

    

    const observerOptions = {

        threshold: 0.5

    };

    

    const observer = new IntersectionObserver(function(entries) {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const progressBar = entry.target.querySelector('.skill-progress');

                const progress = progressBar.getAttribute('data-progress');

                

                // Animate after a short delay

                setTimeout(() => {

                    progressBar.style.width = progress + '%';

                }, 300);

                

                observer.unobserve(entry.target);

            }

        });

    }, observerOptions);

    

    skillCards.forEach(card => {

        observer.observe(card);

    });

}



/* ==================== COUNTER ANIMATION ==================== */

/**

 * Animate counting numbers in the statistics section

 */

function initCounterAnimation() {

    const counters = document.querySelectorAll('.stat-number');

    

    const observerOptions = {

        threshold: 0.5

    };

    

    const observer = new IntersectionObserver(function(entries) {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const target = parseInt(entry.target.getAttribute('data-count'));

                animateCounter(entry.target, target);

                observer.unobserve(entry.target);

            }

        });

    }, observerOptions);

    

    counters.forEach(counter => {

        observer.observe(counter);

    });

}



/**

 * Animate counter from 0 to target value

 */

function animateCounter(element, target) {

    const duration = 2000; // 2 seconds

    const step = target / (duration / 16); // 60fps

    let current = 0;

    

    const timer = setInterval(() => {

        current += step;

        

        if (current >= target) {

            element.textContent = target + '+';

            clearInterval(timer);

        } else {

            element.textContent = Math.floor(current);

        }

    }, 16);

}



/* ==================== CONTACT FORM VALIDATION ==================== */

/**

 * Initialize contact form with validation

 */

function initContactForm() {

    const form = document.getElementById('contact-form');

    const formSuccess = document.getElementById('form-success');

    

    form.addEventListener('submit', function(e) {

        e.preventDefault();

        

        // Reset previous errors

        resetFormErrors();

        

        // Get form values

        const name = document.getElementById('name');

        const email = document.getElementById('email');

        const subject = document.getElementById('subject');

        const message = document.getElementById('message');

        

        let isValid = true;

        

        // Validate name

        if (!validateName(name.value)) {

            showError(name, 'name-error', 'Please enter a valid name (at least 2 characters)');

            isValid = false;

        }

        

        // Validate email

        if (!validateEmail(email.value)) {

            showError(email, 'email-error', 'Please enter a valid email address');

            isValid = false;

        }

        

        // Validate subject

        if (!validateSubject(subject.value)) {

            showError(subject, 'subject-error', 'Please enter a subject (at least 3 characters)');

            isValid = false;

        }

        

        // Validate message

        if (!validateMessage(message.value)) {

            showError(message, 'message-error', 'Please enter a message (at least 10 characters)');

            isValid = false;

        }

        

        // If all valid, show success message

        if (isValid) {

            // Animate button

            const submitBtn = form.querySelector('button[type="submit"]');

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            submitBtn.disabled = true;

            

            // Simulate form submission

            setTimeout(() => {

                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';

                formSuccess.classList.add('show');

                

                // Reset form after success

                setTimeout(() => {

                    form.reset();

                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i><span>Send Message</span>';

                    submitBtn.disabled = false;

                    formSuccess.classList.remove('show');

                }, 3000);

            }, 1500);

        }

    });

    

    // Real-time validation on input

    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {

        input.addEventListener('input', function() {

            const formGroup = this.closest('.form-group');

            formGroup.classList.remove('error');

        });

    });

}



/**

 * Validate name field

 */

function validateName(name) {

    return name.trim().length >= 2;

}



/**

 * Validate email format

 */

function validateEmail(email) {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email.trim());

}



/**

 * Validate subject field

 */

function validateSubject(subject) {

    return subject.trim().length >= 3;

}



/**

 * Validate message field

 */

function validateMessage(message) {

    return message.trim().length >= 10;

}



/**

 * Show error message for a form field

 */

function showError(input, errorId, message) {

    const formGroup = input.closest('.form-group');

    const errorElement = document.getElementById(errorId);

    

    formGroup.classList.add('error');

    errorElement.textContent = message;

    

    // Shake animation

    input.style.animation = 'shake 0.5s ease';

    setTimeout(() => {

        input.style.animation = '';

    }, 500);

}



/**

 * Reset all form errors

 */

function resetFormErrors() {

    const formGroups = document.querySelectorAll('.form-group');

    formGroups.forEach(group => {

        group.classList.remove('error');

    });

}



// Add shake animation keyframes dynamically

const shakeStyles = document.createElement('style');

shakeStyles.textContent = `

    @keyframes shake {

        0%, 100% { transform: translateX(0); }

        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }

        20%, 40%, 60%, 80% { transform: translateX(5px); }

    }

`;

document.head.appendChild(shakeStyles);



/* ==================== BACK TO TOP BUTTON ==================== */

/**

 * Initialize back to top button functionality

 */

function initBackToTop() {

    const backToTopBtn = document.getElementById('back-to-top');

    

    // Show/hide button based on scroll position

    window.addEventListener('scroll', function() {

        if (window.scrollY > 500) {

            backToTopBtn.classList.add('show');

        } else {

            backToTopBtn.classList.remove('show');

        }

    });

    

    // Scroll to top on click

    backToTopBtn.addEventListener('click', function() {

        window.scrollTo({

            top: 0,

            behavior: 'smooth'

        });

    });

}



/* ==================== HOVER EFFECTS & ANIMATIONS ==================== */

/**

 * Initialize additional hover effects and click animations

 */

function initHoverEffects() {

    // Button ripple effect

    const buttons = document.querySelectorAll('.btn');

    

    buttons.forEach(button => {

        button.addEventListener('click', function(e) {

            // Create ripple element

            const ripple = document.createElement('span');

            ripple.classList.add('ripple');

            

            const rect = this.getBoundingClientRect();

            const size = Math.max(rect.width, rect.height);

            

            ripple.style.width = ripple.style.height = size + 'px';

            ripple.style.left = e.clientX - rect.left - size / 2 + 'px';

            ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

            

            this.appendChild(ripple);

            

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });

    

    // Project card 3D tilt effect

    const projectCards = document.querySelectorAll('.project-card');

    

    projectCards.forEach(card => {

        card.addEventListener('mousemove', function(e) {

            const rect = this.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            

            const centerX = rect.width / 2;

            const centerY = rect.height / 2;

            

            const rotateX = (y - centerY) / 20;

            const rotateY = (centerX - x) / 20;

            

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;

        });

        

        card.addEventListener('mouseleave', function() {

            this.style.transform = '';

        });

    });

    

    // Skill card pulse effect on hover

    const skillCards = document.querySelectorAll('.skill-card');

    

    skillCards.forEach(card => {

        card.addEventListener('mouseenter', function() {

            const icon = this.querySelector('.skill-icon');

            icon.style.animation = 'pulse 0.5s ease';

            

            setTimeout(() => {

                icon.style.animation = '';

            }, 500);

        });

    });

}



// Add ripple and pulse animation styles dynamically

const additionalStyles = document.createElement('style');

additionalStyles.textContent = `

    .btn {

        position: relative;

        overflow: hidden;

    }

    

    .ripple {

        position: absolute;

        border-radius: 50%;

        background: rgba(255, 255, 255, 0.4);

        transform: scale(0);

        animation: rippleEffect 0.6s linear;

        pointer-events: none;

    }

    

    @keyframes rippleEffect {

        to {

            transform: scale(4);

            opacity: 0;

        }

    }

    

    @keyframes pulse {

        0% { transform: scale(1); }

        50% { transform: scale(1.2); }

        100% { transform: scale(1); }

    }

`;

document.head.appendChild(additionalStyles);



/* ==================== TYPING EFFECT FOR HERO (BONUS) ==================== */

/**

 * Optional: Typing effect for hero section

 * Uncomment to enable

 */

/*

function initTypingEffect() {

    const text = "Subhadeep Kundu";

    const nameElement = document.querySelector('.name-text');

    let index = 0;

    

    nameElement.textContent = '';

    

    function type() {

        if (index < text.length) {

            nameElement.textContent += text.charAt(index);

            index++;

            setTimeout(type, 100);

        }

    }

    

    setTimeout(type, 1000);

}

*/



/* ==================== PARALLAX EFFECT (SUBTLE) ==================== */

/**

 * Subtle parallax effect for background shapes

 */

window.addEventListener('scroll', function() {

    const shapes = document.querySelectorAll('.shape');

    const scrollY = window.scrollY;

    

    shapes.forEach((shape, index) => {

        const speed = (index + 1) * 0.1;

        shape.style.transform = `translateY(${scrollY * speed}px)`;

    });

});



/* ==================== CONSOLE MESSAGE ==================== */

console.log('%c🚀 Portfolio by Subhadeep Kundu', 'font-size: 20px; font-weight: bold; color: #6366f1;');

console.log('%c🎓 YCSAS Internship - Learning Journey & Experience', 'font-size: 14px; color: #f472b6;');

console.log('%c📧 Contact: subhadeep.kundu@example.com', 'font-size: 12px; color: #64748b;');
