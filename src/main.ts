import { newClient, EventHandle, Client, configSite, Platform, getMessageHistory } from "./socket";
import {
  RoomParam,
  Message,
  GroupBuying,
  GroupBuyingVote,
  GroupBuyingNextProduct,
  GroupBuyingStart,
  GroupBuyingLotteryOpening,
  GroupBuyingWinning,
  BiddingAllCounteroffer,
  BiddingDeal,
  UserBiddingInitiateOffer,
  UserBiddingReceivesOffer,
  UserBiddingReceivesCounteroffer,
  UserBiddingRejectedOffer,
  Room,
  BiddingStart,
  ResponseMessage,
  UserBiddingAcceptedOffer,
  UserSellerAcceptedOffer,
  UserSellerRejectedOffer,
  UserChickenGameBlobsExchange,
  UserChickenGameBuyChicken,
  UserChickenGameBuyFeed,
  UserChickenGameChickenDeath,
  UserChickenGameChickenEnterHeaven,
  UserChickenGameImpendingDeath,
  UserChickenGameIncreaseLife,
  UserOrderAfterSalesApproved,
  UserOrderAfterSalesRefund,
  UserOrderAfterSalesRejected,
  UserOrderCompleted,
  UserOrderPaymented,
  UserOrderShipped,
  UserBiddingAcceptedReOffer,
  UserBiddingReOffer,
  ChannelType
} from "./types";

/**
 * Jwt Token
 * 用户ID : 29324656
 */
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzaG9wIiwiZXhwIjoxNzMwMTA2NDQ1LCJpYXQiOjE3MjIzMzA0NDUsImp0aSI6IjVkMTMwYTkyZGQ0MzE3ZTFiYWE2NTQ5YjNmNzU0NDgzIn0.QdOiSOjNxMv1sP7MzivqcbNi3bh0AtpU2Y0AGyqauNc";

class MsgCallback implements EventHandle {
  OnBiddingStart(client: Client, param: RoomParam, message: Message<BiddingStart>, response: ResponseMessage): void {
    console.log("竞拍开始");
  }
  OnUserSellerAcceptedOffer(
    client: Client,
    param: RoomParam,
    message: Message<UserSellerAcceptedOffer>,
    response: ResponseMessage
  ): void {
    console.log("用户竞拍接受卖家还价(私人)");
  }
  OnUserSellerRejectedOffer(
    client: Client,
    param: RoomParam,
    message: Message<UserSellerRejectedOffer>,
    response: ResponseMessage
  ): void {
    console.log("用户竞拍卖家还价被拒(私人)");
  }
  OnUserBiddingAcceptedOffer(
    client: Client,
    param: RoomParam,
    message: Message<UserBiddingAcceptedOffer>,
    response: ResponseMessage
  ): void {
    console.log("用户竞拍接受卖家出价(私人)");
  }
  OnRoom(client: Client, param: RoomParam, message: Message<Room>): void {
    // const content = message.content;
    // console.log(`房间详情: 在线人数(${content.onlinePeople}), 时间(${new Date()})`);
  }
  OnGroupBuying(client: Client, param: RoomParam, message: Message<GroupBuying>): void {
    // const content = message.content;
    // console.log(
    //   `房间团购详情: 房间ID(${content.id}), 团购ID(${
    //     content.groupBuyingId
    //   }), 最大可投票数(${content.maxVoteTickets}), 用户最大可投票数(${
    //     content.userMaxVoteTickets
    //   }), 当前已投票数(${content.currentVoteTickets}), 投票进度(${
    //     Number(content.voteProgress) / 100
    //   })`
    // );
  }
  OnGroupBuyingVote(client: Client, param: RoomParam, message: Message<GroupBuyingVote>): void {
    const content = message.content;
    console.log(
      `房间团购投票: 团购ID(${content.groupBuyingId}), 用户ID(${content.userId}), 投票时间(${content.voteTime}), 投票数(${content.tickets})`
    );
  }
  OnGroupBuyingNextProduct(client: Client, param: RoomParam, message: Message<GroupBuyingNextProduct>): void {
    const content = message.content;
    if (content.beginTime == BigInt(0)) {
      console.log(
        `房间团购下一轮商品: 团购ID(${content.groupBuyingId}), 商品ID(${content.productId}), SKUID(${content.skuId})`
      );
    } else {
      console.log(`房间团购下一轮商品: 开始时间(${content.beginTime})`);
    }
  }
  OnGroupBuyingStart(client: Client, param: RoomParam, message: Message<GroupBuyingStart>): void {
    console.log("房间团购开始");
  }
  OnGroupBuyingLotteryOpening(client: Client, param: RoomParam, message: Message<GroupBuyingLotteryOpening>): void {
    console.log("房间团购开奖中");
  }
  OnGroupBuyingWinning(client: Client, param: RoomParam, message: Message<GroupBuyingWinning>): void {
    const content = message.content;
    console.log(
      `房间团购用户中奖: 用户ID(${content.winnerUserId}), 奖品可领奖时间(${content.prizeCollectionTime}), 竞拍ID(${content.auctionId})`
    );
  }
  OnBiddingAllCounteroffer(client: Client, param: RoomParam, message: Message<BiddingAllCounteroffer>): void {
    console.log("房间团购竞拍还价所有人");
  }
  OnBiddingDeal(client: Client, param: RoomParam, message: Message<BiddingDeal>): void {
    console.log("房间团购竞拍成交");
  }
  OnUserBiddingInitiateOffer(client: Client, param: RoomParam, message: Message<UserBiddingInitiateOffer>): void {
    console.log("房间团购竞拍买家发起报价");
  }
  OnUserBiddingReceivesOffer(client: Client, param: RoomParam, message: Message<UserBiddingReceivesOffer>): void {
    console.log("房间团购竞拍买家收到报价");
  }
  OnUserBiddingReceivesCounteroffer(
    client: Client,
    param: RoomParam,
    message: Message<UserBiddingReceivesCounteroffer>
  ): void {
    console.log("房间团购竞拍买家收到还价");
  }
  OnUserBiddingRejectedOffer(client: Client, param: RoomParam, message: Message<UserBiddingRejectedOffer>): void {
    console.log("房间团购竞拍买家报价被拒");
  }

