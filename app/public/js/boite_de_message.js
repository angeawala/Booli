  // Afficher la boîte de message 

  setTimeout(function() {
    document.getElementById('messageBox').classList.add('show');
    
    setTimeout(function() {
      document.getElementById('messageBox').style.display = 'none';
    }, 40000); 
    
  }, 3000);
         document.getElementById('cancelButton').addEventListener('click', function() {
           document.getElementById('messageBox').style.display = 'none';
  });

  document.getElementById('readButton').addEventListener('click', function() {
    window.location.href = 'librairy_detail.html'; 
  });

  //Decompte bouton chate acceuil
  const form = document.getElementById('contactForm');
  const button = form.querySelector('button');

  form.addEventListener('submit', (event) => {
      event.preventDefault();
      button.classList.add('submitting');

      setTimeout(() => {
          button.classList.remove('submitting');
          form.reset();
      }, 2000);
  });
  //responsive
  window.addEventListener('resize', () => {
    console.log(`Largeur de l'écran: ${window.innerWidth}px`);
  });

