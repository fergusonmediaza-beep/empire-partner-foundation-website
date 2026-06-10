$(document).ready(function () {
  // Mobile toggle menu
  $('#mobile_toggle').on('click', function () {
    $('#nav_list').toggleClass('active');
  });

  // Fixed accordion functionality
  $('.card-header-csi').each(function (index) {
    $(this).on('click', function () {
      const collapseId = '#collapse' + (index + 1);

      // Close all other accordions
      $('.collapse-csi').each(function (i) {
        const currentId = '#collapse' + (i + 1);
        if (currentId !== collapseId) {
          $(this).removeClass('show');

          // Reset all other icons
          const $otherHeader = $('.card-header-csi').eq(i);
          const $icon = $otherHeader.find('.icon i');
          $icon.removeClass('fa-minus').addClass('fa-plus');
        }
      });

      // Toggle current collapse
      $(collapseId).toggleClass('show');

      // Toggle icon in clicked header
      const $icon = $(this).find('.icon i');
      $icon.toggleClass('fa-plus fa-minus');
    });
  });

  // Back to top button
  const $backToTop = $('#backToTop');

  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 300) {
      $backToTop.addClass('active');
    } else {
      $backToTop.removeClass('active');
    }
  });

  $backToTop.on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 'smooth');
  });
});

function animateStat(targetId, targetValue) {
  let currentValue = 0;
  const $element = $('#' + targetId); // jQuery selector

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

// Call the function for each stat
$(document).ready(function () {
  animateStat('stat-1', 12000);
  animateStat('stat-2', 40);
  animateStat('stat-3', 17);
  animateStat('stat-4', 400);
});


 $(document).ready(function() {
  // Function to search articles
  function searchArticles() {
      const query = $('#searchInput').val().toLowerCase().trim();
      let hasResults = false;

      $('.article-item').each(function() {
          const title = $(this).data('title').toLowerCase();
          const description = $(this).data('description').toLowerCase();
          const date = $(this).data('date').toLowerCase();

          if (query === '' || title.includes(query) || description.includes(query) || date.includes(query)) {
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

  // Search button click
  $('#searchBtn').click(function() {
      searchArticles();
  });

  // Search on Enter key
  $('#searchInput').keypress(function(e) {
      if (e.which === 13) {
          searchArticles();
      }
  });

  // Real-time search as user types
  $('#searchInput').on('input', function() {
      searchArticles();
  });
});