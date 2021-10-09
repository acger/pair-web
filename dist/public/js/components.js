import "./global.js"
import {checkRspResult, alertTop, getImgPath} from "./tool.js"

let pastList = []
let presentList = []
let futureList = []

const EleInputLi = {
    props: ['list'],
    template: `
        <li v-for="item,i in list" class="list-group-item">
            <input :value="item.name"
                @change="this.$parent.setItemValue(i, item.mode, $event)"
                @click="this.$parent.addEmptyItem(item.mode)"
                class="form-control">
        </li>`
}

const ElementPair = {
    data() {
        return {
            pastList: pastList,
            presentList: presentList,
            futureList: futureList,
        }
    },
    methods: {
        getListByMode(mode) {
            let list = []
            switch (mode) {
                case "past":
                    list = this.pastList;
                    break;

                case "present":
                    list = this.presentList;
                    break;

                case "future":
                    list = this.futureList;
                    break;
            }

            return list
        },
        setItemValue(i, mode, e) {
            let list = this.getListByMode(mode)
            list[i] = {name: e.target.value, mode: mode}
        },
        addEmptyItem(mode) {
            let emptyNum = 0
            let list = this.getListByMode(mode)
            list.forEach(function (item) {
                if (item.name == "") {
                    emptyNum++
                }
            })

            if (emptyNum < 3) {
                list.push({name: "", mode: mode})
            }
        }
    },
    components: {
        'element-input-li': EleInputLi,
    }
}

let app = Vue.createApp(ElementPair)
export let vm = app.mount("#elementForm")

const FriendsLi = {
    props: ['list'],
    template: `
        <template v-if="list.length > 0">
        <div v-for="item,i in list" class="row mb-3 justify-content-center">
            <div class="col-11 p-2 border rounded bg-light">
                <div class="row align-items-center" :data-bs-ele="detailString(item)" data-bs-toggle="modal"
                     data-bs-target="#elementModal">
                    <div class="col-3 ">
                        <img class="s60 border border-1 rounded-circle" :src="img(item.avatar)">
                    </div>
                    <div class="col-6">
                        <section class="mb-1">{{item.account}}</section>
                        <section class="mb-0">{{item.name}}</section>
                    </div>
                    <div class="col-3">
                        <div class="s50 border border-info rounded-circle text-center">
                            <b class="s50f">NO.{{i+1}}</b>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </template>
        <template v-else>
            <p>啊咧咧，没有匹配到任何小伙伴</p>
        </template>
    `,
    methods: {
        img(url) {
            return getImgPath(url)
        },
        detailString(detail) {
            return JSON.stringify(detail)
        }
    },
}

const FriendsListConfig = {
    data() {
        return {
            userElement: [],
        }
    },
    components: {
        'friends-li': FriendsLi,
    }
}

let friendsList = Vue.createApp(FriendsListConfig)
export let fl = friendsList.mount("#friendsList")

const UserEleLi = {
    props: ['list'],
    template: `
        <template v-if="list.length > 0">
            <li class="list-group-item" v-for="e in list">
                <input :value="e.name" class="form-control" disabled>
            </li>
        </template>
        <template v-else>
            <li class="list-group-item">
                <input value="" class="form-control" disabled>
            </li>
        </template>
    `,
}

