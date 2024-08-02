import { RequestMessage, RoomBasicParam, Message, RoomDetail, RoomGroupBuying, RoomGroupBuyingVote, RoomGroupBuyingNextProduct, RoomGroupBuyingStart, RoomGroupBuyingLotteryOpening, RoomGroupBuyingWinning, RoomGroupBuyingBiddingCounteroffer, RoomGroupBuyingBiddingDeal, RoomGroupBuyingBiddingBuyerInitiatesOffer, RoomGroupBuyingBiddingSellerReceivesOffer, RoomGroupBuyingBiddingSellerCounteroffer, RoomGroupBuyingBiddingBuyerOfferRejected } from "./types";
export interface Client {
    start(): Client;
    stop(autoConn?: boolean): Client;
    enterRoom(roomId: string): Client;
    leaveRoom(roomId: string): Client;
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
    isRequesting: boolean;
    constructor(config: RequestMessage, interval: number);
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
    constructor(eventHandle: EventHandle, url: string, token?: string, showLog?: boolean);
    start(): Client;
    stop(autoConn?: boolean): Client;
    registerChannel(config: RequestMessage, interval: number): void;
    enterRoom(roomId: string): Client;
    leaveRoom(roomId: string): Client;
    private onOpen;
    private onClose;
    private onMessage;
    private onError;
    private isTimeout;
    private handle;
}
export declare function newClient(eventHandle: EventHandle, url: string, token?: string, showLog?: boolean): Client;
