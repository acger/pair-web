import "./global.js"
import {checkRspResult, alertTop, getImgPath} from "./tool.js"
import {vm, fl, ue, cl} from "./components.js"
import {
    elementUrl,
    elementSaveUrl,
    elementPairUrl,
    chatWsUrl,
    chatMessageUrl,
    chatMessageSaveUrl,
    chatHistorySaveUrl,
} from "./config.js"

$(document).ready(function () {
    let conn

    $("#chatModal").on("show.bs.modal", function (e) {
        let target = e.relatedTarget
        let data = target.getAttribute("data-bs-to")
        let user = localStorage.getItem("user")

        cl.toUser = JSON.parse(data)
        cl.fromUser = JSON.parse(user)

        cl.status = true

        let chatData = {
            uid: cl.fromUser.id,
            to_uid: cl.toUser.id,
            page: cl.list_page,
            page_size: cl.page_size,
        }

        $.post(chatMessageUrl, JSON.stringify(chatData), function (result, state) {
            if (!checkRspResult(result, state)) {
                return
            }

            cl.list = result.chat

            setTimeout(function () {
                let scrollHeight = $("#chatMessageList").prop("scrollHeight");
                $("#chatMessageList").scrollTop(scrollHeight)
            }, 200)
        })

        conn = new WebSocket(chatWsUrl + "?uid=" + cl.fromUser.id + "&to_uid=" + cl.toUser.id);

        conn.onopen = function (evt) {
            let data = {
                uid: cl.fromUser.id,
                to_uid: cl.toUser.id,
                message: "",
                client_num: 0,
            }

            let dataJson = JSON.stringify(data)

            $.post(chatHistorySaveUrl, dataJson, function (result, state) {
                if (!checkRspResult(result, state)) {
                    return
                }
            })

            conn.send(dataJson)

        }

        conn.onclose = function (evt) {
        };

        conn.onmessage = function (evt) {
            let data = JSON.parse(evt.data)
            cl.toUserStatus = data.client_num > 1

            if (data.message == "") {
                return
            }

            cl.list.push(data)
            let scrollHeight = $("#chatMessageList").prop("scrollHeight");
            $("#chatMessageList").animate({scrollTop: scrollHeight}, 400);
        };
    })

    $("#chatModal").on("hide.bs.modal", function (e) {
        if (conn) {
            conn.close()
        }
    })

    $("#chatMessage").bind("keypress", function (event) {
        if (event.key == "Enter") {
            $("#chatSendBtn").click()
        }
    });

    $("#chatSendBtn").on("click", function (e) {
        let msg = $("#chatMessage").val()

        if (msg.length == 0) {
            return
        }

        let data = {
            uid: cl.fromUser.id,
            to_uid: cl.toUser.id,
            message: msg,
            client_num: 0,
            status: cl.toUserStatus,
        }

        let dataJson = JSON.stringify(data)

        /*
        $.post(chatMessageSaveUrl, dataJson, function (result, state) {
            if (!checkRspResult(result, state)) {
                return
            }
        })
        */

        conn.send(dataJson);
        $("#chatMessage").val("")
    })

})



