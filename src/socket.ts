import {
  RequestMessage,
  RoomBasicParam,
  ChannelType,
  ResponseMessage,
  Message,
  ServiceType,
  RoomDetail,
  RoomGroupBuying,
  RoomGroupBuyingVote,
  RoomGroupBuyingNextProduct,
  RoomGroupBuyingStart,
  RoomGroupBuyingLotteryOpening,
  RoomGroupBuyingWinning,
  RoomGroupBuyingBiddingCounteroffer,
  RoomGroupBuyingBiddingDeal,
  RoomGroupBuyingBiddingBuyerInitiatesOffer,
  RoomGroupBuyingBiddingSellerReceivesOffer,
  RoomGroupBuyingBiddingSellerCounteroffer,
  RoomGroupBuyingBiddingBuyerOfferRejected
} from "./types";
// import { v4 as uuid } from "uuid";
import { WebFuket } from "./socket_impl";

function uuid(): string {
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
export function configSite(url: string) {
  site = url;
}

// 使用HTTPS
export function useHttps() {
  enableHttps = true;
}

// 使用WSS
export function useWss() {
  enableWss = true;
}

function getBasicWebsocketUrl(): string {
  if (enableWss) {
    return `wss://${site}`;
  } else {
    return `ws://${site}`;
  }
}

function getBasicHttpUrl(): string {
  if (enableHttps) {
    return `https://${site}`;
  } else {
    return `http://${site}`;
  }
}

/// 客户端
export interface Client {
  /// 启动
  start(): Client;
  /// 停止
  stop(autoConn?: boolean): Client;
  /// 进入房间
  enterRoom(roomId: string): Promise<Client>;
  /// 离开房间
  leaveRoom(roomId: string): Client;
}

/// 事件
export interface EventHandle {
  /// 房间详情
  OnRoomDetail(client: Client, param: RoomBasicParam, message: Message<RoomDetail>): void;
  /// 房间团购详情
  OnRoomGroupBuying(
    client: Client,
    param: RoomBasicParam,
    message: Message<RoomGroupBuying>
  ): void;
  /// 房间团购投票
  OnRoomGroupBuyingVote(
    client: Client,
    param: RoomBasicParam,
    message: Message<RoomGroupBuyingVote>
  ): void;
  /// 房间团购下一个商品
  OnRoomGroupBuyingNextProduct(
    client: Client,
    param: RoomBasicParam,
    message: Message<RoomGroupBuyingNextProduct>
  ): void;
  /// 房间团购开始
  OnRoomGroupBuyingStart(
    client: Client,
    param: RoomBasicParam,
    message: Message<RoomGroupBuyingStart>
  ): void;
  /// 房间团购正在开奖
  OnRoomGroupBuyingLotteryOpening(
    client: Client,
    param: RoomBasicParam,
    message: Message<RoomGroupBuyingLotteryOpening>
  ): void;
  /// 房间团购中奖
  OnRoomGroupBuyingWinning(
    client: Client,
    param: RoomBasicParam,
    message: Message<RoomGroupBuyingWinning>
  ): void;
  /// 房间团购竞拍还价所有人
  OnRoomGroupBuyingBiddingCounteroffer(
    client: Client,
    param: RoomBasicParam,
    message: Message<RoomGroupBuyingBiddingCounteroffer>
  ): void;
  /// 房间团购竞拍成交
  OnRoomGroupBuyingBiddingDeal(
    client: Client,
    param: RoomBasicParam,
    message: Message<RoomGroupBuyingBiddingDeal>
  ): void;
  /// 房间团购竞拍买家发起报价(私人)
  OnRoomGroupBuyingBiddingBuyerInitiatesOffer(
    client: Client,
    param: RoomBasicParam,
    message: Message<RoomGroupBuyingBiddingBuyerInitiatesOffer>
  ): void;
  /// 房间团购竞拍卖家收到报价(私人)
  OnRoomGroupBuyingBiddingSellerReceivesOffer(
    client: Client,
    param: RoomBasicParam,
    message: Message<RoomGroupBuyingBiddingSellerReceivesOffer>
  ): void;
  /// 房间团购竞拍买家收到还价(私人)
  OnRoomGroupBuyingBiddingSellerCounteroffer(
    client: Client,
    param: RoomBasicParam,
    message: Message<RoomGroupBuyingBiddingSellerCounteroffer>
  ): void;
  /// 房间团购竞拍买家报价被拒(私人)
  OnRoomGroupBuyingBiddingBuyerOfferRejected(
    client: Client,
    param: RoomBasicParam,
    message: Message<RoomGroupBuyingBiddingBuyerOfferRejected>
  ): void;
}

export class RequestInfo {
  /// 请求配置
  public config: RequestMessage;
  /// 请求间隔(毫秒)
  public interval: number;
  /// 下一次请求时间(毫秒)
  public nextRequestTime: number;
  /// 是否为增量数据
  public isIncrData: boolean;

  constructor(config: RequestMessage, interval: number, isIncrData: boolean = true) {
    const now = Date.now();
    this.nextRequestTime = now;
    this.interval = interval;
    this.config = config;
    this.isIncrData = isIncrData;
  }
}

export class ClientProvider implements Client {
  private socket: WebFuket | null = null;
  private url: string;
  private token?: string;
  private lastReqTime: number;
  private lastRpsTime: number;
  private autoConn: boolean;
  private isRunning: boolean;
  private interval: NodeJS.Timeout | null;
  private callback: EventHandle;
  private requests: RequestInfo[];
  private showLog: boolean;

  constructor(eventHandle: EventHandle, token?: string, showLog: boolean = false) {
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
  }

  start(): Client {
    this.stop();

    const now = Date.now();
    this.lastReqTime = now;
    this.lastRpsTime = now;

    this.socket = new WebFuket(this.url, this.token);

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

  stop(autoConn: boolean = true): Client {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      if (this.showLog) console.error("Websocket已断开");
      this.isRunning = false;
      clearInterval(this.interval!);
      this.interval = null;
    }
    this.autoConn = autoConn;
    return this;
  }

  registerChannel(config: RequestMessage, interval: number, isIncrData?: boolean) {
    this.requests.push(new RequestInfo(config, interval, isIncrData));
  }

  async enterRoom(roomId: string): Promise<Client> {
    // 订阅房间详情
    this.registerChannel(
      <RequestMessage<RoomBasicParam>>{
        channel: ChannelType.RoomDetail,
        version: "1.0",
        seq: "0",
        ts: Date.now(),
        uid: uuid(),
        params: { roomId }
      },
      1500,
      false
    );
    // 订阅房间团购详情
    const roomGroupBuyingVersion = await getMessageVersioinByRank(
      ChannelType.RoomGroupBuying,
      1,
      { roomId },
      this.token
    );
    if (this.showLog) {
      console.log(
        `订阅房间团购详情: roomId(${roomId}), 版本号(${roomGroupBuyingVersion})`
      );
    }
    this.registerChannel(
      <RequestMessage<RoomBasicParam>>{
        channel: ChannelType.RoomGroupBuying,
        version: "1.0",
        seq: roomGroupBuyingVersion,
        ts: Date.now(),
        uid: uuid(),
        params: { roomId }
      },
      100
    );
    // 订阅房间投票
    const roomVoteVersion = await getMessageVersioinByRank(
      ChannelType.RoomVote,
      1,
      { roomId },
      this.token
    );
    if (this.showLog) {
      console.log(`订阅房间投票: roomId(${roomId}), 版本号(${roomVoteVersion})`);
    }
    this.registerChannel(
      <RequestMessage<RoomBasicParam>>{
        channel: ChannelType.RoomVote,
        version: "1.0",
        seq: roomVoteVersion,
        ts: Date.now(),
        uid: uuid(),
        params: { roomId }
      },
      100
    );
    // 订阅房间消息
    const roomMessageVersion = await getMessageVersioinByRank(
      ChannelType.RoomMessage,
      1,
      { roomId },
      this.token
    );
    if (this.showLog) {
      console.log(`订阅房间消息: roomId(${roomId}), 版本号(${roomMessageVersion})`);
    }
    this.registerChannel(
      <RequestMessage<RoomBasicParam>>{
        channel: ChannelType.RoomMessage,
        version: "1.0",
        seq: roomMessageVersion,
        ts: Date.now(),
        uid: uuid(),
        params: { roomId }
      },
      100
    );
    // 订阅房间用户消息
    if (this.token) {
      const roomUserMessageVersion = await getMessageVersioinByRank(
        ChannelType.RoomUserMessage,
        1,
        { roomId },
        this.token
      );
      if (this.showLog) {
        console.log(
          `订阅房间用户消息: roomId(${roomId}), 版本号(${roomUserMessageVersion})`
        );
      }
      this.registerChannel(
        <RequestMessage<RoomBasicParam>>{
          channel: ChannelType.RoomUserMessage,
          version: "1.0",
          seq: roomUserMessageVersion,
          ts: Date.now(),
          uid: uuid(),
          params: { roomId }
        },
        100
      );
    }
    return this;
  }

  leaveRoom(roomId: string): Client {
    this.requests = this.requests.filter(
      (request) =>
        !(
          [
            ChannelType.RoomMessage,
            ChannelType.RoomDetail,
            ChannelType.RoomGroupBuying,
            ChannelType.RoomVote,
            ChannelType.RoomUserMessage
          ].includes(request.config.channel) &&
          (<RoomBasicParam>request.config.params).roomId === roomId
        )
    );
    return this;
  }

  private onOpen(): void {
    if (this.showLog) console.log("Websocket已连接");
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
    const now = Date.now();
    this.lastRpsTime = now;
    const responses: ResponseMessage<any, Message<any>>[] = JSON.parse(event.data);
    // if (this.showLog) console.log("Websocket收到消息:", responses);
    for (const response of responses) {
      const request = this.requests.find(
        (request) => request.config.uid === response.uid
      );
      if (!request) continue;

      if (request.isIncrData) {
        const currSeq = BigInt(request.config.seq);
        const currRpsSeq = BigInt(response.rpsSeq);
        if (currSeq >= currRpsSeq) continue;
      }

      switch (response.channel) {
        case ChannelType.RoomDetail:
          for (const message of response.data) {
            this.callback.OnRoomDetail(this, request.config.params, message);
          }
          break;
        case ChannelType.RoomGroupBuying:
          for (const message of response.data) {
            this.callback.OnRoomGroupBuying(this, request.config.params, message);
          }
          break;
        case ChannelType.RoomMessage:
          for (const message of response.data) {
            switch (message.serviceType) {
              case ServiceType.RoomGroupBuyingNextProduct:
                this.callback.OnRoomGroupBuyingNextProduct(
                  this,
                  request.config.params,
                  message
                );
                break;
              case ServiceType.RoomGroupBuyingStart:
                this.callback.OnRoomGroupBuyingStart(
                  this,
                  request.config.params,
                  message
                );
                break;
              case ServiceType.RoomGroupBuyingLotteryOpening:
                this.callback.OnRoomGroupBuyingLotteryOpening(
                  this,
                  request.config.params,
                  message
                );
                break;
              case ServiceType.RoomGroupBuyingWinning:
                this.callback.OnRoomGroupBuyingWinning(
                  this,
                  request.config.params,
                  message
                );
                break;
              case ServiceType.RoomGroupBuyingBiddingCounteroffer:
                this.callback.OnRoomGroupBuyingBiddingCounteroffer(
                  this,
                  request.config.params,
                  message
                );
                break;
              case ServiceType.RoomGroupBuyingBiddingDeal:
                this.callback.OnRoomGroupBuyingBiddingDeal(
                  this,
                  request.config.params,
                  message
                );
                break;
            }
          }
          break;
        case ChannelType.RoomVote:
          for (const message of response.data) {
            this.callback.OnRoomGroupBuyingVote(this, request.config.params, message);
          }
          break;
        case ChannelType.RoomUserMessage:
          for (const message of response.data) {
            switch (message.serviceType) {
              case ServiceType.RoomGroupBuyingBiddingBuyerInitiatesOffer:
                this.callback.OnRoomGroupBuyingBiddingBuyerInitiatesOffer(
                  this,
                  request.config.params,
                  message
                );
                break;
              case ServiceType.RoomGroupBuyingBiddingSellerReceivesOffer:
                this.callback.OnRoomGroupBuyingBiddingSellerReceivesOffer(
                  this,
                  request.config.params,
                  message
                );
                break;
              case ServiceType.RoomGroupBuyingBiddingSellerCounteroffer:
                this.callback.OnRoomGroupBuyingBiddingSellerCounteroffer(
                  this,
                  request.config.params,
                  message
                );
                break;
              case ServiceType.RoomGroupBuyingBiddingBuyerOfferRejected:
                this.callback.OnRoomGroupBuyingBiddingBuyerOfferRejected(
                  this,
                  request.config.params,
                  message
                );
                break;
            }
          }
          break;
      }
      request.config.seq = response.rpsSeq;
    }
  }

  private onError(event: Event): void {
    if (this.showLog) console.error("Websocket连接出现错误:", event);
  }

  private isTimeout(): boolean {
    const now = Date.now();
    if (this.lastReqTime + 15000 > now) return false;
    if (this.lastRpsTime + 15000 > now) return false;
    return true;
  }

  private handle(): void {
    if (!this.isRunning) return;
    if (this.isTimeout()) {
      if (this.showLog) console.error("连接超时");
      this.stop();
      return;
    }

    if (this.requests.length == 0) return;

    const now = Date.now();
    const requests = [];

    for (const request of this.requests) {
      if (request.nextRequestTime > now) continue;
      request.nextRequestTime = now + request.interval;
      requests.push(request.config);
    }

    // if (this.showLog) console.log("Websocket发送消息:", requests);
    this.socket?.send(JSON.stringify(requests));
    this.lastReqTime = now;
  }
}

export function newClient(
  eventHandle: EventHandle,
  token?: string,
  showLog?: boolean
): Client {
  return new ClientProvider(eventHandle, token, showLog);
}

export async function getMessageVersioinByRank(
  channel: ChannelType,
  rank: number = 1,
  params: Record<string, any> = {},
  token?: string
): Promise<String> {
  const headers: Record<string, any> = {
    "Content-Type": "application/json",
    token: token
  };

  const url = new URL(getBasicHttpUrl() + "/getMessageVersioinByRank");
  url.search = new URLSearchParams(Object.assign(params, { channel, rank })).toString();

  if (process.env.UNI_PLATFORM === "app-plus") {
    return new Promise((resolve, reject) => {
      //@ts-ignore
      uni.request({
        url: url.toString(),
        header: headers,
        success: (res: any) => {
          resolve(res.data);
        },
        fail: () => {
          reject();
        }
      });
    });
  } else {
    return fetch(url.toString(), {
      method: "GET",
      headers
    })
      .then((res) => res.json())
      .then((json) => json.data);
  }
}
