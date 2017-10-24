<template>
  <div class="saleWithdraw-container">
    <sales-header headerText="余额提现"></sales-header>
    <div class="withdraw-pending" v-if="!withdrawSuccess">
      <p class="prompt-text">温馨提示：请仔细确认提现信息！</p>
      <div :class="['withdraw-container',{bank:saleInfo.postalType==='银行卡'}]" @click="goPage('withdrawSetting')"
           v-if="saleInfo.postalType">
        <div class="withdraw-pic-container">
          <img src="../../../../images/salePersonal/支付宝.png" alt="提款方式" v-if="saleInfo.postalType === '支付宝'">
          <img src="../../../../images/salePersonal/银联.png" alt="提款方式" v-else>
        </div>
        <div class="withdraw-text-container" v-if="saleInfo.postalType === '支付宝'">
          <p class="withdraw-text-item">开户者：{{saleInfo.openName}}</p>
          <p class="withdraw-text-item">支付宝账号：<span class="primary">{{saleInfo.accountNumber}}</span></p>
          <p class="withdraw-text-item"></p>
        </div>
        <div class="withdraw-text-container" v-else>
          <p class="withdraw-text-item">开户者：{{saleInfo.openName}}</p>
          <p class="withdraw-text-item">银行：{{saleInfo.bankName}}</p>
          <p class="withdraw-text-item">银行卡账号：<span class="primary">{{saleInfo.accountNumber}}</span></p>
        </div>
      </div>
      <div class="withdraw-none" @click="goPage('withdrawSetting')" v-else>
        请先完善提现的账户信息>
      </div>
      <div class="sale-confirm-container">
        <mt-field label="客服代表手机号" placeholder="请输入客服代表手机号" v-model="submitWitParams.phone"
                  :attr="{ maxlength: 11 }"></mt-field>
        <mt-field label="验证码" placeholder="请输入短信验证码" v-model="submitWitParams.vCode" :attr="{ maxlength: 4 }">
          <mu-raised-button :label="captchaBtnText"
                            :disabled="!(captchaBtnText==='获取验证码' || captchaBtnText === '再次发送')"
                            fullWidth :color="(captchaBtnText==='获取验证码' || captchaBtnText === '再次发送')?'#fff':'#333'"
                            :backgroundColor="(captchaBtnText==='获取验证码' || captchaBtnText === '再次发送')?'#005aab':'#e6e6e6'"
                            class="btn"
                            @click="getCaptcha"/>
        </mt-field>
      </div>
      <div class="withdraw-money-container">
        提现金额 ￥ <input type="text" placeholder="请输入提现金额" @change="testWithdrawMoney"
                      v-model.lazy="submitWitParams.moneyNnm" class="input-money"/>
        <p class="withdraw-conunt primary">可提现余额 ￥ {{saleInfo.money}}</p>
      </div>
      <div class="withdraw-btn-container">
        <mu-raised-button label="申请提现" fullWidth color="#fff" backgroundColor="#005aab" class="logout-btn"
                          @click="submitWithdraw"/>
      </div>
    </div>
    <div class="withdraw-success" v-else>
      <div class="withdraw-state">
        <div>
          <img src="../../../../images/salePersonal/withdraw-ico.png" alt="提现成功" class="success-icon">
        </div>
        <p class="success-prompt primary">提现申请成功！</p>
        <p class="success-info">（钱款将在1个工作日内到账）</p>
      </div>
      <div class="withdraw-info">
        <p class="primary">提现至</p>
        <p>类型：{{saleInfo.postalType}}</p>
        <p v-if="saleInfo.postalType === '银行卡'">银行：{{saleInfo.bankName}}</p>
        <p>开户者：{{saleInfo.openName}}</p>
        <p v-if="saleInfo.postalType === '银行卡'">银行卡账号：{{saleInfo.accountNumber}}</p>
        <p v-else>支付宝账号：{{saleInfo.accountNumber}}</p>
      </div>
      <div class="withdraw-money">
        <p class="primary">提现金额</p>
        <p>￥{{submitWitParams.moneyNnm}}</p>
      </div>
      <div class="withdraw-time">
        <p class="primary">申请日期</p>
        <p>{{withdrawTime}}</p>
      </div>
    </div>
    <sales-footer bottomNav="personal"></sales-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import salesHeader from '../../salesHeader.vue'
  import salesFooter from '../../salesFooter.vue'
  import {Toast, Indicator, MessageBox} from 'mint-ui'
  import {mapState, mapActions} from 'vuex'
  import {GET_SALE_CAPTCHA, SALE_SUBMIT_WITHDRAW} from '@vuex/types'
  import {tokenMethods} from '@vuex/util'

  export default {
    data() {
      return {
        submitWitParams: {
          phone: '',
          vCode: '',
          moneyNnm: '',
        },
        withdrawSuccess: false,
        withdrawTime: '',
        captchaBtnText: '获取验证码'
      }
    },
    components: {
      salesHeader,
      salesFooter
    },
    methods: {
      ...mapActions('sale', {
        GET_SALE_CAPTCHA,
        SALE_SUBMIT_WITHDRAW
      }),
      async getCaptcha() {
        let pattern = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/,
          res = null,
          params = {
            saleToken: tokenMethods.getSalesToken(),
            phone: this.submitWitParams.phone
          }
        if (!pattern.test(+this.submitWitParams.phone)) {
          Toast('您输入的手机号不正确')
          return
        }
        Indicator.open()
        try {
          res = await this[GET_SALE_CAPTCHA](params)
        }
        catch (e) {
          Indicator.close()
          Toast(e)
          return
        }
        Indicator.close()
        if (res.errorCode === 'No_Error') {
          Toast('验证码发送成功')
          this.toggleCaptchaBtnState()
        }
        else {
          Toast(res.msg)
        }
      },
      async submitWithdraw() {
        let submitWitParams = this.submitWitParams,
          res = null
        switch (true) {
          case !(/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(submitWitParams.phone)):
            Toast('您输入的手机号不正确')
            return
          case !submitWitParams.vCode || submitWitParams.vCode.length < 4:
            Toast('您输入的验证码不正确')
            return
          case submitWitParams.moneyNnm > this.saleInfo.money:
            Toast('您输入的余额超过上限')
            return
          default:
            break
        }
        try {
          await MessageBox.confirm('您确定此提现操作吗？')
        } catch (e) {
          return
        }
        //dispatch
        Indicator.open()
        res = await this[SALE_SUBMIT_WITHDRAW](submitWitParams).catch(e => Toast(e))
        if (res.errorCode === 'No_Error') {
          Toast('恭喜您提现成功')
          let d = new Date()
          this.withdrawTime = `${d.getFullYear()}年${(d.getMonth() + 1).toString().padStart(2, '0')}月${d.getDate().toString().padStart(2, '0')}日　　${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`
          this.withdrawSuccess = true
        } else {
          Toast(res.msg)
        }
      },
      toggleCaptchaBtnState() {
        //获取验证码按钮状态修改
        !(() => {
          let num = 60
          this.timer = setInterval(() => {
            this.captchaBtnText = `请等待${num}s`
            num--
            if (num === 0) {
              this.captchaBtnText = `再次发送`
              clearInterval(this.timer)
            }
          }, 1000)
        })()
      },
      testWithdrawMoney(e) {
        if (e.target.value > this.saleInfo.money) {
          Toast('您输入的余额超过上限')
          this.$set(this.submitWitParams, 'moneyNnm', this.saleInfo.money)
        }
      },
      goPage(name) {
        this.$router.push({name})
        window.scroll(0, 0)
      }
    },
    computed: {
      ...mapState('sale', {
        saleInfo: state => state.saleInfo
      })
    },
    created() {
      let {phone} = this.saleInfo
      this.$set(this.submitWitParams, 'phone', phone)
    },
    beforeDestroy() {
      clearInterval(this.timer)
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../../common/sass/factory";

  .saleWithdraw-container {
    background-color: #e5e5e5;
    padding-top: px2vw(88);
    font-size: px2vw(24);
    .withdraw-pending {
      @at-root .prompt-text {
        position: relative;
        background-color: #2a77c3;
        color: #fff;
        height: px2vw(60);
        line-height: px2vw(60);
        padding-left: px2vw(62);
        margin: px2vw(10) auto;
        &:before {
          content: '';
          position: absolute;
          top: px2vw(15);
          left: px2vw(20);
          width: px2vw(30);
          height: px2vw(30);
          background: url("../../../../images/salePersonal/waring.png") no-repeat;
          background-size: cover;
        }
      }
      @at-root .withdraw-container {
        position: relative;
        display: flex;
        background-color: #fff;
        padding: px2vw(55) px2vw(20);
        font-size: px2vw(28);
        color: #333;
        margin-bottom: px2vw(10);
        .withdraw-pic-container {
          flex: none;
          width: px2vw(84);
          height: px2vw(84);
          margin-right: px2vw(28);
        }

        .withdraw-text-container {
          .withdraw-text-item {
            line-height: 1.5;
            .primary {
              color: #005aab;
            }
          }
        }

        &:after {
          content: '修改>';
          position: absolute;
          top: px2vw(72);
          right: px2vw(20);
          font-size: px2vw(26);
        }

        &.bank {
          font-size: px2vw(26);
          padding-top: px2vw(46);
          padding-bottom: px2vw(44);
          .withdraw-pic-container {
            margin-top: px2vw(21);
          }
        }

      }
      @at-root .withdraw-none {
        height: px2vw(195);
        line-height: px2vw(195);
        text-align: center;
        font-size: px2vw(30);
        background-color: #fff;
        margin-bottom: px2vw(10);
      }
      @at-root .sale-confirm-container {
        margin-bottom: px2vw(10);
        .btn {
          border-radius: px2vw(10);
        }
      }
      @at-root .withdraw-money-container {
        position: relative;
        background-color: #fff;
        height: px2vw(206);
        line-height: px2vw(206);
        text-align: center;
        border-bottom: 1px solid $borderColor;
        font-size: px2vw(24);
        .input-money {
          height: px2vw(50);
          width: px2vw(322);
          border: 1px solid $borderColor;
        }

        .withdraw-conunt {
          position: absolute;
          bottom: px2vw(40);
          left: px2vw(280);
          font-size: px2vw(22);
          line-height: px2vw(22);
        }
      }
      @at-root .withdraw-btn-container {
        background-color: #fff;
        padding: px2vw(90) px2vw(80) px2vw(55);
        .logout-btn {
          border-radius: px2vw(70);
          height: px2vw(70);
        }
      }
    }
    .withdraw-success {
      background-color: #fff;
      padding-top: px2vw(52);
      @at-root .withdraw-state {
        text-align: center;
        line-height: 1.8;
        padding-bottom: px2vw(44);
        border-bottom: 1px solid $borderColor;
        .success-icon {
          width: px2vw(100);
          height: px2vw(100);
        }

        .success-prompt {
          font-size: px2vw(36);
        }

        .success-info {
          font-size: px2vw(24);
          color: #333;
        }
      }
      @at-root .withdraw-info,.withdraw-money,.withdraw-time {
        padding: px2vw(46) px2vw(22) px2vw(44);
        color: #333;
        font-size: px2vw(30);
        line-height: px2vw(60);
        border-bottom: 1px solid $borderColor;
      }

    }
    .primary {
      color: #005aab;
    }
    .mint-cell-text {
      color: #666;
      font-size: px2vw(24);
    }
    .mint-cell-value {
      color: #999;
      font-size: px2vw(24);
      .mint-field-core {
        line-height: 3.4;
      }
    }
  }
</style>
