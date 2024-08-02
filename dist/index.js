"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = void 0;
exports.newClient = newClient;
exports.types = __importStar(require("./types"));
const types = __importStar(require("./types"));
const uuid_1 = require("uuid");
class ClientProvider {
    constructor(eventHandle, url, token, showLog = false) {
        this.socket = null;
        this.url = url;
        this.token = token;
        this.lastReqTime = 0;
        this.lastRpsTime = 0;
        this.autoConn = true;
        this.isRunning = false;
        this.interval = null;
        this.callback = eventHandle;
        this.requests = [];
        this.showLog = showLog;
    }
    start() {
        this.stop();
        const now = Date.now();
        this.lastReqTime = now;
        this.lastRpsTime = now;
        const protocols = [];
        if (this.token) {
            protocols.push("token");
            protocols.push(this.token);
        }
        this.socket = new WebSocket(this.url, protocols);
        this.socket.onopen = this.onOpen.bind(this);
        this.socket.onclose = this.onClose.bind(this);
        this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onerror = this.onError.bind(this);
        this.interval = setInterval(this.handle.bind(this), 333);
        return this;
    }
    stop(autoConn = true) {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
            if (this.showLog)
                console.log("Websocket已断开");
            this.isRunning = false;
            clearInterval(this.interval);
            this.interval = null;
        }
        this.autoConn = autoConn;
        return this;
    }
    enterRoom(roomId) {
        // 订阅房间详情
        this.requests.push({
            channel: types.ChannelType.RoomDetail,
            version: "1.0",
            seq: "0",
            ts: Date.now(),
            uid: (0, uuid_1.v4)(),
            params: { roomId }
        });
        // 订阅房间团购详情
        this.requests.push({
            channel: types.ChannelType.RoomGroupBuying,
            version: "1.0",
            seq: "0",
            ts: Date.now(),
            uid: (0, uuid_1.v4)(),
            params: { roomId }
        });
        // 订阅房间投票
        this.requests.push({
            channel: types.ChannelType.RoomVote,
            version: "1.0",
            seq: "0",
            ts: Date.now(),
            uid: (0, uuid_1.v4)(),
            params: { roomId }
        });
        // 订阅房间消息
        this.requests.push({
            channel: types.ChannelType.RoomMessage,
            version: "1.0",
            seq: "0",
            ts: Date.now(),
            uid: (0, uuid_1.v4)(),
            params: { roomId }
        });
        // 订阅房间用户消息
        if (this.token) {
            this.requests.push({
                channel: types.ChannelType.RoomUserMessage,
                version: "1.0",
                seq: "0",
                ts: Date.now(),
                uid: (0, uuid_1.v4)(),
                params: { roomId }
            });
        }
        return this;
    }
    leaveRoom(roomId) {
        this.requests = this.requests.filter((request) => !([
            types.ChannelType.RoomMessage,
            types.ChannelType.RoomDetail,
            types.ChannelType.RoomGroupBuying,
            types.ChannelType.RoomVote,
            types.ChannelType.RoomUserMessage
        ].includes(request.channel) &&
            request.params.roomId === roomId));
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
        const responses = JSON.parse(event.data);
        if (this.showLog)
            console.log("Websocket收到消息:", responses);
        for (const response of responses) {
            const request = this.requests.find((request) => request.uid === response.uid);
            if (!request)
                continue;
            switch (response.channel) {
                case types.ChannelType.RoomDetail:
                    for (const message of response.data) {
                        this.callback.OnRoomDetail(this, request.params, message);
                    }
                    break;
                case types.ChannelType.RoomGroupBuying:
                    for (const message of response.data) {
                        this.callback.OnRoomGroupBuying(this, request.params, message);
                    }
                    break;
                case types.ChannelType.RoomMessage:
                    for (const message of response.data) {
                        switch (message.serviceType) {
                            case types.ServiceType.RoomGroupBuyingNextProduct:
                                this.callback.OnRoomGroupBuyingNextProduct(this, request.params, message);
                                break;
                            case types.ServiceType.RoomGroupBuyingStart:
                                this.callback.OnRoomGroupBuyingStart(this, request.params, message);
                                break;
                            case types.ServiceType.RoomGroupBuyingLotteryOpening:
                                this.callback.OnRoomGroupBuyingLotteryOpening(this, request.params, message);
                                break;
                            case types.ServiceType.RoomGroupBuyingWinning:
                                this.callback.OnRoomGroupBuyingWinning(this, request.params, message);
                                break;
                            case types.ServiceType.RoomGroupBuyingBiddingCounteroffer:
                                this.callback.OnRoomGroupBuyingBiddingCounteroffer(this, request.params, message);
                                break;
                            case types.ServiceType.RoomGroupBuyingBiddingDeal:
                                this.callback.OnRoomGroupBuyingBiddingDeal(this, request.params, message);
                                break;
                        }
                    }
                    break;
                case types.ChannelType.RoomVote:
                    for (const message of response.data) {
                        this.callback.OnRoomGroupBuyingVote(this, request.params, message);
                    }
                    break;
                case types.ChannelType.RoomUserMessage:
                    for (const message of response.data) {
                        switch (message.serviceType) {
                            case types.ServiceType.RoomGroupBuyingBiddingBuyerInitiatesOffer:
                                this.callback.OnRoomGroupBuyingBiddingBuyerInitiatesOffer(this, request.params, message);
                                break;
                            case types.ServiceType.RoomGroupBuyingBiddingSellerReceivesOffer:
                                this.callback.OnRoomGroupBuyingBiddingSellerReceivesOffer(this, request.params, message);
                                break;
                            case types.ServiceType.RoomGroupBuyingBiddingSellerCounteroffer:
                                this.callback.OnRoomGroupBuyingBiddingSellerCounteroffer(this, request.params, message);
                                break;
                            case types.ServiceType.RoomGroupBuyingBiddingBuyerOfferRejected:
                                this.callback.OnRoomGroupBuyingBiddingBuyerOfferRejected(this, request.params, message);
                                break;
                        }
                    }
                    break;
            }
            request.seq = response.rpsSeq;
        }
    }
    onError(event) {
        if (this.showLog)
            console.error("Websocket连接出现错误:", event);
    }
    isTimeout() {
        const now = Date.now();
        if (this.lastReqTime + 30000 > now)
            return false;
        if (this.lastRpsTime + 30000 > now)
            return false;
        return true;
    }
    handle() {
        var _a;
        if (!this.isRunning)
            return;
        if (this.isTimeout()) {
            this.stop();
            return;
        }
        for (const request of this.requests)
            request.ts = Date.now();
        if (this.requests.length > 0) {
            if (this.showLog)
                console.log("Websocket发送消息:", this.requests);
            (_a = this.socket) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify(this.requests));
        }
    }
}
function newClient(eventHandle, url, token, showLog) {
    return new ClientProvider(eventHandle, url, token, showLog);
}
