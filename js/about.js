$(document).ready(function() {
    // Optional interactive effects using jQuery
    $('.team-member-card').hover(
        function() {
            $(this).css('transform', 'scale(1.05)');
        },
        function() {
            $(this).css('transform', 'scale(1)');
        }
    );
});