<template>
  <div class="logIn">
    <div class="logIn_header">
      <div class="header_box" @click="back">
        <img class="header_back" src="../../../images/logIn/back.png" alt="img">
      </div>
      <span class="logWithCode">登录</span>
    </div>
    <div class="content_wrap">
    	<div style="border-bottom: 1px solid #f1f1f1;">
    		<mu-tabs :value="activeTab" @change="handleTabChange" class="tab_btns">
        <mu-tab :class="{ active: isActive1}" value="tab1" title="密码登录" />
        <mu-tab :class="{ active: isActive2}" value="tab2" title="短信登录" />
      </mu-tabs>
    	</div>
      <div v-if="activeTab === 'tab1'">
        <div class="mobilePhone_box">
          <input class="mobilePhone" v-model="mobilePhone" type="text" placeholder="请输入手机号">
          <transition name="shake">
             <p v-show="mPhone_alert" class="error">请输入正确的手机号!</p>
          </transition>
        </div>
        <div class="pwd_box">
          <input class="pwd" v-model="password" type="password" placeholder="请输入密码">
          <transition name="shake">
              <p v-show="mPwd_alert" class="error">请输入正确的密码!</p>
          </transition>
        </div>
        <div class="forget_pwd" @click="forgetPwd">忘记密码?</div>
        <mu-raised-button label="登录" class="logIn_btn" @click="logIn"/>
        <div class="rg_btn" @click="register">注册</div>
      </div>
      <div v-if="activeTab === 'tab2'">
        <logMsg></logMsg>
      </div>
    </div>
    <!-- <div class="third_btn">其他方式登录</div>
    <img class="wx_btn" src="../../../images/saleman/wechart.png" alt="img"> -->
    <div class="third_btn">第三方账号登录</div>
    <img class="wx_btn" src="../../../images/logIn/wx.png" alt="img">
  </div>
</template>

