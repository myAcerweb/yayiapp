<template>
  <div class="search">
    <div class="search_box">
      <img @click="search" class="search_img" src="../../../images/index/search2.png" alt="img">
      <div class="classGoods">商品分类</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'search',
  components: {
  },
  created: function() {
    var that = this
  },
  methods: {
    search(){
      this.$router.push({ path: '/searchWord', query: { data: 'focus' }})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory.scss";
.search_box {
  height: px2vw(88);
  color: white;
  font-size: 4.2222267vw;
  text-align: center;
  width: 100vw;
  line-height: px2vw(88);
  position: relative;
  background-color: $themeColor;
}
.search_img {
  width: 4.2vw;
  height: 4.2vw;
  position: absolute;
  top: px2vw(30);
  right: 3vw;
}
</style>

