// Smooth Scroll for Navigation Links
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', event => {
        // Prevent default link behavior
        event.preventDefault();

        // Get the target section ID
        const sectionId = link.getAttribute('href').replace('.html', '');
        const targetSection = document.querySelector(sectionId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.location.href = link.getAttribute('href');
        }
    });
});

// Toggle active link in navigation
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(nav => nav.classList.remove('active'));
        link.classList.add('active');
    });
});

// Form Validation (for Contact Page)
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', event => {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert('Veuillez remplir tous les champs.');
            event.preventDefault();
        }
    });
}
