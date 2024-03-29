$(function(){
  $("#createBtn, #password").hide();
  beginningModal = $(".modal-body").html();
  modalCloseCleanup();
  printCustomers();
  createCustomer();
  viewEquipment();
  $.ajax({
     url: 'controller.php',
     data: {action: 'getInfo'},
     type: 'post',
     success: function(output) {
                $("#information").html(output);
              }
  });
});//end document ready

function createCar(){
  $("#createBtn").unbind("click");
  preloadModal = $(".modal-body").html();
  $(".modal-title").html("Create a Car");
  $("#label1").html("Load Capacity:");
  $("#label2").html("Type:");

  // fill in types
  $.ajax({
     url: 'controller.php',
     data: {action: 'getCarTypes',},
     type: 'post',
     success: function(output){$("#allTypes").html(output);}
  });

  // fill in trains
  $.ajax({
     url: 'controller.php',
     data: {action: 'getCarTrains',},
     type: 'post',
     success: function(output){$("#allTrains").html(output);}
  });

  // fill in customers
  $.ajax({
     url: 'controller.php',
     data: {action: 'getCarCustomers',},
     type: 'post',
     success: function(output){$("#allCustomers").html(output);}
  });

  $("#label3").html("Train Number:");
  $("#label4").html("Customer ID:");
  $("#label5").html("Price");
  $("#modal-title").html("Create a Car");
  $("#editCustomerBtn, #deleteBtn").hide();
  $("#createBtn").show().html("Create Car");
  $(".modalInput, #email").removeAttr("readonly");
  $("#createBtn").click(function(){
    $(".modalInput, #email").attr("readonly", true);
    load = $("#email").val();
    type = $("#first_name").val();
    train = $("#last_name").val();
    customer = $("#phone_number").val();
    price = $("#address").val();

    $.ajax({
       url: 'controller.php',
       data: {action: 'createCar',
              load: load,
              type: type,
              train: train,
              customer: customer,
              price: price},
       type: 'post',
       success: function(output) {
                  console.log(output);
                }
    });
  });

  $("#closeModal").click(function(){
    $(".modal-body").html(preloadModal);
    $("#editCustomerBtn, #deleteBtn").show();
    $("#createBtn").hide().html("Submit");
    $(".modalInput, #email").attr("readonly", true);
  });
}

function createSchedule(){
  $("#createBtn").hide();
  preloadModal = $(".modal-body").html();
  $(".modal-title").html("Create Schedule Record");
  $.ajax({
     url: 'controller.php',
     data: {action: 'createScheduleForm',},
     type: 'post',
     success: function(output){
       $(".modal-body").html(output);
       $("#editCustomerBtn").html("Submit Record").show();
       $("#deleteBtn").hide();
       $("#last_name").change(function(){
         train = $(this).val();
         $.ajax({
            url: 'controller.php',
            data: {action: 'getDepartCity',
                   train: train},
            type: 'post',
            success: function(output){
              if(output == 0){
                $.ajax({
                  url: 'controller.php',
                  data: {action: 'getAllCities'},
                  type: 'post',
                  success: function(output1){
                    $("#departCityInput").html(output1);
                    $("#depart_city").change(function(){
                      city = $(this).val();
                      $.ajax({
                         url: 'controller.php',
                         data: {action: 'getDestCity',
                                city: city},
                         type: 'post',
                         success: function(output2){
                           $("#dest_city").html(output2);
                         }
                      });
                    });
                  }
                });
              } else {
                $("#depart_city").val(output);
                $.ajax({
                   url: 'controller.php',
                   data: {action: 'getDestCity',
                          city: output},
                   type: 'post',
                   success: function(output2){
                     $("#dest_city").html(output2);
                   }
                });
              }
            }//end depart_city success function
         });
       });
       $("#editCustomerBtn").click(function(){
         train = $("#last_name").val();
         depart_city = $("#depart_city").val();
         dest_city = $("#dest_city").val();
         depart_time = $("#depart_time").val();
         dest_time = $("#dest_time").val();
         date = $("#date").val();
         $.ajax({
            url: 'controller.php',
            data: {action: 'createSchedule',
                   depart_city: depart_city,
                   dest_city: dest_city,
                   depart_time: depart_time,
                   dest_time: dest_time,
                   date: date,
                   train: train},
            type: 'post',
            success: function(output){
              $(".modal-body").html(output);
              }
       });
  });

  $("#closeModal").click(function(){
    $(".modal-body").html(preloadModal);
  });
}
});
}

