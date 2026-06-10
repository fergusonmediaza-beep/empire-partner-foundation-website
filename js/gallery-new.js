/* global bootstrap, document */

document.addEventListener('DOMContentLoaded', function () {
    var modalImage = document.getElementById('modalImage');
    var modalCaption = document.getElementById('modalCaption');
    var modalElement = document.getElementById('imageModal');
    var imageModal = new bootstrap.Modal(modalElement);

    function openPhoto(src, caption) {
        modalImage.src = src;
        if (modalCaption) modalCaption.textContent = caption || '';
        imageModal.show();
    }

    document.querySelectorAll('.photo-card').forEach(function (card) {
        card.addEventListener('click', function () {
            var src = card.dataset.src;
            var captionEl = card.querySelector('.photo-caption-text');
            var caption = captionEl ? captionEl.textContent : '';
            openPhoto(src, caption);
        });

        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
});
