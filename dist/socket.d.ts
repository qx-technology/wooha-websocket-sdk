import { RequestMessage, RoomParam, ChannelType, ResponseMessage, Message, Room, GroupBuying, GroupBuyingVote, GroupBuyingNextProduct, GroupBuyingStart, GroupBuyingLotteryOpening, GroupBuyingWinning, BiddingAllCounteroffer, BiddingDeal, UserBiddingInitiateOffer, UserBiddingReceivesOffer, UserBiddingReceivesCounteroffer, UserBiddingRejectedOffer, BiddingStart, UserSellerAcceptedOffer, UserSellerRejectedOffer, UserBiddingAcceptedOffer, UserChickenGameBuyChicken, UserChickenGameIncreaseLife, UserChickenGameBuyFeed, UserChickenGameImpendingDeath, UserChickenGameChickenDeath, UserChickenGameChickenEnterHeaven, UserChickenGameBlobsExchange, UserOrderPaymented, UserOrderShipped, UserOrderCompleted, UserOrderAfterSalesApproved, UserOrderAfterSalesRejected, UserOrderAfterSalesRefund, UserBiddingReOffer, UserBiddingAcceptedReOffer } from "./types";
export declare function configSite(url: string): void;
export declare function useHttps(): void;
export declare function useWss(): void;
export interface Client {
    /**
     * 启动
     */
    start(): Client;
    /**
     * 停止当前websocket连接
     * @param autoConn 是否自动重连, 默认是
     */
    stop(autoConn?: boolean): Client;
    /**
     * 进入聚合房间
     */
    enterAggRoom(): Promise<Client>;
    /**
     * 离开聚合房间
     */
    leaveAggRoom(): Client;
    /**
     * 进入房间
     * @param roomId 房间ID
     */
    enterRoom(roomId: bigint): Promise<Client>;
    /**
     * 离开房间
     * @param roomId 房间ID
     */
    leaveRoom(roomId: bigint): Client;
    /**
     * 订阅用户小鸡游戏消息
     * @param version 版本号
     */
    subscribeUserChickenGame(version: bigint): Client;
    /**
     * 取消订阅用户小鸡游戏消息
     */
    unsubscribeUserChickenGame(): Client;
    /**
     * 订阅用户订单消息
     * @param version 版本号
     */
    subscribeUserOrder(version: bigint): Client;
    /**
     * 取消订阅用户订单消息
     */
    unsubscribeUserOrder(): Client;
}
export declare enum Platform {
    WEB = "web",
    UniApp = "uni-app"
}
export interface EventHandle {
    OnRoom(client: Client, param: RoomParam, message: Message<Room>, response: ResponseMessage): void;
    OnGroupBuying(client: Client, param: RoomParam, message: Message<GroupBuying>, response: ResponseMessage): void;
    OnGroupBuyingVote(client: Client, param: RoomParam, message: Message<GroupBuyingVote>, response: ResponseMessage): void;
    OnGroupBuyingNextProduct(client: Client, param: RoomParam, message: Message<GroupBuyingNextProduct>, response: ResponseMessage): void;
    OnGroupBuyingStart(client: Client, param: RoomParam, message: Message<GroupBuyingStart>, response: ResponseMessage): void;
    OnGroupBuyingLotteryOpening(client: Client, param: RoomParam, message: Message<GroupBuyingLotteryOpening>, response: ResponseMessage): void;
    OnGroupBuyingWinning(client: Client, param: RoomParam, message: Message<GroupBuyingWinning>, response: ResponseMessage): void;
    OnBiddingStart(client: Client, param: RoomParam, message: Message<BiddingStart>, response: ResponseMessage): void;
    OnBiddingAllCounteroffer(client: Client, param: RoomParam, message: Message<BiddingAllCounteroffer>, response: ResponseMessage): void;
    OnBiddingDeal(client: Client, param: RoomParam, message: Message<BiddingDeal>, response: ResponseMessage): void;
    OnUserBiddingInitiateOffer(client: Client, param: RoomParam, message: Message<UserBiddingInitiateOffer>, response: ResponseMessage): void;
    OnUserBiddingReceivesOffer(client: Client, param: RoomParam, message: Message<UserBiddingReceivesOffer>, response: ResponseMessage): void;
    OnUserBiddingReceivesCounteroffer(client: Client, param: RoomParam, message: Message<UserBiddingReceivesCounteroffer>, response: ResponseMessage): void;
    OnUserBiddingRejectedOffer(client: Client, param: RoomParam, message: Message<UserBiddingRejectedOffer>, response: ResponseMessage): void;
    OnUserSellerAcceptedOffer(client: Client, param: RoomParam, message: Message<UserSellerAcceptedOffer>, response: ResponseMessage): void;
    OnUserSellerRejectedOffer(client: Client, param: RoomParam, message: Message<UserSellerRejectedOffer>, response: ResponseMessage): void;
    OnUserBiddingAcceptedOffer(client: Client, param: RoomParam, message: Message<UserBiddingAcceptedOffer>, response: ResponseMessage): void;
    OnUserBiddingReOffer(client: Client, param: RoomParam, message: Message<UserBiddingReOffer>, response: ResponseMessage): void;
    OnUserBiddingAcceptedReOffer(client: Client, param: RoomParam, message: Message<UserBiddingAcceptedReOffer>, response: ResponseMessage): void;
    OnUserChickenGameBuyChicken(client: Client, message: Message<UserChickenGameBuyChicken>, response: ResponseMessage): void;
    OnUserChickenGameIncreaseLife(client: Client, message: Message<UserChickenGameIncreaseLife>, response: ResponseMessage): void;
    OnUserChickenGameBuyFeed(client: Client, message: Message<UserChickenGameBuyFeed>, response: ResponseMessage): void;
    OnUserChickenGameImpendingDeath(client: Client, message: Message<UserChickenGameImpendingDeath>, response: ResponseMessage): void;
    OnUserChickenGameChickenDeath(client: Client, message: Message<UserChickenGameChickenDeath>, response: ResponseMessage): void;
    OnUserChickenGameChickenEnterHeaven(client: Client, message: Message<UserChickenGameChickenEnterHeaven>, response: ResponseMessage): void;
    OnUserChickenGameBlobsExchange(client: Client, message: Message<UserChickenGameBlobsExchange>, response: ResponseMessage): void;
    OnUserOrderPaymented(client: Client, message: Message<UserOrderPaymented>, response: ResponseMessage): void;
    OnUserOrderShipped(client: Client, message: Message<UserOrderShipped>, response: ResponseMessage): void;
    OnUserOrderCompleted(client: Client, message: Message<UserOrderCompleted>, response: ResponseMessage): void;
    OnUserOrderAftersalesApproved(client: Client, message: Message<UserOrderAfterSalesApproved>, response: ResponseMessage): void;
    OnUserOrderAftersalesRejected(client: Client, message: Message<UserOrderAfterSalesRejected>, response: ResponseMessage): void;
    OnUserOrderAfterSalesRefund(client: Client, message: Message<UserOrderAfterSalesRefund>, response: ResponseMessage): void;
}
export declare class RequestInfo {
    config: RequestMessage;
    interval: number;
    nextRequestTime: number;
    isIncrData: boolean;
    constructor(config: RequestMessage, interval: number, isIncrData?: boolean);
}
export declare class ClientProvider implements Client {
    private socket;
    private url;
    private token?;
    private lastReqTime;
    private lastRpsTime;
    private autoConn;
    private isRunning;
    private interval;
    private callback;
    private requests;
    private showLog;
    private platform;
    private uid;
    constructor(eventHandle: EventHandle, token?: string, showLog?: boolean, platform?: Platform);
    start(): Client;
    stop(autoConn?: boolean): Client;
    registerChannel(config: RequestMessage, interval: number, isIncrData?: boolean): void;
    enterAggRoom(): Promise<Client>;
    leaveAggRoom(): Client;
    enterRoom(roomId: bigint): Promise<Client>;
    leaveRoom(roomId: bigint): Client;
    subscribeUserChickenGame(version: bigint): Client;
    unsubscribeUserChickenGame(): Client;
    subscribeUserOrder(version: bigint): Client;
    unsubscribeUserOrder(): Client;
    private onOpen;
    private onClose;
    private onMessage;
    private onError;
    private isTimeout;
    private handle;
    getMsgSeqByRank(channel: ChannelType, rank?: number, params?: Record<string, any>, token?: string): Promise<string>;
}
export declare function newClient(eventHandle: EventHandle, token?: string, showLog?: boolean, platform?: Platform): Client;
/**
 * 获取历史消息
 * @param token 用户登录令牌
 * @param channel 消息通道
 * @param seq 消息版本号
 * @param params 参数
 * @param platform 平台
 * @returns 如果调用成功，返回消息数组。失败返回JSON格式错误
 */
export declare function getMessageHistory(token: string, channel: ChannelType, seq: bigint, params?: {}, platform?: Platform): Promise<Message[]>;
export declare function getMsgSeqByRank(channel: ChannelType, rank?: number, params?: Record<string, any>, platform?: Platform, token?: string): Promise<string>;
