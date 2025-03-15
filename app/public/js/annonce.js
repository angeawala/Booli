document.addEventListener('DOMContentLoaded', function() {
    const announcements = [
        "BOOLi 🌍 AFRICAIN",
        "Consulter notre Bibliothèque",
        "Offre d'opportinuté et satge",
        "Explorez nos sites touristiques",
        "Devenez expert ",
        "Découvrez des :",
        "Formations",
        "Services",
        "Et Autres...",
        "Acheter tous en un clic !",
        "Découvrez des experts",
        "Devenez partenaire",
        "Nous vous assistons"
    ];

    let rotate = 0;
    const announcementElement = document.getElementById('announcement');

    function changeAnnouncement() {
        announcementElement.textContent = announcements[rotate];
        rotate = (rotate + 1) % announcements.length;
    }

    setInterval(changeAnnouncement, 2500); 
});

//pop up appel d'offre

document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById('popup-annonce');
    const closeBtn = document.getElementById('popup-close-btn');
    setTimeout(function() {
      popup.style.display = 'flex';
    }, 2000);
    
    closeBtn.addEventListener('click', function() {
      popup.style.display = 'none';
    });
    
    setTimeout(function() {
      popup.style.display = 'none';
    }, 60000);
    });


    //Page d'acceuil index 2

    const textContainer = document.getElementById('textContainer');
    const textElement = document.getElementById('text');
    
    // Liste de textes à afficher
    const messages = [
        "BOOLi un monde d'opportinuité",
        "Découvrez de nouvel arrivage !",
        "Faite accroitre votre visibilité.",
        "Faite confiance à notre communauté !",
        "Nous vous assistons H/H."
    ];

    let index = 0;
    function showText() {
        textContainer.style.display = 'block'; 
        textElement.textContent = messages[index];
        textElement.style.opacity = 1; 
    
        setTimeout(() => {
            textElement.style.opacity = 0; 
            setTimeout(() => {
                index = (index + 1) % messages.length;
                showText();
            }, 1000); 
        }, 4000);
    } window.onload = showText;

    // logo avant chargement
document.addEventListener("DOMContentLoaded", function () {
    const loadingScreen = document.getElementById("loading-screen");
      const content = document.getElementById("content22");
        setTimeout(() => {
           loadingScreen.style.display = "none"; 
              content.style.display = "block"; 
                  }, 900); });

//Chargement acceuil
document.addEventListener("DOMContentLoaded", 
    function() {  setTimeout(function() 
      { document.querySelector('.loader').style.display = 'none'; 
          document.querySelector('.content')
            .classList.remove('hidden'); }, 1500); });

//pop up company
function openPopup(companyName) {
   document.getElementById("popupe-title").innerText = companyName;
      document.getElementById("popupe").style.display = "flex";}

function closePopup() {
    document.getElementById("popupe").style.display = "none";}
    //chat modal
    document.getElementById("chatButton").addEventListener("click", function() {
        document.getElementById("chatModal").classList.remove("hidden");
    });
    
    document.getElementById("closeModal").addEventListener("click", function() {
        document.getElementById("chatModal").classList.add("hidden");
    });

