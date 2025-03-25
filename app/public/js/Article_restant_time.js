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



