"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientProvider = exports.RequestInfo = void 0;
exports.configSite = configSite;
exports.useHttps = useHttps;
exports.useWss = useWss;
exports.newClient = newClient;
exports.getMsgSeqByRank = getMsgSeqByRank;
const types_1 = require("./types");
const socket_impl_1 = require("./socket_impl");
const msgpackr_1 = require("msgpackr");
function uuid() {
    return `${Date.now()}${Math.random()}`;
}
// ============================================================ //
// 全局配置
// ============================================================ //
// 站点
let site = "47.57.236.213:8849";
// 使用HTTPS
let enableHttps = false;
// 使用WSS
let enableWss = false;
// 设置站点
function configSite(url) {
    site = url;
}
// 使用HTTPS
function useHttps() {
    enableHttps = true;
}
// 使用WSS
function useWss() {
    enableWss = true;
}
function getBasicWebsocketUrl() {
    if (enableWss) {
        return `wss://${site}`;
    }
    else {
        return `ws://${site}`;
    }
}
function getBasicHttpUrl() {
    if (enableHttps) {
        return `https://${site}`;
    }
    else {
        return `http://${site}`;
    }
}
class RequestInfo {
    constructor(config, interval, isIncrData = true) {
        const now = Date.now();
        this.nextRequestTime = now;
        this.interval = interval;
        this.config = config;
        this.isIncrData = isIncrData;
    }
}
exports.RequestInfo = RequestInfo;
class ClientProvider {
    constructor(eventHandle, token, showLog = false) {
        this.socket = null;
        this.url = getBasicWebsocketUrl() + "/ws";
        this.token = token;
        this.lastReqTime = 0;
        this.lastRpsTime = 0;
        this.autoConn = true;
        this.isRunning = false;
        this.interval = null;
        this.callback = eventHandle;
        this.requests = [];
        this.showLog = showLog;
        // 5秒心跳
        this.registerChannel({
            channel: types_1.ChannelType.HEARTBEAT,
            version: "1.0",
            seq: BigInt(0),
            ts: BigInt(Date.now()),
            uid: uuid()
        }, 5000, false);
    }
    start() {
        this.stop();
        const now = Date.now();
        this.lastReqTime = now;
        this.lastRpsTime = now;
        this.socket = new socket_impl_1.WebFuket(this.url, this.token);
        this.socket.onopen = this.onOpen.bind(this);
        this.socket.onclose = this.onClose.bind(this);
        this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onerror = this.onError.bind(this);
        this.interval = setInterval(this.handle.bind(this), 100);
        this.requests.forEach((item) => {
            item.nextRequestTime = now;
        });
        return this;
    }
    stop(autoConn = true) {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
            if (this.showLog)
                console.error("Websocket已断开");
            this.isRunning = false;
            clearInterval(this.interval);
            this.interval = null;
        }
        this.autoConn = autoConn;
        return this;
    }
    registerChannel(config, interval, isIncrData) {
        this.requests.push(new RequestInfo(config, interval, isIncrData));
    }
    enterAggRoom() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 订阅房间聚合消息
                const roomAggMsgSeq = yield getMsgSeqByRank(types_1.ChannelType.ROOM_AGG_MSG, 1, {}, this.token);
                if (this.showLog) {
                    console.log(`订阅房间聚合消息: 版本号(${roomAggMsgSeq})`);
                }
                this.registerChannel({
                    channel: types_1.ChannelType.ROOM_AGG_MSG,
                    version: "1.0",
                    seq: BigInt(roomAggMsgSeq),
                    ts: BigInt(Date.now()),
                    uid: uuid(),
                    params: {}
                }, 100);
                if (this.token) {
                    // 订阅用户房间聚合消息
                    const userRoomAggMsgSeq = yield getMsgSeqByRank(types_1.ChannelType.USER_ROOM_AGG_MSG, 1, {}, this.token);
                    if (this.showLog) {
                        console.log(`订阅用户房间聚合消息: 版本号(${userRoomAggMsgSeq})`);
                    }
                    this.registerChannel({
                        channel: types_1.ChannelType.USER_ROOM_AGG_MSG,
                        version: "1.0",
                        seq: BigInt(userRoomAggMsgSeq),
                        ts: BigInt(Date.now()),
                        uid: uuid(),
                        params: {}
                    }, 100);
                }
            }
            catch (e) {
                console.error(e);
            }
            return this;
        });
    }
    leaveAggRoom() {
        this.requests = this.requests.filter((request) => ![types_1.ChannelType.ROOM_AGG_MSG, types_1.ChannelType.USER_ROOM_AGG_MSG].includes(request.config.channel));
        return this;
    }
    enterRoom(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 订阅房间详情
                this.registerChannel({
                    channel: types_1.ChannelType.ROOM,
                    version: "1.0",
                    seq: BigInt(0),
                    ts: BigInt(Date.now()),
                    uid: uuid(),
                    params: { roomId }
                }, 3000, false);
                // 订阅团购详情
                const groupBuyingSeq = yield getMsgSeqByRank(types_1.ChannelType.GROUPBUYING, 1, { roomId }, this.token);
                if (this.showLog) {
                    console.log(`订阅团购详情: roomId(${roomId}), 版本号(${groupBuyingSeq})`);
                }
                this.registerChannel({
                    channel: types_1.ChannelType.GROUPBUYING,
                    version: "1.0",
                    seq: BigInt(groupBuyingSeq),
                    ts: BigInt(Date.now()),
                    uid: uuid(),
                    params: { roomId }
                }, 100);
                // 订阅团购投票
                const groupBuyingVoteSeq = yield getMsgSeqByRank(types_1.ChannelType.GROUPBUYING_VOTE, 1, { roomId }, this.token);
                if (this.showLog) {
                    console.log(`订阅团购投票: roomId(${roomId}), 版本号(${groupBuyingVoteSeq})`);
                }
                this.registerChannel({
                    channel: types_1.ChannelType.GROUPBUYING_VOTE,
                    version: "1.0",
                    seq: BigInt(groupBuyingVoteSeq),
                    ts: BigInt(Date.now()),
                    uid: uuid(),
                    params: { roomId }
                }, 100);
                // 订阅房间消息
                const roomMsgSeq = yield getMsgSeqByRank(types_1.ChannelType.ROOM_MSG, 1, { roomId }, this.token);
                if (this.showLog) {
                    console.log(`订阅房间消息: roomId(${roomId}), 版本号(${roomMsgSeq})`);
                }
                this.registerChannel({
                    channel: types_1.ChannelType.ROOM_MSG,
                    version: "1.0",
                    seq: BigInt(roomMsgSeq),
                    ts: BigInt(Date.now()),
                    uid: uuid(),
                    params: { roomId }
                }, 100);
                if (this.token) {
                    // 订阅用户房间消息
                    const userRoomMsgSeq = yield getMsgSeqByRank(types_1.ChannelType.USER_ROOM_MSG, 1, { roomId }, this.token);
                    if (this.showLog) {
                        console.log(`订阅用户房间消息: roomId(${roomId}), 版本号(${userRoomMsgSeq})`);
                    }
                    this.registerChannel({
                        channel: types_1.ChannelType.USER_ROOM_MSG,
                        version: "1.0",
                        seq: BigInt(userRoomMsgSeq),
                        ts: BigInt(Date.now()),
                        uid: uuid(),
                        params: { roomId }
                    }, 100);
                }
            }
            catch (e) {
                console.error(e);
            }
            return this;
        });
    }
    leaveRoom(roomId) {
        this.requests = this.requests.filter((request) => !([
            types_1.ChannelType.ROOM_MSG,
            types_1.ChannelType.ROOM,
            types_1.ChannelType.GROUPBUYING,
            types_1.ChannelType.GROUPBUYING_VOTE,
            types_1.ChannelType.USER_ROOM_MSG
        ].includes(request.config.channel) && request.config.params.roomId === roomId));
        return this;
    }
    onOpen() {
        if (this.showLog)
            console.log("Websocket已连接");
        this.isRunning = true;
    }
    onClose() {
        this.stop();
        if (this.autoConn) {
            setTimeout(() => {
                this.start();
            }, 1000);
        }
    }
    onMessage(event) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof event.data === "string") {
                console.error("Websocket异常:", JSON.parse(event.data));
                return;
            }
            const now = Date.now();
            this.lastRpsTime = now;
            var rpsData;
            if (process.env.UNI_PLATFORM === "app-plus") {
                rpsData = new Uint8Array(event.data);
            }
            else {
                rpsData = new Uint8Array(yield event.data.arrayBuffer());
            }
            const responses = (0, msgpackr_1.unpack)(rpsData);
            if (this.showLog)
                console.log("🌟接收消息:", responses.map((itme) => types_1.ChannelType[itme.channel]).join(", "), rpsData.length, "Bytes");
            for (const response of responses) {
                const request = this.requests.find((request) => request.config.uid === response.uid);
                if (!request)
                    continue;
                if (request.isIncrData) {
                    if (request.config.seq >= response.rpsSeq)
                        continue;
                }
                switch (response.channel) {
                    case types_1.ChannelType.ROOM:
                        for (const message of response.contents) {
                            this.callback.OnRoom(this, request.config.params, message);
                        }
                        break;
                    case types_1.ChannelType.GROUPBUYING:
                        for (const message of response.contents) {
                            this.callback.OnGroupBuying(this, request.config.params, message);
                        }
                        break;
                    case types_1.ChannelType.ROOM_MSG:
                    case types_1.ChannelType.ROOM_AGG_MSG:
                        for (const message of response.contents) {
                            switch (message.type) {
                                case types_1.MessageType.GROUPBUYING_NEXT_PRODUCT:
                                    this.callback.OnGroupBuyingNextProduct(this, request.config.params, message);
                                    break;
                                case types_1.MessageType.GROUPBUYING_START:
                                    this.callback.OnGroupBuyingStart(this, request.config.params, message);
                                    break;
                                case types_1.MessageType.GROUPBUYING_LOTTERY_OPENING:
                                    this.callback.OnGroupBuyingLotteryOpening(this, request.config.params, message);
                                    break;
                                case types_1.MessageType.GROUPBUYING_WINNING:
                                    this.callback.OnGroupBuyingWinning(this, request.config.params, message);
                                    break;
                                case types_1.MessageType.BIDDING_ALL_COUNTEROFFER:
                                    this.callback.OnBiddingAllCounteroffer(this, request.config.params, message);
                                    break;
                                case types_1.MessageType.BIDDING_DEAL:
                                    this.callback.OnBiddingDeal(this, request.config.params, message);
                                    break;
                            }
                        }
                        break;
                    case types_1.ChannelType.GROUPBUYING_VOTE:
                        for (const message of response.contents) {
                            this.callback.OnGroupBuyingVote(this, request.config.params, message);
                        }
                        break;
                    case types_1.ChannelType.USER_ROOM_MSG:
                    case types_1.ChannelType.USER_ROOM_AGG_MSG:
                        for (const message of response.contents) {
                            switch (message.type) {
                                case types_1.MessageType.USER_BIDDING_INITIATE_OFFER:
                                    this.callback.OnUserBiddingInitiateOffer(this, request.config.params, message);
                                    break;
                                case types_1.MessageType.USER_BIDDING_RECEIVES_OFFER:
                                    this.callback.OnUserBiddingReceivesOffer(this, request.config.params, message);
                                    break;
                                case types_1.MessageType.USER_BIDDING_RECEIVES_COUNTEROFFER:
                                    this.callback.OnUserBiddingReceivesCounteroffer(this, request.config.params, message);
                                    break;
                                case types_1.MessageType.USER_BIDDING_REJECTED_OFFER:
                                    this.callback.OnUserBiddingRejectedOffer(this, request.config.params, message);
                                    break;
                            }
                        }
                        break;
                    case types_1.ChannelType.HEARTBEAT:
                        // console.log("收到服务器心跳:", now);
                        break;
                }
                request.config.seq = response.rpsSeq;
            }
        });
    }
    onError(event) {
        if (this.showLog)
            console.error("Websocket连接出现错误:", event);
    }
    isTimeout() {
        const now = Date.now();
        if (this.lastReqTime + 18000 > now)
            return false;
        if (this.lastRpsTime + 18000 > now)
            return false;
        return true;
    }
    handle() {
        var _a;
        if (!this.isRunning)
            return;
        if (this.isTimeout()) {
            if (this.showLog)
                console.error("连接超时");
            this.stop();
            return;
        }
        if (this.requests.length == 0)
            return;
        const now = Date.now();
        const requests = [];
        for (const request of this.requests) {
            if (request.nextRequestTime > now)
                continue;
            request.nextRequestTime = now + request.interval;
            requests.push(request.config);
        }
        if (requests.length == 0)
            return;
        const sendData = (0, msgpackr_1.pack)(requests);
        if (this.showLog)
            console.log("⏫发送消息:", requests.map((itme) => types_1.ChannelType[itme.channel]).join(", "), sendData.length, "Bytes");
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.send(sendData);
        this.lastReqTime = now;
    }
}
exports.ClientProvider = ClientProvider;
function newClient(eventHandle, token, showLog) {
    return new ClientProvider(eventHandle, token, showLog);
}
function objectToQueryString(obj) {
    const params = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            params.push(`${key}=${obj[key]}`);
        }
    }
    return params.join("&");
}
function getMsgSeqByRank(channel_1) {
    return __awaiter(this, arguments, void 0, function* (channel, rank = 1, params = {}, token) {
        const headers = {
            "Content-Type": "application/json"
        };
        if (token)
            headers["token"] = token;
        const url = `${getBasicHttpUrl()}/getMessageVersioinByRank?`;
        const queryString = objectToQueryString(Object.assign(params, { channel, rank }));
        if (process.env.UNI_PLATFORM === "app-plus") {
            return new Promise((resolve, reject) => {
                //@ts-ignore
                uni.request({
                    url: `${url}${queryString}`,
                    header: headers,
                    success: (res) => {
                        resolve(res.data.data);
                    },
                    fail: () => {
                        reject();
                    }
                });
            });
        }
        else {
            return fetch(`${url}${queryString}`, {
                method: "GET",
                headers
            })
                .then((res) => res.json())
                .then((json) => json.data);
        }
    });
}
// function uint8ArrayToHex(uint8Array: any) {
//   return Array.from(uint8Array, (byte: any) => byte.toString(16).padStart(2, "0")).join("");
// }
//# sourceMappingURL=socket.js.map