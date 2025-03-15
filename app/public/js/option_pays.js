document.addEventListener('DOMContentLoaded', function() {
    const select = document.getElementById('country-select');
    const defaultFlag = 'https://flagcdn.com/unknown.svg'; 

    function updateFlag() {
        const selectedOption = select.options[select.selectedIndex];
        const flagUrl = selectedOption.getAttribute('data-flag');
        select.style.backgroundImage = `url('https://flagcdn.com/${flagUrl}.svg')`;
    }
    updateFlag();
    select.addEventListener('change', updateFlag);
});

 //Chargement pop up pub et l'index
 document.addEventListener("DOMContentLoaded", function() { 
    const popup = document.getElementById('popup-annonce');
    setTimeout(function() { 
        popup.style.display = 'block'; 
}, 2000); 
setTimeout(function() { 
    popup.style.display = 'none'; }, 
10000); 

   setTimeout(function () {  
    document.getElementById('loading').style.display = 'none'; 
    document.getElementById('form-container')
    .style.display = 'block'; }, 
500);
});

 //Chargement pop up pub et l'index
 document.addEventListener("DOMContentLoaded", function() { 
    const popup = document.getElementById('popupe');
    setTimeout(function() { 
        popup.style.display = 'block'; 
}, 3000); 
setTimeout(function() { 
    popup.style.display = 'none'; }, 
31000); 

});
function closePopup() {
    document.getElementById("popupe").style.display = "none";
}
//********************* annonce#section
setTimeout(() => {
    const sectionContainer_j = document.getElementById('section-container_j');
    sectionContainer_j.style.bottom = '0';
    let blinkCount = 0;

    const blinkInterval = setInterval(() => {
        sectionContainer_j.style.opacity = sectionContainer_j.style.opacity === '1' ? '0' : '1';
        blinkCount++;
        if (blinkCount >= 6) {
            clearInterval(blinkInterval);
            sectionContainer_j.style.opacity = '1';
        }
    }, 400);
    setTimeout(() => {
        sectionContainer_j.style.bottom = '-200px';
    }, 36000);
}, 9000);

function closeSection() {
    const sectionContainer_j = document.getElementById('section-container_j');
    sectionContainer_j.style.bottom = '-200px';
}
// index script section endessous du header
const backgrounds = document.querySelectorAll('.backgroundf');
let currentIndex = 0;
function changeBackground() {
  backgrounds.forEach((bg, index) => {
    bg.classList.remove('visible');
  });
  backgrounds[currentIndex].classList.add('visible');
  currentIndex = (currentIndex + 1) % backgrounds.length;
}
setInterval(changeBackground, 4000);
changeBackground();

//btn scroll index retour en haut
const scrollTopBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        scrollTopBtn.style.display = "flex";
    } else {
        scrollTopBtn.style.display = "none";
    }
});
scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
/***********===================Remerciement-phrase-clignotant-sur-la-page=================*/
const texts = [
    { text: "BOOLi-STORE vous remerci pour votre fidélité !", color: "red" },
    { text: "Profitez de nos offres spéciales !", color: "green" },
    { text: "Explorez nos nouveaux produits !", color: "blue" },
    { text: "Inscrivez-vous pour ne plus ratter d'opportinuité !", color: "orange" },
    { text: "N'hésitez pas à nous contacter si vous rencontrez de difficulté ", color: "beige" }
];

function changeText() {
    const blinkingTextElement = document.getElementById('blinking-text');
    blinkingTextElement.style.opacity = 0; 

    setTimeout(() => {
        blinkingTextElement.innerText = texts[currentIndex].text;
        blinkingTextElement.style.color = texts[currentIndex].color;
        blinkingTextElement.style.opacity = 1; 
    }, 500);
}
setInterval(changeText, 5000);
changeText();
//modal appel d'offre
function openModal(offerId) {
    var modal = document.getElementById(offerId);
    modal.style.display = "flex";
}
function closeModal(offerId) {
    var modal = document.getElementById(offerId);
    modal.style.display = "none";
}
window.onclick = function(event) {
    var modals = document.querySelectorAll('.modal');
    modals.forEach(function(modal) {
        if (event.target == modal) {
            modal.style.display = "none";
        }});}