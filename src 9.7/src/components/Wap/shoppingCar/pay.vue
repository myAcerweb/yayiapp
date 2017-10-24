<template>
  <div class="pay">
    <div class="logIn_header">
      <div class="header_box" @click="back">
        <img class="header_back" src="../../../images/logIn/back.png" alt="img">
      </div>
      <span class="logWithCode">支付订单</span>
    </div>
    <div class="coinPaySuccess">
      <div>
        <img class="warningPay" src="../../../images/order/pay.png" alt="img">
      </div>
      <p class="pay_word">
        请在30分钟内支付，超时系统会自动关闭订单～
      </p>
      <div class="moneys">
        <div class="money_num">
          <div class="">
            <div class="circle">
              <img src="../../../images/mine/circleBlue.png" alt="img">
            </div>
            <span class="marginLeft">订单号&nbsp;:&nbsp;<span class="orderNum">12315645644489756464564564887789</span></span>
          </div>
          <div class="circle_top">
            <div class="circle_box">
              <div class="circle">
                <img src="../../../images/mine/circleBlue.png" alt="img">
              </div>
              <span class="marginLeft">您共需支付:&nbsp;</span>
              <span class="fontBlue"> ¥&nbsp;500.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--支付方式开始-->
    <div class="payWay">
      <div class="payWay_font">
        选择支付方式
      </div>
      <div @click="zfb_pay" class="payZFB">
        <img class="zfb_img" src="../../../images/mine/zhifubao.png" alt="">
        <span :class="{ active: isActive1 }">支付宝</span>
        <img v-show="payShow" class="yesBlue" src="../../../images/mine/yesBlue.png" alt="">
      </div>
      <div @click="wx_pay" class="payWX">
        <img class="wx_img" src="../../../images/mine/weixin.png" alt="">
        <span :class="{ active: isActive2 }">微信支付</span>
        <img v-show="!payShow" class="yesBlue" src="../../../images/mine/yesBlue.png" alt="">
      </div>
    </div>
    <!--支付方式结束-->
      <mu-raised-button label="确认支付" class="confirmPay" @click="confirmPay"/>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        orderId: '',
        payMoney: '',
        payShow: true,
        isActive1: true,
        isActive2: false,
      }
    },
    created () {
      var that = this
      var order = JSON.parse(window.sessionStorage.getItem('order'))
      // window.sessionStorage.removeItem('suborderData')
      that.orderId = order.OrderId
      that.payMoney = order.actualPay
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      wx_pay(){
        this.payShow = false
        this.isActive1 = false
        this.isActive2 = true
      },
      zfb_pay(){
        this.payShow = true
        this.isActive1 = true
        this.isActive2 = false
      },
      confirmPay() {
        var that = this
        //支付宝支付
        if(this.payShow == true) {

        }
        // 微信支付
        else {

        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
@import "../../../common/sass/factory";
.active {
  color: $themeColor;
}
.pay {
  width: 100vw;
  height: 100vh;
  background-color: #F4F4F4;
}
.logIn_header {
  width: 100vw;
  height: px2vw(88);
  line-height: px2vw(88);
  z-index: 999;
  padding-bottom: 10vw;
  border-bottom:  px2vw(1) solid $borderColor;
  text-align: center;
  background-color: $themeColor;
}
.header_box {
  width: px2vw(70);
  height: px2vw(73);
  float: left;
}
.header_back {
  width: px2vw(18);
  height: px2vw(29);
  margin-left: 2vw;
  margin-top: 4vw;
  float: left;
}
.logWithCode {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 80vw;
  height: px2vw(88);
  line-height: px2vw(88);
  display: inline-block;
  text-align: center;
  font-size: px2vw(32);
  color: #fff;
}
.coinPaySuccess {
  background-color: #fff;
  text-align: center;
}
.warningPay {
  width: px2vw(90);
  height: px2vw(90);
  margin-top: px2vw(60);
  margin-bottom: px2vw(20);
}
.pay_word {
  font-size: px2vw(32);
  color: #d81e06;
  margin-bottom: px2vw(30);
}
.moneys {
  padding-left:11.5vw;
  padding-right:11.5vw;
  padding-bottom:px2vw(30);
  // width: px2vw(595);
  // height: px2vw(177);
  // margin: 0 auto;
  // background-color: #eefafb;
}
.money_num {
  font-size: 3.7333336vw;
  position: relative;
  background-color: #eefafb;
  border: 1px solid #d1f1f4;
  text-align: left;
  padding: px2vw(34) px2vw(0) px2vw(37) px2vw(56);
}
.circle {
  margin-top: px2vw(-7);
  vertical-align: middle;
  display: inline-block;
  position: relative;
  width: px2vw(19);
  height: px2vw(19);
}
.circle img{
  position: absolute;
  top:px2vw(0);
  width: px2vw(19);
  height: px2vw(19);
}
.fontBlue {
  color: $themeColor;
}
.circle_top {
  margin-top: px2vw(36);
}
.marginLeft {
  margin-left: px2vw(20);
}
  .payWay {
    margin-top: px2vw(20);
    margin-bottom: px2vw(90);
    background-color: #fff;
  }
  .payWay_font {
    font-size: px2vw(28);
    padding: px2vw(30) px2vw(20) 0 px2vw(20);
  }
  .payZFB {
    padding: px2vw(30) px2vw(20);
    border-bottom: 1px solid #E5E5E5;
    font-size: px2vw(28);
  }
  .payWX{
    padding: px2vw(30) px2vw(20);
    font-size: px2vw(28);
  }
  .zfb_img {
    vertical-align: middle;
    width: px2vw(40);
    height: px2vw(40);
    margin-right: px2vw(26);
  }
  .wx_img {
    vertical-align: middle;
    width: px2vw(47);
    height: px2vw(40);
    margin-right: px2vw(19);
  }
  .yesBlue {
    float: right;
    margin-top: px2vw(15);
    width: px2vw(26);
    height: px2vw(21);
  }
  .confirmPay {
    width: px2vw(580);
    height: px2vw(90);
    background-color: $themeColor;
    color: #fff;
    display: block;
    margin: 0 auto;
  }

  .orderNum {
    display: inline-block;
    width: px2vw(350);
    word-wrap: break-word;
    vertical-align: top;
  }
</style>



