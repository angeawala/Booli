//Defilement des publicités sur le grand panneau

let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide img');
const dots = document.querySelectorAll('.dot');
function showSlides() {
    slides.forEach((slide, index) => {
        slide.style.display = 'none';
    });
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = 'block';
    dots.forEach((dot, index) => {
        dot.className = dot.className.replace(' active', '');
    });
    dots[slideIndex - 1].className += ' active';
    setTimeout(showSlides, 4500);
}
function currentSlide(n) {
    slideIndex = n;
    showSlides();
}
function nextSlide() {
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    showSlides();
}

function prevSlide() {
    slideIndex--;
    if (slideIndex < 1) {
        slideIndex = slides.length;
    }
    showSlides();
}

document.addEventListener('DOMContentLoaded', showSlides);
 function updateSlides(index) {
        track.style.transform = `translateX(-${index * 100}%)`;
    }
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlides(currentIndex);
    });
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlides(currentIndex);
    });

/********camera search#bar********/

document.getElementById('camera-icon').addEventListener('click', function() {
    document.getElementById('camera-input').click();
});

document.getElementById('camera-input').addEventListener('change', function(event) {
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var imageData = e.target.result;
            console.log('Image Data:', imageData);
        };
        reader.readAsDataURL(file);
    }
});
 