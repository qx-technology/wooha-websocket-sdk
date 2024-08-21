import { RequestMessage, RoomParam, ChannelType, ResponseMessage, Message, Room, GroupBuying, GroupBuyingVote, GroupBuyingNextProduct, GroupBuyingStart, GroupBuyingLotteryOpening, GroupBuyingWinning, BiddingAllCounteroffer, BiddingDeal, UserBiddingInitiateOffer, UserBiddingReceivesOffer, UserBiddingReceivesCounteroffer, UserBiddingRejectedOffer } from "./types";
export declare function configSite(url: string): void;
export declare function useHttps(): void;
export declare function useWss(): void;
export interface Client {
    start(): Client;
    stop(autoConn?: boolean): Client;
    enterAggRoom(): Promise<Client>;
    leaveAggRoom(): Client;
    enterRoom(roomId: bigint): Promise<Client>;
    leaveRoom(roomId: bigint): Client;
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
    OnBiddingAllCounteroffer(client: Client, param: RoomParam, message: Message<BiddingAllCounteroffer>, response: ResponseMessage): void;
    OnBiddingDeal(client: Client, param: RoomParam, message: Message<BiddingDeal>, response: ResponseMessage): void;
    OnUserBiddingInitiateOffer(client: Client, param: RoomParam, message: Message<UserBiddingInitiateOffer>, response: ResponseMessage): void;
    OnUserBiddingReceivesOffer(client: Client, param: RoomParam, message: Message<UserBiddingReceivesOffer>, response: ResponseMessage): void;
    OnUserBiddingReceivesCounteroffer(client: Client, param: RoomParam, message: Message<UserBiddingReceivesCounteroffer>, response: ResponseMessage): void;
    OnUserBiddingRejectedOffer(client: Client, param: RoomParam, message: Message<UserBiddingRejectedOffer>, response: ResponseMessage): void;
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
    constructor(eventHandle: EventHandle, token?: string, showLog?: boolean, platform?: Platform);
    start(): Client;
    stop(autoConn?: boolean): Client;
    registerChannel(config: RequestMessage, interval: number, isIncrData?: boolean): void;
    enterAggRoom(): Promise<Client>;
    leaveAggRoom(): Client;
    enterRoom(roomId: bigint): Promise<Client>;
    leaveRoom(roomId: bigint): Client;
    private onOpen;
    private onClose;
    private onMessage;
    private onError;
    private isTimeout;
    private handle;
    getMsgSeqByRank(channel: ChannelType, rank?: number, params?: Record<string, any>, token?: string): Promise<string>;
}
export declare function newClient(eventHandle: EventHandle, token?: string, showLog?: boolean): Client;
