//Temps des articles restant
document.addEventListener('DOMContentLoaded', (event) => {
    const minuteurs = document.querySelectorAll('.minuteur');

    minuteurs.forEach(minuteur => {
        let tempsDecompte = parseInt(minuteur.getAttribute('data-time'));

        let intervalDecompte = setInterval(() => {
            let heures = Math.floor(tempsDecompte / 3600);
            let minutes = Math.floor((tempsDecompte % 3600) / 60);
            let secondes = tempsDecompte % 60;

            heures = heures < 10 ? '0' + heures : heures;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            secondes = secondes < 10 ? '0' + secondes : secondes;

            minuteur.innerHTML = `${heures}:${minutes}:${secondes}`;

            tempsDecompte--;

            if (tempsDecompte < 0) {
                clearInterval(intervalDecompte);
                minuteur.innerHTML = "00:00:00";
            }
        }, 1000);
    });
});

// Fixed####barre de recherche
const moteur = document.getElementById("moteur");
const header = document.getElementById("header");
const sous = document.getElementById("sous");
const offsetTop = moteur.offsetTop;
window.addEventListener("scroll", () => {
  if (window.scrollY > offsetTop) {
    moteur.style.position = "fixed";
    moteur.style.top = "0";
    moteur.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
    header.style.display = "none";
    sous.style.display = "none";
  } else {
    moteur.style.position = "relative";
    moteur.style.boxShadow = "none";
    header.style.display = "block";
    sous.style.display = "block";
  }
});

