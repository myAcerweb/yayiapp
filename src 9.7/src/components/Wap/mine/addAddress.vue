<template>
  <div>
    <div class="header_top">
      <div @click="toBack" class="img_box_img">
        <img class="header_img"  src="../../../images/logIn/back.png" alt="">
      </div>
      <div class="header">
        {{title}}
      </div>
      <span class="save" @click="saveData">
          保存
      </span>
    </div>

    <!--地址栏开始-->
    <div class="addressR">
      <input v-model="addressData.receiverName" type="text" placeholder="收货人">
    </div>
    <div class="addressR">
      <input v-model="addressData.phone" type="text" placeholder="联系电话">
    </div>
    <div @click="openPicker('cityAddressPicker')" class="addressR">
      <input class="city" v-model="addressR" type="text" placeholder="所在地区" disabled="false">
      <img class="addressR_img" src="../../../images/mine/back.png" alt="">
    </div>
    <div class="addressR">
      <input v-model="addressData.receiverDetail" type="text" placeholder="详细地址">
    </div>

    <div class="addBox fontAddress">
      <!--<div class="checkboxFive">-->
        <!--<input v-model="addressData.isDefault" type="checkbox" id="checkboxFiveInput" name=""/>-->
        <!--<label for="checkboxFiveInput"></label>-->
      <!--</div>-->
      <div @click="changeColor" class="checkBox" :class="{'checkBoxColor': addressData.isDefault == false}">
        <div class="checkBox2"></div>
      </div>
        <span>
             设为默认地址
        </span>

    </div>
    <!--地址栏结束-->
    <!--城市选择框-->
    <address-picker ref="cityAddressPicker" @addresschange="saveAddress"></address-picker>
    <!--末尾-->
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  import {MessageBox} from 'mint-ui';
  import {tokenMethods} from '../../../vuex/util';
  import addressPicker from '../../wx_user/addressPicker.vue'
  import {Picker} from 'mint-ui';

  export default {
    data() {
      return {
        emptys: '',//判断是添加 或者 修改
        title: '',
        addressData: {},
        addressR: '',
        isToGoAddress: '',
      }
    },
    created: function () {
      console.log(this.$store.state.index.address);
      if (this.$store.state.index.address == 0) {

        this.emptys = true;
        this.title = "添加地址";
        this.addressData.receiverName = '';
        this.addressData.phone = '';
        this.addressData.city = '';
        this.addressData.county = '';
        this.addressData.receiverDetail = '';
        this.addressData.isDefault = false;
        this.isToGoAddress = true
      }
      else if(this.$store.state.index.address == 1)
      {
        this.emptys = true;
        this.title = "添加地址";
        this.addressData.receiverName = '';
        this.addressData.phone = '';
        this.addressData.city = '';
        this.addressData.county = '';
        this.addressData.receiverDetail = '';
        this.addressData.isDefault = false;
        this.isToGoAddress = false
      }
      else {
        this.emptys = false;
        this.title = "编辑地址";
        this.addressData = this.$store.state.index.address;
        this.addressR = this.addressData.city + this.addressData.county;
      }
    },
    methods: {
      saveData() {
        if (this.emptys == false) {
          let that = this;
          MessageBox.confirm('确定保存此地址吗?').then(action => {
            var obj = {
              token: tokenMethods.getWapToken(),
              receiverId: that.addressData.receiverId,
              province: that.addressData.province,
              city: that.addressData.city,
              county: that.addressData.county,
              receiverName: that.addressData.receiverName,
              receiverDetail: that.addressData.receiverDetail,
              landlineNumber: that.addressData.landlineNumber,
              phone: that.addressData.phone,
              isDefault: that.addressData.isDefault,
            }
            that.$store.dispatch('EDIT_ADDRESS', obj).then((res) => {
              if (res.data.callStatus === 'SUCCEED') {
                Toast('成功保存地址!');
                this.$router.push({path:'/address'})
              }
            })
          }).catch(err => {
            Toast('保存地址失败!');
          })
        }
        //保存地址信息
        else {
          MessageBox.confirm('确定保存此地址吗?').then(action => {
            var that = this;
            var obj = {
              token: tokenMethods.getWapToken(),
              province: that.addressData.province,
              city: that.addressData.city,
              county: that.addressData.county,
              receiverName: that.addressData.receiverName,
              receiverDetail: that.addressData.receiverDetail,
              landlineNumber: that.addressData.landlineNumber,
              phone: that.addressData.phone,
              isDefault: that.addressData.isDefault,
            }
            that.$store.dispatch('SAVE_ADDRESS', obj).then((res) => {
              if (res.data.callStatus === 'SUCCEED') {
                Toast('成功保存地址!');
                if(this.isToGoAddress)
                {
                  this.$router.push({path:'/address'})
                }else {
                  this.$router.push({path:'/confirmAddress'})
                }
              }
            })
          }).catch(err => {
            Toast('保存地址失败!');
          })
        }
      },
      saveAddress(e) {
        let addr = e.split(' ')
        this.addressR = addr[0] + addr[1] + addr[2];
        this.addressData.province = addr[0];
        this.addressData.city = addr[1];
        this.addressData.county = addr[2];
      },
      openPicker(name) {
        this.$refs[name].open()
      },
      changeColor(){
        this.addressData.isDefault = !this.addressData.isDefault
        console.log(this.addressData.isDefault);
      },
      toBack() {
        if(this.$store.state.index.addressBack == 1)
        {
          this.$store.state.index.addressBack = 0;
          this.$router.push({path:'/suborder'});
        }
        else {
          this.$router.go(-1)
        }

      }
    },
    components: {
      addressPicker
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .header {
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
    color: white;
  }

  .img_box_img{
    width: px2vw(100);
    height: px2vw(88);
  }
  .header_img {
    width: 2.4vw;
    height: 3.86667vw;
    margin-left: 2vw;
    margin-top: px2vw(27);
    float: left;
  }

  .header_top {
    width: 100vw;
    background-color: $themeColor;
    height: px2vw(88);
    border-bottom: px2vw(1) solid $borderColor;
  }

  input:disabled{
    color:#333;
    opacity: 1;
    -webkit-text-fill-color: #333;
  }
  .save {
    color: white;
    font-size: 3.76666vw;
    position: absolute;
    right: 2.933333vw;
    top:px2vw(14);
    padding: px2vw(10) 0 0 px2vw(10);
  }

  .addressR {
    font-size: 3.733333vw;
    padding: px2vw(30) 2.6666667vw;
    border-bottom: px2vw(1) solid $borderColor;
  }
  .addressR input {
    border: none;
    padding: 0;
    outline: medium;
    width: 80vw;
    margin-bottom: 0;
  }

  .addressR_img {
    margin-top: px2vw(8);
    margin-right: 1vw;
    float: right;
    width: 2vw;
    height: px2vw(25);
  }

  .city[disabled] {
    background: white;
    color: black;
  }

  .addBox {
    margin-top: px2vw(30);
    position: relative;
  }

  .addBox span {
    margin-left: 8.2vw;
    vertical-align: middle;
  }

  .fontAddress {
    color: $themeColor;
    font-size: 3.7333333vw;
  }

  .checkBox {
    position: absolute;
    left: px2vw(20);
    top:px2vw(9);
    display: inline-block;
    width: px2vw(31);
    height: px2vw(31);
    background-color: $themeColor;
    border-radius: 50%;
    border: px2vw(1) solid $themeColor;
  }
  .checkBox2{
    position: absolute;
    top:px2vw(8);
    left: px2vw(2);
    width: px2vw(25);
    height: px2vw(8);
    background: transparent;
    border: px2vw(2) solid white;
    border-top: none;
    border-right: none;
    -webkit-transform: rotate(-48deg);
    -moz-transform: rotate(-48deg);
    -o-transform: rotate(-48deg);
    -ms-transform: rotate(-48deg);
    transform: rotate(-48deg);
  }
  .checkBoxColor{
    background-color: white !important;
  }
</style>

