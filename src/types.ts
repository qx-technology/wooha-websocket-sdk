// ============================================================ //
// 配置
// ============================================================ //

export enum PlatformType {
  WEB = "web",
  UniApp = "uni-app"
}

// ============================================================ //
// 枚举
// ============================================================ //

/**
 * 通道类型
 */
export enum ChannelType {
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
  USER_ROOM_AGG_MSG = 7,
  /**
   * 用户养鸡游戏消息
   */
  USER_CHICKEN_GAME_MSG = 8,
  /**
   * 用户订单消息
   */
  USER_ORDER_MSG = 9
}

/**
 * 消息类型
 */
export enum MessageType {
  // ============================================================ //
  // 房间
  // ============================================================ //

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
   * 用户竞拍接受买家出价(私人)
   */
  USER_BIDDING_ACCEPTED_OFFER = 16,
  /**
   * 用户竞拍买家再次出价(私人)
   */
  USER_BIDDING_RE_OFFER = 17,
  /**
   * 用户竞拍买家再次出价被接受(私人)
   */
  USER_BIDDING_ACCEPTED_RE_OFFER = 18,
  /**
   * 用户竞拍买家再次出价被拒绝(私人)
   */
  USER_BIDDING_REJECTED_RE_OFFER = 19,
  /**
   * 用户竞拍卖家发起报还价(私人)
   */
  USER_BIDDING_INITIATE_COUNTEROFFER = 20,

  // ============================================================ //
  // 小鸡游戏
  // ============================================================ //

  /**
   * 购买小鸡
   */
  USER_CHICKEN_GAME_MSG_BUY_CHICKEN = 1,
  /**
   * 延长小鸡时长
   */
  USER_CHICKEN_GAME_MSG_INCREASE_LIFE = 2,
  /**
   * 购买饲料
   */
  USER_CHICKEN_GAME_MSG_BUY_FEED = 3,
  /**
   * 小鸡即将死亡
   */
  USER_CHICKEN_GAME_MSG_IMPENDING_DEATH = 4,
  /**
   * 小鸡死亡
   */
  USER_CHICKEN_GAME_MSG_CHICKEN_DEATH = 5,
  /**
   * 小鸡死透了
   */
  USER_CHICKEN_GAME_MSG_CHICKEN_ENTER_HEAVEN = 6,
  /**
   * Blobs兑换
   */
  USER_CHICKEN_GAME_MSG_BLOBS_EXCHANGE = 7,

  // ============================================================ //
  // 订单
  // ============================================================ //

  /**
   * 支付成功
   */
  USER_ORDER_MSG_PAYMENTED = 1,
  /**
   * 已发货
   */
  USER_ORDER_MSG_SHIPPED = 2,
  /**
   * 已完成
   */
  USER_ORDER_MSG_COMPLETED = 3,
  /**
   * 申请售后已通过
   */
  USER_ORDER_MSG_AFTERSALES_APPROVED = 4,
  /**
   * 申请售后被拒
   */
  USER_ORDER_MSG_AFTERSALES_REJECTED = 5,
  /**
   * 售后退款
   */
  USER_ORDER_MSG_AFTERSALES_REFUND = 6
}

// ============================================================ //
// 协议
// ============================================================ //

/// 消息
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
   * 消息时间戳
   */
  ts: bigint;
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

// ============================================================ //
// 房间业务
// ============================================================ //

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
  expiresAt?: Date;
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
  /**
   * 卖家用户ID
   */
  sellerUserId: bigint;
  /**
   * 买家用户ID
   */
  biddingUserId: bigint;
  /**
   * 过期时间
   */
  expiresAt?: Date;
  /**
   * 竞拍过期时间
   */
  auctionExpireTime: bigint;
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
  /**
   * 竞拍过期时间
   */
  auctionExpireTime: bigint;
  /**
   * 出价用户ID
   */
  biddingUserId: bigint;
  /**
   * 是否还价
   */
  isCounter: boolean;
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
  /**
   * 卖家用户ID
   */
  sellerUserId: bigint;
  /**
   * 过期时间
   */
  expiresAt?: Date;
  /**
   * 竞拍过期时间
   */
  auctionExpireTime: bigint;
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
  /**
   * 卖家用户ID
   */
  sellerUserId: bigint;
  /**
   * 过期时间
   */
  expiresAt?: Date;
  /**
   * 竞拍过期时间
   */
  auctionExpireTime: bigint;
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
  /**
   * 卖家用户ID
   */
  sellerUserId: bigint;
  /**
   * 买家用户ID
   */
  biddingUserId: bigint;
  /**
   * 过期时间
   */
  expiresAt?: Date;
  /**
   * 竞拍过期时间
   */
  auctionExpireTime: bigint;
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
  /**
   * 过期时间
   */
  expiresAt?: Date;
  /**
   * 竞拍过期时间
   */
  auctionExpireTime: bigint;
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
   * 过期时间
   */
  expiresAt?: Date;
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
   * 过期时间
   */
  expiresAt?: Date;
  /**
   * 竞拍过期时间
   */
  auctionExpireTime: bigint;
}

