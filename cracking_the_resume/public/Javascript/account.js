$(function () {
  $(".like").click(function() {
    var input = $(this).find('.qty1');
      input.val(parseInt(input.val())+ 1);
      $(".like").prop('disabled', true);
      $(".dislike").prop('disabled', false);
      $(".qty2").val(parseInt(input.val()) - 1);

  });

  $(".dislike").click(function() {
    var input = $(this).find('.qty2');
      input.val(parseInt(input.val())+ 1);
      $(".dislike").prop('disabled', true);
      $(".like").prop('disabled', false);
      $(".qty1").val(parseInt(input.val()) - 1);
  });

  //disables submit if comment is empty or contains all spaces only
  $("#postIt").prop('disabled', true);

  var text_max = 50;
  $('#count_message').html(text_max + ' words remaining');
  $('#countLeft').html(text_max + ' words left');

  $("#Message").on('keyup', function(){
    if($.trim($('#Message').val()).length > 0) {
      $("#postIt").prop('disabled', false);
    }
    else{
      $("#postIt").prop('disabled', true);
    }
  })

  $('#Message').keyup(function() {
    // alert($("#Message").val().length);

    var text_length = $('#Message').val().length;
    var text_remaining = text_max - text_length;
    // $('#count_message').html(text_remaining + ' words remaining');
    var words = this.value.match(/\S+/g).length;

    // if(!$.trim($("#Message").val())) {
    //   alert("empty");
    // }

    // if($("#Message").val().trim() == " "){
    //   // var trimmed = $(this).val().split(/\s+/, 50).join(" ");
    //   // $(this).val(trimmed + " ");
    //   // $("#Message").val() = "";
    //   alert("uhh");
    // }


    // if($("#Message").val().length == 0){
    //   $("#postIt").prop('disabled',true);
    // }


    if (words > 50) {
      var trimmed = $(this).val().split(/\s+/, 50).join(" ");
      $(this).val(trimmed + " ");
      }
      else {
        var wordsLeft = 50-words;
          $('#count_message').text("Total words: " + words);
          $('#countLeft').text("Words left: " + wordsLeft);
      }
    });


    //
    // $("#postIt").click(function(){
    //   if("#Message").val() == " " ){
    //     $("#submitForm").preventDefault();
    //   }
    // });

});
