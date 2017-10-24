<template>
  <div class="wallet-container">
    <sales-header headerText="我的钱包"></sales-header>
    <div class="wallet-info">
      <div class="avatar-content">
        <img class="avatar" v-if="!saleInfo.salePic " src="../../../../images/salePersonal/avatar.png" alt=""
             width="100%"
             height="100%">
        <img class="avatar" :src="saleInfo.salePic" alt="" width="100%" height="100%" v-else>
      </div>
      <div class="wallet-count">
        钱包余额（元）：
        <strong class="primary">{{saleInfo.money || 0}}</strong>
      </div>
    </div>
    <ul class="sale-list">
      <li class="sale-item" @click="goPage('saleWithdraw')"><p class="sale-item-text">余额提现</p></li>
      <li class="sale-item"><p class="sale-item-text">钱包明细</p></li>
    </ul>
    <sales-footer bottomNav="personal"></sales-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import salesHeader from '../../salesHeader.vue'
  import salesFooter from '../../salesFooter.vue'
  import {mapState} from 'vuex'

  export default {
    components: {
      salesHeader,
      salesFooter
    },
    computed: {
      ...mapState('sale', {
        saleInfo: state => state.saleInfo
      })
    },
    methods: {
      goPage(name) {
        this.$router.push({name})
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../common/sass/factory";

  .wallet-container {
    background-color: #e5e5e5;
    .wallet-info {
      box-sizing: content-box;
      width: 100%;
      height: px2vw(237);
      padding-top: px2vw(88);
      margin-bottom: px2vw(10);
      background-color: #1a78cd;
      .avatar-content {
        position: relative;
        left: 50%;
        margin-left: px2vw(-56);
        margin-top: px2vw(23);
        margin-bottom: px2vw(26);
        height: px2vw(111);
        width: px2vw(111);
        border-radius: 50%;
        border: px2vw(8) solid #fff;
        box-shadow: 0 0 0 px2vw(8) #30b9e5;
        background-color: #fff;
      }
      .wallet-count {
        margin: 0 auto;
        width: px2vw(300);
        height: px2vw(50);
        background-color: #2599d9;
        color: #fff;
        border-radius: px2vw(50);
        font-size: px2vw(24);
        line-height: px2vw(50);
        text-align: center;
        .primary {
          font-size: px2vw(30);
        }
      }
    }
    .sale-list {
      background-color: #fff;
      font-size: px2vw(30);
      .sale-item {
        height: px2vw(100);
        line-height: px2vw(100);
        border-bottom: 1px solid $borderColor;
        padding-left: px2vw(66);
        padding-right: px2vw(28);
        .sale-item-text {
          background: url("../../../../images/salePersonal/rightArrow.png") right center no-repeat;
          background-size: px2vw(12) px2vw(20);
        }
        &:first-child {
          background: url("../../../../images/salePersonal/walletDark.png") px2vw(20) center no-repeat;
          background-size: px2vw(36) px2vw(36);
        }
        &:last-child {
          background: url("../../../../images/salePersonal/count.png") px2vw(20) center no-repeat;
          background-size: px2vw(36) px2vw(36);
        }
      }
    }
  }
</style>
