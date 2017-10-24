<template>
  <div class="exchange">
    <div class="exchange_contain">
     <h3>优惠码</h3>
      <input type="text" placeholder="请输入优惠码" v-model="benefitCode">
    </div>
    <mu-raised-button label="立即兑换" class="exchange_btn" @click="nowUse"/>
  </div>
</template>
<script>
  import {tokenMethods} from '../../../vuex/util'
  import {Toast} from 'mint-ui'
  export default{
    data(){
      return {
        benefitCode: '',
      }
    },
    watch: {
    },
    methods: {
      //优惠码兑换乾币
      nowUse: function() {
        var that = this
        var obj = {
          benefitCode: that.benefitCode
        };
        //验证优惠码不能未空
        if( that.benefitCode == '') {
          Toast({message:'请输入优惠码！', duration: 3000})
          return false
        }
        that.$store.dispatch('QB_DISCOUNT', obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            Toast({message: '您已成功兑换'+ res.data.num +'乾币', duration: 3000})
            that.benefitCode = ''
            that.$store.state.index.qbBalance += res.data.num
            // var obj = {
            //   phone: tokenMethods.getWapUser().phone,
            //   token: tokenMethods.getWapToken()
            // }
            // //查询个人信息
            // that.$store.dispatch('GET_PERSON_LIST', obj).then((res) => {
            //   if (res.data.callStatus === 'SUCCEED') {
            //     that.$store.state.index.qbBalance = res.data.data.qbBalance
            //   }
            // })
          }else if(res.data.callStatus === 'FAILED'){
            Toast({message: res.data.msg, duration: 3000})
          }
        })
      }
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .exchange_contain{
    font-size: px2vw(30);
    margin: px2vw(30) px2vw(20);
  }
  .exchange_contain{
    margin: 0 px2vw(20);
  }
  .exchange_contain>h3{
    font-size: px2vw(32);
    margin-top: px2vw(20);
    margin-bottom: px2vw(20);
  }
  .exchange_contain>input{
    background: #f4f4f4;
    width: 100%;
    height: px2vw(100);
    border: 1px solid #fff;
    padding-left: px2vw(24);
  }
  .exchange_btn{
    display: block;
    font-size: 4.233333vw;
    width: 100vw;
    height: px2vw(90);
    position: fixed;
    bottom: 0;
    background-color: $themeColor;
    text-align: center;
    color: white;
    // background: #005aab;
    // width: 100%;
    // height: px2vw(90);
    // position: fixed;
    // left: 0;
    // bottom: 0;
    // font-size: px2vw(26);
    // color: white;
  }
</style>
