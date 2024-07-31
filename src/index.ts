import {
  Message,
  ResponseMessage,
  RoomGroupBuyingDetail,
  RoomGroupBuyingVote,
  RoomGroupBuyingStart,
  RoomGroupBuyingLotteryOpening,
  RoomGroupBuyingWinning,
  RoomGroupBuyingBiddingCounteroffer,
  RoomGroupBuyingBiddingDeal,
  RoomGroupBuyingBiddingBuyerInitiatesOffer,
  RoomGroupBuyingBiddingSellerReceivesOffer,
  RoomGroupBuyingBiddingSellerCounteroffer,
  RoomGroupBuyingBiddingBuyerOfferRejected,
  RequestMessage,
  RoomBasicRequestParam,
  ChannelType
} from "./types";
import { v4 as uuid } from "uuid";

/// 客户端
export interface Client {
  /// 启动
  start(): Client;
  /// 停止
  stop(autoConn?: boolean): Client;
  /// 进入房间
  enterRoom(roomId: string): Client;
  /// 离开房间
  leaveRoom(roomId: string): Client;
}

/// 事件
export interface EventHandle {
  /// 房间团购 详情
  OnRoomGroupBuyingDetail(
    client: Client,
    message: ResponseMessage<RoomBasicRequestParam, Message<RoomGroupBuyingDetail>>
  ): void;
  /// 房间团购 投票
  OnRoomGroupBuyingVote(
    client: Client,
    message: ResponseMessage<RoomBasicRequestParam, Message<RoomGroupBuyingVote>>
  ): void;
  /// 房间团购 开始
  OnRoomGroupBuyingStart(
    client: Client,
    message: ResponseMessage<RoomBasicRequestParam, Message<RoomGroupBuyingStart>>
  ): void;
  /// 房间团购 正在开奖
  OnRoomGroupBuyingLotteryOpening(
    client: Client,
    message: ResponseMessage<
      RoomBasicRequestParam,
      Message<RoomGroupBuyingLotteryOpening>
    >
  ): void;
  /// 房间团购 中奖
  OnRoomGroupBuyingWinning(
    client: Client,
    message: ResponseMessage<RoomBasicRequestParam, Message<RoomGroupBuyingWinning>>
  ): void;
  /// 房间团购 竞拍还价所有人
  OnRoomGroupBuyingBiddingCounteroffer(
    client: Client,
    message: ResponseMessage<
      RoomBasicRequestParam,
      Message<RoomGroupBuyingBiddingCounteroffer>
    >
  ): void;
  /// 房间团购 竞拍成交
  OnRoomGroupBuyingBiddingDeal(
    client: Client,
    message: ResponseMessage<RoomBasicRequestParam, Message<RoomGroupBuyingBiddingDeal>>
  ): void;
  /// 房间团购 竞拍买家发起报价(私人)
  OnRoomGroupBuyingBiddingBuyerInitiatesOffer(
    client: Client,
    message: ResponseMessage<
      RoomBasicRequestParam,
      Message<RoomGroupBuyingBiddingBuyerInitiatesOffer>
    >
  ): void;
  /// 房间团购 竞拍卖家收到报价(私人)
  OnRoomGroupBuyingBiddingSellerReceivesOffer(
    client: Client,
    message: ResponseMessage<
      RoomBasicRequestParam,
      Message<RoomGroupBuyingBiddingSellerReceivesOffer>
    >
  ): void;
  /// 房间团购 竞拍买家收到还价(私人)
  OnRoomGroupBuyingBiddingSellerCounteroffer(
    client: Client,
    message: ResponseMessage<
      RoomBasicRequestParam,
      Message<RoomGroupBuyingBiddingSellerCounteroffer>
    >
  ): void;
  /// 房间团购 竞拍买家报价被拒(私人)
  OnRoomGroupBuyingBiddingBuyerOfferRejected(
    client: Client,
    message: ResponseMessage<
      RoomBasicRequestParam,
      Message<RoomGroupBuyingBiddingBuyerOfferRejected>
    >
  ): void;
}

