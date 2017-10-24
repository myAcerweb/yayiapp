<template>
  <div class="evaluateOrders-container" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
       infinite-scroll-distance="1">
    <order-component :key="index" v-for="(item,index) in orderList" :order="item"
                     class="order-content"></order-component>
  </div>
</template>

<script type="text/ecmascript-6">
  import orderComponent from '../orderComponent.vue'
  import {GET_ORDER_LIST, SAVE_ORDERS_LIST} from '../../../../vuex/types'
  import {tokenMethods} from '../../../../vuex/util'
  import {Toast, MessageBox} from 'mint-ui'

  export default {
    data() {
      return {
        orderList: [],
        currentPage: 1
      }
    },
    components: {
      orderComponent
    },
    methods: {
      _init() {
        let phone = tokenMethods.getWapUser() && tokenMethods.getWapUser().phone
        if (!phone) MessageBox.alert('请先进行登录').then(() => {
          this.$router.push({name: 'logIn'})
        })
        //参数
        this.updateOrderList(this.currentPage)
      },
      updateOrderList(currentPage) {
        let param = {
          currentPage,
          state: 4,
          numberPerpage: 5
        }
        this.$store.dispatch(GET_ORDER_LIST, param)
          .then(res => {
            if (res.data.callStatus === 'SUCCEED') {
              this.orderList = this.orderList.concat(res.data.data)
            }
          })
          .catch(err => {
            console.error(err)
          })
      },
      loadMore() {
        this.currentPage = this.currentPage + 1
        this.updateOrderList(this.currentPage)
      }
    },
    created() {
      this._init()
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../common/sass/factory";

  .evaluateOrders-container {
    padding-top: px2vw(153);
    background-color: #f4f4f4;
  }
</style>
