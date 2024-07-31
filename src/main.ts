import { newClient, EventHandle, Client } from "./index";
import {
  RoomBasicRequestParam,
  Message,
  RoomGroupBuyingDetail,
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
    param: RoomBasicRequestParam,
    message: Message<RoomGroupBuyingDetail>
  ): void {
    console.log("房间详情事件");
  }
  OnRoomGroupBuyingVote(
    client: Client,
    param: RoomBasicRequestParam,
    message: Message<RoomGroupBuyingVote>
  ): void {
    console.log("房间团购投票事件");
  }
  OnRoomGroupBuyingNextProduct(
    client: Client,
    param: RoomBasicRequestParam,
    message: Message<RoomGroupBuyingNextProduct>
  ): void {
    console.log("房间团购下一轮商品事件");
  }
  OnRoomGroupBuyingStart(
    client: Client,
    param: RoomBasicRequestParam,
    message: Message<RoomGroupBuyingStart>
  ): void {
    console.log("房间团购开始事件");
  }
  OnRoomGroupBuyingLotteryOpening(
    client: Client,
    param: RoomBasicRequestParam,
    message: Message<RoomGroupBuyingLotteryOpening>
  ): void {
    console.log("房间团购开奖中事件");
  }
  OnRoomGroupBuyingWinning(
    client: Client,
    param: RoomBasicRequestParam,
    message: Message<RoomGroupBuyingWinning>
  ): void {
    console.log("房间团购用户中奖事件");
  }
  OnRoomGroupBuyingBiddingCounteroffer(
    client: Client,
    param: RoomBasicRequestParam,
    message: Message<RoomGroupBuyingBiddingCounteroffer>
  ): void {
    console.log("房间团购竞拍还价所有人事件");
  }
  OnRoomGroupBuyingBiddingDeal(
    client: Client,
    param: RoomBasicRequestParam,
    message: Message<RoomGroupBuyingBiddingDeal>
  ): void {
    console.log("房间团购竞拍成交事件");
  }
  OnRoomGroupBuyingBiddingBuyerInitiatesOffer(
    client: Client,
    param: RoomBasicRequestParam,
    message: Message<RoomGroupBuyingBiddingBuyerInitiatesOffer>
  ): void {
    console.log("房间团购竞拍买家发起报价事件");
  }
  OnRoomGroupBuyingBiddingSellerReceivesOffer(
    client: Client,
    param: RoomBasicRequestParam,
    message: Message<RoomGroupBuyingBiddingSellerReceivesOffer>
  ): void {
    console.log("房间团购竞拍买家收到报价事件");
  }
  OnRoomGroupBuyingBiddingSellerCounteroffer(
    client: Client,
    param: RoomBasicRequestParam,
    message: Message<RoomGroupBuyingBiddingSellerCounteroffer>
  ): void {
    console.log("房间团购竞拍买家收到还价事件");
  }
  OnRoomGroupBuyingBiddingBuyerOfferRejected(
    client: Client,
    param: RoomBasicRequestParam,
    message: Message<RoomGroupBuyingBiddingBuyerOfferRejected>
  ): void {
    console.log("房间团购竞拍买家报价被拒事件");
  }
}

function main() {
  const client = newClient(new MsgCallback(), url, token);
  client.start();
  client.enterRoom("1");
}

if (require.main === module) {
  main();
}
