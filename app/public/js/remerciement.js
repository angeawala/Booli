 //scrol style
 document.addEventListener("DOMContentLoaded", function() {
    let section = document.querySelector(".search-bar-container");
    let sectionTop = section.offsetTop;
    let lastScrollTop = 0;

    window.addEventListener("scroll", function() {
        let scrollTop = window.scrollY;

        if (scrollTop > lastScrollTop && scrollTop >= sectionTop) {
            // Scroll vers le bas : fixer la section
            section.classList.add("fixed");
        } else if (scrollTop < lastScrollTop) {
            // Scroll vers le haut : retirer la classe fixe
            section.classList.remove("fixed");
        }

        lastScrollTop = scrollTop;
    });
});
