$(document).ready(function(){
  $(".tile__img").click(function(){
    var clickedImg = $(this).attr('src');
    $("#imagePop").attr('src',clickedImg);
    $("#tallModal").modal("toggle");
  })
});
