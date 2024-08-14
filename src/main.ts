import { newClient, EventHandle, Client, configSite } from "./socket";
import {
  RoomParam,
  Message,
  GroupBuying,
  GroupBuyingVote,
  GroupBuyingNextProduct,
  GroupBuyingStart,
  GroupBuyingWinning,
  GroupBuyingWinning,
  BiddingAllCounteroffer,
  BiddingDeal,
  UserBiddingInitiateOffer,
  UserBiddingReceivesOffer,
  UserBiddingReceivesCounteroffer,
  UserBiddingRejectedOffer,
  Room
} from "./types";

const url = "ws://47.57.236.213:8849/ws";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzaG9wIiwiZXhwIjoxNzMwMTA2NDQ1LCJpYXQiOjE3MjIzMzA0NDUsImp0aSI6IjVkMTMwYTkyZGQ0MzE3ZTFiYWE2NTQ5YjNmNzU0NDgzIn0.QdOiSOjNxMv1sP7MzivqcbNi3bh0AtpU2Y0AGyqauNc";

class MsgCallback implements EventHandle {
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
  OnGroupBuyingLotteryOpening(client: Client, param: RoomParam, message: Message<GroupBuyingWinning>): void {
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
}

function main() {
  process.title = "WoohaSocketSDK";
  demo();
}

export function demo() {
  // configSite("127.0.0.1:8849");
  const client = newClient(new MsgCallback(), token, true);
  client.start();
  client.enterRoom(BigInt(1));
}

if (require.main === module) {
  main();
}
