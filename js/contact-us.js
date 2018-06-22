! function (window, document, $, undefined) {
    'use strict';
    // 指示器的属性，title代表指示器的文字，img代表指示器的图片url
    var bullets = [{
        title: '石分美介绍',
        img: '../images/contact-us-icon-01.png'
    }, {
        title: '联系我们',
        img: '../images/contact-us-icon-02.png'
    }];
    //初始化轮播图函数
    var initSwiper = function () {
        new Swiper('div.swiper-container', {
            autoplay: {
                disableOnInteraction: false
            },
            effect: 'fade',
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + ' my-bullet" data-index="' + index + '">\
                            <img src="' + bullets[index].img + '">\
                            <span class="bullet-title">' + bullets[index].title + '</span>\
                        </span>';
                }
            },
        });
    };
    //图片加载后初始化轮播图
    $(window).on('load', initSwiper);

    //点击指示器切换到相关内容
    $(document).on('click', 'span.my-bullet', function () {
        var $this = $(this);
        var index = $this.data('index');
        if (index === 0) {
            $('section.contact-us-box').addClass('hidden');
            $('section.introduce-box').removeClass('hidden');
        } else if (index === 1) {
            $('section.contact-us-box').removeClass('hidden');
            $('section.introduce-box').addClass('hidden');
        }
    });

}(window, window.document, jQuery);