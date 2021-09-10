/* eslint-disable no-undef */
$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    const $counter = $(".counter");
    const maxLength = 140;
    const currentLength = $(this).val().length;//dynamical length of input
    $counter.val(maxLength - currentLength);//dynamically change last num of sym
    if (currentLength > maxLength) {//check length to change color
      $counter.css("color", "red");
      return;
    }
    $counter.css("color", "#5e6572");
    
  });

});