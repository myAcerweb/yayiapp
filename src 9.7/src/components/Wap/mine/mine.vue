<template>
  <div class="mine">
    <div v-if="alreadyLog">
      <!--上部开始-->
      <div class="header">
        <img src="../../../images/mine/topBackGround.png" alt="">
      </div>
      <div class="header_shade">
        <img src="../../../images/mine/topBackGround_2.png" alt="">
      </div>
      <div class="top_backGround">
        <div class="top_backGround_shade">
          <div class="top_circle">
            <img class="top_circleImg" src="../../../images/mine/topCircle.png" alt="">
            <!--头像的box-->
            <div class="headPortraitsBox">
              <img :src="userPic" alt="img">
            </div>
          </div>
        </div>
      </div>
      <!--上部结束-->
      <!--用户名开始-->
      <div class="userName">
      <span class="userName_user">用户名:
        <span>{{phone}}</span>
      </span>
        <span class="userName_money">乾币余额:
        <span>{{qbBalance}}</span>
      </span>
      </div>
      <!--用户名结束-->
      <!--我的订单开始-->
      <div class="myOrder" @click="goOrders('all')">
        <span>我的订单</span>
        <span class="myOrder_back">
        <img src="../../../images/mine/back.png" alt="">
      </span>
      </div>
      <!--我的订单结束-->
      <!--上部功能区开始-->
      <ul class="mine_function">
        <li @click="goOrders('payment')">
          <img src="../../../images/mine/payment.png" alt="">
          <div>待付款</div>
        </li>
        <li></li>
        <li @click="goOrders('delivery')">
          <img src="../../../images/mine/sport.png" alt="">
          <div>待发货</div>
        </li>
        <li></li>
        <li @click="goOrders('received')">
          <img src="../../../images/mine/waitSports.png" alt="">
          <div>待收货</div>
        </li>
        <li></li>
        <li @click="goOrders('evaluate')">
          <img src="../../../images/mine/comment.png" alt="">
          <div>待评价</div>
        </li>
      </ul>
      <!--上部功能区结束-->
      <!--下部功能区开始-->
      <ul class="mine_function_bottom">
        <li @click="toMyCoin">
          <img src="../../../images/mine/money.png" alt="">
          <div>我的乾币</div>
        </li>
        <li @click="goToCollect">
          <img src="../../../images/mine/collect.png" alt="">
          <div>我的收藏</div>
        </li>
        <li @click="goToAddress">
          <img src="../../../images/mine/adress.png" alt="">
          <div>我的地址</div>
        </li>
        <li @click="goToMine">
          <img src="../../../images/mine/personal.png" alt="">
          <div>个人资料</div>
        </li>
        <li @click="goToCustomer">
          <img src="../../../images/mine/bind.png" alt="">
          <div>指定客服代表</div>
        </li>
      </ul>
      <!--下部功能区结束-->
      <!--退出按钮开始-->
      <div class="esc_background">
        <mu-raised-button class="esc" label="退出"  v-on:click="logOut"/>
      </div>
      <!--退出按钮结束-->
    </div>
    <div class="noLog" @click="toLog" v-else>请先登录</div>
    <!--末尾-->
  </div>
</template>

