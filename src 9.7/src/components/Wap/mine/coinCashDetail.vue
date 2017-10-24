<template>
  <div class="coinCashDetail">
    <!--头部-->
    <div class="header_top">
      <img @click="back" class="header_img"  src="../../../images/mine/coinBack.png" alt="">
      <div class="header">
        乾币提现
      </div>
    </div>
    <ul class="detail_ul1">
      <li @click="cashBoole(true)" class="detail_ul1_li">
        <img v-if="cash" class="li_img1" src="../../../images/mine/cashDetail_img2.png" alt="">
        <img v-else class="li_img11" src="../../../images/mine/cashDetail_img1.png" alt="">
        <span class="li_text" :class="{active_li:cash}">不提现</span>
      </li>
      <li @click="cashBoole(false)" class="detail_ul1_li">
        <img v-if="cash" class="li_img1" src="../../../images/mine/cashDetail_img1.png" alt="">
        <img v-else class="li_img11" src="../../../images/mine/cashDetail_img2.png" alt="">
        <span class="li_text" :class="{active_li:!cash}">提现</span>
      </li>
    </ul>
    <div v-show="!cash" class="writeNum">
      <input type="text"><span>最多可提现200个乾币</span>
    </div>
    <div class="save_btn">
      <mu-raised-button label="确定" class="pay" />
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
    export default {
      data(){
        return{
          cash:false,//是否提现
        }
      },
      methods:{
        back(){
          this.$router.go(-1);
        },
        cashBoole(boole){
          this.cash=boole;
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
  .detail_ul1{
    background-color: #e5e5e5;
    width: 100%;
    height: auto;
    overflow: hidden;
  }
  .detail_ul1_li{
    width: 100%;
    height: px2vw(100);background: white;
    margin-top: px2vw(2);
  }
  .detail_ul1_li>.active_li{
    color: #3676b6;
  }
  .li_img1{
    float: left;
    width: px2vw(31);
    margin-top: px2vw(35);
    margin-left: px2vw(21);
  }
  .li_img11{
    float: left;
    width: px2vw(31);
    margin-top: px2vw(35);
    margin-left: px2vw(21);
  }
  .li_text{
    float: left;
    /*width: 84px;*/
    height: px2vw(40);
    font-family: PingFangSC;
    font-size: px2vw(28);
    font-weight: 300;
    text-align: left;
    color: #333333;
    margin-top: px2vw(30);
    margin-left: px2vw(20);
  }
  .writeNum{
    overflow: hidden;
    width: 100%;
    height: px2vw(90);
  }
    .writeNum>input{
      border: px2vw(1) solid #dcdcdc;
      width: px2vw(350);
      height: px2vw(90);
      float: left;
      margin-left: px2vw(72);
      font-size: px2vw(32);
    }
    .writeNum>span{
      float: right;
      width: px2vw(275);
      height: px2vw(40);
      font-family: PingFangSC;
      font-size: px2vw(28);
      font-weight: 300;
      text-align: left;
      color: #d81e06;
      margin-right: px2vw(34);
      margin-top: px2vw(25);
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
