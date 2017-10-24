<template>
  <div class="cargoUse">
    <div v-if="isActive" class="instruction" v-html="itemDetail.itemUse"></div>
    <div class="noInfo" v-else>
      <img class="useInfo_img" src="../../../images/details/useInfo.png" alt="img">
      <p class="useInfo_word">使用说明（图文合视频）正在紧急制作中～</p>
    </div>
    <div class="clearfix" style="width: 100%; height: 10vw;"></div>
  </div>
</template>

<script>
export default {
  name: 'cargoUse',
  data () {
    return {
      itemDetail: {},
      isActive: true,
    }
  },
  components: {
  },
  created: function() {
    var that = this;
    that.getNowGoodDetail();
  },
  methods: {
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
          if (that.itemDetail.itemUse.length <= 11) {
            that.isActive = false
          } else {
            that.isActive = true
          }
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
.noInfo {
  width: 100%;
  height: 100%;
  text-align: center;
}
.useInfo_img {
  width: px2vw(137);
  height: px2vw(137);
  margin-top: px2vw(300);
  margin-bottom: px2vw(30);
}
.useInfo_word {
  font-size: px2vw(28);
  color: #999;
}
</style>

