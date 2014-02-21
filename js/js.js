var current_page = "homepage";
var	page_title = ""; 
var filename = "";

$(document).ready(function() {

	$.ajax({
	  url: "home.html",
	  cache: false
	}).done(function( html ) {
	  $( ".main .content" ).html(html);
	});
	
	$("header nav li").click(function(event) {
		$("header nav li").removeClass('current');
		$(this).addClass('current');
		page_title = $(this).html();
		filename = $(this).data("rel");
		if(current_page=="homepage"){
			fromHomepage();
			current_page = page_title;
		}
		else
			fromSubpage();

	});

	$(".logo").click(function() {
		$("header nav li").removeClass('current');
		$( ".main .content" ).animate({opacity: "0"}, { duration: 200, queue: true });
		$('.hero').slideDown(300);
		$('.circle img').show();
		$('.circle .page-title').hide();
		setTimeout(function(){
			$('.circle').css("left","0px").animate({
			opacity: "1"}, { duration: 200, queue: false });
			$.ajax({
			  url: "home.html",
			  cache: false
			}).done(function( html ) {
			  $( ".main .content" ).html(html);
			});
		},300);
		setTimeout(function(){
			$('.hero .container').slideDown(500).animate({
				opacity: "1", top: "0px"}, { duration: 200, queue: false });
			$( ".main .content" ).animate({opacity: "1"}, { duration: 100, queue: true });
		},1000);
		current_page = "homepage";
	});

	
	function fromHomepage() {
		$('.hero .container').slideUp(1000).animate({
			opacity: "0", top: "-20px"}, { duration: 500, queue: false });
		$( ".main .content" ).animate({opacity: "0"}, { duration: 200, queue: true });
		$('.circle .page-title').html(page_title);
		$('.circle img').fadeOut(1000);
		$('.circle .page-title').fadeIn(1500);
		setTimeout(function(){
			$('.circle').animate({
			opacity: "0"}, { duration: 100, queue: false }).animate({
			left: "-400px"}, { duration: 200, queue: false });
			$.ajax({
			  url: filename+".html",
			  cache: false
			}).done(function( html ) {
			  $( ".main .content" ).html(html);
			});
		},2000);
		setTimeout(function(){
			$('.hero').slideUp(200);
			$( ".main .content" ).animate({opacity: "1"}, { duration: 200, queue: true });
		},2600);
	};

	function fromSubpage() {
		$('.hero').slideDown(300);
		$( ".main .content" ).animate({opacity: "0"}, { duration: 200, queue: true });
		$('.circle .page-title').html(page_title);
		setTimeout(function(){
			$('.circle').css("left","0px").animate({
			opacity: "1"}, { duration: 200, queue: false });
			$.ajax({
			  url: filename+".html",
			  cache: false
			}).done(function( html ) {
			  $( ".main .content" ).html(html);
			});
		},300);
		setTimeout(function(){
			$('.circle').animate({
			opacity: "0"}, { duration: 100, queue: false }).animate({
			left: "-400px"}, { duration: 200, queue: false });
		},2000);
		setTimeout(function(){
			$('.hero').slideUp(200);
			$( ".main .content" ).animate({opacity: "1"}, { duration: 200, queue: true });
		},2500);
	};

});