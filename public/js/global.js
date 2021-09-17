$(document).ready(function () {
    $.ajaxSetup({
        contentType: "application/json",
        headers: {
            "Authorization": window.localStorage.getItem("token"),
        },
        error: function (xhr, textStatus, errorThrown) {
            switch (xhr.status) {
                case(500):
                    alert("服务器系统内部错误");
                    break;
                case(401):
                    window.location.href = "/#login"
                    break;
                case(403):
                    alert("无权限执行此操作");
                    break;
                case(408):
                    alert("请求超时");
                    break;
                default:
                    alert("未知错误");
            }
        },
    })
    ;
});