function viewEmployees(){
  preloadModal = $(".modal-body").html();
  $.ajax({
    url: 'controller.php',
    data: {action: 'printEmployees'},
    type: 'post',
    success: function(output){
      $("#deleteBtn, #createBtn, #editCustomerBtn").hide();
      $(".modal-body").html(output);
      $("#closeModal").click(function(){
        $(".modal-body").html(preloadModal);
      });
    }
  });
}

function assignTrain(user){
  $.ajax({
    url: 'controller.php',
    data: {action: 'assignTrainForm',
           user: user},
    type: 'post',
    success: function(output){
      // console.log(output);
      $(".modal-body").html(output);
      $("#editCustomerBtn").html("Confirm Assignment").show();
      $("#editCustomerBtn").click(function(){
        user = $("#user").val();
        train = $("#train").val();
        $.ajax({
          url: 'controller.php',
          data: {action: 'assignTrain',
                 user: user,
                 train: train},
          type: 'post',
          success: function(output){
            $(".modal-body").html(output);
            $("#editCustomerBtn").hide();
          }
        });
      });
    }
  });
}


function viewSchedule(){
  $("#createBtn").hide();
  preloadModal = $(".modal-body").html();
  $(".modal-title").html("View Schedule Records");
  $.ajax({
     url: 'controller.php',
     data: {action: 'viewSchedule',},
     type: 'post',
     success: function(output){
       $(".modal-body").html(output);
       $("#editCustomerBtn, #deleteBtn").hide();
     }
  });
  $("#closeModal").click(function(){
    $(".modal-body").html(preloadModal);
  });

}

function editCar(serial){
  preloadModal = $(".modal-body").html();
  $(".modal-title").html("Edit Car");
  $.ajax({
    url: 'controller.php',
    data:{action: 'getCarInfo',
          serial_num: serial,
          type: 'form_admin'},
    type: 'post',
    success: function(output) {
      // console.log(output);
      $(".modal-body").html(output);
      $("#editCustomerBtn").html("Submit Changes").show();
      $(".editMe").removeAttr("readonly");
      $("#location").change(function(){
        // console.log($(this).val());
        $.ajax({
           url: 'controller.php',
           data: {action: 'getCarTrain',
                  train_location: $(this).val()},
           type: 'post',
           success: function(output){
              $("#allTrains").html(output);
          }
        });
      });
    }
  });



  $("#editCustomerBtn").click(function(){
    serial = $("#serial_num").val();
    load = $("#load_capacity").val();
    type = $("#type").val();
    locationOfCar = $("#location").val();
    price = $("#price").val();
    train_num = $("#train_num").val();
    customer_id = $("#assignedCustomerID").val();
    $.ajax({
      url: 'controller.php',
      data:{action: 'updateCar',
            serial_num: serial,
            load: load,
            type: type,
            locationOfCar: locationOfCar,
            price: price,
            train_num: train_num,
            customer_id: customer_id},
      type: 'post',
      success: function(output){
        console.log(output);
        $(".editMe").attr("readonly", true);
      }
    });
  });

  $("#closeModal").click(function(){
    $(".modal-body").html(preloadBody);
  });

}

function viewEquipment(){
  $("#viewEquipmentBtn").click(function(){
    preloadBody = $(".modal-body").html();
    $(".modal-title").html("View Cars");
    $("#deleteBtn, #editCustomerBtn, #createBtn").hide();
    $.ajax({
       url: 'controller.php',
       data: {action: 'getAllReservations'},
       type: 'post',
       success: function(output) {
                  $(".modal-body").html(output);
                }
    });
    $("#closeModal").click(function(){
      $(".modal-body").html(preloadBody);
      $("#deleteBtn, #editCustomerBtn, #createBtn").show();
      $("#editCustomerBtn").unbind("click");
    });
  });
}//end viewEquipment

function createTrain(){
  preloadBody = $(".modal-body").html();
  $(".modal-title").html("Create Train");
  $("#deleteBtn, #createBtn").hide();
  $("#editCustomerBtn").html("Create Train");
  $.ajax({
    url: 'controller.php',
    data: {action: 'createTrainForm'},
    type: 'post',
    success: function(output){
      $(".modal-body").html(output);
      $("#closeModal").click(function(){
        $(".modal-body").html(preloadBody);
        $("#editCustomerBtn").unbind("click");
      });
      $("#editCustomerBtn").click(function(){
        train = $("#train").val();
        company = $("#company").val();
        $.ajax({
          url: 'controller.php',
          data: {action: 'createTrain',
                 train: train,
                 company: company},
          type: 'post',
          success: function(output){
            $(".modal-body").html(output);
          }
        });
      });
    }
  });
}

