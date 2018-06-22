! function (window, document, $, undefined) {
    'use strict';
    //================二级菜单展示================
    $('.parent-menu').hover(function () {
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


    //==========================动画效果======================
    //触发动画的高度（元素到窗口底部距离）范围
    var triggerHeightRange = [70, 200];

    //============================处理窗口滚动触发动画======================
    var doScollAnimate = function () {
        //获取所有滚动触发动画的元素遍历
        var $scrollResponeEls = $('.scroll-response');
        if (!$scrollResponeEls.length) {
            //没有需要处理的动画则移除事件监听
            $(window).off('scroll.animate');
        }
        $scrollResponeEls.each(function () {
            var $this = $(this);
            //判断是否被移除了标记
            var waitActive = $this.hasClass('scroll-response');
            if (!waitActive) return;
            //获得获得元素离窗口底部的距离
            // var destation = window.scrollY + window.innerHeight - $this.offset().top;
            var windowHeight = window.innerHeight;
            var destation = $(window).scrollTop() + windowHeight - $this.offset().top;
            //判断元素位置
            if (destation < triggerHeightRange[0] || destation > windowHeight) {
                return;
            }
            //触发动画
            $this.addClass($this.data('scroll-animate'))
                //移除等待触发动画的标记
                .removeClass('scroll-response');
        });
    };
    //================================数字滚动处理================================
    var doNumberRolling = function () {
        var $elements = $('span.rolling-num');
        if (!$elements.length) {
            $(window).off('scroll.rollingNum');
            return;
        }
        $elements.each(function () {
            var $this = $(this);
            //判断距离
            var windowHeight = window.innerHeight;
            var destation = $(window).scrollTop() + windowHeight - $this.offset().top;
            //判断元素位置
            if (destation < triggerHeightRange[0] || destation > windowHeight) {
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
                //扩大步长，减轻cpu压力
                step *= 3;
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
    };
    //绑定动画的处理
    $(window).one('load', doScollAnimate).on('scroll.animate', doScollAnimate).on('scroll.rollingNum', doNumberRolling);
}(window, window.document, jQuery);