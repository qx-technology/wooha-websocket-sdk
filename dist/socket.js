"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientProvider = exports.RequestInfo = void 0;
exports.newClient = newClient;
const types_1 = require("./types");
const uuid_1 = require("uuid");
class RequestInfo {
    constructor(config, interval) {
        const now = Date.now();
        this.nextRequestTime = now;
        this.interval = interval;
        this.config = config;
    }
}
exports.RequestInfo = RequestInfo;
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
                console.log("Websocket已断开");
            this.isRunning = false;
            clearInterval(this.interval);
            this.interval = null;
        }
        this.autoConn = autoConn;
        return this;
    }
    registerChannel(config, interval) {
        this.requests.push(new RequestInfo(config, interval));
    }
    enterRoom(roomId) {
        // 订阅房间详情
        this.registerChannel({
            channel: types_1.ChannelType.RoomDetail,
            version: "1.0",
            seq: "0",
            ts: Date.now(),
            uid: (0, uuid_1.v4)(),
            params: { roomId }
        }, 1500);
        // // 订阅房间团购详情
        // this.registerChannel(
        //   <RequestMessage<RoomBasicParam>>{
        //     channel: ChannelType.RoomGroupBuying,
        //     version: "1.0",
        //     seq: "0",
        //     ts: Date.now(),
        //     uid: uuid(),
        //     params: { roomId }
        //   },
        //   100
        // );
        // // 订阅房间投票
        // this.registerChannel(
        //   <RequestMessage<RoomBasicParam>>{
        //     channel: ChannelType.RoomVote,
        //     version: "1.0",
        //     seq: "0",
        //     ts: Date.now(),
        //     uid: uuid(),
        //     params: { roomId }
        //   },
        //   100
        // );
        // // 订阅房间消息
        // this.registerChannel(
        //   <RequestMessage<RoomBasicParam>>{
        //     channel: ChannelType.RoomMessage,
        //     version: "1.0",
        //     seq: "0",
        //     ts: Date.now(),
        //     uid: uuid(),
        //     params: { roomId }
        //   },
        //   100
        // );
        // // 订阅房间用户消息
        // if (this.token) {
        //   this.registerChannel(
        //     <RequestMessage<RoomBasicParam>>{
        //       channel: ChannelType.RoomUserMessage,
        //       version: "1.0",
        //       seq: "0",
        //       ts: Date.now(),
        //       uid: uuid(),
        //       params: { roomId }
        //     },
        //     100
        //   );
        // }
        return this;
    }
    leaveRoom(roomId) {
        this.requests = this.requests.filter((request) => !([
            types_1.ChannelType.RoomMessage,
            types_1.ChannelType.RoomDetail,
            types_1.ChannelType.RoomGroupBuying,
            types_1.ChannelType.RoomVote,
            types_1.ChannelType.RoomUserMessage
        ].includes(request.config.channel) &&
            request.config.params.roomId === roomId));
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
        const now = Date.now();
        const responses = JSON.parse(event.data);
        if (this.showLog)
            console.log("Websocket收到消息:", responses);
        for (const response of responses) {
            const request = this.requests.find((request) => request.config.uid === response.uid);
            if (!request)
                continue;
            switch (response.channel) {
                case types_1.ChannelType.RoomDetail:
                    for (const message of response.data) {
                        this.callback.OnRoomDetail(this, request.config.params, message);
                    }
                    break;
                case types_1.ChannelType.RoomGroupBuying:
                    for (const message of response.data) {
                        this.callback.OnRoomGroupBuying(this, request.config.params, message);
                    }
                    break;
                case types_1.ChannelType.RoomMessage:
                    for (const message of response.data) {
                        switch (message.serviceType) {
                            case types_1.ServiceType.RoomGroupBuyingNextProduct:
                                this.callback.OnRoomGroupBuyingNextProduct(this, request.config.params, message);
                                break;
                            case types_1.ServiceType.RoomGroupBuyingStart:
                                this.callback.OnRoomGroupBuyingStart(this, request.config.params, message);
                                break;
                            case types_1.ServiceType.RoomGroupBuyingLotteryOpening:
                                this.callback.OnRoomGroupBuyingLotteryOpening(this, request.config.params, message);
                                break;
                            case types_1.ServiceType.RoomGroupBuyingWinning:
                                this.callback.OnRoomGroupBuyingWinning(this, request.config.params, message);
                                break;
                            case types_1.ServiceType.RoomGroupBuyingBiddingCounteroffer:
                                this.callback.OnRoomGroupBuyingBiddingCounteroffer(this, request.config.params, message);
                                break;
                            case types_1.ServiceType.RoomGroupBuyingBiddingDeal:
                                this.callback.OnRoomGroupBuyingBiddingDeal(this, request.config.params, message);
                                break;
                        }
                    }
                    break;
                case types_1.ChannelType.RoomVote:
                    for (const message of response.data) {
                        this.callback.OnRoomGroupBuyingVote(this, request.config.params, message);
                    }
                    break;
                case types_1.ChannelType.RoomUserMessage:
                    for (const message of response.data) {
                        switch (message.serviceType) {
                            case types_1.ServiceType.RoomGroupBuyingBiddingBuyerInitiatesOffer:
                                this.callback.OnRoomGroupBuyingBiddingBuyerInitiatesOffer(this, request.config.params, message);
                                break;
                            case types_1.ServiceType.RoomGroupBuyingBiddingSellerReceivesOffer:
                                this.callback.OnRoomGroupBuyingBiddingSellerReceivesOffer(this, request.config.params, message);
                                break;
                            case types_1.ServiceType.RoomGroupBuyingBiddingSellerCounteroffer:
                                this.callback.OnRoomGroupBuyingBiddingSellerCounteroffer(this, request.config.params, message);
                                break;
                            case types_1.ServiceType.RoomGroupBuyingBiddingBuyerOfferRejected:
                                this.callback.OnRoomGroupBuyingBiddingBuyerOfferRejected(this, request.config.params, message);
                                break;
                        }
                    }
                    break;
            }
            request.nextRequestTime = now + request.interval;
            request.config.seq = response.rpsSeq;
        }
    }
    onError(event) {
        if (this.showLog)
            console.error("Websocket连接出现错误:", event);
    }
    isTimeout() {
        const now = Date.now();
        if (this.lastReqTime + 15000 > now)
            return false;
        if (this.lastRpsTime + 15000 > now)
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
        if (this.showLog)
            console.log("Websocket发送消息:", requests);
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify(requests));
    }
}
exports.ClientProvider = ClientProvider;
function newClient(eventHandle, url, token, showLog) {
    return new ClientProvider(eventHandle, url, token, showLog);
}
