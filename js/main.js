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


    ScrollTrigger.refresh();
}

init();
