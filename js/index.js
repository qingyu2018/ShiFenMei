! function (window, document, $, undefined) {
    'use strict';

    $('.carousel').carousel({
        interval: 2000
    })





    /**
     * 获得元素集合的最大高度，如果设置了最小高度，最小高度参与比较
     * @param {*} elements 元素集合或选择器
     * @param {*} minHeight 最小高度
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

    //================二级菜单展示================
    $('.sfm-topbar li').hover(function () {
            var bindMenu = $(this).data('bind-menu');
            if (!bindMenu) return;
            $(bindMenu).trigger('mouseover');
        },
        function () {
            var bindMenu = $(this).data('bind-menu');
            if (!bindMenu) return;
            $(bindMenu).trigger('mouseout');
        });

    $('.sub-menu').on('mouseover', function () {
        //鼠标进入
        var $this = $(this);
        var openTaskId;
        if (openTaskId = $this.data('openTaskId')) {
            //如果有关闭菜单的任务则清除任务
            clearTimeout(openTaskId);
            $this.data('openTaskId', null);
        }
        //如果菜单是打开状态则返回
        if ($this.data('isOpen')) return;
        //打开菜单
        $this.data('isOpen', true);
        $this.stop().animate({
            "height": 60,
        });
    }).on('mouseout', function () {
        var $this = $(this);
        //鼠标离开后100毫秒关闭菜单
        var openTaskId = setTimeout(function () {
            $this.stop().animate({
                "height": 0
            });
            $this.data('isOpen', false);
        }, 100);
        $this.data('openTaskId', openTaskId);
    });


    // ============================活动详情图片淡入=======================
    $('div.content-info img').hover(function () {
        $(this).addClass('fadeIn');
    }, function () {
        $(this).removeClass('fadeIn');
    });

    //触发动画的高度（元素到窗口底部距离）范围
    var triggerHeightRange = [70, 200];

    $(window).on('scroll.animate', function () {
        //============================处理窗口滚动触发动画======================
        //获取所有滚动触发动画的元素遍历
        var $scrollResponeEls = $('.scroll-respone');
        if (!$scrollResponeEls.length) {
            //没有需要处理的动画则移除事件监听
            $(window).off('scroll.animate');
        }
        $scrollResponeEls.each(function () {
            var $this = $(this);
            //判断是否被移除了标记
            var waitActive = $this.hasClass('scroll-respone');
            if (!waitActive) return;
            //获得获得元素离窗口底部的距离
            // var destation = window.scrollY + window.innerHeight - $this.offset().top;
            var destation = $(window).scrollTop() + window.innerHeight - $this.offset().top;
            //判断元素位置
            if (destation < triggerHeightRange[0] || destation > triggerHeightRange[1]) {
                return;
            }
            //触发动画
            $this.addClass($this.data('scroll-animate'))
                //移除等待触发动画的标记
                .removeClass('scroll-respone');
        });
    }).on('scroll.rollingNum', function () {
        //================================数字滚动处理================================
        var $elements = $('span.rolling-num');
        if (!$elements.length) {
            $(window).off('scroll.rollingNum');
            return;
        }
        $elements.each(function () {
            var $this = $(this);
            //判断距离
            var destation = $(window).scrollTop() + window.innerHeight - $this.offset().top;
            //判断元素位置
            if (destation < triggerHeightRange[0] || destation > triggerHeightRange[1]) {
                return;
            }
            $this.removeClass('rolling-num');
            var currentNum = parseInt($this.text()) || 0;
            var targetNum = parseInt($this.data('target-num')) || 0;
            if (!targetNum) return;
            var finishTime = 1000; //动画时间
            //增长步长
            var step = parseInt(targetNum / finishTime);
            var timeout = 1;
            if (step < 1) {
                //步长小于1
                timeout = finishTime / targetNum;
                step = 1;
            } else {
                //扩大步长，减轻cup压力
                step *= 5;
            }
            var taskId = setInterval(function () {
                currentNum = parseInt($this.text());
                if (currentNum === targetNum) {
                    //清除任务
                    clearInterval(taskId);
                    return;
                }
                var val = currentNum + step;
                if (val > targetNum) {
                    val = targetNum
                }
                $this.text(val);
            }, timeout);
        });
    });

}(window, window.document, jQuery);