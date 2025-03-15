//Suggestion de question 
const faqs = {
    "BOOLi-STORE booli-store ?": "Plateforme B2B africaine de commercialisation et de l'innovation. Nous sommes la lumière en Afrique ''1X",
    "Qu'est ce que Booli-Store ? ": "Nous acceptons les paiements par carte bancaire et PayPal.",
    "comment créer un compte ?": "Cliquez sur 'Connexion' ou 'Connecter' en vous inscrivant avec une adresse e-mail et un mot de passe.",
    "comment creer un compte ?": "Cliquez sur 'Connexion' ou 'Connecter' en vous inscrivant avec une adresse e-mail et un mot de passe.",
    "comment m'inscrire sur la plateforme ?": "Cliquez sur 'Connexion' ou 'Connecter' en vous inscrivant avec une adresse e-mail et un mot de passe.",
    "comment faire un abonnement a la bibliothèque ?": "Pour faire un abonnement recheccher le livre de votre choix et voyez s'il est gratuit ou non si il est payant cliquer sur 'Faire un abonnement' et a suivez les intructions ou acheter le document en version numérique ou papier.",
    "comptes ": "Pour créer votre compte, rendez-vous sur la page d'inscription cliquez sur créer un compte et suivez les instructions.",
    " Comment supprimer mon compte ?": "Pour supprimer votre compte veillez contactez notre service client pour traiter votre demande dans un bref delais.",
    " supprimer compte ": "Pour supprimer votre compte veillez contactez notre service client pour traiter votre demande dans un bref delais.",
    " comment supprimer mon compte ?": "Pour supprimer votre compte veillez contactez notre service client pour traiter votre demande dans un bref delais.",
    "comment réintialiser mon mot de passe ?": "Vous pouvez réinitialiser votre mot de passe en cliquant sur 'Mot de passe oublié' et réintialiser votre mot de passe à partir de votre numéro de téléphone ou votre adresse e-mail.",
    "comment reintialiser mon mot de passe ?": "Vous pouvez réinitialiser votre mot de passe en cliquant sur 'Mot de passe oublié' et réintialiser votre mot de passe à partir de votre numéro de téléphone ou votre adresse e-mail.",
    "reintialiser mot passe ": "Vous pouvez réinitialiser votre mot de passe en cliquant sur 'Mot de passe oublié' et réintialiser votre mot de passe à partir de votre numéro de téléphone ou votre adresse e-mail.",
    "réintialiser mot de passe 're' ": "Vous pouvez réinitialiser votre mot de passe en cliquant sur 'Mot de passe oublié' et réintialiser votre mot de passe à partir de votre numéro de téléphone ou votre adresse e-mail.",
    " Quel paiement accepter vous ?": "Carte bancaire, PayPal, virement bancaire, portefeuille électronique, et certaines crypto-monnaies.",
    " quel type de paiement accepter vous ?": "Carte bancaire, PayPal, virement bancaire, portefeuille électronique, et certaines crypto-monnaies.",
    " paiement accepter ": "Nous acceptons les paiements par carte bancaire et PayPal.",
    " quel paiement vous accepter ?": "Carte bancaire, PayPal, virement bancaire, portefeuille électronique, et certaines crypto-monnaies.",
    " quel sont vos délais de livraison ?": "Les délais de livraison varient entre 3 et 5 jours ouvrés.",
    " quel sont les délais de livraison ? ": "Les délais de livraison varient entre 3 et 5 jours ouvrés.",
    " delais livraison": "Dépendent du vendeur, du mode d’expédition et de votre pays (5 à 30 jours).",
    " peut-on retourner un produit ?": "Vous pouvez retourner un produit sous 14 jours après réception.",
    " peut-on retourner un produit ?": "Vous pouvez retourner un produit sous 14 jours après réception.",
    " retour et remboursement ?": "Vous pouvez retourner un produit sous 14 jours après réception.",
    "service client": "Notre service client est disponible 24/7 pour répondre à vos questions.",
    "comment contacter le service client ?": "Notre service client est disponible 24/7 pour répondre à vos questions.",
    "Comment contacter le service client ?": "Notre service client est disponible 24/7 pour répondre à vos questions.",
    "suivi commande": "Vous pouvez suivre votre commande dans votre espace personnel.",
    "comment suivre ma commande ?": "Vous pouvez suivre votre commande dans votre espace personnel.",
    "Comment suivre ma commande ?": "Vous pouvez suivre votre commande dans votre espace personnel.",
    "annulation commande": "Une commande peut être annulée avant son expédition.",
    "comment annuler ma commande ?": "Une commande peut être annulée avant son expédition .",
    "quel est votre politique de confidentialité ": "Pour voir comment nous protégeons vos données et votre vie privée, aller sur le site et consultulter la 'Politique de Confidentialité'.",
    "annulation commande": "Une commande peut être annulée avant son expédition.",
    "puis-je annuler ma commande commande ": "Une commande peut être annulée avant son expédition .",
    "réduction ": "Nous proposons régulièrement des réductions et codes promo.",
    "que faire si je reçois un produit endommagé ?": "Contactez le vendeur et ouvrez un litige pour un remboursement ou un remplacement.",
    "les produits sont-ils authentiques ?": "Certains vendeurs vendent des produits de marque, d’autres des alternatives. Vérifiez bien la fiche produit.",
    "puis-je demander des échantillons avant de passer une grosse commande ?": "Oui, de nombreux vendeurs proposent des échantillons.",
    "puis-je personnaliser un produit ?": "Oui, certains vendeurs proposent des options de personnalisation.",
    "quels sont les délais pour demander un retour ?": "Généralement sous 7 à 40 jours après réception",
    "qui prend en charge les frais de retour ?": "Cela dépend du vendeur et du motif du retour.",
    "comment suivre le remboursement d’un retour ?": "Consultez votre historique de commande ou contactez le service client..",
    "que faire si le vendeur refuse mon remboursement ?": "Ouvrez un litige via la plateforme pour une médiation.",
    "comment faire si le vendeur refuse mon remboursement ?": "Ouvrez un litige via la plateforme pour une médiation.",
    "que faire si je suis victime d’une arnaque ?": "Contactez le support BOOLi-STORE et ouvrez un litige.",
    "comment faire si je suis victime d’une arnaque ?": "Contactez le support BOOLi-STORE et ouvrez un litige.",
    "puis-je signaler un vendeur suspect ?": "Oui, via le bouton 'Signaler' sur la page du vendeur.",
    "quels sont les signes d’une arnaque ?": "Prix trop bas, vendeur sans avis, demande de paiement en dehors de la plateforme.",
    "puis-je changer mon adresse e-mail associée à mon compte ?": "Oui, dans les paramètres du compte et fautes toutes vos opérations.",
    "puis-je créer un compte professionnel ?": "Oui, en choisissant l’option 'Compte entreprise' lors de l’inscription.",
    "qu’est-ce que le 'Assurance' ?": "Un service qui protège les acheteurs contre les fraudes et garantit les livraisons.",
    "puis-je devenir un revendeur sur BOOLi-STORE": "Oui, en créant un compte vendeur.",
    "comment puis-je être informé des promotions ?": "En s’abonnant aux newsletters d’Alibaba.",
    "comment trouver un fournisseur fiable ?": "Vérifiez les avis, les certifications et privilégiez les vendeurs Gold Supplier.",
    "Puis-je contacter un vendeur avant d’acheter ?": "Oui, via la messagerie intégré.",
    "comment savoir si un produit est en stock ?": "Consultez la fiche produit ou contactez le vendeur.",
    "comment voir les avis des autres acheteurs ?": "Votre facture est disponible dans votre espace client.",
    "pourquoi mon numéro de suivi ne fonctionne-t-il pas ?": "Il peut prendre quelques jours avant d’être activé par le transporteur.",
    "Puis-je refuser un colis à la livraison ?": "Oui, mais vous devrez peut-être payer les frais de retour.",
    "quels articles ne sont pas remboursables ?": "Produits personnalisés, téléchargements numériques et certains produits d’hygiène.",
    "comment éviter les fraudes ?": "Ne payez jamais en dehors de la plateforme et vérifiez les avis des vendeurs.",
    "Comment changer mon mot de passe ?": "Via l’option 'Paramètres du compte'.",
    "comment activer l’authentification à deux facteurs ?": "Via les paramètres de sécurité du compte.",
    "comment vérifier la qualité d’un produit avant l’achat ?": "ls sont affichés sous chaque fiche produit.",
    "que signifie 'Expédition en attente' sur ma commande ?": "Cela signifie que le vendeur prépare votre commande avant l’expédition.",
    "puis-je regrouper plusieurs commandes en un seul colis ?": "Certains vendeurs proposent cette option.",
    "puis-je modifier mon adresse de livraison après la commande ?": "Seulement si la commande n’a pas encore été expédiée.",
    "que faire si ma commande est en retard ?": "Contactez le vendeur ou vérifiez les mises à jour du suivi.",
    "dois-je payer des frais de douane ?": "Oui, si votre pays applique des taxes d’importation.",
    "comment savoir si mon pays est éligible à la livraison ?": "Vérifiez dans les options d’expédition sur la fiche produit.",
    "puis-je suivre ma commande en temps réel ?": "Oui, grâce au numéro de suivi fourni après l’expédition.",
    "quels sont les modes d’expédition disponibles ?": "Standard, express, fret aérien, fret maritime.",
    "quel est le délai de remboursement après une annulation ?": "Généralement sous 3 à 7 jours ouvrables.",
    "puis-je annuler ma commande après le paiement ?": "Oui, tant que le vendeur ne l’a pas encore expédiée.",
    "pourquoi mon paiement a-t-il été refusé ?": "Vérifiez votre solde, les restrictions bancaires et assurez-vous d’avoir saisi les bonnes informations.",
    "comment appliquer un code promo sur ma commande ?": "Saisissez le code promo au moment du paiement dans le champ dédié.",
    "quels sont les frais supplémentaires à prévoir ?": "TVA, frais de douane, frais de livraison et éventuelles commissions bancaires.",
    "comment obtenir une facture après l’achat ?": "Vous pouvez télécharger votre facture dans votre compte sous l’onglet 'Mes Commandes'.",
    "est-il possible de négocier les prix ?": "Oui, certains vendeurs permettent la négociation sur les grosses commandes.",
    "comment passer une commande ?": "Ajoutez les articles au panier, validez votre commande et suivez les instructions de paiement.",
    "produits disponibles produit": "Nos stocks sont mis à jour en temps réel sur le site.",
    "Que vendez vous ": "Nous proposons une large gamme de produits séletifs allant des céréales africains aux électromenagers.",
    "produits disponibles produit": "Nous proposons une large gamme de produits séletifs allant des céréales africains aux électromenagers.",
    "que vendez vous ?": "Nous proposons une large gamme de produits séletifs allant des céréales africains aux électromenagers.",
    " Quel service offrez vous ?": "+ 300K d'opportinutés pour tous. Nous proposons de meilleurs opportinutés en afrique.",
    " quel service offrez vous ?": "+ 300K d'opportinutés pour tous. Nous proposons de meilleurs opportinutés en afrique.",
    "comment effectuer une réservation ?": "Choisissez une compagnie, le service ou le produit souhaité, sélectionnez la date et l’heure (si applicable), puis suivez les instructions pour confirmer votre réservation.",
    "puis-je annuler ou modifier ma réservation ?": "Vous recevrez un e-mail de confirmation. Vous pouvez aussi vérifier le statut de votre réservation dans votre compte.",
    "comment savoir si ma réservation est confirmée ?": "Tous nos produits bénéficient d'une garantie de 2 ans.",
    "y a-t-il des frais d'annulation ?": "Cela dépend des conditions de réservation. Certains services peuvent appliquer des frais en cas d'annulation tardive.",
    "quels sont les types d'abonnements disponibles ?": "Nous proposons plusieurs abonnements avec différents niveaux d’accès et avantages. Consultez la page 'Abonnements' pour plus de détails.",
    "comment souscrire à un abonnement ?": "Choisissez l’abonnement souhaité, cliquez sur 'S’abonner' et suivez les instructions de paiement.",
    "puis-je résilier mon abonnement à tout moment ?": "Oui, vous pouvez annuler votre abonnement à tout moment depuis votre compte. Selon l’offre, l’accès peut rester actif jusqu'à la fin de la période en cours.",
    "comment renouveler mon abonnement ?": "Le renouvellement peut être automatique ou manuel selon l’option choisie lors de la souscription. Vous pouvez aussi le renouveler dans votre espace 'Mon abonnement'.",
    "le paiement est-il sécurisé ?": "Oui, tous les paiements sont protégés par des protocoles de sécurité avancés (SSL, 3D Secure, etc.).",
    "comment obtenir une facture ?": "Une facture est envoyée par e-mail après chaque paiement et reste disponible dans votre compte sous 'Historique des paiements'.",
    "puis-je utiliser mon compte sur plusieurs appareils ?": "Oui, votre compte est accessible depuis n'importe quel appareil connecté à Internet.",
    "comment protéger mon compte contre le piratage ?": "Utilisez un mot de passe fort, activez l'authentification à deux facteurs (si disponible) et évitez de partager vos informations de connexion.",
    "puis-je avoir plusieurs comptes ?": "Non, chaque utilisateur est autorisé à avoir un seul compte, sauf mention contraire dans les conditions d'utilisation.",
    "puis-je réserver pour une autre personne ?": "Oui, vous pouvez entrer les coordonnées de la personne bénéficiaire lors de la réservation.",
    "que se passe-t-il si je ne me présente pas à ma réservation ?": "Selon les conditions, vous pourriez perdre votre réservation sans remboursement ou être facturé pour l'absence.",
    "comment reprogrammer une réservation ?": "Vous pouvez modifier la date et l'heure depuis votre compte, sous réserve de disponibilité.",
    "que se passe-t-il si mon paiement échoue pour un abonnement ?": "Un nouvel essai de prélèvement sera effectué. Si le paiement échoue plusieurs fois, votre abonnement peut être suspendu.",
    "Puis-je changer mon abonnement en cours de route ?": "Oui, vous pouvez passer à une offre supérieure ou inférieure selon vos besoins.",
    "puis-je enregistrer ma carte bancaire pour les futurs paiements ?": "Oui, vous pouvez enregistrer vos informations de paiement en toute sécurité pour un paiement plus rapide.",
    "garanties": "Tous nos produits bénéficient d'une garantie de 2 ans.",
    "avez vous des  garanties ?": "Tous nos produits bénéficient d'une garantie de 2 ans.",
    "quels sont vos garanties  garanties ?": "Tous nos produits bénéficient d'une garantie de 2 ans. ",
    "support technique": "Contactez notre support pour toute assistance technique.",
    "support": "Contactez notre support pour toute assistance technique.",
    "partenariat": "Nous sommes ouverts aux partenariats avec d'autres entreprises.",
    "qui peut vendre à booli-store ?": "Nos vendeurs partenaires sont vérifiés et certifiés. ",
    "vendeurs v": "Nos vendeurs partenaires sont vérifiés et certifiés.",
    "Qui peut vendre a BOOLi-SRORE": "Nos vendeurs partenaires sont vérifiés et certifiés.",
    "avis clients": "Vous pouvez consulter les avis clients sur chaque fiche produit.",
    "programme fidélité ": "Rejoignez notre programme pour cumuler des points et bénéficier d'avantages.",
    "produits éco-responsables": "Nous proposons une sélection de produits respectueux de l'environnement.",
    "carte cadeau": "Nos cartes cadeaux sont disponibles à l'achat en ligne.",
    "service montage": "Nous proposons un service de montage pour certains produits.",
    "service après-vente apres": "Notre SAV est joignable en cas de problème avec un produit.",
    "quels sont vos services après-vente apres ?": "Notre SAV est joignable en cas de problème avec un produit.",
    "quel sont vos services après-vente apres ?": "Notre SAV est joignable en cas de problème avec un produit.",
    "Quel service après-vente apres ?": "Notre SAV est joignable en cas de problème avec un produit.",
    "paiement en plusieurs fois": "Nous proposons le paiement en 3 ou 4 fois sans frais.",
    "Qui peut créer un compte entreprise ?": "Des professionnelles, des boutiques physiques, des centres de formations, des centres industriels, des agences, en générales toutes entités ayant quelques choses à mettre à la porter du monde.",
    "compte entreprise": "Nous proposons des solutions pour les professionnels et entreprises.",
    "Comment créer un  compte entreprise": "A la deuxième page d'acceuil apres avoir cliquer sur le bouton 'Suivant'  apres chargement de la page a gauche plus haut cliquer sur le bouton 'Démarrer un Business' et remplissez les informations requises.",
    "comment créer un  compte entreprise": "A la deuxième page d'acceuil apres avoir cliquer sur le bouton 'Suivant'  apres chargement de la page a gauche plus haut cliquer sur le bouton 'Démarrer un Business' et remplissez les informations requises.",
    "Comment créer une boutique": "A la deuxième page d'acceuil apres avoir cliquer sur le bouton 'Suivant'  apres chargement de la page a gauche plus haut cliquer sur le bouton 'Démarrer un Business' et remplissez les informations requises.",
    "Comment créer un  compte blog": "A la deuxième page d'acceuil apres avoir cliquer sur le bouton 'Suivant'  apres chargement de la page a gauche plus haut cliquer sur le bouton 'Démarrer un Business' et remplissez les informations requises.",
    "comment créer une boutique": "A la deuxième page d'acceuil apres avoir cliquer sur le bouton 'Suivant'  apres chargement de la page a gauche plus haut cliquer sur le bouton 'Démarrer un Business' et remplissez les informations requises.",
    "Comment créer un  compte entreprise": "A la deuxième page d'acceuil apres avoir cliquer sur le bouton 'Suivant'  apres chargement de la page a gauche plus haut cliquer sur le bouton 'Démarrer un Business' et remplissez les informations requises.",
    "Comment créer une Boutique ": "A la deuxième page d'acceuil apres avoir cliquer sur le bouton 'Suivant'  apres chargement de la page a gauche plus haut cliquer sur le bouton 'Démarrer un Business' et remplissez les informations requises.",
    "délais de remboursement 'de'": "Les remboursements sont effectués sous 5 à 10 jours ouvrés.",
    "comparaison produits":  "Utilisez notre outil de comparaison pour choisir le bon produit.",
    "réparation  ": "Nous offrons un service de réparation pour certains produits.",
    "reparation  ": "Nous offrons un service de réparation pour certains produits.",
    "Booli-STORE.worls est-il un site sécurisé ? ?": "Oui, toutes les transactions sont protégées par un système de sécurité avancé.",
    "les paiements sont sécurisés ": "Toutes les transactions sont sécurisées et cryptées.",
    "securite paiement": "Toutes les transactions sont sécurisées et cryptées.",
    "newsletter": "Inscrivez-vous à notre newsletter pour recevoir nos offres.",
    "comment faire une reservation ?": "Pour vos services de reservation, allaer sur la plateforme cliquer sur reservation ou recherhcer reservation et suiver les instructions pour reserver votre biellet.",
    "reservation biellet de voyage": "Pour vos services de reservation, allaer sur la plateforme cliquer sur reservation ou recherhcer reservation et suiver les instructions pour reserver votre biellet.",
    "boutiques partenaires": "Découvrez nos boutiques partenaires sur le site.",
    "livraison internationale": "Nous livrons dans plusieurs pays à travers le monde.",
    "faites vous des livraisons internationale": "Nous livrons dans plusieurs pays à travers le monde.",
    "tarifs de livraison": "Les frais de livraison varient selon la destination et le poids.",
    "point relais": "Vous pouvez choisir une livraison en point relais.",
    "paiement à la livraison probleme livraison a": "Nous proposons parfois le paiement à la livraison selon les régions.",
    "mode d'emploi": "Les manuels d'utilisation sont téléchargeables sur nos fiches produits.",
    "validation commande": "Un email de confirmation vous est envoyé après validation.",
    "problème technique probleme technique": "Si vous rencontrez un problème, contactez notre support.",
    "meilleures ventes": "Découvrez nos produits les plus populaires dans la section Best-sellers.",
    "Pourquoi certains vendeurs n'affichent-ils pas de prix ? ": "Parce que le prix dépend de la quantité et de la négociation.",
    "quels sont les nouveautés ": "Restez à jour avec nos dernières nouveautés.",
    "quel sont les nouveautés ": "Restez à jour avec nos dernières nouveautés.",
    "questions fréquentes": "Consultez notre FAQ pour plus d'informations.",
    "réservations  reservation": "Vous pouvez réserver certains articles avant leur sortie officielle.",
    "alertes stock": "Activez les alertes stock pour être informé du retour d'un produit.",
    "service personnalisé": "Nous proposons des conseils personnalisés selon vos besoins."
};
const searchInput = document.getElementById("search");
const suggestionsBox = document.getElementById("suggestions");
function levenshteinDistance(a, b) {
const matrix = Array.from({ length: a.length + 1 }, (_, i) => Array(b.length + 1).fill(i));

for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

for (let i = 1; i <= a.length; i++) {
for (let j = 1; j <= b.length; j++) {
    const cost = a[i - 1] === b[j - 1] ? 0 : 1;
    matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
    );
}
}
return matrix[a.length][b.length];
}
function findBestMatch(query, options) {
let bestMatch = null;
let minDistance = Infinity;

options.forEach(option => {
let distance = levenshteinDistance(query.toLowerCase(), option.toLowerCase());
if (distance < minDistance) {
    minDistance = distance;
    bestMatch = option;
}
});

return minDistance <= 3 ? bestMatch : null; 
}

