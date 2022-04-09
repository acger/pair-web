import "./global.js"
import {checkRspResult, alertTop, getImgPath, getScrollHeight, getScrollTop, getWindowHeight, pair} from "./tool.js"
import {elementListUrl} from "./config.js"

let skillList = []
let skillNeedList = []

const SkillInputLi = {
    props: ['list'],
    template: `
        <li v-for="item,i in list" class="list-group-item">
            <input :value="item"
                @change="this.$parent.setItemValue(i, 'skill', $event)"
                @click="this.$parent.addEmptyItem('skill')"
                class="form-control">
        </li>`
}

const SkillNeedInputLi = {
    props: ['list'],
    template: `
        <li v-for="item,i in list" class="list-group-item">
            <input :value="item"
                @change="this.$parent.setItemValue(i, 'need', $event)"
                @click="this.$parent.addEmptyItem('need')"
                class="form-control">
        </li>`
}


const ElementPair = {
    data() {
        return {
            skillList: skillList,
            skillNeedList: skillNeedList,
        }
    },
    methods: {
        getList(type) {
            return type == "skill" ? this.skillList : this.skillNeedList
        },
        setItemValue(i, t, e) {
            this.getList(t)[i] = e.target.value
        },
        addEmptyItem(t) {
            let emptyNum = 0
            let list = this.getList(t)
            list.forEach(function (item) {
                if (item == "") {
                    emptyNum++
                }
            })

            if (emptyNum < 5) {
                this.getList(t).push("")
            }
        }
    },
    components: {
        'skill-input-li': SkillInputLi,
        'need-input-li': SkillNeedInputLi,
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
                    <div class="mt-3 col-12">
                        <template v-if="item.element.highlight_skill != '' || item.element.highlight_skill_need != ''">
                            <div class="pair-skill-preview" v-html:="pairSkill(item.element.highlight_skill, item.element.highlight_skill_need, true)"></div>
                        </template>
                        <template v-else>
                            <div class="pair-skill-preview" v-html:="pairSkill(item.element.skill, item.element.skill_need, false)"></div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        </template>
        <template v-else>
        <div class="text-center">
            <div class="row mt-5">
                <p><b>啊咧咧，没有匹配到任何小伙伴</b></p>
                <p>O x O</p>
                <p class="small mt-5">你可以尝试</p>
            </div>
            <div class="row mt-1">
                <div class="col-12">
                    <button @click="copySiteUrl()" class="btn btn-primary">分享AcgerPair</button>
                </div>
            </div>    
           <div class="row mt-4">
                <div class="col-12">
                    <p class="small">— 或 —</p>
                </div>        
            </div>            
            <div class="row mt-2 mb-5">
                <div class="col-12">
                    <button @click="this.$parent.viewAllUserElement()" class="btn btn-warning">查看活跃用户</button>
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
        copySiteUrl() {
            let copy = (e) => {
                e.preventDefault()
                e.clipboardData.setData('text/plain', "https://acger-pair.com")
                document.removeEventListener('copy', copy)
            }
            document.addEventListener('copy', copy)
            document.execCommand("Copy");
            alertTop("已复制https://acger-pair.com到粘贴板", "success")
        },
        pairSkill(skill, skill_need, isHighlight) {
            let all = skill + " " + skill_need

            if (isHighlight == false){
                return all
            }

            let arr = all.match(/<b>(.*?)<\/b>/g);

            if (!arr) {
                return ""
            }

            let filter = arr.filter(function (item, index, arr) {
                return arr.indexOf(item, 0) === index
            })

            return filter.join(" ")
        }
    },
}

const FriendsListConfig = {
    data() {
        return {
            userElement: [],
            scrollBottom: false,
            page: 1,
            pageSize: 30
        }
    },
    mounted() {
        document.querySelector("#friendsBody").addEventListener('scroll', this.handleScroll)
    },
    destroyed() {
        document.querySelector("#friendsBody").removeEventListener('scroll', this.handleScroll, false);
    },
    methods: {
        handleScroll() {
            let flBody = document.querySelector("#friendsBody")
            let scrollHeight = getScrollHeight(flBody)
            let windowHeight = getWindowHeight(flBody)
            let scrollTop = getScrollTop(flBody)

            if (this.scrollBottom == false && windowHeight + scrollTop >= scrollHeight - 50) {
                this.scrollBottom = true
                pair(this.page, this.pageSize, this)
            }
        },
        viewAllUserElement() {
            this.page = 0
            pair(0, 30, this, elementListUrl)
            document.querySelector("#pairModalLabel").innerHTML = "查看活跃用户"
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
                            <img class="s36 m6p" src="/public/img/icons/envelope.svg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row h500">
            <div class="col-12">
                <div class="row justify-content-center">
                    <div class="col-12">
                            <div class="row justify-content-center">
                                <div class="col-12">
                                    <ul class="nav nav-tabs col-12 m-auto text-center"  role="tablist">
                                        <li class="nav-item col-6" role="presentation">
                                            <button id="skillTabBtn" class="col-12 nav-link active" data-bs-toggle="tab" data-bs-target="#skill2"
                                                    type="button" role="tab" aria-controls="skill" aria-selected="true">拥有的技能
                                            </button>
                                        </li>
                                        <li class="nav-item col-6" role="presentation">
                                            <button class="col-12 nav-link" data-bs-toggle="tab" data-bs-target="#skill-need2"
                                                    type="button" role="tab" aria-controls="skill-need" aria-selected="false">寻找的技能
                                            </button>
                                        </li>
                                    </ul>
                                    <div class="tab-content">
                                        <div class="tab-pane fade show active" id="skill2" role="tabpanel" aria-labelledby="skill-tab">
                                            <ul class="list-group">
                                                    <li v-for="item,i in skillList" class="list-group-item">
                                                        <span v-html="item"></span>
                                                    </li>
                                                <li class="list-group-item">
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="tab-pane fade" id="skill-need2" role="tabpanel" aria-labelledby="skill-need-tab">
                                            <ul class="list-group">
                                                    <li v-for="item,i in skillNeedList" class="list-group-item">
                                                        <span v-html="item"></span>
                                                    </li>
                                                <li class="list-group-item">
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
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
        skillList() {
            let list = []

            if (this.detail && this.detail.element) {
                if (this.detail.element.highlight_skill) {
                    list = this.detail.element.highlight_skill.split(" ")
                } else if (this.detail.element.skill != "") {
                    list = this.detail.element.skill.split(" ")
                }
            }

            return list
        },
        skillNeedList() {
            let list = []

            if (this.detail && this.detail.element) {
                if (this.detail.element.highlight_skill_need) {
                    list = this.detail.element.highlight_skill_need.split(" ")
                } else if (this.detail.element.skill != "") {
                    list = this.detail.element.skill_need.split(" ")
                }
            }

            return list
        }
    },
    components: {
        'ele-detail-li': UserEleLi,
        'skill-input-li': SkillInputLi,
        'need-input-li': SkillNeedInputLi,
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
        <template v-if="item.message.length > 0">
        <template v-if="item.uid == to.id">
         <div class="row mb-3 justify-content-center chat-max-with">
            <div class="col-11 p-2">
                <div class="row align-items-top">
                    <div class="col-3 col-lg-1 col-mid-1 text-center">
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
                    <div class="col-3 col-lg-1 col-mid-1 text-center">
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