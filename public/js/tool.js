import {imgHost} from "./config.js"

/**
 * 获取图片文件后缀
 * @param type MIME类型
 * @returns {string}
 */
export function getImageSuffix(type) {
    let suffix = ""
    switch (type) {
        case "image/jpeg":
            suffix = "jpg"
            break
        case "image/png":
            suffix = "png"
            break
        case "image/gif":
            suffix = "gif"
            break
        case "image/webp":
            suffix = "webp"
            break
    }

    return suffix
}

/**
 * 获取图片地址
 * @param img 图片路径
 * @returns {string}
 */
export function getImgPath(img) {
    return imgHost + '/' + img
}

/**
 * 顶部提示框
 * @param message 提示内容
 * @param type  提示类型
 */
export function alertTop(message, type) {
    if (!message) {
        message = "出错了( >﹏<。)"
    }

    if (!type) {
        type = "danger"
    }

    let alert = '<div class="fixed-top text-center alert-tips alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    let a = $(alert)

    $("body").append(a)
    a.delay(5000).slideUp("fast", function () {
        $(this).remove()
    })

    return
}

/**
 * 请求结果处理
 * @param result    返回值
 * @param state     返回状态
 * @returns {boolean}
 */
export function checkRspResult(result, state) {
    if (state != "success") {
        alertTop()
        return false
    }

    if (result.code != 0) {
        alertTop(result.message)
        return false
    }

    return true
}