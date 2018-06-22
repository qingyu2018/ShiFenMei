! function (window, document, $, undefined) {
    'use strict';
    $('.classify-product div.items').hover(function () {
        $(this).find('.items-img').addClass('active');

    }, function () {
        $(this).find('.items-img').removeClass('active');

    })

}(window, window.document, jQuery);