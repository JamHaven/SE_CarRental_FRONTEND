
function loadNewCarPage(id) {
  var idStr = id.textContent;
  idStr = idStr.substring(idStr.indexOf(" ") + 5);
  window.location.replace(globalFrontendUrl + "/cardoor/bookcar.html?ID=" + idStr);

}

function carDetailPage() {
  document.getElementById("CARTEMPLATE").style.display = "none";
  var parameters = location.search.substring(1).split("&");

  var temp = parameters[0].split("=");
  var id = unescape(temp[1]);

  $.ajax({
    url: globalCarrentalUrl + "/cars/" + id,
    type: "GET",
    contentType: "application/json; charset=utf-8",
    beforeSend: function (xhr) {
      if (localStorage.token) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
      }
    },
  }).success(function (response) {
    console.log(response);
    var datarow = $("#datarow");

    var singleCarContainer = $('#CARTEMPLATE');

    singleCarContainer.find('.car-description').text(response.id);
    singleCarContainer.find('.car-price').text("Car price /h: " + response.pricePerHour + " " + localStorage.currency);
    singleCarContainer.find('.rent-btn').text("Book " + response.id);

    singleCarContainer.find('.car-title').text(response.type);

    datarow.append(singleCarContainer.html());

    $("#car-list-area").find('.rent-btn').text("Book Car " + response.id);
  }).fail(function (response) {
    console.error(response);
  });

}

function stopBooking(id) {
  var idStr = id.textContent;
  idStr = idStr.substring(20);
  $.ajax({
    url: globalCarrentalUrl + "/rental/" + idStr,
    crossDomain: true,
    contentType: "application/json; charset=utf-8",
    type: "PUT",
    data: JSON.stringify({
      id: idStr,

    }),
    beforeSend: function (xhr) {
      if (localStorage.token) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
      }
    },
  }).success(function (response) {
    alert("Total cost: " + response["price"]);
    console.log(response);
  }).fail(function (response) {
    console.error(response);
  });
}

function populateCurrencyDropbox() {
  $.ajax({
    url: globalCarrentalUrl + "/currencies",
    type: "GET",
    contentType: "application/json; charset=utf-8",
    beforeSend: function (xhr) {
      if (localStorage.token) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
      }
    },
  }).success(function (response) {
    var len = response.length;

    $("#currencyDropDown").empty().append("<option selected>Change Currency</option>");
    for (var i = 0; i < len; i++) {
      var currency = response[i];

      $("#currencyDropDown").append("<option value='" + currency + "'>" + currency + "</option>");
    }
  });
}

function book(id) {
  var idStr = id.textContent;
  idStr = idStr.substring(9);
  $.ajax({
    url: globalCarrentalUrl + "/rental",
    crossDomain: true,
    contentType: "application/json; charset=utf-8",
    type: "POST",
    data: JSON.stringify({
      carId: idStr
    }),
    beforeSend: function (xhr) {
      if (localStorage.token) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
      }
    },
  }).success(function (response) {
    alert("Success");
    console.log(response);
  }).fail(function (response) {
    console.error(response);
  });
}

function loadData() {
  document.getElementById("CARTEMPLATE").style.display = "none";
  $.ajax({
    url: globalCarrentalUrl + "/cars",
    crossDomain: true,
    type: "GET",
    beforeSend: function (xhr) {
      if (localStorage.token) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
      }
    },
  }).success(function (response) {
    console.log(response);
    var datarow = $("#datarow");
    var singleCarContainer = $('#CARTEMPLATE');

    for (var i = 0; i < response.length; i++) {
      singleCarContainer.find('.car-description').text(response[i].id);
      singleCarContainer.find(".rent-btn").text("Book Car " + response[i].id);
      singleCarContainer.find('.car-price').text("Car price /h: " + response[i].pricePerHour + " " + localStorage.currency);
      singleCarContainer.find('.car-title').text(response[i].type);
      console.log(response[i].title);

      datarow.append(singleCarContainer.html());
    }
  }).fail(function (response) {
    console.error(response);
  });
}

function mybookings() {
  document.getElementById("CARTEMPLATE").style.display = "none";
  $.ajax({
    url: globalCarrentalUrl + "/rental",
    crossDomain: true,
    type: "GET",
    beforeSend: function (xhr) {
      if (localStorage.token) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
      }
    },
  }).success(function (response) {
    console.log(response);
    var datarow = $("#datarow");
    var singleCarContainer = $('#CARTEMPLATE');

    for (var i = 0; i < response.length; i++) {
      singleCarContainer.find('.car-title').text("Car ID " + response[i].carId);
      singleCarContainer.find('.car-description').text("Booking ID " + response[i].id);
      singleCarContainer.find(".rent-btn").text("Already Stopped for " + response[i].id);
      singleCarContainer.find(".starttime").text("Start time: " + response[i].startTime);
      singleCarContainer.find(".endtime").text("End time: " + response[i].endTime);
      singleCarContainer.find(".price").text("Total cost: " + response[i].price + " " + localStorage.currency);

      if (response[i].endTime == null) {
        singleCarContainer.find(".endtime").text("ACTIVE");
        singleCarContainer.find(".rent-btn").text("Stop Booking for ID " + response[i].id);
        singleCarContainer.find(".price").text("Price: not available yet");
      }
      console.log(response[i].title);

      datarow.append(singleCarContainer.html());
    }
  }).fail(function (response) {
    console.error(response);
  });
}


//Global function so it can be accessed by home.html
window.initMap = function () {
  var infowindow = new google.maps.InfoWindow();
  //This could probably optimized but freshly queries the cars from the backend
  $.ajax({
    url: globalCarrentalUrl + "/cars",
    crossDomain: true,
    type: "GET",
    beforeSend: function (xhr) {
      if (localStorage.token) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
      }
    },
  }).success(function (response) {


    let geoJson = {
      "type": "FeatureCollection",
      "features": []
    };

    let feature = {};

    //Parse response and change the inputs into geoJSON - feature format
    for (let i = 0; i < response.length; i++) {
      feature = {};
      feature["type"] = "Feature";
      feature["geometry"] = { "type": "Point", "coordinates": [response[i].longitude, response[i].latitude] };
      feature["properties"] = { "cartype": response[i].type, "priceperhour": response[i].pricePerHour };
      geoJson.features.push(feature);
    }
    //Initialize the map
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: { lat: 48.217627, lng: 16.395179 }
    });

    //Add the parsed geoJSON data into the google Maps map
    map.data.addGeoJson(geoJson);
    map.data.addListener('click', function (event) {
      var feat = event.feature;
      var html = "Available cartype: <b>" + feat.getProperty('cartype') +
        "<br> Price per hour: " + Math.round((feat.getProperty('priceperhour') + Number.EPSILON) * 100) / 100 + " " + localStorage.currency;
      infowindow.setContent(html);
      infowindow.setPosition(event.latLng);
      infowindow.setOptions({ pixelOffset: new google.maps.Size(0, -34) });
      infowindow.open(map);
    });
  }).fail(function (response) {
    console.error(response);
  });
}



