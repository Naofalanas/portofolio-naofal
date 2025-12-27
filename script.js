// --- 1. GSAP ANIMATIONS (Simplified) ---
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
});

// --- 2. DYNAMIC YEAR ---
const yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// --- 3. MOBILE MENU ---
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        // Toggle basic mobile menu logic
        if (navLinks.style.display === "flex") {
            navLinks.style.display = "none";
        } else {
            navLinks.style.display = "flex";
            navLinks.style.position = "absolute";
            navLinks.style.top = "100%";
            navLinks.style.left = "0";
            navLinks.style.right = "0";
            navLinks.style.background = "#fff";
            navLinks.style.flexDirection = "column";
            navLinks.style.padding = "24px";
            navLinks.style.borderBottom = "1px solid #e5e5e5";
        }
    });
}
