import { showTime } from './clock.js';
import { colorChanger } from './color.js';
import { projectHover } from './project.js';
import { footersvg } from './footer.js';

// Initialize all functionalities
function init() {
    setupBlurFade();
    setupLocomotiveScroll();
    showTime();
    colorChanger();
    projectHover();
    footersvg();
}

// Adaptive glassmorphism blur: read #main data-bgcolor, cap opacity at 35% for frosted-glass look
function setupBlurFade() {
    const main = document.getElementById("main");
    const blurEl = document.querySelector(".blur-fade-bottom");
    if (!main || !blurEl) return;
    const hex = main.dataset.bgcolor;
    if (!hex || typeof hex !== "string") return;
    const rgb = hexToRgb(hex);
    if (!rgb) return;
    const { r, g, b } = rgb;
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    const isLight = luminance > 0.5;
    const alphaStrong = Math.min(isLight ? 0.28 : 0.22, 0.35);
    const highlightAlpha = isLight ? 0.12 : 0.06;
    document.documentElement.style.setProperty("--fade-bg-strong", `rgba(${r},${g},${b},${alphaStrong})`);
    document.documentElement.style.setProperty("--fade-bg-soft", `rgba(${r},${g},${b},0)`);
    document.documentElement.style.setProperty("--fade-highlight", `rgba(255,255,255,${highlightAlpha})`);
}

function hexToRgb(hex) {
    const raw = hex.replace(/^#/, "");
    if (!/^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(raw)) return null;
    const expanded = raw.length === 3
        ? raw.split("").map((c) => c + c).join("")
        : raw;
    return {
        r: parseInt(expanded.slice(0, 2), 16),
        g: parseInt(expanded.slice(2, 4), 16),
        b: parseInt(expanded.slice(4, 6), 16),
    };
}

// Locomotive Scroll setup combined with ScrollTrigger
function setupLocomotiveScroll() {
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector('#main'),
        smooth: true,
        smoothMobile: true,
    });

    new ResizeObserver(() => locoScroll.update()).observe(
        document.querySelector("#main")
    );

    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            if (value !== undefined) {
                locoScroll.scrollTo(value, 0, 0);
            }
            return locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    ScrollTrigger.defaults({
        scroller: "#main",
    });

    ScrollTrigger.refresh();

    setupAnimations();
}

// Some Animations
function setupAnimations() {
    const isProjectPage = document.body.classList.contains("project-page");

    gsap.utils.toArray(".reveal").forEach(reveal => {
        gsap.to(reveal.querySelector("h1"), {
            scrollTrigger: {
                trigger: reveal,
                start: "top 60%",
            },
            y: 0,
            skewY: 0,
            ease: "power2.ease",
            duration: 0.6,
        });
    });

    if (!isProjectPage) {
        // Image-specific animations are intentionally skipped on project pages.
        gsap.utils.toArray(".projectImage, .projectImage img").forEach(() => { });
    }

    // Sticky Scroll
    gsap.utils.toArray('.tools_heading').forEach((heading) => {
        gsap.timeline({
            scrollTrigger: {
                trigger: heading,
                toggleActions: "restart complete reverse resume",
                start: "top 5%",
                scrub: true,
                pin: true,
            },
        });
    });

    const cameFromProject = isProjectPage && /project-/.test(document.referrer || "");
    const shouldShowLoader = !cameFromProject;

    if (shouldShowLoader) {
        let counter = { value: 0 };

        /* loader */
        gsap.to(counter, {
            duration: 2,
            value: 100,
            ease: "none",
            onUpdate: function () {

                const currentPercentage = Math.ceil(counter.value);
                document.getElementById("counter").textContent = currentPercentage + '%';

                gsap.to(".bar2", {
                    width: currentPercentage + "%",
                    ease: "none",
                    duration: 0.1
                });
            },
            onComplete: () => {
                var tl4 = gsap.timeline();
                tl4.to(".counter", {
                    ease: "power4.inOut",
                    opacity: 0,
                    duration: 0.5,
                });

                tl4.to(".bar", {
                    ease: "power4.inOut",
                    opacity: 0,
                    duration: 0.5,
                }, '-=.3');

                tl4.to(".loader-container", {
                    y: "-120%",
                    ease: "power4.inOut",
                    duration: 1.6,
                });
            }
        });
    } else {
        gsap.set(".loader-container", { y: "-120%", opacity: 0, pointerEvents: "none" });
    }

    if (isProjectPage) {
        setupProjectTransitions();
    }

    ScrollTrigger.refresh();
}

function setupProjectTransitions() {
    const transitionKey = "projectTransitionDirection";
    const transitionDuration = 0.5;
    const transitionEase = "power2.out";
    const links = document.querySelectorAll(".projectNav_link");

    const lastDirection = sessionStorage.getItem(transitionKey);
    if (lastDirection === "next" || lastDirection === "prev") {
        sessionStorage.removeItem(transitionKey);
        const fromX = lastDirection === "next" ? 60 : -60;
        gsap.set("#main", { x: fromX, opacity: 0 });
        gsap.to("#main", {
            x: 0,
            opacity: 1,
            duration: transitionDuration,
            ease: transitionEase
        });
    }

    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const href = link.getAttribute("href");
            if (!href) {
                return;
            }

            const direction = link.classList.contains("is-right") ? "next" : "prev";
            const toX = direction === "next" ? -60 : 60;
            sessionStorage.setItem(transitionKey, direction);

            gsap.to("#main", {
                x: toX,
                opacity: 0,
                duration: transitionDuration,
                ease: transitionEase,
                onComplete: () => {
                    window.location.href = href;
                }
            });
        });
    });
}

init();
