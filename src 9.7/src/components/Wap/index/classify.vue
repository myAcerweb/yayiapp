<template>
  <div class="classify">
    <div class="classify_box" v-for="(classifyItem,index) in $store.state.index.classifyList" :key="classifyItem.oneId" v-if="classifyItem.classifyTwoList.length!==0">
      <div class="first_box">
        <p class="brand_word" @click="goToList(classifyItem)">{{classifyItem.oneClassify}}</p>
        <p class="first_line"></p>
        <p class="second_line"></p>
        <div class="more" @click="goToList(classifyItem)">更多</div>
      </div>
      <div class="classify_des_box">
        <div class="scroll_box">
          <div class="classify_item" v-for="(item,index) in classifyItem.classifyTwoList" v-if="index<10" :key="item.itemId" @click="toDetail(item)">
            <img class="classify_item_img" :src="item.itemDetail.itemPica+'?imageView2/1/w/200/h/200'" alt="img">
            <p class="item_des">{{item.itemName}}<span class="item_price">￥{{item.itemPrice}}</span></p>
          </div>
        </div>
      </div>
    </div>
    <div class="clearfix" style="width: 100%; height: 10vw;"></div>
  </div>
</template>

<script>
export default {
  name: 'classify',
  data () {
    return {
      //classifyList: [],
    }
  },
  created: function () {
    var that = this;
    that.getClassify()
  },
  methods: {
    getClassify: function () {
      var that = this
      that.$store.dispatch('GET_CLASSIFY_QUERY')
    },
    toDetail: function(item) {
      var that = this
      that.$router.push({path: '/details/' + item.itemId, query: { name: item.itemName , itemId: item.itemId}})
      window.scroll(0,0)
    },
    //去商品列表页
    goToList: function(classifyItem) {
      var that = this
      that.$router.push({ name: 'productsList', params: { oneClassify: classifyItem.oneClassify, twoClassify: '', threeClassify: ''}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.brand {
  width: 100vw;
}
.classify_box {
  width: 100vw;
  height: auto;
}
.first_box {
  position: relative;
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
.more {
  text-align: center;
  width: 10.66vw;
  height: 5.33vw;
  line-height: 5.7vw;
  font-size: 3vw;
  border: 1px solid #B4B4B4;
  border-radius: 2px;
  position: absolute;
  top: 3vw;
  right: 3vw;
}
.classify_des_box {
  height: 45vw;
  margin: 0 auto;
  margin-top: 3vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  -webkit-overflow-scrolling: touch;
}
.scroll_box {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;
  -webkit-overflow-scrolling: touch;
}
.classify_item {
  width: 30vw;
  margin-left: 0.83vw;
  margin-right: 0.83vw;
}
.classify_item_img {
  max-width: 30vw;
  max-height: 30vw;
  display: inline-block;
  vertical-align: middle;
  border: 1px solid #e9e9e9;
}
.item_des {
  width: 100%;
  height: 12.13vw;
  font-size: 3vw;
  margin-top: 1vw;
  position: relative;
}
.item_price {
  color: #D81E06;
  position: absolute;
  right: 0;
  bottom: 2.5vw;
}
</style>

