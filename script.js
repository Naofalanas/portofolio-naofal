// --- 1. GSAP ANIMATIONS ---
document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);

        // Simple Fade In for Hero
        gsap.from(".hero-content", {
            y: 30,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        });

        // Fade In for Sections
        gsap.utils.toArray(".section").forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%"
                },
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            });
        });
    }

    // Refresh Feather Icons
    feather.replace();
});

// --- 2. DYNAMIC YEAR ---
const yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// --- 3. MOBILE MENU (Enhanced) ---
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove("active");
        });
    });
}

// --- 4. DARK MODE (New) ---
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(isDark) {
    // Determine icon based on current state before replacing
    // If turning dark, we want a moon icon (to show current state)
    // If turning light, we want a sun icon (to show current state)
    const iconName = isDark ? 'moon' : 'sun';

    if (isDark) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }

    // Update icon safely by replacing entire content and refreshing feather
    if (themeBtn) {
        themeBtn.innerHTML = `<i data-feather="${iconName}"></i>`;
        feather.replace();
    }
}

// Check saved preference
if (localStorage.getItem('theme') === 'dark') {
    setTheme(true);
}

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        const isDark = !body.classList.contains('dark-mode');
        setTheme(isDark);
    });
}

// --- 5. SCROLL SPY (New) ---
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

const observerOptions = {
    threshold: 0.3 // Trigger when 30% of section is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            // Remove active from all
            navItems.forEach(link => link.classList.remove("active"));
            // Add active to current
            const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (activeLink) activeLink.classList.add("active");
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// --- 6. BACK TO TOP (New) ---
const backToTopBtn = document.getElementById("back-to-top");

if (backToTopBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add("visible");
        } else {
            backToTopBtn.classList.remove("visible");
        }
    });

    backToTopBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// --- 7. PROJECT MODAL (Enhanced with Dynamic Content) ---
const modal = document.getElementById("project-modal");
const openModalBtns = document.querySelectorAll(".open-modal-btn");
const closeModalBtn = document.querySelector(".close-modal");
const modalOverlay = document.querySelector(".modal-overlay");

