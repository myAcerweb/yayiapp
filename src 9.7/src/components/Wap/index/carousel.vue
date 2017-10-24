<template>
  <div class="carousel">
    <mt-swipe :auto="5000">
      <mt-swipe-item v-for="item in $store.state.index.bannerList" :key="item.advId">
        <img class="carousel_img" :src=item.advImg alt="image">
<!--         <div class="bgImage" :style="{backgroundImage: 'url('+item.advImg+')'}" ></div> -->
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  name: 'carousel',
  data () {
    return {
      bannerList: [],
    }
  },
  created: function() {
    var that = this
    that.$store.dispatch('GET_CAROUSEL')
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
@import "../../../common/sass/factory";
.carousel {
  width: 100vw;
  height: 40vw;
}
.carousel_img {
  width: 100vw;
  height: 40vw;
}
// .bgImage {
//   width: 100%;
//   height: 100%;
//   background-repeat: no-repeat;
//   background-position: center;
// }
</style>

