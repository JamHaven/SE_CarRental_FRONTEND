
async function getResponse(){
    var myJson = await getTestGetResponseJson();
    console.log(myJson);
}
async function getTestGetResponseJson(){
        const response = await fetch('https://localhost:8443/auth', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const myJson = await response.json(); //extract JSON from the http response
        return myJson;
}
async function getTestPostResponseJson(){
    const response = await fetch('https://localhost:8443/auth', {
    method: 'POST',
    body: '', //TODO create request body
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const myJson = await response.json(); //extract JSON from the http response
  return myJson;
}