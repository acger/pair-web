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

let EmptyPastItem = {name: "", mode: "past"}
let EmptyPresentItem = {name: "", mode: "present"}
let EmptyFutureItem = {name: "", mode: "future"}

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
        list.forEach(function (item) {
            switch (item.mode) {
                case "past":
                    vm.pastList.push(item)
                    break;
                case "present":
                    vm.presentList.push(item)
                    break;
                case "future":
                    vm.futureList.push(item)
                    break;
            }
        })

        for (let i = 0; i < 5; i++) {
            vm.pastList.push(EmptyPastItem)
            vm.presentList.push(EmptyPresentItem)
            vm.futureList.push(EmptyFutureItem)
        }
    }

    /**
     * 合并元素
     * @returns {*[]}
     */
    function megreListData() {
        let data = []

        vm.pastList.forEach(function (item) {
            if (item.name == "") {
                return
            }
            data.push(item)
        })

        vm.presentList.forEach(function (item) {
            if (item.name == "") {
                return
            }
            data.push(item)
        })

        vm.futureList.forEach(function (item) {
            if (item.name == "") {
                return
            }
            data.push(item)
        })

        return data
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

    //Pair按钮监听
    $("#pairBtn").on("click", function (e) {
        let listData = megreListData()
        let data = {element: listData}

        $.post(elementSaveUrl, JSON.stringify(data), function (result, state) {
            if (!checkRspResult(result, state)) {
                return
            }

            $.get(elementPairUrl, function (response, state) {
                if (!checkRspResult(response, state)) {
                    return
                }

                fl.userElement = response.userElement
            })
        })
    })

    $("#elementModal").on("show.bs.modal", function (e) {
        let target = e.relatedTarget
        let data = target.getAttribute('data-bs-ele')
        let eleDetail = JSON.parse(data)
        ue.userElement = eleDetail
    })
})




