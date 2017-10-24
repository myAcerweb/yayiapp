<template>
  <div>
    <div class="header_top">
      <div class="header_box" @click="toBack">
        <img class="header_img" src="../../../images/logIn/back.png" alt="">
      </div>
      <div class="header">
        选择收货地址
      </div>
      <span class="save" @click="toGoAddress">
          管理
      </span>
    </div>
    <!--地址开始-->
    <div class="address_box" @click="toGoAddressSelect(index)" v-for="(k,index) in addressData">
      <div class="address">
        <div class="hovers">
          <span class="fontColor">{{k.receiverName}}</span>
          <span class="fontColor iphone">{{k.phone}}</span>
          <span v-if="k.isDefault" class="default">默认地址</span>
        </div>
        <p class="personAddress">{{k.city}}{{k.county}}{{k.receiverDetail}}</p>
    </div>
    <!--地址结束-->
  </div>
    <!--末尾-->
  </div>
</template>

<script>
  import { tokenMethods } from '../../../vuex/util';
  export default {
    data(){
      return{
        addressData:''
      }
    },
    created () {
      this.getMyAddress();
    },
    methods:{
      //获取收货地址列表信息
      getMyAddress: function() {
        var that = this;
        var obj = {
          token: tokenMethods.getWapToken(),
        };
        that.$store.dispatch('GET_ADDRESS', obj).then((res) => {
          if (res.callStatus === 'SUCCEED') {
            this.addressData = res.data;
            if(this.addressData.length == 0)
            {
              this.$store.state.index.addressBack = 1;
              this.$store.state.index.address = 1;
              this.$router.push({path:'/addAddress'});
            }
          } else {
          }
        })
      },
      toGoAddressSelect(index){
        this.$store.dispatch('ADDRESS_SELECT', index);
        this.$router.push({path:'/suborder'});
      },
      toGoAddress(){
        this.$store.state.index.addressToGo = 1;
        this.$router.push({path:'/Address'});
      },
      toBack(){
        this.$router.push({path:'/suborder'});
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .header{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 80vw;
    height: px2vw(88);
    line-height: px2vw(88);
    display: inline-block;
    text-align: center;
    font-size: 4.26667vw;
    color: #fff;
  }
  .header_box {
    width: px2vw(70);
    height: px2vw(73);
    float: left;
  }
  .header_img {
    width: 2.4vw;
    height: 3.86667vw;
    margin-left: 2vw;
    margin-top: 4vw;
    float: left;
  }
  .header_top {
    height: px2vw(88);
    line-height: px2vw(88);
    border: px2vw(1) solid $borderColor;
    background-color: $themeColor;
  }

  .address {
    padding: px2vw(30) px2vw(20);
  }

  .fontColor {
    padding: px2vw(8) 0;
    color: #888888;
    font-size: 3.73333vw;
  }

  .iphone {
    margin-left: 10.2666666vw;
  }

  .default {
    position: absolute;
    right: 1vw;
    font-size: 3.73333vw;
    padding: px2vw(8);
    background-color: $themeColor;
    color: white;
  }

  .personAddress {
    font-size: 3.73333vw;
    padding: px2vw(26) 0 0 0;
  }
  .address_box {
    border-bottom: px2vw(20) solid $borderColor;
  }
  .hovers {
    position: relative;
  }
  .save {
    color: #fff;
    font-size: 3.76666vw;
    position: absolute;
    right: 2.933333vw;
  }

</style>

