"use strict";
// ============================================================ //
// 枚举
// ============================================================ //
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageType = exports.ChannelType = void 0;
/**
 * 通道类型
 */
var ChannelType;
(function (ChannelType) {
    /**
     * 心跳
     */
    ChannelType[ChannelType["HEARTBEAT"] = 0] = "HEARTBEAT";
    /**
     * 房间详情
     */
    ChannelType[ChannelType["ROOM_DETAIL"] = 1] = "ROOM_DETAIL";
    /**
     * 房间团购详情
     */
    ChannelType[ChannelType["ROOM_GROUP_BUYING"] = 2] = "ROOM_GROUP_BUYING";
    /**
     * 房间消息
     */
    ChannelType[ChannelType["ROOM_MESSAGE"] = 3] = "ROOM_MESSAGE";
    /**
     * 房间投票
     */
    ChannelType[ChannelType["ROOM_VOTE"] = 4] = "ROOM_VOTE";
    /**
     * 房间用户消息
     */
    ChannelType[ChannelType["ROOM_USER_MESSAGE"] = 5] = "ROOM_USER_MESSAGE";
})(ChannelType || (exports.ChannelType = ChannelType = {}));
/**
 * 消息类型
 */
var MessageType;
(function (MessageType) {
    /**
     * 房间详情
     */
    MessageType[MessageType["ROOM_DETAIL"] = 0] = "ROOM_DETAIL";
    /**
     * 房间团购详情
     */
    MessageType[MessageType["ROOM_GROUP_BUYING_DETAIL"] = 1] = "ROOM_GROUP_BUYING_DETAIL";
    /**
     * 房间团购投票
     */
    MessageType[MessageType["ROOM_GROUP_BUYING_VOTE"] = 2] = "ROOM_GROUP_BUYING_VOTE";
    /**
     * 房间团购下一个商品
     */
    MessageType[MessageType["ROOM_GROUP_BUYING_NEXT_PRODUCT"] = 3] = "ROOM_GROUP_BUYING_NEXT_PRODUCT";
    /**
     * 房间团购开始
     */
    MessageType[MessageType["ROOM_GROUP_BUYING_START"] = 4] = "ROOM_GROUP_BUYING_START";
    /**
     * 房间团购正在开奖
     */
    MessageType[MessageType["ROOM_GROUP_BUYING_LOTTERY_OPENING"] = 5] = "ROOM_GROUP_BUYING_LOTTERY_OPENING";
    /**
     * 房间团购中奖
     */
    MessageType[MessageType["ROOM_GROUP_BUYING_WINNING"] = 6] = "ROOM_GROUP_BUYING_WINNING";
    /**
     * 房间团购竞拍还价所有人
     */
    MessageType[MessageType["ROOM_GROUP_BUYING_BIDDING_COUNTEROFFER"] = 7] = "ROOM_GROUP_BUYING_BIDDING_COUNTEROFFER";
    /**
     * 房间团购竞拍成交
     */
    MessageType[MessageType["ROOM_GROUP_BUYING_BIDDING_DEAL"] = 8] = "ROOM_GROUP_BUYING_BIDDING_DEAL";
    /**
     * 房间团购竞拍买家发起报价(私人)
     */
    MessageType[MessageType["ROOM_GROUP_BUYING_BIDDING_BUYER_INITIATES_OFFER"] = 9] = "ROOM_GROUP_BUYING_BIDDING_BUYER_INITIATES_OFFER";
    /**
     * 房间团购竞拍卖家收到报价(私人)
     */
    MessageType[MessageType["ROOM_GROUP_BUYING_BIDDING_SELLER_RECEIVES_OFFER"] = 10] = "ROOM_GROUP_BUYING_BIDDING_SELLER_RECEIVES_OFFER";
    /**
     * 房间团购竞拍买家收到还价(私人)
     */
    MessageType[MessageType["ROOM_GROUP_BUYING_BIDDING_SELLER_COUNTEROFFER"] = 11] = "ROOM_GROUP_BUYING_BIDDING_SELLER_COUNTEROFFER";
    /**
     * 房间团购竞拍买家报价被拒(私人)
     */
    MessageType[MessageType["ROOM_GROUP_BUYING_BIDDING_BUYER_OFFER_REJECTED"] = 12] = "ROOM_GROUP_BUYING_BIDDING_BUYER_OFFER_REJECTED";
})(MessageType || (exports.MessageType = MessageType = {}));
//# sourceMappingURL=types.js.map