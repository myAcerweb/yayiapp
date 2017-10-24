<template>
  <div class="bindinfo-container">
    <div class="bind-content" v-if="isSale || isBindSale">
      <h3 class="title">{{title}}</h3>
      <div class="info">已绑定的手机号：{{bind_phone}}</div>
      <p class="bind-text" v-if="!isSale">（目前App正在开发中，注册绑定完成即可电脑访问
        <strong style="color:#26a2ff">www.yayiabc.com </strong>进行商品购买操作。）
      </p>
      <p class="bind-text" v-if="isSale">(您的微信已成功绑定创客账号，可直接微信登录
        <strong style="color:#26a2ff">www.yayiabc.com/saleslog </strong>查看业绩等。)
      </p>
      <h3 class="title" v-if="isBindSale && !isSale">您的专属客服代表</h3>
      <div class="info" v-if="isBindSale && !isSale">客服代表手机号：{{salePhone}}</div>
      <p class="bind-saleName" v-if="isBindSale && !isSale">真实姓名：{{saleName}}</p>
    </div>
    <div class="unbind-content" v-if="!isSale && !isBindSale">
      <h3 class="title">{{title}}</h3>
      <h3 class="info">已绑定的手机号：{{bind_phone}}</h3>
      <p class="bind-text">（目前App正在开发中，注册绑定完成即可电脑访问
        <strong style="color:#26a2ff">www.yayiabc.com </strong>进行商品购买操作。）
      </p>
      <div class="bindtext-container">
        <div class="bindtext-info">选择您的专属客服代表</div>
        <mt-field label="" class="bindtext-input" placeholder="请输入客服代表手机号" type="tel" v-model="phone" :state="phoneTest" :attr="{ maxlength: 11 }"></mt-field>
      </div>
      <div class="saleName" v-show="saleName" :style="saleNameStyle">
        <span v-show="querySaleName">真实姓名：</span>{{saleName}}
      </div>
      <mt-button type="primary" class="enter" @click="bindPhone">确定</mt-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { QUERY_SALE_NAME, BIND_SALE } from '../../../vuex/types'
  import { Toast, Indicator } from 'mint-ui'
  import { tokenMethods } from '../../../vuex/util'

  export default {
    data() {
      return {
        title: '微信已成功绑定牙医账号!',
        bind_phone: '',
        salePhone: '',
        saleName: '',
        phone: '',
        isBindSale: false,
        isSale: false,
        token: '',
        querySaleName: true,
        saleNameStyle: {}
      }
    },
    methods: {
      bindPhone() {
        // 绑定手机号
        if (!this.querySaleName) {
          Toast({ message: '请输入正确的客服代表手机号', duration: 3000 })
          return
        }
        Indicator.open()
        this.$store.dispatch(BIND_SALE, {
          salePhone: this.phone,
          token: this.token
        })
          .then(res => {
            Indicator.close()
            if (res.callStatus === 'SUCCEED') {
              Toast({ message: '客服代表绑定成功', duration: 3000 })
              this.isBindSale = true
              this.salePhone = this.phone
            } else {
              Toast({ message: '客服代表绑定失败，请重试', duration: 3000 })
            }
          })
          .catch(err => {
            Indicator.close()
            console.error('bindSale组件错误信息', err)
            Toast({ message: '网络请求异常', duration: 3000 })
          })
      },
      _init() {
        //路由查询字符串
        let query = this.$route.query
        //判断是否绑定了销售代表
        if (query.isBindSale === 'true' || query.isBindSale === true) this.isBindSale = true
        //判断是否为销售代表，如果为销售代表则不会出现绑定顾客的信息
        if (query.role === 'sale') {
          this.isSale = true
          this.title = '微信已成功绑定创客系统的账号！'
        }
        this.bind_phone = query.phone
        this.salePhone = query.salePhone
        this.token = query.token
        tokenMethods.setToken(this.token)
        this.saleName = query.saleName
        //        打印query的值，查看是否正确
        //        console.log(query)
        //入口是扫描二维码
        if (query.entry === 'qrcode') {
          //销售的手机号，从扫描开始往下传
          //          this.salePhone = this.$route.query.salePhone
          this.phone = query.salePhone
          //token从user开始往下传
          this.token = query.token
          //直接调用绑定方法
          this.bindPhone()
        }
      }
    },
    watch: {
      phone(val, oldVal) {
        if (this.phoneTest !== 'success') {
          this.saleName = null
          return false
        }

        this.$store.dispatch(QUERY_SALE_NAME, { salePhone: val, state: 2, token: this.token })
          .then(res => {
            if (!res.data) {
              this.saleName = '很抱歉，未能查询到客服代表'
              this.saleNameStyle = { color: 'red', 'font-weight': 300 }
              this.querySaleName = false
            } else if (res.data && res.data.phone) {
              this.querySaleName = true
              this.saleNameStyle = { color: '#26a2ff' }
              this.saleName = res.data.true_name || '未知'
            } else {
              Toast({ message: res.data, duration: 3000 })
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    computed: {
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
      this._init()
    }
  }
</script>

<style scoped>
  .bindinfo-container {
    width: 100%;
  }

  .title {
    width: 100%;
    text-align: center;
    color: #26a2ff;
    line-height: 48px;
  }

  .bind-content .title {
    margin-top: 6vh;
  }

  .bind-text {
    font-size: 14px;
    text-align: center;
    margin: 2vh 0;
  }

  .info {
    text-align: center;
    font-weight: 600;
    font-size: 16px;
  }

  .bindtext-container {
    margin-top: 6vh;
    padding: 0 5vw;
  }

  .bindtext-info {
    font-size: 18px;
    text-indent: 3vw;
    margin-bottom: 3vh;
    font-weight: 600;
  }

  .saleName {
    text-indent: 8vw;
    margin-top: 3vh;
    font-weight: 600;
    color: #26a2ff;
  }

  .enter {
    width: 80vw;
    margin-left: 10vw;
    margin-top: 6vh;
  }

  .bind-saleName {
    font-weight: 600;
    margin-top: 1vh;
    text-align: center;
  }
</style>
