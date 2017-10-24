<template>
  <div class="coinCash">
    <!--头部-->
    <div class="header_top">
      <img @click="back" class="header_img"  src="../../../images/mine/coinBack.png" alt="">
      <div class="header">
        乾币提现
      </div>
    </div>
    <!--主题内容部分-->
    <div>
      <h3 class="checkedNum">选择提现的乾币和个数</h3>
      <ul class="coin_ul1">
        <router-link tag="li" to="/coinCashDetail" class="coin_ul1_li">
          <i class="li_yuan"></i>
          <span class="li_coinNum">共200个</span>

            <img src="../../../images/mine/coin_img1.png" class="" alt="">
        <span class="li_coinCash">提现200个</span>


        </router-link>
        <li class="coin_ul1_li">
          <i class="li_yuan"></i>
          <span class="li_coinNum">共200个</span>
          <img src="../../../images/mine/coin_img1.png" class="" alt="">
          <span class="li_coinCash">提现200个</span>
        </li>
        <li class="coin_ul1_li">
          <i class="li_yuan"></i>
          <span class="li_coinNum">共200个</span>
          <img src="../../../images/mine/coin_img1.png" class="" alt="">
          <span class="li_coinCash">提现200个</span>
        </li>
        <li class="coin_ul1_li">
          <i class="li_yuan"></i>
          <span class="li_coinNum">共200个</span>
          <img src="../../../images/mine/coin_img1.png" class="" alt="">
          <span class="li_coinCash">提现200个</span>
        </li>

      </ul>
      <div class="coin_line"></div>
      <ul class="coin_ul2">
        <li class="coin_ul2_li">
          <span class="ul2_li_text">提现乾币总数</span>
          <span class="ul2_li_num">300</span>
        </li>
        <li class="coin_ul2_li">
          <span class="ul2_li_text">提现总额（元）</span>
          <span class="ul2_li_num">290</span>
        </li>
        <router-link tag="li" to="/cashSetting" class="coin_ul2_li">
          <span class="ul2_li_text">提现方式</span>
          <img src="../../../images/mine/coin_img1.png" class="" alt="">
          <span class="ul2_li_pay">请选择</span>
        </router-link>
      </ul>
      <div class="coin_line"></div>
      <div class="phone_num">
        <span class="phone_name">手机号</span>
        <input type="text" placeholder="请输入登录的手机号">
      </div>
      <div class="coin_line"></div>
      <div class="checked_code">
        <span class="checked_code_text">验证码</span>
        <input type="text" placeholder="请输入验证码">
        <span class="get_checked_code">获取验证码</span>
      </div>
      <div class="save_btn">
        <mu-raised-button label="保存" class="pay" />
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
      methods:{
        back(){
          this.$router.go(-1);
        }
      }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .header_top {
    height: px2vw(72);
    background-color: $themeColor;
  }
  .header_img {
    width: px2vw(19);
    height:  px2vw(31);
    margin-left: 2vw;
    margin-top: 3vw;
    float: left;
  }
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
  .checkedNum{
    width: 100%;
    height: px2vw(45);
    font-family: PingFangSC;
    font-size: px2vw(32);
    font-weight: 300;
    text-align: left;
    color: #333333;
    padding: 0 px2vw(23) 0 px2vw(17);
    margin: px2vw(20) 0;
  }
  .coin_ul1{
    width: px2vw(710);
    height: auto;
    background-color:  #e5e5e5;
    margin: 0 px2vw(23) px2vw(30) px2vw(17);
  }
  .coin_ul1_li{
    width: 100%;
    height: px2vw(100);
    overflow: hidden;
    background-color: #f7f7f9;
    margin-bottom: px2vw(2);
  }
  .coin_ul1_li>img{
    float: right;
    width: px2vw(15);
    height: px2vw(25);
    margin-top: px2vw(39.5);
    margin-right: px2vw(20);
  }
  .li_yuan{
    width: px2vw(64);
    height: px2vw(64);
    display: block;
    float: left;
    border: px2vw(2) solid black;
    border-radius: 100%;
    margin-top: px2vw(18);
    margin-left: px2vw(14);
  }

  .li_coinNum{
    float: left;
    /*width: px2vw(107);*/
    height: px2vw(40);
    line-height: px2vw(40);
    font-family: PingFangSC;
    font-size: px2vw(28);
    font-weight: 300;
    text-align: left;
    color: #333333;
    margin: px2vw(32) 0  0 px2vw(14);
  }
  .li_coinCash{
    float: right;
    /*width: px2vw(135);*/
    height: px2vw(40);
    line-height: px2vw(40);
    font-family: PingFangSC;
    font-size: px2vw(28);
    font-weight: 300;
    text-align: left;
    margin: px2vw(32) px2vw(19)  0 px2vw(14);
    color: #999999;
  }
  .coin_line{
    width: 100%;
    height: px2vw(27);
    background-color: #f4f4f4;
    /*margin-top: px2vw(30);*/
  }
  .coin_ul2{
    background-color: #e5e5e5;
    width: 100%;
    height: auto;
  }
  .coin_ul2_li{
    width: 100%;
    height: px2vw(100);
    background: white;
    overflow: hidden;
    margin-bottom: px2vw(2);
  }
  .ul2_li_text{
    float: left;
    margin-left: px2vw(22);
    margin-top: px2vw(30);
    /*width: px2vw(192);*/
    line-height: px2vw(45);
    font-family: PingFangSC;
    font-size: px2vw(32);
    font-weight: 300;
    text-align: left;
    color: #333333;
  }
  .ul2_li_num{
    float: right;
    /*width: px2vw(51);*/
    line-height: px2vw(40);
    font-family: PingFangSC;
    font-size: px2vw(28);
    font-weight: 300;
    text-align: left;
    color: #3676b6;
    margin-right: px2vw(20);
    margin-top: px2vw(30);
  }
  .ul2_li_pay{
    float: right;
    /*width: 318px;*/
    height: px2vw(40);
    font-family: PingFangSC;
    font-size: px2vw(28);
    font-weight: 300;
    text-align: left;
    color: #999999;
    margin-right: px2vw(20);
    margin-top: px2vw(30);
  }
  .phone_num{
    height: px2vw(100);
  }
  .phone_name{
    float: left;
    /*width: 96px;*/
    height: px2vw(45);
    font-family: PingFangSC;
    font-size: px2vw(32);
    font-weight: 300;
    text-align: left;
    color: #333333;
    margin-top: px2vw(27.5);
    margin-left: px2vw(22);
  }
  .phone_num>input{
    border: none;
    min-width: px2vw(252);
    height: px2vw(40);
    font-family: PingFangSC;
    font-size: px2vw(28);
    font-weight: 300;
    text-align: left;
    color: #999999;
    float: right;
    margin-right: px2vw(21);
    margin-top: px2vw(30);
  }
  .checked_code{
    width: 100%;
    height: px2vw(100);

  }
  .checked_code_text{
    float: left;
    /*width: 96px;*/
    height: px2vw(45);
    font-family: PingFangSC;
    font-size: px2vw(32);
    font-weight: 300;
    text-align: left;
    color: #333333;
    margin-top: px2vw(27.5);
    margin-left: px2vw(22);
  }
  .checked_code>input{
    float: left;
    border: none;
    height: px2vw(40);
    min-width: px2vw(168);
    font-family: PingFangSC;
    font-size: px2vw(28);
    font-weight: 300;
    text-align: left;
    color: #999999;
    margin-top: px2vw(30);
    margin-left: px2vw(38);
  }
  .get_checked_code{
    float: right;
    width: px2vw(153);
    line-height: px2vw(40);
    font-family: PingFangSC;
    font-size: px2vw(28);
    font-weight: 300;
    /*text-align: left;*/
    color: #ffffff;
    background-color: #3676b6;
    border-radius: px2vw(10);
    text-align: center;
    margin-right: px2vw(22);
    margin-top: px2vw(30);
  }
  .save_btn{
    width: 100%;
    height: px2vw(206);
    background-color: #f4f4f4;
    padding-top: px2vw(80);
  }
  .pay{
    display: block;
    font-size: 4.233333vw;
    width: px2vw(580);
    height: px2vw(90);
    /*position: fixed;*/
    /*bottom: 0;*/
    padding: px2vw(21) 0;
    background-color: $themeColor;
    text-align: center;
    color: white;
    margin: 0 auto ;
  }
  .coin_ul2_li>img{
    float: right;
    width: px2vw(15);
    height: px2vw(25);
    margin-top: px2vw(39.5);
    margin-right: px2vw(20);
  }
</style>
