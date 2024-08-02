"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = demo;
const socket_1 = require("./socket");
const url = "ws://47.57.236.213:8849/ws";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzaG9wIiwiZXhwIjoxNzMwMTA2NDQ1LCJpYXQiOjE3MjIzMzA0NDUsImp0aSI6IjVkMTMwYTkyZGQ0MzE3ZTFiYWE2NTQ5YjNmNzU0NDgzIn0.QdOiSOjNxMv1sP7MzivqcbNi3bh0AtpU2Y0AGyqauNc";
class MsgCallback {
    OnRoomDetail(client, param, message) {
        const content = message.content;
        console.log(`房间详情: 在线人数(${content.onlinePeople})`);
    }
    OnRoomGroupBuying(client, param, message) {
        const content = message.content;
        console.log(`房间团购详情: 房间ID(${content.id}), 团购ID(${content.groupBuyingId}), 最大可投票数(${content.maxVoteTickets}), 用户最大可投票数(${content.userMaxVoteTickets}), 当前已投票数(${content.currentVoteTickets}), 投票进度(${content.voteProgress / 100})`);
    }
    OnRoomGroupBuyingVote(client, param, message) {
        const content = message.content;
        console.log(`房间团购投票: 团购ID(${content.groupBuyingId}), 用户ID(${content.userId}), 投票时间(${content.voteTime}), 投票数(${content.tickets})`);
    }
    OnRoomGroupBuyingNextProduct(client, param, message) {
        const content = message.content;
        if (content.beginTime === "0001-01-01T00:00:00Z") {
            console.log(`房间团购下一轮商品: 团购ID(${content.groupBuyingId}), 商品ID(${content.productId}), SKUID(${content.skuId})`);
        }
        else {
            console.log(`房间团购下一轮商品: 开始时间(${content.beginTime})`);
        }
    }
    OnRoomGroupBuyingStart(client, param, message) {
        console.log("房间团购开始");
    }
    OnRoomGroupBuyingLotteryOpening(client, param, message) {
        console.log("房间团购开奖中");
    }
    OnRoomGroupBuyingWinning(client, param, message) {
        const content = message.content;
        console.log(`房间团购用户中奖: 用户ID(${content.winnerUserId}), 奖品可领奖时间(${content.prizeCollectionTime}), 竞拍ID(${content.auctionId})`);
    }
    OnRoomGroupBuyingBiddingCounteroffer(client, param, message) {
        console.log("房间团购竞拍还价所有人");
    }
    OnRoomGroupBuyingBiddingDeal(client, param, message) {
        console.log("房间团购竞拍成交");
    }
    OnRoomGroupBuyingBiddingBuyerInitiatesOffer(client, param, message) {
        console.log("房间团购竞拍买家发起报价");
    }
    OnRoomGroupBuyingBiddingSellerReceivesOffer(client, param, message) {
        console.log("房间团购竞拍买家收到报价");
    }
    OnRoomGroupBuyingBiddingSellerCounteroffer(client, param, message) {
        console.log("房间团购竞拍买家收到还价");
    }
    OnRoomGroupBuyingBiddingBuyerOfferRejected(client, param, message) {
        console.log("房间团购竞拍买家报价被拒");
    }
}
function main() {
    demo();
}
function demo() {
    const client = (0, socket_1.newClient)(new MsgCallback(), url, token, false);
    client.start();
    client.enterRoom("1");
}
if (require.main === module) {
    main();
}
