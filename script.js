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
        meta: { year: "2024", role: "Lead Frontend Developer" },
        image: "img/ssdash.png",
        challenge: "SayurKu, a vegetable delivery startup, was drowning in spreadsheets. Their team spent 3+ hours daily manually tracking inventory, orders, and sales data across multiple Excel files. They needed a centralized dashboard to visualize business metrics and reduce operational overhead.",
        solution: "I designed and built a comprehensive admin dashboard from scratch using React and Chart.js. The interface transforms complex data into actionable insights — admins can now monitor sales trends, track inventory levels, and manage orders from a single screen. The result? A 40% reduction in time spent on daily reporting.",
        features: [
            { title: "Real-time Analytics", desc: "Interactive Chart.js graphs showing daily/weekly/monthly sales, revenue trends, and top-selling products." },
            { title: "Inventory Management", desc: "Low-stock alerts and automated tracking reduced stockouts by 25%." },
            { title: "Responsive Dashboard", desc: "Fully functional on tablets — owners can check metrics on-the-go." },
            { title: "Clean Data Tables", desc: "Sortable, filterable order lists with export functionality." }
        ],
        stack: ["React", "Chart.js", "Tailwind CSS", "Vite", "React Router"]
    },
    kopisenja: {
        title: "Kopi Senja E-Commerce",
        tag: "Case Study",
        meta: { year: "2024", role: "Sole Developer" },
        image: "img/kopisenjass.png",
        challenge: "Kopi Senja, a local coffee shop, was missing online sales opportunities. Their customers frequently asked about online ordering, but the shop had no web presence. They needed a fast, beautiful e-commerce site that could handle product browsing and ordering — without the complexity of a full backend.",
        solution: "Built a lightweight, blazing-fast e-commerce frontend using AlpineJS and Tailwind CSS. No heavy frameworks — just optimized vanilla code that loads in under 2 seconds. The shopping cart uses local storage for persistence, and orders are processed via WhatsApp integration for simplicity.",
        features: [
            { title: "95+ Lighthouse Score", desc: "Achieved near-perfect performance through code splitting, lazy loading, and optimized images." },
            { title: "Smooth Cart Experience", desc: "Real-time cart updates with AlpineJS reactivity — no page reloads needed." },
            { title: "WhatsApp Integration", desc: "One-click ordering that opens WhatsApp with pre-filled order details." },
            { title: "Mobile-First Design", desc: "70% of users browse on mobile — designed for thumb-friendly navigation." }
        ],
        stack: ["AlpineJS", "Tailwind CSS", "HTML5", "JavaScript", "LocalStorage"]
    },
    kamubisaaja: {
        title: "Kamubisaaja Platform",
        tag: "Case Study",
        meta: { year: "2024", role: "Frontend Developer & API Integration" },
        image: "img/kamubisaajass.png",
        challenge: "Kamubisaaja needed to launch their service marketplace but their backend team had no frontend expertise. The platform required handling 500+ service listings, complex filtering, user authentication flows, and seamless integration with their Laravel API — all while maintaining a professional, trustworthy appearance.",
        solution: "Developed the complete frontend layer from Figma designs to production. Built a robust service discovery system with multi-parameter filtering, implemented secure authentication flows, and created reusable components for consistent UX across 15+ pages. Worked closely with backend team to define API contracts.",
        features: [
            { title: "Advanced Service Filtering", desc: "Multi-select categories, price range, location — handles 500+ listings smoothly." },
            { title: "Secure Auth Flow", desc: "Login, registration, password reset with proper validation and error handling." },
            { title: "API Integration", desc: "RESTful API consumption with loading states, error boundaries, and retry logic." },
            { title: "Component Library", desc: "Built 20+ reusable components ensuring design consistency across the platform." }
        ],
        stack: ["Laravel Blade", "Bootstrap 5", "JavaScript ES6", "REST API", "Git"]
    },
    cryptoapp: {
        title: "Crypto Tracker App",
        tag: "Case Study",
        meta: { year: "2024", role: "Frontend Developer" },
        image: "img/cryptoappss.png",
        challenge: "Crypto enthusiasts needed a clean, mobile-friendly way to track their favorite coins without the clutter of full trading platforms. The app had to display real-time prices, historical charts, and handle API rate limits gracefully — all while feeling snappy on mobile devices.",
        solution: "Created a Vue.js Progressive Web App (PWA) that fetches live data from CoinGecko API. Implemented smart caching to reduce API calls by 60%, added Chart.js for price visualization, and optimized for installability on mobile home screens. The app feels native despite being web-based.",
        features: [
            { title: "Live Price Updates", desc: "Auto-refresh every 30 seconds with visual indicators for price changes." },
            { title: "Interactive Charts", desc: "7-day, 30-day, and 1-year historical price charts with zoom functionality." },
            { title: "PWA Installable", desc: "Add to home screen capability with offline-first architecture." },
            { title: "Smart Caching", desc: "Reduced API calls by 60% using service workers and localStorage caching." }
        ],
        stack: ["Vue.js 3", "Chart.js", "CoinGecko API", "PWA", "Service Workers"]
    },
    konstruksi: {
        title: "Construction Landing Page",
        tag: "Case Study",
        meta: { year: "2025", role: "Sole Developer & Designer" },
        image: "img/konstruksiss.png",
        challenge: "A construction company was losing leads to competitors with better websites. Their old site looked outdated, wasn't mobile-responsive, and had no clear call-to-action. Potential clients were bouncing within seconds. They needed a modern, professional landing page that builds trust and converts visitors into inquiries.",
        solution: "Designed and developed a conversion-focused landing page from scratch. Created a visual hierarchy that guides visitors toward the contact form, added a project gallery showcasing completed work, and implemented smooth scroll animations for a premium feel. Optimized for SEO with proper meta tags and structured data.",
        features: [
            { title: "Conversion-Optimized", desc: "Strategic CTA placement resulted in 3x more contact form submissions." },
            { title: "Project Gallery", desc: "Before/after showcase with lightbox — visual proof of quality work." },
            { title: "Trust Signals", desc: "Client testimonials, certifications, and years of experience prominently displayed." },
            { title: "Mobile-Perfect", desc: "60% of construction searches are mobile — fully responsive with fast load times." }
        ],
        stack: ["Tailwind CSS", "AlpineJS", "GSAP Animations", "SEO Optimized"]
    }
}

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

// --- 8. FAQ ACCORDION ---
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");

    if (question) {
        question.addEventListener("click", () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains("active")) {
                    otherItem.classList.remove("active");
                }
            });

            // Toggle current item
            item.classList.toggle("active");

            // Refresh feather icons for the plus/minus
            feather.replace();
        });
    }
});
