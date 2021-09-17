//根域名
export const Protocol = "http://"
export const WsProtocol = "ws://"
export const userApiHost = Protocol + "user-api.ll.com"
export const pairApiHost = Protocol + "pair-api.ll.com"
export const chatApiHost = "chat-api.ll.com"
export const imgHost = Protocol + "img-ffl-test.nocilol.com"

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