// Modern JavaScript for SAPS Landing Page with Bootstrap Integration
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initSmoothScroll();
    initScrollAnimations();
    initNavbarScroll();
    initBootstrapComponents();
});

// Bootstrap Components Integration
function initBootstrapComponents() {
    // Initialize Bootstrap tooltips if any
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize Bootstrap popovers if any
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Handle navbar collapse on link click (mobile)
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }
        });
    });
}

// Smooth Scroll for Navigation Links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Add staggered animation delay for cards
                const cards = entry.target.closest('.row')?.querySelectorAll('.animate-on-scroll');
                if (cards) {
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animated');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Navbar Scroll Effects
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar-custom');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', debounce(function() {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class for styling
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (optional - can be disabled)
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    }, 10));
}

// Enhance card hover effects
function initCardEffects() {
    const cards = document.querySelectorAll('.hover-lift');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Smooth loading animation
function initLoadingAnimation() {
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate hero section elements
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced scroll to top functionality
function initScrollToTop() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    scrollBtn.className = 'btn btn-primary position-fixed bottom-0 end-0 m-3 rounded-circle';
    scrollBtn.style.display = 'none';
    scrollBtn.style.zIndex = '1000';
    scrollBtn.style.width = '50px';
    scrollBtn.style.height = '50px';
    scrollBtn.setAttribute('aria-label', 'Voltar ao topo');
    document.body.appendChild(scrollBtn);
    
    // Show/hide button on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initCardEffects();
    initLoadingAnimation();
    initScrollToTop();
});

// Bootstrap event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Handle Bootstrap navbar events
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarCollapse.addEventListener('show.bs.collapse', function() {
            navbarToggler.setAttribute('aria-expanded', 'true');
        });
        
        navbarCollapse.addEventListener('hide.bs.collapse', function() {
            navbarToggler.setAttribute('aria-expanded', 'false');
        });
    }
});

// Form validation (if needed for future contact forms)
function initFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
}

// Add custom CSS for enhanced animations
const enhancedCSS = `
    .hero-content > * {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .animate-on-scroll.animated {
        opacity: 1;
        transform: translateY(0);
    }
    
    .navbar-custom {
        transition: all 0.3s ease;
    }
    
    .hover-lift {
        transition: all 0.3s ease;
    }
    
    body:not(.loaded) {
        opacity: 0;
    }
    
    body.loaded {
        opacity: 1;
        transition: opacity 0.5s ease-in-out;
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;

// Inject enhanced CSS
const style = document.createElement('style');
style.textContent = enhancedCSS;
document.head.appendChild(style); 