/**
 * 用户竞拍接受买家出价(私人)
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
   * 过期时间
   */
  expiresAt?: Date;
  /**
   * 竞拍过期时间
   */
  auctionExpireTime: bigint;
}

/**
 * 买家再次出价(私人)
 */
export interface UserBiddingReOffer {
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
   * 过期时间
   */
  expiresAt?: Date;
  /**
   * 竞拍过期时间
   */
  auctionExpireTime: bigint;
}

/**
 * 买家再次出价被接受(私人)
 */
export interface UserBiddingAcceptedReOffer {
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
   * 过期时间
   */
  expiresAt?: Date;
  /**
   * 竞拍过期时间
   */
  auctionExpireTime: bigint;
}

/**
 * 买家再次出价被拒绝(私人)
 */
export interface UserBiddingRejectedReOffer {
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
   * 过期时间
   */
  expiresAt?: Date;
  /**
   * 竞拍过期时间
   */
  auctionExpireTime: bigint;
}

/**
 * 卖家发起还价(私人)
 */
export interface UserBiddingInitiateCounteroffer {
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
   * 过期时间
   */
  expiresAt?: Date;
  /**
   * 竞拍过期时间
   */
  auctionExpireTime: bigint;
}

// ============================================================ //
// 小鸡游戏
// ============================================================ //

/**
 * 购买小鸡
 */
export interface UserChickenGameBuyChicken {
  /**
   * 用户ID
   */
  userId: bigint;
  /**
   * 订单ID
   */
  orderId: bigint;
  /**
   * 小时
   */
  hour: bigint;
  /**
   * 鸡蛋
   */
  egg: bigint;
}

/**
 * 延长小鸡时长
 */
export interface UserChickenGameIncreaseLife {
  /**
   * 用户ID
   */
  userId: bigint;
  /**
   * 订单ID
   */
  orderId: bigint;
  /**
   * 小时
   */
  hour: bigint;
  /**
   * 鸡蛋
   */
  egg: bigint;
}

/**
 * 购买饲料
 */
export interface UserChickenGameBuyFeed {
  /**
   * 用户ID
   */
  userId: bigint;
  /**
   * 订单ID
   */
  orderId: bigint;
  /**
   * 鸡蛋
   */
  egg: bigint;
}

/**
 * 小鸡即将死亡
 */
export interface UserChickenGameImpendingDeath {
  /**
   * 用户ID
   */
  userId: bigint;
  /**
   * 小鸡死亡时间
   */
  deathTime: bigint;
}

/**
 * 小鸡死亡
 */
export interface UserChickenGameChickenDeath {
  /**
   * 用户ID
   */
  userId: bigint;
  /**
   * 小鸡复活时间
   */
  endTime: bigint;
}

/**
 * 小鸡死透了
 */
export interface UserChickenGameChickenEnterHeaven {
  /**
   * 用户ID
   */
  userId: bigint;
}

/**
 * Blobs兑换
 */
export interface UserChickenGameBlobsExchange {
  /**
   * 用户ID
   */
  userId: bigint;
  /**
   * 订单ID
   */
  orderId: bigint;
  /**
   * 数量
   */
  amount: number;
}

// ============================================================ //
// 用户订单消息
// ============================================================ //

/**
 * 支付成功
 */
export interface UserOrderPaymented {
  /**
   * 用户ID
   */
  userId: bigint;
  /**
   * 订单ID
   */
  orderId: bigint;
  /**
   * 商品信息
   */
  productInfo: string;
}

/**
 * 已发货
 */
export interface UserOrderShipped {
  /**
   * 用户ID
   */
  userId: bigint;
  /**
   * 订单ID
   */
  orderId: bigint;
  /**
   * 商品信息
   */
  productInfo: string;
}

/**
 * 已完成
 */
export interface UserOrderCompleted {
  /**
   * 用户ID
   */
  userId: bigint;
  /**
   * 订单ID
   */
  orderId: bigint;
  /**
   * 商品信息
   */
  productInfo: string;
}

/**
 * 申请售后已通过
 */
export interface UserOrderAfterSalesApproved {
  /**
   * 用户ID
   */
  userId: bigint;
  /**
   * 订单ID
   */
  orderId: bigint;
  /**
   * 商品信息
   */
  productInfo: string;
  /**
   * 售后ID
   */
  afterSaleId: bigint;
}

/**
 * 申请售后被拒
 */
export interface UserOrderAfterSalesRejected {
  /**
   * 用户ID
   */
  userId: bigint;
  /**
   * 订单ID
   */
  orderId: bigint;
  /**
   * 商品信息
   */
  productInfo: string;
  /**
   * 售后ID
   */
  afterSaleId: bigint;
}

/**
 * 售后退款
 */
export interface UserOrderAfterSalesRefund {
  /**
   * 用户ID
   */
  userId: bigint;
  /**
   * 订单ID
   */
  orderId: bigint;
  /**
   * 商品信息
   */
  productInfo: string;
  /**
   * 售后ID
   */
  afterSaleId: bigint;
}
