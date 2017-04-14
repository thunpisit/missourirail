$(function(){
  $("#createBtn").hide();
  modalCloseCleanup();
  printCustomers();
  createCustomer();
  });

function modalCloseCleanup(){
  $("#closeModal").click(function(){
    $("#deleteBtn, #editCustomerBtn").show();
  });

}

function printCustomers(){
  $("#printCustomers").click(function(){
    $.ajax({
       url: 'controller.php',
       data: {action: 'printCustomers'},
       type: 'post',
       success: function(output) {
                    $("#customerTable").html(output);
                }
    });

  });
}

function modalFill(user_id, first_name, last_name, email, phone_number, address){
  $("#createBtn").hide();
  $(".modal-title").html('Customer Information');
  $("#editCustomerBtn").html("Edit");
  $("#user_id").val(user_id).attr("readonly", true);
  $("#first_name").val(first_name).attr("readonly", true);
  $("#last_name").val(last_name).attr("readonly", true);
  $("#email").val(email).attr("readonly", true);
  $("#phone_number").val(phone_number).attr("readonly", true);
  $("#address").val(address).attr("readonly", true);
  $("#editCustomerBtn").click(function(){
    $(".modalInput").removeAttr("readonly");
    $("#editCustomerBtn").html('Save').removeClass('btn-info').addClass('btn-success');
    $("#editCustomerBtn").click(function(){
      $("#deleteBtn").hide();
      $("#editCustomerBtn").html('Changes Saved').removeClass('btn-success').addClass('btn-info');
      $(".modalInput").attr("readonly", true);
      // edit customer ajax call
      user_id = $("#user_id").val();
      first_name = $("#first_name").val();
      last_name = $("#last_name").val();
      email = $("#email").val();
      phone_number = $("#phone_number").val();
      address = $("#address").val();
      $.ajax({
         url: 'controller.php',
         data: {action: 'editCustomer',
                user_id: user_id,
                first_name: first_name,
                last_name: last_name,
                email: email,
                phone_number: phone_number,
                address: address},
         type: 'post',
         success: function(output) {
                    console.log(output);
                    $("#deleteBtn").show();
                  }
              });
        $("#closeModal").click(function(){
          $.ajax({
             url: 'controller.php',
             data: {action: 'printCustomers'},
             type: 'post',
             success: function(output) {
                          $("#customerTable").html(output);
                      }
          });
        });
    });
  });

  $("#deleteBtn").click(function(){

      if(confirm("Are you sure you want to delete " + $("#user_id").val() + "?")){
        user_id = $("#user_id").val();
        $.ajax({
           url: 'controller.php',
           data: {action: 'deleteCustomer',
                  user_id: user_id},
           type: 'post',
           success: function(output) {
                      console.log(output);
                      $("#user_id").val(user_id + " deleted");
                      $("#first_name, #last_name, #email, #phone_number, #address").val("deleted");
                      $("#deleteBtn, #editCustomerBtn").hide();
                      $("#closeModal").focus();
                      refreshTable();
                    }
                });
      }

  });//end deleteBtn

}

function refreshTable(){
  $.ajax({
     url: 'controller.php',
     data: {action: 'printCustomers'},
     type: 'post',
     success: function(output) {
                  $("#customerTable").html(output);
              }
  });
}

function createCustomer(){
  $("#createCustomerBtn").click(function(){
      $(".modal-title").html('Create Customer Form');
      $("#deleteBtn, #editCustomerBtn").hide();
      $("#createBtn").show();
      $("#user_id").val('').removeAttr("readonly");
      $("#first_name").val('').removeAttr("readonly");
      $("#last_name").val('').removeAttr("readonly");
      $("#email").val('').removeAttr("readonly");
      $("#phone_number").val('').removeAttr("readonly");
      $("#address").val('').removeAttr("readonly");
    });

    $("#createBtn").click(function(){
      if(form_validation('.modalInput') == false){
        alert('Fill out customer information completely or NA if not known');
        return false;
      } else {
        user_id = $("#user_id").val();
        first_name = $("#first_name").val();
        last_name = $("#last_name").val();
        email = $("#email").val();
        phone_number = $("#phone_number").val();
        address = $("#address").val();

        $.ajax({
           url: 'controller.php',
           data: {action: 'createCustomer',
                  user_id: user_id,
                  first_name: first_name,
                  last_name: last_name,
                  email: email,
                  phone_number: phone_number,
                  address: address},
           type: 'post',
           success: function(output) {
                        console.log(output);
                        $("#createBtn").hide();
                        $("#closeModal").focus();
                        $("#user_id").attr("readonly", true);
                        $("#first_name").attr("readonly", true);
                        $("#last_name").attr("readonly", true);
                        $("#email").attr("readonly", true);
                        $("#phone_number").attr("readonly", true);
                        $("#address").attr("readonly", true);
                        printCustomers();
                    }
                });
      }
    });
  //end create customer
  }


function form_validation(elements_class){
  var inputs = $(elements_class);
  for(var i = 0; i < inputs.length; i++){
    if(inputs[i].value == ''){
      return false;
    }
  }
}