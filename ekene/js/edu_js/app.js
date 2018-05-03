$(function () {
    'use strict';

    // Showing page loader
    $(window).load(function () {
        setTimeout(function () {
            $(".page_loader").fadeOut("fast");
        }, 100)
        $('link[id="style_sheet"]').attr('href', 'css/skins/green-light-2.css');
        $('.logo img').attr('src', 'img/logos/green-light-2-logo.png');

        if($('body .filtr-container').length > 0){
            // Filterizr initialization
            $(function () {
                $('.filtr-container').filterizr(
                    {
                        delay: 1
                    }
                );
            });

            $('.filters-listing-navigation li').on('click', function() {
                $('.filters-listing-navigation .filtr').removeClass('active');
                $(this).addClass('active');
            });
        }
    });

    // WOW animation library initialization
    var wow = new WOW(
        {
            animateClass: 'animated',
            offset: 100,
            mobile: false
        }
    );
    wow.init();

    // Banner slider
    (function ($) {
        //Function to animate slider captions
        function doAnimations(elems) {
            //Cache the animationend event in a variable
            var animEndEv = 'webkitAnimationEnd animationend';
            elems.each(function () {
                var $this = $(this),
                    $animationType = $this.data('animation');
                $this.addClass($animationType).one(animEndEv, function () {
                    $this.removeClass($animationType);
                });
            });
        }

        //Variables on page load
        var $myCarousel = $('#carousel-example-generic')
        var $firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");
        //Initialize carousel
        $myCarousel.carousel();

        //Animate captions in first slide on page load
        doAnimations($firstAnimatingElems);
        //Pause carousel
        $myCarousel.carousel('pause');
        //Other slides to be animated on carousel slide event
        $myCarousel.on('slide.bs.carousel', function (e) {
            var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
            doAnimations($animatingElems);
        });
        $('#carousel-example-generic').carousel({
            interval: 3000,
            pause: "false"
        });
    })(jQuery);

    // Page scroller initialization.
    $.scrollUp({
        scrollName: 'page_scroller',
        scrollDistance: 300,
        scrollFrom: 'top',
        scrollSpeed: 500,
        easingType: 'linear',
        animation: 'fade',
        animationSpeed: 200,
        scrollTrigger: false,
        scrollTarget: false,
        scrollText: '<i class="fa fa-chevron-up"></i>',
        scrollTitle: false,
        scrollImg: false,
        activeOverlay: false,
        zIndex: 2147483647
    });

    // Counter
    function isCounterElementVisible($elementToBeChecked) {
        var TopView = $(window).scrollTop();
        var BotView = TopView + $(window).height();
        var TopElement = $elementToBeChecked.offset().top;
        var BotElement = TopElement + $elementToBeChecked.height();
        return ((BotElement <= BotView) && (TopElement >= TopView));
    }

    $(window).scroll(function () {
        $(".counter").each(function () {
            var isOnView = isCounterElementVisible($(this));
            if (isOnView && !$(this).hasClass('Starting')) {
                $(this).addClass('Starting');
                $(this).prop('Counter', 0).animate({
                    Counter: $(this).text()
                }, {
                    duration: 3000,
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            }
        });
    });

    // Select picket
    $('.selectpicker').selectpicker();

    // Carousel with partner initialization
//    (function () {
//        $('#ourPartners').carousel({interval: 3600});
//    }());
//
//    (function () {
//        $('.our-partners .item').each(function () {
//            var itemToClone = $(this);
//            for (var i = 1; i < 4; i++) {
//                itemToClone = itemToClone.next();
//                if (!itemToClone.length) {
//                    itemToClone = $(this).siblings(':first');
//                }
//                itemToClone.children(':first-child').clone()
//                    .addClass("cloneditem-" + (i))
//                    .appendTo($(this));
//            }
//        });
//    }());

    // Background video playing script
    $(".player").mb_YTPlayer();

    function resizeVideoBanner() {
        var bannerWidth = $('.banner').width();
        var bannerHeight = bannerWidth * .61;
        if(bannerHeight > 700){
            bannerHeight = 700;
        }
        $('.pattern-overlay').css('height', bannerHeight);
    }

    resizeVideoBanner();
    $(window).resize(function () {
        resizeVideoBanner();
    }).trigger("resize");

    // Multilevel menuus
    $('[data-submenu]').submenupicker();

    var videoWidth = $('.sidebar-widget').width();
    var videoHeight = videoWidth * .61;
    $('.sidebar-widget iframe').css('height', videoHeight);

    function toggleChevron(e) {
        $(e.target)
            .prev('.panel-heading')
            .find(".fa")
            .toggleClass('fa-minus fa-plus');
    }

    $('.panel-group').on('shown.bs.collapse', toggleChevron);
    $('.panel-group').on('hidden.bs.collapse', toggleChevron);

    // Navbar Search
    $(".hover").mouseleave(
        function() {
            $(this).removeClass("hover");
        }
    );
    var submitIcon = $('.navbar-search-icon');
    var inputBox = $('.navbar-search-input');
    var searchBox = $('.navbar-search');
    var isOpen = false;
    submitIcon.on('click', toggleSubmitIcon);

    function toggleSubmitIcon() {
        if(isOpen === false){
            searchBox.addClass('navbar-search-open');
            inputBox.focus();
            isOpen = true;
        } else {
            searchBox.removeClass('navbar-search-open');
            inputBox.focusout();
            isOpen = false;
        }
    }

    submitIcon.on('mouseup', function(){
        return false;
    });
    searchBox.on('mouseup', function(){
        return false;
    });

    $(document).on('mouseup', function(){
        if(isOpen === true){
            $('.navbar-search-icon').css('display','block');
            toggleSubmitIcon();
        }
    });

    // Switching Color schema
    $('.color-plate').on('click', function () {
        var name = $(this).attr('data-color');
        $('link[id="style_sheet"]').attr('href', 'css/skins/' + name + '.css');
        if (name == 'default') {
            $('.logo img').attr('src', 'img/logos/logo.png');
        }
        else {
            $('.logo img').attr('src', 'img/logos/' + name + '-logo.png');
        }
    });

    $('.setting-button').on('click', function () {
        $('.option-panel').toggleClass('option-panel-collased');
    });
});

function buttonUp(){
    var inputVal = $('.navbar-search-input').val();
    inputVal = $.trim(inputVal).length;
    if( inputVal !== 0){
        $('.navbar-search-icon').css('display','none');
    } else {
        $('.navbar-search-input').val('');
        $('.navbar-search-icon').css('display','block');
    }
}

