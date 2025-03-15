//script du menu de la biblioth'que
const menu = document.getElementById('menu');
const togo = document.getElementById('togo');
menu.addEventListener('click', () => {
    if (togo.style.display === 'none') {
        togo.style.display = 'block';
    } else {
        togo.style.display = 'none';
    }
});

//**************************************
function showMenu() {
document.getElementById('togo').style.display = 'block';
}
function hideMenu() {
document.getElementById('togo').style.display = 'none';
}
setTimeout(() => {
showMenu();
setTimeout(hideMenu, 10000);
}, 1000);

