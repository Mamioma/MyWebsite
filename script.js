document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".link");
    const submenuItems = document.querySelectorAll(".sublink");
    const dropdownMenus = document.querySelectorAll(".dropdown-menu");
    let autoScrollTimeout;
    let dropdownMenuCount = 0;

    menuItems.forEach(function (menuItem) {
        menuItem.addEventListener("mouseenter", function () {
            dropdownMenus.forEach(function (dropdownMenu) {
                dropdownMenu.style.display = "block";
                dropdownMenu.style.opacity = "1";
                dropdownMenu.style.maxHeight = "200px";
            });
        });
        
        dropdownMenus.forEach(function (dropdownMenu) {
            dropdownMenu.addEventListener("mouseenter", function () {
                dropdownMenu.style.display = "block";
                dropdownMenuCount++;
            });

            dropdownMenu.addEventListener("mouseleave", function () {
                autoScrollTimeout = setTimeout(function () {
                    dropdownMenuCount--;
                    if (dropdownMenuCount == 0) {
                        dropdownMenus.forEach(function (dropdownMenu) {
                            dropdownMenu.style.display = "none";
                        });
                    }
                }, 1000);
            });
        });

        submenuItems.forEach(function (submenuItem) {
            submenuItem.addEventListener("click", function (event) {
                event.preventDefault();

                const targetId = this.getAttribute("data-target");
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    // Open the details tag if it's not already open
                    console.log("enter");
                    const detailsTag = targetSection.closest("details");
                    if (detailsTag && !detailsTag.opem) {
                        detailsTag.open = true;
                    }
                    targetSection.scrollIntoView({ behavior: "smooth" });
                }
            });
        });
    });

});