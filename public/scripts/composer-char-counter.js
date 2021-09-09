/* eslint-disable no-undef */
$(document).ready(function() {
  $("#tweet-text").on('keyup', function() {
    let $counter = $(".counter");
    const maxLength = 140;
    let currentLength = $(this).val().length;//dynamical length of input
    $counter.val(maxLength - currentLength);//dynamically change last num of sym
    if (currentLength > maxLength) {//check length to change color
      $counter.css("color", "red");
    } else {
      $counter.css("color", "#5e6572");
    }
  });

});