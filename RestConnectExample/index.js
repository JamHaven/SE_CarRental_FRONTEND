
async function getResponse(){
    var myJson = await getTestResponseJson();
    console.log(myJson);
}
async function getTestResponseJson(){
        const response = await fetch('https://localhost:8443/auth', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const myJson = await response.json(); //extract JSON from the http response
        return myJson;
}

