//Global variables

// PRODUCTIVE : "https://carrental-backend.azurewebsites.net"
// DEV : "http://localhost:443";
var globalCarrentalUrl = "https://carrental-backend.azurewebsites.net";

// PRODUCTIVE : "http://carrental-frontend.azurewebsites.net"
// DEV : "http://localhost"
var globalFrontendUrl = "http://carrental-frontend.azurewebsites.net/";

document.getElementById("usernameBanner").innerHTML = " " + sessionStorage.username;