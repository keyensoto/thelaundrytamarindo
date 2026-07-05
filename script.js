// ============================================
// MOBILE MENU TOGGLE
// ============================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            service: formData.get('service'),
            message: formData.get('message')
        };

        // Validate form
        if (!data.name || !data.email || !data.service || !data.message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Change button state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            // Send to WhatsApp (alternative method since direct email is not available)
            const message = encodeURIComponent(
                `Hi Rodney,\n\n` +
                `I would like to inquire about ${data.service} services.\n\n` +
                `Contact Information:\n` +
                `Name: ${data.name}\n` +
                `Email: ${data.email}\n` +
                `Phone: ${data.phone || 'Not provided'}\n\n` +
                `Message:\n${data.message}`
            );

            // Simulate sending (in production, this would go to a backend)
            setTimeout(() => {
                // Show success message
                alert('Thank you for your message! We will get back to you within 24 hours.');
                
                // Reset form
                contactForm.reset();
                
                // Restore button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Redirect to WhatsApp
                window.open(`https://wa.me/50686786248?text=${message}`, '_blank');
            }, 1000);
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error sending your message. Please try again.');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ============================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ============================================

const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

smoothScrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const element = document.querySelector(href);
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards and sections
const animatedElements = document.querySelectorAll(
    '.service-card, .why-card, .pricing-card, .testimonial-card, .faq-item'
);

animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(element);
});

// ============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    }
});

// ============================================
// PRINT STYLES
// ============================================

if (typeof window !== 'undefined') {
    window.addEventListener('beforeprint', () => {
        document.querySelectorAll('.whatsapp-button, .navbar').forEach(el => {
            el.style.display = 'none';
        });
    });

    window.addEventListener('afterprint', () => {
        document.querySelectorAll('.whatsapp-button, .navbar').forEach(el => {
            el.style.display = '';
        });
    });
}

console.log('✅ The Laundry Tamarindo website loaded successfully!');
