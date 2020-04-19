//Global variables
var devCarrental = "http://localhost:443";
var prodCarrental = "https://carrental-backend.azurewebsites.net";

var globalCarrentalUrl = prodCarrental;

var devFrontend = "http://localhost";
var prodFrontend = "https://carrental-frontend.azurewebsites.net";

var globalFrontendUrl = devFrontend;

document.getElementById("usernameBanner").innerHTML = " " + sessionStorage.username;



function getCurrency(){
  
  $.ajax({
      url: globalCarrentalUrl + "/user",
      //credentials: 'same-origin',
      type: "GET",
      /*data: JSON.stringify({
          currency: SelValue,
    
        }),*/
      contentType: "application/json; charset=utf-8",
      beforeSend: function (xhr) {
        if (localStorage.token) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
        }
      },
    }).success(function (response) {
      //alert("Actual currency: "+SelValue);
  
      console.log(response);
      document.getElementById("Currency").innerHTML ="Actual: "+  response["defaultCurrency"];
     
    }).fail(function (response) {
      console.error(response);
    });
  
  }
  
  function changeCurrency(dropdown){
      var myindex  = dropdown.selectedIndex
      var SelValue = dropdown.options[myindex].value
  
      
    $.ajax({
      url: globalCarrentalUrl + "/user" ,
      //credentials: 'same-origin',
      type: "PUT",
      data: JSON.stringify({
          currency: SelValue,
    
        }),
      contentType: "application/json; charset=utf-8",
      beforeSend: function (xhr) {
        if (localStorage.token) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
        }
      },
    }).success(function (response) {
      alert(response["message"]);
  
      console.log(response);
      /*var datarow = $("#datarow");
  
      var singleCarContainer = $('#CARTEMPLATE');
  
      //for (var i = 0; i < response.length; i++) {
      singleCarContainer.find('.car-description').text(response.id);
      singleCarContainer.find('.car-price').text("Car price: " + response.price);
      singleCarContainer.find('.rent-btn').text("Book " + response.id);
  
      singleCarContainer.find('.car-title').text(response.type);
  
      datarow.append(singleCarContainer.html());
  
      $("#car-list-area").find('.rent-btn').text("Book Car " + response.id);
      //}
      // datarow.append(test);*/
    }).fail(function (response) {
      console.error(response);
    });
  
  }