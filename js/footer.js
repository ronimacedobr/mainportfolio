export function footersvg() {
    const svg = document.querySelector("#svg");
    const mouse = svg.createSVGPoint();

    const leftEye = createEye("#left-eye");
    const rightEye = createEye("#right-eye");

    let requestId = null;

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);

    function updateEyes() {
        let point = mouse.matrixTransform(svg.getScreenCTM().inverse());

        leftEye.updateCenter();
        rightEye.updateCenter();
        leftEye.rotateTo(point);
        rightEye.rotateTo(point);

        requestId = null;
    }

    function onFrame() {
        updateEyes();
    }

    function onMouseMove(event) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;

        if (!requestId) {
            requestId = requestAnimationFrame(onFrame);
        }
    }

    function onScroll() {
        if (!requestId) {
            requestId = requestAnimationFrame(onFrame);
        }
    }

    function createEye(selector) {
        const element = document.querySelector(selector);

        gsap.set(element, {
            transformOrigin: "center",
        });

        let bbox = element.getBBox();
        let centerX = bbox.x + bbox.width / 2;
        let centerY = bbox.y + bbox.height / 2;

        function updateCenter() {
            bbox = element.getBBox();
            centerX = bbox.x + bbox.width / 2;
            centerY = bbox.y + bbox.height / 2;
        }

        function rotateTo(point) {
            let dx = point.x - centerX;
            let dy = point.y - centerY;

            let angle = Math.atan2(dy, dx);

            gsap.to(element, { duration: 0.3, rotation: angle + "_rad_short" });
        }

        return {
            element,
            rotateTo,
            updateCenter,
        };
    }
}
