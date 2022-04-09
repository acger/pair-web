//根域名
const ROOT_DOMAIN = "acger-pair.com"
export const Protocol = "https://"
export const WsProtocol = "wss://"
export const userApiHost = Protocol + ROOT_DOMAIN + "/user"
export const pairApiHost = Protocol + ROOT_DOMAIN + "/pair"
export const chatApiHost = ROOT_DOMAIN + "/chat"
export const imgHost = Protocol + "img-ffl.nocilol.com"

//七牛
export const qiniuUpTokenUrl = userApiHost + "/qiniu/up/token"

//用户中心
export const userLoginUrl = userApiHost + "/login"
export const userRegisterUrl = userApiHost + "/register"
export const userProfileUrl = userApiHost + "/profile"
export const userProfileEditUrl = userApiHost + "/profile/edit"

//元素匹配
export const elementUrl = pairApiHost + "/element"
export const elementSaveUrl = pairApiHost + "/element/save"
export const elementPairUrl = pairApiHost + "/element/pair"
export const elementListUrl = pairApiHost + "/element/list"

//聊天
export const chatWsUrl = WsProtocol + chatApiHost + "/ws"
export const chatMessageUrl = Protocol + chatApiHost + "/message"
export const chatMessageSaveUrl = Protocol + chatApiHost + "/message/save"
export const chatHistoryUrl = Protocol + chatApiHost + "/history"
export const chatHistorySaveUrl = Protocol + chatApiHost + "/history/save"
export const chatHistoryNumberUrl = Protocol + chatApiHost + "/history/number"