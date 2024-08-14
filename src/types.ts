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
  USER_ROOM_AGG_MSG = 7
}

/**
 * 消息类型
 */
export enum MessageType {
  /**
   * 房间详情
   */
  ROOM_DETAIL,
  /**
   * 房间团购详情
   */
  ROOM_GROUP_BUYING_DETAIL,
  /**
   * 房间团购投票
   */
  ROOM_GROUP_BUYING_VOTE,
  /**
   * 房间团购下一个商品
   */
  ROOM_GROUP_BUYING_NEXT_PRODUCT,
  /**
   * 房间团购开始
   */
  ROOM_GROUP_BUYING_START,
  /**
   * 房间团购正在开奖
   */
  ROOM_GROUP_BUYING_LOTTERY_OPENING,
  /**
   * 房间团购中奖
   */
  ROOM_GROUP_BUYING_WINNING,
  /**
   * 房间团购竞拍还价所有人
   */
  ROOM_GROUP_BUYING_BIDDING_COUNTEROFFER,
  /**
   * 房间团购竞拍成交
   */
  ROOM_GROUP_BUYING_BIDDING_DEAL,
  /**
   * 用户团购竞拍买家发起报价(私人)
   */
  USER_GROUP_BUYING_BIDDING_BUYER_INITIATES_OFFER,
  /**
   * 用户团购竞拍卖家收到报价(私人)
   */
  USER_GROUP_BUYING_BIDDING_SELLER_RECEIVES_OFFER,
  /**
   * 用户团购竞拍买家收到还价(私人)
   */
  USER_GROUP_BUYING_BIDDING_SELLER_COUNTEROFFER,
  /**
   * 用户团购竞拍买家报价被拒(私人)
   */
  USER_GROUP_BUYING_BIDDING_BUYER_OFFER_REJECTED
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
 * 房间基础请求参数
 */
export interface RoomBasicParam {
  /**
   * 房间ID
   */
  roomId: bigint;
}

/**
 * 房间详情
 */
export interface RoomDetail {
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
 * 房间团购详情
 */
export interface RoomGroupBuying {
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
 * 房间团购投票
 */
export interface RoomGroupBuyingVote {
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
 * 房间团购下一个商品
 */
export interface RoomGroupBuyingNextProduct {
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
 * 房间团购开始
 */
export interface RoomGroupBuyingStart {
  /**
   * 房间ID
   */
  roomId: bigint;
}

/**
 * 房间团购正在开奖
 */
export interface RoomGroupBuyingLotteryOpening {
  /**
   * 房间ID
   */
  roomId: bigint;
}

/**
 * 房间团购中奖
 */
export interface RoomGroupBuyingWinning {
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
 * 房间团购竞拍还价所有人
 */
export interface RoomGroupBuyingBiddingCounteroffer {
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
 * 房间团购竞拍成交
 */
export interface RoomGroupBuyingBiddingDeal {
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
 * 用户团购竞拍买家发起报价(私人)
 */
export interface RoomGroupBuyingBiddingBuyerInitiatesOffer {
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
 * 用户团购竞拍卖家收到报价(私人)
 */
export interface RoomGroupBuyingBiddingSellerReceivesOffer {
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
 * 用户团购竞拍买家收到还价(私人)
 */
export interface RoomGroupBuyingBiddingSellerCounteroffer {
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
 * 用户团购竞拍买家报价被拒(私人)
 */
export interface RoomGroupBuyingBiddingBuyerOfferRejected {
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
