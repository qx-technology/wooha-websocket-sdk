import {
  RequestMessage,
  RoomBasicParam,
  ChannelType,
  ResponseMessage,
  Message,
  MessageType,
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
import { WebFuket } from "./socket_impl";
import { decode as msgpackDecode, encode as msgpackEncode } from "@msgpack/msgpack";

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
  enterRoom(roomId: bigint): Promise<Client>;
  /// 离开房间
  leaveRoom(roomId: bigint): Client;
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

  async enterRoom(roomId: bigint): Promise<Client> {
    // 订阅房间详情
    this.registerChannel(
      <RequestMessage<RoomBasicParam>>{
        channel: ChannelType.ROOM_DETAIL,
        version: "1.0",
        seq: BigInt(0),
        ts: Date.now(),
        uid: uuid(),
        params: { roomId }
      },
      1500,
      false
    );
    try {
      // 订阅房间团购详情
      const roomGroupBuyingVersion = await getMessageVersioinByRank(
        ChannelType.ROOM_GROUP_BUYING,
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
          channel: ChannelType.ROOM_GROUP_BUYING,
          version: "1.0",
          seq: BigInt(roomGroupBuyingVersion),
          ts: Date.now(),
          uid: uuid(),
          params: { roomId }
        },
        100
      );
      // 订阅房间投票
      const roomVoteVersion = await getMessageVersioinByRank(
        ChannelType.ROOM_VOTE,
        1,
        { roomId },
        this.token
      );
      if (this.showLog) {
        console.log(`订阅房间投票: roomId(${roomId}), 版本号(${roomVoteVersion})`);
      }
      this.registerChannel(
        <RequestMessage<RoomBasicParam>>{
          channel: ChannelType.ROOM_VOTE,
          version: "1.0",
          seq: BigInt(roomVoteVersion),
          ts: Date.now(),
          uid: uuid(),
          params: { roomId }
        },
        100
      );
      // 订阅房间消息
      const roomMessageVersion = await getMessageVersioinByRank(
        ChannelType.ROOM_MESSAGE,
        1,
        { roomId },
        this.token
      );
      if (this.showLog) {
        console.log(`订阅房间消息: roomId(${roomId}), 版本号(${roomMessageVersion})`);
      }
      this.registerChannel(
        <RequestMessage<RoomBasicParam>>{
          channel: ChannelType.ROOM_MESSAGE,
          version: "1.0",
          seq: BigInt(roomMessageVersion),
          ts: Date.now(),
          uid: uuid(),
          params: { roomId }
        },
        100
      );
      // 订阅房间用户消息
      if (this.token) {
        const roomUserMessageVersion = await getMessageVersioinByRank(
          ChannelType.ROOM_USER_MESSAGE,
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
            channel: ChannelType.ROOM_USER_MESSAGE,
            version: "1.0",
            seq: BigInt(roomUserMessageVersion),
            ts: Date.now(),
            uid: uuid(),
            params: { roomId }
          },
          100
        );
      }
    } catch (e) {
      console.error(e);
    }
    return this;
  }

  leaveRoom(roomId: bigint): Client {
    this.requests = this.requests.filter(
      (request) =>
        !(
          [
            ChannelType.ROOM_MESSAGE,
            ChannelType.ROOM_DETAIL,
            ChannelType.ROOM_GROUP_BUYING,
            ChannelType.ROOM_VOTE,
            ChannelType.ROOM_USER_MESSAGE
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
    if (typeof event.data === "string") {
      console.error("Websocket异常:", JSON.parse(event.data));
      return;
    }
    const now = Date.now();
    this.lastRpsTime = now;
    const responses = msgpackDecode(event.data, {
      useBigInt64: true
    }) as ResponseMessage[];
    // if (this.showLog) console.log("Websocket收到消息:", responses);
    for (const response of responses) {
      const request = this.requests.find(
        (request) => request.config.uid === response.uid
      );
      if (!request) continue;

      if (request.isIncrData) {
        if (request.config.seq >= response.rpsSeq) continue;
      }

      switch (response.channel) {
        case ChannelType.ROOM_DETAIL:
          for (const message of response.contents) {
            this.callback.OnRoomDetail(this, request.config.params, message);
          }
          break;
        case ChannelType.ROOM_GROUP_BUYING:
          for (const message of response.contents) {
            this.callback.OnRoomGroupBuying(this, request.config.params, message);
          }
          break;
        case ChannelType.ROOM_MESSAGE:
          for (const message of response.contents) {
            switch (message.type) {
              case MessageType.ROOM_GROUP_BUYING_NEXT_PRODUCT:
                this.callback.OnRoomGroupBuyingNextProduct(
                  this,
                  request.config.params,
                  message
                );
                break;
              case MessageType.ROOM_GROUP_BUYING_START:
                this.callback.OnRoomGroupBuyingStart(
                  this,
                  request.config.params,
                  message
                );
                break;
              case MessageType.ROOM_GROUP_BUYING_LOTTERY_OPENING:
                this.callback.OnRoomGroupBuyingLotteryOpening(
                  this,
                  request.config.params,
                  message
                );
                break;
              case MessageType.ROOM_GROUP_BUYING_WINNING:
                this.callback.OnRoomGroupBuyingWinning(
                  this,
                  request.config.params,
                  message
                );
                break;
              case MessageType.ROOM_GROUP_BUYING_BIDDING_COUNTEROFFER:
                this.callback.OnRoomGroupBuyingBiddingCounteroffer(
                  this,
                  request.config.params,
                  message
                );
                break;
              case MessageType.ROOM_GROUP_BUYING_BIDDING_DEAL:
                this.callback.OnRoomGroupBuyingBiddingDeal(
                  this,
                  request.config.params,
                  message
                );
                break;
            }
          }
          break;
        case ChannelType.ROOM_VOTE:
          for (const message of response.contents) {
            this.callback.OnRoomGroupBuyingVote(this, request.config.params, message);
          }
          break;
        case ChannelType.ROOM_USER_MESSAGE:
          for (const message of response.contents) {
            switch (message.type) {
              case MessageType.ROOM_GROUP_BUYING_BIDDING_BUYER_INITIATES_OFFER:
                this.callback.OnRoomGroupBuyingBiddingBuyerInitiatesOffer(
                  this,
                  request.config.params,
                  message
                );
                break;
              case MessageType.ROOM_GROUP_BUYING_BIDDING_SELLER_RECEIVES_OFFER:
                this.callback.OnRoomGroupBuyingBiddingSellerReceivesOffer(
                  this,
                  request.config.params,
                  message
                );
                break;
              case MessageType.ROOM_GROUP_BUYING_BIDDING_SELLER_COUNTEROFFER:
                this.callback.OnRoomGroupBuyingBiddingSellerCounteroffer(
                  this,
                  request.config.params,
                  message
                );
                break;
              case MessageType.ROOM_GROUP_BUYING_BIDDING_BUYER_OFFER_REJECTED:
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

    this.socket?.send(msgpackEncode(requests, { useBigInt64: true }));
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

function objectToQueryString(obj: any) {
  const params = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      params.push(`${key}=${obj[key]}`);
    }
  }
  return params.join("&");
}

export async function getMessageVersioinByRank(
  channel: ChannelType,
  rank: number = 1,
  params: Record<string, any> = {},
  token?: string
): Promise<string> {
  const headers: Record<string, any> = {
    "Content-Type": "application/json"
  };
  if (token) headers["token"] = token;

  const url = `${getBasicHttpUrl()}/getMessageVersioinByRank?`;
  const queryString = objectToQueryString(Object.assign(params, { channel, rank }));
  if (process.env.UNI_PLATFORM === "app-plus") {
    return new Promise((resolve, reject) => {
      //@ts-ignore
      uni.request({
        url: `${url}${queryString}`,
        header: headers,
        success: (res: any) => {
          resolve(res.data.data);
        },
        fail: () => {
          reject();
        }
      });
    });
  } else {
    return fetch(`${url}${queryString}`, {
      method: "GET",
      headers
    })
      .then((res) => res.json())
      .then((json) => json.data);
  }
}
