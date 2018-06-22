! function (window, document, $, undefined) {
    'use strict';

    $('div.items-1 .item').hover(function () {
        $('span.top').addClass('active');
    }, function () {
        $('span.top').removeClass('active');
    })

    $('div.items-2 .item').hover(function () {
        $('span.middle').addClass('active');
    }, function () {
        $('span.middle').removeClass('active');
    })
    $('div.items-3 .item').hover(function () {
        $('span.bottom').addClass('active');
    }, function () {
        $('span.bottom').removeClass('active');
    })


}(window, window.document, jQuery);