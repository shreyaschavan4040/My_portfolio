
// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.getElementById('backToTop');
const header = document.querySelector('header');
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');
const contactForm = document.getElementById('contactForm');
const skillItems = document.querySelectorAll('.skill-item');

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    const icon = themeToggle.querySelector('i');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

// Scroll effects
window.addEventListener('scroll', () => {
    // Header background on scroll
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Back to Top button
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Animate skills on scroll
    skillItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
            const percent = item.getAttribute('data-percent');
            const progress = item.querySelector('.skill-progress');
            progress.style.width = `${percent}%`;
        }
    });
});

// Back to Top functionality
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Navigation smooth scroll
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Projects filter functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        cards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Contact form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// Download CV function
function downloadResume() {
    // Create a fake download (replace with actual resume file)
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/file/d/1h62dd-BOGdYVfgp4UEwc4-IJ89cn99Cz/view?usp=drive_link';
    link.download = 'Shreyas_Chavan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('Downloading resume...');
}

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// Typing animation for hero text
function initTypingAnimation() {
    const text = "Shreyas Chavan";
    const typingElement = document.querySelector('.typing-text');
    let index = 0;
    
    function type() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }
    
    // Start typing after 1 second
    setTimeout(() => {
        typingElement.textContent = '';
        type();
    }, 1000);
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    initTypingAnimation();
    
    // Initialize skill bars
    skillItems.forEach(item => {
        const progress = item.querySelector('.skill-progress');
        progress.style.width = '0%';
    });
    
    // Add hover effect to cards
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.3s ease';
        });
    });
});

// Add parallax effect to hero image
window.addEventListener('scroll', () => {
    const heroImg = document.querySelector('.profilimg img');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (heroImg && window.innerWidth > 768) {
        heroImg.style.transform = `translateY(${rate}px) scale(1.05)`;
    }
});

// Add active class to nav links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add particle effect to hero section
function createParticles() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = `rgba(66, 133, 244, ${Math.random() * 0.3})`;
        particle.style.borderRadius = '50%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        heroSection.appendChild(particle);
    }
}

// Add to your existing CSS for particles:
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { transform: translateY(0) translateX(0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) translateX(100px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Call particle creation
createParticles();
// Add these to your existing script.js

// Mobile menu toggle
const hamburgerMenu = document.getElementById('hamburgerMenu');
const mynav = document.querySelector('.mynav');

hamburgerMenu.addEventListener('click', () => {
    mynav.classList.toggle('active');
    
    // Change icon
    const icon = hamburgerMenu.querySelector('i');
    if (mynav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mynav a').forEach(link => {
    link.addEventListener('click', () => {
        mynav.classList.remove('active');
        const icon = hamburgerMenu.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mynav.contains(e.target) && !hamburgerMenu.contains(e.target)) {
        mynav.classList.remove('active');
        const icon = hamburgerMenu.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Prevent body scroll when mobile menu is open
hamburgerMenu.addEventListener('click', () => {
    if (mynav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Update on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 600) {
        mynav.classList.remove('active');
        document.body.style.overflow = '';
        const icon = hamburgerMenu.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});
