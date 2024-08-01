import { newClient, EventHandle, Client } from "./index";
import {
  RoomBasicParam,
  Message,
  RoomGroupBuying,
  RoomGroupBuyingVote,
  RoomGroupBuyingNextProduct,
  RoomGroupBuyingStart,
  RoomGroupBuyingLotteryOpening,
  RoomGroupBuyingWinning,
  RoomGroupBuyingBiddingCounteroffer,
  RoomGroupBuyingBiddingDeal,
  RoomGroupBuyingBiddingBuyerInitiatesOffer,
  RoomGroupBuyingBiddingSellerReceivesOffer,
  RoomGroupBuyingBiddingSellerCounteroffer,
  RoomGroupBuyingBiddingBuyerOfferRejected
} from "./types";

const url = "ws://47.57.236.213:8849/ws";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzaG9wIiwiZXhwIjoxNzMwMTA2NDQ1LCJpYXQiOjE3MjIzMzA0NDUsImp0aSI6IjVkMTMwYTkyZGQ0MzE3ZTFiYWE2NTQ5YjNmNzU0NDgzIn0.QdOiSOjNxMv1sP7MzivqcbNi3bh0AtpU2Y0AGyqauNc";

class MsgCallback implements EventHandle {
  OnRoomGroupBuyingDetail(
    client: Client,
    param: RoomBasicParam,
    message: Message<RoomGroupBuying>
  ): void {
    const content = message.content;

    console.log(
      `房间详情: 房间ID(${content.id}), 团购ID(${content.groupBuyingId}), 最大可投票数(${
        content.maxVoteTickets
      }), 用户最大可投票数(${content.userMaxVoteTickets}), 当前已投票数(${
        content.currentVoteTickets
      }), 投票进度(${content.voteProgress / 100})`
    );
  }
  OnRoomGroupBuyingVote(
    client: Client,
    param: RoomBasicParam,
    message: Message<RoomGroupBuyingVote>
  ): void {
    const content = message.content;
    console.log(
      `房间团购投票: 团购ID(${content.groupBuyingId}), 用户ID(${content.userId}), 投票时间(${content.voteTime}), 投票数(${content.tickets})`
    );
  }
  OnRoomGroupBuyingNextProduct(
    client: Client,
    param: RoomBasicParam,
    message: Message<RoomGroupBuyingNextProduct>
  ): void {
    const content = message.content;
    if (content.beginTime === "0001-01-01T00:00:00Z") {
      console.log(
        `房间团购下一轮商品: 团购ID(${content.groupBuyingId}), 商品ID(${content.productId}), SKUID(${content.skuId})`
      );
    } else {
      console.log(`房间团购下一轮商品: 开始时间(${content.beginTime})`);
    }
  }
  OnRoomGroupBuyingStart(
    client: Client,
    param: RoomBasicParam,
    message: Message<RoomGroupBuyingStart>
  ): void {
    console.log("房间团购开始");
  }
  OnRoomGroupBuyingLotteryOpening(
    client: Client,
    param: RoomBasicParam,
    message: Message<RoomGroupBuyingLotteryOpening>
  ): void {
    console.log("房间团购开奖中");
  }
  OnRoomGroupBuyingWinning(
    client: Client,
    param: RoomBasicParam,
    message: Message<RoomGroupBuyingWinning>
  ): void {
    const content = message.content;
    console.log(
      `房间团购用户中奖: 用户ID(${content.winnerUserId}), 奖品可领奖时间(${content.prizeCollectionTime}), 竞拍ID(${content.auctionId})`
    );
  }
  OnRoomGroupBuyingBiddingCounteroffer(
    client: Client,
    param: RoomBasicParam,
    message: Message<RoomGroupBuyingBiddingCounteroffer>
  ): void {
    console.log("房间团购竞拍还价所有人");
  }
  OnRoomGroupBuyingBiddingDeal(
    client: Client,
    param: RoomBasicParam,
    message: Message<RoomGroupBuyingBiddingDeal>
  ): void {
    console.log("房间团购竞拍成交");
  }
  OnRoomGroupBuyingBiddingBuyerInitiatesOffer(
    client: Client,
    param: RoomBasicParam,
    message: Message<RoomGroupBuyingBiddingBuyerInitiatesOffer>
  ): void {
    console.log("房间团购竞拍买家发起报价");
  }
  OnRoomGroupBuyingBiddingSellerReceivesOffer(
    client: Client,
    param: RoomBasicParam,
    message: Message<RoomGroupBuyingBiddingSellerReceivesOffer>
  ): void {
    console.log("房间团购竞拍买家收到报价");
  }
  OnRoomGroupBuyingBiddingSellerCounteroffer(
    client: Client,
    param: RoomBasicParam,
    message: Message<RoomGroupBuyingBiddingSellerCounteroffer>
  ): void {
    console.log("房间团购竞拍买家收到还价");
  }
  OnRoomGroupBuyingBiddingBuyerOfferRejected(
    client: Client,
    param: RoomBasicParam,
    message: Message<RoomGroupBuyingBiddingBuyerOfferRejected>
  ): void {
    console.log("房间团购竞拍买家报价被拒");
  }
}

function main() {
  const client = newClient(new MsgCallback(), url, token, false);
  client.start();
  client.enterRoom("1");
}

if (require.main === module) {
  main();
}
