<template>
  <div class="salesCustomer">
    <salesHeader headerText="发现客户"></salesHeader>
    <div class="login">
      <div class="loginBox">
        <span :class="{'changeColor': changeLoginColor}" class="loginFont" @click="btnLogined">已注册,待绑定</span>
        <span @click="btnNoLogin" :class="{'changeColor': !changeLoginColor}" class=" loginFonts">未注册</span>
        <div class="person_box">
          <img class="personImg" src="../../../images/salesWap/customer/person.png" alt="">
          <span class="personText" @click="toMyCoustomer">我的客户</span>
        </div>
      </div>
    </div>
    <!--搜索框开始-->
    <div class="searchBox">
      <div class="searchImgBox">
        <img class="searchImg" src="../../../images/salesWap/customer/search.png" alt="">
        <form class="fromInput">
        <input @click="searchClick($event)" v-model="searchText" placeholder="请输入联系人、手机号或者单位名称查询" type="search" class="searchInput">
        </form>
      </div>
    </div>
    <!--搜索框结束-->
    <!--详细信息开始-->
    <div class="top_warp">
    <div class="ms_wrap" v-for="item in loginData">
        <img src="../../../images/mine/topBackGround.png" class="ms_img" alt="">
      <div class="ms_right">
        <div class="ms_top">
          <span :class="{'changeFont': item.contacts == '暂无姓名'}" class="name">{{item.contacts}}</span>
          <span class="phone_name">(&nbsp;<img class="phoneImg" src="../../../images/salesWap/customer/phone.png" alt="">&nbsp;{{item.contactsPhone}})</span>
        </div>
        <div class="hospital_name_box">
          <span class="hospital_name">{{item.unitName}}</span>
        </div>
        <div class="ms_bottom">
          <img class="addressImg" src="../../../images/salesWap/customer/address.png" alt="">
          <div class="address_name">{{item.unitAddress}}</div>
        </div>
      </div>
    </div>
    </div>
    <!--详细信息结束-->

    <salesFooter bottomNav="customer"></salesFooter>
  </div>
</template>

<script type="text/ecmascript-6">
  import salesHeader from '../salesHeader.vue'
  import salesFooter from '../salesFooter.vue'
    export default {
      data () {
        return{
          changeLoginColor: true,
          isLogin : true , //判断是否注册
          searchText : '',
          loginData: [],
        }
      },
      created(){
        this.getLogined()
      },
      methods: {
        toMyCoustomer(){
          this.$router.push({path:'/myCustomer'})
        },
        searchClick(ev){
          console.log(ev);
          this.getLogined();
        },
        btnLogined () {
          this.changeLoginColor = true
          this.isLogin = true
          this.getLogined()
        },
        btnNoLogin () {
          this.changeLoginColor = false
          this.isLogin = false
          this.getLogined()
        },
        //获取已注册的信息
        getLogined(){
          let obj = {
            state : this.searchText,
            currentPage: '',
            numberPerPage: ''
          }
          if(this.isLogin)
          {
//            this.$store.dispatch('GET_LOGINED', obj).then((res) => {
//                this.loginData = res.data
//                console.log(this.loginData);
//            })
          }else {
            this.$store.dispatch('GET_NO_LOGINED', obj).then((res) => {
              for(let i = 0,len=res.data.length; i < len; i++)
              {
                let data = res.data[i];
                if(data.contacts.length == 0)
                {
                  res.data[i].contacts = '暂无姓名'
                }
                if(data.contactsPhone.length == 0)
                {
                  res.data[i].contactsPhone = '暂无联系电话'
                }
                if(data.unitAddress.length == 0)
                {
                  res.data[i].unitAddress = '暂无详细地址'
                }
                if(data.unitName.length == 0)
                {
                  res.data[i].unitName = '暂无单位名称'
                }
              }
              this.loginData = res.data
              console.log(this.loginData);
            })
          }

        }
      },
      components:{
        salesHeader,
        salesFooter
      }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../common/sass/factory";
    .salesCustomer{
      background: #e5e5e5;
      min-height: px2vw(1334);
    }
    .login{
      background-color: white;
      border-top: px2vw(10) solid $borderColor;
      font-size: px2vw(28);
      color: #666666;
      padding-bottom: px2vw(10);
    }
    .changeFont{
      font-size: px2vw(28) !important;
    }
    .loginBox{
      border-bottom:px2vw(1) solid $borderColor;
      margin-top: px2vw(22);
      padding-left: px2vw(21);
      padding-right: px2vw(21);
      height: px2vw(52);
    }

    .changeColor {
      color: $themeColor;
      font-size: px2vw(30);
      border-bottom: px2vw(2) solid $themeColor;
    }

    .loginFont {
      letter-spacing: px2vw(1);
      display: inline-block;
      width: px2vw(200);
      margin-right: px2vw(24);
      height: px2vw(51);
    }

    .loginFonts {
      letter-spacing: px2vw(1);
      height: px2vw(51);
      display: inline-block;
      width: px2vw(100);
    }

    .person_box {
      font-size: px2vw(30);
      color: $themeColor;
      float: right;
    }

    .personImg {
      width: px2vw(30);
      height: px2vw(24);
    }

    .personText {
      vertical-align: top;
    }

    .searchBox {
      background-color:#e5e5e5;
      padding: px2vw(10) px2vw(34);
    }
    .searchImgBox{
      padding: px2vw(10) px2vw(28);
      background-color: #f6f6f6;
      border-radius: px2vw(40);
    }

    .searchImg {
      vertical-align: middle;
      width: px2vw(30);
      height: px2vw(30);
    }

    input[type="search"]::-webkit-search-cancel-button{
      display: none;
    }
    .searchInput {
      -webkit-appearance: none;
      background: transparent;
      vertical-align: middle;
      outline: none;
      border: none;
      font-size: px2vw(28);
      width: px2vw(570);
      padding-top: 0;
      padding-bottom:0 ;
      padding-left: px2vw(15);
      margin-top: px2vw(4);
      margin-bottom: px2vw(4);
    }
    .fromInput{
      padding: 0;
      margin: 0;
      vertical-align: middle;
      width: px2vw(570);
      display: inline-block;
    }
    .salesHeader{
      position: static !important;
    }

    .ms_wrap {
      border-bottom: px2vw(1) solid $borderColor;
      background: white;
      padding: px2vw(30) px2vw(17) px2vw(20) px2vw(19);
    }

    .ms_img {
      width: px2vw(92);
      height: px2vw(92);
      border-radius: 100%;
      vertical-align: middle;
      margin-right: px2vw(23);
    }

    .phoneImg {
      vertical-align: middle;
      width: px2vw(20);
      height: px2vw(22);
    }

    .addressImg {
      vertical-align: middle;
      width: px2vw(20);
      height: px2vw(24);

    }

    .ms_right {
      display: inline-block;
      vertical-align: middle;
    }

    .name {
      font-size: px2vw(36);
    }

    .phone_name {
      color: #646464;
      font-size: px2vw(26);
    }
    .hospital_name{
      font-size: px2vw(26);
    }
    .address_name{
      display: inline-block;
      font-size: px2vw(26);
      color: #646464;
      width: px2vw(500);
      vertical-align: middle;
    }
    .hospital_name{
      font-size: px2vw(28);
    }

    .top_warp {
      margin-bottom: px2vw(106);
    }

    .hospital_name_box {
      margin-bottom: px2vw(8);
    }
</style>