function viewTrains(){
  preloadBody = $(".modal-body").html();
  $(".modal-title").html("View Trains");
  $("#editCustomerBtn, #deleteBtn, #createBtn").hide();
  $.ajax({
     url: 'controller.php',
     data: {action: 'getAllTrains'},
     type: 'post',
     success: function(output) {
                $(".modal-body").html(output);
                // $("#closeModal").unbind("click");
              }
  });

  $("#closeModal").click(function(){
    $(".modal-body").html(preloadBody);
    $("#editCustomerBtn").unbind("click");
  });

}//end viewTrains

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

function modalFillTrain(train_num, company_id, cName, cAddress, cEmail, cPhone){
  // preloadBody = $(".modal-body").html();
  $(".modal-title").html("Edit Train Details");
  $.ajax({
     url: 'controller.php',
     data: {action: 'editTrainDetailsForm',
            train: train_num,
            company: company_id},
     type: 'post',
     success: function(output) {
                  $(".modal-body").html(output);
                  $("#editCustomerBtn").html("Submit Change").show();
                  $("#editCustomerBtn").click(function(){
                    company = $("#company").val();
                    $.ajax({
                      url: 'controller.php',
                      data: {action: 'editTrainCompany',
                             company: company,
                             train: train_num},
                      type: 'post',
                      success: function(output){
                        $.ajax({
                           url: 'controller.php',
                           data: {action: 'getAllTrains'},
                           type: 'post',
                           success: function(output) {
                                      $("#editCustomerBtn").hide();
                                      $(".modal-body").html(output);
                                    }
                        });
                      }
                    });
                  });
              }
  });
}//end modalFillTrain

