var infowindow, map, marker, broomfield, locations;
var markers = [];

  // create locations objects in an array to be used in marker functions.
 locations = [{name: "Azitra Restaurant", lat: 39.9276300, long: -105.1340130, markerNum: 0, icon: 'img/indian-cuisine.png'},{name: "P.F. Chang's",lat: 39.9302280, long: -105.1344480, markerNum: 1, icon: 'img/asian-cuisine.png'},{name: "3 Margaritas", lat: 39.9139220, long: -105.0725720, markerNum: 2, icon: 'img/mexican-cuisine.png'}, {name: "ZO Sushi and Thai", lat: 39.9154820, long:-105.0560200, markerNum: 3, icon: 'img/sushi.png'},{name: "Village Tavern", lat: 39.9318740 , long: -105.1339390, markerNum: 4, icon: 'img/restaurant.png'},{name: "Flatz Restaurant", lat: 39.9269130 , long: -105.1293530 , markerNum: 5, icon: 'img/restaurant.png'}];

//create image references to be added to api url's
 imageRefs = [
 {key: "CnRnAAAA3NGXX-2qaNflzChWjxrzpHMhrp7xd_zfDoKIe_78WhYfmMXdByfaRn4xr6O2HEDmtFQKMQcvZ8-DYWstI2c2tDdj_LmzYeJULrxIdCqQx3ecrSPOiCMlIxqGqu_P47DpBm0cCNvOWQ1fIfjHPWeDexIQFFlsFYtlOK3m06INF4Ye_BoUvHsyKcoOu9BaP8xjsVf6dRidVwo"},
 {key:"CnRnAAAAFQgfIdSdX-XgmT-1Ma-p-xsFc4ibB8Y2I5hRnclfESY_Q2tGbJB674aXJwpz6_qf3CgGTp9pD5QwPzx83P_3ABEpdz25-pbiI90IySq2F1p1529SLZrGf8eIcSyMDDNLX3auVEgmcFYtyAejBW3p4hIQ5z-pcgD3Xuh0CcDNkFsRwhoUFmNQ7xPJ8sErfAn50Ixn99h_xzc"},
 {key:"CnRoAAAAlLzAe6lpWBBnufio_sU2snpzr955WUMe2_mJHoyiDOhZhpcIJpKdA-5IDBEcgtx4yynIXY7UMMzEp2mELRVCTs09iNi1MhwlnaI3lV-KK_rm4xERR_5ZrciGo8VlJKGaa6AxnxoXbBJeAHNNiJHNmxIQ8-dJuc5Ybu22mH4PuxvZlxoUTy981qw51u0wH5BkT_XlqKgIe6Q"},
 {key:"CnRuAAAAVZvId2jQyLv7ldiUcCLrj3NhFynsM4Wv72Bmw3_QmZetUJVxo5FtSMdMsD3bfBUUOToOpdoH_SDpmsli1EVnN5J77mYKqNT7jtXBryNSep6q095sqGX1j9PVEoL3mdTWcsc0rUnpJe8d5GTyfAb96xIQ5p07_IH5keYVW_mhn9F53xoUTM3__Bshvt-ZZGIGdRgvHNR8voY"},
 {key:"CnRoAAAA9BC4J-VXLiik7avSNfEIJyzvWAhMPMFuy10mdN5yqT1hNio9_B3Uifr8f9_cfL-FRlniLgGHHfU8RPIVcOHrlDwetsj1Us6ystFjj4vj8myyHNmSYldqvkzCPlo84couOj691t3FEAF3KYLd96nG9RIQRAvZzigo2Hiaa248LpJcoxoURjiTmN5jf__lQWEXhlZdEpizA1E"},
 {key:"CnRnAAAADh1A0mqzYDcZo4XLJKgV78lxL8CMDXd9RoxJcJcw_drtCQzXekKiT2IYRwsbblNa6gq3IH922rGFjnhv38ZkKa6Of98rm8IJraaBusjrWVLvW4-BRoKqkcefcowOL-Kyb7Gu1w4l31XW-kHMxxg67BIQNto6_7Ktc21DE3fLjnbwyhoUx7RpjsdvDSVjv9QtLIbVnsqfHR4"}];
 var ExplorerMap = function(){

  broomfield= new google.maps.LatLng(39.922802, -105.118662);

  var mapOptions = {
    zoom: 13,
    center: broomfield
  };


  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

// create marker functions to place markers on map and set up the info window
  infowindow = new google.maps.InfoWindow();
  var i;

  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i].lat, locations[i].long),
            map: map,
            title: locations[i].name,
            icon: locations[i].icon,
            photoRef: imageRefs[i].key
        });

        google.maps.event.addListener(marker, 'click', (function(marker)  {
            return function() {

                // set info window with a title and open the info window
                //infowindow.setTitle(marker.title);
                map.panTo(marker.getPosition());
                infowindow.setContent(marker.title+"<div id='content'></div>");
                infowindow.open(map, marker);

              // add marker animation by setting and timing out animation
                marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function(){ marker.setAnimation(null); }, 750);
                getApi(marker);

               // set up photo api link for specific markers
              var photoApiLink = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=260&maxheight=260&photoreference=' + marker.photoRef;
               var photoLink = photoApiLink + '&key=AIzaSyBFcpEe2y26sK1nKhQUhzKLQGdMPw087u8';

                //grab the Restaurant image view by its id and set the image source
                var restaurantImg= document.getElementById('place-photo');
                restaurantImg.src= photoLink;

            };
        })(marker));

        markers.push(marker);
  }
};

