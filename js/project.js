export function projectHover() {
    document.addEventListener("DOMContentLoaded", function () {
        const workItems = document.querySelectorAll(".work-item");
        const work = document.querySelector(".work");
        const overlay = document.querySelector(".overlay");
        const prevElements = document.querySelectorAll(".prev");

        // Initialize overlay position
        overlay.style.top = "0%";
        overlay.style.left = "13.25%";
        document.querySelector("#prev-2").classList.add("active");

        // Function to remove the 'active' class from all prev elements
        function removeActiveClass() {
            prevElements.forEach(function (prev) {
                prev.classList.remove("active");
            });
        }

        // Function to remove all background color classes
        function removeAllBgColorClasses() {
            work.classList.remove("bg-color-one", "bg-color-two", "bg-color-three", "bg-color-four");
        }

        workItems.forEach((item, index) => {
            item.addEventListener("mousemove", function () {
                removeActiveClass();
                removeAllBgColorClasses(); // Ensure no background color class is present

                const activePrev = document.querySelector("#prev-" + (index + 1));
                if (activePrev) {
                    activePrev.classList.add("active");
                }

                work.classList.add("hovered");

                switch (index) {
                    case 0:
                        overlay.style.top = "50%";
                        overlay.style.left = "50%";
                        work.classList.add("bg-color-one");
                        break;
                    case 1:
                        overlay.style.top = "0%";
                        overlay.style.left = "13.25%";
                        work.classList.add("bg-color-two");
                        break;
                    case 2:
                        overlay.style.top = "-40%";
                        overlay.style.left = "-13.5%";
                        work.classList.add("bg-color-three");
                        break;
                    case 3:
                        overlay.style.top = "-80%";
                        overlay.style.left = "-38.5%";
                        work.classList.add("bg-color-four");
                        break;
                }
            });

            item.addEventListener("mouseout", function () {
                work.classList.remove("hovered");
                removeAllBgColorClasses(); // Reset to no background color class
                work.classList.add("bg-color-initial"); // Assuming you have a default bg color class
                overlay.style.top = "0%";
                overlay.style.left = "13.25%";
                removeActiveClass();
                document.querySelector("#prev-2").classList.add("active");
            });
        });
    });
}
