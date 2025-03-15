// Toggle dropdown filter menu
document.querySelector('.filter-btn').addEventListener('click', function(event) {
    document.querySelector('.filter-menu').classList.toggle('show');
    document.querySelector('.sort-menu').classList.remove('show');
    event.stopPropagation();
});
document.querySelector('.sort-btn').addEventListener('click', function(event) {
    document.querySelector('.sort-menu').classList.toggle('show');
    document.querySelector('.filter-menu').classList.remove('show');
    event.stopPropagation();
});
document.addEventListener('click', function(event) {
    if (!event.target.matches('.filter-btn') && !event.target.matches('.sort-btn')) {
        document.querySelector('.filter-menu').classList.remove('show');
        document.querySelector('.sort-menu').classList.remove('show');
    }
});

/*********************************MENU DES LIENS DE LA BIBLIOTHEQUE DU PANNEAU D'AFFICHAGE DES LIENS*********************************/
document.addEventListener('DOMContentLoaded', function() {
    const sideMenu = document.getElementById('side-menu');
    const menuToggleBtn = document.getElementById('menu-toggle');

    function showMenu() {
        sideMenu.classList.add('show-menu');
        menuToggleBtn.classList.add('menu-visible');
    }

    // Fonction pour masquer le menu
    function hideMenu() {
        sideMenu.classList.remove('show-menu');
        menuToggleBtn.classList.remove('menu-visible');
    }
    setTimeout(showMenu, 1000);
    setTimeout(hideMenu, 5000);
    menuToggleBtn.addEventListener('click', function() {
        sideMenu.classList.toggle('show-menu');
        menuToggleBtn.classList.toggle('menu-visible');
    });
});