var ExplorerViewModel = function(){
  var self = this;

  // observe the global array of locations
  self.locations= ko.observableArray(locations);

  self.markers=ko.observableArray(markers);

  self.filter= ko.observable('');

  // Create function to open info windows in response to clicks on list-view.
  self.OpenInfoWindow= function(locations){

    var point= markers[locations.markerNum];

      map.panTo(point.getPosition());

    // set info window with a title and open the info window
     infowindow.open(map, point);
     infowindow.setContent(point.title+"<div id='content'></div>");

     // add marker animation by setting and timing out animation
     point.setAnimation(google.maps.Animation.BOUNCE);
     setTimeout(function(){ point.setAnimation(null); }, 750);

      // set up photo api link for specific markers
              var photoApiLink = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=260&maxheight=260&photoreference=' + point.photoRef;
               var photoLink = photoApiLink + '&key=AIzaSyBFcpEe2y26sK1nKhQUhzKLQGdMPw087u8';

      //grab the Restaurant image view by its id and set the image source
                var restaurantImg= document.getElementById('place-photo');
                restaurantImg.src= photoLink;

     getApi(point);

 };
 //Handles the showing and hiding of all markers depending on setMap() value
  self.showOrHideMarkers= function(state){
           for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(state);
          }
        };
// returns array to the filteredmarkers array definition
  self.filterArray = function(filter){
       return ko.utils.arrayFilter(self.locations(), function(location) {
        return location.name.toLowerCase().indexOf(filter) >= 0;
       });
  };
//displays selected markers
  self.displaySelected = function(filteredmarkers){
  for (var i = 0; i < filteredmarkers.length; i++) {
             markers[filteredmarkers[i].markerNum].setMap(map);
            }
      };

//Manages filtering of list view and markers
self.filterList = function(){
var filter = self.filter().toLowerCase();
  if (!filter) {
      self.showOrHideMarkers(map);
     return self.locations();
  } else {

  self.showOrHideMarkers(null);
  var filteredmarkers = [];
  filteredmarkers = self.filterArray(filter);
  self.displaySelected(filteredmarkers);
  return filteredmarkers;

  }
};

};

var getApi = function( marker){

        var $windowContent = $('#content');

        var lat= marker.position.lat();
        var long = marker.position.lng();


        // the foursquare api url
        var url = 'https://api.foursquare.com/v2/venues/search?client_id=' +
            'NFLHHJ350PG5BFEFQB2AZY2CJ3TUCUYR3Q14QPL5L35JT4WR' +
            '&client_secret=WDNBZ4J3BISX15CF1MYOBHBP2RUSF2YSRLVPZ3F' +
            '4WZUYZGWR&v=20130815' + '&ll=' + lat + ',' +
           long + '&query=\'' + marker.title + '\'&limit=1';

  $.getJSON(url, function(response){

        //place the data returned in variables and append this data to the info window

         var venue = response.response.venues[0];
         var venuePhone = venue.contact.formattedPhone;
         var venueAddress = venue.location.formattedAddress;

          if (venuePhone) {$windowContent.append('<p>'+venuePhone+'</p>');
          }

          else{
                  $windowContent.append('<p> Phone number not found</p>');
          }

          if (venueAddress) {$windowContent.append('<p>'+venueAddress+'</p>');
          }

          else{
                  $windowContent.append('<p> Address not found </p>');
          }


  }).error(function(e){
    $windowContent.text('Content could not be loaded');

  });

};
google.maps.event.addDomListener(window, 'load', ExplorerMap);
ko.applyBindings(new ExplorerViewModel());