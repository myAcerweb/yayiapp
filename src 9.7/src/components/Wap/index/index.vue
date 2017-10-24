<template>
  <div class="index">
    <div class="search_box">
<!--       <img class="book_menu" src="../../../images/index/book.png" @click="book_up" alt="img"> -->
      <input class="search_word" type="text" @focus="searchActive" @keyup.enter="search_cargo" v-model="searchCargo" autocomplete="on" placeholder="请输入关键字">
      <img class="search_img" src="../../../images/index/search.png" alt="img">
    </div>
    <!--  左侧按钮弹出 开始 -->
<!--     <mt-popup v-model="popupVisible" position="left">
      <div class="book_up_box">
        <div class="classify_item" v-for="item in $store.state.index.classifyList" @click="goToList(item)">{{item.oneClassify}}</div>  
      </div>
    </mt-popup> -->
    <!--  左侧按钮弹出 结束 -->
    <Carousel></Carousel>
    <mainEnter></mainEnter>
    <classifyBox></classifyBox>
<!--     <Brand></Brand>
    <Classify></Classify> -->
  </div>
</template>

<script>
import Carousel from './carousel'
import mainEnter from './mainEnter'
import classifyBox from './classifyBox'
import Brand from './brand'
import Classify from './classify'
export default {
  name: 'index',
  data () {
    return {
      popupVisible: false,
      searchCargo: '',
    }
  },
  components: {
    Carousel,
    mainEnter,
    classifyBox,
    Brand,
    Classify
  },
  created: function() {
    var that = this
    that.$store.dispatch('GET_CLASSIFY_QUERY')
    that.$emit('listenToChildEvent','index')
  },
  methods: {
    //左侧弹出框
    book_up: function() {
      var that = this
      that.popupVisible = true
    },
    //搜索框
    search_cargo: function() {
      var that = this
    },
    //去商品列表页
    goToList: function(item) {
      var that = this
      that.$router.push({ name: 'productsList', params: { oneClassify: item.oneClassify, twoClassify: '', threeClassify: ''}})
    },
    searchActive: function() {
      var that = this
      that.$router.push({ path: '/searchWord', query: { data: 'focus' }})
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
@import "../../../common/sass/factory";
.index {
  width: 100vw;
}
.book_menu {
  position: absolute;
  top: 4.3vw;
  left: 2vw;
  width: 5.4vw;
  height: 3.2vw;
}
.top_word {
  font-size: 4.615vw;
  text-align: center;
}
.book_up_box {
  width: 70vw;
  height: 100vh;
  background-color: #fff;
  z-index: 999;
}
.classify_item {
  text-align: center;
  width: 100%;
  height: 13.866vw;
  line-height: 13.866vw;
  border-bottom: 1px solid #e9e9e9;
}
.search_box {
  width: 100vw;
  height: px2vw(88);
  position: relative;
  background-color: $themeColor;
}
.search_word {
  width: px2vw(710);
  height: px2vw(64);
  margin: 0 auto;
  border: 1px solid #e9e9e9;
  border-radius: px2vw(28);
  background-color: #fff;
  outline: medium;
  padding-left: 10vw;
  margin-left: px2vw(20);
  margin-top: px2vw(13);
}
.search_img {
  width: 4.75vw;
  height: 4.75vw;
  position: absolute;
  top: 3.5vw;
  left: 6vw;
}
</style>

