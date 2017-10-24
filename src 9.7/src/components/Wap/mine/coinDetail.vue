<template>
  <div>
    <!--选择钱币类型开始-->
    <ul class="coinDetail_box">
      <li>
        <span>选择乾币类型</span>
        <span class="coinClass">(&nbsp;注:&nbsp;&nbsp;1乾币=1元购买力&nbsp;)</span>
      </li>
      <!--1枚起购-->
      <li @click="select_1" :class="{'selectCoin': selectCoinShow == 1}">
      <img class="coinMoney2_img" src="../../../images/mine/coinMoney2.png" alt="img">
      <span>1枚起购&nbsp;&nbsp;(&nbsp;1枚乾币售价:&nbsp;0.95元&nbsp;)</span>
      <img v-show="selectCoinShow == 1" class="yes_img" src="../../../images/mine/yes.png" alt="">
      </li>
      <!--3000枚起购-->
      <li @click="select_3000" :class="{'selectCoin': selectCoinShow == 3000}">
        <img class="coinMoney2_img" src="../../../images/mine/coinMoney2.png" alt="img">
        <span>3000枚起购&nbsp;&nbsp;(&nbsp;1枚乾币售价:&nbsp;0.9元&nbsp;)</span>
        <img v-show="selectCoinShow == 3000" class="yes_img" src="../../../images/mine/yes.png" alt="">
      </li>
      <!--12000枚起购-->
      <li  @click="select_12000" :class="{'selectCoin': selectCoinShow == 12000}">
        <img class="coinMoney2_img" src="../../../images/mine/coinMoney2.png" alt="img">
        <span>12000枚起购&nbsp;&nbsp;(&nbsp;1枚乾币售价:&nbsp;0.8元&nbsp;)</span>
        <img v-show="selectCoinShow == 12000" class="yes_img" src="../../../images/mine/yes.png" alt="">
      </li>
    </ul>
    <!--选择钱币类型结束-->
    <!--充值个数开始-->
    <div class="payCoins">
      <span>充值的乾币数</span>
      <input  v-model="moneyCoins" type="tel" placeholder="请输入本次充值乾币个数">
    </div>
    <div class="payCoins">
      <span>实际支付金额</span>
      <span class="payCoins_color">{{allprice}}</span>
    </div>
    <!--充值个数结束-->
    <!--支付方式开始-->
    <div class="payWay">
      <div class="payWay_font">
        支付方式
      </div>
      <div @click="zfb_pay" class="payZFB">
        <img class="zfb_img" src="../../../images/mine/zhifubao.png" alt="">
        <span>支付宝</span>
        <img v-show="payShow" class="yesBlue" src="../../../images/mine/yesBlue.png" alt="">
      </div>
      <div @click="wx_pay" class="payZFB">
        <img class="wx_img" src="../../../images/mine/weixin.png" alt="">
        <span>微信支付</span>
        <img v-show="!payShow" class="yesBlue" src="../../../images/mine/yesBlue.png" alt="">
      </div>
    </div>
    <!--支付方式结束-->
    <!--立即支付开始-->
    <mu-raised-button label="立即支付" class="pay" @click="pay"/>
    <!--立即支付结束-->
    <!--末尾-->
  </div>
</template>

