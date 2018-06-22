! function (window, document, $, undefined) {
    'use strict';

    var swiper = new Swiper('.pc-swiper .swiper-container', {
        slidesPerView: 3,
        spaceBetween: 30,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
    var swiper = new Swiper('.mobile-swiper .swiper-container', {
        pagination: {
            el: '.swiper-pagination',
        },
    });
}(window, window.document, jQuery);