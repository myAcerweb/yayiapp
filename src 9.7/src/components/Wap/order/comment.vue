<template>
  <div class="comment-container">
    <div class="order-header">
      <span class="icon-container" @click="goBack">
        <img class="back-icon"  src="../../../images/logIn/back.png" alt="img">
      </span>
      <span class="order-title">我的订单</span>
      <strong class="publish" @click="publish">发布</strong>
    </div>
    <div class="product-comment-container" v-for="(item,index) in order.orderitemList">
      <div class="product-container">
        <div class="image">
          <img :src="item.picPath" alt="item.itemPropertyNamea" width="100%" height="100%">
        </div>
        <div class="product-info">
          <p class="name">{{item.itemInfo.itemName}}</p>
          <p class="type">{{item.itemInfo.itemPnamea}} {{item.itemInfo.itemPnameb}} {{item.itemInfo.itemPnamec}}</p>
        </div>
      </div>
      <div class="rate needclick">
        <el-rate v-model="productRate[index]" :colors="['#99A9BF', '#005aab', '#005aab']" @change="getRate"></el-rate>
      </div>
      <div class="field">
        <el-input type="textarea" :rows="4" v-model="desc[index]"></el-input>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {PUBLISH_COMMENT} from '@vuex/types'

  export default {
    data() {
      return {
        productRate: [],
        desc: []
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      getRate() {
        console.log(this.productRate[0])
      },
      publish() {
        let itemIdList = this.order.orderitemList.map((item, index) => {

          return {
            itemId: item.itemId,
            itemSKU: item.itemSKU,
            score: this.productRate[index] || 5,
            data: this.desc[index] || '默认好评'
          }
        })
        console.log(itemIdList)
        let params = {
          itemIdList: JSON.stringify(itemIdList),
          orderId: this.order.orderId
        }
        console.log(params.itemIdList, params.orderId)
        this.$store.dispatch(PUBLISH_COMMENT, params)
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    computed: {
      order() {
        return this.$store.state.index.orderDetails
      }
    },
    created() {
      console.log(this.order)
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .comment-container {
    .order-header {
      position: fixed;
      top: 0;
      width: 100vw;
      height: px2vw(88);
      line-height: px2vw(88);
      padding-bottom: 10vw;
      color: #333;
      background-color: #fff;
      border-bottom: px2vw(1) solid $borderColor;
      text-align: center;
      .icon-container {
        display: inline-block;
        height: px2vw(88);
        line-height: px2vw(88);
        width: px2vw(150);
        text-align: left;
        margin-left: 2vw;
        float: left;
        .back-icon {
          width: px2vw(18);
          height: px2vw(29);
        }
      }
      .order-title {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: px2vw(200);
        height: px2vw(88);
        line-height: px2vw(88);
        display: inline-block;
        text-align: center;
        font-size: px2vw(32);
      }
      .publish {
        position: absolute;
        right: px2vw(40);
        color: #333;
        font-weight: normal;
        font-size: px2vw(30);
      }
    }
    background-color: #f4f4f4;
    padding-top: px2vw(88);
    .product-comment-container {
      background-color: #fff;
      width: 100vw;
      height: px2vw(420);
      margin-bottom: px2vw(20);
      .product-container {
        display: flex;
        height: px2vw(120);
        padding: px2vw(25) 0;
        border-bottom: 1px solid $borderColor;
        .image {
          flex: none;
          margin: 0 px2vw(20);
          width: px2vw(74);
          height: px2vw(74);
          border: 1px solid $borderColor;
        }
        .product-info {
          flex: auto;
          .type {
            font-size: px2vw(24);
            color: #999999;
          }
        }
      }
      .rate {
        padding: px2vw(30) px2vw(20) px2vw(20);
      }
      .field {
        padding: 0 px2vw(20);
        .el-textarea {
          min-height: px2vw(200);
        }
      }
    }
    .el-rate__icon {
      font-size: px2vw(24) !important;
    }
  }
</style>
