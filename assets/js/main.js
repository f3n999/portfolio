// ============================================
// Mohamed Elnaggar Portfolio - Interactive JS
// ============================================

// Safety check: if GSAP didn't load, create stubs so nothing crashes
if (typeof gsap === 'undefined') {
    window.gsap = {
        registerPlugin: function() {},
        from: function() { return { from: function() { return this; } }; },
        to: function() {},
        fromTo: function() {},
        timeline: function() { return { from: function() { return this; } }; },
        utils: { toArray: function() { return []; } }
    };
    window.ScrollTrigger = { create: function() {} };
}

gsap.registerPlugin(ScrollTrigger);

// ---- Particle Background (BIGGER, MORE VISIBLE) ----
(function initParticles() {
    var canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var particles = [];
    var mouse = { x: null, y: null };
    var PARTICLE_COUNT = 90;
    var CONNECTION_DIST = 160;
    var MOUSE_DIST = 200;

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
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 2.5 + 0.8;
        this.baseRadius = this.radius;
        // Random color between cyan and purple
        this.hue = Math.random() > 0.7 ? 270 : 185;
    }

    Particle.prototype.update = function() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        if (mouse.x !== null && mouse.y !== null) {
            var dx = this.x - mouse.x;
            var dy = this.y - mouse.y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MOUSE_DIST) {
                var force = (MOUSE_DIST - dist) / MOUSE_DIST;
                this.x += dx * force * 0.035;
                this.y += dy * force * 0.035;
                this.radius = this.baseRadius + force * 3;
            } else {
                this.radius += (this.baseRadius - this.radius) * 0.05;
            }
        }
    };

    Particle.prototype.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        if (this.hue === 270) {
            ctx.fillStyle = 'rgba(124, 58, 237, 0.6)';
        } else {
            ctx.fillStyle = 'rgba(0, 240, 255, 0.5)';
        }
        ctx.fill();

        // Glow effect
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
        if (this.hue === 270) {
            ctx.fillStyle = 'rgba(124, 58, 237, 0.08)';
        } else {
            ctx.fillStyle = 'rgba(0, 240, 255, 0.06)';
        }
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
                    var opacity = (1 - dist / CONNECTION_DIST) * 0.25;
                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(0, 240, 255, ' + opacity + ')';
                    ctx.lineWidth = 0.8;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        // Mouse connections
        if (mouse.x !== null && mouse.y !== null) {
            for (var k = 0; k < particles.length; k++) {
                var dx2 = particles[k].x - mouse.x;
                var dy2 = particles[k].y - mouse.y;
                var dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                if (dist2 < MOUSE_DIST) {
                    var op = (1 - dist2 / MOUSE_DIST) * 0.4;
                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(0, 240, 255, ' + op + ')';
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[k].x, particles[k].y);
                    ctx.lineTo(mouse.x, mouse.y);
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
        'SOC | Purple Team',
        'Admin Systeme & Reseau @ Topchrono',
        'TryHackMe | HackTheBox',
        'Always learning, always hacking'
    ];
    var phraseIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typeSpeed = 70;

    function type() {
        var current = phrases[phraseIndex];
        if (isDeleting) {
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 30;
        } else {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 70;
        }

        if (!isDeleting && charIndex === current.length) {
            typeSpeed = 2500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400;
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
        if (href && (href === currentPage || href.endsWith('/' + currentPage))) {
            link.classList.add('active');
        }
    });
})();

// ---- GSAP Animations ----

// Header entrance
gsap.from("header", {
    opacity: 0,
    y: -30,
    duration: 1,
    ease: "power3.out"
});

// Footer entrance
gsap.from("footer", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "footer",
        start: "top 95%"
    }
});

