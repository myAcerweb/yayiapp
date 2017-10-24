<template>
  <div class="logistics-container">
    <div class="logistics-header">
      <span class="icon-container" @click="goBack">
        <img class="back-icon" src="../../../images/logIn/back.png" alt="img">
      </span>
      <span class="logistics-title">我的订单</span>
    </div>
    <div class="order-info">
      <div class="image">
        <img :src="order.orderitemList[0].picPath" alt="" width="100%" height="100%">
      </div>
      <div class="logistics-info">
        <p class="logistics-company"><span class="title">物流公司：</span>{{EBusinessID}}</p>
        <p class="logistics-id"><span class="title">快递单号：</span>{{EBusinessCompany}}</p>
      </div>
    </div>
    <div class="logistics-timeline">
      <time-line v-for="(item,index) in logistics.Traces" :key="index">
        <span slot="time">{{item.AcceptTime}}</span>
        <span slot="dec">{{item.AcceptStation}}</span>
      </time-line>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import timeLine from './timeLine'
  import {QUERY_ORDER_LOG} from '@vuex/types'


  export default {
    data() {
      return {
        logistics: {},
      }
    },
    components: {
      timeLine
    },
    computed: {
      order() {
        return this.$store.state.index.orderDetails
      },
      EBusinessID() {
        return this.logistics.EBusinessID
      },
      EBusinessCompany() {
        let eBusinessCompany = ''
        switch (this.logistics.ShipperCode) {
          case 'STO':
            eBusinessCompany = '申通'
            break
          case 'SF':
            eBusinessCompany = '顺丰'
            break
          default:
            break
        }
        return eBusinessCompany
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      }
    },
    created() {
//      let logistics = '{ "EBusinessID": "1292696", "ShipperCode": "STO", "Success": true, "LogisticCode": "888779011001", "State": "3", "Traces": [ { "AcceptTime": "2017-08-26 20:24:46", "AcceptStation": "【收件】【上海金闸北公司】的【金曲刘必龙 手机(18117280286)】已收件,扫描员是【7号称重台】" }, { "AcceptTime": "2017-08-26 20:27:40", "AcceptStation": "【装袋】快件在【上海金闸北公司】进行装包发往扫描，发往【上海中转部】" }, { "AcceptTime": "2017-08-26 21:56:59", "AcceptStation": "【到件】快件到达【上海梅陇公司】,上一站是【】,扫描员是【王超】" }, { "AcceptTime": "2017-08-26 21:57:31", "AcceptStation": "【发件】快件在【上海中转部】由【杨孝云】扫描发往【上海闵行公司】" }, { "AcceptTime": "2017-08-27 08:06:18", "AcceptStation": "【派件】【上海梅陇公司】的【熊李岩 手机(13641638072)】正在派件,扫描员是【刘桂秀】" }, { "AcceptTime": "2017-08-27 12:35:24", "AcceptStation": "【签收】已签收,签收人是:【已签收】" } ]}'
      console.log(this.order.orderId)
      this.$store.dispatch(QUERY_ORDER_LOG, {orderId: this.order.orderId})
        .then(res => {
          if (res.callStatus === 'SUCCEED') {
            this.logistics = JSON.parse(res.data)
          }
        })
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .logistics-container {
    background-color: #f4f4f4;
    .logistics-header {
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
      .logistics-title {
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
    .order-info {
      display: flex;
      padding: px2vw(103) px2vw(20) px2vw(30);
      background-color: #fff;
      margin-bottom: px2vw(20);
      .image {
        width: px2vw(120);
        height: px2vw(120);
        margin-right: px2vw(20);
        border: 1px solid $borderColor;
        flex: none;
      }
      .logistics-info {
        flex: 1;
        .logistics-company {
          margin-bottom: px2vw(26);
        }
      }
    }
    .logistics-timeline {
      background-color: #fff;

    }
  }
</style>
