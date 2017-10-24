<template>
  <div class="cargoDes">
    <!-- 商品图片 开始-->
    <div class="infoLeft">
      <mt-swipe :auto="5000">
        <mt-swipe-item v-for="(goodImg ,index) in goodAllImgs" :key="goodImg">
          <img class="carousel_img" :src="goodAllImgs[index]+'?imageView2/1/w/600/h/600'">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 商品图片 结束-->
    <div class="infoRight">
      <h3>{{nowGoodDetails.itemName}}</h3>
      <div class="priceWrap">
        价格：<span class="fontRed">￥{{nowGoodDetails.itemPrice}}</span>
      </div>
      <div class="priceWrap">
        已售： <span class="wordSpe">{{nowGoodDetails.sales}}</span>
      </div>
      <div class="priceWrap">
        品牌：<span class="wordSpe">{{itemBrand.itemBrandName}}</span>
      </div>
      <div class="priceWrap">
        注册证号：<span class="wordSpe">{{itemDetail.registerId}}</span>
      </div>
      <div class="priceWrap">
         <img class="imgEspe" src="../../../images/details/seven.png" alt="img"><span class="wordEspe" style="margin-right:5vw;">7天无理由退换货</span>
         <img class="imgEspe" src="../../../images/details/postFree.png" alt="img"><span class="wordEspe">全国满199元包邮</span>
      </div>
      <hr class="onePxLine" color="e5e5e5"></hr>
      <div v-show="nowGoodDetails.state==0" class="fontRed">商品已下架</div>
      <div v-show="nowGoodDetails.state!=0">
         <div class="shuxingWrap" style="height:auto">
          <div v-for="(item, index1) in items" v-if="item.propertyName" :key="item.propertyName">
            <div class="property_name">{{item.propertyName}}：</div>
            <div class="shuxing">
              <button :class="{ attSty2: index2 == item.checkWhich}" class="attSty1" v-on:click="changeAttSty(index2,item,index1)" v-for="(oneAttrVal,index2) in item.propertyInfoList" :key="oneAttrVal.enabled" :disabled= "!oneAttrVal.enabled">
                {{oneAttrVal.data}}
              </button>
              <div class="clearfix"></div>
            </div>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="priceWrap">
          <span style="float:left">数量：</span>
          <div class="calculator">
            <button class="addBtn" :class="{btnDef:goodDefaultNum===1}" v-on:click="reduceGoodNum()">-</button>
            <!-- <span>{{goodDefaultNum}}</span> -->
            <input @input="oneGoodNumChange()" type="text" v-model="goodDefaultNum">
            <button v-if="nowGoodDetails.itemValueList" class="addBtn" :class="{btnDef:goodDefaultNum==nowGoodDetails.itemValueList[0].stockNum}" v-on:click="addGoodNum()" :disabled="noStock">+</button>
            <span v-if="!kuCunBuZu" class="kucunbuzu">(库存{{nowStock}}件)</span>
            <div class="clearfix"></div>
          </div>
          <div class="clearfix"></div>
        </div>
<!--         <div v-if="kuCunBuZu" class="goodBtn">
          <span @click="addGwcThisGood()">加入购物车</span>
          <span @click="nowToBuyThis()">立即购买</span>
        </div>
        <div v-else class="goodBtn kucunbuzu">
          <span >加入购物车</span>
          <span >立即购买</span>
        </div> -->
      </div>

    </div>
    <div class="clearfix" style="width: 100%; height: 10vw;"></div>
  </div>

</template>

