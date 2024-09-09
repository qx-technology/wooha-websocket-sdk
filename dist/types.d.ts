/**
 * 通道类型
 */
export declare enum ChannelType {
    /**
     * 心跳
     */
    HEARTBEAT = 0,
    /**
     * 房间详情
     */
    ROOM = 1,
    /**
     * 团购详情
     */
    GROUPBUYING = 2,
    /**
     * 团购投票
     */
    GROUPBUYING_VOTE = 3,
    /**
     * 房间消息
     */
    ROOM_MSG = 4,
    /**
     * 房间聚合消息
     */
    ROOM_AGG_MSG = 5,
    /**
     * 用户房间消息
     */
    USER_ROOM_MSG = 6,
    /**
     * 用户房间聚合消息
     */
    USER_ROOM_AGG_MSG = 7
}
/**
 * 消息类型
 */
export declare enum MessageType {
    /**
     * 房间详情
     */
    ROOM = 0,
    /**
     * 团购详情
     */
    GROUPBUYING = 1,
    /**
     * 团购投票
     */
    GROUPBUYING_VOTE = 2,
    /**
     * 团购下一个商品
     */
    GROUPBUYING_NEXT_PRODUCT = 3,
    /**
     * 团购开始
     */
    GROUPBUYING_START = 4,
    /**
     * 团购正在开奖
     */
    GROUPBUYING_LOTTERY_OPENING = 5,
    /**
     * 团购中奖
     */
    GROUPBUYING_WINNING = 6,
    /**
     * 竞拍开始
     */
    BIDDING_START = 13,
    /**
     * 竞拍还价所有人
     */
    BIDDING_ALL_COUNTEROFFER = 7,
    /**
     * 竞拍成交
     */
    BIDDING_DEAL = 8,
    /**
     * 用户竞拍买家发起报价(私人)
     */
    USER_BIDDING_INITIATE_OFFER = 9,
    /**
     * 用户竞拍卖家收到报价(私人)
     */
    USER_BIDDING_RECEIVES_OFFER = 10,
    /**
     * 用户竞拍买家收到还价(私人)
     */
    USER_BIDDING_RECEIVES_COUNTEROFFER = 11,
    /**
     * 用户竞拍卖家还价被拒(私人)
     */
    USER_BIDDING_REJECTED_COUNTEROFFER = 15,
    /**
     * 用户竞拍接受卖家还价(私人)
     */
    USER_BIDDING_ACCEPTED_COUNTEROFFER = 14,
    /**
     * 用户竞拍买家报价被拒(私人)
     */
    USER_BIDDING_REJECTED_OFFER = 12,
    /**
     * 用户竞拍接受卖家出价(私人)
     */
    USER_BIDDING_ACCEPTED_OFFER = 16
}
export interface Message<M = any> {
    /**
     * 消息序号
     */
    seq: bigint;
    /**
     * 消息类型
     */
    type: MessageType;
    /**
     * 消息内容
     */
    content: M;
}
/**
 * 请求消息
 */
export interface RequestMessage<P = any> {
    /**
     * 通道类型
     */
    channel: ChannelType;
    /**
     * 请求版本
     */
    version: string;
    /**
     * 请求序号
     */
    seq: bigint;
    /**
     * 请求时间戳
     */
    ts: bigint;
    /**
     * 请求唯一ID
     */
    uid: string;
    /**
     * 请求参数
     */
    params: P;
}
/**
 * 响应消息
 */
export interface ResponseMessage<P = any> extends RequestMessage<P> {
    /**
     * 响应序号
     */
    rpsSeq: bigint;
    /**
     * 响应时间戳
     */
    rpsTs: bigint;
    /**
     * 响应数据
     */
    contents: Message[];
}
/**
 * 房间请求参数
 */
export interface RoomParam {
    /**
     * 房间ID
     */
    roomId: bigint;
}
/**
 * 房间详情
 */
