// ============================================================ //
// Websocket协议
// ============================================================ //

/// 通道类型
export enum ChannelType {
  /// 房间详情消息
  RoomDetail = "RoomDetail",
  /// 房间活动消息
  RoomActivity = "RoomActivity",
  /// 房间投票消息
  RoomVote = "RoomVote",
  /// 房间用户活动消息
  RoomUserActivity = "RoomUserActivity"
}

/// 请求消息
export interface RequestMessage<P = any> {
  /// 通道类型
  channel: ChannelType;
  /// 请求版本
  version: string;
  /// 请求序号
  seq: string;
  /// 请求时间戳
  ts: number;
  /// 请求唯一ID
  uid: string;
  /// 请求参数
  params: P;
}

/// 响应消息
export interface ResponseMessage<P = any, D = any> {
  /// 通道类型
  channel: ChannelType;
  /// 请求版本
  version: string;
  /// 请求序号
  seq: string;
  /// 请求时间戳
  ts: number;
  /// 请求唯一ID
  uid: string;
  /// 请求参数
  params: P;
  /// 响应序号
  rpsSeq: string;
  /// 响应时间戳
  rpsTs: number;
  /// 响应数据
  data: D[];
}

// ============================================================ //
// 消息协议
// ============================================================ //

/// 消息类型
export enum MessageType {
  /// 普通消息
  Normal = "Normal"
}

/// 业务类型
export enum ServiceType {
  /// 房间团购 详情
  RoomGroupBuyingDetail = "RoomGroupBuyingDetail",
  /// 房间团购 投票
  RoomGroupBuyingVote = "RoomGroupBuyingVote",
  /// 房间团购 下一个商品
  RoomGroupBuyingNextProduct = "RoomGroupBuyingNextProduct",
  /// 房间团购 开始
  RoomGroupBuyingStart = "RoomGroupBuyingStart",
  /// 房间团购 正在开奖
  RoomGroupBuyingLotteryOpening = "RoomGroupBuyingLotteryOpening",
  /// 房间团购 中奖
  RoomGroupBuyingWinning = "RoomGroupBuyingWinning",
  /// 房间团购 竞拍还价所有人
  RoomGroupBuyingBiddingCounteroffer = "RoomGroupBuyingBiddingCounteroffer",
  /// 房间团购 竞拍成交
  RoomGroupBuyingBiddingDeal = "RoomGroupBuyingBiddingDeal",
  /// 房间团购 竞拍买家发起报价(私人)
  RoomGroupBuyingBiddingBuyerInitiatesOffer = "RoomGroupBuyingBiddingBuyerInitiatesOffer",
  /// 房间团购 竞拍卖家收到报价(私人)
  RoomGroupBuyingBiddingSellerReceivesOffer = "RoomGroupBuyingBiddingSellerReceivesOffer",
  /// 房间团购 竞拍买家收到还价(私人)
  RoomGroupBuyingBiddingSellerCounteroffer = "RoomGroupBuyingBiddingSellerCounteroffer",
  /// 房间团购 竞拍买家报价被拒(私人)
  RoomGroupBuyingBiddingBuyerOfferRejected = "RoomGroupBuyingBiddingBuyerOfferRejected"
}

/// 消息
export interface Message<D = any> {
  /// 消息ID
  messageId: string;
  /// 消息类型
  messageType: MessageType;
  /// 业务类型
  serviceType: ServiceType;
  /// 消息内容
  content: D;
}

// ============================================================ //
// 房间团购
// ============================================================ //

/// 房间请求参数
export interface RoomBasicRequestParam {
  /// 房间ID
  roomId: string;
}

/// 房间团购 详情
export interface RoomGroupBuyingDetail {
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

/// 房间团购 投票
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

/// 房间团购 下一个商品
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

/// 房间团购 开始
export interface RoomGroupBuyingStart {}

/// 房间团购 正在开奖
export interface RoomGroupBuyingLotteryOpening {}

/// 房间团购 中奖
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

/// 房间团购 竞拍还价所有人
export interface RoomGroupBuyingBiddingCounteroffer {
  /// 竞拍ID
  auctionId: string;
  /// 还价金额
  amount: number;
}

/// 房间团购 竞拍成交
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

/// 房间团购 竞拍买家发起报价(私人)
export interface RoomGroupBuyingBiddingBuyerInitiatesOffer {
  /// 竞拍ID
  auctionId: string;
  /// 出价用户ID
  userId: string;
  /// 金额
  amount: number;
}

/// 房间团购 竞拍卖家收到报价(私人)
export interface RoomGroupBuyingBiddingSellerReceivesOffer {
  /// 竞拍ID
  auctionId: string;
  /// 出价用户ID
  userId: string;
  /// 金额
  amount: number;
}

/// 房间团购 竞拍买家收到还价(私人)
export interface RoomGroupBuyingBiddingSellerCounteroffer {
  /// 竞拍ID
  auctionId: string;
  /// 金额
  amount: number;
}

/// 房间团购 竞拍买家报价被拒(私人)
export interface RoomGroupBuyingBiddingBuyerOfferRejected {
  /// 竞拍ID
  auctionId: string;
  /// 出价用户ID
  userId: string;
  /// 金额
  amount: number;
}
