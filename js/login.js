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

//----------------------------业务逻辑开始-------------------------
//登录提示
function alert2(str, type) {
    if (str == "")
        str = "&nbsp;";

    if (type == "Hint")
    {
        //登录中提示用绿色
        $("#lbTip").css("color","green");
        $("#lbTip").html(str);
    }
    else if (type == "Error")
    {
        //登录失败提示用红色
        $("#lbTip").css("color", "red");
        $("#lbTip").html(str);
    }
}
//是否勾选过记住密码 
function setCheck(b) {
    var c = $('#Remember_me').is(':checked');

    if (b) {
        if (c)
            return;
        else
            $("#Remember_me").click();
    } else {
        if (c)
            $("#Remember_me").click();
        else
            return;
    }
}

$(function () {
    alert2("", "");

    var c1 = $.cookie('txtPhone');
    if (c1 != null && c1 != "null") {
        $("#txtPhone").val(c1);
        setCheck(true);
    }
    else
        setCheck(false);

    if ($.cookie('txtPassword') != null && $.cookie('txtPassword') != "null")
        $("#txtPassword").val($.cookie('txtPassword'));

    setInterval(CheckSCAN, 3000);
    function CheckSCAN() {
        var RndNum = $("#hidRndNum").val();
        $.ajax({
            type: "post",
            url: "WechatLogin", //用ajax新建一条记录
            data:{"RndNum":RndNum},
            //async: false,
            cache: false,
            success: function (data) {
                if (data.Code == "0") {
                    $("#img_footer").css("color", "#000");
                    $("#img_footer").html("扫描成功，正在跳转...");
                    window.location.href = "Home/Index";
                }
            }
        });
    }

    //登录提交
    $("#aLogin").click(function () {
        alert2("", "");

        if ($("#txtPhone").val() == "" || ($("#txtPhone").val().length != 11 && $("#txtPhone").val().length != 12)) {
            alert2("请输入正确手机号！","Error");
            $("#txtPhone").focus();
            return false;
        }

        if ($("#txtPhone").val().length == 12) {
            if ($("#txtPhone").val()[11] != 'a' && $("#txtPhone").val()[11] != 'b' && $("#txtPhone").val()[11] != 'c' && $("#txtPhone").val()[11] != 'd') {
                alert2("请输入正确手机号！", "Error");
                $("#txtPhone").focus();
                return false;
            }
        }

        if ($("#txtPassword").val() == "") {
            alert2("请输入密码！", "Error");
            $("#txtPassword").focus();
            return false;
        }

        alert2("正在登录 ...", "Hint");

        $.ajax({
            url: "PCLogin",
            data: {"phone": $("#txtPhone").val(), "psw": $("#txtPassword").val() },
            type: "POST",
            dataType: "json",
            success: function (data) {
                debugger;
                if (data.Code == "0") {
                    var bCheck = $('#Remember_me').is(':checked');
                    if (bCheck != "") {  //记住登陆账号
                        var c = $("#txtPhone").val();
                        $.cookie('txtPhone', c, { expires: 365 });
                        var p = $("#txtPassword").val();
                        $.cookie('txtPassword', p, { expires: 365 });
                    }
                    else {
                        $.cookie('txtPhone', null);
                        $.cookie('txtPassword', null);
                    }

                    //$("#btnLogin").html("登录");
                    alert2("登录成功，正在跳转 ...", "Hint");
                    window.location.href = '../Home/Index';

                }
                else {
                    //$("#btnLogin").html("登录");
                    alert2(data.Msg, "Error");
                    $("#txtPassword").focus();
                    $("#txtPassword").select();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //$("#btnLogin").html("登录");
                alert2("网络错误，请稍后再试！", "Error");
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            }

        });

        return false;
    })
})