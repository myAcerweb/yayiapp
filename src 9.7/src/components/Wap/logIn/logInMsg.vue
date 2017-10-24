<template>
  <div class="logInMsg">
    <div class="mobilePhone_box">
      <input class="mobilePhone" v-model="mobilePhone" type="text" placeholder="手机号">
      <transition name="shake">
          <p v-show="mPhone_alert" class="error">请输入正确的手机号!</p>
      </transition>
    </div>
    <div class="pwd_box">
      <input class="pwd" v-model="identifyCode" type="text" placeholder="验证码"> 
      <mu-raised-button :label="Yzm" class="getCode" @click="hasYzm()" v-if="hYzm"/>
<!--       <button class="getCode" @click="hasYzm()" v-if="hYzm">{{Yzm}}</button> -->
      <button class="getCode" style="background-color: #C8C8C8;" v-else disabled>{{Yzm1}}</button>
      <transition name="shake">
          <p v-show="mIdenti_alert" class="error">请输入正确的验证码!</p>
      </transition>
    </div>
    <mu-raised-button label="登录" class="logIn_btn" @click="logIn"/>
    <div class="rg_btn" @click="register">注册</div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import { tokenMethods } from '../../../vuex/util'
export default {
  name: 'logInMsg',
  data () {
    return {
      mobilePhone: '',
      identifyCode: '',
      mPhone_alert: false,
      mIdenti_alert: false,
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
  },
  methods: {
    // 登录
    logIn: function() {
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
      var obj = {
        phone: that.mobilePhone,
        code: that.identifyCode,
      }
      that.$store.dispatch('GET_LOGIN_MSG', obj).then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          tokenMethods.setWapToken(res.data.token)
          tokenMethods.setWapUser(res.data.data)
          Toast({message: '登录成功', duration: 3000})
          that.mobilePhone = ''
          that.identifyCode = ''
          that.$router.push({ path: '/'})
        } else {
          // if (res.data.msg == '') {
            
          // }
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
            Toast({message: res.data.msg, duration: 3000})
          }
        })
      }
    },
    logInCode : function() {
      var that = this
      that.$router.push({ path: '/logIn'})
    },
    back: function() {
      this.$router.go(-1)
    },
    register: function() {
      var that = this
      that.$router.push({ path: '/register'})
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .logIn_header {
    width: 100vw;
    height: px2vw(73);
    line-height: px2vw(73);
    position: relative;
    padding-bottom: 10vw;
    border-bottom:  px2vw(1) solid $borderColor;
    margin-bottom: px2vw(80);
  }
  .header_back {
    width: px2vw(18);
    height: px2vw(29);
    margin-left: 2vw;
    margin-top: 3vw;
  }
  .logWithCode {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: px2vw(200);
    height: px2vw(73);
    line-height: px2vw(73);
    display: inline-block;
    text-align: center;
    font-size: px2vw(36);
    color: #333;
  }
  .logWithMsg {
    float: right;
    font-size: px2vw(32);
    color: #999999;
    margin-right: 2vw;
  }
  .mobilePhone{
    width: px2vw(580);
    height: px2vw(90);
    border: 1px solid $borderColor;
    padding-left: px2vw(40);
    color: #333333;
  }
  .pwd {
    width: px2vw(370);
    height: px2vw(90);
    border: 1px solid $borderColor;
    padding-left: px2vw(40);
    color: #333333;
    // margin-right: px2vw(28);
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
  .mobilePhone:focus,.pwd:focus{
    border: 1px solid $themeColor !important;
  }
  .mobilePhone_box {
    text-align: center;
    margin-top: px2vw(69);
  }
  .pwd_box {
    width: px2vw(580);
    height: px2vw(90);
    margin: auto;
    text-align: center;
    margin-top: px2vw(69);
    margin-bottom: 13vw;
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
  .error {
    position: absolute;
    left: px2vw(90);
    font-size: px2vw(26);
    color: #cb1700;
  }
</style>
