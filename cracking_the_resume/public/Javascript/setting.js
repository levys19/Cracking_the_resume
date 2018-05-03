$(document).ready(function() {


  function pdfOnly() {
    var lastThree = $("#fileUpload").val().substr($("#fileUpload").val().length - 3);
    if (lastThree == "pdf" || lastThree == "PDF") {
      $("#checkResume").prop('checked', true);
    } else {
      $("#checkResume").prop('checked', false);
      alert("Please upload a PDF file");
    }
  }

  $("#submitForm").click(function() {

    pdfOnly();

  });


});
