//根域名
const ROOT_DOMAIN = "acger-pair.com"
export const Protocol = "https://"
export const WsProtocol = "wss://"
export const userApiHost = Protocol + "api-user." + ROOT_DOMAIN
export const pairApiHost = Protocol + "api-pair." + ROOT_DOMAIN
export const chatApiHost = "api-chat." + ROOT_DOMAIN
export const imgHost = Protocol + "img-ffl.nocilol.com"

//七牛
export const qiniuUpTokenUrl = userApiHost + "/qiniu/up/token"

//用户中心
export const userLoginUrl = userApiHost + "/user/login"
export const userRegisterUrl = userApiHost + "/user/register"
export const userProfileUrl = userApiHost + "/user/profile"
export const userProfileEditUrl = userApiHost + "/user/profile/edit"

//元素匹配
export const elementUrl = pairApiHost + "/pair/element"
export const elementSaveUrl = pairApiHost + "/pair/element/save"
export const elementPairUrl = pairApiHost + "/pair/element/pair"

//聊天
export const chatWsUrl = WsProtocol + chatApiHost + "/ws"
export const chatMessageUrl = Protocol + chatApiHost + "/chat/message"
export const chatMessageSaveUrl = Protocol + chatApiHost + "/chat/message/save"
export const chatHistoryUrl = Protocol + chatApiHost + "/chat/history"
export const chatHistorySaveUrl = Protocol + chatApiHost + "/chat/history/save"
export const chatHistoryNumberUrl = Protocol + chatApiHost + "/chat/history/number"