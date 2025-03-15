document.addEventListener('DOMContentLoaded', function() {
    const catalogIcon = document.getElementById('catalog-icon');
    const catalogModal = document.getElementById('catalog-modal');
    const closeButton = document.getElementById('close-button');

    catalogIcon.addEventListener('click', function() {
        catalogModal.style.display = 'block';
    });

    closeButton.addEventListener('click', function() {
        catalogModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === catalogModal) {
            catalogModal.style.display = 'none';
        }
    });
});


