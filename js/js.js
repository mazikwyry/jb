
    function load_trans(){
      $('[data-trans]').each(function() {
        $(this).text($.t($(this).data('trans')));
      });
    }

    function listenWidth(){     
      $("section").css("height", $(window).height()+"px");
    }

	  $.i18n.init({
      lng: 'en',
      debug: true
    }, function() {
      load_trans();
    });

   $(document).ready(function($) {
    $("[data-lang]").click(function(event) {
      i18n.setLng($(this).data('lang'), function(t) {
        load_trans();
       });
    });

    listenWidth();
    $(document).load($(window).bind("resize", listenWidth));

    $('nav li').click(function(){
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'rel') ).offset().top
        }, 500);
        return false;
    });


    function parallaxScroll(){
        var scrolled = $(window).scrollTop();
        var section_height = $(window).height();

        if((scrolled > (section_height-100)) && (scrolled < (1.5*section_height)))
        	$('.bg').addClass('visible');
        else if (scrolled > (1.5*section_height) || scrolled < (section_height-100))
        	$('.bg').removeClass('visible');

        if((scrolled > (2*section_height-100)) && (scrolled < (2.5*section_height)))
        	$('.bg_r').addClass('visible');
        else if (scrolled > (2.5*section_height) || scrolled < (2*section_height-100))
        	$('.bg_r').removeClass('visible');
    }

    $(window).bind('scroll',function(e){ 
        parallaxScroll();
    });

   });

$(function(){
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

    function moveBackdrop(){
        x += maxspeed * rate;
        max = $(".active-cat").width() - $('.photos').width() + $('.photos').offset().left
        x > 0 ? x=0 : true;
        x < -max ? x=-max : true;
        var newpos = x+'px';
        backdrop.css('left',newpos);
    }
});