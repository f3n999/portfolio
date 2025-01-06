document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav ul");

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("show");
    });
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        document.getElementById(targetId)?.scrollIntoView({
            behavior: "smooth"
        });
    });
});
document.addEventListener("scroll", () => {
    const elements = document.querySelectorAll(".animate-on-scroll");
    const windowHeight = window.innerHeight;

    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            el.classList.add("visible");
        }
    });
});
document.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    const scrollY = window.scrollY;

    if (scrollY > 0) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const underConstruction = document.querySelector(".under-construction");
    if (underConstruction) {
        let dots = 0;
        setInterval(() => {
            dots = (dots + 1) % 4; // Alterne entre 0, 1, 2, 3
            underConstruction.textContent = "En cours de construction" + ".".repeat(dots);
        }, 500);
    }
});
