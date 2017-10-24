<template>
  <div class="product-container" ref="product">
    <ul class="product-list" v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="1">
      <li v-for="(product,index) in productsList" :key="index" class="product-content"
          @click="goProductDetail(product)">
        <img v-lazy="product.itemDetail.itemPica" alt="" class="image">
        <p class="product-title">{{product.itemName}}</p>
        <p class="product-price">￥{{product.itemPrice}}</p>
      </li>
    </ul>
    <div class="noProduct" v-show="!productsList.length">暂无数据</div>
    <p v-show="busy && !times" class="page-infinite-loading">
      <mt-spinner type="fading-circle" class="spinner"></mt-spinner>
      {{scrollerTextInfo}}
    </p>
  </div>
</template>

<script type="text/ecmascript-6">
  import {QUERY_ITEM_SEARCH} from '../../../../vuex/types'
  import {mapState} from 'vuex'


  export default {
    data() {
      return {
        busy: false,
        time: 0,
        times: 0
      }
    },
    computed: {
      productsList() {
        return this.$store.state.index.productsList

      },
      currentPage() {
        return this.$store.state.index.queryItemSearchParams.currentPage
      },
      scrollerTextInfo() {
        return this.$store.state.index.productsScrollText
      },

    },

    created() {
      this._init()
    },
    methods: {

      _init() {
//        todo 禁止默认点开
        //请求默认分类的搜索事件
//        this.$store.dispatch(QUERY_ITEM_SEARCH, {currentPage: 1}).then(res => {
//        })
        //当产品的数组的长度为0时
      },
      goProductDetail(item) {
        this.$router.push({path: '/details/' + item.itemId, query: {name: item.itemName, itemId: item.itemId}})
        window.scroll(0, 0)
      },
      loadMore() {
        if (!this.productsList.length && !this.times) return
        this.busy = true
        this.$store.dispatch(QUERY_ITEM_SEARCH, {currentPage: this.currentPage + 1})
          .then(res => {
            this.time = 0
            if (this.scrollerTextInfo === '没有更多内容了...') {
              this.time = 3000
              this.times = 1
            }
            setTimeout(() => {
              this.busy = false
            }, this.time)
          })
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../common/sass/factory";

  .product-container {
    //确定padding的距离 170
    padding-top: px2vw(190);
    margin-right: px2vw(20);
    .product-list {
      -webkit-overflow-scrolling: touch;
      overflow: hidden;
      height: 100%;
      @at-root .product-content {
        position: relative;
        z-index: 1;
        box-sizing: border-box;
        float: left;
        color: #fff;
        margin-bottom: px2vw(20);
        width: px2vw(345);
        height: px2vw(500);
        border: 1px solid #d2d2d2;
        padding: px2vw(21);
        margin-left: px2vw(20);
        .image {
          width: px2vw(320);
          height: px2vw(320);
        }

        .product-title {
          color: $baseColor;
          line-height: px2vw(42);
          font-size: px2vw(28);
        }

        .product-price {
          position: absolute;
          right: px2vw(20);
          bottom: px2vw(20);
          color: #d81e06;
          line-height: px2vw(42);
          font-size: px2vw(28);
          text-align: right;
        }
      }
    }
    .page-infinite-loading {
      text-align: center;
    }
    .spinner {
      position: relative;
      left: 46%;
    }
    .noProduct {
      text-align: center;
      padding-top: px2vw(300);
      font-size: px2vw(66);
      font-weight: 600;
    }
  }
</style>
