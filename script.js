document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 2. SPA Navigation Logic
    const links = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.page-section');

    function navigateTo(hash) {
        // Default to home if no hash or hash doesn't match a section
        if (!hash || hash === '#') {
            hash = '#home';
        }
        
        const targetSection = document.querySelector(hash);
        
        // If the hash is valid and corresponds to a section
        if (targetSection) {
            // Hide all sections
            sections.forEach(sec => sec.classList.remove('active-page'));
            // Show target section
            targetSection.classList.add('active-page');
            
            // Update active state on nav links
            links.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === hash) {
                    link.classList.add('active');
                }
            });

            // Scroll to the top of the page smoothly
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu if it's open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    }

    // Intercept clicks on any internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hash = this.getAttribute('href');
            
            // Allow default behavior if it's just '#'
            if (hash === '#') return;
            
            e.preventDefault();
            
            // Update URL hash without causing a jump
            history.pushState(null, null, hash);
            
            // Trigger navigation logic
            navigateTo(hash);
        });
    });

    // Handle back/forward browser buttons
    window.addEventListener('popstate', () => {
        navigateTo(window.location.hash);
    });

    // Run on initial load to handle direct links (e.g., index.html#gallery)
    navigateTo(window.location.hash);

    // 3. Form Submissions (Mocking behavior)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic generic validation
            let isValid = true;
            const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '#ccc';
                }
            });

            if (isValid) {
                // Determine which form it is to customize the message
                const formId = form.id;
                let message = 'Form submitted successfully!';
                
                if (formId === 'admissionForm') {
                    message = 'Thank you for your interest! Your admission inquiry has been received.';
                } else if (formId === 'contactForm') {
                    message = 'Message sent successfully! We will get back to you soon.';
                } else if (form.classList.contains('newsletter-form')) {
                    message = 'Subscribed to newsletter successfully!';
                }

                alert(message + '\n\n(This is a static frontend demo)');
                form.reset();
            } else {
                alert('Please fill out all required fields.');
            }
        });
    });
});
