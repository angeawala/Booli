/***********************Ajout de boutique au site******************/
const boutiques = [
    {
        name: "Imobilier",
        image: "Photo/imobilier.jpeg",
        oldPrice: "100€",
        newPrice: "80€",
        shopName: "Boutique de vente de l'imobilier",
        address: "Discutez maintenant",
        link: "index.html"
    },
    {
        name: " JS PAID ",
        image: "Photo/facture_paie.jpeg",
        oldPrice: "200€",
        newPrice: "150€",
        shopName: "Payer toute vos factures à JS",
        address: "Discutez maintenant",
        link: "page_categorie_B.html"
    },
    {
        name: "MATIERE PREMIERE",
        image: "Photo/Matiere_premiere.jpeg",
        oldPrice: "300€",
        newPrice: "250€",
        shopName: "Vente de matiere Premiere",
        address: "Discutez maintenant",
        link: "page_categorie_C.html"
    },
    {
        name: "Boutique D",
        image: "Photo/shop_legume.jpeg",
        oldPrice: "400€",
        newPrice: "350€",
        shopName: "Super marcher des legumes",
        address: "Discutez maintenant",
        link: "page_categorie_D.html"
    },
    {
        name: "Boutique E",
        image: "Photo/recharge.jpeg",
        oldPrice: "500€",
        newPrice: "450€",
        shopName: "Shop E",
        address: "Discutez maintenant",
        link: "page_categorie_E.html"
    },
    {
        name: "Boutique F",
        image: "Photo/vetement.jpg",
        oldPrice: "600€",
        newPrice: "550€",
        shopName: "Shop F",
        address: "Discutez maintenant",
        link: "page_categorie_F.html"
    },
    {
        name: "Boutique G",
        image: "Photo/bijoux.jpeg",
        oldPrice: "700€",
        newPrice: "650€",
        shopName: "Shop G",
        address: "Discutez maintenant",
        link: "page_categorie_G.html"
    },
    {
        name: "Boutique H",
        image: "Photo/Kit_solaire.jpg",
        oldPrice: "800€",
        newPrice: "750€",
        shopName: "Shop H",
        address: "Discutez maintenant",
        link: "page_categorie_H.html"
    },
    {
        name: "Boutique I",
        image: "Photo/recharge.jpg",
        oldPrice: "900€",
        newPrice: "850€",
        shopName: "Shop I",
        address: "Discutez maintenant",
        link: "page_categorie_I.html"
    },
    {
        name: "Boutique J",
        image: "Photo/tissu.jpg",
        oldPrice: "1000€",
        newPrice: "950€",
        shopName: "Shop J",
        address:"Discutez maintenant",
        link: "page_categorie_J.html"
    },
    {
        name: "Boutique K",
        image: "Photo/drap.jpg",
        oldPrice: "1100€",
        newPrice: "1050€",
        shopName: "Shop K",
        address: "Discutez maintenant",
        link: "page_categorie_K.html"
    },
    {
        name: "Boutique L",
        image: "Photo/animaux.jpg",
        oldPrice: "1200€",
        newPrice: "1150€",
        shopName: "Shop L",
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


/*********Affichage du detail des produits**************/
function changeImage(src) {
    document.getElementById('mainImage').src = src;
}

function openTab(evt, tabName) {
    var i, tabcontent, tabbuttons;

    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tabbuttons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].className = tabbuttons[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
// Zoomer sur l'image principale du produit au survol
document.getElementById('mainImage').addEventListener('mouseover', function() {
    this.style.transform = 'scale(1.2)';
    this.style.transition = 'transform 0.5s ease';
});

document.getElementById('mainImage').addEventListener('mouseout', function() {
    this.style.transform = 'scale(1)';
});


//
document.querySelectorAll('input[name="delivery"]').forEach(option => {
    option.addEventListener('change', function() {
        console.log(`Option de livraison sélectionnée: ${this.value}`);
    });
});
document.getElementById('quantity').addEventListener('input', function() {
    let quantity = parseInt(this.value);
    console.log(`Quantité sélectionnée: ${quantity}`);
    // Mettre à jour le prix total selon la quantité sélectionnée
});
 
//Estimation des frais de livraison
document.getElementById('estimateBtn').addEventListener('click', function() {
    let postalCode = document.getElementById('postalCode').value;
    let estimatedCost = 0;
    if (postalCode.startsWith("75")) {
        estimatedCost = 5;
    } else {
        estimatedCost = 10; 
    }

    document.getElementById('estimatedCost').textContent = `Frais de livraison estimés: ${estimatedCost}€`;
});


// Ajout de spinner de chargement lors du changement d'onglet
function openTab(evt, tabName) {
    var i, tabcontent, tabbuttons, spinner;
    spinner = document.getElementById('loading');
    spinner.style.display = 'block';
    setTimeout(function() {
        tabcontent = document.getElementsByClassName("tab-content");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
            tabcontent[i].classList.remove("active");
        }
        tabbuttons = document.getElementsByClassName("tab-button");
        for (i = 0; i < tabbuttons.length; i++) {
            tabbuttons[i].className = tabbuttons[i].className.replace(" active", "");
        }
        document.getElementById(tabName).style.display = "block";
        setTimeout(function() {
            document.getElementById(tabName).classList.add("active");
            spinner.style.display = 'none';
        }, 100);

        evt.currentTarget.className += " active";
    }, 4000);
}

//couleur change
function updateColorPoint() {
    const colorDropdown = document.getElementById('colorDropdown');
    const selectedColor = colorDropdown.value;
    const colorPoint = document.getElementById('colorDropdown');
    
    colorPoint.style.backgroundColor = selectedColor;
    
    colorDropdown.style.backgroundColor = selectedColor;
    colorDropdown.style.color = selectedColor === 'white' || selectedColor === 'yellow' || selectedColor === 'pink' || selectedColor === 'orange' ? 'black' : 'white';
}