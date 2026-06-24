/* global $, document, IntersectionObserver */

function initSectorExpand() {
    const cards = document.querySelectorAll('.sector-card');
    cards.forEach(function (card) {
        card.addEventListener('click', function () {
            const thesis = card.querySelector('.sector-thesis');
            const icon = card.querySelector('.sector-expand-icon');
            if (!thesis) return;
            thesis.classList.toggle('is-open');
            if (icon) icon.classList.toggle('is-rotated');
        });
    });
}

function initAnniversaryFadeIn() {
    const caption = document.querySelector('.anniversary-caption');
    if (!caption) return;

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                caption.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25 });

    observer.observe(caption);
}

function initTabs() {
    const tabs = document.querySelectorAll('.epf-tab');
    if (!tabs.length) return;

    const panels = document.querySelectorAll('.tab-panel');
    const description = document.getElementById('tab-description');

    const tabDescriptions = {
        infrastructure: "Discover EPF's focus areas: Water Management & Conservation, Energy & Sustainability, Affordable Housing & Smart Infrastructure, and Public Safety & Security. EPF provides smart, technology-driven solutions to enhance efficiency, safety, and sustainability in these critical areas.",
        'human-centered': "Explore EPF's focus sectors: Transportation & Mobility Solutions, Healthcare Access & Innovation, Education & Digital Learning, and Agriculture & Food Security. EPF delivers technology-driven solutions that improve efficiency, enhance experiences, and support sustainable growth across these critical areas.",
        integration: "EPF's focus sectors include Unemployment & Workforce Development, Rural Development & Connectivity, Smart City Integration, and Digital Transformation Initiatives. We provide technology-driven programs and solutions that foster skills, support sustainable communities, and enable integrated, innovative urban and rural development."
    };

    const allowedTabs = Object.keys(tabDescriptions);

    function switchTab(tabId) {
        if (!allowedTabs.includes(tabId)) return;

        tabs.forEach(function (tab) {
            const active = tab.dataset.tab === tabId;
            tab.classList.toggle('active', active);
            tab.setAttribute('aria-selected', active ? 'true' : 'false');
            tab.setAttribute('tabindex', active ? '0' : '-1');
        });

        panels.forEach(function (panel) {
            panel.classList.remove('active');
        });

        const activePanel = document.getElementById(tabId);
        if (activePanel) activePanel.classList.add('active');

        if (description && Object.prototype.hasOwnProperty.call(tabDescriptions, tabId)) {
            description.textContent = tabDescriptions[tabId];
        }
    }

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            switchTab(tab.dataset.tab);
        });
    });
}

$(document).ready(function () {
    initSectorExpand();
    initAnniversaryFadeIn();
    initTabs();
});
