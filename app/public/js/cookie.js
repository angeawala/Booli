   // Affiche le pop-up en bas de la page
   function showPopup() {
    const popup = document.getElementById("newsletterPopup");
    popup.style.display = "block"; 
    setTimeout(() => {
      popup.style.bottom = "20px"; 
    }, 5000); 
    setTimeout(closePopup, 50000); 
  }
  function closePopup() {
    const popup = document.getElementById("newsletterPopup");
    popup.style.bottom = "-200px"; 
    setTimeout(() => {
      popup.style.display = "none";
    }, 500);
  }
  function subscribeNewsletter() {
    alert("Merci pour votre souscription à notre newsletter !");
    closePopup();
  }
  window.onload = function() {
    showPopup();
  };
  