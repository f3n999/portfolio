// Initialisation des animations GSAP avec ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animation d'introduction commune
gsap.from("header", {
    opacity: 0,
    y: -30,
    duration: 1.2,
    ease: "power2.out"
});

gsap.from("footer", {
    opacity: 0,
    y: 30,
    duration: 1.2,
    ease: "power2.out"
});

// Animation spécifique pour la page d'accueil (si l'élément existe)
if(document.querySelector(".hero")) {
    gsap.from(".hero .profile-pic", {
        opacity: 0,
        scale: 0.8,
        duration: 1.2,
        delay: 0.5
    });

    gsap.from(".hero .big-title", {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.7
    });

    gsap.from(".hero .subtitle", {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.9
    });

    gsap.from(".hero .cta-buttons", {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 1.1
    });
}

// Animation de scroll générique sur chaque page pour les sections principales
gsap.utils.toArray('main section').forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
});

// Animation pour boutons interactifs généraux
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { scale: 1.1, duration: 0.2 });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { scale: 1, duration: 0.2 });
    });
});
