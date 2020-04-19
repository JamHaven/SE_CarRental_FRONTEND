//Global variables
var devCarrental = "http://localhost:443";
var prodCarrental = "https://carrental-backend.azurewebsites.net";

var globalCarrentalUrl = prodCarrental;

var devFrontend = "http://localhost";
var prodFrontend = "https://carrental-frontend.azurewebsites.net";

var globalFrontendUrl = prodFrontend;

document.getElementById("usernameBanner").innerHTML = " " + sessionStorage.username;


function changeCurrency(dropdown){
    var myindex  = dropdown.selectedIndex
    var SelValue = dropdown.options[myindex].value
    alert("New currency: "+SelValue);
}
