
$(document).ready(function () {

  function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Mobile Menu Toggle
  $('#mobile_toggle').on('click', function () {
    $('#nav_list').toggleClass('active');
    $(this).text($('#nav_list').hasClass('active') ? '✕' : '☰');
  });

  // About Section Effects
  $('.rounded-image-container img').on('load', function () {
    $(this).css('opacity', '1');
  });

  setTimeout(() => $('.content-card').addClass('loaded'), 100);

  $(window).on('scroll', function () {
    const endTrigger = $(document).height() - $(window).height() - 300;
    if ($(this).scrollTop() > endTrigger) {
      $('#about_section').css('transform', 'translateY(-100%)');
    } else {
      $('#about_section').css('transform', 'translateY(0)');
    }

    // Back to Top Logic
    if ($(this).scrollTop() > 300) {
      $('#backToTop').addClass('active');
    } else {
      $('#backToTop').removeClass('active');
    }
  });

  $('#backToTop').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600);
  });

  // Responsive Cards Scroll Row
  function handleCardLayout() {
    const $row = $('.cards-row');
    if (window.matchMedia('(max-width: 767px)').matches) {
      $row.addClass('scrollable-row');
    } else {
      $row.removeClass('scrollable-row');
    }
  }

  handleCardLayout();
  $(window).on('resize', handleCardLayout);

  // Video Sync
  const mainVideo = $('#main-video')[0];
  const $frameVideos = $('.frame video');

  function syncVideos() {
    const currentTime = mainVideo.currentTime;
    $frameVideos.each(function () {
      if (Math.abs(this.currentTime - currentTime) > 0.1) {
        this.currentTime = currentTime;
      }
    });
  }

  $frameVideos.each(function () {
    $(this).on('play', () => {
      this.currentTime = mainVideo.currentTime;
    });
  });

  setInterval(syncVideos, 1000);

  $(document).on('visibilitychange', function () {
    if (document.hidden) {
      $frameVideos.each(function () { this.pause(); });
      mainVideo.pause();
    }
  });

  // Contact Form
  const $contactForm = $('#contactForm');
  const $successMessage = $('#success_message');
  const $errorMessage = $('#error_message');

  $contactForm.on('submit', function (e) {
    e.preventDefault();

    $('.input-error').removeClass('input-error');
    $('.error-text').hide();
    $errorMessage.hide();

    const name = $('#name').val().trim();
    const email = $('#email').val().trim();
    const subject = $('#subject').val().trim();
    const message = $('#message').val().trim();

    let isValid = true;

    if (!name) {
      $('#name').addClass('input-error');
      $('#name_error').show();
      isValid = false;
    }

    if (!email || !isValidEmail(email)) {
      $('#email').addClass('input-error');
      $('#email_error').show();
      isValid = false;
    }

    if (!subject) {
      $('#subject').addClass('input-error');
      $('#subjectError').show();
      isValid = false;
    }

    if (!message) {
      $('#message').addClass('input-error');
      $('#message_error').show();
      isValid = false;
    }

    if (isValid) {
      setTimeout(() => {
        $contactForm[0].reset();
        $successMessage.show();
        setTimeout(() => $successMessage.hide(), 5000);
      }, 1000);
    } else {
      $errorMessage.show();
    }
  });

  // Gallery Filtering
  const $gallery = $('#gallery');
  const $categoryButtons = $('.category-btn');
  const $lightbox = $('#lightbox');
  const $lightboxImg = $lightbox.find('img');
  const $lightboxCaption = $lightbox.find('.lightbox-caption');
  const $closeLightbox = $lightbox.find('.close-lightbox');
  const $galleryItems = $('.gallery-item');

  $categoryButtons.on('click', function () {
    const category = $(this).data('category');
    $categoryButtons.removeClass('active');
    $(this).addClass('active');

    $gallery.addClass('fade');

    setTimeout(() => {
      $galleryItems.each(function () {
        const $item = $(this);
        if ($item.data('category') === category) {
          $item.show();
        } else {
          $item.hide();
        }
      });
      $gallery.removeClass('fade');
    }, 500);
  });

  $categoryButtons.first().click(); // Show default category

  $galleryItems.on('click', function () {
    const imgSrc = $(this).find('img').attr('src');
    const caption = $(this).find('.item-caption').text();
    $lightboxImg.attr('src', imgSrc);
    $lightboxCaption.text(caption);
    $lightbox.addClass('active');
  });

  $closeLightbox.on('click', () => $lightbox.removeClass('active'));
  $lightbox.on('click', function (e) {
    if (e.target === this) $lightbox.removeClass('active');
  });

});


  document.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.epf-tab');
    const panels = document.querySelectorAll('.tab-panel');
    const description = document.getElementById('tab-description');

    const tabDescriptions = {
        infrastructure: "Discover EPF's focus areas: Water Management & Conservation, Energy & Sustainability, Affordable Housing & Smart Infrastructure, and Public Safety & Security. EPF provides smart, technology-driven solutions to enhance efficiency, safety, and sustainability in these critical areas.",

        "human-centered": "Explore EPF's focus sectors: Transportation & Mobility Solutions, Healthcare Access & Innovation, Education & Digital Learning, and Agriculture & Food Security. EPF delivers technology-driven solutions that improve efficiency, enhance experiences, and support sustainable growth across these critical areas.",

        integration: "EPF's focus sectors include Unemployment & Workforce Development, Rural Development & Connectivity, Smart City Integration, and Digital Transformation Initiatives. We provide technology-driven programs and solutions that foster skills, support sustainable communities, and enable integrated, innovative urban and rural development."
    };

    const allowedTabs = Object.keys(tabDescriptions);

    function initSectorExpand() {
        var cards = document.querySelectorAll('.sector-card');
        cards.forEach(function(card) {
            card.addEventListener('click', function() {
                var thesis = card.querySelector('.sector-thesis');
                var icon = card.querySelector('.sector-expand-icon');
                if (!thesis) return;
                thesis.classList.toggle('is-open');
                if (icon) icon.classList.toggle('is-rotated');
            });
        });
    }

    initSectorExpand();

    function initAnniversaryFadeIn() {
        var caption = document.querySelector('.anniversary-caption');
        if (!caption) return;

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    caption.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });

        observer.observe(caption);
    }

    initAnniversaryFadeIn();

    function switchTab(tabId) {

        if (!allowedTabs.includes(tabId)) return;

        // Update tabs
        tabs.forEach(tab => {
            const active = tab.dataset.tab === tabId;

            tab.classList.toggle('active', active);
            tab.setAttribute('aria-selected', active ? 'true' : 'false');
            tab.setAttribute('tabindex', active ? '0' : '-1');
        });

        // Update panels
        panels.forEach(panel => {
            panel.classList.remove('active');
        });

        const activePanel = document.getElementById(tabId);
        if (activePanel) activePanel.classList.add('active');

        // Update description safely
        if (description && Object.prototype.hasOwnProperty.call(tabDescriptions, tabId)) {
            description.textContent = tabDescriptions[tabId];
        }
    }

    // Click events
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;
            switchTab(tabId);
        });
    });

});