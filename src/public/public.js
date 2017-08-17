/*const proxyUrl = 'http://192.168.1.109:8080';
 const tipsIconUrl = 'assets/img/user-12.jpg';
 const imgSrc = 'assets/img';*/

const proxyUrl = 'http://192.168.252.51/';
const tipsIconUrl = '../assets/img/user-12.jpg';
const imgSrc = '../assets/img';

//确认弹出框
const confirmPop = function (title, text, fn) {
    if ($('#confirmPop').length == 0) {
        var str = '<div class="modal fade" id="confirmPop"><div class="modal-dialog"><div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true" id="cancelConfirmTop">×</button>' +
            '<h4 class="modal-title" id="confirmPopTitle">' + title + '</h4>' +
            '</div><div class="modal-body">' +
            '<p id="confirmPopText">' + text + '</p>' +
            '</div><div class="modal-footer">' +
            '<a class="btn btn-sm btn-white" data-dismiss="modal" id="cancelConfirm">关闭</a>' +
            '<a class="btn btn-sm btn-success" id="sureConfirm">确定</a></div></div></div> </div>';
        $(str).appendTo($('body'));
    } else {
        $('#confirmPopTitle').text(title);
        $('#confirmPopText').text(text);
    }
    $('#cancelConfirmTop').off('click');
    $('#cancelConfirmTop').click(function () {
        confirmHide();
    });
    $('#cancelConfirm').off('click');
    $('#cancelConfirm').click(function () {
        confirmHide();
    });
    $('#sureConfirm').off('click');
    $('#sureConfirm').click(function () {
        fn.call(window);
        confirmHide();
    });
    $('#confirmPop').modal({backdrop: 'static', keyboard: false});
    function confirmHide() {
        $('#confirmPop').modal('hide');
    }
};

//回车事件
const enterEvent = function (ele, fn) {
    $(ele).keypress(function (e) {
        var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if (keyCode == 13) {
            fn.call(window);
        }
    });
};

//ajax
const ajaxGet = function (url, data, fn) {
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'jsonp',
        contentType: 'application/json',
        data: data,
        error: function () {
            console.log('error');
        },
        success: function (data) {
            fn.call(window, data, url);
        }
    });
};

const ajaxPost = function (url, data, fn) {
    $.ajax({
        type: 'POST',
        url: url,
        dataType: 'jsonp',
        contentType: 'application/json',
        data: JSON.stringify(data),
        error: function () {
            console.log('error');
        },
        success: function (data) {
            fn.call(window, data, url);
        }
    });
};

const ajaxPut = function (url, data, fn) {
    $.ajax({
        type: 'PUT',
        url: url,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        error: function () {
            console.log('error');
        },
        success: function (data) {
            fn.call(window, data, url);
        }
    });
};

const ajaxDel = function (url, data, fn) {
    $.ajax({
        type: 'DELETE',
        url: url,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        error: function () {
            console.log('error');
        },
        success: function (data) {
            fn.call(window, data, url);
        }
    });
};

const stopPropagation = function (e) {
    e.nativeEvent.stopImmediatePropagation();
};

const preventDefault = function (e) {
    if (e && e.preventDefault) {
        e.preventDefault();
    } else {
        window.event.returnValue = false;
    }
};

const isPc = function () {
    let userAgentInfo = navigator.userAgent;
    let Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

export {
    isPc,
    proxyUrl,
    tipsIconUrl,
    imgSrc,
    confirmPop,
    enterEvent,
    stopPropagation,
    preventDefault,
    ajaxGet,
    ajaxPost,
    ajaxPut,
    ajaxDel
}