<script>
  import {tokenMethods} from '../../../vuex/util'
  import {Toast} from 'mint-ui'
  export default {
    data(){
      return{
        moneyCoins: '',
        selectCoinShow : 1,
        payShow: true,
        amount : '',
        qbType : 'c_qb'
      }
    },
    computed:{
      allprice(){
        let reg = /^([1-9]\d{0,9}|0)$/;
        if(reg.test(this.moneyCoins))
        {
          if(this.selectCoinShow == 1)
          {
            this.amount = 0.95 * this.moneyCoins;
            return this.amount.toFixed(2)
          }
          else if(this.selectCoinShow == 3000)
          {
            this.amount = 0.9 * this.moneyCoins;
            return this.amount.toFixed(2)
          }
          else if(this.selectCoinShow == 12000)
          {
            this.amount = 0.8 * this.moneyCoins;
            return this.amount.toFixed(2)
          }
        }else {
          this.amount = 0;
          return this.amount
        }

      }
    },
    methods:{
      pay(){
        //判断总价钱是否为0
        if(this.amount == 0) {
          alert("请输入正确的充值的数量")
        } else {
          //支付宝支付
          if(this.payShow == true) {
            //查询个人信息
            // plus.nativeUI.showWaiting()
            // let obj = {
            //   token: tokenMethods.getWapToken(),
            //   money: this.moneyCoins,
            //   qbType: this.qbType,
            //   computerOrPhone: 'phone'
            // };
            // this.$store.dispatch('PAY_ZFB_COIN', obj).then((res) => {
            //   console.log(res)
            //   plus.nativeUI.closeWaiting();
            //   if (res) {
            //       plus.payment.request(aliChannel, res.request.response, function(result) {
            //           console.log(JSON.stringify(result));
            //           plus.nativeUI.alert(JSON.stringify(result), title);
            //           plus.nativeUI.alert("充值成功", title);
            //       }, function(e) {
            //           console.log(JSON.stringify(e));
            //           alert(JSON.stringify(e));
            //           plus.nativeUI.alert("充值失败", title);
            //       });
            //   } else {
            //       plus.nativeUI.alert("支付失败");
            //   }
            //   // console.log(res,'opopo');
            //   // window.location.href = res.request.responseURL
            // })

            mui.post("http://47.93.48.111:6181/api/appPay/appPay", {
              // token: tokenMethods.getWapToken(),
              // money: this.moneyCoins,
              // qbType: this.qbType,
              // computerOrPhone: 'phone'
            }, function(data) {
              console.log(JSON.stringify(data),'data')
              plus.nativeUI.closeWaiting();
              if (data.callStatus == 'SUCCEED') {
                  plus.payment.request(aliChannel, data.data, function(result) {
                      console.log(JSON.stringify(result));
                      plus.nativeUI.alert(JSON.stringify(result), title);
                      plus.nativeUI.alert("充值成功", title);
                  }, function(e) {
                      console.log(JSON.stringify(e));
                      alert(JSON.stringify(e));
                      plus.nativeUI.alert("充值失败", title);
                  });
              } else {
                  plus.nativeUI.alert("支付失败");
              }
            });

            // 手机网站端
            // let obj = {
            //   token: tokenMethods.getWapToken(),
            //   money: this.moneyCoins,
            //   qbType: this.qbType,
            //   computerOrPhone: 'phone'
            // };
            // this.$store.dispatch('PAY_ZFB_COIN', obj).then((res) => {
            //   console.log(res,'opopo');
            //   window.location.href = res.request.responseURL
            // })
          } else {
            // 微信充值乾币app端
            mui.post("http://47.93.48.111:6181/api/appPay/unifiedOrderCharge", {
              token: tokenMethods.getWapToken(),
              money: this.moneyCoins,
              qbType: this.qbType,
            }, function(data) {
              console.log(data,'data')
              var obj = {
                appid: data.data.appId,
                noncestr: data.data.nonceStr,
                package: 'Sign=WXPay',
                partnerid: data.data.partnerid,
                prepayid: data.data.prepayid,
                timestamp: data.data.timestamp,
                sign: data.data.signature,
              }
              var dataPay = JSON.stringify(obj)
              console.log(dataPay)
              //var dataPay = JSON.stringify(data.data)
              plus.nativeUI.closeWaiting();
              if (data.callStatus == 'SUCCEED') {
                  plus.payment.request(wxChannel, dataPay, function(result) {
                      console.log(JSON.stringify(result));
                      plus.nativeUI.alert(JSON.stringify(result), title);
                      plus.nativeUI.alert("充值成功", title);
                  }, function(e) {
                      console.log(JSON.stringify(e));
                      alert(JSON.stringify(e));
                      plus.nativeUI.alert("充值失败", title);
                  });
              } else {
                  plus.nativeUI.alert("支付失败");
              }
            });
            // let obj = {
            //   token: tokenMethods.getWapToken(),
            //   money: this.moneyCoins,
            //   qbType: this.qbType,
            // };
            // this.$store.dispatch('PAY_WX_COIN', obj).then((res) => {
            //   console.log(res,'opopo');
            //   // window.location.href = res.request.responseURL
            // })
            // // let chargeId = that.global.uuid()
            // let money = parseInt(that.payMuch)
            // let token = that.global.getToken()
            // // console.log(chargeId,'sds')
            // that.WxTableVisible = true
            // that.wxImg = 'http://47.93.48.111:8080/api/weixin/unifiedOrderCharge' + '?money=' + money + '&token=' + token
            // that.kk = 1
            // var timer = setInterval(function(){
            //   if (that.kk == 600) {
            //     clearInterval(timer)
            //     return false
            //   }
            //   var obj = {
            //     token: that.global.getToken()
            //   }
            //   that.global.axiosGetReq('/weixin/checkChargeState',obj).then((res) => {
            //     if (res.data.num == 2) {
            //       clearInterval(timer)
            //       that.WxTableVisible = false
            //       that.$alert('恭喜您，充值成功', {
            //         confirmButtonText: '确定',
            //         callback: action => {
            //           that.$router.go(0)
            //         }
            //       });
            //       // that.$alert("恭喜您，充值成功！", {confirmButtonText: '确定'});
            //       // that.$message('恭喜您，充值成功！')
            //     } else {
            //       that.kk++
            //       // that.$message.error('网络出错，请稍后再试！');
            //     }
            //   })
            // },3000);
          }
        }
      },
      wx_pay(){
        this.payShow = false
      },
      zfb_pay(){
        this.payShow = true
      },
      select_1(){
        this.selectCoinShow = 1;
        this.qbType = 'c_qb';
      },
      select_3000(){
        this.selectCoinShow = 3000;
        this.qbType = 'b_qb'
      },
      select_12000(){
        this.selectCoinShow = 12000;
        this.qbType = 'a_qb'
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .coinDetail_box {
    font-size: 3.73333vw;
    width: 100vw;
    padding: 0 2.8vw;
    border-bottom: px2vw(20) solid #f4f4f4;
  }
  .coinDetail_box li{
    padding: px2vw(30) 0;
  }
  .coinDetail_box li:nth-child(1){
    background-color: white;
  }
  .coinDetail_box li:last-child{
    margin-bottom: px2vw(28);
  }
  .coinClass {
    color: #d81e06;
    font-size: 4vw;
  }

  .coinDetail_box li:nth-child(n+2){
    background-color: #f7f7f9;
  }
  .coinDetail_box li:nth-child(3){
    border-bottom: px2vw(1) solid $borderColor;
    border-top: px2vw(1) solid $borderColor;
  }
  .coinMoney2_img {
    margin-left: 2.78vw;
    vertical-align: middle;
    width: px2vw(37);
    height: px2vw(37);
  }

  .yes_img {
    float: right;
    width: px2vw(26);
    height: px2vw(21);
    margin-top: px2vw(14);
    margin-right: 2.7vw;
  }
  .selectCoin{
    background-color:#eeeeee !important;
  }

  .payCoins {
    font-size: 4.2666667vw;
    padding: px2vw(30) px2vw(20);
    border-bottom: px2vw(20) solid #f7f7f9;
  }
  .payCoins input{
    width: 42vw;
    padding-top: px2vw(7);
    float: right;
    border: none;
    font-size: 3.7333333vw;
    outline: none;
    text-align: right;
  }

  .payCoins_color {
    float: right;
    color: red;
  }

  .payWay {
    border-bottom: px2vw(20) solid #f7f7f9;
    margin-bottom: px2vw(90);
  }
  .payWay_font {
    font-size: 4.266667vw;
    padding: px2vw(30) px2vw(20) 0 px2vw(20);
  }

  .payZFB {
    padding: px2vw(30) px2vw(20);
  }
  .payZFB{
    font-size: 3.73333vw;
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

  .pay {
    display: block;
    font-size: 4.233333vw;
    width: 100vw;
    height: px2vw(90);
    position: fixed;
    bottom: 0;
    padding: px2vw(21) 0;
    background-color: $themeColor;
    text-align: center;
    color: white;
  }

  .yesBlue {
    float: right;
    margin-top: px2vw(15);
    width: px2vw(26);
    height: px2vw(21);
  }
</style>

