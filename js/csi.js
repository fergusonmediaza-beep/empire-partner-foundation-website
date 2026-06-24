/* global $, document, setInterval, clearInterval */

function animateStat(targetId, targetValue) {
    let currentValue = 0;
    const $element = $('#' + targetId);

    const interval = setInterval(function () {
        currentValue += Math.ceil(targetValue / 100);
        if (currentValue >= targetValue) {
            $element.text(targetValue + '+');
            clearInterval(interval);
        } else {
            $element.text(currentValue);
        }
    }, 50);
}

function searchArticles() {
    const query = $('#searchInput').val().toLowerCase().trim();
    let hasResults = false;

    $('.article-item').each(function () {
        const title = $(this).data('title').toLowerCase();
        const desc = $(this).data('description').toLowerCase();
        const date = $(this).data('date').toLowerCase();

        if (query === '' || title.includes(query) || desc.includes(query) || date.includes(query)) {
            $(this).show();
            hasResults = true;
        } else {
            $(this).hide();
        }
    });

    if (hasResults || query === '') {
        $('#noResults').addClass('d-none');
    } else {
        $('#noResults').removeClass('d-none');
    }
}

$(document).ready(function () {
    animateStat('stat-1', 12000);
    animateStat('stat-2', 40);
    animateStat('stat-3', 17);
    animateStat('stat-4', 400);

    $('#searchBtn').on('click', searchArticles);
    $('#searchInput').on('keypress', function (e) {
        if (e.which === 13) searchArticles();
    });
    $('#searchInput').on('input', searchArticles);
});
