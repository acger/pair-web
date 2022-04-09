import "./global.js"
import {checkRspResult, alertTop, getImgPath, pair} from "./tool.js"
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
    getUserElement()

    /**
     * 获取用户元素列表
     */
    function getUserElement() {
        $.get(elementUrl, function (result, state) {
            if (!checkRspResult(result, state)) {
                return
            }

            exportElement(result.element)
        })
    }

    /**
     * 元素拆分
     * @param list 元素原始列表
     */
    function exportElement(list) {
        if (!list.skill) {
            list.skill = ""
        }

        if (!list.skill_need) {
            list.skill_need = ""
        }

        vm.skillList = list.skill.split(" ")
        vm.skillNeedList = list.skill_need.split(" ")

        for (let i = 0; i < 5; i++) {
            vm.skillList.push("")
            vm.skillNeedList.push("")
        }
    }

    /**
     * 获取聊天频道名称
     * @param a from uid
     * @param b to uid
     * @returns {string}
     */
    function getChatRoomName(a, b) {
        if (a > b) {
            let c = b
            b = a
            a = c
        }

        return a + "-" + b
    }

    /**
     * 合并数据
     * @returns {{element: {skill: *[], skill_need: *[]}}}
     */
    function mergeData() {
        let skillArr = []
        let needArr = []
        let data = {skill: [], skill_need: []}

        vm.skillList.forEach(function (item) {
            if (item) {
                skillArr.push(item)
            }
        })

        vm.skillNeedList.forEach(function (item) {
            if (item) {
                needArr.push(item)
            }
        })

        data.skill = skillArr.join(" ")
        data.skill_need = needArr.join(" ")

        return {"element": data}
    }

    //Pair按钮监听
    $("#pairBtn").on("click", function (e) {
        $("#pairModalLabel").html("匹配到的小伙伴")

        let data = mergeData()

        $.post(elementSaveUrl, JSON.stringify(data), function (result, state) {
            if (!checkRspResult(result, state)) {
                return
            }

            $.ajax({
                url: elementPairUrl,
                dataType: "json",
                type: "GET",
                success: function (response) {
                    if (!checkRspResult(response, state)) {
                        return
                    }

                    fl.userElement = response.userElement
                },
                error: function (response, state) {
                    if (!checkRspResult(response, state)) {
                        return
                    }
                }
            })
        })
    })

    $("#elementModal").on("show.bs.modal", function (e) {
        let target = e.relatedTarget
        let data = target.getAttribute('data-bs-ele')
        let eleDetail = JSON.parse(data)

        ue.userElement = eleDetail

        $("#skillTabBtn").click()
    })
})