export interface Room {
    /**
     * 房间ID
     */
    roomId: bigint;
    /**
     * 在线人数
     */
    onlinePeople: bigint;
}
/**
 * 团购详情
 */
export interface GroupBuying {
    /**
     * 房间ID
     */
    roomId: bigint;
    /**
     * 团购ID
     */
    groupBuyingId: bigint;
    /**
     * 最大投票数
     */
    maxVoteTickets: bigint;
    /**
     * 用户最大投票数
     */
    userMaxVoteTickets: bigint;
    /**
     * 当前投票数
     */
    currentVoteTickets: bigint;
    /**
     * 投票进度
     */
    voteProgress: bigint;
}
/**
 * 团购投票
 */
export interface GroupBuyingVote {
    /**
     * 房间ID
     */
    roomId: bigint;
    /**
     * 团购ID
     */
    groupBuyingId: bigint;
    /**
     * 用户ID
     */
    userId: bigint;
    /**
     * 用户名
     */
    username: string;
    /**
     * 用户头像
     */
    userAvatar: string;
    /**
     * 用户头像框
     */
    userAvatarFrame: string;
    /**
     * 投票时间
     */
    voteTime: bigint;
    /**
     * 票数
     */
    tickets: bigint;
}
/**
 * 团购下一个商品
 */
export interface GroupBuyingNextProduct {
    /**
     * 房间ID
     */
    roomId: bigint;
    /**
     * 团购ID
     */
    groupBuyingId: bigint;
    /**
     * 商品ID
     */
    productId: bigint;
    /**
     * 商品名称
     */
    productName: string;
    /**
     * 商品图片
     */
    productImage: string;
    /**
     * SKUID
     */
    skuId: bigint;
    /**
     * 开始时间
     */
    beginTime: bigint;
}
/**
 * 团购开始
 */
export interface GroupBuyingStart {
    /**
     * 房间ID
     */
    roomId: bigint;
}
/**
 * 团购正在开奖
 */
export interface GroupBuyingLotteryOpening {
    /**
     * 房间ID
     */
    roomId: bigint;
}
/**
 * 团购中奖
 */
export interface GroupBuyingWinning {
    /**
     * 房间ID
     */
    roomId: bigint;
    /**
     * 中奖用户ID
     */
    winnerUserId: bigint;
    /**
     * 中奖用户名
     */
    winnerUsername: string;
    /**
     * 中奖用户头像
     */
    winnerUserAvatar: string;
    /**
     * 中奖用户头像框
     */
    winnerUserAvatarFrame: string;
    /**
     * 奖品领取时间
     */
    prizeCollectionTime: bigint;
    /**
     * 商品ID
     */
    productId: bigint;
    /**
     * 商品名
     */
    productName: string;
    /**
     * 商品图片
     */
    productImage: string;
    /**
     * SKUID
     */
    skuId: bigint;
    /**
     * 竞拍ID
     */
    auctionId: bigint;
}
/**
 * 竞拍开始
 */
export interface BiddingStart {
    /**
     * 房间ID
     */
    roomId: bigint;
    /**
     * 竞拍ID
     */
    auctionId: bigint;
    /**
     * 过期时间
     */
    expiresAt?: string;
    /**
     * 竞拍过期时间
     */
    auctionExpireTime: bigint;
}
/**
 * 竞拍还价所有人
 */
export interface BiddingAllCounteroffer {
    /**
     * 房间ID
     */
    roomId: bigint;
    /**
     * 竞拍ID
     */
    auctionId: bigint;
    /**
     * 金额
     */
    amount: bigint;
}
/**
 * 竞拍成交
 */
