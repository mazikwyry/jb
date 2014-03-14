	      
function load_trans(){
  $('[data-trans]').each(function() {
    $(this).text($.t($(this).data('trans')));
  });
}

function listenWidth(){     
  $("section").css("height", $(window).height()+"px");
}



function parallaxScroll(){
    var scrolled = $(window).scrollTop();
    var section_height = $(window).height();

    $("section").each(function(index, el) {
      var current = parseInt($(this).data("order"));
      
      if(current>0 && (scrolled > (current*section_height-(section_height/1.2))) && (scrolled < (current*section_height-50))){
        disable_scroll();
        var minus = 0;
        if(scrolled < oldSrcoll) 
          minus = 1;
        $('html, body').stop(true,true).animate({
          scrollTop: (current-minus)*section_height
        }, 100);
        setTimeout(function() {
         enable_scroll();
        },400);
        
      }

      if((scrolled > (current*section_height-100)) && (scrolled < ((current+0.5)*section_height))){
        $('.bg'+current).addClass('visible');
        $(this).addClass('active-section');
      }
      else if (scrolled > ((current+0.5)*section_height) || scrolled < (current*section_height-100)){
        $('.bg'+current).removeClass('visible');
        $(this).removeClass('active-section');
      }

    });
    oldSrcoll = scrolled;
}


var keys = [37, 38, 39, 40];

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function wheel(e) {
  preventDefault(e);
}

function disable_scroll() {
  if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', wheel, false);
  }
  window.onmousewheel = document.onmousewheel = wheel;
  document.onkeydown = keydown;
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;  
}

$.i18n.init({
  lng: 'en',
  debug: true
}, function() {
  load_trans();
});


function moveBackdrop(){
    x += maxspeed * rate;
    max = $(".active-cat").width() - $('.photos').width() + $('.photos').offset().left
    x > 0 ? x=0 : true;
    x < -max ? x=-max : true;
    var newpos = x+'px';
    backdrop.css('left',newpos);
}

/*--------------- DOCUMENT READY --------------*/
var oldSrcoll;

 $(document).ready(function($) {

  oldSrcoll = $(window).scrollTop();

  $("[data-lang]").click(function(event) {
    i18n.setLng($(this).data('lang'), function(t) {
      load_trans();
     });
  });

  $('nav li').click(function(){
      $('html, body').animate({
          scrollTop: $( $.attr(this, 'rel') ).offset().top
      }, 500);
      return false;
  });

  $("body").on('click', '.play', function(event) {
    $("audio").each(function(index, el) {
      $(this)[0].pause();
      $(this).prev(".pause").attr({
        class: 'play',
        src: 'gfx/play.png'
      });
    });
    $(this).attr({
      class: 'pause',
      src: 'gfx/pause.png'
    });
    var mediaElement = $(this).next()[0];
    var play = $(this);
    mediaElement.play();
    setInterval(function () {
      var procent_progress = mediaElement.currentTime / mediaElement.duration * 100;
      play.parents(".bio-box").children('.bio-desc').children('.progress').css("width", procent_progress + "%");
    },200);
  });

  $("body").on('click', '.pause', function(event) {
    $(this).next()[0].pause();
    $(this).attr({
      class: 'play',
      src: 'gfx/play.png'
    });
  });


  listenWidth();
  $(document).load($(window).bind("resize", listenWidth));
  $(window).bind('scroll',function(e){ 
      parallaxScroll();
  });

  var x=0,
      y=0,
      rate=0,
      maxspeed=20;
  var backdrop = $('.photo-box');

  $('.direction').mousemove(function(e){
      var $this = $(this);
      var left = $this.is('.left_d');

      if (left){
          var w = $this.width();
          rate = 1 -((e.pageX - $(this).offset().left + 1)/w);
      }
      else{
          var w = $this.width();
          rate = -((e.pageX - $(this).offset().left + 1)/w);
      }
  });

  $('.direction').hover(
      function(){
          var scroller = setInterval( moveBackdrop, 10 );
          $(this).data('scroller', scroller);
      },
      function(){
          var scroller = $(this).data('scroller');
          clearInterval( scroller );
      }
  );   

  $('.photo-cat').click(function(event) {
    var active = $('.active-cat');
    active.removeClass('active-cat');
    active.fadeOut('slow');
    x=0;
    rate=0;
    $(".direction").each(function(index, el) {
      var scroller = $(this).data('scroller');
      clearInterval( scroller );
    });
    $('.photo-box').animate({"left":"0px"});
    $("#"+$(this).data("rel")).addClass('active-cat').fadeIn('slow');
  });

});

