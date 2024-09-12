"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = demo;
const socket_1 = require("./socket");
const url = "ws://47.57.236.213:8849/ws";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzaG9wIiwiZXhwIjoxNzMwMTA2NDQ1LCJpYXQiOjE3MjIzMzA0NDUsImp0aSI6IjVkMTMwYTkyZGQ0MzE3ZTFiYWE2NTQ5YjNmNzU0NDgzIn0.QdOiSOjNxMv1sP7MzivqcbNi3bh0AtpU2Y0AGyqauNc";
class MsgCallback {
    OnBiddingStart(client, param, message, response) {
        console.log("竞拍开始");
    }
    OnUserSellerAcceptedOffer(client, param, message, response) {
        console.log("用户竞拍接受卖家还价(私人)");
    }
    OnUserSellerRejectedOffer(client, param, message, response) {
        console.log("用户竞拍卖家还价被拒(私人)");
    }
    OnUserBiddingAcceptedOffer(client, param, message, response) {
        console.log("用户竞拍接受卖家出价(私人)");
    }
    OnRoom(client, param, message) {
        // const content = message.content;
        // console.log(`房间详情: 在线人数(${content.onlinePeople}), 时间(${new Date()})`);
    }
    OnGroupBuying(client, param, message) {
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
    OnGroupBuyingVote(client, param, message) {
        const content = message.content;
        console.log(`房间团购投票: 团购ID(${content.groupBuyingId}), 用户ID(${content.userId}), 投票时间(${content.voteTime}), 投票数(${content.tickets})`);
    }
    OnGroupBuyingNextProduct(client, param, message) {
        const content = message.content;
        if (content.beginTime == BigInt(0)) {
            console.log(`房间团购下一轮商品: 团购ID(${content.groupBuyingId}), 商品ID(${content.productId}), SKUID(${content.skuId})`);
        }
        else {
            console.log(`房间团购下一轮商品: 开始时间(${content.beginTime})`);
        }
    }
    OnGroupBuyingStart(client, param, message) {
        console.log("房间团购开始");
    }
    OnGroupBuyingLotteryOpening(client, param, message) {
        console.log("房间团购开奖中");
    }
    OnGroupBuyingWinning(client, param, message) {
        const content = message.content;
        console.log(`房间团购用户中奖: 用户ID(${content.winnerUserId}), 奖品可领奖时间(${content.prizeCollectionTime}), 竞拍ID(${content.auctionId})`);
    }
    OnBiddingAllCounteroffer(client, param, message) {
        console.log("房间团购竞拍还价所有人");
    }
    OnBiddingDeal(client, param, message) {
        console.log("房间团购竞拍成交");
    }
    OnUserBiddingInitiateOffer(client, param, message) {
        console.log("房间团购竞拍买家发起报价");
    }
    OnUserBiddingReceivesOffer(client, param, message) {
        console.log("房间团购竞拍买家收到报价");
    }
    OnUserBiddingReceivesCounteroffer(client, param, message) {
        console.log("房间团购竞拍买家收到还价");
    }
    OnUserBiddingRejectedOffer(client, param, message) {
        console.log("房间团购竞拍买家报价被拒");
    }
    // ============================================================ //
    // 小鸡游戏
    // ============================================================ //
    OnUserChickenGameBuyChicken(client, message, response) {
        console.log("小鸡游戏 : 购买小鸡");
    }
    OnUserChickenGameIncreaseLife(client, message, response) {
        console.log("小鸡游戏 : 延长小鸡时长");
    }
    OnUserChickenGameBuyFeed(client, message, response) {
        console.log("小鸡游戏 : 购买饲料");
    }
    OnUserChickenGameImpendingDeath(client, message, response) {
        console.log("小鸡游戏 : 小鸡即将死亡");
    }
    OnUserChickenGameChickenDeath(client, message, response) {
        console.log("小鸡游戏 : 小鸡死亡");
    }
    OnUserChickenGameChickenEnterHeaven(client, message, response) {
        console.log("小鸡游戏 : 小鸡死透了");
    }
    OnUserChickenGameBlobsExchange(client, message, response) {
        console.log("小鸡游戏 : Blobs兑换");
    }
    // ============================================================ //
    // 用户订单消息
    // ============================================================ //
    OnUserOrderPaymented(client, message, response) {
        console.log("用户订单 : 支付成功");
    }
    OnUserOrderShipped(client, message, response) {
        console.log("用户订单 : 已发货");
    }
    OnUserOrderCompleted(client, message, response) {
        console.log("用户订单 : 已完成");
    }
    OnUserOrderAftersalesApproved(client, message, response) {
        console.log("用户订单 : 申请售后已通过");
    }
    OnUserOrderAftersalesRejected(client, message, response) {
        console.log("用户订单 : 申请售后被拒");
    }
    OnUserOrderAfterSalesRefund(client, message, response) {
        console.log("用户订单 : 售后退款");
    }
}
function main() {
    process.title = "WoohaSocketSDK";
    demo();
}
function demo() {
    // configSite("127.0.0.1:8849");
    const client = (0, socket_1.newClient)(new MsgCallback(), token, true, socket_1.Platform.WEB);
    client.start();
    client.enterRoom(BigInt(1));
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=main.js.map