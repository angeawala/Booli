//load script
document.addEventListener("DOMContentLoaded", function() { let percentage = document.getElementById('percentage'); let content = document.getElementById('content'); let load = 0; 
    let interval = setInterval(() => { if (load < 100) { load++; percentage.innerText = load + '%'; } else { clearInterval(interval); 
   document.getElementById('loader-container').style.display = 'none'; content.style.display = 'block';  }  }, 3); }); 
  document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById('popup-annonce');
    const closeBtn = document.getElementById('popup-close-btn');
    
    // Affichage le pop-up 
    setTimeout(function() {
        popup.style.display = 'flex';
    }, 1000);
    
    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });
    setTimeout(function() {
        popup.style.display = 'none';
    }, 50000); 
    });

    // ___________________histogramme ___________________
    const reviews = [
        { stars: 5, count: 120 },
        { stars: 4, count: 90 },
        { stars: 3, count: 50 },
        { stars: 2, count: 20 },
        { stars: 1, count: 10 }
    ];
    const totalReviews = reviews.reduce((sum, review) => sum + review.count, 0);
    const container = document.querySelector('.histogram');
    container.innerHTML = reviews.map(review => {
        const percentage = (review.count / totalReviews * 100).toFixed(1);
        return `
            <div class="bar1">
                <span class="bar1-label">${review.stars} .00</span>
                <div class="bar1-fill" style="width: ${percentage}%">${percentage}%</div>
                <span class="bar1-count">(${review.count} avis)</span>
            </div>
        `;
    }).join('');