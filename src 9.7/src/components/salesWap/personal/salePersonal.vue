<template>
  <div class="salesPerson-container">
    <sales-header headerText="个人中心"></sales-header>
    <div class="sale-info-container">
      <div class="avatar-content">
        <img class="avatar" v-if="!saleInfo.salePic " src="../../../images/salePersonal/avatar.png" alt="" width="100%"
             height="100%">
        <img class="avatar" :src="saleInfo.salePic" alt="" width="100%" height="100%" v-else>
      </div>
      <div class="sale-info">
        <p class="sale-name sale-item">用户名：{{saleInfo.phone}}</p>
        <p class="sale-money sale-item">余额（元）：{{saleInfo.money}}</p>
        <p class="user-num sale-item">客户数（名）：{{saleInfo.bindUserNum || 0}}</p>
      </div>
    </div>
    <div class="sale-details">
      <div class="sale-btn-container">
        <div class="sale-btn">
          <p class="sale-btn-item primary-color">{{saleInfo.money}}</p>
          <p class="sale-btn-item">余额</p>
        </div>
        <div class="sale-btn" @click="goPage('saleWithdraw')">
          <p class="sale-btn-item">
            <img src="../../../images/salePersonal/withdrawals.png" class="sale-btn-pic" alt="余额提现" width="100%"
                 height="100%">
          </p>
          <p class="sale-btn-item">余额提现</p>
        </div>
        <div class="sale-btn">
          <p class="sale-btn-item ">
            <img src="../../../images/salePersonal/balance.png" class="sale-btn-pic" alt="钱包明细" width="100%"
                 height="100%">
          </p>
          <p class="sale-btn-item">钱包明细</p>
        </div>
        <div class="sale-btn" @click="goPage('saleWallet')">
          <p class="sale-btn-item ">
            <img src="../../../images/salePersonal/wallet.png" class="sale-btn-pic" alt="我的钱包" width="100%"
                 height="100%">
          </p>
          <p class="sale-btn-item">我的钱包</p>
        </div>
      </div>
    </div>
    <ul class="sale-list">
      <li class="sale-item"><p class="sale-item-text">我的客户</p></li>
      <li class="sale-item"><p class="sale-item-text">个人资料</p></li>
      <li class="sale-item"><p class="sale-item-text" @click="goPage('withdrawSetting')">提现设置</p></li>
    </ul>
    <div class="logout-btn-container">
      <mu-raised-button label="退出登录" fullWidth color="#fff" backgroundColor="#005aab" class="logout-btn"
                        @click="saleLogout"/>
    </div>
    <sales-footer bottomNav="personal"></sales-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import salesHeader from '../salesHeader.vue'
  import salesFooter from '../salesFooter.vue'
  import {Toast, Indicator, MessageBox} from 'mint-ui'
  import {tokenMethods} from '@vuex/util'
  import {SALEINFO_QUERY, SALE_USER_LOGOUT} from '@vuex/types'
  import {mapActions} from 'vuex'

  export default {
    components: {
      salesHeader,
      salesFooter
    },
    data() {
      return {
        saleInfo: {} //创客信息
      }
    },
    async created() {
      let res = await this[SALEINFO_QUERY]().catch(e => Toast(e))
      this.saleInfo = res.data
    },
    methods: {
      ...mapActions('sale', {
        SALEINFO_QUERY,
        SALE_USER_LOGOUT
      }),
      async saleLogout() {
        try {
          await MessageBox.confirm('您确定要退出登录吗？')
        }
        catch (e) {
          return
        }
        Indicator.open()
        let token = tokenMethods.getSalesToken()
        let res = await this[SALE_USER_LOGOUT]({token}).catch(err => Toast({message: err, duration: 3000}))
        if (res.errorCode === "No_Error") {
          //退出登录成功
          tokenMethods.removeSalesToken()
          Toast({message: '登出成功！', duration: 3000})
          this.$router.push({path: '/salesLogin'})
        } else {
          Toast({message: res.msg, duration: 3000})
        }
      },
      goPage(name) {
        this.$router.push({name})
        window.scroll(0, 0)
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .salesPerson-container {
    color: #333;
    background: #e5e5e5;
    padding-top: px2vw(88);
    .sale-info-container {
      display: flex;
      height: px2vw(290);
      padding: px2vw(80) px2vw(66) px2vw(50);
      background-color: #1a78cd;
      .avatar-content {
        position: relative;
        flex: none;
        height: px2vw(111);
        width: px2vw(111);
        margin-right: px2vw(108);
        margin-top: px2vw(10);
        border-radius: 50%;
        border: px2vw(8) solid #fff;
        box-shadow: 0 0 0 px2vw(8) #30b9e5;
        background-color: #fff;
        &:after {
          content: '';
          position: absolute;
          top: px2vw(-38);
          left: px2vw(-48);
          width: px2vw(181);
          height: px2vw(179);
          background: url("../../../images/salePersonal/avatarCircle.png") no-repeat;
          background-size: cover;
        }
      }
      .sale-item {
        color: #fff;
        font-size: px2vw(30);
      }
    }
    .sale-details {
      position: relative;
      width: 100%;
      margin-bottom: px2vw(6);
      &:after {
        content: '';
        position: absolute;
        top: px2vw(-10);
        height: px2vw(20);
        left: 0;
        right: 0;
        background-color: #fff;
        border-radius: 50%;
        z-index: 1000;
      }
      .sale-btn-container {
        display: flex;
        padding: px2vw(38) px2vw(10);
        height: px2vw(176);
        width: 100%;
        background-color: #fff;
        .sale-btn {
          flex: 1;
          border-right: 1px solid $borderColor;
          .sale-btn-item {
            width: 100%;
            line-height: px2vw(50);
            text-align: center;
            font-size: px2vw(28);
            .sale-btn-pic {
              width: px2vw(40);
              height: px2vw(40);
            }
            &.primary-color {
              color: #1a78cd;
              font-size: px2vw(36);
              margin-bottom: px2vw(6);
            }
          }
          &:last-child {
            border: 0 none;
          }
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
          background: url("../../../images/salePersonal/rightArrow.png") right center no-repeat;
          background-size: px2vw(12) px2vw(20);
        }
        &:first-child {
          background: url("../../../images/salePersonal/customer.png") px2vw(20) center no-repeat;
          background-size: px2vw(36) px2vw(36);
        }
        &:nth-of-type(2) {
          background: url("../../../images/salePersonal/personal.png") px2vw(20) center no-repeat;
          background-size: px2vw(36) px2vw(36);
        }
        &:last-child {
          background: url("../../../images/salePersonal/setting.png") px2vw(20) center no-repeat;
          background-size: px2vw(36) px2vw(36);
        }
      }
    }
    .logout-btn-container {
      background-color: #fff;
      padding: px2vw(90) px2vw(80) 0;
      .logout-btn {
        border-radius: px2vw(70);
        height: px2vw(70);
      }
    }
  }
</style>
