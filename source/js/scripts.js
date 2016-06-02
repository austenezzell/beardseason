/* ====================================
   Onload functions
   ==================================== */

var aeApp = aeApp || {};

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


// GOOGEL MAP
  aeApp.gmap = function() {


  };

  // Define load object
  aeApp.onload = function() {
    aeApp.navigation();
  };

  (function($, window, document) {
    aeApp.gmap();
    aeApp.onload();
    aeApp.ctaHover();
    aeApp.moles();
    aeApp.checkMoleType();

  }(window.jQuery, window, document));


  var map;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8,
      featureType:"all",
      styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
    });
  }
  console.log('map');
