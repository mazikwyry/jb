
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