/* global bootstrap, document */

document.addEventListener('DOMContentLoaded', function () {
    const modalImage = document.getElementById('modalImage');
    if (!modalImage) return;

    const modalCaption = document.getElementById('modalCaption');
    const modalElement = document.getElementById('imageModal');
    const imageModal = new bootstrap.Modal(modalElement);

    function openPhoto(src, caption) {
        modalImage.src = src;
        if (modalCaption) modalCaption.textContent = caption || '';
        imageModal.show();
    }

    document.querySelectorAll('.photo-card').forEach(function (card) {
        card.addEventListener('click', function () {
            const src = card.dataset.src;
            const captionEl = card.querySelector('.photo-caption-text');
            const caption = captionEl ? captionEl.textContent : '';
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
