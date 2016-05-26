/* ====================================
   Onload functions
   ==================================== */

var aeApp = aeApp || {};

  aeApp.moles = function(){
    var $molesContainer = $('.moles');
    var numberOfMoles = 100

    function getRandom(min, max) {
      var roundedNumber = Math.random() * (max - min) + min;
      return Math.round(roundedNumber);
    }

    var moleCounter = 0;

    var growMoles = setInterval(function(){ mole() }, 3000);

    function mole(){
      moleCounter ++;
      var moleSize = getRandom(8,20);
      var sideTwo = moleSize + (getRandom(-3,3));
      var badMoles = ['asymmetry', 'border', 'color', 'diameter', 'evolution'];

      if (moleCounter%10 == 0) {
        $molesContainer.append('<div class="mole bad-mole" style="height: ' + moleSize + 'px; width: ' + sideTwo + 'px; top: ' + getRandom(5,95) + '%; left: ' + getRandom(5,95) + '%; opacity: .' + getRandom(80,99) + '"><img src="/img/moles/' + badMoles[getRandom(0,4)] + '.svg"></div>')
      } else {
        $molesContainer.append('<div class="mole ok-mole" style="height: ' + moleSize + 'px; width: ' + sideTwo + 'px; top: ' + getRandom(5,95) + '%; left: ' + getRandom(5,95) + '%; opacity: .' + getRandom(80,99) + '"></div>')
      }
      if (moleCounter == 200){
        stopGrowingMoles();
      }
    };

    $molesContainer.on('click', '.mole', function(){
      window.location="/test/"
    });


  }

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

  }(window.jQuery, window, document));
