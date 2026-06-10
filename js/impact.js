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
  animateStat('stat-1', 14000);
  animateStat('stat-2', 50);
  animateStat('stat-3', 50);
  animateStat('stat-4', 700);
  animateStat('stat-5', 5000);
});