  OnUserBiddingReOffer(
    client: Client,
    param: RoomParam,
    message: Message<UserBiddingReOffer>,
    response: ResponseMessage
  ): void {
    console.log("买家再次出价(私人)");
  }
  OnUserBiddingAcceptedReOffer(
    client: Client,
    param: RoomParam,
    message: Message<UserBiddingAcceptedReOffer>,
    response: ResponseMessage
  ): void {
    console.log("买家再次出价被接受(私人)");
  }

  // ============================================================ //
  // 小鸡游戏
  // ============================================================ //

  OnUserChickenGameBuyChicken(
    client: Client,
    message: Message<UserChickenGameBuyChicken>,
    response: ResponseMessage
  ): void {
    console.log("小鸡游戏 : 购买小鸡");
  }
  OnUserChickenGameIncreaseLife(
    client: Client,
    message: Message<UserChickenGameIncreaseLife>,
    response: ResponseMessage
  ): void {
    console.log("小鸡游戏 : 延长小鸡时长");
  }
  OnUserChickenGameBuyFeed(client: Client, message: Message<UserChickenGameBuyFeed>, response: ResponseMessage): void {
    console.log("小鸡游戏 : 购买饲料");
  }
  OnUserChickenGameImpendingDeath(
    client: Client,
    message: Message<UserChickenGameImpendingDeath>,
    response: ResponseMessage
  ): void {
    console.log("小鸡游戏 : 小鸡即将死亡");
  }
  OnUserChickenGameChickenDeath(
    client: Client,
    message: Message<UserChickenGameChickenDeath>,
    response: ResponseMessage
  ): void {
    console.log("小鸡游戏 : 小鸡死亡");
  }
  OnUserChickenGameChickenEnterHeaven(
    client: Client,
    message: Message<UserChickenGameChickenEnterHeaven>,
    response: ResponseMessage
  ): void {
    console.log("小鸡游戏 : 小鸡死透了");
  }
  OnUserChickenGameBlobsExchange(
    client: Client,
    message: Message<UserChickenGameBlobsExchange>,
    response: ResponseMessage
  ): void {
    console.log("小鸡游戏 : Blobs兑换");
  }

  // ============================================================ //
  // 用户订单消息
  // ============================================================ //

  OnUserOrderPaymented(client: Client, message: Message<UserOrderPaymented>, response: ResponseMessage): void {
    console.log("用户订单 : 支付成功");
  }
  OnUserOrderShipped(client: Client, message: Message<UserOrderShipped>, response: ResponseMessage): void {
    console.log("用户订单 : 已发货");
  }
  OnUserOrderCompleted(client: Client, message: Message<UserOrderCompleted>, response: ResponseMessage): void {
    console.log("用户订单 : 已完成");
  }
  OnUserOrderAftersalesApproved(
    client: Client,
    message: Message<UserOrderAfterSalesApproved>,
    response: ResponseMessage
  ): void {
    console.log("用户订单 : 申请售后已通过");
  }
  OnUserOrderAftersalesRejected(
    client: Client,
    message: Message<UserOrderAfterSalesRejected>,
    response: ResponseMessage
  ): void {
    console.log("用户订单 : 申请售后被拒");
  }
  OnUserOrderAfterSalesRefund(
    client: Client,
    message: Message<UserOrderAfterSalesRefund>,
    response: ResponseMessage
  ): void {
    console.log("用户订单 : 售后退款");
  }
}

function main() {
  process.title = "WoohaSocketSDK";
  demo();
}

export function demo() {
  // configSite("127.0.0.1:8849");
  const client = newClient(new MsgCallback(), token, true, Platform.WEB);
  client.start();
  // client.enterRoom(BigInt(1));
  client.subscribeUserChickenGame(BigInt(0));
  client.subscribeUserOrder(BigInt(0));
}

function test_http() {
  configSite("127.0.0.1:8849");
  getMessageHistory(token, ChannelType.ROOM_MSG, BigInt(1300), { roomId: 1 })
    .then((res) => {
      console.info(res);
    })
    .catch((err) => {
      console.error(err);
    });
}

if (require.main === module) {
  // main();
  test_http();
}
