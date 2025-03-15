//liste des pays dans un select...
document.addEventListener("DOMContentLoaded", function() {
    // URL de l'API REST Countries pour récupérer les pays en français
    const apiUrl = "https://restcountries.com/v3.1/all?fields=name,translations,cca2";

    // Fonction pour récupérer la liste des pays
    function fetchCountries() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                let countryList = data
                    .map(country => ({
                        code: country.cca2,
                        name: country.translations.fra.common || country.name.common
                    }))
                    .sort((a, b) => a.name.localeCompare(b.name)); // Trier par ordre alphabétique
                populateCountryDropdown(countryList);
            })
            .catch(error => console.error('Erreur:', error));
    }

    // Fonction pour peupler le menu déroulant avec les pays
    function populateCountryDropdown(countries) {
        const countrySelect = document.getElementById('country');
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.code;
            option.textContent = country.name; 
            countrySelect.appendChild(option);
        });
    }

    // Appeler la fonction fetchCountries lorsque la page est chargée
    fetchCountries();
});


/*function togglePassword() {
    const passwordField = document.getElementById('password');
    const toggleIcon = document.querySelector('.toggle-password i');
    const isPasswordVisible = passwordField.type === 'text';
  
    passwordField.type = isPasswordVisible ? 'password' : 'text';
    toggleIcon.classList.toggle('fa fa-eye', isPasswordVisible);
    toggleIcon.classList.toggle('fa fa-eye-slash', !isPasswordVisible);
}
*/

function togglePassword(fieldId, toggleIcon) {
    const passwordField = document.getElementById(fieldId);
    const isPasswordVisible = passwordField.type === 'text';
  
    passwordField.type = isPasswordVisible ? 'password' : 'text';
    toggleIcon.querySelector('i').classList.toggle('fa-eye', isPasswordVisible);
    toggleIcon.querySelector('i').classList.toggle('fa-eye-slash', !isPasswordVisible);
  }
  
/* ============================ Ask ============================*/
document.getElementById('loginForm').addEventListener('submit', function(event) {
event.preventDefault();
const email = document.getElementById('email').value;
const password1 = document.getElementById('password1').value;
const password2 = document.getElementById('password2').value;

if (password1 !== password2) {
    alert('Les mots de passe ne correspondent pas');
    return;
}

// Envoyer les données au serveur pour authentification
fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: password1 }),
})
.then(response => {
    if (response.ok) {
    // Authentification réussie
    // Rediriger ou afficher un message de succès
    console.log('Login successful');
    } else {
    // Afficher un message d'erreur
    console.log('Login failed');
    }
});
});


/*document.addEventListener('DOMContentLoaded', function() {
    var toggleIcon = document.querySelector('.toggle-icon');
    var toggleText = document.querySelector('.toggle-text');

    toggleIcon.addEventListener('click', function() {
        if (toggleText.style.display == 'none' || toggleText.style.display == '') {
            toggleText.style.display = 'block';
        } else {
            toggleText.style.display = 'none';
        }
    });
});*/

function info() {
    var toggleIcon = document.querySelector('.toggle-icon');
    var toggleText = document.querySelector('.toggle-text');
    if (toggleText.style.display == 'none' || toggleText.style.display == '') {
        toggleText.style.display = 'block';
        } 
    else {
        toggleText.style.display = 'none';
    }
}
//affiche searchbar filtres specialiste work
function toggleSearchBar(id) {
    const bar = document.getElementById(id);
    if (bar.classList.contains('open')) {
        bar.classList.remove('open');
    } else {
        bar.classList.add('open');
    }
}

