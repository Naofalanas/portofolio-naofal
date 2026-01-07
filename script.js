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

// --- 7. PROJECT MODAL (New) ---
const modal = document.getElementById("project-modal");
const openModalBtns = document.querySelectorAll(".open-modal-btn");
const closeModalBtn = document.querySelector(".close-modal");
const modalOverlay = document.querySelector(".modal-overlay");

if (modal) {
    // Open Modal
    openModalBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const projectId = btn.getAttribute("data-project");
            // In a real app, you might fetch content based on projectId.
            // For now, we only have one static modal content for SayurKu.
            if (projectId === 'sayurku') {
                modal.classList.add("active");
                document.body.style.overflow = "hidden"; // Prevent scrolling
            }
        });
    });

    // Close Functions
    const closeModal = () => {
        modal.classList.remove("active");
        document.body.style.overflow = ""; // Restore scrolling
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
