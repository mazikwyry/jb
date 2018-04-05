function load_trans(){
  $('[data-trans]').each(function() {
    $(this).html($.t($(this).data('trans')));
  });
}

function listenWidth(){     
  $("section").css("min-height", $(window).height()+"px");
}

var scrolling = false;

function parallaxScroll(){
    var scrolled = $(window).scrollTop();
    var section_height = $(window).height();

    if (scrolled >= $('[data-order="3"]').offset().top && scrolled < $('[data-order="7"]').offset().top )
      $(".body_bg2").addClass('active-bg');
    else
      $(".body_bg2").removeClass('active-bg');

    $("section").each(function(index, el) {
      var current = parseInt($(this).data("order"));
      var prev = $('[data-order="'+(current-1)+'"]');
      var prev_pos = current>0 ? prev.offset().top : 0;
      var prev_bonus = parseInt(prev.css("height")) - section_height;
      var current_pos = $(this).offset().top;
      var current_height = parseInt($(this).css("height")) + 0.06*section_height;

      if(!scrolling && current>0 && (scrolled > (prev_pos+prev_bonus+50)) && (scrolled < (current_pos-50))){
        disable_scroll();
        var minus = 0;
        var plus = 0;
        if(scrolled < oldSrcoll){ 
          minus = 1;
          plus = parseInt(prev.css("height"))-section_height;
        }
        scrolling = false;
        $('html, body').stop(true,true).animate({
          scrollTop: $('[data-order="'+(current-minus)+'"]').offset().top+plus
        }, 100, function() {
          scrolling = false;
        });
        setTimeout(function(){enable_scroll();},400);
        
      }

      if((scrolled > (current_pos-100)) && (scrolled < (current_pos+current_height-section_height))){
        $('.bg'+current).addClass('visible');
        $(this).addClass('active-section');
        $("#link_to_"+$(this).attr("id")).addClass('active-link');
      }
      else if (scrolled > (current_pos+current_height-section_height) || scrolled < (current_pos-100)){
        $('.bg'+current).removeClass('visible');
        $(this).removeClass('active-section');
        $("#link_to_"+$(this).attr("id")).removeClass('active-link');
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

var x, y, rate, maxspeed, backdrop;

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
    $("[data-lang]").removeClass('active-lang');
    $(this).addClass('active-lang');
  });

  $('nav li').click(function(){
      scrolling = true;
      $('html, body').stop(true,true).animate({
          scrollTop: $( $.attr(this, 'rel') ).offset().top
      }, 500, function() {
        scrolling = false;
      });
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

  x=0;
  y=0;
  rate=0;
  maxspeed=30;
  backdrop = $('.photo-box');


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
          var scroller = setInterval( moveBackdrop, 100 );
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
    $('.photo-cat').removeClass('photo-cat--active');
    x=0;
    rate=0;
    $(".direction").each(function(index, el) {
      var scroller = $(this).data('scroller');
      clearInterval( scroller );
    });
    $('.photo-box').animate({"left":"0px"});
    $("#" + $(this).data("rel")).addClass('active-cat');
    $(this).addClass('photo-cat--active');
  });

  $("#contact_form").submit(function(){
    var ok=1;
    if($('#textarea').val()=="")
    {
      $('#textarea').attr("placeholder","Say something here!");
      $('#textarea').css("border-color","red");
      ok=0;
    }
    
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;  

    if(emailPattern.test($('#email').val())==false)
    {
      $('#email').val("");
      $('#email').attr("placeholder","Invalid or empty email address!");
      $('#email').css("border-color","red");
      ok=0;
    }

    
    if(ok==1){
      $.ajax({
        type: "POST",
        url: "mail.php",
        data: { email: $("#email").val(), name:  $("#name").val(), text:  $("#textarea").val()}
      }).done(function() {
        $('#send_button').val("Email has been sent! Thank you.");
        $('#textarea').css("border-color","#FFF");
        $('#email').css("border-color","#FFF");
        setTimeout(function(){
            $('#textarea').val("");
            $('#email').val("");
            $('#name').val("");
            $('#textarea').attr("placeholder","");
            $('#email').attr("placeholder","Your email");
          $('#send_button').val("Send");
        },4000)
      });
    }

    return false;
    
  })

});

