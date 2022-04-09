import "./global.js"
import {userLoginUrl, userRegisterUrl, chatHistoryNumberUrl} from "./config.js"
import {alertTop, checkRspResult, getImgPath} from "./tool.js"

$(document).ready(function () {
    init()

    /**
     * 初始化
     */
    function init() {
        checkUserInfo()
        checkUrlTag()
        getFriendsNumber()
    }

    /**
     * 获取好友人数
     */
    function getFriendsNumber() {
        if (!getUserStatus()) {
            return
        }

        $.get(chatHistoryNumberUrl, function (result, state) {
            if (!checkRspResult(result, state)) {
                return
            }

            if (result.number > 0) {
                $("#friendsBtn").removeClass("d-none")
            }
        })
    }

    /**
     * 检查url是否有tag
     */
    function checkUrlTag() {
        let url = window.location.href

        if (url.indexOf("#login") > -1) {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            $("#startBtn").click()
        }
    }

    /**
     * 获取用户状态
     * @returns {boolean}
     */
    function getUserStatus() {
        let userInfo = localStorage.getItem("user")

        if (userInfo) {
            return true
        } else {
            return false
        }
    }

    /**
     * 设置用户信息
     */
    function checkUserInfo() {
        let userInfo = localStorage.getItem("user")

        if (userInfo) {
            userInfo = JSON.parse(userInfo)
            $("#userAvatarImg").attr("src", getImgPath(userInfo.avatar))
            $("#userInfoBlock").removeClass("d-none")
        }
    }

    //开始按钮
    let startModal = document.getElementById('startModal')
    startModal.addEventListener('show.bs.modal', function (event) {
        if (getUserStatus()) {
            event.preventDefault()
            location.href = "/element.html"
        }
    })

    //登录按钮
    $("#loginBtn").on("click", function () {
        let account = $("#loginAccount").val()
        let pwd = $("#loginPassword").val()

        if (!account || !pwd) {
            alertTop("请填写账号密码")
            return
        }

        let data = {
            account: account,
            password: pwd,
        }

        $.ajax({
            url: userLoginUrl,
            data: JSON.stringify(data),
            type: "POST",
            success: function (result, state) {
                if (!checkRspResult(result, state)) {
                    return
                }

                window.localStorage.setItem("token", result.token)
                window.localStorage.setItem("user", JSON.stringify(result.user))
                let user = window.localStorage.getItem("user")

                location.href = "/element.html"
            },
            error: function (result, state) {
                alertTop("系统错误")
            }
        })
    });

    //注册按钮
    $("#registerBtn").click(function () {
        let account = $("#loginAccount").val()
        let pwd = $("#loginPassword").val()

        if (!account || !pwd) {
            alertTop("请填写账号密码")
            return
        }

        if (account.length < 6) {
            alertTop("账号不得少于6位数")
            return
        }

        if (pwd.length < 6) {
            alertTop("密码不得少于6位数")
            return
        }

        let data = {
            account: account,
            password: pwd,
        }

        $.post(userRegisterUrl, JSON.stringify(data), function (result, state) {
            if (!checkRspResult(result, state)) {
                return
            }

            window.localStorage.setItem("token", result.token)
            window.localStorage.setItem("user", JSON.stringify(result.user))

            location.href = "/element.html"
        })
    });
});