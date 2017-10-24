<template>
  <div class="orderDetail-container">
    <div class="order-header">
      <span class="icon-container" @click="goBack">
        <img class="back-icon"  src="../../../images/logIn/back.png" alt="img">
      </span>
      <span class="order-title">我的订单</span>
    </div>
    <div class="receiver-info">
      <p class="title">收货信息</p>
      <p class="receiver" v-if="order.receiver">
        <span class="receiver-item name">{{order.receiver.receiverName}}</span>
        <span class="receiver-item phone">{{order.receiver.phone}}</span>
        <span
          class="receiver-item address">{{receiverAddress}}</span>
      </p>
    </div>
    <div class="order-info">
      <p class="title">订单信息</p>
      <p class="order-item"><span class="item-title">订单编号：</span><span class="order-id">{{order.orderId}}</span></p>
      <p class="order-item"><span class="item-title">创建时间：</span>{{createDate}}</p>
    </div>
    <div class="order-product">
      <p class="order-state">{{order.orderStateText}}</p>
      <ul class="product-container">
        <li class="product-content" :key="index" v-for="(item,index) in order.orderitemList">
          <div class="product-image">
            <img :src="item.picPath" :alt="item.itemInfo.itemName" class="image" width="100%" height="100%">
          </div>
          <ul class="product-detail">
            <li class="product-detail-name">
              <p class="title">{{item.itemInfo.itemName}}</p>
              <p class="price">￥{{item.price}}</p>
            </li>
            <li class="product-detail-desc">
              <p class="desc">{{item.itemPropertyNamea}}{{item.itemPropertyNameb}}{{item.itemPropertyNamec}}</p>
              <p class="num">&times;{{item.num}}</p>
            </li>
          </ul>
        </li>

      </ul>
      <div class="qb-info">
        todo钱币
      </div>
      <p class="order-price">实际付款：￥<span class="price">{{order.totalFee}}</span>（含运费：￥<i class="primary">{{order.postFee}}</i>；乾币抵扣：<i
        class="primary">{{order.qbDed}}）</i></p>
    </div>
    <div class="payment-container">
      <div class="payment-info">
        <ul class="payment-list">
          <li class="payment-item"><span class="item-title">支付方式：</span>{{payType}}</li>
          <li class="payment-item"><span class="item-title">发票：</span>
            <mu-raised-button label="查看" backgroundColor="#3676b6" color="#fff" class="muse-button" primary
                              @click="showInvoice"/>
          </li>
          <li class="payment-item"><span class="item-title">产品注册证：</span>{{productRegister}}</li>
          <li class="payment-item message"><span class="item-title">订单留言：</span>{{order.buyerMessage || '无'}}</li>
        </ul>
      </div>
      <p class="qb-feedback"><span class="item-title">乾币赠送：</span>本单赠送乾币<i class="primary">{{order.giveQb}}</i>个</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {QUERY_ORDER_DEATILS, QUERY_ORDER_INVOICE} from '../../../vuex/types'
  import {Toast, Indicator, MessageBox} from 'mint-ui'

  export default {
    data() {
      return {
        invoice: {}
      }
    },
    computed: {
      order() {
        return this.$store.state.index.orderDetails
      },
      createDate() {
        let d = new Date(this.order.created),
          month = (d.getMonth() + 1).toString().padStart(2, '0'),
          date = d.getDate().toString().padStart(2, '0'),
          hours = d.getHours().toString().padStart(2, '0'),
          minutes = d.getMinutes().toString().padStart(2, '0'),
          seconds = d.getSeconds().toString().padStart(2, '0')
        return `${d.getFullYear()}-${month}-${date}\t${hours}:${minutes}:${seconds}`
      },
      receiverAddress() {
        let order = this.order
        return order.receiver.province + order.receiver.city + order.receiver.county + order.receiver.receiverDetail
      },
      payType() {
        //todo 支付订单
        if (!this.order.payType) {
          return '无'
        }
        let payTypeText = ''
        switch (this.order.payType) {
          case 0:
            payTypeText = '支付宝支付'
            break
          case 1:
            payTypeText = '微信支付'
            break
          case 2:
            payTypeText = '银联支付'
            break
          case 3:
            payTypeText = '乾币支付'
            break
          default:
            break
        }
        return payTypeText
      },
      productRegister() {
        return this.order.isRegister === 0 ? '不需要' : '需要'
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      showInvoice() {
        Indicator.open()
        this.$store.dispatch(QUERY_ORDER_INVOICE, {orderId: this.order.orderId})
          .then(res => {
            Indicator.close()
            if (res.data.callStatus === 'SUCCEED') {
              let invoice = res.data.data
              if (invoice) {
                //todo 发票详情
                this.invoice = {
                  invoiceState: (invoice.invoiceState === '1' ? '普通发票' : '增值税发票'),
                  invoiceStyle: (invoice.invoiceStyle === '1' ? '' : ''),
                }
              }
            }
          })
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .orderDetail-container {
    background-color: #f4f4f4;
    color: #333;
    font-size: px2vw(28);
    padding-bottom: px2vw(30);
    .order-header {
      position: fixed;
      top: 0;
      width: 100vw;
      height: px2vw(88);
      line-height: px2vw(88);
      padding-bottom: 10vw;
      color: #fff;
      background-color: #3676b6;
      border-bottom: px2vw(1) solid $borderColor;
      text-align: center;
      .icon-container {
        display: inline-block;
        height: px2vw(88);
        line-height: px2vw(88);
        width: px2vw(150);
        text-align: left;
        margin-left: 2vw;
        float: left;
        .back-icon {
          width: px2vw(18);
          height: px2vw(29);
        }
      }

      .order-title {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: px2vw(200);
        height: px2vw(88);
        line-height: px2vw(88);
        display: inline-block;
        text-align: center;
        font-size: px2vw(32);
      }
    }
    .receiver-info {
      box-sizing: border-box;
      padding-top: px2vw(103);
      padding-left: px2vw(18);
      padding-right: px2vw(18);
      height: px2vw(207);
      background-color: #fff;
      margin-bottom: px2vw(22);
      .title {
        font-size: px2vw(30);
        color: #999999;
        padding-bottom: px2vw(10);
      }
      .receiver {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .receiver-item {
          margin-right: px2vw(30);
        }
      }
    }
    .order-info {
      background-color: #fff;
      padding: px2vw(30) px2vw(18) px2vw(16);
      border-bottom: 1px solid $borderColor;
      .title {
        font-size: px2vw(30);
        color: #999999;
        padding-bottom: px2vw(10);
      }
      .order-item {
        line-height: px2vw(50);
        .item-title {
          color: #999999;
          width: auto;
        }
      }
    }
    .order-product {
      background-color: #fff;
      .order-state {
        padding: 0 px2vw(16);
        height: px2vw(76);
        line-height: px2vw(86);
      }
      .product-container {
        padding-bottom: px2vw(40);
        border-bottom: 1px solid $borderColor;
        .product-content {
          background-color: #f4f4f4;
          display: flex;
          padding: px2vw(18) px2vw(38);
          @at-root .product-image {
            flex: none;
            width: px2vw(150);
            .image {
              border: 1px solid $borderColor;
            }
          }
          @at-root .product-detail {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding-left: px2vw(36);
            .product-detail-name {
              flex: 1;
              display: flex;
              font-size: px2vw(28);
              .title {
                flex: none;
                width: px2vw(410);
                color: #333;
              }
              .price {
                flex: 1;
                text-align: right;
                color: #d81e06;
              }
            }

            .product-detail-desc {
              flex: none;
              height: px2vw(30);
              display: flex;
              font-size: px2vw(24);
              color: #999999;
              .desc {
                flex: 1;
              }
              .num {
                flex: none;
              }
            }
          }
        }
      }
      .qb-info {
        height: px2vw(100);
        border-bottom: 1px solid $borderColor;
      }
      .order-price {
        text-align: right;
        font-size: px2vw(26);
        height: px2vw(84);
        line-height: px2vw(84);
        margin-bottom: px2vw(20);
        .price {
          color: #d81e06;
        }
      }
    }
    .payment-info {
      background-color: #fff;
      margin-bottom: px2vw(20);
      .payment-item {
        padding: px2vw(40) px2vw(16) 0;
        &.message {
          padding-bottom: px2vw(40);
        }
      }
    }
    .qb-feedback {
      background-color: #fff;
      padding: 0 px2vw(16);
      height: px2vw(88);
      line-height: px2vw(88);
      margin-bottom: px2vw(0);
    }
    .item-title {
      display: inline-block;
      width: px2vw(200);
      color: #999;
    }
    .primary {
      font-style: normal;
      color: #3676b6;
      font-size: px2vw(29);
    }
    .muse-button {
      height: px2vw(50);
      font-size: px2vw(28);
      border-radius: px2vw(10);
      margin-left: px2vw(-10);
    }
  }
</style>
