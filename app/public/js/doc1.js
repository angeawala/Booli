//Education***-
document.addEventListener("DOMContentLoaded", () => {
    const statistics = [
      { id: "abonne", target: 7085654, unit: "K" },
      { id: "Jeunes", target: 5098215, unit: "K" },
      { id: "Adolescents", target: 21254, unit: "M" },
    ];
  
    statistics.forEach(({ id, target }) => {
      const countElement = document.getElementById(id);
      let currentCount = 0;
  
      const incrementSpeed = 100;
      const incrementStep = Math.ceil(target / 100); 
  
      const counterInterval = setInterval(() => {
        currentCount += incrementStep;
  
        if (currentCount >= target) {
          currentCount = target; 
          clearInterval(counterInterval);
        }
  
        countElement.textContent = currentCount.toLocaleString();
      }, incrementSpeed);
    });
  });
/*********************================//////////////////*/
function openModal(imageSrc, description, documentUrl) {
    document.getElementById('modalImage').src = imageSrc;
    document.getElementById('modalDescription').innerText = description;
    document.getElementById('downloadLink').href = documentUrl;
    document.getElementById('documentModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('documentModal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == document.getElementById('documentModal')) {
        closeModal();
    }
}

