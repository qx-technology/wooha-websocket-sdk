import { RequestMessage, RoomParam, ChannelType, Message, Room, GroupBuying, GroupBuyingVote, GroupBuyingNextProduct, GroupBuyingStart, GroupBuyingLotteryOpening, GroupBuyingWinning, BiddingAllCounteroffer, BiddingDeal, UserBiddingInitiateOffer, UserBiddingReceivesOffer, UserBiddingReceivesCounteroffer, UserBiddingRejectedOffer } from "./types";
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
export interface EventHandle {
    OnRoom(client: Client, param: RoomParam, message: Message<Room>): void;
    OnGroupBuying(client: Client, param: RoomParam, message: Message<GroupBuying>): void;
    OnGroupBuyingVote(client: Client, param: RoomParam, message: Message<GroupBuyingVote>): void;
    OnGroupBuyingNextProduct(client: Client, param: RoomParam, message: Message<GroupBuyingNextProduct>): void;
    OnGroupBuyingStart(client: Client, param: RoomParam, message: Message<GroupBuyingStart>): void;
    OnGroupBuyingLotteryOpening(client: Client, param: RoomParam, message: Message<GroupBuyingLotteryOpening>): void;
    OnGroupBuyingWinning(client: Client, param: RoomParam, message: Message<GroupBuyingWinning>): void;
    OnBiddingAllCounteroffer(client: Client, param: RoomParam, message: Message<BiddingAllCounteroffer>): void;
    OnBiddingDeal(client: Client, param: RoomParam, message: Message<BiddingDeal>): void;
    OnUserBiddingInitiateOffer(client: Client, param: RoomParam, message: Message<UserBiddingInitiateOffer>): void;
    OnUserBiddingReceivesOffer(client: Client, param: RoomParam, message: Message<UserBiddingReceivesOffer>): void;
    OnUserBiddingReceivesCounteroffer(client: Client, param: RoomParam, message: Message<UserBiddingReceivesCounteroffer>): void;
    OnUserBiddingRejectedOffer(client: Client, param: RoomParam, message: Message<UserBiddingRejectedOffer>): void;
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
    constructor(eventHandle: EventHandle, token?: string, showLog?: boolean);
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
}
export declare function newClient(eventHandle: EventHandle, token?: string, showLog?: boolean): Client;
export declare function getMsgSeqByRank(channel: ChannelType, rank?: number, params?: Record<string, any>, token?: string): Promise<string>;