const UserElementDetail = {
    props: ['detail'],
    template: `
        <template v-if="isEmpty">
        <div class="row mb-3 justify-content-center">
            <div class="col-11 p-2 border rounded bg-light">
                <div class="row align-items-center">
                    <div class="col-3 ">
                        <img class="s60 border border-1 rounded-circle" :src="img(detail.avatar)">
                    </div>
                    <div class="col-6">
                        <section class="mb-1">{{detail.account}}</section>
                        <section class="mb-0">{{detail.name}}</section>
                    </div>
                    <div class="col-3">
                        <div class="s50 border border-danger rounded-circle justify-content-center"
                        data-bs-toggle="modal" :data-bs-to="detailJson" data-bs-target="#chatModal">
                            <img class="s36 m6p" src="/dist/publicublic/img/icons/envelope.svg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="row justify-content-center">
                    <div class="col-12">
                        <div id="eleDetailControls" class="carousel carousel-dark slide"
                             data-bs-interval="false"
                             data-bs-ride="carousel">
                            <div class="carousel-inner m-auto text-center">
                                <div class="carousel-item active">
                                    <ul class="list-group">
                                        <li class="list-group-item">
                                            <p class="pt-2">曾经的 · Past</p>
                                        </li>
                                        <ele-detail-li :list="pastList"></ele-detail-li>
                                    </ul>
                                </div>
                                <div class="carousel-item">
                                    <ul class="list-group">
                                        <li class="list-group-item">
                                            <p class="pt-2">现在的 · Present</p>
                                        </li>
                                        <ele-detail-li :list="presentList"></ele-detail-li>
                                    </ul>
                                </div>
                                <div class="carousel-item">
                                    <ul class="list-group">
                                        <li class="list-group-item">
                                            <p class="pt-2">未来的 · Future</p>
                                        </li>
                                        <ele-detail-li :list="futureList"></ele-detail-li>
                                    </ul>
                                </div>
                            </div>
                            <button class="carousel-control-next pair-btn-reset"
                                    type="button"
                                    data-bs-target="#eleDetailControls"
                                    data-bs-slide="next">
                                <span class="icon-right" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
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
        }
    },
    computed: {
        isEmpty() {
            return this.detail.avatar
        },
        detailJson() {
            let user = {
                id: this.detail.id,
                name: this.detail.name,
                account: this.detail.account,
                avatar: this.detail.avatar,
            }

            return JSON.stringify(user)
        },
        pastList() {
            let list = []

            if (this.detail && this.detail.element) {
                this.detail.element.forEach(function (item) {
                    if (item.mode == "past") {
                        list.push(item)
                    }
                })
            }

            return list
        },

        presentList() {
            let list = []

            if (this.detail && this.detail.element) {
                this.detail.element.forEach(function (item) {
                    if (item.mode == "present") {
                        list.push(item)
                    }
                })
            }

            return list
        },

        futureList() {
            let list = []

            if (this.detail && this.detail.element) {
                this.detail.element.forEach(function (item) {
                    if (item.mode == "future") {
                        list.push(item)
                    }
                })
            }

            return list
        }
    },
    components: {
        'ele-detail-li': UserEleLi,
    }
}

const ElementModalConfig = {
    data() {
        return {
            userElement: {}
        }
    },
    components: {
        'user-element-detail': UserElementDetail,
    }
}

let userEleModal = Vue.createApp(ElementModalConfig)
export let ue = userEleModal.mount("#userElementDetail")

const chatLi = {
    props: ['list', 'from', 'to'],
    template: `
        <template v-for="item in list">
        <template v-if="item.uid == to.id">
         <div class="row mb-3 justify-content-center">
            <div class="col-11 p-2">
                <div class="row align-items-top">
                    <div class="col-3 text-center">
                        <img class="s60 border border-1 rounded-circle" :src="img(to.avatar)">
                        <p v-if="to.name" class="word-break-all small">{{to.name}}</p>
                        <p v-else class="word-break-all small">{{to.account}}</p>
                    </div>
                    <div class="col-9">
                        <p class="p-2 w-fc word-break-all border border-info bg-light rounded">{{item.message}}</p>
                    </div>
                </div>
            </div>
        </div>
        </template>
        <template v-else>
        <div class="row mb-3 justify-content-center">
            <div class="col-11 p-2">
                <div class="row align-items-top">
                    <div class="col-9">
                        <div class="position-relative">
                            <p class="p-2 w-fc word-break-all position-absolute chat-right border border-info bg-light rounded">
                            {{item.message}}</p>
                        </div>
                    </div>
                    <div class="col-3 text-center">
                        <img class="s60 border border-1 rounded-circle"
                             :src="img(from.avatar)">
                        <p v-if="from.name" class="word-break-all small">{{from.name}}</p>
                        <p v-else class="word-break-all small">{{from.account}}</p>
                    </div>
                </div>
            </div>
        </div>
        </template>
        </template>
    `,
    methods: {
        img(url) {
            return getImgPath(url)
        }
    },
}

const ChatListConfig = {
    data() {
        return {
            list: [],
            toUser: null,
            fromUser: null,
            status: false,
            toUserStatus: false,
            list_page: 1,
            page_size: 6,
            list_total: 0,
        }
    },
    components: {
        'chat-li': chatLi
    }
}

let chatList = Vue.createApp(ChatListConfig)
export let cl = chatList.mount("#chatList")