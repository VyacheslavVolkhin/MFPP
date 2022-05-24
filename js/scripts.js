$(document).ready(function(){

	//phone masked
	$('input[type="tel"]').mask("+7 (999) 999-99-99",{placeholder:"+7 (___) ___-__-__"});
	$('input[type="tel"]').on('click', function() {
		$(this).setCursorPosition(4);
	})
	$.fn.setCursorPosition = function(pos) {
	  this.each(function(index, elem) {
	    if (elem.setSelectionRange) {
	      elem.setSelectionRange(pos, pos);
	    } else if (elem.createTextRange) {
	      var range = elem.createTextRange();
	      range.collapse(true);
	      range.moveEnd('character', pos);
	      range.moveStart('character', pos);
	      range.select();
	    }
	  });
	  return this;
	};
    
    
    //select
    $('select').selectmenu();
    
    //tooltip
    $('.elm-tooltip[title]').tooltip();


    //side menu
    let stickyTop;
    let sideEnd;
    if (!!$('.js-fixed-box').offset()) {
        stickyTop = $('.content-outer-wrap #side-start').offset().top;
        sideEnd = $('#side-end').offset().top;
        $(window).scroll(function () {
            let windowTop = $(window).scrollTop() + 25;
            if (stickyTop < windowTop) {
                $('.wrap').addClass('side-fixed-top');
            } else {
                $('.wrap').removeClass('side-fixed-top');
            }
            if (sideEnd < (windowTop + $('.side-menu-box').outerHeight() + 75)) {
                $('.wrap').addClass('side-fixed-end');
            } else {
                $('.wrap').removeClass('side-fixed-end');
            }
        });
    }
    if (!!$('.js-section-menu').offset()) {
        $('.js-section-menu a').on("click", function (e) {
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top+10
            }, 1000);
            e.preventDefault();
            return false;
        });
        $(window).on('scroll', function() {
            $('.js-section-scroll').each(function() {
                if ($(this).offset().top < $(window).scrollTop()) {
                    let curSection = $(this).attr('id');
                    $('.js-section-menu .active').removeClass('active');
                    $('.js-section-menu').find('a[href="#'+curSection+'"]').addClass('active')
                }
            })
        })
    }
    
	
    //popup block
	$('.js-popup-wrap .js-btn-toggle').on('click', function() {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('body').removeClass('menu-show');
		} else {
			$('.js-popup-wrap:not(.no-close) .js-btn-toggle').removeClass('active');
			$(this).addClass('active');
			if ($(this).parent().hasClass('main-menu-wrap')) {
				$('body').addClass('menu-show');
			}
		}
        if (!!$('.js-fixed-box').offset()) {
            stickyTop = $('.content-outer-wrap #side-start').offset().top;
            sideEnd = $('#side-end').offset().top;
            $(window).scroll(function () {
                let windowTop = $(window).scrollTop() + 25;
                if (stickyTop < windowTop) {
                    $('.wrap').addClass('side-fixed-top');
                } else {
                    $('.wrap').removeClass('side-fixed-top');
                }
                if (sideEnd < (windowTop + $('.side-menu-box').outerHeight() + 75)) {
                    $('.wrap').addClass('side-fixed-end');
                } else {
                    $('.wrap').removeClass('side-fixed-end');
                }
            });
        }
		return false;
	})
	$('.js-popup-wrap .js-btn-close').on('click', function() {
		$(this).parents('.js-popup-wrap').children('.js-btn-toggle').removeClass('active');
		$('body').removeClass('menu-show');
		return false;
	})
	$(document).click(function(event) {
	    if ($(event.target).closest(".js-popup-block").length) return;
	    $('.js-popup-wrap:not(.no-close) .js-btn-toggle').removeClass('active');
	    $('body').removeClass('menu-show');
	    event.stopPropagation();
	});
	$('.js-popup-wrap').each(function() {
		if ($(this).hasClass('js-popup-select')) {
			// alert(1)
			if ($(this).find('.js-popup-block').find('.active').length>0) {} else {
				$(this).find('.js-popup-block').find('li').eq(0).children('a').addClass('active');
			}
			var currentSelect = $(this).find('.js-popup-block').find('.active').html();
			$(this).find('.js-btn-toggle').html(currentSelect);
		}
	})
	$('.js-popup-wrap.js-popup-select .js-popup-block a').on('click', function() {
		if ($(this).hasClass('active')) {} else {
			$(this).parents('.js-popup-wrap').find('.js-popup-block').find('.active').removeClass('active');
			$(this).addClass('active');
		}
		$('.js-popup-wrap').each(function() {
			if ($(this).hasClass('js-popup-select')) {
				if ($(this).find('.js-popup-block').find('.active').length>0) {} else {
					$(this).find('.js-popup-block').find('li').eq(0).children('a').addClass('active');
				}
				var currentSelect = $(this).find('.js-popup-block').find('.active').html();
				$(this).find('.js-btn-toggle').html(currentSelect);
			}
		})
		$(this).parents('.js-popup-wrap').find('.js-btn-toggle').removeClass('active');
		return false;
	})

	//tabs
	$('.js-tabs-nav').each(function() {
		$('.js-tab-block[data-tab*="'+$(this).find('.active').attr('data-tab')+'"]').addClass('active');
	})
	$('.js-tab-title').each(function() {
		if ($(this).hasClass('active')) {
			$(this).next('.js-tab-content').show(0);
		}
	})
	$('.js-tabs-nav li a').on('click', function() {
		if ($(this).hasClass('active')) {} else {
			$('.js-tab-block').removeClass('active');
			$(this).parents('.js-tabs-nav').find('.active').removeClass('active');
			$(this).addClass('active');
			$('.js-tabs-nav').each(function() {
				$('.js-tab-block[data-tab*="'+$(this).find('.active').attr('data-tab')+'"]').addClass('active');
			})
		}
		return false;
	})
	$('.js-tab-title').on('click' , function() {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active').next('.js-tab-content').slideUp(200);
		} else {
			$(this).addClass('active').next('.js-tab-content').slideDown(200);
		}
	})


    //main-page-box
    if (!!$('.main-page-box').offset()) {
        $('.main-page-box .slider').slick({
            dots: true,
            slidesToShow: 3,
            variableWidth: false,
            infinite: true,
            adaptiveHeight: false,
            prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
            nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
            appendDots: $('.main-page-box .slider-actions-box .pages-wrap'),
            pauseOnHover: false,
            slidesToScroll: 3,
            autoplay: true,
            autoplaySpeed: 5000,
            focusOnSelect: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },
            ]
        });
    }


    //main-about-box
    if (!!$('.main-about-box').offset()) {
        $('.main-about-box .slider').slick({
            dots: true,
            slidesToShow: 3,
            variableWidth: false,
            infinite: true,
            adaptiveHeight: false,
            prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
            nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
            appendDots: $('.main-about-box .slider-actions-box .pages-wrap'),
            pauseOnHover: false,
            slidesToScroll: 3,
            autoplay: true,
            autoplaySpeed: 5000,
            focusOnSelect: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },
            ]
        });
    }


    //main-slider-box
    if (!!$('.main-slider-box').offset()) {
        $('.main-slider-box .slider').slick({
            dots: false,
            slidesToShow: 1,
            variableWidth: false,
            infinite: false,
            adaptiveHeight: false,
            prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-main ico-arrow-prev"></span>',
            nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-main ico-arrow-next"></span>',
            initialSlide: 1,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        adaptiveHeight: true,
                    }
                },
            ]
        });
    }
    $('.main-slider-box .sl-wrap').eq(0).addClass('slider-prev');
    $('.main-slider-box .ico-arrow-prev').on('click', function() {
        $(".main-slider-box .slider-prev").removeClass('slider-prev');
        $(".main-slider-box .slick-active").prev('.slick-slide').find('.sl-wrap').addClass('slider-prev');
    })
    $('.main-slider-box .ico-arrow-next').on('click', function() {
        $(".main-slider-box .slider-prev").removeClass('slider-prev');
        $(".main-slider-box .slick-active").prev('.slick-slide').find('.sl-wrap').addClass('slider-prev');
    })


    //main-steps-box
    if (!!$('.main-steps-box').offset()) {
        $('.main-steps-box .slider').slick({
            dots: false,
            slidesToShow: 2,
            variableWidth: true,
            infinite: false,
            adaptiveHeight: false,
            prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-main ico-arrow-prev"></span>',
            nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-main ico-arrow-next"></span>',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        variableWidth: false,
                        prevArrow: false,
                        nextArrow: false,
                        slidesToShow: 1,
                    }
                },
            ]
        });
    }

    //main-projects-box
    if (!!$('.main-projects-box').offset()) {
        $('.main-projects-box .slider').slick({
            dots: false,
            slidesToShow: 1,
            variableWidth: false,
            infinite: true,
            adaptiveHeight: true,
            prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-main ico-arrow-prev"></span>',
            nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-main ico-arrow-next"></span>',
        });
    }


    //main-partners-box
    if (!!$('.main-partners-box').offset()) {
        $('.main-partners-box .slider').slick({
            dots: false,
            slidesToShow: 5,
            variableWidth: false,
            infinite: true,
            adaptiveHeight: false,
            prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-main ico-arrow-prev"></span>',
            nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-main ico-arrow-next"></span>',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                    }
                },
            ]
        });
    }


    //gallery-slider-box
    if (!!$('.gallery-slider-box').offset()) {
        $('.gallery-slider-box .slider').slick({
            dots: false,
            slidesToShow: 3,
            variableWidth: false,
            infinite: false,
            adaptiveHeight: false,
            prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-main ico-arrow-prev"></span>',
            nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-main ico-arrow-next"></span>',
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                    }
                },
            ]
        });
    }


    //main-structure-box
    if (!!$('.main-structure-box').offset()) {
        $('.main-structure-box .slider').slick({
            dots: false,
            slidesToShow: 1,
            variableWidth: false,
            infinite: true,
            adaptiveHeight: false,
            prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
            nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
        });
    }
    
    
    
    $('.slider-outer-box .slider-actions-box .ico-arrow-prev').on('click', function () {
        $(this).parents('.slider-outer-box').find('.slider').find('.ico-arrow-prev').click();
        return false;
    })
    $('.slider-outer-box .slider-actions-box .ico-arrow-next').on('click', function () {
        $(this).parents('.slider-outer-box').find('.slider').find('.ico-arrow-next').click();
        return false;
    })
    $('.slider-outer-box .slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
        if ($(this).parents('.slider-outer-box').find('.slider').find('.ico-arrow-prev').hasClass('slick-disabled')) {
            $(this).parents('.slider-outer-box').find('.slider-actions-box').find('.ico-arrow-prev').addClass('slick-disabled');
        } else {
            $(this).parents('.slider-outer-box').find('.slider-actions-box').find('.ico-arrow-prev').removeClass('slick-disabled');
        }
        if ($(this).parents('.slider-outer-box').find('.slider').find('.ico-arrow-next').hasClass('slick-disabled')) {
            $(this).parents('.slider-outer-box').find('.slider-actions-box').find('.ico-arrow-next').addClass('slick-disabled');
        } else {
            $(this).parents('.slider-outer-box').find('.slider-actions-box').find('.ico-arrow-next').removeClass('slick-disabled');
        }
    })
	
});
