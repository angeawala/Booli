/***********************Ajout de boutique au site******************/
const boutiques = [
    {
        name: "Agences Locales",
        image: "Photo/assurance.jpg",
        oldPrice: "1 000 FCF",
        newPrice: "1 500 FCF",
        shopName: "Service Assurance +",
        address: "Contactez maintenant",
        link: "agence.html"
    },
    {
        name: "Services Affiliation",
        image: "Photo/recharge.jpeg",
        shopName: "BOOLi-STORE_AFF ",
        address: "Discutez maintenant",
        link: "agence.html"
    },
    {
        name: " Nos Abonnements ",
        image: "Photo/facture_paie.jpeg",
        shopName: "Services d'Abonnement",
        address: "Contactez maintenant",
        link: "agence.html"
    },
    {
        name: "Entreprises Spécialisés",
        image: "Photo/entreprise.jpg",
        shopName: "Expert en Consultation...",
        address: "Discutez maintenant",
        link: "agence.html"
    },

    {
        name: "Entités Africaine",
        image: "Photo/entité.jpg",
        oldPrice: "2000 FCFA",
        newPrice: "1100 FCFA",
        shopName: "Mode Enfant et Grand",
        address: "Discutez maintenant",
         link: "agence.html"
    },
    {
        name: "Energie Solaire",
        image: "Photo/solar.jpg",
        shopName: "Société solaire",
        address: "Contactez maintenant",
        link: "agence.html"
    },
    {
        name: "MATIERE PREMIERE",
        image: "Photo/mat-pre.jpg",
        oldPrice: "2000 FCFA",
        newPrice: "2500 FCFA",
        shopName: "Vente : Fonio * Haricot...",
        address: "Contactez maintenant",
       link: "agence.html"
    },
    {
        name: "Annimaux",
        image: "Photo/animaux.jpg",
        oldPrice: "320 000 FCFA",
        newPrice: "300 000 FCFA",
        shopName: "Maison Pastorale",
        address: "Discutez maintenant",
        link: "agence.html"
    },

    {
        name: "Montre & Colier",
        image: "Photo/bijoux.jpeg",
        oldPrice: "25 000 FCFA",
        newPrice: "22 000 FCFA",
        shopName: "Disponible en toute catégorie",
        address: "Discutez maintenant",
        link: "agence.html"
    },
    {
        name: "Boisson - Locale",
        image: "Photo/recharge.jpg",
        oldPrice: "8 000 FCFA",
        newPrice: "6500 FCFA ",
        shopName: "Sctok * Boisson",
        address: "Discutez maintenant",
        link: "agence.html"
    },
    {
        name: "Tissu - Drap",
        image: "Photo/tissu.jpg",
        oldPrice: "7000 FCFA",
        newPrice: "5000 FCFA",
        shopName: "Tissu & Drap 100% Coton",
        address: "Discutez maintenant",
         link: "agence.html"
    },
    {
        name: "Boutique ",
        image: "Photo/drap.jpg",
        oldPrice: "1100€",
        newPrice: "1050€",
        shopName: "Shop ",
        address: "Discutez maintenant",
        link: "agence.html"
    }

];

const boutiqueContainer = document.querySelector('.boutiques');

boutiques.forEach(boutique => {
    const boutiqueElement = document.createElement('a');
    boutiqueElement.classList.add('boutique');
    boutiqueElement.href = boutique.link;

    boutiqueElement.innerHTML = `
        <img src="${boutique.image}" alt="${boutique.name}">
        <div class="boutique-info">
            <h2>${boutique.name}</h2>
            <p class="shop-name">${boutique.shopName}</p>
            <p>${boutique.address}</p>
            <p class="price">
                <span class="old-price">${boutique.oldPrice}</span>
                <span class="actual-price">${boutique.newPrice}</span>
            </p>
        </div>
    `;
    boutiqueContainer.appendChild(boutiqueElement);
});
// Zoomer sur l'image principale du produit au survol
document.getElementById('mainImage').addEventListener('mouseover', function() {
    this.style.transform = 'scale(1.1)';
    this.style.transition = 'transform 0.5s ease';
});
document.getElementById('mainImage').addEventListener('mouseout', function() {
    this.style.transform = 'scale(1)';
});
//couleur change produit/article
function updateColorPoint() {
    const colorDropdown = document.getElementById('colorDropdown');
    const selectedColor = colorDropdown.value;
    const colorPoint = document.getElementById('colorDropdown');
    colorPoint.style.backgroundColor = selectedColor;
    colorDropdown.style.backgroundColor = selectedColor;
    colorDropdown.style.color = selectedColor === 'white' || selectedColor === 'yellow' || selectedColor === 'pink' || selectedColor === 'orange' ? 'black' : 'white';
}