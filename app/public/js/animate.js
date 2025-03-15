/**************SCRIPT DE LA PAGE COMMANDE ********************/
document.getElementById("tracking-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const orderNumber = document.getElementById("order-number").value;
    if (orderNumber !== "") {
        document.getElementById("order-status").classList.remove("hidden");

        let progress = 0;
        let progressElement = document.getElementById("progress");

        const steps = [document.getElementById("step-1"), document.getElementById("step-2"), document.getElementById("step-3"), document.getElementById("step-4")];
        
        let interval = setInterval(() => {
            progress += 1;
            progressElement.style.width = progress + "%";

            steps[Math.floor(progress / 1) - 1].classList.add("active-step");

            if (progress === 100) {
                clearInterval(interval);
                alert("Votre commande a été livrée !");
            }
        }, 2000);  
    }
});

