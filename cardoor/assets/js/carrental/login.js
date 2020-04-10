function validate(){
    alert("validate funktion");
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    this.auth(username, password);
    if ( username == "test" && password == "test"){
        alert ("Login successfully");
        window.location = "success.html"; // Redirecting to other page.
        return false;
    }
    else{
        attempt --;// Decrementing by one.
        alert("You have left "+attempt+" attempt;");
        // Disabling fields after 3 attempts. TODO: Security: Serverseitige Überprüfung!!!!
        if( attempt == 0){
            document.getElementById("username").disabled = true;
            document.getElementById("password").disabled = true;
            document.getElementById("submit").disabled = true;
            return false;
        }
    }
};

function auth(username, password) {
    $.ajax({
        url: "https://192.168.0.47:8443/auth",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            email: username,
            password: password
        }),
        success: function(response) {
            alert("stop success");
            console.log(response["token"]);
            alert("stop token");
            window.location = "faq.html"; // Redirecting to other page.
        },
        error:  function(response, textStatus) {
            console.log(textStatus + " - " + response.responseText);
            alert("stop error");
        }
    });
    $.ajax({
        url: "https://192.168.0.47:8443/auth",
        type: "GET",
        success: function(response){
            console.log(response);
        }
    });
    alert("stop");
   /* $.ajax({
            url: "https://localhost:8443/auth",data:{email:"test", password:"test"}
        }).then(function(data) {
           $('.greeting-id').append(data.id);
           $('.greeting-content').append(data.content);
        });*/
};