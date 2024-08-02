"use strict";
// ============================================================ //
// Websocket协议
// ============================================================ //
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceType = exports.MessageType = exports.ChannelType = void 0;
/// 通道类型
var ChannelType;
(function (ChannelType) {
    /// 房间详情
    ChannelType["RoomDetail"] = "RoomDetail";
    /// 房间团购详情
    ChannelType["RoomGroupBuying"] = "RoomGroupBuying";
    /// 房间消息
    ChannelType["RoomMessage"] = "RoomMessage";
    /// 房间投票
    ChannelType["RoomVote"] = "RoomVote";
    /// 房间用户消息
    ChannelType["RoomUserMessage"] = "RoomUserMessage";
})(ChannelType || (exports.ChannelType = ChannelType = {}));
// ============================================================ //
// 消息协议
// ============================================================ //
/// 消息类型
var MessageType;
(function (MessageType) {
    /// 普通消息
    MessageType["Normal"] = "Normal";
})(MessageType || (exports.MessageType = MessageType = {}));
/// 业务类型
var ServiceType;
(function (ServiceType) {
    /// 房间详情
    ServiceType["RoomDetail"] = "RoomDetail";
    /// 房间团购详情
    ServiceType["RoomGroupBuying"] = "RoomGroupBuying";
    /// 房间团购 投票
    ServiceType["RoomGroupBuyingVote"] = "RoomGroupBuyingVote";
    /// 房间团购 下一个商品
    ServiceType["RoomGroupBuyingNextProduct"] = "RoomGroupBuyingNextProduct";
    /// 房间团购 开始
    ServiceType["RoomGroupBuyingStart"] = "RoomGroupBuyingStart";
    /// 房间团购 正在开奖
    ServiceType["RoomGroupBuyingLotteryOpening"] = "RoomGroupBuyingLotteryOpening";
    /// 房间团购 中奖
    ServiceType["RoomGroupBuyingWinning"] = "RoomGroupBuyingWinning";
    /// 房间团购 竞拍还价所有人
    ServiceType["RoomGroupBuyingBiddingCounteroffer"] = "RoomGroupBuyingBiddingCounteroffer";
    /// 房间团购 竞拍成交
    ServiceType["RoomGroupBuyingBiddingDeal"] = "RoomGroupBuyingBiddingDeal";
    /// 房间团购 竞拍买家发起报价(私人)
    ServiceType["RoomGroupBuyingBiddingBuyerInitiatesOffer"] = "RoomGroupBuyingBiddingBuyerInitiatesOffer";
    /// 房间团购 竞拍卖家收到报价(私人)
    ServiceType["RoomGroupBuyingBiddingSellerReceivesOffer"] = "RoomGroupBuyingBiddingSellerReceivesOffer";
    /// 房间团购 竞拍买家收到还价(私人)
    ServiceType["RoomGroupBuyingBiddingSellerCounteroffer"] = "RoomGroupBuyingBiddingSellerCounteroffer";
    /// 房间团购 竞拍买家报价被拒(私人)
    ServiceType["RoomGroupBuyingBiddingBuyerOfferRejected"] = "RoomGroupBuyingBiddingBuyerOfferRejected";
})(ServiceType || (exports.ServiceType = ServiceType = {}));
