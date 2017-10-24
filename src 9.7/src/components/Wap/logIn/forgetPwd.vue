<template>
  <div class="forgetPwd">
    <div class="logIn_header">
      <div class="header_box" @click="back">
        <img class="header_back" src="../../../images/logIn/back.png" alt="img">
      </div>
      <span class="logWithCode">忘记密码</span>
    </div>
    <div class="mobilePhone_box">
      <input class="mobilePhone" v-model="mobilePhone" type="text" placeholder="手机号">
      <transition name="shake">
          <p v-show="mPhone_alert" class="error">请输入正确的手机号!</p>
      </transition>
    </div>
    <div class="identify_box">
      <input class="identify" v-model="identifyCode" type="text" placeholder="验证码"> 
      <mu-raised-button :label="Yzm" class="getCode" @click="hasYzm()" v-if="hYzm"/>
      <button class="getCode" style="background-color: #C8C8C8;" v-else disabled>{{Yzm1}}</button>
      <transition name="shake">
          <p v-show="mIdenti_alert" class="error">请输入正确的验证码!</p>
      </transition>
    </div>
    <div class="pwd_box">
      <input class="pwd" v-model="password" type="password" placeholder="密码"> 
      <transition name="shake">
          <p v-show="pwd_alert" class="error">请输入有效的密码! 密码长度需在6到16位之间</p>
      </transition>
    </div>
    <div class="confirm_box">
      <input class="confirm" v-model="confirmPwd" type="password" placeholder="确认密码">
      <transition name="shake">
          <p v-show="confirm_alert" class="error">设置密码与确认密码不一致!</p>
      </transition>
    </div>
    <mu-raised-button label="确认" class="logIn_btn" @click="confirm"/>
  </div>
</template>

<script>
var crypto = require('crypto');
import { Toast } from 'mint-ui';
import { tokenMethods } from '../../../vuex/util'
export default {
  name: 'forgetPwd',
  data () {
    return {
      mobilePhone: '',
      identifyCode: '',
      password: '',
      confirmPwd: '',
      mPhone_alert: false,
      mIdenti_alert: false,
      pwd_alert: false,
      confirm_alert: false,
      hYzm: true,
      Yzm: '获取验证码',
      Yzm1: '',
    }
  },
  created: function() {
    var that = this
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
    //监听短信登录验证码验证
    identifyCode: function() {
      var that = this;
      if (that.identifyCode !== '' && that.identifyCode.length >= 4) {
        that.mIdenti_alert = false;
      }
    },
    //监听密码登录密码验证
    password: function() {
      var that = this;
      if (that.password.length>5 && that.password.length<17 && that.password !== '') {
        that.pwd_alert = false;
      }
    },
    //监听忘记密码确认密码验证
    confirmPwd: function() {
      var that = this;
      if (that.confirmPwd == that.password && that.confirmPwd !== '') {
        that.confirm_alert = false;
      }
    },
  },
  methods: {
    // 确认
    confirm: function() {
      var that = this
      var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      if(!mb.test(that.mobilePhone) || that.mobilePhone == '') {
        that.mPhone_alert = true
        return false
      }
      if(that.identifyCode == '' || that.identifyCode.length < 4) {
        that.mIdenti_alert = true;
        return false
      }
      if(that.password.length<6 || that.password.length>16 || that.password== '') {
        that.pwd_alert = true;
        return false
      }
      if(that.confirmPwd !== that.password || that.confirmPwd == '') {
        that.confirm_alert = true;
        return false
      }
      var md5sum = crypto.createHash('md5');
      md5sum.update(that.password);
      var str = md5sum.digest('hex');
      var obj = {
        phone: that.mobilePhone,
        password: str,
        code: that.identifyCode,
      }
      that.$store.dispatch('GET_FORGETCODE', obj).then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          that.mobilePhone = '';
          that.identifyCode = '';
          that.password = '';
          that.confirmPwd = '';
          that.$router.push({ path: '/logIn'})
          Toast({message: '重设密码成功！请登录', duration: 3000})
        } else {
          Toast({message: res.data.msg, duration: 3000})
        }
      })
    },
    // 获取验证码
    hasYzm: function() {
      var that = this
      var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      var sec = 60;
      if (that.mobilePhone == '' || !mb.test(that.mobilePhone)) {
        that.mPhone_alert = true
        return false
      } else {
        var obj = {phone: that.mobilePhone}
        that.$store.dispatch('GET_IDENTICODE', obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            for (let i = 0; i <= 60; i++) {
              window.setTimeout(function () {
                if (sec != 0) {
                  that.hYzm = false;
                  that.Yzm1 = sec + "秒后重发验证";
                  sec--;
                } else {
                  sec = 60;//如果倒计时结束就让  获取验证码显示出来
                  that.hYzm = true;
                  that.Yzm = '获取验证码';
                }
              }, i * 1000)
            }
          } else {
            that.$message.error('获取验证码失败！');
          }
        })
      }
    },
    back: function() {
      this.$router.go(-1)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .error {
    position: absolute;
    left: px2vw(90);
    font-size: px2vw(26);
    color: #cb1700;
  }
  .logIn_header {
    width: 100vw;
    height: px2vw(88);
    line-height: px2vw(88);
    position: relative;
    padding-bottom: 10vw;
    border-bottom:  px2vw(1) solid $borderColor;
    margin-bottom: px2vw(59);
    background-color: $themeColor;
    .header_back {
      width: px2vw(18);
      height: px2vw(29);
      margin-left: 2vw;
      margin-top: 4vw;
    }
    .header_box {
      width: px2vw(70);
      height: px2vw(73);
      float: left;
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
  .mobilePhone_box {
    text-align: center;
    margin-top: px2vw(69);
    .mobilePhone{
      width: px2vw(580);
      height: px2vw(90);
      border: 1px solid $borderColor;
      padding-left: px2vw(40);
      color: #333333;
    }
    .mobilePhone:focus,.pwd:focus{
      border: 1px solid $themeColor !important;
    }
  }
  .identify_box {
    width: px2vw(580);
    height: px2vw(90);
    margin: auto;
    text-align: center;
    margin-top: px2vw(59);
    margin-bottom: px2vw(59);
    .identify {
      width: px2vw(370);
      height: px2vw(90);
      border: 1px solid $borderColor;
      padding-left: px2vw(40);
      color: #333333;
    }
    .getCode {
      display: inline-block;
      width: px2vw(190);
      height: px2vw(90);
      line-height: px2vw(90);
      background-color: $themeColor;
      color: #fff;
      text-align: center;
      font-size: px2vw(23);
      transform: translateY(-2%);
      margin-left: px2vw(10);
    }
  }
  .pwd_box {
    text-align: center;
    margin-top: px2vw(59);
    margin-bottom: px2vw(59);
    .pwd {
      width: px2vw(580);
      height: px2vw(90);
      border: 1px solid $borderColor;
      padding-left: px2vw(40);
      color: #333333;
    }
  }
  .confirm_box {
    text-align: center;
    margin-top: px2vw(59);
    margin-bottom: px2vw(129);
    .confirm {
      width: px2vw(580);
      height: px2vw(90);
      border: 1px solid $borderColor;
      padding-left: px2vw(40);
      color: #333333;
    }
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
</style>

