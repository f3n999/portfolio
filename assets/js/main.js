// ============================================
// Mohamed Elnaggar Portfolio - Interactive JS
// ============================================

gsap.registerPlugin(ScrollTrigger);

// ---- Particle Background ----
(function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null };
    const PARTICLE_COUNT = 60;
    const CONNECTION_DIST = 120;
    const MOUSE_DIST = 150;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    document.addEventListener('mousemove', function(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    document.addEventListener('mouseleave', function() {
        mouse.x = null;
        mouse.y = null;
    });

    function Particle() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 0.5;
    }

    Particle.prototype.update = function() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Mouse repulsion
        if (mouse.x !== null && mouse.y !== null) {
            var dx = this.x - mouse.x;
            var dy = this.y - mouse.y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MOUSE_DIST) {
                var force = (MOUSE_DIST - dist) / MOUSE_DIST;
                this.x += dx * force * 0.02;
                this.y += dy * force * 0.02;
            }
        }
    };

    Particle.prototype.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(100, 255, 218, 0.4)';
        ctx.fill();
    };

    for (var i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        for (var i = 0; i < particles.length; i++) {
            for (var j = i + 1; j < particles.length; j++) {
                var dx = particles[i].x - particles[j].x;
                var dy = particles[i].y - particles[j].y;
                var dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECTION_DIST) {
                    var opacity = (1 - dist / CONNECTION_DIST) * 0.15;
                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(100, 255, 218, ' + opacity + ')';
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(function(p) {
            p.update();
            p.draw();
        });
        connectParticles();
        requestAnimationFrame(animate);
    }
    animate();
})();

// ---- Typing Effect ----
(function initTyping() {
    var el = document.querySelector('.typing-text');
    if (!el) return;

    var phrases = [
        'Cybersecurity Student @ Oteria',
        'Pentester in training',
        'Network & System Security',
        'TryHackMe | HackTheBox',
        'Always learning, always hacking'
    ];
    var phraseIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typeSpeed = 80;

    function type() {
        var current = phrases[phraseIndex];
        if (isDeleting) {
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === current.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    type();
})();

// ---- Header scroll effect ----
(function initHeaderScroll() {
    var header = document.querySelector('header');
    if (!header) return;
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
})();

// ---- Active nav link ----
(function initActiveNav() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('header nav ul li a').forEach(function(link) {
        var href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
})();

// ---- GSAP Animations ----

// Header entrance
gsap.from("header", {
    opacity: 0,
    y: -20,
    duration: 0.8,
    ease: "power2.out"
});

// Footer entrance
gsap.from("footer", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "footer",
        start: "top 95%"
    }
});

// Hero animations
if (document.querySelector(".hero")) {
    var heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    heroTl
        .from(".hero .profile-pic", {
            opacity: 0,
            scale: 0.5,
            duration: 0.8,
            delay: 0.2
        })
        .from(".hero .greeting", {
            opacity: 0,
            y: 20,
            duration: 0.6
        }, "-=0.3")
        .from(".hero .big-title", {
            opacity: 0,
            y: 30,
            duration: 0.7
        }, "-=0.3")
        .from(".hero .subtitle", {
            opacity: 0,
            y: 20,
            duration: 0.6
        }, "-=0.2")
        .from(".hero .typing-text", {
            opacity: 0,
            duration: 0.5
        }, "-=0.2")
        .from(".hero .status-badge", {
            opacity: 0,
            scale: 0.8,
            duration: 0.5
        }, "-=0.2")
        .from(".hero .cta-buttons", {
            opacity: 0,
            y: 20,
            duration: 0.6
        }, "-=0.2")
        .from(".hero .stats-row .stat-item", {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.1
        }, "-=0.3");
}

// Scroll-triggered animations for cards and sections
gsap.utils.toArray('.project-card, .certification-box, .experience, .stage-box, .education-card, .card').forEach(function(el) {
    gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });
});

// Stagger animations for lists
gsap.utils.toArray('.timeline-item').forEach(function(el, i) {
    gsap.from(el, {
        opacity: 0,
        x: -30,
        duration: 0.6,
        delay: i * 0.1,
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });
});

// Section headers
gsap.utils.toArray('.section-header, main > .container > h1, main > .container > h2, .stages h1, .projects h1, .certifications h1').forEach(function(el) {
    gsap.from(el, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });
});

// Terminal animation
if (document.querySelector('.terminal-body')) {
    gsap.from('.terminal', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
            trigger: '.terminal',
            start: "top 80%"
        }
    });

    gsap.utils.toArray('.terminal-line').forEach(function(line, i) {
        gsap.from(line, {
            opacity: 0,
            x: -15,
            duration: 0.4,
            delay: 0.8 + i * 0.15,
            scrollTrigger: {
                trigger: '.terminal',
                start: "top 80%"
            }
        });
    });
}

// Veille sections
gsap.utils.toArray('.intro, .section').forEach(function(el, i) {
    gsap.from(el, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: i * 0.1,
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });
});

// ---- Button hover effects ----
document.querySelectorAll('.btn').forEach(function(btn) {
    btn.addEventListener('mouseenter', function() {
        gsap.to(btn, { scale: 1.05, duration: 0.2 });
    });
    btn.addEventListener('mouseleave', function() {
        gsap.to(btn, { scale: 1, duration: 0.2 });
    });
});

// ---- Animated counters ----
(function initCounters() {
    document.querySelectorAll('.stat-number[data-count]').forEach(function(el) {
        var target = parseInt(el.getAttribute('data-count'), 10);
        var suffix = el.getAttribute('data-suffix') || '';

        ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            once: true,
            onEnter: function() {
                gsap.to({ val: 0 }, {
                    val: target,
                    duration: 1.5,
                    ease: "power2.out",
                    onUpdate: function() {
                        el.textContent = Math.round(this.targets()[0].val) + suffix;
                    }
                });
            }
        });
    });
})();

// ---- Close mobile menu on link click ----
(function initMobileMenuClose() {
    var checkbox = document.getElementById('menu-toggle-input');
    if (!checkbox) return;
    document.querySelectorAll('header nav ul li a').forEach(function(link) {
        link.addEventListener('click', function() {
            checkbox.checked = false;
        });
    });
})();

// ---- Skill tag hover ripple ----
document.querySelectorAll('.project-skills li, .skill-tag').forEach(function(tag) {
    tag.addEventListener('mouseenter', function() {
        gsap.fromTo(tag, { boxShadow: '0 0 0 0 rgba(100,255,218,0.4)' }, {
            boxShadow: '0 0 0 6px rgba(100,255,218,0)',
            duration: 0.5,
            ease: "power2.out"
        });
    });
});
