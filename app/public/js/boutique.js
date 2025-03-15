/*************  Code d'alerte lorsque le visiteur clique le bouton ajouter au panier**********************/
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.getElementById('cart-alert');
        modal.style.display = 'block';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 2000);
    });
});
document.querySelector('.close-btn').addEventListener('click', () => {
    const modal = document.getElementById('cart-alert');
    modal.style.display = 'none';
});
/**==================================Fin==========================**/
/***********************Ajout de boutique au site******************/
const boutiques = [
    {
        name: "Imobilier",
        image: "Photo/imobilier.jpeg",
        oldPrice: "90 000 FCFA",
        newPrice: "80 000 FCFA",
        shopName: "Maison Imobilier",
        address: "Discutez maintenant",
        link: "Contact_"
    },
    {
        name: " JS PAID ",
        image: "Photo/facture_paie.jpeg",
        oldPrice: "200 FCFA",
        newPrice: "150 FCFA",
        shopName: "Payer toute vos factures à JS",
        address: "Discutez maintenant",
        link: "Facture_paid.html"
    },
    {
        name: "MATIERE PREMIERE",
        image: "Photo/Matiere_premiere.jpeg",
        oldPrice: "2000 FCFA",
        newPrice: "2500 FCFA",
        shopName: "Vente : Fonio * Haricot...",
        address: "Discutez maintenant",
        link: "page_categorie_C.html"
    },
    {
        name: "Légume - E.P.X",
        image: "Photo/shop_legume.jpeg",
        oldPrice: "200 FCFA",
        newPrice: "75 FCFA",
        shopName: "Vente : Combcom * Carotte...",
        address: "Discutez maintenant",
        link: "page_categorie_D.html"
    },
    {
        name: "Recharge Compte",
        image: "Photo/recharge.jpeg",
        oldPrice: "25 FCFA",
        newPrice: "0.01 FCFA",
        shopName: "Recharger vos Portefeuilles",
        address: "Discutez maintenant",
        link: "page_categorie_E.html"
    },
    {
        name: "Vetements",
        image: "Photo/vetement.jpg",
        oldPrice: "2000 FCFA",
        newPrice: "1100 FCFA",
        shopName: "Mode Enfant et Grand",
        address: "Discutez maintenant",
        link: "page_categorie_F.html"
    },
    {
        name: "Montre & Colier",
        image: "Photo/bijoux.jpeg",
        oldPrice: "25 000 FCFA",
        newPrice: "22 000 FCFA",
        shopName: "Disponible en toute catégorie",
        address: "Discutez maintenant",
        link: "page_categorie_G.html"
    },
    {
        name: "Société - Solaire",
        image: "Photo/Kit_solaire.jpg",
        oldPrice: "400 000 FCFA",
        newPrice: "320 000 FCFA",
        shopName: "Choix libre de Kits",
        address: "Discutez maintenant",
        link: "page_categorie_H.html"
    },
    {
        name: "Boisson - Locale",
        image: "Photo/recharge.jpg",
        oldPrice: "8 000 FCFA",
        newPrice: "6500 FCFA ",
        shopName: "Sctok * Boisson",
        address: "Discutez maintenant",
        link: "page_categorie_I.html"
    },
    {
        name: "Tissu - Drap",
        image: "Photo/tissu.jpg",
        oldPrice: "7000 FCFA",
        newPrice: "5000 FCFA",
        shopName: "Tissu & Drap 100% Coton",
        address: "Discutez maintenant",
        link: "page_categorie_J.html"
    },
    {
        name: "Boutique ",
        image: "Photo/drap.jpg",
        oldPrice: "1100€",
        newPrice: "1050€",
        shopName: "Shop ",
        address: "Discutez maintenant",
        link: "page_categorie_K.html"
    },
    {
        name: "Annimaux",
        image: "Photo/animaux.jpg",
        oldPrice: "320 000 FCFA",
        newPrice: "300 000 FCFA",
        shopName: "Maison Pastorale",
        address: "Discutez maintenant",
        link: "page_categorie_L.html"
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