// Hero animations - DRAMATIC
if (document.querySelector(".hero")) {
    // Ensure all hero elements become visible after animations complete or fail
    var heroElements = '.hero .profile-pic, .hero .greeting, .hero .big-title, .hero .subtitle, .hero .typing-text, .hero .status-badge, .hero .cta-buttons .btn, .hero .stats-row .stat-item, .hero .hero-description';

    function ensureHeroVisible() {
        document.querySelectorAll(heroElements).forEach(function(el) {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.visibility = 'visible';
        });
    }

    // Safety timeout: if GSAP animations don't complete within 5s, force visibility
    var safetyTimer = setTimeout(ensureHeroVisible, 5000);

    try {
        var heroTl = gsap.timeline({
            defaults: { ease: "power3.out" },
            onComplete: function() {
                clearTimeout(safetyTimer);
                ensureHeroVisible();
            }
        });

        heroTl
            .from(".hero .profile-pic", {
                opacity: 0,
                scale: 0,
                rotation: 180,
                duration: 1.2,
                ease: "back.out(1.7)",
                delay: 0.3
            })
            .from(".hero .greeting", {
                opacity: 0,
                y: 30,
                duration: 0.7,
            }, "-=0.5")
            .from(".hero .big-title", {
                opacity: 0,
                y: 50,
                scale: 0.9,
                duration: 0.9
            }, "-=0.3")
            .from(".hero .subtitle", {
                opacity: 0,
                y: 30,
                duration: 0.7
            }, "-=0.3")
            .from(".hero .typing-text", {
                opacity: 0,
                x: -30,
                duration: 0.6
            }, "-=0.2")
            .from(".hero .status-badge", {
                opacity: 0,
                scale: 0,
                duration: 0.6,
                ease: "back.out(2)"
            }, "-=0.2")
            .from(".hero .cta-buttons .btn", {
                opacity: 0,
                y: 30,
                scale: 0.8,
                duration: 0.5,
                stagger: 0.1,
                ease: "back.out(1.5)"
            }, "-=0.2")
            .from(".hero .stats-row .stat-item", {
                opacity: 0,
                y: 40,
                scale: 0.8,
                duration: 0.6,
                stagger: 0.12,
                ease: "back.out(1.5)"
            }, "-=0.3")
            .from(".hero .hero-description", {
                opacity: 0,
                y: 20,
                duration: 0.6
            }, "-=0.2");
    } catch(e) {
        clearTimeout(safetyTimer);
        ensureHeroVisible();
    }
}

// Scroll-triggered animations for cards
gsap.utils.toArray('.project-card, .certification-box, .experience, .stage-box, .education-card, .card, .glow-card').forEach(function(el) {
    gsap.from(el, {
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none"
        }
    });
});

// Timeline items with stagger
gsap.utils.toArray('.timeline-item').forEach(function(el, i) {
    gsap.from(el, {
        opacity: 0,
        x: -50,
        duration: 0.7,
        delay: i * 0.15,
        ease: "power3.out",
        scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none"
        }
    });
});

// Section headers - dramatic entrance
gsap.utils.toArray('.section-header').forEach(function(el) {
    gsap.from(el, {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });
});

// h2 headings outside section-headers
gsap.utils.toArray('main h2').forEach(function(el) {
    if (!el.closest('.section-header')) {
        gsap.from(el, {
            opacity: 0,
            x: -40,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none"
            }
        });
    }
});

// Terminal animation
if (document.querySelector('.terminal-body')) {
    gsap.from('.terminal', {
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '.terminal',
            start: "top 80%"
        }
    });

    gsap.utils.toArray('.terminal-line').forEach(function(line, i) {
        gsap.from(line, {
            opacity: 0,
            x: -20,
            duration: 0.4,
            delay: 0.9 + i * 0.12,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.terminal',
                start: "top 80%"
            }
        });
    });
}

// Veille intro/section cards
gsap.utils.toArray('.intro, .section').forEach(function(el, i) {
    gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        delay: i * 0.1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none"
        }
    });
});

// ---- Button hover effects ----
document.querySelectorAll('.btn').forEach(function(btn) {
    btn.addEventListener('mouseenter', function() {
        gsap.to(btn, { scale: 1.08, duration: 0.25, ease: "back.out(2)" });
    });
    btn.addEventListener('mouseleave', function() {
        gsap.to(btn, { scale: 1, duration: 0.25, ease: "power2.out" });
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
                    duration: 2,
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

// ---- Skill tag / project skill hover glow ----
document.querySelectorAll('.project-skills li, .skill-tag').forEach(function(tag) {
    tag.addEventListener('mouseenter', function() {
        gsap.fromTo(tag,
            { boxShadow: '0 0 0 0 rgba(0,240,255,0.5)' },
            { boxShadow: '0 0 0 8px rgba(0,240,255,0)', duration: 0.6, ease: "power2.out" }
        );
    });
});

// ---- Tilt effect on cards ----
document.querySelectorAll('.project-card, .education-card').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateX = (y - centerY) / centerY * -4;
        var rotateY = (x - centerX) / centerX * 4;
        card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-8px)';
    });
    card.addEventListener('mouseleave', function() {
        card.style.transform = '';
    });
});
