<template>
  <div class="order-container">
    <div class="order-top-bar">
      <div class="order-header">
        <span class="icon-container" @click="goBack">
          <img class="back-icon"  src="../../../images/logIn/back.png" alt="img">
        </span>
        <span class="order-title">我的订单</span>
      </div>
      <ul class="order-list">
        <router-link to="/order/allOrders" class="order-item" tag="li" replace>全部</router-link>
        <router-link to="/order/paymentOrders" class="order-item" tag="li" replace>待付款</router-link>
        <router-link to="/order/deliveryOrders" class="order-item" tag="li" replace>待发货</router-link>
        <router-link to="/order/receivedOrders" class="order-item" tag="li" replace>待收货</router-link>
        <router-link to="/order/evaluateOrders" class="order-item" tag="li" replace>待评价</router-link>
      </ul>
    </div>

    <router-view></router-view>

  </div>
</template>

<script type="text/ecmascript-6">

  import {Toast, MessageBox} from 'mint-ui'


  export default {
    data() {
      return {
        transitionName: 'slide-left'
      }
    },
    methods: {
//      _init() {
//        let phone = tokenMethods.getWapUser() && tokenMethods.getWapUser().phone
//        if (!phone) MessageBox.alert('请先进行登录').then(() => {
//          this.$router.push({name: 'logIn'})
//        })
//        //并发请求
//        Promise.all([this.$store.dispatch(GET_ORDER_LIST, {
//          phone,
//          state: 1
//        }), this.$store.dispatch(GET_ORDER_LIST, {phone, state: 2})])
//          .then(res => {
//            //全部订单
//            let allOrders = []
//            res.forEach(item => {
//              allOrders = allOrders.concat(item.data.data)
//            })
//            this.$store.commit(SAVE_ORDERS_LIST, allOrders)
//          })
//          .catch(err => {
//            console.error(err)
//          })
//      },
      goBack() {
        this.$router.go(-1)
      }
    },
    created() {
//      this._init()
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  $order-text-light-color: #999;
  .order-container {
    color: #333333;
    min-height: 100vh;
    background-color: #f4f4f4;
    .order-top-bar {
      position: fixed;
      background-color: #fff;
      @at-root .order-header {
        width: 100vw;
        height: px2vw(88);
        line-height: px2vw(88);
        padding-bottom: 10vw;
        background-color: #3676b6;
        border-bottom: px2vw(1) solid $borderColor;
        text-align: center;
        .icon-container {
          width: px2vw(150);
          text-align: left;
          line-height: px2vw(88);
          height: px2vw(88);
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
          color: #fff;
        }
      }
      @at-root .order-list {
        display: flex;
        width: 100vw;
        height: px2vw(80);
        .order-item {
          flex: 1;
          text-align: center;
          line-height: px2vw(80);
          border-bottom: 1px solid $borderColor;
          font-size: px2vw(32);
          &.router-link-active {
            border-bottom-color: $themeColorHover;
            color: $themeColorHover;
          }
        }
      }
    }
  }

  /*.slide-left-enter-active {*/
  /*transition: all .3s ease;*/
  /*}*/
  /*.slide-left-leave-active {*/
  /*transition: all .3s ease;*/
  /*}*/
  /*.slide-left-enter, .slide-left-leave-to {*/
  /*transform: translateX(100vw);*/
  /*opacity: 0;*/
  /*}*/
</style>
