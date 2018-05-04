$(document).ready(function() {

  var passCriteria = false;

  function pdfOnly() {
    var lastThree = $("#fileUpload").val().substr($("#fileUpload").val().length - 3);
    if (lastThree == "pdf" || lastThree == "PDF") {
      $("#checkResume").prop('checked', true);
      alert("You have updated your resume!");
    } else {
      $("#checkResume").prop('checked', false);
      alert("Please upload a PDF file");
    }
  }

  $("#submitForm").click(function() {
    pdfOnly();
  });

  var passMatch = "Matching";


  $("#newPassButton").click(function() {

    // pdfOnly();
    console.log($("#message").html() + " and " + passMatch);

    if (passMatch === $("#message").html()) {
      $("#checkSame").prop('checked', true);
      if(passCriteria){
        alert("Your password have been updated");
      }
    } else
      $("#checkSame").prop('checked', false);
  });



  $("#checkResume").click(function() {
    pdfOnly();
  });


  $('#password, #confirm_password').on('keyup', function () {
    if ($('#password').val() == $('#confirm_password').val()) {
      $('#message').html('Matching').css('color', 'green');
      // if($("#message").html() == "Matching"){
      //   $("#checkSame").prop('checked', true);
      //   // passMatch = true;
      // }
    } else
      $('#message').html('Not Matching').css('color', 'red');
      $("#checkSame").prop('checked', false);
      // passMatch = false;
  });

  var strength = {
  		0: "Worst ☹",
  		1: "Bad ☹",
  		2: "Weak ☹",
  		3: "Good ☺",
  		4: "Strong ☻",
      5: "Please create a longer password",
      6: "Please include a special character",
      7: "Please include a number"

  }

  var password = document.getElementById('password');
  var meter = document.getElementById('password-strength-meter');
  var text = document.getElementById('password-strength-text');

  password.addEventListener('input', function()
  {
      var val = password.value;
      var result = zxcvbn(val);
      var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

      console.log(val.match(regularExpression));





      // Update the password strength meter
      meter.value = result.score;

      // Update the text indicator
      if(val !== "") {
          // text.innerHTML = "Strength: " + "<strong>" + strength[result.score] + "</strong>" + "<span class='feedback'>" + result.feedback.warning + " " + result.feedback.suggestions + "</span";
          if(val.length < 6 || !val.match(regularExpression)){
            text.innerHTML =  "<strong>" + strength[5] +  "</strong><br/>" + "<strong>" + strength[6] +  "</strong><br/>" + "<strong>" + strength[7] +  "</strong>";
            $("#checkLength").prop('checked', false);

          }
          else{
            if(val.match(regularExpression)){
              text.innerHTML = "";
              $("#checkLength").prop('checked', true);
              passCriteria = true;

            }
          }
      }
      else {
          text.innerHTML = "";
      }
  });


  $("#newPassButton").click(function(){
     alert("Your password have been updated");
   })



});
