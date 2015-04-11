var map, marker, broomfield, locations;
  
  // create locations objects in an array to be used in marker functions.
 locations = [{name: "Azitra Restaurant", lat: 39.934668, long: -105.135171},{name: "Heaven Dragon Restaurant",lat: 39.939406, long: -105.089853},{name: "Corona's Mexican Grill", lat: 39.946250, long: -105.012949}];

 var ExplorerMap = function(){

 	broomfield= new google.maps.LatLng(39.925899, -105.132387);
	
	var mapOptions = {
	zoom: 12,
    center: broomfield
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

 	var infowindow = new google.maps.InfoWindow(),i;
  
  // create marker functions to place markers on map and set up the info window
 	for (i = 0; i < locations.length; i++) {
 		marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i].lat, locations[i].long),
            map: map,
            title: locations[i].name
        }); 

        google.maps.event.addListener(marker, 'click', (function(marker)  {
            return function() {
                infowindow.setContent(marker.title);
                infowindow.open(map, marker);
            }
        })(marker));
 

 	};

}

var ExplorerViewModel = function(){
	var self = this;
	
  // observe the global array of locations
  self.coordinates= ko.observableArray(locations);



	self.term = ko.observable("");
	


}


google.maps.event.addDomListener(window, 'load', ExplorerMap);

ko.applyBindings(new ExplorerViewModel());