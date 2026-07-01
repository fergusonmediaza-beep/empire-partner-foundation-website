/* global $, document, IntersectionObserver, setInterval, clearInterval */

var STAT_DURATION = 2000;
var STAT_STEPS = 60;

function animateStat(targetId, targetValue) {
    var currentValue = 0;
    var $element = $('#' + targetId);
    var increment = targetValue / STAT_STEPS;
    var delay = STAT_DURATION / STAT_STEPS;

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            observer.unobserve(entry.target);

            var interval = setInterval(function () {
                currentValue += increment;
                if (currentValue >= targetValue) {
                    $element.text(targetValue + '+');
                    clearInterval(interval);
                } else {
                    $element.text(Math.floor(currentValue));
                }
            }, delay);
        });
    }, { threshold: 0.5 });

    var el = document.getElementById(targetId);
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
