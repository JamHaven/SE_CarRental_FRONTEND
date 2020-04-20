//Global variables
var devCarrental = "http://localhost:443";
var prodCarrental = "https://carrental-backend.azurewebsites.net";

var globalCarrentalUrl = prodCarrental;

var devFrontend = "http://localhost:8000";
var prodFrontend = "https://carrental-frontend.azurewebsites.net";

var globalFrontendUrl = devFrontend;

document.getElementById("usernameBanner").innerHTML = " " + sessionStorage.username;



function getCurrency() {

  $.ajax({
    url: globalCarrentalUrl + "/user",
    type: "GET",
    contentType: "application/json; charset=utf-8",
    beforeSend: function (xhr) {
      if (localStorage.token) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
      }
    },
  }).success(function (response) {
    console.log(response);
    document.getElementById("Currency").innerHTML = "Actual: " + response["defaultCurrency"];
    localStorage.currency = response["defaultCurrency"];
  }).fail(function (response) {
    console.error(response);
  });

}

function changeCurrency(dropdown) {
  var myindex = dropdown.selectedIndex
  var selValue = dropdown.options[myindex].value


  $.ajax({
    url: globalCarrentalUrl + "/user",
    type: "PUT",
    data: JSON.stringify({
      defaultCurrency: selValue,

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
    localStorage.currency = selValue;
    document.getElementById("Currency").innerHTML = "Actual: " + selValue;
  }).fail(function (response) {
    console.error(response);
  });

}
