<template>
  <div ref="wrap_father">
    <div class="imgBackBoxs">
      <img class="customerImgBack" src="../../../images/salesWap/customer/back.png" alt="">
      <sales-header headerText="我的客户"></sales-header>
    </div>

    <div class="myCustomerWrap">
      <!--搜索框开始-->
      <div class="searchBox">
        <div class="searchImgBox">
          <img class="searchImg" src="../../../images/salesWap/customer/search.png" alt="">
          <form class="fromInput">
            <input v-model="searchText" placeholder="请输入联系人、手机号或者单位名称查询" type="search" class="searchInput">
          </form>
        </div>
      </div>
      <!--搜索框结束-->
      <!--绑定时间 功能栏开始-->
      <div class="bindAction">
        <span @click="thisRotate('a',1)" class="imgBox"><span>绑定时间</span><img :class="{'imgRotate' : isRotate.a}" src="../../../images/salesWap/customer/triangle.png" alt=""></span>
        <span @click="thisRotate('b',2)" class="imgBox">最近下单时间<img :class="{'imgRotate' : isRotate.b}" src="../../../images/salesWap/customer/triangle.png" alt=""></span>
        <span @click="thisRotate('c',3)" class="imgBox">累计消费(元)<img :class="{'imgRotate' : isRotate.c}" src="../../../images/salesWap/customer/triangle.png" alt=""></span>
        <span @click="thisRotate('d',4)" class="imgBox">累计订单数<img :class="{'imgRotate' : isRotate.d}" src="../../../images/salesWap/customer/triangle.png" alt=""></span>
      </div>
      <!--绑定时间 功能栏结束-->

      <!--详细信息开始-->
      <div class="top_warp">
        <div class="ms_wrap" @click="toCustomerDetails" v-for="item in Data">
          <img src="../../../images/mine/topBackGround.png" class="ms_img" alt="">
          <div class="ms_right">
            <div class="ms_top">
              <span class="name">{{item.trueName}}</span>
            </div>
            <div class="phone">
              <img src="../../../images/salesWap/customer/phone.png" alt="">
              <span class="phoneText">{{item.phone}}</span>
            </div>
            <div class="ms_bottom">
              <div class="address_name">{{item.workAddress}}</div>
            </div>
          </div>
          <div class="sumPay">
            <span>累积消费(元): {{item.orderaMoneyCount}}</span>
            <img src="../../../images/salesWap/customer/back2.png" alt="">
          </div>
        </div>
      </div>
      <!--详细信息结束-->
    </div>


  <sales-footer bottomNav="customer"></sales-footer>
  </div>
</template>

