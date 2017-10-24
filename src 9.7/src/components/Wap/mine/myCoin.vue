<template>
    <div>
      <div class="header_top">
        <img class="header_img" @click="toBack" src="../../../images/mine/coinBack.png" alt="">
        <div class="header">
          我的乾币
        </div>
      </div>
      <!--乾币余额开始-->
      <div class="header_coin">
        <ul class="coin_balanceBox">
          <li>
            <router-link tag="div" to="/coinCash">乾币余额</router-link>
            <div class="myMoneyCoin">{{qbBalance}}</div>
          </li>
          <li></li>
          <li>
            <div>
              <img src="../../../images/mine/coinMoney.png" alt="">
            </div>
            <div>
              300
            </div>
          </li>
          <li>
            <div>
              <img src="../../../images/mine/coinMoney.png" alt="">
            </div>
            <div>
              300
            </div>
          </li>
          <li>
            <div>
              <img src="../../../images/mine/coinMoney.png" alt="">
            </div>
            <div>
              300
            </div>
          </li>
          <li>
            <div>
              <img src="../../../images/mine/coinMoney.png" alt="">
            </div>
            <div>
              300
            </div>
          </li>
        </ul>
      </div>
      <!--乾币余额结束-->
      <!--钱币充值开始-->
      <div class="coinPay">
        <ul class="coinPay_box">
          <li @click="changeColor0" :class="{'backBlue':coinColor == 0}">乾币充值</li>
          <li @click="changeColor1" :class="{'backBlue':coinColor == 1}">乾币兑换</li>
          <li @click="changeColor2" :class="{'backBlue':coinColor == 2}">乾币明细</li>
        </ul>
      </div>
      <!--钱币充值结束-->
      <router-view></router-view>
      <!--末尾-->
    </div>
</template>

<script>
  import {tokenMethods} from '../../../vuex/util'
  export default {
    data(){
      return{
        qbBalance: '',
        coinColor: 0,
      }
    },
    created(){
      this.$router.push({path:'/coinDetail'})
      this.init();
    },
    methods:{
      //获取个人信息
      init: function () {
        var that = this
        var obj = {
          phone: tokenMethods.getWapUser().phone,
          token: tokenMethods.getWapToken()
        }
        //查询个人信息
        that.$store.dispatch('GET_PERSON_LIST', obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.qbBalance = res.data.data.qbBalance
            that.$store.state.index.qbBalance = res.data.data.qbBalance
          }
        })
      },
      toBack(){
        this.$router.push({path:"/yayi/mine"});
      },
      changeColor0(){
        this.coinColor = 0;
        this.$router.push({path:'/coinDetail'})
      },
      changeColor1(){
        this.coinColor = 1;
        this.$router.push({path:'/exchange'})
      },
      changeColor2(){
        this.coinColor = 2;
        this.$router.push({path:'/exchangeDetail'})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../common/sass/factory";
    .header{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 80vw;
      height: px2vw(73);
      line-height: px2vw(73);
      display: inline-block;
      text-align: center;
      font-size: 4.26667vw;
      color: white;
    }
    .header_img {
      width: px2vw(19);
      height:  px2vw(31);
      margin-left: 2vw;
      margin-top: 3vw;
      float: left;
    }
    .header_top {
      height: px2vw(72);
      background-color: $themeColor;
    }

    .header_coin {
      font-size: 3.73333vw;
      padding: px2vw(16) px2vw(20);
      background-color: $themeColor;
      width: 100vw;
      height: px2vw(124);
    }
    .header_coin:after{
      content: '';
      display: block;
      clear: both;
    }
    .coin_balanceBox li{
      text-align: center;
      color: white;
      float: left;
    }
    .coin_balanceBox li:nth-child(2){
      margin-left:3.7vw;
      margin-right:3.7vw;
    }
    .coin_balanceBox li:nth-child(n+4){
      margin-left:14.5vw;
    }
    .coin_balanceBox li:nth-child(2){
      border: px2vw(1) dashed white;
      height: px2vw(102);
    }
    .coin_balanceBox li img{
      width: px2vw(50);
      height: px2vw(50);
    }

    .myMoneyCoin {
      margin-top: px2vw(17);
    }
    .coinPay{
      width: 100vw;
      height: px2vw(134);
      padding:px2vw(20) 6vw px2vw(30) 6vw;
      font-size: px2vw(32);
      border-bottom: 1px solid $borderColor;
    }
    .coinPay:after{
      content: '';
      display: block;
      clear: both;
    }
    .coinPay_box{
      font-size:4.266667vw;
    }
    .coinPay_box li{
      text-align: center;
      float: left;
      border: 1px solid $borderColor;
    }
    .coinPay_box li:nth-child(1){
      border-top-left-radius: px2vw(10);
      border-bottom-left-radius: px2vw(10);
      border-right: none;
      // height: px2vw(70);
      // line-height: px2vw(70);
      padding: px2vw(20) 6vw px2vw(20) 5.2vw;
    }
    .coinPay_box li:nth-child(2){
      padding: px2vw(20) 6vw;
      border: 1px solid $borderColor;
    }
    .coinPay_box li:nth-child(3){
      border-top-right-radius: px2vw(10);
      border-bottom-right-radius: px2vw(10);
      border-left: none;
      padding: px2vw(20) 5.2vw px2vw(20) 6vw;
    }

    .backBlue {
      color: white;
      background-color: $themeColor;
    }
</style>

