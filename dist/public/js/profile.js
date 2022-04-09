import "./global.js"
import {userProfileUrl, userProfileEditUrl, qiniuUpTokenUrl} from "./config.js"
import {alertTop, checkRspResult, getImgPath, getImageSuffix, getUUID} from "./tool.js"

const ProfileConfig = {
    data() {
        return {
            id: 0,
            account: "",
            name: "",
            avatar: "avatar/0.jpg",
            password: "",
        }
    },
    computed: {
        avatarUrl() {
            return getImgPath(this.avatar)
        }
    }
}

let userProfile = Vue.createApp(ProfileConfig)
let up = userProfile.mount("#userProfile")

$(document).ready(function () {
    loadUserInfo()

    //获取用户信息
    function loadUserInfo() {
        $.get(userProfileUrl, function (result, state) {
            if (!checkRspResult(result, state)) {
                return
            }

            up.id = result.user.id
            up.account = result.user.account
            up.name = result.user.name
            up.avatar = result.user.avatar
        })
    }

    //上传头像
    $("#userAvatar").on("click", function () {
        $("#avatarFile").click()
    })

    $("#avatarFile").on("change", function (e) {
        let file = e.currentTarget.files[0]
        let path = URL.createObjectURL(file);
        let key = "avatar/" + getUUID() + "." + getImageSuffix(file.type)
        let data = {name: ""}

        const observer = {
            next(res) {
            },
            error(err) {
                alertTop("头像上传错误")
            },
            complete(res) {
                up.avatar = res.key
            }
        }

        $("#userAvatar").attr('src', path);

        $.post(qiniuUpTokenUrl, JSON.stringify(data), function (result, state) {
            if (!checkRspResult(result, state)) {
                return
            }

            const observable = qiniu.upload(file, key, result.token)
            const subscription = observable.subscribe(observer)
        })
    })

    //注销登陆
    $("#logoutBtn").on("click", function () {
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("user")
        location.href = "/"
    })

    //保存用户资料修改
    $("#editProfileBtn").on("click", function () {
        let data = {
            name: up.name,
            avatar: up.avatar,
            password: up.password,
        }

        $.post(userProfileEditUrl, JSON.stringify(data), function (result, state) {
            if (!checkRspResult(result, state)) {
                return
            }

            alertTop("修改成功", "success")

            let localData = {
                id: up.id,
                account: up.account,
                name: up.name,
                avatar: up.avatar,
            }

            localStorage.setItem("user", JSON.stringify(localData))
        })
    })
});














