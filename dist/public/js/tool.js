import {imgHost, elementPairUrl} from "./config.js"

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
 * 生成随机码
 * @returns {string}
 */
export function getUUID() {
    let len = Math.floor(Math.random() * 10 + 1)
    return Number(Math.random().toString().substr(2, len) + Date.now()).toString(36)
}

/**
 * 匹配队友
 * @param page
 * @param pageSize
 * @param that
 * @param url
 */
export function pair(page, pageSize, that,url) {

    if (!url){
        url = elementPairUrl
    }

    $.ajax({
        url: url,
        type: "GET",
        data: {"page": page + 1, "pageSize": pageSize},
        dataType: "json",
        success: function (response, state) {
            if (!checkRspResult(response, state)) {
                return
            }

            if (response.userElement.length == 0) {
                return
            }

            that.userElement.push.apply(that.userElement, response.userElement)
            that.page += 1
            that.scrollBottom = false
        },
        error: function (err) {
            if (!checkRspResult(err, state)) {
                return
            }
        }
    })
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

/**
 * 滚动条在Y轴上的滚动距离
 * @returns {number}
 */
export function getScrollTop(elementBody) {
    let scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if (elementBody) {
        bodyScrollTop = elementBody.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}


/**
 * 文档的总高度
 * @returns {number}
 */
export function getScrollHeight(elementBody) {
    let scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if (elementBody) {
        bodyScrollHeight = elementBody.scrollHeight;
    }
    if (elementBody.documentElement) {
        documentScrollHeight = elementBody.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}

/**
 * 浏览器视口的高度
 * @returns {number}
 */
export function getWindowHeight(elementBody) {
    let windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = elementBody.clientHeight;
    }
    return windowHeight;
}