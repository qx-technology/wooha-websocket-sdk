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
  HEARTBEAT,
  /**
   * 房间详情
   */
  ROOM_DETAIL,
  /**
   * 房间团购详情
   */
  ROOM_GROUP_BUYING,
  /**
   * 房间消息
   */
  ROOM_MESSAGE,
  /**
   * 房间投票
   */
  ROOM_VOTE,
  /**
   * 房间用户消息
   */
  ROOM_USER_MESSAGE
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
   * 房间团购竞拍买家发起报价(私人)
   */
  ROOM_GROUP_BUYING_BIDDING_BUYER_INITIATES_OFFER,
  /**
   * 房间团购竞拍卖家收到报价(私人)
   */
  ROOM_GROUP_BUYING_BIDDING_SELLER_RECEIVES_OFFER,
  /**
   * 房间团购竞拍买家收到还价(私人)
   */
  ROOM_GROUP_BUYING_BIDDING_SELLER_COUNTEROFFER,
  /**
   * 房间团购竞拍买家报价被拒(私人)
   */
  ROOM_GROUP_BUYING_BIDDING_BUYER_OFFER_REJECTED
}

// ============================================================ //
// 协议
// ============================================================ //

/// 消息
export interface Message {
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
  content: Uint8Array;
}

/**
 * 请求消息
 */
export interface RequestMessage {
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
  ts: number;
  /**
   * 请求唯一ID
   */
  uid: string;
  /**
   * 请求参数
   */
  params: Uint8Array;
}

/**
 * 响应消息
 */
export interface ResponseMessage extends RequestMessage {
  /**
   * 响应序号
   */
  rpsSeq: bigint;
  /**
   * 响应时间戳
   */
  rpsTs: number;
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
   * 在线人数
   */
  onlinePeople: bigint;
}

/// 房间团购详情
export interface RoomGroupBuying {
  /// 房间ID
  id: string;
  /// 团购ID
  groupBuyingId: number;
  /// 最大可投票数
  maxVoteTickets: number;
  /// 用户最大可投票数
  userMaxVoteTickets: number;
  /// 当前已投票数
  currentVoteTickets: number;
  /// 投票进度
  voteProgress: number;
}

/// 房间团购投票
export interface RoomGroupBuyingVote {
  /// 团购ID
  groupBuyingId: number;
  /// 用户ID
  userId: string;
  /// 用户名
  username: string;
  /// 用户头像
  userAvatar: string;
  /// 用户头像框
  userAvatarFrame: string;
  /// 投票时间
  voteTime: string;
  /// 投票数
  tickets: number;
}

/// 房间团购下一个商品
export interface RoomGroupBuyingNextProduct {
  /// 团购ID
  groupBuyingId: string;
  /// 商品ID
  productId: string;
  /// 商品名
  productName: string;
  /// 商品图片
  productImage: string;
  /// SKUID
  skuId: string;
  /// 开始时间
  beginTime: string;
}

/// 房间团购开始
export interface RoomGroupBuyingStart {}

/// 房间团购正在开奖
export interface RoomGroupBuyingLotteryOpening {}

/// 房间团购中奖
export interface RoomGroupBuyingWinning {
  /// 中奖用户ID
  winnerUserId: string;
  /// 中奖用户名
  winnerUsername: string;
  /// 中奖用户头像
  winnerUserAvatar: string;
  /// 中奖用户头像框
  winnerUserAvatarFrame: string;
  /// 奖品可领奖时间
  prizeCollectionTime: string;
  /// 商品ID
  productId: string;
  /// 商品名
  productName: string;
  /// 商品图片
  productImage: string;
  /// SKUID
  skuId: string;
  /// 竞拍ID
  auctionId: string;
}

/// 房间团购竞拍还价所有人
export interface RoomGroupBuyingBiddingCounteroffer {
  /// 竞拍ID
  auctionId: string;
  /// 还价金额
  amount: number;
}

/// 房间团购竞拍成交
export interface RoomGroupBuyingBiddingDeal {
  /// 竞拍ID
  auctionId: string;
  /// 出价用户ID
  userId: string;
  /// 金额
  amount: number;
  /// 卖方用户id
  sellerUserId: string;
  /// 卖方用户名
  sellerUsername: string;
  /// 卖方用户头像
  sellerUserAvatar: string;
  /// 卖方用户头像框
  sellerUserAvatarFrame: string;
  /// 商品名称
  productName: string;
  /// 商品图片
  productImage: string;
}

/// 房间团购竞拍买家发起报价(私人)
export interface RoomGroupBuyingBiddingBuyerInitiatesOffer {
  /// 竞拍ID
  auctionId: string;
  /// 出价用户ID
  userId: string;
  /// 金额
  amount: number;
}

/// 房间团购竞拍卖家收到报价(私人)
export interface RoomGroupBuyingBiddingSellerReceivesOffer {
  /// 竞拍ID
  auctionId: string;
  /// 出价用户ID
  userId: string;
  /// 金额
  amount: number;
}

/// 房间团购竞拍买家收到还价(私人)
export interface RoomGroupBuyingBiddingSellerCounteroffer {
  /// 竞拍ID
  auctionId: string;
  /// 金额
  amount: number;
}

/// 房间团购竞拍买家报价被拒(私人)
export interface RoomGroupBuyingBiddingBuyerOfferRejected {
  /// 竞拍ID
  auctionId: string;
  /// 出价用户ID
  userId: string;
  /// 金额
  amount: number;
}
