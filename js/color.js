export function colorChanger() {
    /* COLOR CHANGER */
    window.addEventListener("load", function () {
        const scrollColorElems = document.querySelectorAll("[data-bgcolor]");
        scrollColorElems.forEach((colorSection, i) => {
            const prevBg = i === 0 ? "" : scrollColorElems[i - 1].dataset.bgcolor;
            const prevText = i === 0 ? "" : scrollColorElems[i - 1].dataset.textcolor;

            ScrollTrigger.create({
                trigger: colorSection,
                scroller: "#main",
                start: "top 50%",
                onEnter: () =>
                    gsap.to("#main", {
                        backgroundColor: colorSection.dataset.bgcolor,
                        color: colorSection.dataset.textcolor,
                        overwrite: "auto"
                    }),
                onLeaveBack: () =>
                    gsap.to("#main", {
                        backgroundColor: prevBg,
                        color: prevText,
                        overwrite: "auto"
                    })
            });
        });
    });
}