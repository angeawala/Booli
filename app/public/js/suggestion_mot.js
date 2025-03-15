   // Liste des produits et services
   const items = [
    "Accessoires", "Appareils photo", "Bijoux", "Chaussures",
    "Électronique", "Formation", "Jouets", "Livres", "Documents",
    "Meubles", "Ordinateurs", "Téléphones", "Vêtements"
  ];
  function showSuggestions(query) {
    const suggestionslistBox = document.getElementById('suggestionslist');
    suggestionslistBox.innerHTML = ''; 

    if (query) {
      const filteredItems = items
        .filter(item => item.toLowerCase().startsWith(query.toLowerCase()))
        .sort()
        .slice(0, 6); 
      filteredItems.forEach(item => {
        const div = document.createElement('div');
        div.className = '.suggestionslist';
        div.textContent = item;
        div.onclick = () => selectSuggestion(item);
        suggestionslistBox.appendChild(div);
      });
    }
  }
  function selectSuggestionlist(value) {
    document.querySelector('.search-input').value = value;
    document.getElementById('suggestionslist').innerHTML = ''; 
  }
  