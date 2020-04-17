function logout() {
    sessionStorage.clear();
    localStorage.clear();
    sessionStorage.username = " <a href=\"index.html\">Please log in</a>";
    alert("You logged out!");
    //document.getElementById("loginMessage").innerHTML = "You successfully logged out!";
}


function authenticate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    $.ajax({
        url: globalCarrentalUrl + "/auth",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            email: username,
            password: password
        }),
    }).success(function (response) {
        //alert("success");
        console.log("Success! "+response);
        //localStorage.token = response["token"];
        sessionStorage.username = username;
        window.location.replace(globalFrontendUrl + "/cardoor/home.html");
    }).fail(function (xhr, ajaxOptions, thrownError) {
        console.error(xhr);
    });
}

function register() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    $.ajax({
        url: globalCarrentalUrl + "/registration",

        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            email: username,
            password: password
        }),
    }).success(function (response) {
        //alert("success");
        console.log("Success!");
        //localStorage.token = response["token"];
        //localStorage.username = username;
        alert(username+" registered successfully. Please log in.");
        window.location.replace(globalFrontendUrl);
    }).fail(function (xhr, ajaxOptions, thrownError) {
        alert(JSON.parse(xhr.responseText).message);
    });
}

