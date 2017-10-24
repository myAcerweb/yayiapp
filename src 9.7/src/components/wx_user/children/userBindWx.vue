<template>
  <div class="login-container">
    <div class="title">温馨提示 ：您的微信正在绑定牙医abc账号。绑定后，可直接微信登录牙医abc网站或创客系统。</div>
    <div class="type-container" v-if="showType">
      类型：&nbsp;&nbsp;&nbsp;
      <mt-button :type="userState === 'doctor'?'primary':'default'" @click="userState='doctor'" size="small" class="yayi-btn mt-components">我是牙医/门诊
      </mt-button>
      <mt-button :type="userState === 'sale'?'primary':'default'" @click="userState='sale'" size="small" class="ck-btn mt-components">我是客户代表
      </mt-button>
    </div>
    <div class="phone-container input-box">
      <mt-field class="phone" label="手机号：" type="tel" placeholder="请输入手机号" :state="phoneTest" v-model="phone" :attr="{ maxlength: 11 }"></mt-field>
    </div>
    <div class="code-container">
      <mt-field class="mt-components" label="验证码：" v-model="captcha" placeholder="请输入验证码" :attr="{ maxlength: 4 }">
        <mt-button class="code-btn mt-components" size="small" :disabled="captchaInfo !== '获取验证码'?true:false" :type="captchaInfo !== '获取验证码'?'default':'primary'" @click="getCaptcha">{{captchaInfo}}
        </mt-button>
      </mt-field>
    </div>
    <mt-button type="primary" class="nextStep" @click="nextStep">下一步</mt-button>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Toast, Indicator } from 'mint-ui'
  import { GET_LOGIN_CAPTCHA, WX_BIND_USER } from '../../../vuex/types'
  import { tokenMethods } from '../../../vuex/util'

  export default {
    data() {
      return {
        phone: '',
        captcha: '',
        captchaInfo: '获取验证码',
        userState: 'doctor',
        showType: true,
        openid: '',
        bindInfo: {},
        token: '',
        entry: '',
        salePhone: ''
      }
    },
    methods: {
      //获取验证码方法
      getCaptcha() {
        if (this.phoneTest !== 'success') {
          Toast({ message: '请检查手机号是否正确', duration: 3000 })
          return
        }
        Indicator.open()
        //倒计时
        this.computedRestTime()
        this.$store.dispatch(GET_LOGIN_CAPTCHA, { phone: this.phone })
          .then(res => {
            Indicator.close()
            if (res.errorCode === "No_Error") {
              Toast({ message: '验证码发送成功', duration: 3000 })
              return
            }
            Toast({ message: res.msg, duration: 3000 })
          })
          .catch(() => {
            Indicator.close()
            Toast({ message: '验证码获取出现异常', duration: 3000 })
          })
      },
      computedRestTime() {
        if (this.captchaInfo !== '获取验证码') return
        let num = 60
        let timer = setInterval(() => {
          num--;
          if (num <= 0) {
            this.captchaInfo = '获取验证码'
            clearInterval(timer)
          } else {
            this.captchaInfo = `请等待 ${num}s`
          }
        }, 1000)
      },
      nextStep() {
        //验证手机验证码
        if (!this.phone && !this.captcha) {
          Toast({ message: '请输入手机号和验证码', duration: 3000 })
          return
        }
        Indicator.open()
        if (this.userState === 'sale') {
          this.saleBind()
        } else {
          this.doctorBind()
        }
      },
      //创客绑定方法
      saleBind() {
        this.$store.dispatch(WX_BIND_USER, {
          phone: this.phone,
          verifyCode: this.captcha,
          //          openid: this.openid,
          type: '2'
        })
          .then(res => {
            Indicator.close()
            //表示验证码错误
            if (res.errorCode === 'Verify_Code_Error') {
              Toast({ message: '您输入的验证码有误，请重试！', duration: 3000 })
              this.captcha = ''
            }
            //表示用户不存在跳入注册页面
            else {
              this.$router.replace({
                path: '/wx_user/userRegisterWx',
                //需要验证码
                query: {
                  role: 'sale',
                  captcha: this.captcha,
                  phone: this.phone,
                  openid: this.openid,
                }
              })
            }
          })
          .catch(err => {
            Indicator.close()
            Toast({ message: `绑定出现异常`, duration: 3000 })
          })
      },
      //医生绑定方法
      doctorBind() {
        this.$store.dispatch(WX_BIND_USER, {
          phone: this.phone,
          verifyCode: this.captcha,
          //          openid: this.openid,
          type: '1',
          salePhone: this.salePhone
        })
          .then(res => {
            Indicator.close()
            if (res.errorCode === 'Verify_Code_Error') {
              Toast({ message: '您输入的验证码有误，请重试！', duration: 3000 })
              this.captcha = ''
            }
            else {
              tokenMethods.setToken(res.token)
              this.$router.replace({
                path: '/wx_user/userRegisterWx',
                //需要验证码
                query: {
                  role: 'doctor',
                  captcha: this.captcha,
                  phone: this.phone,
                  openid: this.openid,
                  entry: this.entry,
                  salePhone: this.salePhone
                }
              })
            }
          })
          .catch(err => {
            console.log(err, 'userBind组件错误信息')
            Toast({ message: `绑定出现异常`, duration: 3000 })
          })
      },
      //扫码绑定登录方式的初始化方法
      qrCodeInit() {
        this.showType = false
        this.salePhone = this.$route.query.salePhone
        this.entry = this.$route.query.entry
      },
      saleInit() {
        this.userState = 'sale'
      }
    },
    computed: {
      //验证手机信息
      phoneTest() {
        var phone = +this.phone;
        var pattern = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (pattern.test(phone)) {
          return "success"
        } else if (phone === 0) {
          return '';
        }
        else {
          return "error"
        }
      }
    },
    created() {
      //判断query参数来展示类型
      if (this.$route.query.entry === 'qrcode') this.qrCodeInit()
      if (this.$route.query.role === 'sale') this.saleInit()
      //获取到openid值
      this.openid = this.$route.query.openid
    }
  }
</script>

<style>
  .login-container {
    padding: 0 5vw;
  }

  @media (max-width: 320px) {
    .login-container {
      padding: 0 2vw;
      font-size: 13px;
    }
  }

  @media (max-width: 320px) {
    .login-container .mt-components,
    .mint-cell-wrapper {
      font-size: 13px !important;
    }

    .mint-button {
      font-size: 13px !important;
    }
  }

  .login-container .type-container {
    margin: 3vh 0;
    padding-left: 3vw;
  }

  .login-container .phone-container {
    margin-top: 3vh;
  }

  .login-container .nextStep {
    width: 80vw;
    margin-left: 5vw;
    margin-top: 6vh;
  }

  @media (max-width: 320px) {
    .login-container .nextStep {
      margin-left: 10vw;
    }
  }

  .login-container .yayi-btn {
    margin-right: 5vw;
  }

  @media (max-width: 320px) {
    .login-container .yayi-btn {
      margin-right: 3vw;
    }
  }

  .login-container .title {
    color: #26a2ff;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 6vh;
  }
</style>

