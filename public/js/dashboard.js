function locationSuccess(position) {
  console.log('Location success')
  var current = {lat: position.coords.latitude, lng: position.coords.longitude};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: current
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
}

// Get user location
function initMap() {
  navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
}
