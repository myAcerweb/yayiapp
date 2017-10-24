<template>
  <div class="cashSetting">
    <!--头部-->
    <div class="header_top">
      <img @click="back" class="header_img"  src="../../../images/mine/coinBack.png" alt="">
      <div class="header">
        提现设置
      </div>
    </div>
    <ul class="setting_ul1">
      <li class="ul1_li2">
        <span class="li_text">类型</span>
        <img class="li1_img" src="../../../images/mine/coin_img1.png" alt="">
        <span class="li1_text">支付宝</span>
      </li>
      <li class="ul1_li2">
        <span class="li_text">开户者</span>
        <input class="li2_text" type="text" placeholder="请输入姓名">
        <!--<span class="li2_text">支付宝</span>-->
      </li>
      <li class="ul1_li2">
        <span class="li_text">银行</span>
        <input class="li2_text" type="text" placeholder="请输入银行">
        <!--<span class="li2_text">支付宝</span>-->
      </li>
      <li class="ul1_li2">
        <span class="li_text">类型</span>
        <input class="li2_text" type="text" placeholder="请输入账号">
        <!--<span class="li2_text">支付宝</span>-->
      </li>
    </ul>
    <div class="save_btn">
      <mu-raised-button label="保存" class="pay" />
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
  .setting_ul1{
    width: px2vw(713);
    margin: 0 auto;
    min-height: px2vw(10);
  }
    .setting_ul1>li{
      width: 100%;
      border-bottom: px2vw(2) solid #e5e5e5;
      height: px2vw(102);
    }
  .li_text{
    float: left;
    /*width: 56px;*/
    line-height: px2vw(40);
    font-family: PingFangSC;
    font-size: px2vw(28);
    font-weight: 300;
    text-align: left;
    color: #333333;
    margin-top: px2vw(30);
  }
  .li2_text{
    float: right;
    line-height: px2vw(40);
    font-family: PingFangSC;
    font-size: px2vw(28);
    font-weight: 300;
    text-align: left;
    color: #999999;
    margin-right: px2vw(33);
    margin-top: px2vw(30);
    border: none;
    text-align: right;
  }
  .li1_text{
    float: right;
    line-height: px2vw(40);
    font-family: PingFangSC;
    font-size: px2vw(28);
    font-weight: 300;
    text-align: left;
    color: #999999;
    margin-right: px2vw(17);
    margin-top: px2vw(30);
  }
  .li1_img{
    float: right;
    width: px2vw(16);
    height: px2vw(25);
    margin-top: px2vw(38);
  }
    .save_btn{
      width: 100%;
      height: px2vw(206);
      /*background-color: #f4f4f4;*/
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
</style>
