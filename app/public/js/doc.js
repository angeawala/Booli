/*=======function openModal(title, description, imageSrc) {======================================*/
  document.addEventListener('DOMContentLoaded', function() {
                let cards = document.querySelectorAll('.card');
                let currentIndex = 0;
                let delay = 800; 
                let interval = 8000; 
                let timeout;
            
                // Fonction pour afficher les cartes une par une
                function showCards() {
                    if (currentIndex < cards.length) {
                        cards[currentIndex].style.display = 'block';
                        timeout = setTimeout(function() {
                            cards[currentIndex].style.display = 'none';
                            currentIndex++;
                            showCards();
                        }, interval);
                    } else {
                        // Tout est terminé, afficher le contenu principal
                        document.getElementById('cards-container').style.display = 'none';
                        document.getElementById('page-content').style.display = 'block';
                    }
                }
                setTimeout(showCards, delay);
                let annulerButtons = document.querySelectorAll('.annuler');
                annulerButtons.forEach(function(button) {
                    button.addEventListener('click', function() {
                        clearTimeout(timeout);
                        document.getElementById('cards-container').style.display = 'none';
                        document.getElementById('page-content').style.display = 'block';
                    });
                });
            });
            
/*==========================================================================================*/

function openModal(imageSrc, description, documentUrl) {
    document.getElementById('modalImage').src = imageSrc;
    document.getElementById('modalDescription').innerText = description;
    document.getElementById('downloadLink').href = documentUrl;
    document.getElementById('documentModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('documentModal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == document.getElementById('documentModal')) {
        closeModal();
    }
}

//Script de chargement de la page
document.addEventListener("DOMContentLoaded", function() { 
    let percentage = document.getElementById('percentage'); 
    let content = document.getElementById('content');  
    let load = 0;   
    let interval = setInterval(() => { if (load < 100) {  
        load++;  percentage.innerText = load + '%'; 
    } 
    else {  
        clearInterval(interval);   
        document.getElementById('loader-container')
        .style.display = 'none'; 
         content.style.display = 'block';  } }, 3); 
});
///suggest header
document.addEventListener("DOMContentLoaded", () => {
    const phrases = [
    "⏳ Bibliothèque numérique : Etudier simplement avec une connexion Internet !",
      "🌟 Livraison gratuite sur toutes les commandes d'au moins 4 livres !",
      "🎉 Profitez des soldes jusqu'à -70% sur une sélection de livres !",
      "📦 Nouveaux Livres ajoutés chaque semaine !",
    ];
  
    const rotatingElement = document.getElementById("rotating-phrases");
    let index = 0;
    function rotatePhrases() {
      rotatingElement.textContent = phrases[index];
      index = (index + 1) % phrases.length;
    }
    rotatePhrases();
    setInterval(rotatePhrases, 4000);
  });
  