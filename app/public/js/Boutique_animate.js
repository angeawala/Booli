
  /*=============== text change boutique acceuil ===============*/

  const textContainer = document.getElementById('textContainer');
  const textElement = document.getElementById('text');
  const messages = [
      "SOYEZ LA BIENVENU À BOOLi.",
      "Créer un compte maintenant !",
      "En qualiter de :",
      "Entreprise.",
      "ONG/PME.",
      "Institution.",
      "Agence.",
      "Hotel/Restaurant.",
      "Fournisseur/Fabriquant.",
      "Marchand.",
      "Boutique.",
      "Revendeur.",
      "Artisant.",
      "Agriculteur.",
      "Spiculteur.",
      "Expert/Formateur.",
      "Qu'attendez-vous ?",
      "Apporter votre savoir faire au monde."
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
      }, 2000); 
  } window.onload = showText;