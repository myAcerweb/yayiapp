<template>
  <div class="brandDes">
    <div class="logIn_header">
      <div class="header_box" @click="back">
        <img class="header_back" src="../../../images/logIn/back.png" alt="img">
      </div>
      <span class="logWithCode">{{brandName}}</span>
    </div>
    <div class="tab_box">
      <div class="tab_item" :class="{spe: isActive1}" @click="changeActive1(tab01Text);">商品</div>
      <div class="tab_item" :class="{spe: isActive2}" @click="changeActive2(tab02Text);">介绍</div>
      <div class="tab_item" :class="{spe: isActive3}" @click="changeActive3(tab03Text);">使用说明</div>
      <div class="tab_item" :class="{spe: isActive4}" @click="changeActive4(tab04Text);">评论</div>
    </div>
    <div class="clearfix"></div>
    <!-- 点击导航后要切换的内容 -->
    <transition name="component-fade" mode="out-in">
      <component :is="currentView" keep-alive></component>
    </transition>
    <div class="bottom_box">
      <div class="collectCargo" @click="collectCargo">
        <img v-if="starImg" src="../../../images/details/star.png" alt="img">
        <img v-else src="../../../images/details/star_blue.png" alt="img">
      </div>
      <div class="seeCar" @click="goToCar">
<!--         <span class="carNum">{{num}}</span> -->
        <img src="../../../images/details/shoppinpCar.png" alt="img">
      </div>
      <mu-raised-button label="加入购物车" class="inCar" @click="addGoodInCar"/>
      <mu-raised-button label="立即购买" class="nowBuy" @click="nowBuy"/>
      </div>
  </div>
</template>

