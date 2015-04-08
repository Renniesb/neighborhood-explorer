var map, broomfield;

 function initializeMap(){

 	broomfield= new google.maps.LatLng(39.925899, -105.132387);
	
	var mapOptions = {
	zoom: 13,
    center: broomfield
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}

google.maps.event.addDomListener(window, 'load', initializeMap);
