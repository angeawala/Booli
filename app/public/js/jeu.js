/*************Jeu***************/

let currentModule = 1;
let score = 0;

function validateModule(moduleNumber) {
    // Vérification des réponses
    const questions = document.querySelectorAll(`#module-${moduleNumber} .question input[type="radio"]`);
    questions.forEach(question => {
        if (question.checked && question.value === "correct") {
            score++;
        }
    });

    // Réinitialiser les champs de réponse
    resetAnswers(moduleNumber);
    const moduleElement = document.getElementById(`module-${moduleNumber}`);
    moduleElement.classList.add("boule");

    setTimeout(() => {
        moduleElement.style.display = 'none';
        moduleElement.classList.remove("boule");

        if (moduleNumber < 5) {
            document.getElementById(`module-${moduleNumber + 1}`).style.display = 'block';
        } else {
            document.getElementById('result').style.display = 'block';
            displayFinalMessage();
        }
    }, 500);
}

function resetAnswers(moduleNumber) {
    const questions = document.querySelectorAll(`#module-${moduleNumber} .question input[type="radio"]`);
    questions.forEach(question => {
        question.checked = false;
    });
}

function displayFinalMessage() {
    const scoreElement = document.getElementById('score');
    const messageElement = document.querySelector('.message');

    if (score === 5) {
        scoreElement.innerText = `Votre score est de ${score} sur 5.`;
        messageElement.innerText = 'Félicitations, tu est un géni. Continue par t\'améliorer en jouant d\'autres jeux !';
    } else if (score === 4) {
        scoreElement.innerText = `Votre score est de ${score} sur 5.`;
        messageElement.innerText = 'Bravo ! Tu pourras devenir un géni en te perfectionnant avec d\'autres jeux';
    } else {
        scoreElement.innerText = `Votre score est de ${score} sur 5.`;
        messageElement.innerText = 'Désolé ! Révise les modules pour faire mieux les fois à venir.';
    }
}

function restartGame() {
    score = 0;
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`module-${i}`).style.display = 'none';
        resetAnswers(i);
    }
    document.getElementById('module-1').style.display = 'block';
    // Cacher le résultat
    document.getElementById('result').style.display = 'none';
}
//============================================================================
// bouton page acceuil programmation

const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('.content-section13');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    sections.forEach(section => section.classList.remove('active'));
    
    tab.classList.add('active');
    document.getElementById(tab.getAttribute('data-tab')).classList.add('active');
  });
});