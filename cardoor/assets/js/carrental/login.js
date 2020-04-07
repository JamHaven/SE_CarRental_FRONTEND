function validate(){
    alert("validate funktion");
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    auth();
    if ( username == "test" && password == "test"){
    alert ("Login successfully");
    window.location = "success.html"; // Redirecting to other page.
    return false;
    }
    else{
    attempt --;// Decrementing by one.
    alert("You have left "+attempt+" attempt;");
    // Disabling fields after 3 attempts.
    if( attempt == 0){
    document.getElementById("username").disabled = true;
    document.getElementById("password").disabled = true;
    document.getElementById("submit").disabled = true;
    return false;
    }
    }
    };

function auth() {
        alert("auth gedrückt");
        $.ajax({
            url: "https://localhost:8443/auth",data:{email:"test", password:"test"}
        }).then(function(data) {
           $('.greeting-id').append(data.id);
           $('.greeting-content').append(data.content);
        });
    };