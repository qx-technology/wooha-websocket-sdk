export declare enum ChannelType {
    RoomDetail = "RoomDetail",
    RoomGroupBuying = "RoomGroupBuying",
    RoomMessage = "RoomMessage",
    RoomVote = "RoomVote",
    RoomUserMessage = "RoomUserMessage"
}
export interface RequestMessage<P = any> {
    channel: ChannelType;
    version: string;
    seq: string;
    ts: number;
    uid: string;
    params: P;
}
export interface ResponseMessage<P = any, D = any> {
    channel: ChannelType;
    version: string;
    seq: string;
    ts: number;
    uid: string;
    params: P;
    rpsSeq: string;
    rpsTs: number;
    data: D[];
}
export declare enum MessageType {
    Normal = "Normal"
}
export declare enum ServiceType {
    RoomDetail = "RoomDetail",
    RoomGroupBuying = "RoomGroupBuying",
    RoomGroupBuyingVote = "RoomGroupBuyingVote",
    RoomGroupBuyingNextProduct = "RoomGroupBuyingNextProduct",
    RoomGroupBuyingStart = "RoomGroupBuyingStart",
    RoomGroupBuyingLotteryOpening = "RoomGroupBuyingLotteryOpening",
    RoomGroupBuyingWinning = "RoomGroupBuyingWinning",
    RoomGroupBuyingBiddingCounteroffer = "RoomGroupBuyingBiddingCounteroffer",
    RoomGroupBuyingBiddingDeal = "RoomGroupBuyingBiddingDeal",
    RoomGroupBuyingBiddingBuyerInitiatesOffer = "RoomGroupBuyingBiddingBuyerInitiatesOffer",
    RoomGroupBuyingBiddingSellerReceivesOffer = "RoomGroupBuyingBiddingSellerReceivesOffer",
    RoomGroupBuyingBiddingSellerCounteroffer = "RoomGroupBuyingBiddingSellerCounteroffer",
    RoomGroupBuyingBiddingBuyerOfferRejected = "RoomGroupBuyingBiddingBuyerOfferRejected"
}
export interface Message<D = any> {
    messageId: string;
    messageType: MessageType;
    serviceType: ServiceType;
    content: D;
}
export interface RoomBasicParam {
    roomId: string;
}
export interface RoomDetail {
    onlinePeople: number;
}
export interface RoomGroupBuying {
    id: string;
    groupBuyingId: number;
    maxVoteTickets: number;
    userMaxVoteTickets: number;
    currentVoteTickets: number;
    voteProgress: number;
}
export interface RoomGroupBuyingVote {
    groupBuyingId: number;
    userId: string;
    username: string;
    userAvatar: string;
    userAvatarFrame: string;
    voteTime: string;
    tickets: number;
}
export interface RoomGroupBuyingNextProduct {
    groupBuyingId: string;
    productId: string;
    productName: string;
    productImage: string;
    skuId: string;
    beginTime: string;
}
export interface RoomGroupBuyingStart {
}
export interface RoomGroupBuyingLotteryOpening {
}
export interface RoomGroupBuyingWinning {
    winnerUserId: string;
    winnerUsername: string;
    winnerUserAvatar: string;
    winnerUserAvatarFrame: string;
    prizeCollectionTime: string;
    productId: string;
    productName: string;
    productImage: string;
    skuId: string;
    auctionId: string;
}
export interface RoomGroupBuyingBiddingCounteroffer {
    auctionId: string;
    amount: number;
}
export interface RoomGroupBuyingBiddingDeal {
    auctionId: string;
    userId: string;
    amount: number;
    sellerUserId: string;
    sellerUsername: string;
    sellerUserAvatar: string;
    sellerUserAvatarFrame: string;
    productName: string;
    productImage: string;
}
export interface RoomGroupBuyingBiddingBuyerInitiatesOffer {
    auctionId: string;
    userId: string;
    amount: number;
}
export interface RoomGroupBuyingBiddingSellerReceivesOffer {
    auctionId: string;
    userId: string;
    amount: number;
}
export interface RoomGroupBuyingBiddingSellerCounteroffer {
    auctionId: string;
    amount: number;
}
export interface RoomGroupBuyingBiddingBuyerOfferRejected {
    auctionId: string;
    userId: string;
    amount: number;
}
