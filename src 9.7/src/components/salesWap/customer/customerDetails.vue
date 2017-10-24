<template>
    <div>
      <div @click="goback" class="imgBackBoxs">
        <div class="customerImgBack">
        <img class="ImgBack" src="../../../images/salesWap/customer/back.png" alt="">
        </div>
        <sales-header headerText="我的客户"></sales-header>
      </div>

      <!--头像开始-->
      <div class="headSculptureBox">
        <div class="SculptureBox">
          <img class="headSculpture" src="../../../images/mine/topBackGround.png" alt="">
        </div>
        <div class="headName">令狐冲</div>
      </div>
      <!--头像结束-->

      <!--详细信息开始-->
      <ul class="detailBox">
        <li class="imgBoxCircle">
          <img class="imgCircleFirst" src="../../../images/salesWap/customer/circle.png" alt="">
          <img class="imgCircleSecond" src="../../../images/salesWap/customer/circle.png" alt="">
        </li>

        <li>
          联系方式:&nbsp;13122390809
        </li>
        <li>
          单位名称:&nbsp;<span class="hospitalName">北京博雅德康口腔医院</span>
        </li>
        <li>
          单位地址:&nbsp;<span class="hospitalName">北京市朝阳区朝阳北路112</span>
        </li>
        <li>
          绑定时间:&nbsp; 2017-08-19 15:00:00
        </li>
        <li>
          累计订单数:&nbsp;13122390809
        </li>
        <li>
          累计消费&nbsp;(元)&nbsp;:&nbsp;13122390809
        </li>
        <li>
          最近一次下单时间:&nbsp;2017-08-19 15:00:00
        </li>
      </ul>
      <!--详细信息结束-->

      <div class="shadowBox"></div>
      <sales-footer bottomNav="customer"></sales-footer>
    </div>
</template>

<script>
  import salesHeader from '../salesHeader.vue'
  import salesFooter from '../salesFooter.vue'
  export default {
    data (){
      return{

      }
    },
    methods:{
      goback(){
        this.$router.push({path:'/myCustomer'})
      }
    },
    components: {
      salesHeader,
      salesFooter
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../common/sass/factory";

    .imgBackBoxs {
      position: relative;
      width: 100vw;
    }
    .customerImgBack {
      height: px2vw(88);
      width: px2vw(75);
      float: left;
    }
    .ImgBack{
      position: absolute;
      top:px2vw(25);
      left: px2vw(19);
      width: px2vw(24);
      height: px2vw(40);
    }


    .salesHeader{
      position: static !important;
    }

    .headSculptureBox {
      border-bottom: px2vw(10) solid $borderColor;
      border-top: px2vw(10) solid $borderColor;
      width: 100vw;
      padding-top: px2vw(45);
      padding-bottom: px2vw(8);
      text-align: center;
      background-color: white;
    }

    .headSculpture {
      border-radius: 50%;
      border: px2vw(5) solid #ebebeb;
      width: px2vw(145);
      height: px2vw(145);
    }

    .headName {
      font-size: px2vw(36);
    }

    .detailBox {
      margin-top: 0!important;
      padding-bottom: px2vw(20);
      background-color: white;
      padding-left: px2vw(37);
      padding-right: px2vw(35);
      font-size: px2vw(30);
      box-shadow: 10px 10px 5px blue ;
      -webkit-box-shadow: 0 px2vw(8) px2vw(10) #acacac ;
    }
    .imgBoxCircle {
      height: px2vw(78);
    }
    .imgBoxCircle:after{
      content: '';
      display: block;
      clear: both;
    }
    .imgCircleFirst {
      margin-top: px2vw(27);
      margin-left: px2vw(22);
      float: left;
      width: px2vw(20);
      height: px2vw(20);
    }
    .imgCircleSecond {
      margin-top: px2vw(27);
      margin-right: px2vw(22);
      float: right;
      width: px2vw(20);
      height: px2vw(20);
    }
    .detailBox li:nth-child(n+2){
      margin-bottom: px2vw(24);
    }

    .shadowBox {
      position: fixed;
      top:0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: -2;
      background-color: #ebebeb;
    }

    .hospitalName {
      display: inline-block;
      width: px2vw(522);
      vertical-align: top;
    }
</style>

