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
    ChannelType[ChannelType["ROOM"] = 1] = "ROOM";
    /**
     * 团购详情
     */
    ChannelType[ChannelType["GROUPBUYING"] = 2] = "GROUPBUYING";
    /**
     * 团购投票
     */
    ChannelType[ChannelType["GROUPBUYING_VOTE"] = 3] = "GROUPBUYING_VOTE";
    /**
     * 房间消息
     */
    ChannelType[ChannelType["ROOM_MSG"] = 4] = "ROOM_MSG";
    /**
     * 房间聚合消息
     */
    ChannelType[ChannelType["ROOM_AGG_MSG"] = 5] = "ROOM_AGG_MSG";
    /**
     * 用户房间消息
     */
    ChannelType[ChannelType["USER_ROOM_MSG"] = 6] = "USER_ROOM_MSG";
    /**
     * 用户房间聚合消息
     */
    ChannelType[ChannelType["USER_ROOM_AGG_MSG"] = 7] = "USER_ROOM_AGG_MSG";
})(ChannelType || (exports.ChannelType = ChannelType = {}));
/**
 * 消息类型
 */
var MessageType;
(function (MessageType) {
    /**
     * 房间详情
     */
    MessageType[MessageType["ROOM"] = 0] = "ROOM";
    /**
     * 团购详情
     */
    MessageType[MessageType["GROUPBUYING"] = 1] = "GROUPBUYING";
    /**
     * 团购投票
     */
    MessageType[MessageType["GROUPBUYING_VOTE"] = 2] = "GROUPBUYING_VOTE";
    /**
     * 团购下一个商品
     */
    MessageType[MessageType["GROUPBUYING_NEXT_PRODUCT"] = 3] = "GROUPBUYING_NEXT_PRODUCT";
    /**
     * 团购开始
     */
    MessageType[MessageType["GROUPBUYING_START"] = 4] = "GROUPBUYING_START";
    /**
     * 团购正在开奖
     */
    MessageType[MessageType["GROUPBUYING_LOTTERY_OPENING"] = 5] = "GROUPBUYING_LOTTERY_OPENING";
    /**
     * 团购中奖
     */
    MessageType[MessageType["GROUPBUYING_WINNING"] = 6] = "GROUPBUYING_WINNING";
    /**
     * 竞拍开始
     */
    MessageType[MessageType["BIDDING_START"] = 13] = "BIDDING_START";
    /**
     * 竞拍还价所有人
     */
    MessageType[MessageType["BIDDING_ALL_COUNTEROFFER"] = 7] = "BIDDING_ALL_COUNTEROFFER";
    /**
     * 竞拍成交
     */
    MessageType[MessageType["BIDDING_DEAL"] = 8] = "BIDDING_DEAL";
    /**
     * 用户竞拍买家发起报价(私人)
     */
    MessageType[MessageType["USER_BIDDING_INITIATE_OFFER"] = 9] = "USER_BIDDING_INITIATE_OFFER";
    /**
     * 用户竞拍卖家收到报价(私人)
     */
    MessageType[MessageType["USER_BIDDING_RECEIVES_OFFER"] = 10] = "USER_BIDDING_RECEIVES_OFFER";
    /**
     * 用户竞拍买家收到还价(私人)
     */
    MessageType[MessageType["USER_BIDDING_RECEIVES_COUNTEROFFER"] = 11] = "USER_BIDDING_RECEIVES_COUNTEROFFER";
    /**
     * 用户竞拍卖家还价被拒(私人)
     */
    MessageType[MessageType["USER_BIDDING_REJECTED_COUNTEROFFER"] = 15] = "USER_BIDDING_REJECTED_COUNTEROFFER";
    /**
     * 用户竞拍接受卖家还价(私人)
     */
    MessageType[MessageType["USER_BIDDING_ACCEPTED_COUNTEROFFER"] = 14] = "USER_BIDDING_ACCEPTED_COUNTEROFFER";
    /**
     * 用户竞拍买家报价被拒(私人)
     */
    MessageType[MessageType["USER_BIDDING_REJECTED_OFFER"] = 12] = "USER_BIDDING_REJECTED_OFFER";
    /**
     * 用户竞拍接受卖家出价(私人)
     */
    MessageType[MessageType["USER_BIDDING_ACCEPTED_OFFER"] = 16] = "USER_BIDDING_ACCEPTED_OFFER";
})(MessageType || (exports.MessageType = MessageType = {}));
//# sourceMappingURL=types.js.map