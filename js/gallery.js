$(document).ready(function() {
    // Gallery filtering functionality
    const $gallery = $('#gallery');
    const $categoryButtons = $('.category-btn');
    const $lightbox = $('#lightbox');
    const $lightboxImg = $lightbox.find('img');
    const $lightboxCaption = $lightbox.find('.lightbox-caption');
    const $closeLightbox = $lightbox.find('.close-lightbox');
    const $galleryItems = $('.gallery-item');
    
    // Filter gallery by category
    $categoryButtons.on('click', function() {
      const category = $(this).data('category');
      
      // Update active button
      $categoryButtons.removeClass('active');
      $(this).addClass('active');
      
      // Fade out gallery
      $gallery.addClass('fade');
      
      setTimeout(function() {
        // Filter items
        $galleryItems.each(function() {
          const $item = $(this);
          if ($item.data('category') === category) {
            $item.show();
          } else {
            $item.hide();
          }
        });
        
        // Fade in gallery
        $gallery.removeClass('fade');
      }, 500);
    });
    
    // Initialize gallery to show nature by default
    $categoryButtons.first().click();
    
    // Lightbox functionality
    $galleryItems.on('click', function() {
      const $img = $(this).find('img');
      const caption = $(this).find('.item-caption').text();
      
      $lightboxImg.attr('src', $img.attr('src'));
      $lightboxCaption.text(caption);
      $lightbox.addClass('active');
    });
    
    // Close lightbox
    $closeLightbox.on('click', function() {
      $lightbox.removeClass('active');
    });
    
    // Close lightbox on outside click
    $lightbox.on('click', function(e) {
      if ($(e.target).is($lightbox)) {
        $lightbox.removeClass('active');
      }
    });
    
    // Back to top button
    const $backToTop = $('#backToTop');
    
    $(window).on('scroll', function() {
      if ($(window).scrollTop() > 300) {
        $backToTop.addClass('active');
      } else {
        $backToTop.removeClass('active');
      }
    });
  });
  