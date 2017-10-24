<template>
  <div class="ProductContent">
    <div class="Content_header">
      <div @click="brandShow">
        <span>{{args.itemBrandName == null ? '全部品牌': args.itemBrandName}}</span>
        <img class="brandDown" src="../../../images/ProductList/searchDown.png" alt="">
        <ul :class="['allProduct',{allProductHidden:showBrand}]">
          <li v-for="(item,index) in brandList" @click="brandSearch(item.itemBrandName,index)" :class="{brand_li:item.itemBrandName == args.itemBrandName}">
            {{item.itemBrandName == null ? '全部品牌': item.itemBrandName}}
            <img v-show="item.itemBrandName == args.itemBrandName" class="brand_checked" src="../../../images/ProductList/brandChecked.png" alt="">
          </li>
        </ul>
        <div class="line_right"></div>
      </div>
      <ul class="content_ul">
        <li @click="changeOrder(1)" :class="{active_li:args.rule == 1}">新品</li>
        <li @click="changeOrder(2)" :class="{active_li:args.rule == 2}">销量</li>
        <li @click="changeOrder(3)" class="price_checked" :class="{active_li:args.rule == 3 || args.rule == 4 }">
          价格
          <img v-if="orderPrice" class="searchUP"  src="../../../images/ProductList/searchUp.png" alt="">
          <img v-else class="searchUP"  src="../../../images/ProductList/searchUpBlue.png" alt="">
          <img v-if="!orderPrice" class="searchDown" src="../../../images/ProductList/searchDown.png" alt="">
          <img v-else class="searchDown" src="../../../images/ProductList/searchDownBlue.png" alt="">
        </li>
      </ul>
    </div>
    <!--产品列表-->
    <div class="Content_main">
      <ul class="Content_list">
        <li v-for="(item,index) in productData">
          <div @click="goProductDetail(item)">
            <img class="product_pic" :src=item.itemDetail.itemPica alt="">
          </div>
          <div>
            <h3>{{item.itemName}}</h3>
            <span>{{item.itemBrand.itemBrandName}}</span>
            <i>¥ {{item.itemPrice}}</i>
          </div>
          <div class="Content_list_computed">
            <div class="product_computed" :class="{product_computed_hidden:item.itemPnamea!==null}">
              <div v-show="productNum[index]>=1" @click="decrementNum(index)">
                <img src="../../../images/ProductList/pReduce.png" alt="">
              </div>
              <div v-show="productNum[index]>=1">{{productNum[index]}}</div>
              <div @click="incrementNum(index,item.itemValueList[0].itemSKU)">
                <img  src="../../../images/ProductList/pPlus.png" alt="">
              </div>
            </div>
            <div @click="showModule(item,index)" class="Content_list_change"
                 :class="{Content_list_change_hidden:item.itemPnamea===null}">
              选规格
              <span>2</span>
            </div>
          </div>
        </li>

      </ul>
    </div>
    <!--模态框-->
    <div :class="['cover',{cover_hidden:moduleHidden}]">
      <div class="content">
        <div class="content_title">
          <h3>{{moduleData.itemName}}</h3>
          <span @click="closeModule" class="content_close">&times</span>
        </div>
        <h3 class="content_chance">规格:</h3>
        <div class="content_detail">
          <span :class="{detail_checked:detail_checked1}">{{moduleData.itemPnamea}}</span>
          <span :class="{detail_checked:detail_checked2}">{{moduleData.itemPnameb}}</span>
          <span :class="{detail_checked:detail_checked3}">{{moduleData.itemPnamec}}</span>
        </div>
        <div class="content_compute">
          <div>
            <h3>$ {{moduleData.itemPrice}} <span>(库存:100)</span></h3>
          </div>
          <div class="product_computed">
            <div @click="moduleReduce">
              <img src="../../../images/ProductList/pReduce.png" alt="">
            </div>
            <div>{{moduleNum}}</div>
            <div @click="modulePlus">
              <img src="../../../images/ProductList/pPlus.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--产品数据为空显示-->
    <div v-show="productData.length==0" class="noData">
      <img class="noDataPic1" src="../../../images/ProductList/noDataPic1.png" alt="">
      <img class="noDataPic2" src="../../../images/ProductList/noDataPic2.png" alt="">
      <p class="noData_text">您搜索的商品正在招募中,敬请期待!</p>
    </div>

    <!--进入购物车-->
    <div class="in_car">
      <img @click="goCar"  src="../../../images/ProductList/inCar.png" alt="">
      <span v-show="carNum!==0">{{carNum}}</span>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import {GET_BRAND_LIST} from '../../../vuex/types'
  import {QUERY_ITEM_SEARCH_POST} from '../../../vuex/types'
  import {GET_MAIN_PULL_PRODUCT} from '../../../vuex/types'
  import {ADD_IN_CAR} from '../../../vuex/types'
  import {GET_CAR_LIST} from '../../../vuex/types'
  import {mapState} from 'vuex'
  import { Toast, MessageBox } from 'mint-ui';

  export default {
    data() {
      return {
        orderPrice: true,
        brandList: [{itemBrandName:null}],
        showBrand: true,
        args:{
          currentPage:null,
          rule:1,
          oneClassify:this.$store.state.index.brandAndClassify.oneClassify,
          twoClassify:this.$store.state.index.brandAndClassify.classifyTwoName,
          itemBrandName:null
        },
        moduleHidden: true,
        productData: '',
        productNum: [],
        moduleData: {},
        moduleNum: '',
        detail_checked1: true,
        detail_checked2: false,
        detail_checked3: false,
        carNum:0,
        claasifList:''
      }
    },
    props:['chuanClaasif'],
    created() {
      var self = this;
      this.getCarList();
      this.getProductList();
      this.getBrandList();
      this.$store.watch(
        function (state) {
          return state.index.brandAndClassify;
        },
        function () {
          self.args.oneClassify = self.$store.state.index.brandAndClassify.oneClassify;
          self.args.twoClassify = self.$store.state.index.brandAndClassify.classifyTwoName;
          //do something on data change
          self.getProductList()
        },
        {
          deep: true //add this if u need to watch object properties change etc.
        }
      );
    },
    methods: {
      //获取购物车产品数量
      getCarList(){
        this.$store.dispatch(GET_CAR_LIST,{})
          .then(res=>{
            console.log('购物车',res);
            this.carNum=res.data.length;
          })
          .catch(err=>{
            console.log(err);
          });
      },
      //获取品牌列表
      getBrandList() {
        this.$store.dispatch(GET_BRAND_LIST, {})
          .then(res => {
            // this.brandList = res;
            for(var i=0;i<res.length;i++){
              this.brandList.push(res[i]);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      //获取产品列表
      getProductList(){
        this.$store.dispatch(QUERY_ITEM_SEARCH_POST, this.args)
          .then(res => {
            this.productData = res.data.data;
            this.productNum = this.productData.map(item => 0);  //返回0
//          console.log(this.productData);
          })
          .catch(err => {
            console.log(err);
          });
      },
      brandSearch(brand,index){
        this.args.itemBrandName = brand;
        this.getProductList();
      },
      decrementNum(index) {
        if (this.productNum[index] <= 0) {
          this.productNum[index] = 0;
        } else {
          let num = this.productNum[index] - 1
          this.$set(this.productNum, index, num)
        }
      },
      incrementNum(index,SKU) {
        var self = this
        let num = this.productNum[index] + 1
        this.$set(this.productNum, index, num);

          //加入购物车
        this.$store.dispatch(ADD_IN_CAR,{num:this.productNum[index],itemSKU:SKU}).then(res=>{
          console.log('加入购物车',res);
          //获取购物车产品数量
          self.getCarList();
        }).catch(err=>{
          console.log(err);
        })

      },
      goProductDetail(item) {
        this.$router.push({path: '/details/' + item.itemId, query: {name: item.itemName, itemId: item.itemId}})
        window.scroll(0, 0)
      },
      changeOrder(index) {

        if(index == 3) {
          this.args.rule = this.orderPrice == true ? 3 : 4;
          this.orderPrice = !this.orderPrice
        } else {
          this.args.rule = index;
        }
        this.getProductList();
      },

      showModule(item, index) {
        this.moduleHidden = false;
        this.moduleData = item;
        this.moduleNum = this.productNum[index];
      },
      closeModule() {
        this.moduleHidden = true;
      },
      brandShow() {
        this.showBrand = !this.showBrand;
      },
      modulePlus() {
        this.moduleNum += 1;
      },
      moduleReduce() {
        if (this.moduleNum <= 0) {
          this.moduleNum = 0;
        } else {
          this.moduleNum -= 1
        }
      },
      goCar(){
        this.$router.push({path: '/yayi/shoppingCar'});
      },

    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .Content_header {
    /*width: 100%;*/
    width: 75.73333vw;
    height: px2vw(100);
    /*overflow: hidden;*/
    padding: 0 px2vw(15);
    border-bottom: px2vw(2) solid #f4f4f4;
    position: fixed;
    top: px2vw(88);
    right: 0;
    background: white;
    z-index: 100;
  }

  .Content_header > div:nth-child(1) {
    width: px2vw(165);
    height: 100%;
    line-height: px2vw(100);
    /*border-right: px2vw(2) solid #f4f4f4;*/
    font-size: px2vw(26);
    text-align: center;
    float: left;
    position: relative;
  }
  .line_right{
    width: 0;
    position: absolute;
    right: 0;
    top:px2vw(40);
    height: px2vw(18);
    border-right: px2vw(2) solid #dcdcdc;
  }
  .Content_header > div:nth-child(1)>span{
    display: block;
    width: px2vw(120);
    text-overflow: ellipsis;
    overflow:hidden;text-overflow:ellipsis; -o-text-overflow:ellipsis;white-space:nowrap;
    font-size: px2vw(28);
  }

  .brandDown {
    width: px2vw(14);
    position: absolute;
    right:px2vw(10);
    top:px2vw(45);
  }

  .content_ul {
    float: right;
    /*overflow: hidden;*/
    height: 100%;
    width: px2vw(360);

  }

  .content_ul > li {
    float: left;
    /*height: px2vw(90);*/
    height: 13.33333vw;
    line-height: px2vw(90);
    width: 33%;
    text-align: center;
    font-size: px2vw(28);
  }

  .content_ul > .active_li {
    border-bottom: 2px solid #3676b6;
    color: #3676b6;
  }

  .Content_main {
    padding: 0 px2vw(15);
    margin-top: px2vw(140);
  }

  .Content_list {
    width: 100%;

  }

  .Content_list > li {
    height: px2vw(210);
    width: 100%;
    margin-bottom: px2vw(25);
    overflow: hidden;
    position: relative;
  }

  .Content_list > li > div:nth-child(1) {
    width: px2vw(175);
    height: px2vw(180);
    /*background: red;*/
    float: left;
    border: px2vw(1) solid #f4f4f4;
  }

  .product_pic {
    width: 100%;
  }

  .Content_list > li > div:nth-child(2) {
    width: px2vw(340);
    height: px2vw(180);
    float: right;
    position: relative;
  }

  .Content_list > li > div:nth-child(2) > h3 {
    font-size: px2vw(26);
    margin-bottom: px2vw(20);
  }

  .Content_list > li > div:nth-child(2) > span {
    color: #b6b6b6;
    font-size: px2vw(22);
  }

  .Content_list > li > div:nth-child(2) > i {
    color: #d81e06;
    text-decoration: none;
    font-style: normal;
    display: block;
    font-size: px2vw(24);
    position: absolute;
    left: 0;
    bottom: 0;

    /*margin-top: px2vw(10);*/
  }

  .Content_list_computed {
    width: px2vw(340);
    height: auto;
    position: absolute;
    right: 0;
    bottom: 3.33333vw;
  }

  .Content_list_computed > .product_computed {
    padding-top: 0;
    margin-right: px2vw(10);
  }

  .Content_list_computed > .product_computed_hidden {
    display: none;
  }

  .Content_list_change {
    background: #3676b6;
    border-radius: px2vw(25);
    height: px2vw(50);
    width: px2vw(100);
    color: white;
    font-size: px2vw(24);
    /*position: absolute;*/
    /*right: 0;*/
    /*bottom: px2vw(5);*/
    float: right;
    text-align: center;
    line-height: px2vw(50);
    position: relative;

  }

  .Content_list_computed > .Content_list_change_hidden {
    display: none;
  }

  .Content_list_change > span {
    background: red;
    color: white;
    border-radius: 100%;
    width: px2vw(30);
    height: px2vw(30);
    display: block;
    text-align: center;
    font-size: px2vw(16);
    line-height: px2vw(30);
    position: absolute;
    top: -1.86667vw;
    right: 0;
  }

  .allProduct {
    /*width: 100%;*/

    width: 75.73333vw;
    /*height: auto;*/
    position: absolute;
    left: -2vw;
    top: px2vw(100);
    z-index: 101;
    background: white;
    overflow: hidden;
    box-shadow: 0 px2vw(5) px2vw(5) #cbcbcb;

  }

  .allProduct > li {
    border-bottom: px2vw(1) solid #f4f4f4;
    float: left;
    text-align: center;
    width: 50%;
  }

  .Content_header > div:nth-child(1) > .allProductHidden {
    display: none;
  }

  .cover {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(204, 204, 204, 0.5);
    /*opacity: 0.8;*/
    z-index: 20;
  }

  .cover_hidden {
    display: none;
  }

  .content {
    width: px2vw(546);
    height: px2vw(355);
    background: white;
    border-radius: px2vw(15);
    opacity: 1;
    margin: px2vw(492) auto 0;
    padding: px2vw(20);
    padding-left: px2vw(30);
    position: relative;
  }

  .content_title {
    height: auto;
    position: relative;
  }

  .content_title > h3 {
    width: px2vw(360);
    height: auto;
    font-size: px2vw(30);
    margin: 0 auto;
    text-align: center;
  }

  .content_close {
    font-size: px2vw(60);
    position: absolute;
    top: -3.33333vw;
    right: -0.33333vw;
  }

  .content_chance {
    font-size: px2vw(26);
    margin-bottom: px2vw(24);
  }

  .content_detail {
    width: 100%;

  }

  .content_detail > span {
    float: left;
    width: px2vw(140);
    height: px2vw(46);
    text-align: center;
    font-size: px2vw(18);
    font-weight: bold;
    border: px2vw(2) solid #2b5e92;
    margin-right: px2vw(20);
  }

  .content_detail > .detail_checked {
    background: #476b91;
    color: white;
  }

  .content_compute {
    width: px2vw(546);
    height: px2vw(100);
    background: #f4f4f4;
    position: absolute;
    left: 0;
    bottom: 0;
    border-bottom-left-radius: px2vw(15);
    border-bottom-right-radius: px2vw(15);
    padding: 0 px2vw(26);
  }

  .content_compute > div:nth-child(1) {
    float: left;
    height: 100%;

  }

  .content_compute > div:nth-child(1) > h3 {
    color: red;
    height: 100%;
    font-size: px2vw(32);
    line-height: px2vw(100);
  }

  .content_compute > div:nth-child(1) > h3 > span {
    font-size: px2vw(16);
    color: black;
  }

  .product_computed {
    float: right;
    width: px2vw(136);
    height: 100%;
    padding-top: px2vw(30);

  }

  .product_computed > div:nth-child(1) {
    width: px2vw(40);
    height: px2vw(40);
    text-align: center;
    line-height: px2vw(40);
    font-size: px2vw(18);
    float: left;
    margin-right: px2vw(8);

  }

  .product_computed > div:nth-child(2) {
    width: px2vw(40);
    height: px2vw(40);
    line-height: px2vw(40);
    font-size: px2vw(24);
    float: left;
    text-align: center;
    font-weight: bold;
  }

  .product_computed > div:nth-child(3) {
    width: px2vw(40);
    height: px2vw(40);

    text-align: center;
    line-height: px2vw(40);
    font-size: px2vw(18);
    /*background: #3676b6;*/
    color: white;
    float: right;
  }

  .product_computed > div:nth-child(3) > img {
    width: 100%;
  }

  .product_computed > div:nth-child(1) > img {
    width: 100%;
  }

  .content_ul > .price_checked {
    position: relative;
    /*text-align: left;*/
  }

  .searchUP {
    position: absolute;
    top: px2vw(32);
    right: 0;
    width: px2vw(14);

  }

  .searchDown {
    position: absolute;
    top: px2vw(50);
    right: 0;
    width: px2vw(14);
  }
  .brand_li{
    color:#3676b6;
  }
  .brand_checked{
    width: px2vw(26);
  }
  .in_car{
    width: px2vw(80);
    position: fixed;
    right: 0;
    bottom: px2vw(98);
  }
  .in_car>img{
    width: 100%;
  }
  .in_car>span{
    position: absolute;
    right: px2vw(10);
    top:px2vw(15);
    background: #d81e06;
    border-radius: 100%;
    width: px2vw(25);
    height: px2vw(25);
    line-height: px2vw(25);
    color: white;
    font-size: px2vw(12);
    text-align: center;
  }
  .noData{
    width: px2vw(400);
    height: px2vw(216);
    position: fixed;
    right: px2vw(84);
    top:px2vw(512);
    text-align: center;
  }
  .noData_text{
    color: #999999;
    font-size: px2vw(24);
  }
  .noDataPic1{
    width: px2vw(57);
  }
  .noDataPic2{
    width: px2vw(113);
  }

</style>
