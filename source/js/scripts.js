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
        console.log(this.element.id + ' hit');
        console.log(direction);
        if(direction == 'down'){
          $('.join-us').removeClass('visable');
        } else {
          $('.join-us').addClass('visable');
        }
      },
      offset: 400
    });

  };

  aeApp.checkMoleType = function(){
    var $a = $('#a');
    var $moleGroup = $('.mole-group');

    $moleGroup.hover(function(){
      var currentMole = $(this).attr('id');
      if (currentMole == 'a'){
        console.log('a');
      }
    });
  };

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



  // Define load object
  aeApp.onload = function() {
    aeApp.navigation();
  };

  (function($, window, document) {
    aeApp.onload();
    aeApp.ctaHover();
    aeApp.moles();
    aeApp.checkMoleType();
    aeApp.scrollTo();

  }(window.jQuery, window, document));

  var map;
  var infoWindow;
  var service;

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -33.867, lng: 151.206},
      zoom: 15,
      styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#B5293C"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"lightness":17},{"weight":1.2}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#e54e43"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"},{"lightness":17}]}]
    });

    infoWindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);

    // The idle event is a debounced event, so we can query & listen without
    // throwing too many requests at the server.
    map.addListener('idle', performSearch);
  }

  function performSearch() {
    var request = {
      bounds: map.getBounds(),
      keyword: 'Skin check'
    };
    service.radarSearch(request, callback);
  }

  function callback(results, status) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
      console.error(status);
      return;
    }
    for (var i = 0, result; result = results[i]; i++) {
      addMarker(result);
    }
  }

  function addMarker(place) {
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      // icon: {
      //   url: 'http://maps.gstatic.com/mapfiles/circle.png',
      //   anchor: new google.maps.Point(10, 10),
      //   scaledSize: new google.maps.Size(10, 17)
      // }
    });

    google.maps.event.addListener(marker, 'click', function() {
      service.getDetails(place, function(result, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          console.error(status);
          return;
        }
        console.log(place.aspects);
        infoWindow.setContent(
          '<div><h2>' + result.name + '</h2><p>' + result.formatted_address + '</p><p>' + result.formatted_phone_number + '</p><p><a href="' + result.website + '">website</a></p></div>'
        );
        infoWindow.open(map, marker);
      });
    });
  }



  // var map;
  // var infowindow;
  //
  // function initMap() {
  //   var pyrmont = {lat: -33.867, lng: 151.195};
  //
  //   map = new google.maps.Map(document.getElementById('map'), {
  //     center: pyrmont,
  //     zoom: 15
  //   });
  //
  //   infowindow = new google.maps.InfoWindow();
  //   var service = new google.maps.places.PlacesService(map);
  //   service.nearbySearch({
  //     location: pyrmont,
  //     radius: 500,
  //     query: 'restaurant',
  //     styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#B5293C"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"lightness":17},{"weight":1.2}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#e54e43"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"},{"lightness":17}]}]
  //   }, callback);
  // }
  //
  // function callback(results, status) {
  //   if (status === google.maps.places.PlacesServiceStatus.OK) {
  //     for (var i = 0; i < results.length; i++) {
  //       createMarker(results[i]);
  //     }
  //   }
  // }
  //
  // function createMarker(place) {
  //   var placeLoc = place.geometry.location;
  //   var marker = new google.maps.Marker({
  //     map: map,
  //     position: place.geometry.location
  //   });
  //
  //   google.maps.event.addListener(marker, 'click', function() {
  //     console.log(place);
  //
  //     infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
  //       'Place ID: ' + place.formatted_phone_number + '<br>' +
  //       place.formatted_address + '</div>');
  //     infowindow.open(map, this);
  //   });
  //
  // }


  // var map;
  // function initMap() {
  //   map = new google.maps.Map(document.getElementById('map'), {
  //     center: {lat: -34.397, lng: 150.644},
  //     zoom: 15,
  //     featureType:"all",
  //     styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#B5293C"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"lightness":17},{"weight":1.2}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#e54e43"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"},{"lightness":17}]}]
  //   });
  //
  //   infowindow = new google.maps.InfoWindow();
  //   var service = new google.maps.places.PlacesService(map);
  //   service.nearbySearch({
  //     location: pyrmont,
  //     radius: 500,
  //     type: ['store']
  //   }, callback);
  //
  // }
  // console.log('map');
