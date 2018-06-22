! function (window, document, $, undefined) {
    'use strict';


    //计算容器的高度，设置表单垂直居中
    $(window).on('resize load', function () {
        var $container = $('.login-main .pc-container');
        var containerHeigtht = $container.height();
        $container.css('margin-top', -containerHeigtht / 2);
    });



    //点击导航按钮切换表单
    // var index = 0;
    // $('span.glyphicon-triangle-right').on('click', function () {
    //     var $forms = $('div.page');
    //     var currentForm = $forms[index];
    //     if (++index === $forms.length) {
    //         index = 0;
    //     }
    //     var nextForm = $forms[index];
    //     $(currentForm).addClass('hidden');
    //     $(nextForm).removeClass('hidden');
    // });
    // $('span.glyphicon-triangle-left').on('click', function () {
    //     var $forms = $('div.page');
    //     var currentForm = $forms[index];
    //     if (--index === -1) {
    //         index = $forms.length - 1;
    //     }
    //     var preForm = $forms[index];
    //     $(currentForm).addClass('hidden');
    //     $(preForm).removeClass('hidden');
    // });


}(window, window.document, jQuery);