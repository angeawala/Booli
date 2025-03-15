document.addEventListener("DOMContentLoaded", function () {
    const bubbleContainer = document.querySelector(".bubble-container");

    function createBubbles() {
        for (let i = 0; i < 4; i++) {  // Ajuster ce nombre pour plus ou moins de bulles
            const bubble = document.createElement("div");
            bubble.classList.add("bubble");

            // Taille aléatoire des bulles
            const size = Math.random() * 60 + 20; // Entre 20px et 80px
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;

            // Position aléatoire sur l'axe X
            bubble.style.left = `${Math.random() * 100}%`;

            // Durée et délai d'animation aléatoires
            const duration = Math.random() * 5 + 5; // Entre 5s et 10s
            const delay = Math.random() * 10; // Jusqu'à 3s de délai
            bubble.style.animationDuration = `${duration}s`;
            bubble.style.animationDelay = `${delay}s`;

            // Ajouter la bulle au conteneur
            bubbleContainer.appendChild(bubble);

            // Supprimer la bulle à la fin de son animation pour libérer de la mémoire
            bubble.addEventListener('animationend', () => {
                bubble.remove();
            });
        }
    }

    // Recréer les bulles après chaque cycle
    setInterval(createBubbles, 4000); // Recréer toutes les 4 secondes

    createBubbles();

    // Animations des autres éléments
    gsap.from(".animate-link", {
        opacity: 0,
        y: -20,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
        delay: 0.5
    });

    gsap.fromTo(".animate-zoom", {
        scale: 1
    }, {
        scale: 1.1,
        yoyo: true,
        repeat: -1,
        duration: 1.5,
        ease: "power1.inOut"
    });

    gsap.to(".animate-rotate", {
        rotation: 360,
        duration: 5,
        repeat: -1,
        ease: "linear"
    });
});