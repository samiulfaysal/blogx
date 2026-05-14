/**
 * ==========================================
 * BlogX Theme - JavaScript Interactions
 * Refactored from AURA
 * Design: Tactical, Sharp, Technical
 * ==========================================
 */

(function() {
    'use strict';

    // ==========================================
    // Configuration
    // ==========================================
    const CONFIG = {
        grid: {
            size: 40,
            color: '0, 242, 255',
            opacity: 0.03
        },
        tilt: {
            strength: 0.08,
            maxRotation: 8,
            ease: 0.15
        },
        animation: {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    };

    // ==========================================
    // Grid Background Engine
    // Replaces dreamy particles with tactical grid
    // ==========================================
    class GridEngine {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.resize();
            this.init();
        }

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.cols = Math.ceil(this.canvas.width / CONFIG.grid.size);
            this.rows = Math.ceil(this.canvas.height / CONFIG.grid.size);
        }

        init() {
            window.addEventListener('resize', () => {
                this.resize();
                this.drawGrid();
            });
            this.drawGrid();
        }

        drawGrid() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.strokeStyle = `rgba(${CONFIG.grid.color}, ${CONFIG.grid.opacity})`;
            this.ctx.lineWidth = 1;

            for (let x = 0; x <= this.cols; x++) {
                this.ctx.beginPath();
                this.ctx.moveTo(x * CONFIG.grid.size, 0);
                this.ctx.lineTo(x * CONFIG.grid.size, this.canvas.height);
                this.ctx.stroke();
            }

            for (let y = 0; y <= this.rows; y++) {
                this.ctx.beginPath();
                this.ctx.moveTo(0, y * CONFIG.grid.size);
                this.ctx.lineTo(this.canvas.width, y * CONFIG.grid.size);
                this.ctx.stroke();
            }
        }
    }

    // ==========================================
    // Tactical Tilt System
    // Replaces magnetic with X/Y tilt
    // ==========================================
    class TacticalTilt {
        constructor(element) {
            this.element = element;
            this.bounding = null;
            this.center = { x: 0, y: 0 };
            this.rotate = { x: 0, y: 0 };
            this.target = { x: 0, y: 0 };
            this.animating = false;
            this.bindEvents();
            this.updateBounding();
        }

        bindEvents() {
            window.addEventListener('resize', () => this.updateBounding());
            this.element.addEventListener('mouseenter', () => this.updateBounding());
            this.element.addEventListener('mousemove', (e) => this.onMouseMove(e));
            this.element.addEventListener('mouseleave', () => this.onMouseLeave());
        }

        updateBounding() {
            if (!this.element) return;
            this.bounding = this.element.getBoundingClientRect();
            if (!this.bounding || this.bounding.width === 0 || this.bounding.height === 0) return;
            this.center.x = this.bounding.left + this.bounding.width / 2;
            this.center.y = this.bounding.top + this.bounding.height / 2;
        }

        onMouseMove(e) {
            if (!this.bounding || this.bounding.width === 0) return;
            const x = e.clientX - this.center.x;
            const y = e.clientY - this.center.y;

            this.target.x = (y / this.bounding.height) * -CONFIG.tilt.maxRotation;
            this.target.y = (x / this.bounding.width) * CONFIG.tilt.maxRotation;

            this.animate();
        }

        onMouseLeave() {
            this.target.x = 0;
            this.target.y = 0;
            this.animate();
        }

        animate() {
            if (!this.element) return;
            this.rotate.x += (this.target.x - this.rotate.x) * CONFIG.tilt.ease;
            this.rotate.y += (this.target.y - this.rotate.y) * CONFIG.tilt.ease;

            this.element.style.transform = `perspective(1000px) rotateX(${this.rotate.x}deg) rotateY(${this.rotate.y}deg)`;
        }
    }

    // ==========================================
    // Scroll Animations (Intersection Observer)
    // ==========================================
    class ScrollAnimator {
        constructor() {
            this.observer = new IntersectionObserver(
                (entries) => this.onIntersect(entries),
                {
                    threshold: CONFIG.animation.threshold,
                    rootMargin: CONFIG.animation.rootMargin
                }
            );
            this.init();
        }

        init() {
            const elements = document.querySelectorAll('.fade-in, .fade-in-up');
            elements.forEach(el => this.observer.observe(el));
        }

        onIntersect(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.observer.unobserve(entry.target);
                }
            });
        }
    }

    // ==========================================
    // Navigation Scroll Handler
    // ==========================================
    class Navigation {
        constructor() {
            this.nav = document.querySelector('.nav');
            this.lastScroll = 0;
            if (this.nav) {
                this.bindEvents();
            }
        }

        bindEvents() {
            window.addEventListener('scroll', () => this.onScroll());
        }

        onScroll() {
            if (!this.nav) return;
            const currentScroll = window.scrollY;

            if (currentScroll > 50) {
                this.nav.classList.add('scrolled');
            } else {
                this.nav.classList.remove('scrolled');
            }

            this.lastScroll = currentScroll;
        }
    }

    // ==========================================
    // Mobile Menu Toggle
    // ==========================================
    class MobileMenu {
        constructor() {
            this.toggle = document.querySelector('.nav__toggle');
            this.links = document.querySelector('.nav__links');
            if (this.toggle && this.links) {
                this.bindEvents();
            }
        }

        bindEvents() {
            this.toggle.addEventListener('click', () => this.toggleMenu());
        }

        toggleMenu() {
            this.toggle.classList.toggle('active');
            this.links.classList.toggle('open');
            this.toggle.setAttribute('aria-expanded',
                this.toggle.classList.contains('active'));
        }
    }

    // ==========================================
    // Copy Link Button
    // ==========================================
    class CopyLink {
        constructor() {
            this.buttons = document.querySelectorAll('[data-copy-link]');
            if (this.buttons.length > 0) {
                this.bindEvents();
            }
        }

        bindEvents() {
            this.buttons.forEach(btn => {
                if (!btn) return;
                btn.addEventListener('click', () => this.copy(btn));
            });
        }

        copy(button) {
            if (!button) return;
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                const originalHTML = button.innerHTML;
                button.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                `;
                setTimeout(() => {
                    button.innerHTML = originalHTML;
                }, 2000);
            }).catch(() => {
                // Silently fail if clipboard API is not available
            });
        }
    }

    // ==========================================
    // Smooth Scroll for Anchor Links
    // ==========================================
    class SmoothScroll {
        constructor() {
            this.links = document.querySelectorAll('a[href^="#"]');
            this.bindEvents();
        }

        bindEvents() {
            this.links.forEach(link => {
                link.addEventListener('click', (e) => {
                    const targetId = link.getAttribute('href');
                    if (targetId === '#') return;

                    const target = document.querySelector(targetId);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }
    }

    // ==========================================
    // Theme Toggle System
    // ==========================================
    class ThemeToggle {
        constructor() {
            this.button = document.getElementById('theme-toggle');
            this.html = document.documentElement;
            if (this.button) {
                this.bindEvents();
            }
        }

        bindEvents() {
            this.button.addEventListener('click', () => {
                const currentTheme = this.html.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';

                this.html.setAttribute('data-theme', newTheme);
                localStorage.setItem('blogx_theme', newTheme);
            });
        }
    }

    // ==========================================
    // Initialize All Systems
    // ==========================================
    document.addEventListener('DOMContentLoaded', () => {
        // Grid background
        const gridCanvas = document.getElementById('grid-canvas');
        if (gridCanvas && gridCanvas.getContext) {
            try {
                new GridEngine(gridCanvas);
            } catch (e) {
                console.warn('GridEngine initialization failed:', e);
            }
        }

        // Tactical tilt on cards
        const cards = document.querySelectorAll('.card[data-tilt]');
        cards.forEach(card => {
            if (card) {
                try {
                    new TacticalTilt(card);
                } catch (e) {
                    console.warn('TacticalTilt initialization failed:', e);
                }
            }
        });

        // Scroll animations
        try {
            new ScrollAnimator();
        } catch (e) {
            console.warn('ScrollAnimator initialization failed:', e);
        }

        // Navigation
        try {
            new Navigation();
        } catch (e) {
            console.warn('Navigation initialization failed:', e);
        }

        // Mobile menu
        try {
            new MobileMenu();
        } catch (e) {
            console.warn('MobileMenu initialization failed:', e);
        }

        // Copy link
        try {
            new CopyLink();
        } catch (e) {
            console.warn('CopyLink initialization failed:', e);
        }

        // Smooth scroll
        try {
            new SmoothScroll();
        } catch (e) {
            console.warn('SmoothScroll initialization failed:', e);
        }

        // Theme toggle
        try {
            new ThemeToggle();
        } catch (e) {
            console.warn('ThemeToggle initialization failed:', e);
        }
    });

})();