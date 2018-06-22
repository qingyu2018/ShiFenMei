! function (window, document, $, undefined) {
    'use strict';
    /**
     * 获得元素集合的最大高度，如果设置了最小高度，最小高度参与比较
     * @param {*} elements 元素集合或选择器
     * @param {Number} minHeight 最小高度
     * 
     */
    var getElementMaxHeight = function (elements, minHeight) {
        var maxHeight = minHeight || 0;
        //遍历元素获取最大高度
        $(elements).each(function () {
            var imgHeight = $(this).height();
            console.log(imgHeight);
            if (imgHeight > maxHeight) {
                maxHeight = imgHeight;
            }
        });
        return maxHeight;
    }

    //=============================积分兑换下的格子设置成最大图片的高度================================
    $(window).on('load resize', function () {
        //1、积分兑换下的格子设置成最大图片的高度
        //获得图片最大高度


        var maxHeight = getElementMaxHeight('section.sfm-integral img');
        console.log(maxHeight);
        //将节点下的元素全部设置成最大高度
        $('section.sfm-integral .item-msg').height(maxHeight);

    });



}(window, window.document, jQuery);