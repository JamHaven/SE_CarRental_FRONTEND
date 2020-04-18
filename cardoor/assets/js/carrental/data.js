
function loadNewCarPage(id){
  var idStr = id.textContent;
   idStr = idStr.substring(idStr.indexOf(" ") + 5);
  window.location.replace(globalFrontendUrl + "/cardoor/bookcar.html?ID="+idStr);
   
}

function carDetailPage() {
  document.getElementById("CARTEMPLATE").style.display = "none";
  var parameters = location.search.substring(1).split("&");

  var temp = parameters[0].split("=");
  var id = unescape(temp[1]);
  //alert(id);
  //var idStr = idTEMP;
  //var id = idStr.substring(idStr.indexOf(" ") + 4);
  //alert(id);
  
  $.ajax({
    url: globalCarrentalUrl + "/cars/" + id,
    //credentials: 'same-origin',
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

    //for (var i = 0; i < response.length; i++) {
      singleCarContainer.find('.car-description').text(response.id);
      singleCarContainer.find('.rent-btn').text("Book " + response.id);

      singleCarContainer.find('.car-title').text(response.type);

      datarow.append(singleCarContainer.html());

      $("#car-list-area").find('.rent-btn').text("Book Car " + response.id);
    //}
    // datarow.append(test);
  }).fail(function (response) {
    console.error(response);
  });

}

function stopBooking(id) { 
  var idStr = id.textContent;
   idStr = idStr.substring(20);
    //alert(idStr);
   $.ajax({
    url: globalCarrentalUrl + "/rental/"+idStr,
    crossDomain: true,
    type: "DELETE",
    beforeSend: function (xhr) {
      if (localStorage.token) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
      }
    },
  }).success(function (response) {
    console.log(response);
  }).fail(function (response) {
    console.error(response);
  });
}

function book(id) { 
  var idStr = id.textContent;
   idStr = idStr.substring(9);
    alert(idStr);
   $.ajax({
    url: globalCarrentalUrl + "/rental",
    crossDomain: true,
    contentType: "application/json; charset=utf-8",
    type: "POST",
    data: JSON.stringify({  // ?????
      carId: idStr
  }),
    beforeSend: function (xhr) {
      if (localStorage.token) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
      }
    },
  }).success(function (response) {
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
      singleCarContainer.find('.car-description').text("Booking ID " + response[i].id);
      singleCarContainer.find(".rent-btn").text("Stop Booking for ID " + response[i].id);
      singleCarContainer.find('.car-title').text("Car ID " + response[i].carId);
      console.log(response[i].title);

      datarow.append(singleCarContainer.html());
    }
    // datarow.append(test);
  }).fail(function (response) {
    console.error(response);
  });
}



