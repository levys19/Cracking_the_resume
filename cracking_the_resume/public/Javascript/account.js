$(function () {
$(".like").click(function () {
  var input = $(this).find('.qty1');
  input.val(parseInt(input.val())+ 1);

});
$(".dislike").click(function () {
var input = $(this).find('.qty2');
input.val(input.val() - 1);
});

var block = " <div class='media'><p class='pull-right'><small>5 days ago</small></p><a class='media-left' href='#'><img src='http://lorempixel.com/40/40/people/1/'></a><div class='media-body'><h4 class='media-heading user_name'>Liesel Vaidya</h4> Mine is better.<p><small><a href=''>Like</a> - <a href=''>Share</a></small></p></div></div>";

var userName = "Random Dude";


$("#postIt").click(function(){
  var message = $("#Message").val();
  var media = "<div class='media'>";
  var p1 = "<p class='pull-right'><small>5 days ago</small></p>";
  var a1 = "<a class='media-left' href='#'><img src='http://lorempixel.com/40/40/people/1/'></a>";
  var div1 = "<div class='media-body'><h4 class='media-heading user_name'>" + userName + "</h4>" + message + "<p><small><a href=''>Like</a> - <a href=''>Share</a></small></p></div></div>";
  $("#Message").val("");
  $(".comments-list").append(media + p1 + a1 + div1);
})

});
