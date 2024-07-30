/// 通道类型
export enum ChannelType {
  /// 房间活动消息
  RoomActivity = "RoomActivity",
  /// 房间详情消息
  RoomDetail = "RoomDetail",
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
  rpsSeq: number;
  /// 响应时间戳
  rpsTs: number;
  /// 响应数据
  data: D;
}
