/* 
  Portfolio Interactivity Script
  Author: Antigravity for Gaurav Kale
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinksList = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinksList.classList.toggle('show');
            
            // Basic mobile menu styles injected via JS for simplicity 
            // OR we can add them to style.css (better practice)
        });
    }

    // 2. Smooth Scrolling & Active Link Highlight
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px -10px rgba(2, 12, 27, 0.7)';
            navbar.style.height = '70px';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.height = '80px';
        }
    });

    // 3. Scroll Reveal Animations using Intersection Observer
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply reveal to sections and specific elements
    const elementsToReveal = document.querySelectorAll('.section-title, .glass, .hero-content, .hero-image, .timeline-item');
    
    // Add initial hidden state styles via JS (to avoid flash of unstyled content)
    elementsToReveal.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.645, 0.045, 0.355, 1)';
        revealObserver.observe(el);
    });

    // CSS for revealed state
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        @media (max-width: 768px) {
            .nav-links.show {
                display: flex !important;
                flex-direction: column;
                position: absolute;
                top: 80px;
                right: 0;
                width: 100%;
                background-color: var(--bg-alt);
                padding: 20px;
                border-bottom: 1px solid var(--accent);
                animation: slideDown 0.3s ease-out forwards;
            }
            
            .nav-links.show li {
                margin: 15px 0;
                text-align: center;
            }
            
            .menu-toggle.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
            .menu-toggle.active span:nth-child(2) { opacity: 0; }
            .menu-toggle.active span:nth-child(3) { transform: rotate(-45deg) translate(7px, -6px); }
        }
        
        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(styleSheet);
});