searchInput.addEventListener("input", function () {
let query = this.value.toLowerCase().trim();
suggestionsBox.innerHTML = "";
suggestionsBox.style.display = "none";

if (query.length === 0) return;

if (/[^a-zA-ZÀ-ÿ\s]/.test(query)) {
suggestionsBox.innerHTML = "<div>Tapez un mot clé ou reformulez votre demande</div>";
suggestionsBox.style.display = "block";
return;
}

let matches = Object.keys(faqs).filter(key => key.toLowerCase().includes(query));

if (matches.length > 0) {
suggestionsBox.style.display = "block";
matches.forEach(match => {
    let div = document.createElement("div");
    div.textContent = match;
    div.addEventListener("click", function () {
        searchInput.value = match;
        redirectToResultPage(match);
    });
    suggestionsBox.appendChild(div);
});
}
});

searchInput.addEventListener("keypress", function (event) {
if (event.key === "Enter") {
event.preventDefault();
let query = this.value.trim();
let matches = Object.keys(faqs).filter(key => key.toLowerCase().includes(query));

if (matches.length > 0) {
    query = matches[0]; 
} else {
    let bestMatch = findBestMatch(query, Object.keys(faqs));
    if (bestMatch) {
        query = bestMatch; 
    }
}

redirectToResultPage(query);
}
});
// animation section
function redirectToResultPage(query) {
let response = faqs[query] || "Je suis toujours en entraînement afin de mieux répondre à vos préoccupations. Merci de bien vouloir reformuler votre demande.";
window.location.href = `chat2.html?query=${encodeURIComponent(query)}&response=${encodeURIComponent(response)}`;
}
document.addEventListener("DOMContentLoaded", function () {
    let items = document.querySelectorAll('.faq-phrase');
    let index = 0;

    function showNextFAQ() {
        items.forEach(item => item.style.display = 'none');
        items[index].style.display = 'block';
        index = (index + 1) % items.length;
    }

    showNextFAQ();
    setInterval(showNextFAQ, 10000);
});