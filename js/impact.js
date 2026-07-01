/* global $, document, IntersectionObserver, setInterval, clearInterval */

function animateStat(targetId, targetValue) {
    let currentValue = 0;
    const $element = $('#' + targetId);

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            observer.unobserve(entry.target);

            const interval = setInterval(function () {
                currentValue += Math.ceil(targetValue / 100);
                if (currentValue >= targetValue) {
                    $element.text(targetValue + '+');
                    clearInterval(interval);
                } else {
                    $element.text(currentValue);
                }
            }, 50);
        });
    }, { threshold: 0.5 });

    const el = document.getElementById(targetId);
    if (el) observer.observe(el);
}

function animateProgressBars() {
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var bar = entry.target;
            bar.style.width = bar.getAttribute('data-width') + '%';
            observer.unobserve(bar);
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.impact-progress-bar').forEach(function (bar) {
        observer.observe(bar);
    });
}

$(document).ready(function () {
    animateStat('stat-1', 14000);
    animateStat('stat-2', 50);
    animateStat('stat-3', 50);
    animateStat('stat-4', 700);
    animateStat('stat-5', 5000);
    animateProgressBars();
});
