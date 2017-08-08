function locationSuccess(position) {
  console.log('Location success')
  var current = {lat: position.coords.latitude, lng: position.coords.longitude};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: current
  });

  $.ajax({
    method: "GET",
    url: '/json/storelocations'
  }).done(function(data){

      data.forEach(function(place, index){
        var contentString = '<div id="content">'+
                    '<div id="siteNotice">'+
                    '</div>'+
                    '<h1 id="firstHeading" class="firstHeading">'+place.company+'</h1>'+
                    '<div id="bodyContent">'+
                    '<p><b>Address:</b>: '+place.address+'</p>'+
                    '<p><b>Opening Hours:</b>: '+place.openingHours+'</p>'+
                    '</div>'+
                    '</div>';

                var infowindow = new google.maps.InfoWindow({
                  content: contentString,
                  maxWidth: 200
                });


        var placeLocation = {lat: place.latitude, lng: place.longitude};
        var marker = new google.maps.Marker({
          position: placeLocation,
          map: map,
          title: place.company
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
      });
  });

  // socket.emit('newUser', current);
  // socket.on('broadcast location', function (data) {
  //   console.log(data);

    var marker = new google.maps.Marker({
      position: current,
      map: map
    });
//  });
}

function locationError() {
  console.log('Cound not get location')

  var current = {lat: 1.307741, lng: 103.831862};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: current
  });

  $.ajax({
    method: "GET",
    url: '/json/storelocations'
  }).done(function(data){

      data.forEach(function(place, index){
        var contentString = '<div id="content">'+
                    '<div id="siteNotice">'+
                    '</div>'+
                    '<h1 id="firstHeading" class="firstHeading">'+place.company+'</h1>'+
                    '<div id="bodyContent">'+
                    '<p><b>Address:</b>: '+place.address+'</p>'+
                    '<p><b>Opening Hours:</b>: '+place.openingHours+'</p>'+
                    '</div>'+
                    '</div>';

                var infowindow = new google.maps.InfoWindow({
                  content: contentString,
                  maxWidth: 200
                });


        var placeLocation = {lat: place.latitude, lng: place.longitude};
        var marker = new google.maps.Marker({
          position: placeLocation,
          map: map,
          title: place.company
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
      });
  });

    var marker = new google.maps.Marker({
      position: current,
      map: map
    });

}

// Get user location
function initMap() {
  navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
}
