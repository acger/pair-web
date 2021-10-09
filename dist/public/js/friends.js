import "./global.js"
import {chatHistoryUrl} from "./config.js"
import {alertTop, checkRspResult, getImgPath} from "./tool.js"
import {vm, fl, ue, cl} from "./components.js"

const FriendsLi = {
    props: ['list'],
    template: `
        <template v-if="list.length > 0">
        <div v-for="item,i in list" class="row mb-3 justify-content-center">
            <div class="col-11 p-2 border rounded bg-light">
                <div class="row align-items-center">
                    <div class="col-3">
                        <img class="s60 border border-1 rounded-circle" :src="img(item.avatar)">
                    </div>
                    <div class="col-6">
                        <section class="mb-1">{{item.account}}</section>
                        <section class="mb-0">{{item.name}}</section>
                    </div>
                    <div class="col-3">
                        <div class="s50 border rounded-circle justify-content-center"
                        :class="statusColor(item.status)"
                        data-bs-toggle="modal" :data-bs-to="detailString(item)" data-bs-target="#chatModal">
                            <img class="s36 m6p" src="/public/img/icons/envelope.svg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </template>
    `,
    methods: {
        img(url) {
            return getImgPath(url)
        },
        detailString(detail) {
            return JSON.stringify(detail)
        },
        statusColor(status) {
            if (!status) {
                return "border-danger"
            } else {
                return "border-info"
            }
        }
    },
}

const FriendsListConfig = {
    data() {
        return {
            user: [],
        }
    },
    components: {
        'fri-li': FriendsLi,
    }
}

let friendsList = Vue.createApp(FriendsListConfig)
let fri = friendsList.mount("#friList")


$(document).ready(function () {

    getFriends()

    function getFriends() {
        $.get(chatHistoryUrl, function (result, state) {
            if (!checkRspResult(result, state)) {
                return
            }

            fri.user = result.user
        })
    }
});














