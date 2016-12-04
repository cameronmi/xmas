(function($) {
  $(document).ready(function() {

    // Variable to hold request
    var request;
    var data;
    var ids = ['sn', 'fn', 'in', 'gn', 'ln'];
    var columns = ['scene', 'food', 'item', 'gesture', 'line'];
    // Bind to the submit event of our form
    $("#form").submit(function(event) {
      $("#form").addClass("hidden");

      // Prevent default posting of form - put here to work in case of errors
      event.preventDefault();
      ga('send', 'event', 'Button', 'Click', 'generate');

      //Abort any pending request
      if (request) {
        request.abort();
      }
      //setup some local variables
      var $form = $(this);

      // Let's select and cache all the fields
      var $inputs = $form.find("input, select, button, textarea");

      var PTTID = $("#id").val();
      var formdata = {
        "id": PTTID
      };
      var results = [];
      var inputs = _.map(ids, function(id, i) {
        var $select = $("#" + id);
        var num = $select.val();
        var options = _.slice(_.shuffle(data[i]), 0, num);
        formdata[columns[i]] = _.join(options, "\n");
        $("#" + columns[i]).html('<li>' + _.join(options, "</li><li>") + '</li>');
        results.push("(" + _.join(options) + ")");
        return num;
      });
      formdata["input"] = _.join(inputs);
      ga('send', 'event', PTTID, _.join(inputs), _.join(results), (new Date).getTime());


      // Let's disable the inputs for the duration of the Ajax request.
      // Note: we disable elements AFTER the form data has been serialized.
      // Disabled form elements will not be serialized.
      $inputs.prop("disabled", true);
      //				debugger;
      // Fire off the request to /form.php
      request = $.ajax({
        url: "https://script.google.com/macros/s/AKfycbxjJ73uGfOjfeJqi08U75gW7-mB3TMF5Wu5iezg-cNZiH_z_H4/exec",
        type: "post",
        data: $.param(formdata)
      });

      // Callback handler that will be called on success
      request.done(function(response, textStatus, jqXHR) {
        // Log a message to the console
        console.log("Hooray, it worked!");
        $("#result").removeClass("hidden");
      });

      // Callback handler that will be called on failure
      request.fail(function(jqXHR, textStatus, errorThrown) {
        // Log the error to the console
        console.error(
          "The following error occurred: " +
          textStatus, errorThrown
        );
      });

      // Callback handler that will be called regardless
      // if the request failed or succeeded
      request.always(function() {
        // Reenable the inputs
        $inputs.prop("disabled", false);
      });
    });
    function reset() {
      $("#form").removeClass("hidden");
      $("#result").addClass("hidden");
    }
    function initApplication() {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", 'data.json', true);
      xhr.responseType = 'json';
      xhr.send();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          data = xhr.response;
        }
      };
    }
    initApplication();

  });
})(jQuery)
