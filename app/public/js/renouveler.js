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

    // Faire tourner le module et le transformer en boule
    const moduleElement = document.getElementById(`module-${moduleNumber}`);
    moduleElement.classList.add("boule");

    setTimeout(() => {
        // Masquer le module actuel et réinitialiser sa transformation
        moduleElement.style.display = 'none';
        moduleElement.classList.remove("boule");

        // Afficher le module suivant ou le résultat final
        if (moduleNumber < 5) {
            document.getElementById(`module-${moduleNumber + 1}`).style.display = 'block';
        } else {
            document.getElementById('result').style.display = 'block';
            displayFinalMessage();
        }
    }, 500); // Attendre la fin de l'animation de rotation avant de passer au module suivant
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
        messageElement.innerText = 'Félicitations, tu es exceptionnel !';
    } else if (score === 4) {
        scoreElement.innerText = `Votre score est de ${score} sur 5.`;
        messageElement.innerText = 'Tu es bon !';
    } else {
        scoreElement.innerText = `Votre score est de ${score} sur 5.`;
        messageElement.innerText = 'Révise les modules pour faire mieux les fois à venir.';
    }
}

function restartGame() {
    // Réinitialiser le score
    score = 0;

    // Réinitialiser les modules
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`module-${i}`).style.display = 'none';
        resetAnswers(i);
    }
    document.getElementById('module-1').style.display = 'block';

    // Cacher le résultat
    document.getElementById('result').style.display = 'none';
}