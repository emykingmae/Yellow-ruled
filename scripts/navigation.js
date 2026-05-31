(() => {
    const menuButton = document.getElementById("menu-toggle");
    const mobileNav = document.getElementById("mobile-nav");

    const closeMenu = () => {
        if (!menuButton || !mobileNav) return;
        menuButton.setAttribute("aria-expanded", "false");
        mobileNav.classList.remove("is-open");
    };

    if (menuButton && mobileNav) {
        const navLinks = mobileNav.querySelectorAll("a[href]");

        menuButton.addEventListener("click", () => {
            const isOpen = menuButton.getAttribute("aria-expanded") === "true";
            menuButton.setAttribute("aria-expanded", String(!isOpen));
            mobileNav.classList.toggle("is-open", !isOpen);
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                closeMenu();
            });
        });

        document.addEventListener("click", (event) => {
            const target = event.target;
            if (!(target instanceof Node)) return;

            if (!mobileNav.contains(target) && !menuButton.contains(target)) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });
    }

    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll(".site-nav a[href]");

    links.forEach((link) => {
        const href = link.getAttribute("href");
        if (!href) return;

        if (href === currentPage || (currentPage === "" && href === "index.html")) {
            link.classList.add("active");
        }
    });

    const rotatingRole = document.getElementById("rotating-role");
    if (rotatingRole) {
        const rawWords = rotatingRole.getAttribute("data-words") || "";
        const words = rawWords
            .split(",")
            .map((word) => word.trim())
            .filter(Boolean);

        if (words.length > 1) {
            let wordIndex = 0;

            window.setInterval(() => {
                rotatingRole.classList.add("is-fading");

                window.setTimeout(() => {
                    wordIndex = (wordIndex + 1) % words.length;
                    rotatingRole.textContent = words[wordIndex];
                    rotatingRole.classList.remove("is-fading");
                }, 220);
            }, 2000);
        }
    }

})();
