<template>
  <div class="withdrawSetting">
    <sales-header headerText="提现方式"></sales-header>
    <dl class="account-type-list">
      <dt class="account-type-title">选择账户类型</dt>
      <dd @click="changePostalType('支付宝')" :class="['account-type-item',{active:params.postalType === '支付宝'}]">
        支付宝
      </dd>
      <dd @click="changePostalType('银行卡')" :class="['account-type-item',{active:params.postalType === '银行卡'}]">
        银行卡
      </dd>
    </dl>
    <div class="zfb-container" v-if="params.postalType==='银行卡'">
      <mt-field label="开户者姓名" placeholder="请输入银行卡开户者姓名" v-model="params.openName"></mt-field>
      <mt-field label="银行名称" placeholder="请输入银行名称" v-model="params.bankName"></mt-field>
      <mt-field label="银行卡账号" placeholder="请输入银行卡账号" v-model="params.accountNumber"></mt-field>
    </div>
    <div class="bank-container" v-if="params.postalType==='支付宝'">
      <mt-field label="开户者姓名" placeholder="请输入支付宝开户者姓名" v-model="params.openName"></mt-field>
      <mt-field label="支付宝账号" placeholder="请输入支付宝账号" v-model="params.accountNumber"></mt-field>
    </div>
    <div class="logout-btn-container">
      <mu-raised-button label="保存" fullWidth color="#fff" backgroundColor="#005aab" class="logout-btn"
                        @click="updatePostal"/>
    </div>
    <sales-footer bottomNav="personal"></sales-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import salesHeader from '../../salesHeader.vue'
  import salesFooter from '../../salesFooter.vue'
  import {SALE_UPDATE_POSTAL} from '@vuex/types'
  import {Toast, Indicator, MessageBox} from 'mint-ui'
  import {mapActions} from 'vuex'

  export default {
    components: {
      salesHeader,
      salesFooter
    },
    data() {
      return {
        params: {
          postalType: '支付宝',
          bankName: '',
          openName: '',
          accountNumber: ''
        }
      }
    },
    methods: {
      ...mapActions({
        updatePostalAction: `sale/${SALE_UPDATE_POSTAL}`
      }),
      changePostalType(type) {
        this.$set(this.params, 'postalType', type)
      },
      async updatePostal() {
        try {
          await MessageBox.confirm('您确定要更改提款信息吗？')
        }
        catch (e) {
          return
        }
        Indicator.open()
        let params = this.params
        switch (true) {
          case !params.openName && params.postalType === '支付宝':
            Toast('支付宝开户姓名不能为空')
            return
          case !params.accountNumber && params.postalType === '支付宝':
            Toast('支付宝账号不能为空')
            return
          case !params.openName && params.postalType === '银行卡':
            Toast('银行卡开户姓名不能为空')
            return
          case !params.bankName && params.postalType === '银行卡':
            Toast('银行名称不能为空')
            return
          case !params.accountNumber && params.postalType === '银行卡':
            Toast('银行卡账号不能为空')
            return
          default:
            break
        }
        let res = await this.updatePostalAction(params).catch(err => Toast(err))
        if (res.errorCode === 'No_Error') {
          Toast('提现设置成功')
          this.$router.push({name: 'salePersonal'})
        }
        else {
          Toast(res.msg)
        }
      }
    },
    created() {
      let {postalType, bankName, openName, accountNumber} = this.$store.state.sale.saleInfo
      if (postalType) Toast('您已设置过提现方式')
      this.params = {
        postalType,
        bankName,
        openName,
        accountNumber
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../../common/sass/factory";

  .withdrawSetting {
    padding-top: px2vw(88);
    background-color: #e5e5e5;
    color: #333;
    .account-type-list {
      padding-bottom: px2vw(22);
      margin-bottom: px2vw(10);
      background-color: #fff;
      .account-type-title {
        font-size: px2vw(24);
        height: px2vw(80);
        line-height: px2vw(80);
        padding-left: px2vw(20);
        border-bottom: 1px solid $borderColor;
      }
      .account-type-item {
        position: relative;
        height: px2vw(88);
        line-height: px2vw(88);
        padding-left: px2vw(88);
        border-bottom: 1px solid $borderColor;
        &:first-of-type {
          background: url("../../../../images/salePersonal/支付宝.png") px2vw(20) center no-repeat;
          background-size: px2vw(42) px2vw(42);
        }
        &:last-of-type {
          background: url("../../../../images/salePersonal/银联.png") px2vw(17) center no-repeat;
          background-size: px2vw(55) px2vw(33);
        }
        &.active:after {
          content: '';
          position: absolute;
          top: px2vw(35);
          right: px2vw(21);
          width: px2vw(26);
          height: px2vw(21);
          background: url("../../../../images/salePersonal/tick.png");
          background-size: cover;
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

    .mint-cell-text {
      color: #666;
      font-size: px2vw(30);
    }
    .mint-cell-value {
      color: #999;
      font-size: px2vw(24);
      .mint-field-core {
        line-height: 3;
      }
    }

  }
</style>
