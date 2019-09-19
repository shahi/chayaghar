$(document).ready(function() {
    'use strict';
    /*-----------------------------------------------------------------------------------*/
    /*	STICKY HEADER
    /*-----------------------------------------------------------------------------------*/
    if ($(".navbar").length) {
        var options = {
            offset: 350,
            offsetSide: 'top',
            classes: {
                clone: 'banner--clone fixed',
                stick: 'banner--stick',
                unstick: 'banner--unstick'
            },
            onStick: function() {
                $($.SmartMenus.Bootstrap.init);
            },
            onUnstick: function() {
                $('.navbar .btn-group').removeClass('open');
            }
        };
        var banner = new Headhesive('.navbar', options);
    }
    /*-----------------------------------------------------------------------------------*/
    /*	HAMBURGER MENU ICON
    /*-----------------------------------------------------------------------------------*/
	$(".hamburger.animate").on( "click", function() {
        $(".hamburger.animate").toggleClass("active");
    });
    $('.onepage .navbar li a').on('click', function() {
        $('.navbar .navbar-collapse.show').collapse('hide');
        $('.hamburger.animate').removeClass('active');
    });
    /*-----------------------------------------------------------------------------------*/
    /*	IMAGE ICON HOVER
    /*-----------------------------------------------------------------------------------*/
    $('.overlay:not(.caption) > a, .overlay:not(.caption) > span, .overlay.caption-overlay > a, .overlay.caption-overlay > span').prepend('<span class="bg"></span>');
    /*-----------------------------------------------------------------------------------*/
    /*	FLICKITY
    /*-----------------------------------------------------------------------------------*/
	function enableFlickitySlider(){
		$('.flickity-slider-container').each( function( i, container ) {
		    var $container = $( container );
		    var $sliderMain = $container.find('.flickity-slider-main').flickity({
		      imagesLoaded: true,
			  percentPosition: false,
			  wrapAround: true,
			  pageDots: false,
			  prevNextButtons: false,
			  fullscreen: $container.hasClass('fullscreen') ? true : false
		    });
		    $container.find('.flickity-slider-nav').flickity({
		      asNavFor: $sliderMain[0],
		      imagesLoaded: true,
			  percentPosition: false,
			  pageDots: false,
			  contain: true,
			  prevNextButtons: false
		    });
		    $container.find('.flickity-slider-main').css({ opacity: 1 });
		    $container.find('.flickity-slider-nav').css({ opacity: 1 });
		});
	}
	enableFlickitySlider();
	function enableFlickityCarousel(){
		$('.flickity-carousel-container').each( function( i, container ) {
		    var $container = $( container );
		    var $carousel = $container.find('.flickity-carousel').flickity({
		      imagesLoaded: true,
			  percentPosition: false,
			  wrapAround: true,
			  pageDots: false,
			  fullscreen: $container.hasClass('fullscreen') ? true : false
		    });
		    $carousel.css({ opacity: 1 });
			var flkty = $carousel.data('flickity');
			var $status = $container.find('.flickity-status');
				$carousel.on( 'change.flickity', updateStatus );
			function updateStatus() {
				var slideNumber = ("0" + (flkty.selectedIndex + 1)).slice(-2);
				var flktyLength = ("0" + flkty.slides.length).slice(-2);
				$status.html( '<span>' + slideNumber + '</span>/<span>' + flktyLength + '</span>' );
			}
			updateStatus();
			var $caption = $container.find('.flickity-caption');
				$carousel.on( 'select.flickity', function() {
				var captionalt = $(flkty.selectedElement).find('img').attr('alt')
				$caption.text( captionalt )
			});
		});
	}
	enableFlickityCarousel();
    /*-----------------------------------------------------------------------------------*/
    /*	PLYR
    /*-----------------------------------------------------------------------------------*/
    const players = Plyr.setup('.player'); 
    /*-----------------------------------------------------------------------------------*/
    /*	PROGRESSBAR
	/*-----------------------------------------------------------------------------------*/
    var $pline = $('.progressbar.line');
    $pline.each(function(i) {
        var line = new ProgressBar.Line(this, {
            strokeWidth: 3,
            trailWidth: 3,
            duration: 3000,
            easing: 'easeInOut',
            text: {
                style: {
                    color: 'inherit',
                    position: 'absolute',
                    right: '0',
                    top: '-30px',
                    padding: 0,
                    margin: 0,
                    transform: null
                },
                autoStyleContainer: false
            },
            step: function(state, line, attachment) {
                line.setText(Math.round(line.value() * 100) + ' %');
            }
        });
        var value = ($(this).attr('data-value') / 100);
        $pline.waypoint(function() {
            line.animate(value);
        }, {
            offset: "100%"
        })
    });
    /*-----------------------------------------------------------------------------------*/
    /*	ISOTOPE GRID
	/*-----------------------------------------------------------------------------------*/
    var $isogrid = $('.grid .isotope');
    $isogrid.isotope({
        itemSelector: '.item',
        percentPosition: true,
        transitionDuration: '0.7s',
        masonry: {
            columnWidth: $isogrid.width() / 12
        },
        layoutMode: 'masonry'
    });
    $(window).resize(function() {
        $isogrid.isotope({
            masonry: {
                columnWidth: $isogrid.width() / 12
            }
        });
    });
    $(window).on("load", function() {
        $isogrid.isotope({
            masonry: {
                columnWidth: $isogrid.width() / 12
            }
        });
    });
    $isogrid.imagesLoaded(function() {
        $isogrid.isotope('layout');
    });
    /*-----------------------------------------------------------------------------------*/
    /*	BACKGROUND IMAGE
    /*-----------------------------------------------------------------------------------*/
    $(".bg-image").css('background-image', function() {
        var bg = ('url(' + $(this).data("image-src") + ')');
        return bg;
    });
    /*-----------------------------------------------------------------------------------*/
    /*	PARALLAX MOBILE
    /*-----------------------------------------------------------------------------------*/
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i)) {
        $('.image-wrapper').addClass('mobile');
    }
    /*-----------------------------------------------------------------------------------*/
    /*	INSTAGRAM
    /*-----------------------------------------------------------------------------------*/
    var instagramFeed = new Instafeed({
        target: 'instafeed-widget-wedding',
        get: 'user',
        limit: 6,
        userId: 3784903942,
        accessToken: '3784903942.1677ed0.cf0234c1fa6a4bc0b290f749ec569cd8',
        resolution: 'low_resolution',
        template: '<div class="item col-6 col-md-6 col-lg-4"><figure class="overlay overlay2 rounded"><a href="{{link}}" target="_blank"><img src="{{image}}" /><figcaption class="d-flex"><div class="align-self-center mx-auto"><i class="fa fa-instagram"></i></div></figcaption></figure></div>',
        after: function() {
            $('#instafeed-widget-wedding figure.overlay a').prepend('<span class="bg"></span>');
        }
    });
    $('#instafeed-widget-wedding').each(function() {
        instagramFeed.run();
    });
    /*-----------------------------------------------------------------------------------*/
    /*	ONEPAGE HEADER OFFSET
    /*-----------------------------------------------------------------------------------*/	
    var header_height = $('.navbar:not(.banner--clone)').outerHeight();
    var shrinked_header_height = 58;
    var firstStyle = {
        'padding-top': '' + shrinked_header_height + 'px',
        'margin-top': '-' + shrinked_header_height + 'px'
    };
    $('.onepage section').css(firstStyle);
    var secondStyle = {
        'padding-top': '' + header_height + 'px',
        'margin-top': '-' + header_height + 'px'
    };
    $('.onepage section:first-of-type').css(secondStyle);
	/*-----------------------------------------------------------------------------------*/
    /*	ONEPAGE NAV LINKS
    /*-----------------------------------------------------------------------------------*/	
	var empty_a = $('.onepage .navbar ul.navbar-nav a[href="#"]');	
	empty_a.on('click', function(e) {
	    e.preventDefault();
	});
    /*-----------------------------------------------------------------------------------*/
	/*	ONEPAGE SMOOTH SCROLL
	/*-----------------------------------------------------------------------------------*/	
	$(function() {
	  setTimeout(function() {
	    if (location.hash) {
	      window.scrollTo(0, 0);
	      var target = location.hash.split('#');
	      smoothScrollTo($('#'+target[1]));
	    }
	  }, 1);  
	  $('a.scroll[href*="#"]:not([href="#"])').on('click', function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      smoothScrollTo($(this.hash));
	      return false;
	    }
	  });  
	  function smoothScrollTo(target) {
	    var target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	    if (target.length) {
	      $('html,body').animate({
	        scrollTop: target.offset().top
	      }, 1500, 'easeInOutExpo');
	    }
	  }
	});
});