import { RequestMessage, RoomBasicParam, ChannelType, Message, RoomDetail, RoomGroupBuying, RoomGroupBuyingVote, RoomGroupBuyingNextProduct, RoomGroupBuyingStart, RoomGroupBuyingLotteryOpening, RoomGroupBuyingWinning, RoomGroupBuyingBiddingCounteroffer, RoomGroupBuyingBiddingDeal, RoomGroupBuyingBiddingBuyerInitiatesOffer, RoomGroupBuyingBiddingSellerReceivesOffer, RoomGroupBuyingBiddingSellerCounteroffer, RoomGroupBuyingBiddingBuyerOfferRejected } from "./types";
export declare function configSite(url: string): void;
export declare function useHttps(): void;
export declare function useWss(): void;
export interface Client {
    start(): Client;
    stop(autoConn?: boolean): Client;
    enterRoom(roomId: bigint): Promise<Client>;
    leaveRoom(roomId: bigint): Client;
}
export interface EventHandle {
    OnRoomDetail(client: Client, param: RoomBasicParam, message: Message<RoomDetail>): void;
    OnRoomGroupBuying(client: Client, param: RoomBasicParam, message: Message<RoomGroupBuying>): void;
    OnRoomGroupBuyingVote(client: Client, param: RoomBasicParam, message: Message<RoomGroupBuyingVote>): void;
    OnRoomGroupBuyingNextProduct(client: Client, param: RoomBasicParam, message: Message<RoomGroupBuyingNextProduct>): void;
    OnRoomGroupBuyingStart(client: Client, param: RoomBasicParam, message: Message<RoomGroupBuyingStart>): void;
    OnRoomGroupBuyingLotteryOpening(client: Client, param: RoomBasicParam, message: Message<RoomGroupBuyingLotteryOpening>): void;
    OnRoomGroupBuyingWinning(client: Client, param: RoomBasicParam, message: Message<RoomGroupBuyingWinning>): void;
    OnRoomGroupBuyingBiddingCounteroffer(client: Client, param: RoomBasicParam, message: Message<RoomGroupBuyingBiddingCounteroffer>): void;
    OnRoomGroupBuyingBiddingDeal(client: Client, param: RoomBasicParam, message: Message<RoomGroupBuyingBiddingDeal>): void;
    OnRoomGroupBuyingBiddingBuyerInitiatesOffer(client: Client, param: RoomBasicParam, message: Message<RoomGroupBuyingBiddingBuyerInitiatesOffer>): void;
    OnRoomGroupBuyingBiddingSellerReceivesOffer(client: Client, param: RoomBasicParam, message: Message<RoomGroupBuyingBiddingSellerReceivesOffer>): void;
    OnRoomGroupBuyingBiddingSellerCounteroffer(client: Client, param: RoomBasicParam, message: Message<RoomGroupBuyingBiddingSellerCounteroffer>): void;
    OnRoomGroupBuyingBiddingBuyerOfferRejected(client: Client, param: RoomBasicParam, message: Message<RoomGroupBuyingBiddingBuyerOfferRejected>): void;
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
export declare function getMessageVersioinByRank(channel: ChannelType, rank?: number, params?: Record<string, any>, token?: string): Promise<string>;
