! function (window, document, $, undefined) {
    'use strict';
    $('p[data-toggle="collapse"]').on('click', function () {
        $(this).find('span').toggleClass('glyphicon-triangle-bottom')
            .toggleClass('glyphicon-triangle-right');
    })

}(window, window.document, jQuery);