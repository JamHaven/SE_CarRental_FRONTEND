function logout() {
    localStorage.clear();
    localStorage.username = " <a href=\"index.html\">Please log in</a>";
    alert("You logged out!");
    //document.getElementById("loginMessage").innerHTML = "You successfully logged out!";
};


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
        console.log("Success! Token: " + response["token"]);
        localStorage.token = response["token"];
        localStorage.username = username;
        window.location.replace(globalFrontendUrl + "/home.html");
    }).fail(function (xhr, ajaxOptions, thrownError) {
        alert(JSON.parse(xhr.responseText).message);
    });
};

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
};
/*
    $.ajax({
        url: "https://localhost:8443/auth",
        type: "GET",
        success: function(response){
            console.log(response);
        }
    });
    $.ajax({
        url: "https://localhost:8443/cars",
        type: "GET",
        beforeSend: function(xhr) {
            if (localStorage.token) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
            }
        },
        success: function(response){
            console.log(response);
            alert("stop - rental");
        },
        error: function(response){
            window.location.replace("http://localhost/loginAgain.html");
        }
    });*/
