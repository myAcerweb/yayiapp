<template>
  <div class="brand">
    <p class="brand_word">热门品牌</p>
    <p class="first_line"></p>
    <p class="second_line"></p>
    <div class="brand_box">
      <div class="brand_item" v-for="(item,index) in $store.state.index.brandListData" v-if="index<8" :key="item.itemBrandId" @click="goToThisBrand(item.itemBrandId)">
        <img class="brand_item_img" :src=item.itemBrandLogo alt="img">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'brand',
  data () {
    return {
    }
  },
  created: function() {
    var that = this
    that.$store.dispatch('GET_BRAND')
  },
  methods: {
    goToThisBrand: function(id) {
      var that = this
      that.$router.push({
        path:"/brandLib/0-0-0AND" + id,
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
.brand {
  width: 100vw;
}
.brand_word {
  margin-top: 2vw;
  text-align: center;
  color: #5DB7E8;
  font-size: 4.26vw;
}
.first_line {
  width: 11.3vw;
  height: 1px;
  margin: 0 auto;
  background-color: #5DB7E8;
  transform: translateX(2.8vw);
  margin-top: 0.8vw;
}
.second_line {
  width: 7.5vw;
  height: 1px;
  margin: 0 auto;
  background-color: #5DB7E8;
  transform: translateX(0.9vw);
  margin-top: 0.3vw;
}
.brand_box {
  width: 90vw;
  height: 45.3vw;
  margin: 0 auto;
  margin-top: 2vw;
}
.brand_item {
  width: 18.6vw;
  height: 18.6vw;
  border-radius: 50%;
  border: 0.13vw solid #e9e9e9;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #fff;
  float: left;
  margin-top: 2.3vw;
  margin-left: 1.65vw;
  margin-right: 1.65vw;
}
.brand_item_img {
  max-width: 80%;
  max-height: 80%;
  display: inline-block;
  vertical-align: middle;
}
</style>

