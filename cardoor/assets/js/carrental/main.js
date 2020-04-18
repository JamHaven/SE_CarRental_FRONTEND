//Global variables
var devCarrental = "http://localhost:443";
var prodCarrental = "https://carrental-backend.azurewebsites.net";

var globalCarrentalUrl = prodCarrental;

var devFrontend = "http://localhost";
var prodFrontend = "http://carrental-frontend.azurewebsites.net";

var globalFrontendUrl = devFrontend;

document.getElementById("usernameBanner").innerHTML = " " + sessionStorage.username;