


$(function () {
  $(".like").click(function () {
    var input = $(this).find('.qty1');
    input.val(parseInt(input.val())+ 1);
  });
  $(".dislike").click(function () {
    var input = $(this).find('.qty2');
    input.val(input.val() - 1);
  });

  var userName = "Random person";
  var commentCount = 5;

  // function triggerButton(){
  //     if(!$.trim($("#Message").val())){
  //       return;
  //     }
  //     commentCount++;
  //     $("#commentCount").text(commentCount + " comments");

  //     var message = $("#Message").val();
  //     message = $($.parseHTML(message)).text();
  //     var media = "<div class='media'>";
  //     var p1 = "<p class='pull-right'><small>5 days ago</small></p>";
  //     var a1 = "<a class='media-left' href='#'><img src='http://lorempixel.com/40/40/people/1/'></a>";
  //     var div1 = "<div class='media-body'><h4 class='media-heading user_name'>" + userName + "</h4>" + message + "<p><small><a href=''>Like</a> - <a href=''>Share</a></small></p></div></div>";
  //     $("#Message").val("");
  //     $(".comments-list").append(media + p1 + a1 + div1);

  // }

  // $("#postIt").click(function(){
  //   triggerButton();
  // });

  // $("#Message").keypress(function(event){
  //   if(event.which == 13){
  //      triggerButton();
  //   }
  // });
});
