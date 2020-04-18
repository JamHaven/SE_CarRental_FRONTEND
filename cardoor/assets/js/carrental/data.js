function carDetailButton(id) {
  /*alert(id);
  var idStr = id.find(".car-button").text;
  alert(idStr);
  var idStr = id.innerHTML;
  alert(idStr);
  //var idStr = id.substring(id.indexOf(" "));
*/
  var idStr = id.textContent;
  var idStr = idStr.substring(idStr.indexOf(" ") + 4);
  alert(idStr);
  $.ajax({
    url: globalCarrentalUrl + "/cars/" + idStr,
    //credentials: 'same-origin',
    type: "GET",
    beforeSend: function (xhr) {
      if (localStorage.token) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
      }
    },
  }).success(function (response) {
    console.log(response);
    window.location.replace(globalFrontendUrl + "/cardoor/bookcar.html");
    var datarow = $("#datarow");

    var singleCarContainer = $('#CARTEMPLATE');

    for (var i = 0; i < response.length; i++) {
      singleCarContainer.find('.car-description').text(response[i].id);
      singleCarContainer.find('.rent-btn').text(response[i].id);

      singleCarContainer.find('.car-title').text(response[i].type);
      console.log(response[i].title);

      datarow.append(singleCarContainer.html());
    }
    // datarow.append(test);
  }).fail(function (response) {
    console.error(response);
  });

}

function stopBooking(id) { }

function loadData() {
  document.getElementById("CARTEMPLATE").style.display = "none";
  $.ajax({
    url: globalCarrentalUrl + "/cars",
    crossDomain: true,
    //xhrFields: { withCredentials: true },
    type: "GET",
    beforeSend: function (xhr) {
      if (localStorage.token) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
      }
    },
  }).success(function (response) {
    console.log(response);
    var datarow = $("#datarow");
    // var test="";
    var singleCarContainer = $('#CARTEMPLATE');

    for (var i = 0; i < response.length; i++) {
      singleCarContainer.find('.car-description').text(response[i].id);
      singleCarContainer.find(".rent-btn").text("Book Car " + response[i].id);

      singleCarContainer.find('.car-title').text(response[i].type);
      console.log(response[i].title);

      datarow.append(singleCarContainer.html());
    }
    // datarow.append(test);
  }).fail(function (response) {
    console.error(response);
  });
}

function mybookings() {
  document.getElementById("CARTEMPLATE").style.display = "none";
  $.ajax({
    url: globalCarrentalUrl + "/rental",
    crossDomain: true,
    //xhrFields: { withCredentials: true },
    type: "GET",
    beforeSend: function (xhr) {
      if (localStorage.token) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
      }
    },
  }).success(function (response) {
    console.log(response);
    var datarow = $("#datarow");
    // var test="";
    var singleCarContainer = $('#CARTEMPLATE');

    for (var i = 0; i < response.length; i++) {
      singleCarContainer.find('.car-description').text(response[i].id);
      singleCarContainer.find(".rent-btn").text("Stop Booking for Car " + response[i].id);
      singleCarContainer.find('.car-title').text(response[i].type);
      console.log(response[i].title);

      datarow.append(singleCarContainer.html());
    }
    // datarow.append(test);
  }).fail(function (response) {
    console.error(response);
  });
}

//Global function so it can be accessed by home.html
window.initMap =function(){
  //This could probably optimized but freshly queries the cars from the backend
  $.ajax({
    url: globalCarrentalUrl + "/cars",
    crossDomain: true,
    //xhrFields: { withCredentials: true },
    type: "GET",
    beforeSend: function (xhr) {
      if (localStorage.token) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
      }
    },
  }).success(function (response) {


    let geoJson= {
      "type": "FeatureCollection",
      "features": []};

    let feature = {};

    //Parse response and change the inputs into geoJSON - feature format
    for (let i = 0; i < response.length; i++) {
      feature = {};
      feature["type"] = "Feature";
      feature["geometry"] = {"type": "Point", "coordinates": [response[i].longitude, response[i].latitude]};
      feature["properties"] = {"cartype": response[i].type};
      geoJson.features.push(feature);
    }
    //Initialize the map
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: {lat: 48.217627, lng: 16.395179}
    });

    //Add the parsed geoJSON data into the google Maps map
    map.data.addGeoJson(geoJson);

  }).fail(function (response) {
    console.error(response);
  });




}



