/* eslint-disable func-style */
/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(()=>{
  const loadtweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        console.log("tweets", tweets);
        createTweets(tweets);
      },
      error: (err) => {
        console.log(`error: ${err}`);
      }
    });
  };
  loadtweets();//first load

  const createTweetElement = (tweet) => {//single tweet element with all html
    // const $header1 = $("<div class = 'header'></div>");
    // const $body1 = $("<div class = 'body'></div>");
    // const $footer1 = $("<div class = 'footer'></div>");
    // let $tweet = $("<div class = 'tweet'></div>");
    // let $image = "<img src=" + tweet.user.avatars + ">";
    // let $name = "<p>" + tweet.user.name + "</p>";
    // const $avatar = '<div class = "avatar">' + $image + $name + "</div>";
    // let $handle = "<p>" + tweet.user.handle + "</p>";
    // let $message = "<p>" + tweet.content.text + "</p>";
    // let $date = "<time class='days-ago'>" + timeago.format(tweet.created_at)  + "</time>";
    // let $icon1 = "<i class='fas fa-flag'></i>";
    // let $icon2 = "<i class='fas fa-retweet'></i>";
    // let $icon3 = "<i class='fas fa-heart'></i>";
    // const $icons = '<div class = "icons">' + $icon1 + $icon2 + $icon3 + "</div>";

    const $image = "<img src=" + tweet.user.avatars + ">";//cteating header
    const $name = "<p>" + tweet.user.name + "</p>";
    const $avatar = '<div class = "avatar">' + $image + $name + "</div>";
    const $handle = $("<p>").text(tweet.user.handle);
    const $header1 = $('<div>').addClass('header');

    const $message = $("<p>").text(tweet.content.text);//body
    const $body1 = $('<div>').addClass('body');
    
    const $date = $("<time>").text(timeago.format(tweet.created_at));//footer
    const $icon1 = $('<i>').addClass('fas fa-flag');
    const $icon2 = $('<i>').addClass('fas fa-retweet');
    const $icon3 = $('<i>').addClass('fas fa-heart');
    const $icons = $('<div>').addClass('icons');
    const $footer1 = $('<div>').addClass('footer');

    const $tweet = $('<div>').addClass('tweet');

    $icons.append($icon1,$icon2,$icon3);
    $header1.append($avatar, $handle);
    $body1.append($message);
    $footer1.append($date, $icons);
    $tweet.append($header1,$body1, $footer1);
    
    return $tweet;
 
  };

  const createTweets = (tweets) => {
    const $container = $(".tweet-container");
    $container.empty();

    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $container.prepend($tweet);//put tweets in reverse order
    }
  };

  function validateForm() {//function to check input field
    let text = "";
    let x = $("#tweet-text").val().length;
    if (x == "" || x == null) {
      text = "Form must not be empty";
      return text;
    } else if (x > 140) {
      text = "Length of the text should not be more than 140 symbols!";
      return text;
    }
  }

  const $form = $('#new-tweet-form');
  $form.on('submit', function(event) {//event handler
    const text = validateForm();
    event.preventDefault();
    if (text) {
      alert(text);
      console.log('the form has not been submitted');
      return;
    }
    // $.ajax({
    //   method: "POST",
    //   url: "/tweets",
    //   data: $(this).serialize() //turns form data into query string
    // }).then(function() {
    //   loadtweets();
    //   // $('#tweet-text').val('');
    //   console.log();
    // });
    console.log('the form has been submitted');

    const serializedData = $(this).serialize();

    $.post('/tweets', serializedData, (response) => {
      console.log("response:",response);
      loadtweets();//second load to refresh the page with new tweet
      $('#tweet-text').val('');
      $(".counter").val('140');
    });

  });


});