// Case study data
const caseStudies = {
    sayurku: {
        title: "SayurKu Dashboard",
        tag: "Case Study",
        meta: { year: "2024", role: "Frontend Developer" },
        image: "img/sayurkuss.png",
        challenge: "Managing inventory and orders for a growing vegetable delivery service was becoming chaotic with spreadsheets. The goal was to create a centralized dashboard that provides real-time insights into sales, stock levels, and user activity.",
        solution: "I designed and developed a responsive admin panel that visualizes complex data into digestible charts. The interface prioritizes clarity, allowing admins to quickly assess business health at a glance.",
        features: [
            { title: "Real-time Data Visualization", desc: "Used Chart.js to render interactive sales graphs." },
            { title: "Responsive Design", desc: "Fully functional on mobile devices for on-the-go management." },
            { title: "Modern UI", desc: "Clean aesthetics with a focus on readability and ease of navigation." }
        ],
        stack: ["React", "Chart.js", "Tailwind CSS", "Vite"]
    },
    kopisenja: {
        title: "Kopi Senja E-Commerce",
        tag: "Case Study",
        meta: { year: "2024", role: "Frontend Developer" },
        image: "img/kopisenjass.png",
        challenge: "A local coffee shop needed an online presence to expand their customer base beyond physical store visitors. They required a fast, mobile-friendly e-commerce platform with smooth shopping experience.",
        solution: "Built a modern e-commerce website using AlpineJS for lightweight interactivity. Focused on performance optimization and intuitive product browsing with a seamless cart experience.",
        features: [
            { title: "Lightning-Fast Performance", desc: "Optimized loading times with lazy loading and efficient asset delivery." },
            { title: "Shopping Cart Integration", desc: "Smooth add-to-cart flow with real-time cart updates using AlpineJS." },
            { title: "Mobile-First Design", desc: "Responsive layout ensuring great UX on all devices, especially mobile." }
        ],
        stack: ["AlpineJS", "Tailwind CSS", "HTML5", "JavaScript"]
    },
    kamubisaaja: {
        title: "Kamubisaaja Platform",
        tag: "Case Study",
        meta: { year: "2024", role: "Frontend Developer" },
        image: "img/kamubisaajass.png",
        challenge: "A service marketplace platform needed a polished, professional frontend to integrate with their existing Laravel backend. The challenge was creating a consistent UI that handled complex service listings and user interactions.",
        solution: "Developed the complete frontend interface integrating seamlessly with Laravel backend APIs. Focused on creating an intuitive service browsing experience with clear call-to-actions and user-friendly navigation.",
        features: [
            { title: "Backend Integration", desc: "Smooth API integration with Laravel backend for dynamic content." },
            { title: "Service Discovery", desc: "Easy-to-navigate service listings with filtering and search capabilities." },
            { title: "Professional UI", desc: "Clean, business-focused design that builds trust and credibility." }
        ],
        stack: ["Laravel", "Bootstrap", "JavaScript", "HTML5/CSS3"]
    },
    cryptoapp: {
        title: "Crypto Tracker App",
        tag: "Case Study",
        meta: { year: "2024", role: "Frontend Developer" },
        image: "img/cryptoappss.png",
        challenge: "Cryptocurrency enthusiasts needed a mobile-responsive app to track real-time crypto prices and market trends. The app required fast data updates and an intuitive interface for monitoring multiple currencies.",
        solution: "Built a Vue.js-based progressive web app that fetches real-time cryptocurrency data from public APIs. Optimized for mobile devices with smooth animations and instant data refresh.",
        features: [
            { title: "Real-Time Price Updates", desc: "Integration with cryptocurrency APIs for live market data." },
            { title: "Mobile-Optimized", desc: "PWA architecture providing app-like experience on mobile browsers." },
            { title: "Interactive Charts", desc: "Visual price charts showing historical trends and market movements." }
        ],
        stack: ["Vue.js", "API Integration", "Chart.js", "Progressive Web App"]
    },
    konstruksi: {
        title: "Construction Landing Page",
        tag: "Case Study",
        meta: { year: "2025", role: "Frontend Developer" },
        image: "img/konstruksiss.png",
        challenge: "Make a construction landing page with a modern and professional design that is easy to navigate and provides information about the construction company.",
        solution: "Built with Tailwind CSS and AlpineJS.",
        features: [
            { title: "Modern Design", desc: "Modern and professional design that is easy to navigate." },
            { title: "Mobile-Optimized", desc: "Responsive design that is easy to navigate on mobile devices." },
        ],
        stack: ["Tailwind CSS", "AlpineJS"]
    }
};

if (modal) {
    // Open Modal
    openModalBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const projectId = btn.getAttribute("data-project");
            const study = caseStudies[projectId];

            if (study) {
                // Update modal content
                const modalBody = modal.querySelector(".modal-body");
                modalBody.innerHTML = `
                    <span class="modal-tag">${study.tag}</span>
                    <h2 class="modal-title">${study.title}</h2>
                    <div class="modal-meta">
                        <span>Year: ${study.meta.year}</span>
                        <span>Role: ${study.meta.role}</span>
                    </div>

                    <div class="modal-image">
                        <img src="${study.image}" alt="${study.title}">
                    </div>

                    <div class="modal-section">
                        <h3>The Challenge</h3>
                        <p>${study.challenge}</p>
                    </div>

                    <div class="modal-section">
                        <h3>The Solution</h3>
                        <p>${study.solution}</p>
                        <ul class="modal-list">
                            ${study.features.map(f => `
                                <li><strong>${f.title}:</strong> ${f.desc}</li>
                            `).join('')}
                        </ul>
                    </div>

                    <div class="modal-section">
                        <h3>Tech Stack</h3>
                        <div class="skills-list">
                            ${study.stack.map(tech => `<span class="skill-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                `;

                modal.classList.add("active");
                document.body.style.overflow = "hidden";

                // Refresh feather icons
                feather.replace();
            }
        });
    });

    // Close Functions
    const closeModal = () => {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    };

    if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
    if (modalOverlay) modalOverlay.addEventListener("click", closeModal);

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });
}
