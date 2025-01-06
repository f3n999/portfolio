// main.js

// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').replace('.html', '');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Toggle theme (light/dark mode)
const toggleThemeButton = document.createElement('button');
toggleThemeButton.textContent = "Changer le thème";
toggleThemeButton.classList.add('theme-toggle');

document.body.appendChild(toggleThemeButton);

toggleThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

// Display "in progress" message for incomplete pages
document.querySelectorAll('.in-progress').forEach(element => {
    element.addEventListener('click', function () {
        alert("Cette section est en cours de construction. Revenez bientôt !");
    });
});