class ClientProvider implements Client {
  private socket: WebSocket | null = null;
  private url: string;
  private token?: string;
  private lastReqTime: number;
  private lastRpsTime: number;
  private autoConn: boolean;
  private isRunning: boolean;
  private interval: NodeJS.Timeout | null;
  private callback: EventHandle;
  private requests: RequestMessage[];

  constructor(eventHandle: EventHandle, url: string, token?: string) {
    this.url = url;
    this.token = token;
    this.lastReqTime = 0;
    this.lastRpsTime = 0;
    this.autoConn = true;
    this.isRunning = false;
    this.interval = null;
    this.callback = eventHandle;
    this.requests = [];
  }

  start(): Client {
    this.stop();

    const now = Date.now();
    this.lastReqTime = now;
    this.lastRpsTime = now;

    const protocols: string[] = [];
    if (this.token) {
      protocols.push("token");
      protocols.push(this.token);
    }
    this.socket = new WebSocket(this.url, protocols);

    this.socket.onopen = this.onOpen.bind(this);
    this.socket.onclose = this.onClose.bind(this);
    this.socket.onmessage = this.onMessage.bind(this);
    this.socket.onerror = this.onError.bind(this);

    this.interval = setInterval(this.handle.bind(this), 1000);

    return this;
  }

  stop(autoConn: boolean = true): Client {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      console.log("Websocket已断开");
      this.isRunning = false;
      clearInterval(this.interval!);
      this.interval = null;
    }
    this.autoConn = autoConn;
    return this;
  }

  enterRoom(roomId: string): Client {
    // 订阅房间详情
    this.requests.push(<RequestMessage<RoomBasicRequestParam>>{
      channel: ChannelType.RoomDetail,
      version: "1.0",
      seq: "0",
      ts: Date.now(),
      uid: uuid(),
      params: { roomId }
    });
    // 订阅房间投票
    this.requests.push(<RequestMessage<RoomBasicRequestParam>>{
      channel: ChannelType.RoomVote,
      version: "1.0",
      seq: "0",
      ts: Date.now(),
      uid: uuid(),
      params: { roomId }
    });
    // 订阅房间活动消息
    this.requests.push(<RequestMessage<RoomBasicRequestParam>>{
      channel: ChannelType.RoomActivity,
      version: "1.0",
      seq: "0",
      ts: Date.now(),
      uid: uuid(),
      params: { roomId }
    });
    // 订阅房间用户活动消息
    if (this.token) {
      this.requests.push(<RequestMessage<RoomBasicRequestParam>>{
        channel: ChannelType.RoomUserActivity,
        version: "1.0",
        seq: "0",
        ts: Date.now(),
        uid: uuid(),
        params: { roomId }
      });
    }
    return this;
  }
  leaveRoom(roomId: string): Client {
    this.requests = this.requests.filter(
      (request) =>
        !(
          [
            ChannelType.RoomActivity,
            ChannelType.RoomDetail,
            ChannelType.RoomVote,
            ChannelType.RoomUserActivity
          ].includes(request.channel) &&
          (<RoomBasicRequestParam>request.params).roomId === roomId
        )
    );
    return this;
  }

  private onOpen(): void {
    console.log("Websocket已连接");
    this.isRunning = true;
  }

  private onClose(): void {
    this.stop();
    if (this.autoConn) {
      setTimeout(() => {
        this.start();
      }, 1000);
    }
  }

  private onMessage(event: MessageEvent): void {
    console.log("Websocket收到消息:", event.data);
  }

  private onError(event: Event): void {
    console.error("Websocket连接出现错误:", event);
  }

  private isTimeout(): boolean {
    const now = Date.now();
    if (this.lastReqTime + 30000 > now) return false;
    if (this.lastRpsTime + 30000 > now) return false;
    return true;
  }

  private handle(): void {
    if (!this.isRunning) return;
    if (this.isTimeout()) {
      this.stop();
      return;
    }

    for (const request of this.requests) request.ts = Date.now();
    if (this.requests.length > 0) {
      const msg = JSON.stringify(this.requests);
      console.log("Websocket发送消息:", msg);
      this.socket?.send(msg);
    }
  }
}

export function newClient(eventHandle: EventHandle, url: string, token?: string): Client {
  return new ClientProvider(eventHandle, url, token);
}
