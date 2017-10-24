<template>
  <div class="qrcode-container">
    <div class="unbind-container" v-if="!isBind">
      该模块只对“客服代表”开放~
      若您是客服代表，请先
      <span @click="goBind" class="bindUser">“绑定账号”</span>
    </div>
    <div class="bind-container" v-if="isBind">
      <div class="qrcode-forbidden" v-if="!isSale">
        抱歉，该模块只对客服代表开放~
      </div>
      <div class="qrcode-content" id="login_container" v-if="isSale">
        <p class="text-info text-title">
          绑定客户方法：
        </p>
        <p class="text-info"> 方法1. 长按保存二维码图片并发送给客户，客户识别二维码然后注册绑定。</p>
        <p class="text-info"> 方法2. 客户直接扫描该二维码，然后注册绑定。</p>
        <p class="text-info"> 方法3. 点击右上角分享该链接给客户，客户点击链接然后注册绑定。</p>
        <div class="qrCode" ref="qrcode"></div>
        <!--todo 生成二维码-->
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {GET_USER_WX_STATE} from '../../vuex/types'
  import {Toast, Indicator} from 'mint-ui'
  import {tokenMethods} from '../../vuex/util'

  export default {
    data() {
      return {
        isBind: false,
        isSale: true,
        qrcode: null,
        salePhone: '',
      }
    },
    mounted() {
      this.getQueryObj()
      //请求微信openid值和绑定信息
      //扫码登录进来的
//      this.role = this.$route.query.role
      //获得入口方式
      this.entry = this.queryObj.entry || this.$route.query.entry
      console.log(this.entry, 'entry!!!!')
      Toast({message: '正在验证身份信息，请稍后', duration: 1000})
      Indicator.open()
      //请求微信openid值和绑定信息
      this.$store.dispatch(GET_USER_WX_STATE, {code: this.queryObj.code})
        .then(res => {
          Indicator.close()
          //获取openId
          this.openid = res.data.sNSUserInfo.openId
          //表示微信已经和用户绑定
          if (+res.data.sNSUserInfo.sign === 1) this.isBind = true
          //从查询字符串中获取到entry
          if (this.isBind) {
            //判断角色的两种doctor和sale
            if (+res.data.wXUserLibk.type === 1) this.isSale = false
            if (+res.data.wXUserLibk.type === 2) this.isSale = true
          }
          if (!this.isSale) return
          this.salePhone = res.data.saleInfo.phone
          this.wxShare()
          this.createQrCode()
        })
        .catch(err => {
          Toast({message: '请稍后', duration: 3000})
        })
    },
    methods: {
      wxShare() {
        var that = this
        $.ajax({
          url: 'http://47.93.48.111:8080/api/weixin/share',// 此处url请求地址需要替换成你自己实际项目中服务器数字签名服务地址
          type: 'post',
          data: {
            url: location.href.split('#')[0] // 将当前URL地址上传至服务器用于产生数字签名
          }
        }).done(function (res) {
          // console.log(location.href.split('#')[0],'url')
          var r = res.data
          // 开始配置微信JS-SDK
          wx.config({
            debug: false,
            appId: r.appId,
            timestamp: r.timestamp,
            nonceStr: r.nonceStr,
            signature: r.signature,
            jsApiList: [
              'checkJsApi',
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ',
              'onMenuShareWeibo',
              'hideMenuItems',
              'chooseImage'
            ]
          });
          wx.ready(function () {
            var sdata = {
              title: '牙医abc',
              desc: that.salePhone + '邀请您绑定牙医abc账号~',
              link: `http://www.yayiabc.com/get-weixin-code.html?appid=wx4b1a6fde77626a32&scope=snsapi_userinfo&state=${that.salePhone}&redirect_uri=http%3a%2f%2fwap.yayiabc.com%2f%23%2fwx_user`,
              imgUrl: 'http://oqhy88nu6.bkt.clouddn.com/loading1.png',
//              success: function () {
//                alert('分享成功 :)');
//              },
              cancel: function () {
                alert('分享出错 :(');
              }
            };
            wx.onMenuShareTimeline(sdata);
            wx.onMenuShareAppMessage(sdata);
          });
        })
      },
      goBind() {
        //todo 微信的绑定账号的链接
        console.log(this.openid)
//        window.location('http://www.yayiabc.com/get-weixin-code.html?appid=wx4b1a6fde77626a32&scope=snsapi_userinfo&state=123&redirect_uri=http%3a%2f%2fwww.yayiabc.com%3a99')
        this.$router.replace({
          name: "wx_user", query: {bindEntry: 'qrcode', openid: this.openid}
        })
      },
      //获取查询自符串并保存到bindInfo对象中
      getQueryObj() {
        //获取为网页查询字符串
        let queryObj = {}
        let query = window.location.search.split('?')[1] || ''
        query.replace(/(\w+)=(\w*)/g, ($1, $2, $3) => {
          queryObj[$2] = $3
        })
        this.queryObj = queryObj
      },
      //生成二维码
      createQrCode() {
        this.$nextTick(() => {
          let width = document.body.clientWidth
          this.qrcode = new this.QRCode(this.$refs.qrcode, {
            width: width * 0.7,
            height: width * 0.7
          })
          this.qrcode.makeCode(`http://www.yayiabc.com/get-weixin-code.html?appid=wx4b1a6fde77626a32&scope=snsapi_userinfo&state=${this.salePhone}&redirect_uri=http%3a%2f%2fwww.yayiabc.com%3a99%2f%23%2fwx_user`)
        })
      }
    }
  }
</script>

<style scoped>
  .unbind-container {
    margin-top: 30vh;
    padding: 0 15vw;
    font-size: 18px;
  }

  .bindUser {
    color: #5db7e7;
    cursor: pointer;
    font-weight: 900;
  }

  .bindUser:hover {
    text-decoration: underline;
  }

  .bind-container {
    margin-top: 20vh;
    padding: 0 15vw;
    font-size: 18px;
    font-weight: 900;
  }

  .bind-container .qrcode-forbidden {
    white-space: nowrap;
  }

  .qrcode-content {
    margin-top: -18vh;
  }

  .text-title {
    font-weight: 600;
    font-size: 18px;
    text-align: left;
  }

  .text-info {
    font-size: 15px;
    text-align: left;
    margin-bottom: 8px;
  }
</style>
