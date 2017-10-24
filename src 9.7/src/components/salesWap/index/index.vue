<template>
  <div class="salesIndex">
    <salesHeader headerText="创客系统"></salesHeader>
    <div class="content">
      <ul class="content_title">
        <li>历年累计收入:¥ 000</li>
        <li>创客收益标准?</li>
      </ul>
      <ul class="content_main">
        <li>
          <checkedDate></checkedDate>
        </li>
        <li>
          <h3>实际销售总额</h3>
          <span>¥ {{orderData.saleAllMoney}}</span>
        </li>
        <li>
          <h3>耗材类</h3>
          <span>¥ {{orderData.haocaiAllMoney}}</span>
        </li>
        <li>
          <h3>工具设备类</h3>
          <span>¥ {{orderData.gongjuAllMoney}}</span>
        </li>
      </ul>
    </div>
    <salesFooter bottomNav="achievement"></salesFooter>
    <img v-show="orderPic" class="sales_index" src="../../../images/salesWap/index/myOrder.png" alt="">


  </div>
</template>

<script type="text/ecmascript-6">
    import salesHeader from '../salesHeader.vue'
    import salesFooter from '../salesFooter.vue'
    import checkedDate from './checkedDate.vue'
    import {GET_SALES_MY_ORDER} from '@vuex/types'
    export default {
      data(){
        return{
          orderData:'',
          orderPic:false
        }
      },
      components:{
        salesHeader,
        salesFooter,
        checkedDate
      },
      computed:{
        checkDate(){
          return this.$store.state.index.checkedDate
        }
      },
      watch:{
        checkDate(val){
          this.$store.dispatch('sale/'+GET_SALES_MY_ORDER,val)
            .then(res=>{
              console.log(res);
              this.orderData=res.data;
              if(res.data.saleAllMoney===0){
                this.orderPic=true;
              }else{
                this.orderPic=false;
              }
            })
            .catch(err=>{
              console.log(err);
            })
        }
      },
      created(){
        console.log(this.checkDate);
        this.$store.dispatch('sale/'+GET_SALES_MY_ORDER,{year:'2017',month:'8'})
          .then(res=>{
            console.log(res);
            this.orderData=res.data;
          })
          .catch(err=>{
            console.log(err);
          })
      }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .salesIndex .mu-dropDown-menu-text{
    width: 100%;
  }
  .salesIndex .mu-dropDown-menu-line{
    background: none;
  }
  .salesIndex{
    background: #e5e5e5;
    min-height: px2vw(1334);
  }
  .content{
    height: px2vw(210);
    width: 100%;
    background: white;
    margin-top: px2vw(10);
  }
  .content_title{
    width: 100%;
    height: px2vw(80);
    overflow: hidden;
    border-bottom: px2vw(1) solid #f4f4f4;
    padding: 0 px2vw(20);
    margin-top:px2vw(80) ;
  }
  .content_title>li:nth-child(1){
    float: left;
    color: red;
    height: 100%;
    line-height: px2vw(80);
  }
  .content_title>li:nth-child(2){
    float: right;
    color:#317bbd;
    height: 100%;
    line-height: px2vw(80);
  }
  .content_main{
    width: 100%;
    height: px2vw(120);
    margin: px2vw(7) 0;
  }
  .content_main>li{
    width: 25%;
    float: left;
    height: 100%;
    border-right: px2vw(2) solid #ddd;
    text-align: center;
    line-height: px2vw(60);
    font-size: px2vw(26);
  }
  .content_main>li:last-child{
    border-right: none;
  }
  .content_main>li>h3{
    height: 50%;
    line-height: px2vw(60);
    font-size: px2vw(26);
  }
  .content_main>li>span{
    display: block;
    height: 50%;
    line-height: px2vw(60);
    font-size: px2vw(26);
    font-weight: bold;
  }
  .sales_index{
    width:px2vw(188);
    position: fixed;
    left: px2vw(286);
    bottom: px2vw(550);
  }
</style>
