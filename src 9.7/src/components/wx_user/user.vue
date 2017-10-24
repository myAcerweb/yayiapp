<template>
  <div class="user-container">
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Toast, Indicator,MessageBox} from 'mint-ui'
  import {tokenMethods} from '../../vuex/util'
  import {GET_USER_WX_STATE} from '../../vuex/types'

  export default {
    data() {
      return {
        state: 0,
        queryObj: {},
        openid: '',
        phone: '',
        isBindSale: false,
        isBind: false,
        role: '',
        entry: '',
        _salePhone: '',
        saleName: ''
      }
    },
    methods: {
      //根据请求不同的state跳转不同的路由
      goChildrenRoute(isBind) {
        //跳转路由方法
        let goRouter = (url) => {
          this.$router.replace(url)
        }
        switch (true) {
          //表示已经绑定了
          case isBind:
            goRouter({
              path: '/wx_user/bindinfo',
              query: {
                role: this.role,
                phone: this.phone,
                salePhone: this.salePhone || this._salePhone,
                //表示需要判断的绑定销售代表
                isBindSale: this.isBindSale,
                entry: this.entry,
                //此token表示是从上一级路由传下来的或者从查看绑定接口去拿token,向绑定页面发送
                token: this.token,
                saleName: this.saleName
              }
            })
            break
          //表示手机号和微信未绑定
          case !isBind:
            goRouter({
              path: '/wx_user/userBindWx',
              query: {
                role: this.role,
                openid: this.openid,
                entry: this.entry,
                salePhone: this.salePhone || this._salePhone
              }
            })
            break
          default:
            Toast({message: '登录失败请稍后重试！', duration: 3000})
            break
        }
      },
      initQrcode() {
        if (this.queryObj.state.length === 11 && this.$route.query.bindEntry !== 'qrcode') {
          this.entry = 'qrcode'
          this._salePhone = this.queryObj.state.toString()
        }
      },
//      goChildrenRoute(state) {
//        //跳转路由方法
//        let goRouter = (url) => {
//          this.$router.replace(url)
//        }
//        switch (state) {
//          case '未绑定手机号,未注册':
//            this.title = '绑定牙医abc账号'
//            goRouter({path: '/wx_user/login', query: {role: 'doctor', openid: this.openid}})
//            break
//          case '未绑定手机号,已注册':
//            this.title = '绑定牙医abc账号'
//            goRouter({path: '/wx_user/login', query: {role: 'doctor', openid: this.openid}})
//            break
//          case '已绑定手机号(未绑定销售)，牙医':
//            this.title = '绑定账号'
//            goRouter({
//              path: '/wx_user/bindinfo',
//              query: {
//                role: 'doctor',
//                phone: this.phone,
//                customerPhone: this.customerPhone,
//                openid: this.openid,
//                isBind: this.isBind
//              }
//            })
//            break
//          case '已绑定手机号(已绑定销售)，牙医':
//            this.title = '绑定账号'
//            goRouter({path: '/wx_user/bindinfo', query: {role: 'doctor', bindInfo, openid: this.openid}})
//            break
//          case '未绑定手机号(未注册)，客户代表':
//            this.title = '绑定账号'
//            goRouter({path: '/wx_user/login', query: {role: 'sale', openid: this.openid}})
//            break
//          case '未绑定手机号(已注册)，客户代表':
//            this.title = '绑定账号'
//            goRouter({path: '/wx_user/bindinfo', query: {role: 'sale', bindInfo, openid: this.openid}})
//            break
//          default:
//            Toast({message: '登录失败请稍后重试！', duration: 3000})
//            this.title = '登录失败请稍后重试'
//            break
//        }
//      },

      //获取查询自符串并保存到queryObj对象中
      getQueryObj() {
        //获取为网页查询字符串
        let queryObj = {}
        let query = window.location.search.split('?')[1] || ''
        query.replace(/(\w+)=(\w*)/g, ($1, $2, $3) => {
          queryObj[$2] = $3;
        })
        this.queryObj = queryObj
      },
    },
    created() {
      Toast({message: '正在验证身份信息，请稍后', duration: 1000})
      //获取查询字符串中的code值
      this.getQueryObj()
      //扫码登录进来的
//      this.role = this.$route.query.role
      //获得入口方式
      this.initQrcode()
      //判断入口
      console.info('user组件中的query', this.$route.query)
      if (this.$route.query.bindEntry === 'qrcode') {
        this.entry = ''
        //todo 验证这步是否出现问题
        this.openid = this.$route.query.openid
        console.log(this.openid)
        this.goChildrenRoute(this.isBind)
      } else {
        //请求微信openid值和绑定信息
        Indicator.open()
        this.$store.dispatch(GET_USER_WX_STATE, {code: this.queryObj.code})
          .then(res => {
            Indicator.close()
            this.openid = res.data.sNSUserInfo.openId
            //表示微信已经和用户绑定
            if (+res.data.sNSUserInfo.sign === 1) this.isBind = true

            if (this.isBind) {
              //判断角色的两种doctor和sale
              if (+res.data.wXUserLibk.type === 1) this.role = 'doctor'
              if (+res.data.wXUserLibk.type === 2) this.role = 'sale'
              //获取到用户的一些信息 data可能为空
              let data = res.data.user
              if (data && data.saleinfo) this.isBindSale = true
              //TODO 这里写saleName
              if (data && data.saleinfo) this.saleName = data.saleinfo.trueName || '未知'
              if (data) {
                this.salePhone = data.saleinfo && data.saleinfo.phone
                this.phone = data.phone
              }
              if (this.role === 'sale') this.phone = res.data.saleInfo.phone
              tokenMethods.setToken(res.token)
              this.token = res.token
            }
            //根据绑定信息跳转路由
            this.goChildrenRoute(this.isBind)
          })
          .catch(err => {
            Toast({message: '身份验证出现问题，请稍后', duration: 3000})
            console.log(err)
//          setTimeout(() => {
//            this.$router.go(-1)
//          }, 5000)
          })
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .user-container {
    position: relative;
  }

  .content {
    margin-top: 6vh;
  }
</style>
