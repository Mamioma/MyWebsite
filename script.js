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
                    if (detailsTag && !detailsTag.open) {
                        detailsTag.open = true;
                    }
                    targetSection.scrollIntoView({ behavior: "smooth" });
                }

                const children = targetSection.children;

                for (let i = 0; i < children.length; i++) {
                    if (children[i].tagName.toLowerCase() === 'details') {
                        children[i].open = true;
                        break;
                    }
                }

                const sibiling = targetSection.nextElementSibling;
                if (sibiling.tagName.toLowerCase() === 'details') {
                    sibiling.open = true;
                }

            });
        });
    });

    let myLink = document.getElementById("MyName");
    let enterCount = 0;
    myLink.addEventListener("mouseenter", function() {
        console.log("enter");
        if (enterCount == 0) {
            const textColor = "#64ffda";
            const textContent = "Oh! You find my Linkedin!!";
            myLink.innerHTML = `<a href="https://www.linkedin.com/in/mamioma" style="color: ${textColor};">${textContent}</a>`;
            enterCount++;
        }
    });

    myLink.addEventListener("mouseleave", function () {
        console.log("leave");
        if (enterCount == 1) {
            const textColor = "#CCD6F6";
            const textContent = "Mingyong Ma";
            myLink.innerHTML = `<strong style="color: ${textColor};">${textContent}</strong>`;
            enterCount--;
        }
    });

    fetch('https://api.ipgeolocation.io/ipgeo?apiKey=e0b306fb6ba74ec5b98a668ec24fd667')
        .then(response => response.json())
        .then(data => {
            console.log('Your location is ' + data.city + ', ' + data.state_prov + ', ' + data.country_name);
            // Here you can handle the location data and display different content based on it
            // For example:
            const country = data.country_name;

            if (country === 'United States') {
                window.location.href = '/US.html';
            } else if (country === 'China') {
                window.location.href = '/China.html';
            } else {
                window.location.href = "/Nothing.html";
            }
        })
        .catch(console.error);

});