<script>
import Vue from 'vue'
import cargoDes from './cargoDes'
import cargoIntro from './cargoIntro'
import cargoUse from './cargoUse'
import cargoComment from './cargoComment'
import { tokenMethods } from '../../../vuex/util'
import { Toast, MessageBox } from 'mint-ui';
export default {
  name: 'brandDes',
  data () {
    return {
      brandName: '',
      itemId: '',
      isActive1: true,
      isActive2: false,
      isActive3: false,
      isActive4: false,
      tab01Text: "tab01",
      tab02Text: "tab02",
      tab03Text: "tab03",
      tab04Text: "tab04",
      currentView: 'tab01', //默认选中的导航栏
      num: 1,
      starImg: true,
      nowGoodDetails: {},
    }
  },
  components: {
    tab01: cargoDes,
    tab02: cargoIntro,
    tab03: cargoUse,
    tab04: cargoComment,
  },
  created: function() {
    var that = this
    that.brandName = that.$route.query.name
    that.itemId = that.$route.query.itemId
    var obj = {
      itemId: that.itemId,
      token: tokenMethods.getWapToken(),
    };
    that.$store.dispatch('GET_ITEM_DETAIL', obj).then((res) => {
      if (res.data.callStatus === 'SUCCEED') {
        // console.log(res.data.num,'90909')
        if (res.data.num == 0) {
          that.starImg = true
        } else {
          that.starImg = false
        }
      }
    })
  },
  methods: {
    // 立即购买
    nowBuy:function() {
      var that = this
      that.nowGoodDetails = that.$store.state.index.nowGoodDetails
      var userToken = tokenMethods.getWapToken()
      var nowSku = that.$store.state.index.goodSku
      if(userToken) {
        if (that.$store.state.index.nowStock == 0) {
          Toast({message: '该商品库存为0！', duration: 3000})
          return false
        }
        if(nowSku) {
          var sendData = {}
          sendData.details = []
          //验证该用户有无完善个人资料
          var obj = {
            itemId: that.nowGoodDetails.itemId,
            itemName: that.nowGoodDetails.itemName,
            picPath: that.nowGoodDetails.itemDetail.itemPica,
            num: that.$store.state.index.goodNum,
            itemSKU: nowSku,
            price: that.nowGoodDetails.itemPrice,
            goodBrandName: that.nowGoodDetails.itemBrand.itemBrandName,
            goodSort: that.nowGoodDetails.itemSort
          }
          sendData.allMoney = that.nowGoodDetails.itemPrice * 100 * that.$store.state.index.goodNum / 100;
          var list = that.nowGoodDetails.itemValueList;
          for(let i in list){
            if(nowSku==list[i].itemSKU){
              obj.itemPropertyInfo = list[i].itemPropertyInfo;
              obj.itemPropertyTwoValue = list[i].itemPropertyTwoValue;
              obj.itemPropertyThreeValue = list[i].itemPropertyThreeValue;
              obj.itemPropertyFourValue = list[i].itemPropertyFourValue;
              obj.itemPropertyFiveValue = list[i].itemPropertyFiveValue;
              obj.itemPropertySixValue = list[i].itemPropertySixValue;
              break;
            }
          }
          sendData.haveSelectedGoodNum = that.$store.state.index.goodNum;
          sendData.details.push(obj)
          window.sessionStorage.setItem("suborderData",JSON.stringify(sendData))
          window.scroll(0,0)
          that.$router.push({path: '/suborder'})
        }else{
          Toast({message: '请选择正确的商品属性！', duration: 3000})
        }
      } else {
        MessageBox.confirm('用户尚未登录！').then(action => {
          that.$router.push({path: '/logIn'})
        });
      }
    },
    // 加入购物车
    addGoodInCar: function() {
      var that = this
      if(tokenMethods.getWapToken()) {
        if (that.$store.state.index.nowStock == 0) {
          Toast({message: '该商品库存为0！', duration: 3000})
          return false
        }
        if(that.$store.state.index.goodSku) {
          var obj = {
            num: that.$store.state.index.goodNum,
            itemSKU: that.$store.state.index.goodSku,
            token: tokenMethods.getWapToken()
          }
          that.$store.dispatch('ADD_IN_CAR', obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              Toast({message: '商品成功加入购物车！', duration: 3000})
            }
          });
        }else{
          Toast({message: '请选择正确的商品属性！', duration: 3000})
        }
      } else {
        MessageBox.confirm('用户尚未登录！').then(action => {
          that.$router.push({path: '/logIn'})
        })
      }
    },
    // 收藏商品
    collectCargo: function() {
      var that = this
      if(tokenMethods.getWapToken()) {
        if (that.starImg == true) {
          var obj = {
            itemId: that.itemId,
            token: tokenMethods.getWapToken(),
            itemSKU: parseInt(Math.random()*100000),
          }
          that.$store.dispatch('COLLECT_CARGO', obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              Toast({message: '收藏成功！', duration: 3000})
              that.starImg = false
            }
          });
        } else {
          var obj = {
            itemId: that.itemId,
            token: tokenMethods.getWapToken(),
          }
          that.$store.dispatch('CANCEL_CARGO', obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              Toast({message: '取消成功！', duration: 3000})
              that.starImg = true
            }
          });
        }
      } else {
        MessageBox.confirm('用户尚未登录！').then(action => {
          that.$router.push({path: '/logIn'})
        })
      }
    },
    // 去购物车
    goToCar: function() {
      var that = this
      that.$router.push({path: '/yayi/shoppingCar'})
    },
    back: function() {
      this.$router.go(-1)
    },
    changeActive1: function(tabText) {
      this.currentView = tabText;
      this.isActive1 = true;
      this.isActive2 = false;
      this.isActive3 = false;
      this.isActive4 = false;
    },
    changeActive2: function(tabText) {
      this.currentView = tabText;
      this.isActive1 = false;
      this.isActive2 = true;
      this.isActive3 = false;
      this.isActive4 = false;
    },
    changeActive3: function(tabText) {
      this.currentView = tabText;
      this.isActive1 = false;
      this.isActive2 = false;
      this.isActive3 = true;
      this.isActive4 = false;
    },
    changeActive4: function(tabText) {
      this.currentView = tabText;
      this.isActive1 = false;
      this.isActive2 = false;
      this.isActive3 = false;
      this.isActive4 = true;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
@import "../../../common/sass/factory";
.logIn_header {
  width: 100vw;
  height: px2vw(88);
  line-height: px2vw(88);
  position: fixed;
  top: 0;
  left: 0;
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
.spe {
  cursor: pointer;
  color: $themeColor !important;
  border-bottom: 1px solid $themeColor;
}
.myOrder {
  width: 100%;
  height: 100%;
/*  background-color: #A08F65;*/
}
.tab_box {
  width: 100vw;
  height: 10vw;
  margin-top: px2vw(88);
}
.tab_item {
  width: 25vw;
  height: 10vw;
  line-height: 10vw;
  text-align: center;
  font-size: 14px;
  float: left;
}
.bottom_box {
  width: 100vw;
  height: 12vw;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #DBDBDB;
}
.collectCargo {
  width: 11.8vw;
  height: 12vw;
  line-height: 12vw;
  float: left;
  border-right: 1px solid #DBDBDB;
  background-color: #fff;
}
.collectCargo > img {
  width: 5.2vw;
  height: 4.9vw;
  float: left;
  margin-left: 3vw;
  margin-top: 3.7vw;
}
.seeCar {
  width: 12vw;
  height: 12vw;
  line-height: 12vw;
  float: left;
  background-color: #fff;
  position: relative;
}
.seeCar > img {
  width: 5.2vw;
  height: 4.9vw;
  position: absolute;
  top: 4vw;
  left: 3vw;
}
.seeCar .carNum {
  color: #D81E06;
  position: absolute;
  top: -2vw;
  right: 1vw;
  font-size: 12px;
  border-radius: 50%;
}
.inCar {
  display: block;
  width: 38vw;
  height: 12vw;
  line-height: 12vw;
  text-align: center;
  color: #fff;
  background-color: #009AF5;
  font-size: 3.7vw;
  float: left;
}
.nowBuy {
  display: block;
  width: 38vw;
  height: 12vw;
  line-height: 12vw;
  text-align: center;
  color: #fff;
  background-color: $themeColor;
  font-size: 3.7vw;
  float: left;
}
</style>

