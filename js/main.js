var map, broomfield;

 var ExplorerMap = function(){

 	broomfield= new google.maps.LatLng(39.925899, -105.132387);
	
	var mapOptions = {
	zoom: 13,
    center: broomfield
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}

var ExplorerViewModel = function(){
	var self = this;

	self.term = ko.observable("");
}


google.maps.event.addDomListener(window, 'load', ExplorerMap);

ko.applyBindings(new ExplorerViewModel());