import { showTime } from './clock.js';
import { colorChanger } from './color.js';
import { projectHover } from './project.js';
import { footersvg } from './footer.js';

// Initialize all functionalities
function init() {
    setupLocomotiveScroll();
    showTime();
    colorChanger();
    projectHover();
    footersvg();
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
