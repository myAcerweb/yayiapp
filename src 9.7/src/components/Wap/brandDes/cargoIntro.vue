<template>
  <div class="cargoIntro">
    <div class="tab_box">
      <div class="tab_item" :class="{spe: isActive1}" @click="first">图文介绍</div>
      <div class="tab_item" :class="{spe: isActive2}" @click="second">规格参数</div>
    </div>
    <div v-show="imgWord">
      <div class="instruction" v-html="itemDetail.itemDesc"></div>
    </div>
    <div class="goodIntroduce" v-show="canshu">
      <div class="good_item">品名：{{itemName}}</div>
      <div class="good_item">单位：{{itemDetail.unit}}</div>
      <div class="good_item">品牌：{{itemBrandName}}</div>
      <div class="good_item">注册证号：{{itemDetail.registerId}}</div>
      <div class="good_item">产品包装：{{itemDetail.itemPacking}}</div>
      <div class="good_item">医械类别：{{itemDetail.apparatusType}}</div>
      <div class="good_item">注册证有效期/备案日期：{{itemDetail.registerDate}}</div>
      <div class="good_item">商家货号：{{itemDetail.storeItemId}}</div>
      <div class="good_item">使用范围：{{itemDetail.itemRange}}</div>
      <div class="good_item">生产企业名称：{{itemDetail.producePompany}}</div>
      <div>其他：{{itemDetail.remark}}</div>
    </div>
    <div class="clearfix" style="width: 100%; height: 10vw;"></div>
  </div>
</template>

<script>
export default {
  name: 'cargoIntro',
  data () {
    return {
      isActive1: true,
      isActive2: false,
      itemDetail: {},
      itemName: '',
      itemBrandName: '',
      imgWord : true,
      canshu: false,
    }
  },
  components: {
  },
  created: function() {
    var that = this;
    that.getNowGoodDetail();
  },
  methods: {
    first: function() {
      var that = this
      that.isActive1 = true
      that.isActive2 = false
      that.imgWord = true
      that.canshu = false
    },
    second: function() {
      var that = this
      that.isActive1 = false
      that.isActive2 = true
      that.imgWord = false
      that.canshu = true
    },
    // 获取商品详情
    getNowGoodDetail: function() {
      var that = this;
      var obj = {
        itemId:that.$route.params.goodId,
      };
      that.$store.dispatch('GET_ITEM_DETAIL', obj).then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          let nowGoodDetails = res.data.data;
          that.itemDetail = nowGoodDetails.itemDetail;
          that.itemName = res.data.data.itemName;
          that.itemBrandName =  res.data.data.itemBrand.itemBrandName;
          // console.log(res.data.data,"getNowGoodDetail")
        }
      })
    },
  }
}
</script>
<style >
 .instruction img{
  max-width: 100% !important;
  display: block;
  margin: 20px auto;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
@import "../../../common/sass/factory";
.tab_box {
  width: 100vw;
  height: 11.2vw;
  margin-top: 4vw;
  margin-bottom: 4vw;
}
.tab_item {
  width: 50vw;
  height: 11.2vw;
  line-height: 11.2vw;
  text-align: center;
  float: left;
  font-size: 4vw;
  background-color: #F3F3F3;
}
.spe {
  background-color: $themeColor;
  color: #fff;
  box-shadow: 0px 0px 3px $themeColor;
}
.goodIntroduce {
  width: 90vw;
  margin: 0 auto;
  font-size: 2.73vw;
  padding: 4vw 2vw 4vw 2vw;
  border: 1px solid #F3F3F3;
}
.good_item {
  margin-bottom: 5vw;
}
</style>

