document.addEventListener('DOMContentLoaded', function() {
    var countdownButton = document.getElementById('next');
    var countdown = 100;
    var interval = setInterval(function() {
        countdown--;
        countdownButton.innerText = "Continuer (" + countdown + ")";
        if (countdown === 0) {
            clearInterval(interval);
            redirectNow();
        }
    }, 1000);
   countdownButton.disabled = false;
    countdownButton.addEventListener('click', function() {
        clearInterval(interval);
        redirectNow();
    });
});
function redirectNow() {
    window.location.href = 'index_2.html';
}