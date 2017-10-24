<template>
  <div class="address_wrap">
    <div class="backgrounder"></div>
    <div class="header_top">
      <div @click="toBack" class="header_img_box">
        <img class="header_img" src="../../../images/logIn/back.png" alt="">
      </div>
      <div class="header">
        收货地址
      </div>
    </div>
    <!--地址开始-->
    <div class="address_box" v-for="(item,index) in addressData">
      <div class="address">
        <div class="hovers">
          <span class="fontColor">{{item.receiverName}}</span>
          <span class="fontColor iphone">{{item.phone}}</span>
          <span class="default" v-if="item.isDefault">默认地址</span>
        </div>
        <p class="personAddress">{{item.city}}{{item.county}}{{item.receiverDetail}}</p>
        <div>
          <div class="img_box">
              <span class="size_img_left" @click="goToAddAddress(item)">
              <img class="size_img" src="../../../images/mine/update.png" alt="">
              <span class="edit">编辑</span>
              </span>
            <span class="size_img_left2">
              <img class="size_img" src="../../../images/mine/delete.png" alt="">
              <span class="delete" @click="deleteAddress(item.receiverId,index)">删除</span>
              </span>
          </div>
        </div>
      </div>
    </div>
    <!--地址结束-->

    <!--无地址显示图片-->
    <div v-show="addressData.length ==0" class="address_pic">
      <img  src="../../../images/mine/address_pic.png" alt="">
    </div>


    <!--添加地址开始-->
    <div class="addAddress" @click="goToAddAddress(0)">
      添加地址
    </div>
    <!--添加地址结束-->
    <!--末尾-->
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import { MessageBox } from 'mint-ui';
  import { tokenMethods } from '../../../vuex/util';
  export default {
    data(){
      return{
        addressData:''
      }
    },
    created: function () {
      this.getMyAddress();
      console.log(this.$store.state.index.address);
    },
    methods:{
      deleteAddress(receiverId,index){
        MessageBox.confirm('确定删除此地址吗?').then(action => {
          var obj = {
            receiverId: receiverId,
          };
          this.$store.dispatch('DEL_ADDRESS', obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              Toast('成功删除地址!');
              this.addressData.splice(index,1);
            }
          })
        }).catch(err => {
        })
      },
      getMyAddress: function() {
        var that = this;
        var obj = {
          token: tokenMethods.getWapToken(),
        };
        that.$store.dispatch('GET_ADDRESS', obj).then((res) => {
          console.log(res);
          if (res.callStatus === 'SUCCEED') {
            this.addressData = res.data;
            console.log(this.addressData);
          } else {
          }
        })
      },
      //编辑true  添加地址false
      goToAddAddress(item){
        this.$store.state.index.address = item;
        this.$router.push({path:'/addAddress'})
      },
      toBack(){
        if(this.$store.state.index.addressToGo == 1)
        {
          this.$store.state.index.addressToGo = 0;
          this.$router.push({path:'/confirmAddress'})
        }else {
          this.$router.push({path:'/yayi/mine'})
        }

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .address_wrap{
    margin-bottom: px2vw(113);
  }

  .header{
    position: absolute;
    top: px2vw(7);
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 80vw;
    height: px2vw(88);
    line-height: 9.73333vw;
    display: inline-block;
    text-align: center;
    font-size: 4.26667vw;
    color: white;
  }
  .header_img_box{
    width: px2vw(100);
    height: px2vw(88);
    position: absolute;
    left: px2vw(20);
    line-height:px2vw(98) ;
  }
  .header_img {
    width: 2.4vw;
    height: 3.86667vw;
  }
  .header_top {
    background-color: $themeColor;
    height: px2vw(88);
    border-bottom: px2vw(1) solid $borderColor;
  }

  .address {
    background-color: white;
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
    padding: px2vw(26) 0;
    border-bottom: 1px solid $borderColor;
  }

  .edit,.delete {
    color: #888888;
    font-size: 3.73333vw;
  }

  .size_img {
    vertical-align: text-bottom;
    width: px2vw(36);
    height: px2vw(36);
    margin-right: 4.2vw;
  }
  .size_img_left {
    margin-left: 14.5vw;
  }
  .size_img_left2{
    margin-left: 35vw;
  }

  .img_box {
    padding: px2vw(25) 0 0 0;
  }

  .address_box {
    border-bottom: px2vw(20) solid $borderColor;
  }

  .hovers {
    position: relative;
  }

  .addAddress {
    position: fixed;
    bottom: 0;
    padding: px2vw(35) 0 ;
    text-align: center;
    width: 100vw;
    background-color: $themeColor;
    color: white;
    font-size: 3.733333vw;
  }

  .backgrounder {
    position: fixed;
    top:0;
    width: 100vw;
    bottom: 0;
    background-color: $borderColor;
    z-index: -1;
  }
  .address_pic{
    width: px2vw(196);
    /*height: px2vw(145);*/
    position: fixed;
    top:px2vw(513);
    left: px2vw(277);
  }
  .address_pic>img{
    width: 100%;
  }
</style>

