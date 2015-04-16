var infowindow, map, marker, broomfield, locations;

var filteredMarkers=[];
var markers = [];
  
  // create locations objects in an array to be used in marker functions.
 locations = [{name: "Azitra Restaurant", lat: 39.934668, long: -105.135171, markerNum: 0},{name: "Heaven Dragon Restaurant",lat: 39.939406, long: -105.089853, markerNum: 1},{name: "Corona's Mexican Grill", lat: 39.946250, long: -105.012949, markerNum: 2}];



 var ExplorerMap = function(){

  // Sets the map on all markers in the array.
 function setAllMap(map) {
  for (var i = 0; i < filteredMarkers.length; i++) {
    filteredMarkers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setAllMap(map);
}

// Deletes all markers in the array by removing references to them.


function filterMarkers() {
    
    
    
    for (var i = 0; i < locations.length; i++) {
      
        filteredMarkers.push(markers[locations[i].markerNum]);


    };
  
    clearMarkers();
    setAllMap();

    
  }   









 	broomfield= new google.maps.LatLng(39.925899, -105.132387);
	
	var mapOptions = {
	  zoom: 12,
    center: broomfield
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

 	infowindow = new google.maps.InfoWindow();
  var i;
  // create marker functions to place markers on map and set up the info window
 	for (i = 0; i < locations.length; i++) {
 		marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i].lat, locations[i].long),
            map: map,
            title: locations[i].name
        }); 

    

        google.maps.event.addListener(marker, 'click', (function(marker)  {
            return function() {

                // set info window with a title and open the info window
                infowindow.setContent(marker.title);
                infowindow.open(map, marker);

              // add marker animation by setting and timing out animation
                marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function(){ marker.setAnimation(null); }, 750);
                            
            }
        })(marker));

        markers.push(marker);

 	};



}

var ExplorerViewModel = function(){
	var self = this;
	
  // observe the global array of locations
  self.locations= ko.observableArray(locations);

  self.markers=ko.observableArray(markers);

  self.filter= ko.observable('');

  // Create function to open info windows in response to clicks on list-view. 
  self.OpenInfoWindow= function(locations){

    var point= markers[locations.markerNum];

    // set info window with a title and open the info window
     infowindow.open(map, point);
     infowindow.setContent(point.title);

     // add marker animation by setting and timing out animation
     point.setAnimation(google.maps.Animation.BOUNCE);
     setTimeout(function(){ point.setAnimation(null); }, 750);

 }



 

 //filter the items using the filter text
    self.filteredItems = ko.computed(function() {
    var filter = self.filter().toLowerCase();
    if (!filter) {
        filteredMarkers=[];
        return self.locations();
    } else {
        return ko.utils.arrayFilter(locations, function(location) {
            return location.name.toLowerCase().indexOf(filter) >= 0;
                       
        });
    }
}, self);   
}






google.maps.event.addDomListener(window, 'load', ExplorerMap);

ko.applyBindings(new ExplorerViewModel());