export interface BiddingDeal {
    /**
     * 房间ID
     */
    roomId: bigint;
    /**
     * 竞拍ID
     */
    auctionId: bigint;
    /**
     * 出价用户ID
     */
    userId: bigint;
    /**
     * 金额
     */
    amount: bigint;
    /**
     * 卖家用户ID
     */
    sellerUserId: bigint;
    /**
     * 卖家用户名
     */
    sellerUsername: string;
    /**
     * 卖家用户头像
     */
    sellerUserAvatar: string;
    /**
     * 卖家用户头像框
     */
    sellerUserAvatarFrame: string;
    /**
     * 商品名
     */
    productName: string;
    /**
     * 商品图片
     */
    productImage: string;
}
/**
 * 用户竞拍买家发起报价(私人)
 */
export interface UserBiddingInitiateOffer {
    /**
     * 房间ID
     */
    roomId: bigint;
    /**
     * 用户ID
     */
    userId: bigint;
    /**
     * 出价用户ID
     */
    biddingUserId: bigint;
    /**
     * 竞拍ID
     */
    auctionId: bigint;
    /**
     * 金额
     */
    amount: bigint;
}
/**
 * 用户竞拍卖家收到报价(私人)
 */
export interface UserBiddingReceivesOffer {
    /**
     * 房间ID
     */
    roomId: bigint;
    /**
     * 用户ID
     */
    userId: bigint;
    /**
     * 出价用户ID
     */
    biddingUserId: bigint;
    /**
     * 竞拍ID
     */
    auctionId: bigint;
    /**
     * 金额
     */
    amount: bigint;
}
/**
 * 用户竞拍买家收到还价(私人)
 */
export interface UserBiddingReceivesCounteroffer {
    /**
     * 房间ID
     */
    roomId: bigint;
    /**
     * 用户ID
     */
    userId: bigint;
    /**
     * 竞拍ID
     */
    auctionId: bigint;
    /**
     * 金额
     */
    amount: bigint;
}
/**
 * 用户竞拍买家报价被拒(私人)
 */
export interface UserBiddingRejectedOffer {
    /**
     * 房间ID
     */
    roomId: bigint;
    /**
     * 用户ID
     */
    userId: bigint;
    /**
     * 出价用户ID
     */
    biddingUserId: bigint;
    /**
     * 竞拍ID
     */
    auctionId: bigint;
    /**
     * 金额
     */
    amount: bigint;
}
/**
 * 用户竞拍接受卖家还价(私人)
 */
export interface UserSellerAcceptedOffer {
    /**
     * 房间ID
     */
    roomId: bigint;
    /**
     * 用户ID
     */
    userId: bigint;
    /**
     * 卖家用户ID
     */
    sellerUserId: bigint;
    /**
     * 出价用户ID
     */
    biddingUserId: bigint;
    /**
     * 竞拍ID
     */
    auctionId: bigint;
    /**
     * 金额
     */
    amount: bigint;
    /**
     * 竞拍过期时间
     */
    auctionExpireTime: bigint;
}
/**
 * 用户竞拍卖家还价被拒(私人)
 */
export interface UserSellerRejectedOffer {
    /**
     * 房间ID
     */
    roomId: bigint;
    /**
     * 用户ID
     */
    userId: bigint;
    /**
     * 卖家用户ID
     */
    sellerUserId: bigint;
    /**
     * 出价用户ID
     */
    biddingUserId: bigint;
    /**
     * 竞拍ID
     */
    auctionId: bigint;
    /**
     * 金额
     */
    amount: bigint;
    /**
     * 竞拍过期时间
     */
    auctionExpireTime: bigint;
}
/**
 * 用户竞拍接受卖家出价(私人)
 */
export interface UserBiddingAcceptedOffer {
    /**
     * 房间ID
     */
    roomId: bigint;
    /**
     * 用户ID
     */
    userId: bigint;
    /**
     * 卖家用户ID
     */
    sellerUserId: bigint;
    /**
     * 出价用户ID
     */
    biddingUserId: bigint;
    /**
     * 竞拍ID
     */
    auctionId: bigint;
    /**
     * 金额
     */
    amount: bigint;
    /**
     * 竞拍过期时间
     */
    auctionExpireTime: bigint;
}
