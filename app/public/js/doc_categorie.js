document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector('.categorie-btn');
    const menu = document.querySelector('.categorie-menu');
    let isClicked = false;

    btn.addEventListener('mouseenter', () => {
        menu.style.display = 'block';
    });

    menu.addEventListener('mouseenter', () => {
        menu.style.display = 'block';
    });

    menu.addEventListener('mouseleave', () => {
        if (!isClicked) {
            menu.style.display = 'none';
        }
    });

    btn.addEventListener('mouseleave', () => {
        if (!isClicked) {
            setTimeout(() => {
                if (!menu.matches(':hover')) {
                    menu.style.display = 'none';
                }
            }, 300);
        }
    });

    document.querySelectorAll('.filter').forEach(filter => {
        filter.addEventListener('click', (event) => {
            event.preventDefault();
            isClicked = true;
        });
    });

    document.addEventListener('click', (event) => {
        if (!menu.contains(event.target) && !btn.contains(event.target)) {
            menu.style.display = 'none';
            isClicked = false;
        }
    });
});