
function carDetailButton(id) {
  /*alert(id);
  var idStr = id.find(".car-button").text;
  alert(idStr);
  var idStr = id.innerHTML;
  alert(idStr);
  //var idStr = id.substring(id.indexOf(" "));
*/
  $.ajax({
    url: globalCarrentalUrl + "/cars/" + 2,
    credentials: 'same-origin',
    type: "GET",
  }).success(function (response) {
    console.log(response);
    var datarow = $("#datarow");
    
    var singleCarContainer = $('#CARTEMPLATE');

    for (var i = 0; i < response.length; i++) {
      singleCarContainer.find('.car-description').text(response[i].id);
      singleCarContainer.find('.rent-btn').id(response[i].id);
      singleCarContainer.find('.car-title').text(response[i].type);
      console.log(response[i].title);

      datarow.append(singleCarContainer.html());
    }
    // datarow.append(test);
  }).fail(function (response) {
    console.error(response);
  });

}

function loadData() {
  document.getElementById("CARTEMPLATE").style.display = "none";
  $.ajax({
    url: globalCarrentalUrl + "/cars",
    type: "GET",
  }).success(function (response) {
    console.log(response);
    var datarow = $("#datarow");
    // var test="";
    var singleCarContainer = $('#CARTEMPLATE');

    for (var i = 0; i < response.length; i++) {
      singleCarContainer.find('.car-description').text(response[i].id);
      singleCarContainer.find(".rent-btn").text("Book Car "+response[i].id);
      singleCarContainer.find('.car-title').text(response[i].type);
      console.log(response[i].title);

      datarow.append(singleCarContainer.html());
    }
    // datarow.append(test);
  }).fail(function (response) {
    console.error(response);
  });


}


