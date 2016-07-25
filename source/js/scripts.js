/* ====================================
   Onload functions
   ==================================== */

var aeApp = aeApp || {};

  aeApp.scrollTo = function(){

    var joinUsBeginning = $('.ambassadors').waypoint({
      handler: function(direction) {
        if(direction == 'down'){
          $('.join-us').addClass('visable');
        } else {
          $('.join-us').removeClass('visable');
        }
      }
    });

    var joinUsEnd = $('.ambassadors-page .grow-on').waypoint({
      handler: function(direction) {
        if(direction == 'down'){
          $('.join-us').removeClass('visable');
        } else {
          $('.join-us').addClass('visable');
        }
      },
      offset: 800
    });

  };

  // aeApp.checkMoleType = function(){
  //   var $a = $('#a');
  //   var $moleGroup = $('.mole-group');
  //
  //   $moleGroup.hover(function(){
  //     var currentMole = $(this).attr('id');
  //     if (currentMole == 'a'){
  //       console.log('a');
  //     }
  //   });
  // };

  aeApp.moles = function(){
    var $molesContainer = $('.moles');
    var numberOfMoles = 100;
    var moleCounter = 0;
    function getRandom(min, max) {
      var roundedNumber = Math.random() * (max - min) + min;
      return Math.round(roundedNumber);
    }
    var growMoles = setInterval(function(){ mole(); }, 3000);
    function mole(){
      var moleSize = getRandom(6,15);
      var sideTwo = moleSize + (getRandom(-3,3));
      var badMoles = ['asymmetry', 'border', 'color', 'diameter', 'evolution'];
      moleCounter ++;
      if (moleCounter%10 === 0) {
        $molesContainer.append('<div class="mole bad-mole" style="height: ' + moleSize + 'px; width: ' + sideTwo + 'px; top: ' + getRandom(5,95) + '%; left: ' + getRandom(5,95) + '%; opacity: .' + getRandom(80,99) + '"><img src="/img/moles/' + badMoles[getRandom(0,4)] + '.svg"></div>');
      } else {
        $molesContainer.append('<div class="mole ok-mole" style="height: ' + moleSize + 'px; width: ' + sideTwo + 'px; top: ' + getRandom(5,95) + '%; left: ' + getRandom(5,95) + '%; opacity: .' + getRandom(80,99) + '"></div>');
      }
      if (moleCounter == 200){
        stopGrowingMoles();
      }
    }
  };

  aeApp.ctaHover = function(){
    $('.cta').hover(function(){
      $('.active-cta-container').addClass('hover');
    }, function(){
      $('.active-cta-container').removeClass('hover');
    });
  };

  aeApp.navigation = function(){
    var $logo = $('.logo');
    var $mainNav = $('.main-nav');
    $logo.click(function(e){
      e.preventDefault();
      $('body').addClass('active-nav');
    });

    $mainNav.on('click', function(e) {
      if (e.target !== this)
        return;
      $('body').removeClass('active-nav');
    });
  };

  aeApp.share = function(){
    $('.share a').click(function(e) {
      e.preventDefault();
    });
    $('.social-container').hover(function(){
      $('.share').addClass('off');
      $('.social-networks').addClass('on');
    },function(){
      $('.share').removeClass('off');
      $('.social-networks').removeClass('on');
    });
  };



  // Define load object
  aeApp.onload = function() {
    aeApp.navigation();
    aeApp.ctaHover();
    aeApp.moles();
    // aeApp.checkMoleType();
    aeApp.scrollTo();
    aeApp.share();
  };

  (function($, window, document) {
    aeApp.onload();


  }(window.jQuery, window, document));


  // var map, places, infoWindow;
  // var markers = [];
  // var autocomplete;
  // var MARKER_PATH = '/img/beard.svg';
  //
  //
  // function initMap() {
  //   map = new google.maps.Map(document.getElementById('map'), {
  //     center: {lat: -33.867, lng: 151.206},
  //     zoom: 15,
  //     styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#B5293C"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"lightness":17},{"weight":1.2}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#e54e43"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"},{"lightness":17}]}],
  //     mapTypeControl: false,
  //     panControl: false,
  //     zoomControl: false,
  //     streetViewControl: false
  //   });
  //
  //
  //   // Create the autocomplete object and associate it with the UI input control.
  //   autocomplete = new google.maps.places.Autocomplete(
  //       /** @type {!HTMLInputElement} */ (
  //           document.getElementById('autocomplete')), {
  //         types: ['(cities)']
  //       });
  //   places = new google.maps.places.PlacesService(map);
  //
  //   autocomplete.addListener('place_changed', onPlaceChanged);
  // }
  //
  // // When the user selects a city, get the place details for the city and
  // // zoom the map in on the city.
  // function onPlaceChanged() {
  //   var place = autocomplete.getPlace();
  //   if (place.geometry) {
  //     map.panTo(place.geometry.location);
  //     map.setZoom(15);
  //     search();
  //   } else {
  //     document.getElementById('autocomplete').placeholder = 'Enter a city';
  //   }
  // }
  //
  //
  // // Search for skin check clinics in the selected city, within the viewport of the map.
  // function search() {
  //   var search = {
  //     bounds: map.getBounds(),
  //     keyword: 'dermatology'
  //   };
  //   changeSearchLocation();
  //
  //
  //   places.nearbySearch(search, function(results, status) {
  //     if (status === google.maps.places.PlacesServiceStatus.OK) {
  //
  //       clearMarkers();
  //       // console.log(results);
  //       // Create a marker for each skin check found, and
  //       // assign a letter of the alphabetic to each marker icon.
  //       for (var i = 0; i < results.length; i++) {
  //         var markerIcon = MARKER_PATH;
  //         // Use marker animation to drop the icons incrementally on the map.
  //         markers[i] = new google.maps.Marker({
  //           position: results[i].geometry.location,
  //           animation: google.maps.Animation.DROP,
  //           icon: markerIcon
  //         });
  //         // If the user clicks a skin check marker, show the details of that skin check
  //         // in an info window.
  //         markers[i].placeResult = results[i];
  //         google.maps.event.addListener(markers[i], 'click', showInfoWindow);
  //         setTimeout(dropMarker(i), i * 100);
  //       }
  //     }
  //   });
  // }
  //
  // function clearMarkers() {
  //   for (var i = 0; i < markers.length; i++) {
  //     if (markers[i]) {
  //       markers[i].setMap(null);
  //     }
  //   }
  //   markers = [];
  // }
  //
  // function dropMarker(i) {
  //    return function() {
  //      markers[i].setMap(map);
  //    };
  //  }
  //
  // function changeSearchLocation() {
  //   if($('.location').hasClass('searched')) {
  //   } else {
  //     $('.location').addClass('searched');
  //     $('.map-form input').removeClass('span-xs-8');
  //   }
  // }
  //
  //
  //
  // // Get the place details for a skin check. Show the information in an info window,
  // // anchored on the marker for the skin check that the user selected.
  //
  // infoWindow = new google.maps.InfoWindow({
  //   content: '<div><h2>' + result.name + '</h2><p>' + result.formatted_address + '</p><p>' + result.formatted_phone_number + '</p><p><a href="' + result.website + '">website</a></p></div>'
  // });
  //
  // function showInfoWindow() {
  // var marker = this;
  // places.getDetails({placeId: marker.placeResult.place_id},
  //     function(place, status) {
  //       if (status !== google.maps.places.PlacesServiceStatus.OK) {
  //         return;
  //       }
  //       console.log(infoWindow);
  //       // infoWindow.open(map, marker);
  //
  //     });
  // }



  // This example uses the autocomplete feature of the Google Places API.
  // It allows the user to find all hotels in a given place, within a given
  // country. It then displays markers for all the hotels returned,
  // with on-click details for each hotel.

  // This example requires the Places library. Include the libraries=places
  // parameter when you first load the API. For example:
  // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

  var map, places, infoWindow, locationContent;
  var markers = [];
  var autocomplete;
  var MARKER_PATH = '/img/beard.svg';


  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -33.867, lng: 151.206},
      zoom: 15,
      styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#B5293C"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"lightness":17},{"weight":1.2}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#e54e43"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"},{"lightness":17}]}],
      mapTypeControl: false,
      panControl: false,
      zoomControl: false,
      streetViewControl: false
    });








    // Create the autocomplete object and associate it with the UI input control.
    // Restrict the search to the default country, and to place type "cities".
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */ (
            document.getElementById('autocomplete')), {
          types: ['(cities)']
        });
    places = new google.maps.places.PlacesService(map);

    autocomplete.addListener('place_changed', onPlaceChanged);

  }

  // When the user selects a city, get the place details for the city and
  // zoom the map in on the city.
  function onPlaceChanged() {
    var place = autocomplete.getPlace();
    if (place.geometry) {
      map.panTo(place.geometry.location);
      map.setZoom(15);
      search();
    } else {
      document.getElementById('autocomplete').placeholder = 'Enter a city';
    }
  }

  // Search for hotels in the selected city, within the viewport of the map.
  function search() {
    var search = {
      bounds: map.getBounds(),
      // types: ['lodging']
      keyword: 'dermatology'
    };
    changeSearchLocation();

    places.nearbySearch(search, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {

        clearMarkers();
        // Create a marker for each hotel found, and
        // assign a letter of the alphabetic to each marker icon.
        for (var i = 0; i < results.length; i++) {
          // Use marker animation to drop the icons incrementally on the map.
          markers[i] = new google.maps.Marker({
            position: results[i].geometry.location,
            animation: google.maps.Animation.DROP,
            icon: MARKER_PATH
          });
          // If the user clicks a hotel marker, show the details of that hotel
          // in an info window.
          markers[i].placeResult = results[i];
          google.maps.event.addListener(markers[i], 'click', showInfoWindow);
          setTimeout(dropMarker(i), i * 100);

        }
      }
    });
  }

  function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
      if (markers[i]) {
        markers[i].setMap(null);
      }
    }
    markers = [];
  }

  function changeSearchLocation() {
    if($('.location').hasClass('searched')) {
    } else {
      $('.location').addClass('searched');
      $('.map-form input').removeClass('span-xs-8');
    }
  }

  // Set the country restriction based on user input.
  // Also center and zoom the map on the given country.
  function setAutocompleteCountry() {
    var country = document.getElementById('country').value;
    if (country == 'all') {
      autocomplete.setComponentRestrictions([]);
      map.setCenter({lat: 15, lng: 0});
      map.setZoom(2);
    } else {
      autocomplete.setComponentRestrictions({'country': country});
      map.setCenter(countries[country].center);
      map.setZoom(countries[country].zoom);
    }
    clearMarkers();
  }

  function dropMarker(i) {
    return function() {
      markers[i].setMap(map);
    };
  }

  function showInfoWindow() {
  var marker = this;
  var infoWindowContent;

    places.getDetails({placeId: marker.placeResult.place_id},
      function(place, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          return;
        }
        infoWindowContent = '<h2>' + place.name + '</h2>' + '<p><a href="' + place.url + '">' + place.formatted_address + '</a></p>'  + '<p>' + place.formatted_phone_number + '</p>' + '<p><a href="' + place.website + '">website</a></p>';
        infoWindow = new google.maps.InfoWindow({
          content: '<div>' + infoWindowContent + '</div>'
        });
        infoWindow.open(map, marker);
    });
  }
