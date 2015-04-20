var infowindow, map, marker, broomfield, locations;
var markers = [];
  
  // create locations objects in an array to be used in marker functions.
 locations = [{name: "Azitra Restaurant", lat: 39.934668, long: -105.135171, markerNum: 0},{name: "Heaven Dragon Restaurant",lat: 39.939406, long: -105.089853, markerNum: 1},{name: "Corona's Mexican Grill", lat: 39.946250, long: -105.012949, markerNum: 2}];



 var ExplorerMap = function(){


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
  self.hideMarkers= function(){
           for (var i = 0; i < self.markers.length; i++) {
            markers[i].marker.setMap(null);
          };
        }

  self.showAllMarkers = function(){
           for (var i = 0; i < self.markers.length; i++) {
            markers[i].marker.setMap(map);
          };
  }

  self.filterArray = function(filter){
       return ko.utils.arrayFilter(self.locations(), function(location) {
        return location.name.toLowerCase().indexOf(filter) >= 0;   

                                 
       });

  }

  self.displayMarkers = function(filteredmarkers){
  for (var i = 0; i < filteredmarkers.length; i++) {
             markers[filteredmarkers[i].markerNum].setMap(map);
            }
      }



self.filterLists = function(){
var filter = self.filter().toLowerCase();
  if (!filter) {
      self.showAllMarkers();
     return self.locations();
  } else {

  self.hideMarkers();
  var filteredmarkers = [];
  filteredmarkers = self.filterArray(filter);
  self.displayMarkers(filteredmarkers);
  return filteredmarkers;

  }
}

//  //filter the items using the filter text
//     self.filteredItems = ko.computed(function() {
//     var filter = self.filter().toLowerCase();
//     if (!filter) {
      
//       self.showAllMarkers();
//         return self.locations();

//     } else {

       
//         return ko.utils.arrayFilter(self.locations(), function(location) {
//             return location.name.toLowerCase().indexOf(filter) >= 0;   

                                 
//         });
//         self.hideMarkers();

//         self.showSelectedMarkers();
           


//     }
// }, self);   
}




google.maps.event.addDomListener(window, 'load', ExplorerMap);

ko.applyBindings(new ExplorerViewModel());