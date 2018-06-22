! function (window, document, $, undefined) {
    'use strict';
    //根据日期对象获得格式化时间字符串
    var formatTime = function (date, separator) {
        separator = separator || ':';
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return padZero(hour) + separator + padZero(minute) + separator + padZero(second);
    };
    //如果数字为一位数字，则前面补一个0
    var padZero = function (num) {
        return num < 10 ? ('0' + num) : num + '';
    };
    //根据日期对象获得格式化日期字符串
    var formatDate = function (date, separator) {
        separator = separator || '/';
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        return year + separator + padZero(month) + separator + padZero(day);
    };
    //时钟函数
    var clock = function () {
        var now = new Date();
        document.getElementById('time').innerHTML = formatTime(now);
        //document.getElementById('date').innerHTML = formatDate(now);
        setTimeout(clock, 1000);
    };
    clock();
}(window, window.document, jQuery);