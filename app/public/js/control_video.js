const video = document.getElementById('myVideo');

function toggleVideo() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// Cacher la barre de contrôle en masquant les événements au survol
video.addEventListener('mouseover', function() {
    video.controls = false; // S'assurer que les contrôles ne s'affichent pas
});

video.addEventListener('mouseleave', function() {
    video.controls = false; // Assurez-vous qu'ils restent masqués
});