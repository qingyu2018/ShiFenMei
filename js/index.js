! function (window, document, $, undefined) {
    'use strict';
    //================================设置bootstrap轮播图的轮播时间============================
    $('.carousel').carousel({
        interval: 2000
    });

    //=============================鼠标进入离开环保贡献图标切换=======================
    // $('div.environment-items img').hover(function () {
    //     this.src = this.src.slice(0, this.src.lastIndexOf('.')) + '.gif';
    // }, function () {
    //     this.src = this.src.slice(0, this.src.lastIndexOf('.')) + '.png';
    // });

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
        //将节点下的元素全部设置成最大高度
        $('section.sfm-integral .item-msg').height(maxHeight);


        maxHeight = getElementMaxHeight('.sfm-quotations .top-box .img-box img');

        if (window.innerWidth > 768) {
            $('.sfm-quotations .top-box ').height(maxHeight);
        } else {
            $('.sfm-quotations .top-box').attr('style', '');
        }

        //3、根据图片设置践行者语录绿色框高度
        maxHeight = getElementMaxHeight('div.quotations-bot  img');


        $('div.quotations-shares-mobile').outerHeight(maxHeight);
        maxHeight = getElementMaxHeight('div.bot-box  img');


        $('div.quotations-shares').outerHeight(maxHeight);

        //4、当窗口宽度小于768px时去除“活动详情”、“活动推进”的padding为0
        if (window.innerWidth < 768) {
            $('.sfm-activity .sfm-btn a').addClass('mobile-css');
            // $('.sfm-activity .activity-content').css('padding', '0');
            $('.sfm-activity .activity-content').addClass('mobile-css');

            // $('.sfm-activity .sfm-btn a').css({
            //     "float": "none",
            //     "margin-right": 0
            // });
            $('.sfm-activity .sfm-btn a').addClass('mobile-css');
            $('.sfm-activity .activity, .sfm-activity .work').css('padding', 0);
        } else {
            $('.sfm-activity .sfm-btn a').removeClass('mobile-css');
            $('.sfm-activity .activity-content').removeClass('mobile-css');
            $('.sfm-activity .sfm-btn a').removeClass('mobile-css');
            $('.sfm-activity .activity, .sfm-activity .work').removeClass('mobile-css');
        }
    });

    // ============================活动详情图片淡入=======================
    $('div.content-info img').hover(function () {
        $(this).addClass('fadeIn');
    }, function () {
        $(this).removeClass('fadeIn');
    });

    //==============================践行者语录轮播图=========================
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        loop: true,
        allowTouchMove: false, //取消拖拽切换
        autoplay: {
            disableOnInteraction: false,
        },
        //前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });

}(window, window.document, jQuery);