function modalFill(email, first_name, last_name, phone_number, address){
  $("#createBtn").hide();
  $(".modal-title").html('Customer Information');
  $("#editCustomerBtn").html("Edit");
  $("#email").val(email).attr("readonly", true);
  $("#first_name").val(first_name).attr("readonly", true);
  $("#last_name").val(last_name).attr("readonly", true);
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
      email = $("#email").val();
      first_name = $("#first_name").val();
      last_name = $("#last_name").val();
      phone_number = $("#phone_number").val();
      address = $("#address").val();
      $.ajax({
         url: 'controller.php',
         data: {action: 'editCustomer',
                email: email,
                first_name: first_name,
                last_name: last_name,
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
                          $("#editCustomerBtn, #deleteBtn").unbind("click");
                          $("#customerTable").html(output);
                      }
          });
        });
    });
  });

  $("#deleteBtn").click(function(){
      if(confirm("Are you sure you want to delete " + $("#user_id").val() + "?")){
        email = $("#email").val();
        $.ajax({
           url: 'controller.php',
           data: {action: 'deleteCustomer',
                  email: email},
           type: 'post',
           success: function(output) {
                      console.log(output);
                      $("#email").val(email + " deleted");
                      $("#first_name, #last_name, #phone_number, #address").val("deleted");
                      $("#deleteBtn, #editCustomerBtn").hide();
                      $("#closeModal").focus();
                      refreshTable();
                    }
                });
      }
  });//end deleteBtn

  $("#closeModal").click(function(){
    $("#editCustomerBtn, #deleteBtn").unbind("click");
  });

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
      preloadBody = $(".modal-body").html();
    });

    $("#createBtn").click(function(){
      if(form_validation('.modalInput') == false){
        alert('Fill out customer information completely or NA if not known');
        return false;
      } else {
        email = $("#email").val();
        first_name = $("#first_name").val();
        last_name = $("#last_name").val();
        phone_number = $("#phone_number").val();
        address = $("#address").val();


        $.ajax({
           url: 'controller.php',
           data: {action: 'createCustomer',
                  email: email,
                  first_name: first_name,
                  last_name: last_name,
                  phone_number: phone_number,
                  address: address},
           type: 'post',
           success: function(output) {
                        $(".modal-body").html(output);
                        $(".modal-title").html("Create Customer Authentication");
                        $("#createBtn").click(function(){
                        if(form_validation('.modalInput') == false){
                          alert('Fill out customer information completely or NA if not known');
                          return false;
                        } else {
                          user_id = $("#user_id").val();
                          password = $("#password").val();
                          $.ajax({
                             url: 'controller.php',
                             data: {action: 'createCustomerAuthentication',
                                    user_id: user_id,
                                    password: password},
                             type: 'post',
                             success: function(output) {
                               console.log(output);
                               $("#createBtn").hide();
                               $("#closeModal").focus();
                               $(".modal-body").html("<h2>Customer account created</h2>")
                             }
                           });
                          $("#closeModal").click(function(){
                            $(".modal-body").html(preloadBody);
                            $("#createBtn").show();
                            $("#user_id").attr("readonly", true);
                            $("#first_name").attr("readonly", true);
                            $("#last_name").attr("readonly", true);
                            $("#email").attr("readonly", true);
                            $("#phone_number").attr("readonly", true);
                            $("#address").attr("readonly", true);
                            printCustomers();
                          });
                        }

                        });
                    }
                });
      }
    });//end create customer
  }

  function resetPasswordAdmin(user){
    preloadModal = $(".modal-body").html();
    $(".modal-title").html("Reset User Password");
    $("#deleteBtn, #createBtn").hide();
    $("#password").show().removeAttr("readonly");
    $("#editCustomerBtn").html("Save Changes").show();
    $(".modal-title").html('Reset Password');
    $("#first_name, #passwordHide").hide();
    $("#label2").html("Password:");
    $("#email").val(user);

    $("#editCustomerBtn").click(function(){
      $("#password").attr("readonly", true);
      pwd = $("#password").val();
      $.ajax({
        url: 'controller.php',
        data: {action: 'updatePassword',
               user: user,
               pwd: pwd},
        type: 'post',
        success: function(output){
          $(".modal-body").html(output);
        }
      });
    });

    $("#closeModal").click(function(){
      $("#editCustomerBtn").unbind("click");
      $(".modal-body").html(preloadModal);
    });
  }//end resetPasswordAdmin

  function resetPassword(user){
    preloadModal = $(".modal-body").html();
    $(".modal-title").html("Reset My Password");
    $("#deleteBtn, #createBtn").hide();
    $("#password").show().removeAttr("readonly");
    $("#editCustomerBtn").html("Save Changes").show();
    $(".modal-title").html('Reset Password');
    $("#first_name, #passwordHide").hide();
    $("#label2").html("Password:");
    $("#email").val(user);

    $("#editCustomerBtn").click(function(){
      $("#password").attr("readonly", true);
      pwd = $("#password").val();
      $.ajax({
        url: 'controller.php',
        data: {action: 'updatePassword',
               pwd: pwd},
        type: 'post',
        success: function(output){
          $("#closeModal").unbind("click");
          $("#editCustomerBtn").hide();
          $(".modal-body").html(output);
          $("#closeModal").click(function(){
            $.ajax({
              url: 'controller.php',
              data: {action: 'loginRedirect'},
              type: 'post',
              success: function(output){
                window.location.replace('login.php');
              }
            });
          });
        }
      });
    });

    $("#closeModal").click(function(){
      $("#editCustomerBtn").unbind("click");
      $(".modal-body").html(preloadModal);
    });
  }

  function fillModalInfo(user_id, first_name, last_name, status, title){
    preloadModal = $(".modal-body").html();
    $(".modal-title").html('Your Information');
    $("#editCustomerBtn").html("Edit");
    $("#email").val(user_id).attr("readonly", true);
    $("#first_name").val(first_name).attr("readonly", true);
    $("#last_name").val(last_name).attr("readonly", true);
    $("#phone_number").val(status).attr("readonly", true);
    $("#address").val(title).attr("readonly", true);
    $("#label4").html("Status");
    $("#label5").html("Job Title");
    $("#deleteBtn, #createBtn").hide();
    $("#closeModal").click(function(){
      $(".modal-body").html(preloadModal);
      $("#editCustomerBtn").html("Edit").show();
      $("#editCustomerBtn").unbind("click");
    });
    $("#editCustomerBtn").click(function(){
      $("#editCustomerBtn").html("Save Changes");
      $("#first_name").removeAttr("readonly");
      $("#last_name").removeAttr("readonly");
      $("#phone_number").removeAttr("readonly");
      $("#address").removeAttr("readonly");
      $("#editCustomerBtn").click(function(){
        $("#first_name").attr("readonly", true);
        $("#last_name").attr("readonly", true);
        $("#phone_number").attr("readonly", true);
        $("#address").attr("readonly", true);
        user = $("#email").val();
        fname = $("#first_name").val();
        lname = $("#last_name").val();
        status = $("#phone_number").val();
        title = $("#address").val();
        // console.log("user: " + user + " fname: " + fname + " lname: " + lname + " status: " + status + " title: " + title);
        $.ajax({
           url: 'controller.php',
           data: {action: 'updateInfo',
                  type: 'admin',
                  user_id: user,
                  fname: fname,
                  lname: lname,
                  status: status,
                  title: title},
           type: 'post',
           success: function(output) {
             $("#information").html(output);
             $("#editCustomerBtn").hide();
             $("#closeModal").focus();
           }
         });
      })
    });
  }


function form_validation(elements_class){
  var inputs = $(elements_class);
  for(var i = 0; i < inputs.length; i++){
    if(inputs[i].value == ''){
      return false;
    }
  }
}
