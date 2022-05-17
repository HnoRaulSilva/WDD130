'use strict';
(function ($) {
	jQuery(window).on('elementor/frontend/init', function(){
		elementorFrontend.hooks.addAction('frontend/element_ready/wb-post-slider.default', function ($scope, $) {
			var elem = $scope.find('.wbel_post_slider_wrapper');
			
			var display_dots = $scope.find('.wbel_post_slider_wrapper').data('display-dots');
			if( display_dots == 'yes' ){
				display_dots = true;
			}else{
				display_dots = false;
			}

			var autoplay = $scope.find('.wbel_post_slider_wrapper').data('autoplay');
			if( autoplay == 'yes' ){
				autoplay = true;
			}else{
				autoplay = false;
			}

			var autoplaySpeed = 3000;
			if( autoplay == true ){
				autoplaySpeed = $scope.find('.wbel_post_slider_wrapper').data('autoplay-speed');
			}

			var slideSpeed = $scope.find('.wbel_post_slider_wrapper').data('slide-speed');
			if( slideSpeed <= 0 ){
				slideSpeed = 1000;
			}

			var slides_to_show = $scope.find('.wbel_post_slider_wrapper').data('slide-to-show');
			if( slides_to_show > 0 ){
				slides_to_show  = $scope.find('.wbel_post_slider_wrapper').data('slide-to-show');
			}else{
				slides_to_show = 3
			}

			var slides_to_scroll = $scope.find('.wbel_post_slider_wrapper').data('slides-to-scroll');
			if( slides_to_scroll > 0 ){
				slides_to_scroll  = $scope.find('.wbel_post_slider_wrapper').data('slides-to-scroll');
			}else{
				slides_to_scroll = 3
			}

			var rows_to_show = $scope.find('.wbel_post_slider_wrapper').data('rows-to-show');
			if( rows_to_show > 0 ){
				rows_to_show  = $scope.find('.wbel_post_slider_wrapper').data('rows-to-show');
			}else{
				rows_to_show = 1
			}

			var rows_per_group = $scope.find('.wbel_post_slider_wrapper').data('rows-per-group');
			if( rows_per_group > 0 ){
				rows_per_group  = $scope.find('.wbel_post_slider_wrapper').data('rows-per-group');
			}else{
				rows_per_group = 1
			}

			/*var pauseOnFocus = $scope.find('.wbel_post_slider_wrapper').data('pause-on-focus');
			if( pauseOnFocus == 'yes' ){
				pauseOnFocus = true;
			}else{
				pauseOnFocus = false;
			}*/

			var pauseOnHover = $scope.find('.wbel_post_slider_wrapper').data('pause-on-hover');
			if( pauseOnHover == 'yes' ){
				pauseOnHover = true;
			}else{
				pauseOnHover = false;
			}

			var pauseOnDotsHover = $scope.find('.wbel_post_slider_wrapper').data('pause-on-dots-hover');
			if( pauseOnDotsHover == 'yes' ){
				pauseOnDotsHover = true;
			}else{
				pauseOnDotsHover = false;
			}

			var prev_arrow = $scope.find('.wb-arrow-prev');
			var next_arrow = $scope.find('.wb-arrow-next');
			elem.on('init', function(){
				// alert();
			});
			// slickdefault
			elem.slick({
				infinite: true,
				slidesToShow: slides_to_show,
				slidesToScroll: slides_to_scroll,
				autoplay: autoplay,
				arrows: true,
				prevArrow: prev_arrow,
				nextArrow: next_arrow,
				dots: display_dots,
				draggable: true,
				focusOnSelect: true,
				swipe: true,
				adaptiveHeight: true,
				speed: slideSpeed,
				// centerMode: true,
  				//centerPadding: '5%',
				rows: rows_to_show,
				slidesPerRow: rows_per_group,
				autoplaySpeed: autoplaySpeed,
				// pauseOnFocus : pauseOnFocus,
				pauseOnHover : pauseOnHover,
				pauseOnDotsHover : pauseOnDotsHover,
				 /*responsive: [
				    {
				      breakpoint: 768,
				      settings: {
				        slidesToShow: 2,
				        slidesToScroll: 2,
				      }
				    },
				    {
				      breakpoint: 480,
				      settings: {
				        slidesToShow: 1,
				        slidesToScroll: 1,
				      }
				    },
				]*/
			});
		});
	});
})(jQuery);