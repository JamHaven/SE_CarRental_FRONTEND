function logout() {
    $.ajax({
        url: globalCarrentalUrl + "/authentication-service/logout",
        type: "POST",
        contentType: "application/json; charset=utf-8",
    }).success(function (response) {
        sessionStorage.clear();
        localStorage.clear();
        sessionStorage.username = " <a href=\"index.html\">Please log in</a>";
        alert("You logged out!");
        console.log("Success! " + response);
    }).fail(function (xhr, ajaxOptions, thrownError) {
        console.error(xhr);
    });
    sessionStorage.clear();
    localStorage.clear();
    sessionStorage.username = " <a href=\"index.html\">Please log in</a>";
    alert("You logged out!");

}


function authenticate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    $.ajax({
        url: globalCarrentalUrl + "/authentication-service/auth",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        crossDomain: true,
        data: JSON.stringify({
            email: username,
            password: password
        }),
    }).success(function (response) {
        console.log("Success! " + response);
        localStorage.token = response["token"];
        sessionStorage.username = username;
        window.location.replace(globalFrontendUrl + "/cardoor/home.html");
    }).fail(function (xhr, ajaxOptions, thrownError) {
        console.error(xhr);
    });
}

function register() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var currency = document.getElementById("currency").value;
    $.ajax({
        url: globalCarrentalUrl + "/authentication-service/registration",

        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            email: username,
            password: password,
            currency: currency
        }),
    }).success(function (response) {
        console.log("Success!");
        alert(username + " registered successfully. Please log in.");
        window.location.replace(globalFrontendUrl);
    }).fail(function (xhr, ajaxOptions, thrownError) {
        alert(JSON.parse(xhr.responseText).message);
    });
}

