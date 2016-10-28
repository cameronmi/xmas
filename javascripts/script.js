(function($) {
$(document).ready(function(){
   
   // Variable to hold request
   var request;

   // Bind to the submit event of our form
   $("#form").submit(function(event){

     // Prevent default posting of form - put here to work in case of errors
     event.preventDefault();

     //Abort any pending request
     if (request) {
       request.abort();
     }
     //setup some local variables
     var $form = $(this);

     // Let's select and cache all the fields
     var $inputs = $form.find("input, select, button, textarea");

     // Serialize the data in the form
     var serializedData = $form.serialize();

     // Let's disable the inputs for the duration of the Ajax request.
     // Note: we disable elements AFTER the form data has been serialized.
     // Disabled form elements will not be serialized.
     $inputs.prop("disabled", true);

     // Fire off the request to /form.php
     request = $.ajax({
         url: "https://script.google.com/macros/s/AKfycbxjJ73uGfOjfeJqi08U75gW7-mB3TMF5Wu5iezg-cNZiH_z_H4/exec",
         type: "post",
         data: serializedData
     });

     // Callback handler that will be called on success
     request.done(function (response, textStatus, jqXHR){
         // Log a message to the console
         console.log("Hooray, it worked!");
     });

     // Callback handler that will be called on failure
     request.fail(function (jqXHR, textStatus, errorThrown){
         // Log the error to the console
         console.error(
             "The following error occurred: "+
             textStatus, errorThrown
         );
     });

     // Callback handler that will be called regardless
     // if the request failed or succeeded
     request.always(function () {
         // Reenable the inputs
         $inputs.prop("disabled", false);
     });
   });
   
  function pickFromArray(ary) {
    return ary[Math.floor(Math.random()*ary.length)];
  }
      
  function generate() {
    var text1 = pickFromArray(first);
    var text2 = pickFromArray(second);
    var text3 = pickFromArray(third);
    document.getElementById('slot1').textContent=text1;
    document.getElementById('slot2').textContent=text2;
    document.getElementById('slot3').textContent=text3;
    var e = document.createElement('li')
    e.textContent = text1 + ' + ' + text2 + ' + ' + text3;
    var log = document.getElementById('log').firstElementChild;
    log.insertBefore(e, log.firstChild);
    ga('send', 'event', 'Button', 'Click', 'generate');
  }

  function initApplication() {
    var xhr = new XMLHttpRequest();
    xhr.open( "GET", 'data.json', true );
    xhr.responseType = 'json';
    xhr.send();
    xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var data = xhr.response;
        first = data[0];
        second = data[1];
        third = data[2];
//        document.getElementById('generate-button').removeAttribute('disabled');
      }
    };
  }
  initApplication();

});
})(jQuery)