<script>
  import salesHeader from '../salesHeader.vue'
  import salesFooter from '../salesFooter.vue'
  export default {
    data() {
      return {
        searchText: '',
        isRotate: {
          a: true,
          b: false,
          c: false,
          d: false
        },
        order: 1,
        Data : [],
        warp : '',
        currentPage : 1,
        numberPerPage :7,
        totalPage : 0, //总页数
        nowPage : 1
      }
    },
    created() {
      this.getDetailData()
    },
    mounted(){
      this._scroll()
    },
    methods: {
      toCustomerDetails(){
        this.$router.push({ path: '/customerDetails'})
      },
      thisRotate(index, num) {
        this.order = num
        for (let prop in this.isRotate) {
          if (index == prop) {
            this.isRotate[prop] = true
          } else {
            this.isRotate[prop] = false
          }
        }
        if(this.nowPage == this.order)
        {
          return
        }
        {
          this.currentPage = 1
          this.getDetailData()
          this.nowPage = num
        }

      },
      _scroll(){
        let that = this
        window.onscroll = function(){
          let clientHeight = document.documentElement.clientHeight;
          let scrollTop = document.body.scrollTop;
          let offsetHeight = document.body.offsetHeight;

          if(clientHeight + scrollTop >= offsetHeight)
          {
            console.log('等于')
            that.addDetailData()
          }
        }
      },
      //push arr
      addDetailData(){
        this.currentPage = this.currentPage + 1
        let obj = {
          value: '', //搜索框的值
          state: this.order,
          currentPage : this.currentPage ,//第几页
          numberPerPage: this.numberPerPage,//每页取得数量
        }
        if(this.currentPage <= this.totalPage)
        {
          this.$store.dispatch('GET_MY_CUSTOMER', obj).then((res) => {
            this.ifSpace(res)
            for(let i = 0,len=res.data.length; i < len; i++)
            {
              this.Data.push(res.data[i])
            }
          })
        }
        else
        {
          return
        }

      },
      getDetailData() {
        let obj = {
          value: '', //搜索框的值
          state: this.order,
          currentPage : this.currentPage,//第几页
          numberPerPage: this.numberPerPage,//每页取得数量
        }

        this.$store.dispatch('GET_MY_CUSTOMER', obj).then((res) => {
          this.ifSpace(res)
          this.Data = res.data
          this.totalPage = res.totalPage
          console.log(this.totalPage);
        })
      },
      //判空
      ifSpace(res){
        console.log(res);
        for(let i = 0,len=res.data.length; i < len; i++)
        {
          let data = res.data[i];

          if(data.trueName === null)
          {
            res.data[i].trueName = '暂无姓名'
          }
          if(data.phone === null)
          {
            res.data[i].phone = '暂无联系电话'
          }
          if(data.workAddress === null)
          {
            res.data[i]['workAddress'] = '暂无详细地址'
          }
        }
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
  .myCustomerWrap {
    width: 100vw;
  }

  .customerImgBack {
    position: absolute;
    top:px2vw(25);
    width: px2vw(24);
    height: px2vw(40);
    left: px2vw(19);
  }
  .searchBox {
    background-color:#e5e5e5;
    padding: px2vw(10) px2vw(34);
  }
  .searchImgBox{
    padding: px2vw(10) px2vw(28);
    background-color: #f6f6f6;
    border-radius: px2vw(40);
  }

  .searchImg {
    vertical-align: middle;
    width: px2vw(30);
    height: px2vw(30);
  }
  input[type="search"]::-webkit-search-cancel-button{
    display: none;
  }
  .searchInput {
    -webkit-appearance: none;
    background: transparent;
    vertical-align: middle;
    outline: none;
    border: none;
    font-size: px2vw(28);
    width: px2vw(570);
    padding-top: 0;
    padding-bottom:0 ;
    padding-left: px2vw(15);
    margin-top: px2vw(4);
    margin-bottom: px2vw(4);
  }
  .fromInput{
    padding: 0;
    margin: 0;
    vertical-align: middle;
    width: px2vw(570);
    display: inline-block;
  }

  .bindAction {
    width: 100vw;
    border-bottom: px2vw(10) solid $borderColor;
    color: #666666;
  }
  .imgRotate{
    padding-left: px2vw(0) !important;
    transform:rotate(90deg);
    -ms-transform:rotate(90deg);
    -moz-transform:rotate(90deg);
    -webkit-transform:rotate(90deg);
    -o-transform:rotate(90deg);
    transition: all 0.2s;
  }

  .imgBox{
    display: inline-block;
    height: px2vw(88);
    line-height: px2vw(88);
  }
  .imgBox:nth-child(1){
    width: 18%;
    margin-left: px2vw(30);
  }
  .imgBox:nth-child(2){
    margin-left: px2vw(10);
    width: 26%;
  }
  .imgBox:nth-child(3){
    width: 24%;
  }
  .imgBox:nth-child(4){
    width: 21%;
  }
  .imgBox img{
    margin-left: px2vw(7);
    width: px2vw(6);
    height: px2vw(10);
    min-width: 3px;
    min-height: 5px;
    vertical-align: middle;
    margin-top: px2vw(-3);
  }

  .imgBox:nth-child(n+1){
    -webkit-text-size-adjust:none;
    font-size: px2vw(26);
  }

  .top_warp {
    margin-bottom: px2vw(118);
  }
  .ms_wrap {
    position: relative;
    border-bottom: px2vw(2) solid $borderColor;
    background: white;
    padding: px2vw(6) px2vw(17) px2vw(4) px2vw(22);
  }
  .ms_img {
    width: px2vw(92);
    height: px2vw(92);
    border-radius: 100%;
    vertical-align: middle;
    margin-right: px2vw(23);
  }
  .ms_right {
    display: inline-block;
    vertical-align: middle;
  }
  .name {
    font-size: px2vw(30);
  }
  .salesHeader{
    position: static !important;
  }
  .address_name{
    display: inline-block;
    font-size: px2vw(24);
    width: px2vw(500);
    vertical-align: middle;
  }
  .phone{
    font-size: px2vw(26);
    color: #646464;
  }
  .phone img{
    width: px2vw(20);
    height: px2vw(22);
  }

  .sumPay {
    position: absolute;
    right:px2vw(22);
    top:0;
    height: px2vw(130);
    line-height: px2vw(130);
    float: right;
  }
  .sumPay span{
    color: $themeColor;
    font-size: px2vw(24);
  }
  .sumPay img{
    vertical-align: middle;
    margin-left: px2vw(14);
    width: px2vw(12);
    height: px2vw(21);
  }

  .imgBackBoxs {
    position: relative;
    width: 100vw;
  }
</style>

