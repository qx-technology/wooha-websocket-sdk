export * as types from "./types";
import * as types from "./types";
export interface Client {
    start(): Client;
    stop(autoConn?: boolean): Client;
    enterRoom(roomId: string): Client;
    leaveRoom(roomId: string): Client;
}
export interface EventHandle {
    OnRoomDetail(client: Client, param: types.RoomBasicParam, message: types.Message<types.RoomDetail>): void;
    OnRoomGroupBuying(client: Client, param: types.RoomBasicParam, message: types.Message<types.RoomGroupBuying>): void;
    OnRoomGroupBuyingVote(client: Client, param: types.RoomBasicParam, message: types.Message<types.RoomGroupBuyingVote>): void;
    OnRoomGroupBuyingNextProduct(client: Client, param: types.RoomBasicParam, message: types.Message<types.RoomGroupBuyingNextProduct>): void;
    OnRoomGroupBuyingStart(client: Client, param: types.RoomBasicParam, message: types.Message<types.RoomGroupBuyingStart>): void;
    OnRoomGroupBuyingLotteryOpening(client: Client, param: types.RoomBasicParam, message: types.Message<types.RoomGroupBuyingLotteryOpening>): void;
    OnRoomGroupBuyingWinning(client: Client, param: types.RoomBasicParam, message: types.Message<types.RoomGroupBuyingWinning>): void;
    OnRoomGroupBuyingBiddingCounteroffer(client: Client, param: types.RoomBasicParam, message: types.Message<types.RoomGroupBuyingBiddingCounteroffer>): void;
    OnRoomGroupBuyingBiddingDeal(client: Client, param: types.RoomBasicParam, message: types.Message<types.RoomGroupBuyingBiddingDeal>): void;
    OnRoomGroupBuyingBiddingBuyerInitiatesOffer(client: Client, param: types.RoomBasicParam, message: types.Message<types.RoomGroupBuyingBiddingBuyerInitiatesOffer>): void;
    OnRoomGroupBuyingBiddingSellerReceivesOffer(client: Client, param: types.RoomBasicParam, message: types.Message<types.RoomGroupBuyingBiddingSellerReceivesOffer>): void;
    OnRoomGroupBuyingBiddingSellerCounteroffer(client: Client, param: types.RoomBasicParam, message: types.Message<types.RoomGroupBuyingBiddingSellerCounteroffer>): void;
    OnRoomGroupBuyingBiddingBuyerOfferRejected(client: Client, param: types.RoomBasicParam, message: types.Message<types.RoomGroupBuyingBiddingBuyerOfferRejected>): void;
}
export declare function newClient(eventHandle: EventHandle, url: string, token?: string, showLog?: boolean): Client;
