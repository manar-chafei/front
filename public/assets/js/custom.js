

jQuery(document).ready(function ($) {
    //da slider
    $('#da-slider').cslider({
        autoplay: true,
        bgincrement: 0
    });
    //Set the carousel options
    $('#quote-carousel').carousel({
        pause: true,
        interval: 4000,
    });
    // fancybox
    $(".fancybox").fancybox();
    //isotope
    if ($('.isotopeWrapper').length) {
        var $container = $('.isotopeWrapper');
        var $resize = $('.isotopeWrapper').attr('id');
        // initialize isotope
        $container.isotope({
            itemSelector: '.isotopeItem',
            resizable: false, // disable normal resizing
            masonry: {
                columnWidth: $container.width() / $resize
            }
        });
        $("a[href='#top']").click(function () {
            $("html, body").animate({
                scrollTop: 0
            }, "slow");
            return false;
        });
        $('.navbar-inverse').on('click', 'li a', function () {
            $('.navbar-inverse .in').addClass('collapse').removeClass('in').css('height', '1px');
        });
        $('#filter a').click(function () {
            $('#filter a').removeClass('current');
            $(this).addClass('current');
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 1000,
                    easing: 'easeOutQuart',
                    queue: false
                }
            });
            return false;
        });
        $(window).smartresize(function () {
            $container.isotope({
                // update columnWidth to a percentage of container width
                masonry: {
                    columnWidth: $container.width() / $resize
                }
            });
        });
    }
});

$(document).ready(function() {
    $('#confirmButton').on('click', function() {
        $(this).text('Confirmed');
        $(this).addClass('confirmed');
        $(this).removeClass('btn-primary');
        $(this).prop('disabled', true); // Optional: disable the button after confirming
    });
});