<script>
  import {tokenMethods} from '../../../vuex/util'
  import {Toast} from 'mint-ui'

  export default {
    name: 'mine',
    data() {
      return {
        qbBalance: '',
        phone: '',
        userPic: '',
        alreadyLog: true,
      }
    },
    components: {},
    created: function () {
      var that = this
      that.$emit('listenToChildEvent','mine')
      if (!tokenMethods.getWapToken()) {
        that.alreadyLog = false
      }
      that.init()
    },
    methods: {
      goToAddress: function () {
        this.$router.push({path: '/address'});
      },
      goToCollect: function () {
        this.$router.push({path: '/collect'});
      },
      goToMine: function () {
        this.$router.push({path: '/personalData'})
      },
      goToCustomer: function(){
        this.$router.push({path: '/customerService'})
      },
      //todo 跳转到订单路由方法
      goOrders(type) {
        let go = this.$router.push.bind(this.$router)
        switch (type) {
          case 'all' :
            go({name: 'allOrders'})
            break
          case 'delivery' :
            go({name: 'deliveryOrders'})
            break
          case 'evaluate':
            go({name: 'evaluateOrders'})
            break
          case 'payment':
            go({name: 'paymentOrders'})
            break
          case 'received':
            go({name: 'receivedOrders'})
            break
          default:
            break
        }
      },
      //获取个人信息
      init: function () {
        var that = this
        var obj = {
          phone: tokenMethods.getWapUser().phone,
          token: tokenMethods.getWapToken()
        }
        //查询个人信息
        that.$store.dispatch('GET_PERSON_LIST', obj).then((res) => {
          console.log(res.data.qbBalance)
          if (res.callStatus === 'SUCCEED') {
            that.qbBalance = res.data.qbBalance
            that.phone = res.data.phone
            if (res.data.userPic === null) {
              that.userPic = '';
            } else {
              that.userPic = res.data.userPic
            }
          }
        })
      },
      toMyCoin(){
        this.$router.push({path: '/myCoin'})
      },
      // 登出
      logOut: function () {
        var that = this;
        var obj = {
          token: tokenMethods.getWapToken()
        }
        that.$store.dispatch('GET_LOGIN_OUT', obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.$router.push({path: '/logIn'})
            tokenMethods.removeMsg()
            Toast({message: '退出成功！', duration: 3000})
          } else {
            that.$router.push({path: '/logIn'})
            tokenMethods.removeMsg()
            // Toast({message: '退出失败！', duration: 3000})
          }
        })
      },
      // 未登录时
      toLog: function () {
        var that = this
        that.$router.push({path: '/logIn'})
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .header {
    position: fixed;
    z-index: -2;
    width: 100vw;
    height: px2vw(369);
    top:0;
  }
  .header img{
    width: 100%;
    height: 120%;
  }

  .header_shade {
    position: fixed;
    top:0;
    z-index: -1;
    width: 100vw;
    height: px2vw(370);
  }
  .header_shade img{
    width: 100%;
    height: 200%;
  }

  .top_backGround_shade {
    position: relative;
    width: 100vw;
    height: px2vw(370);
  }

  .top_backGround {
    width: 100vw;
    background-size: 100vw px2vw(460);
    height: px2vw(369);
  }

  .top_circle {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: px2vw(109);
  }

  .top_circleImg {
    width: 100vw;
    height: px2vw(109);
  }

  .headPortraitsBox {
    position: absolute;
    top: px2vw(-73);
    left: 41.3vw;
    border-radius: 50%;
    width: 17.2vw;
    height: px2vw(130);
    overflow: hidden;
  }

  .headPortraitsBox img {
    width: px2vw(130);
    height: px2vw(130);
  }


  .userName {
    background-color: white;
    font-size: 3.48vw;
    height: px2vw(98);
    line-height: px2vw(98);
  }

  .userName_user {
    color: #999999;
    margin-left: 6.8vw;
  }

  .userName_user span {
    color: black;
  }

  .userName_money {
    font-size: 3.48vw;
    color: #999999;
    margin-left: 25vw;
  }

  .userName_money span {
    color: $themeColor;
  }

  .myOrder {
    background-color: white;
    border-top: px2vw(1) solid $borderColor;
    border-bottom: px2vw(1) solid $borderColour;
    padding: px2vw(30) 3.7vw px2vw(30) 6.8vw;
    font-size: 3.73333vw;
  }

  .myOrder_back {
    margin-left: 69.5vw;
  }

  .myOrder_back img {
    width: 2vw;
    height: px2vw(25);
  }

  .mine_function {
    background-color: white;
    font-size: 3.73333vw;
    padding: px2vw(30) 6.8vw;
    border-bottom: px2vw(20) solid #f4f4f4;
  }

  .mine_function:after {
    content: "";
    display: block;
    clear: both;
  }

  .mine_function img {
    width: px2vw(47);
    height: px2vw(47);
  }

  .mine_function li {
    float: left;
    text-align: center;
  }

  .mine_function li:nth-child(odd) {
    width: 11.4vw;
  }

  .mine_function li:nth-child(even) {
    border-left: px2vw(1) solid $borderColor;
    margin-left: 6.6vw;
    margin-right: 6.6vw;
    height: px2vw(45);
    margin-top: px2vw(21);
  }

  .mine_function_bottom {
    background-color: white;
    margin-bottom: px2vw(130);
    font-size: 3.73333vw;
    padding: px2vw(28) 4.6666667vw;
  }

  .mine_function_bottom:after {
    content: "";
    display: block;
    clear: both;
  }

  .mine_function_bottom li {
    text-align: center;
    float: left;
    width: 28.6vw;
  }

  .mine_function_bottom li img {
    width: px2vw(45);
    height: px2vw(42);
  }

  .mine_function_bottom li:nth-child(-n+3) {
    border-bottom: px2vw(1) solid $borderColor;
    padding-top: px2vw(14);
    padding-bottom: px2vw(41);
  }

  .mine_function_bottom li:nth-child(2) {
    border-right: px2vw(1) solid $borderColor;
    border-left: px2vw(1) solid $borderColor;
  }

  .mine_function_bottom li:nth-child(n+4) {
    padding-top: px2vw(41);
    padding-bottom: px2vw(14);
  }

  .mine_function_bottom li:nth-child(5) {
    border-right: px2vw(1) solid $borderColor;
    border-left: px2vw(1) solid $borderColor;
  }

  .esc {
    margin-left: px2vw(124);
    text-align: center;
    height: px2vw(100);
    font-size: 3.733333vw;
    line-height: normal;
    background-color: $themeColor;
    color: white;
    width: 66.8vw;
    box-shadow: 0 0 px2vw(25) $themeColor;
    margin-bottom: px2vw(150);
  }

  .noLog {
    z-index: 999;
    width: px2vw(200);
    height: px2vw(100);
    line-height: px2vw(100);
    border: 1px solid #dcdcdc;
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  .esc_background {
    background-color: white;
    height: 120px;
  }
</style>