<script>
  import util from '../../../vuex/util'
  import { tokenMethods } from '../../../vuex/util'
  export default {
    name: 'cargoDes',
    data () {
      return {
        kuCunBuZu:true,
        nowStock: '',
        attrLength:0,
        nowGoodSKU:null,
        attrVal:[],
        nowGoodDetails:{},
        itemBrand:{},
        itemDetail:{},
        sureGoodAttr:0,
        copyUrl:true,
        bigImgUrl: "",
        goodDefaultNum:1,
        ite: 0,
        items: [],
        goodAllImgs:[],
        itemKey:[["itemPropertyName","itemPropertyInfo"],["itemPropertyNameTwo","itemPropertyTwoValue"],["itemPropertyNameThree","itemPropertyThreeValue"],["itemPropertyFourName","itemPropertyFourValue"],["itemPropertyFiveName","itemPropertyFiveValue"],["itemPropertySixName","itemPropertySixValue"]],
        noStock: false,
      }
    },
    created: function() {
      var that = this
      that.getNowGoodDetail()
      that.$store.state.index.goodSku = that.jiSuanSku().sku
    },
    methods:{
      nowGoodSKUDefault:function(){
        var that =this;
        var obj = {};
        var attrs = [];
        var LIST = that.nowGoodDetails.itemValueList;
        for(let i in LIST) {
          if(LIST[i].itemSKU == that.nowGoodSKU) {
            obj = LIST[i];
            break;
          }
        }
        if (LIST.length == 1 && LIST[0].itemPropertyName=='') {
          that.$store.state.index.goodSku = LIST[0].itemSKU
        }
      },
      // 获取商品详情
      getNowGoodDetail: function() {
        var that = this;
        var obj = {
          itemId: that.$route.params.goodId,
          token: tokenMethods.getWapToken(),
        };
        that.$store.dispatch('GET_ITEM_DETAIL', obj).then((res) => {
          // console.log(res.data,"getNowGoodDetail")
          if (res.data.callStatus === 'SUCCEED') {
            that.ifshoucang = res.data.num;
            that.nowGoodSKU = res.data.msg;
            that.nowGoodDetails = res.data.data;
            that.$store.state.index.nowGoodDetails = res.data.data;
            console.log(that.$store.state.index.nowGoodDetails,'90')
            that.sureGoodAttr = that.nowGoodDetails.itemValueList[0].itemPropertyInfo;
            that.itemBrand = that.nowGoodDetails.itemBrand;
            that.itemDetail = that.nowGoodDetails.itemDetail;
            that.commentList = that.nowGoodDetails.commentList;
            that.goodAllImgs[0] = that.nowGoodDetails.itemDetail.itemPica;
            that.goodAllImgs[1] = that.nowGoodDetails.itemDetail.itemPicb;
            that.goodAllImgs[2] = that.nowGoodDetails.itemDetail.itemPicc;
            that.goodAllImgs[3] = that.nowGoodDetails.itemDetail.itemPicd;
            that.goodAllImgs[4] = that.nowGoodDetails.itemDetail.itemPice;
            that.bigImgUrl = that.goodAllImgs[0];
            that.items = that.nowGoodDetails.propertyList;
            that.nowStock = that.nowGoodDetails.itemValueList[0].stockNum
            that.$store.state.index.nowStock = that.nowGoodDetails.itemValueList[0].stockNum
            for(let i in that.nowGoodDetails.commentList){
              that.nowGoodDetails.commentList[i].created = util.formatDate.format(new Date( that.nowGoodDetails.commentList[i].created),'yyyy-MM-dd hh:mm:ss' );
            }
            that.commentList = that.nowGoodDetails.commentList;
            that.instructions = that.nowGoodDetails.itemDetail;
            that.instructions.addName = that.nowGoodDetails.itemName;
            that.instructions.itemBrandName = that.nowGoodDetails.itemBrand.itemBrandName;
            for(let i in that.nowGoodDetails.propertyList){
              if(that.nowGoodDetails.propertyList.propertyName){
                that.attrLength+=1;
              }
              for(var j=0;j<that.nowGoodDetails.propertyList[i].propertyInfoList.length;j++){
                that.nowGoodDetails.propertyList[i].propertyInfoList[j] = {data:that.nowGoodDetails.propertyList[i].propertyInfoList[j],enabled:true}
              }
            }
            if(that.nowGoodDetails.itemValueList[0].stockNum==0){
              that.kuCunBuZu = false;
            }
            that.nowGoodSKUDefault();
          }
        })
      },
      // 框中修改数量
      oneGoodNumChange:function() {
        // console.log(".....")
        this.jiSuanKuCun();
      },
      // 加数量
      addGoodNum:function () {
        var that = this
        that.goodDefaultNum = parseInt(that.goodDefaultNum)+1
        that.jiSuanKuCun()
      },
      // 减数量
      reduceGoodNum:function () {
        var that = this
        if(that.goodDefaultNum != 1){
          that.goodDefaultNum = parseInt(that.goodDefaultNum)-1
        }
        that.jiSuanKuCun()
      },
      // 计算库存
      jiSuanKuCun:function(){
        var that = this
        var jiSuanSkuObj = that.jiSuanSku()
        if(jiSuanSkuObj.sku) {
          that.nowGoodDetails.itemPrice = jiSuanSkuObj.obj.itemSkuPrice;
          var kuCun = jiSuanSkuObj.obj.stockNum;
          if(that.goodDefaultNum >= kuCun) {
            that.kuCunBuZu = false
            that.goodDefaultNum = kuCun
            that.$store.state.index.goodNum = that.goodDefaultNum
            that.$store.state.index.goodSku = that.jiSuanSku().sku
            that.noStock = false
          }else{
            that.kuCunBuZu = true
            that.$store.state.index.goodNum = that.goodDefaultNum
            that.$store.state.index.goodSku = that.jiSuanSku().sku
          }
        }
      },
      //indexC 子数组第几位 item 数组第几行的数据  indexP  当前数组第几行
      changeAttSty:function(indexC,item,indexP){
        var that = this;
        if (item.checkWhich == indexC) {
          that.nowGoodDetails.propertyList.splice(indexP,1,{propertyInfoList:item.propertyInfoList,propertyName:item.propertyName,checkWhich: null })
          that.$store.state.index.goodSku = that.jiSuanSku().sku
        } else {
          that.nowGoodDetails.propertyList.splice(indexP,1,{propertyInfoList:item.propertyInfoList,propertyName:item.propertyName,checkWhich: indexC })
        }
        for(var i=0;i<that.nowGoodDetails.propertyList.length;i++){
          for(var j=0;j<that.nowGoodDetails.propertyList[i].propertyInfoList.length;j++){
            if(that.nowGoodDetails.propertyList[i].checkWhich == j) {
              that.nowGoodDetails.propertyList[i].propertyInfoList[j].enabled = true
            } else {
              that.nowGoodDetails.propertyList[i].propertyInfoList[j].enabled = false
            }
          }
        }
        //propertyList  循环数据 itemValueList 所有属性组合
        for(var j=0;j<that.nowGoodDetails.itemValueList.length;j++){
          if(that.nowGoodDetails.itemValueList[j].canUse == 1){
            var tempNum = 0
            var temp = []
            var temp2 = []
            for(var i=0;i<that.nowGoodDetails.propertyList.length;i++){
              if(that.nowGoodDetails.itemValueList[j][that.itemKey[i][0]] != "") {
                if(that.nowGoodDetails.propertyList[i].checkWhich == null) {
                  temp2.push(i)
                }else if(that.nowGoodDetails.propertyList[i].propertyInfoList[that.nowGoodDetails.propertyList[i].checkWhich].data != that.nowGoodDetails.itemValueList[j][that.itemKey[i][1]]) {
                  tempNum++
                  if(tempNum>1){
                    break;
                  }
                  temp.push(i)
                }
              }
            }
            if(tempNum == 0){
              for(var i = 0;i<temp2.length;i++){
                for(var k=0;k<that.nowGoodDetails.propertyList[temp2[i]].propertyInfoList.length;k++){
                  if(that.nowGoodDetails.propertyList[temp2[i]].propertyInfoList[k].data == that.nowGoodDetails.itemValueList[j][that.itemKey[temp2[i]][1]] ) {
                    that.nowGoodDetails.propertyList[temp2[i]].propertyInfoList[k].enabled = true
                  }
                }
              }
            }else if(tempNum == 1){
              for(var i = 0;i<temp.length;i++){
                for(var k=0;k<that.nowGoodDetails.propertyList[temp[i]].propertyInfoList.length;k++){
                  if(that.nowGoodDetails.propertyList[temp[i]].propertyInfoList[k].data == that.nowGoodDetails.itemValueList[j][that.itemKey[temp[i]][1]] ) {
                    that.nowGoodDetails.propertyList[temp[i]].propertyInfoList[k].enabled = true
                  }
                }
              }
            }
          }
        }
        this.jiSuanKuCun();
      },
      enter:function(index){
        this.bigImgUrl = this.goodAllImgs[index];
      },
      showShareCol:function(arg){
        var that = this;
        if(arg==1){
          that.copyUrl = false;
        }else{
          that.copyUrl = true;
        }
      },
      jiSuanSku: function() {
        var that = this;
        var returnObj = {};
        var havaSelectVals = [];
        var nowGoodValLength = 0;
        var list2 = that.nowGoodDetails.propertyList;
        for(let a in list2){
          if(list2[a].propertyName){
            nowGoodValLength = parseInt(a) + 1;
          }
          if(list2[a].checkWhich>=0 && list2[a].checkWhich!=null){
            havaSelectVals.push(list2[a].propertyInfoList[list2[a].checkWhich].data);
          }else{
            continue;
          }
        }
        var list1 = that.nowGoodDetails.itemValueList;
        for(let i in list1){
          var valsArr = [];
          if(list1[i].itemPropertyInfo){
            valsArr.push(list1[i].itemPropertyInfo);
          }
          if(list1[i].itemPropertyTwoValue){
            valsArr.push(list1[i].itemPropertyTwoValue);
          }
          if(list1[i].itemPropertyThreeValue){
            valsArr.push(list1[i].itemPropertyThreeValue);
          }
          if(list1[i].itemPropertyFourValue){
            valsArr.push(list1[i].itemPropertyFourValue);
          }
          if(list1[i].itemPropertyFiveValue){
            valsArr.push(list1[i].itemPropertyFiveValue);
          }
          if(list1[i].itemPropertySixValue){
            valsArr.push(list1[i].itemPropertySixValue);
          }
          list1.arr = valsArr;
          if(havaSelectVals.length==nowGoodValLength){
            var flag = true;
            for(let c in havaSelectVals){
              if(havaSelectVals[c]==valsArr[c]){

              }else{
                flag = false;
              }
            }
            if(flag){
              returnObj.sku = list1[i].itemSKU;
              returnObj.obj= list1[i];
              break;
            }else{
              continue;
            }
          }else{
            continue;
          }
        }
        return returnObj;
      },
      nowToBuyThis:function(){
        var that = this;
        var userToken = that.global.getToken();
        var nowSku = that.jiSuanSku().sku;
        if(userToken){
          if(nowSku){
            if(that.global.getUser()){
              var sendData = {};
              sendData.details = [];

              var obj = {
                itemId:that.nowGoodDetails.itemId,
                itemName:that.nowGoodDetails.itemName,
                picPath:that.itemDetail.itemPica,
                num:that.goodDefaultNum,
                itemSKU:nowSku,
                price:that.nowGoodDetails.itemPrice,
                goodBrandName:that.nowGoodDetails.itemBrand.itemBrandName,
                goodSort:that.nowGoodDetails.itemSort
              };
              sendData.allMoney = that.nowGoodDetails.itemPrice * 100 * that.goodDefaultNum / 100;
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
              sendData.haveSelectedGoodNum = that.goodDefaultNum;
              sendData.details.push(obj)
              window.sessionStorage.setItem("suborderData",JSON.stringify(sendData));
              that.$router.push({path: '/suborder'})
            }
          }else{
            that.$alert('请选择正确的商品属性！',  {confirmButtonText: '确定',});
          }
        }else{
          that.$alert('未登录，请先登录！',  {confirmButtonText: '确定',callback: action => {  that.$emit("goodInfoSay","sayToLogin");  }});
        }
      },
    },
    components: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
@import "../../../common/sass/factory";
  .infoLeft {
    width: 100vw;
    height: 100vw;
    box-shadow: 1px 1px 8px #eee;
  }
  .infoLeft .carousel_img {
    width: 100vw;
    height: 100vw;
  }
  .infoRight {
    width: 100vw;
    margin-top: 4.5vw;
  }
  .infoRight h3 {
    font-size: 4.26vw;
    margin-bottom: 4.5vw;
    position: relative;
  }
  .infoRight .priceWrap{
    font-size: 3.73vw;
    margin-bottom: 4.5vw;
    margin-left: 2vw;
  }
  .infoRight .priceWrap .wordSpe {
    color: #999999;
  }
  .wordEspe {
    font-size: 3.2vw;
    color: #999999;
  }
  .imgEspe {
    width: 3.33vw;
    height: 3.33vw;
    margin-right: 1vw; 
  }
  .onePxLine{
    width: 97vw;
    margin: auto;
    border: none;
    border-top: 1px solid #e5e5e5;
    background:#e5e5e5;
    border-color:#e5e5e5;
    margin-bottom: 4.5vw;
  }
  .btnDef{
    background: #e5e5e5;
  }
  .infoRight .shuxing{
    height:auto;
    margin-left: 2vw;
    margin-bottom: 4vw;
  }
  .infoRight .attSty1 {
    display: inline-block;
    width: 22.8vw;
    height: 8vw;
    line-height: 8vw;
    font-size: 3.2vw;
    text-align: center;
    border-radius: 7px;
    margin-right: 2vw;
    background-color: #F3F3F3;
    color: #333;
  }
  .infoRight .attSty2 {
    color: #fff;
    background-color: $themeColor;
  }
  .property_name {
    width: 23.46vw;
    font-size: 3.73vw;
    margin-left: 2vw;
    margin-bottom: 3vw;
  }
  .infoRight .calculator {
    float: right;
    margin-right: 2vw;
    width: 24.6vw;
    height: 8vw;
    border: 1px solid #e5e5e5;
    position: relative;
  }
  .fontRed {
    color: #e0645b;
  }
  .calculator .kucunbuzu {
    position: absolute;
    top: 0;
    left: -22vw;
    cursor: auto;
    width: 20vw;
  }
  .calculator span {
    width: 8vw;
    height: 8vw;
    line-height: 8vw;
    display: inline-block;
    float: left;
    text-align: center;
    cursor: pointer;
  }
  .calculator span:nth-child(2) {
    border-left: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
  }
  .calculator input {
    float:left;
    width: 8vw;
    display:inline-block;
    height: 100%;
    border:none;
    text-align: center;
    border-left: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
  }
  .kucunbuzu span{
    color: #333 !important;
    background: #ececec !important;
  }
  .addBtn {
    cursor: pointer;
    width: 8vw;
    height: 100%;
    background-color: #fff;
    float: left;
  }
  .btnDef{
    background: #e5e5e5 !important;
    cursor: default;
  }
</style>