<script>
var crypto = require('crypto')
import { Toast } from 'mint-ui'
import { tokenMethods } from '../../../vuex/util'
import { SALE_LOGIN } from '@vuex/types'
import logMsg from './logInMsg'
export default {
  name: 'logIn',
  data () {
    return {
      mobilePhone: '',
      password: '',
      mPhone_alert: false,
      mPwd_alert: false,
      activeTab: 'tab1',
      isActive1: false,
      isActive2: true,
    }
  },
  created: function() {
    var that = this
  },
  components: {
    logMsg,
  },
  watch: {
    //监听密码登录手机号验证
    mobilePhone: function() {
      var that = this
      var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/
      if (that.mobilePhone !== '' && mb.test(that.mobilePhone)) {
        that.mPhone_alert = false
      }
    },
    //监听密码登录密码验证
    password: function() {
      var that = this;
      if (that.password.length>5 && that.password.length<17 && that.password !== '') {
        that.mPwd_alert = false
      }
    },
  },
  methods: {
    handleTabChange (val) {
      var that = this
      that.activeTab = val
      if (that.activeTab === 'tab1') {
        that.isActive1 = false
        that.isActive2 = true
      } else {
        that.isActive1 = true
        that.isActive2 = false
      }
    },
    // 登录
    logIn: function() {
      var that = this
      var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      if(!mb.test(that.mobilePhone) || that.mobilePhone == '') {
        that.mPhone_alert = true
        return false
      }
      if(that.password.length<6 || that.password.length>16 || that.password== '') {
        that.mPwd_alert = true
        return false
      }
      var md5sum = crypto.createHash('md5')
      md5sum.update(that.password)
      var str = md5sum.digest('hex')
      var obj = {
        phone: that.mobilePhone,
        password: str,
      }
      that.$store.dispatch('sale/' + SALE_LOGIN, obj).then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          tokenMethods.setSalesToken(res.data.token)
          Toast({message: '登录成功', duration: 3000})
          that.mobilePhone = ''
          that.password = ''
          that.$router.push({ path: '/salesIndex'})
        } else {
          Toast({message: res.data.msg, duration: 3000})
        }
      })
    },
    // 忘记密码
    forgetPwd: function() {
      var that = this
      that.$router.push({ path: '/salesForgetPwd'})
    },
    register: function() {
      var that = this
      that.$router.push({ path: '/salesRegister'})
    },
    back: function() {
      this.$router.go(-1)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .mu-tab-link-highlight {
    background-color: $themeColor !important;
  }
</style>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .mu-tabs {
    background-color: #fff;
    color: $themeColor;
    width: px2vw(470);
    margin: auto;
  }
  .mu-tab-active,.mu-tab-link {
    color: $themeColor;
  }
  .active {
    color: #333;
  }
  .logIn{
  	position: absolute;
  	top: 0;
  	bottom:: 0;
  	background: #f3f6f6;
  }
  .logIn_header {
    width: 100vw;
    height: px2vw(88);
    line-height: px2vw(88);
    position: relative;
    padding-bottom: 10vw;
    border-bottom:  px2vw(1) solid $borderColor;
    text-align: center;
    background-color: $themeColor;
    .header_back {
      width: px2vw(18);
      height: px2vw(29);
      position: absolute;
      top: 50%;
      left: px2vw(30);
      transform: translate(0, -50%)
    }
    .registerCode{
    	position: absolute;
      top: 0;
      right: px2vw(20);
    	width: px2vw(200);
      height: px2vw(88);
      line-height: px2vw(88);
      display: inline-block;
      text-align: right;
      font-size: px2vw(30);
      color: #fff;
    }
    .logWithCode {
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
      font-size: px2vw(36);
      color: #fff;
    }
  }
  .content_wrap{
  	border-top: px2vw(9) solid #e5e5e5;
  	background: #f3f6f6;
  	.tab_btns{
  		background: #f3f6f6;
  	}
  }
  .mobilePhone,.pwd{
    width: px2vw(580);
    height: px2vw(90);
    border: 1px solid $borderColor;
    padding-left: px2vw(86);
    background: #f1f1f1;
    color: #333333;
  }
  .mobilePhone{
  	background: url(../../../images/saleman/reg_bg.png) 0 0 no-repeat, #f1f1f1;
  	background-size: px2vw(34);
  	background-position: px2vw(30) center;
  }
  .pwd{
  	background: url(../../../images/saleman/pwd_lock.png) 0 0 no-repeat, #f1f1f1;
  	background-size: px2vw(34);
  	background-position: px2vw(30) center;
  }
  .mobilePhone:focus,.pwd:focus{
    border: 1px solid $themeColor !important;
  }
  .mobilePhone_box {
    text-align: center;
    margin-top: px2vw(69);
  }
  .pwd_box {
    text-align: center;
    margin-top: px2vw(69);
  }
  .forget_pwd {
    width: px2vw(580);
    height: px2vw(90);
    font-size: px2vw(28);
    margin: auto;
    margin-top: 1vw;
    text-align: right;
    color: $themeColor;
  }
  .logIn_btn {
    width: px2vw(580);
    height: px2vw(90);
    line-height: px2vw(90);
    font-size: px2vw(34);
    background-color: $themeColor;
    color: #fff;
    margin: auto;
    text-align: center;
    box-shadow: 0 0 7px $themeColor;
    display: block;
  }
  .rg_btn {
    width: px2vw(580);
    height: px2vw(90);
    line-height: px2vw(90);
    font-size: px2vw(28);
    margin: auto;
    text-align: center;
    margin-bottom: px2vw(130);
  }
  .third_btn {
    width: px2vw(580);
    height: px2vw(90);
    line-height: px2vw(90);
    font-size: px2vw(28);
    margin: auto;
    margin-bottom: px2vw(80);
    text-align: center;
    position: relative;
  }
  .third_btn:before {
    position: absolute;
    top:  px2vw(44);
    left: 0px;
    width: px2vw(160);
    height: 1px;
    border: 1px solid $borderColor;
    content: "";
    background-color: $borderColor;
  }
  .third_btn:after {
    position: absolute;
    top: px2vw(44);
    right: 0px;
    width: px2vw(160);
    height: 1px;
    border: 1px solid $borderColor;
    content: "";
    background-color: $borderColor;
  }
  .wx_btn {
    display: block;
    width: px2vw(580);
    height: px2vw(90);
    line-height: px2vw(90);
    margin: auto;
    width: px2vw(64);
    height: px2vw(88);
  }
  .error {
    position: absolute;
    left: px2vw(90);
    font-size: px2vw(26);
    color: #cb1700;
  }
</style>

