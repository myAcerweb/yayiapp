<template>
	<div>
		<div class="logIn_header">
      <div class="back-btn" @click="back">
        <img class="header_back" src="../../../images/logIn/back.png" alt="img">
      </div>
      <span class="logWithCode">注册</span>
    </div>
    <div class="form-wrap">
      <mt-field label="手机号*" class="first-field" placeholder="请输入您的手机号码" v-model="registerData.phone"></mt-field>
      <mt-field label="验证码*" v-model="registerData.rg_code" placeholder="请输入验证码" class="code-box">
      	<span class="code_btn" v-text="rg_Yzm" v-if="rg_hYzm" @click="rg_hasYzm(registerData.phone)"></span>
        <span class="code_btn" v-text="rg_Yzm1" v-else></span>
			</mt-field>
      <mt-field label="密码*" v-show="pwd_input" class="pwd_eye" type="password" placeholder="请输入密码" v-model="registerData.password">
        <div class="eye_btn" @click="tabpwdHandler">
          <img src="../../../images/saleman/eye.png" alt="密码">  
        </div>  
      </mt-field>
      <mt-field label="密码*" v-show="!pwd_input" class="pwd_eye" placeholder="请输入密码" v-model="registerData.password">
        <div class="eye_btn" @click="tabpwdHandler">
          <img src="../../../images/saleman/eye2.png" alt="密码">  
        </div>   
      </mt-field>
      <mt-field label="真实姓名*" placeholder="请输入真实姓名" v-model="registerData.trueName"></mt-field>
      <a class="mint-cell mint-field">
        <div class="mint-cell-wrapper" @click="sexVisible = true">
          <div class="mint-cell-text">
            <span>性别*</span>
          </div>
          <div class="mint-cell-value">
            <span v-text="registerData.sexText"></span>
          </div>
        </div>
      </a>
      <mt-field label="身份证号*" placeholder="请输入您的身份证号码" v-model="registerData.idCard"></mt-field>
      <mt-field label="工作单位*" placeholder="请输入单位名称" v-model="registerData.workUnit" disableClear></mt-field>
      <mt-field label="工作职位*" placeholder="请输入您的职位" v-model="registerData.workPosition" disableClear></mt-field>
      <a class="mint-cell mint-field">
        <div class="mint-cell-wrapper username" @click="openPicker('cityAddressPicker')">
          <div class="mint-cell-text">
            <span>所在地省市区*</span>
          </div>
          <div class="mint-cell-value">
            <span v-text="registerData.part"></span>
          </div>
        </div>
      </a>
      <mt-field label="详细地址*" placeholder="请输入单位的详细地址" v-model="registerData.address" disableClear></mt-field>
      <mt-field label="推荐人姓名" placeholder="请输入您的推荐人" v-model="registerData.referrals" disableClear></mt-field>
      <a class="mint-cell mint-field">
        <div class="mint-cell-wrapper needclick" @click="openPicker('birthDatePicker')">
          <div class="mint-cell-text">
            <span>出生日期</span>
          </div>
          <div class="mint-cell-value">
            <span v-text="registerData.birthday"></span>
          </div>
        </div>
      </a>
      <!-- <a class="mint-cell mint-field">
        <div class="mint-cell-wrapper" @click="typeVisible = true">
          <div class="mint-cell-text">
            <span>学历</span>
          </div>
          <div class="mint-cell-value">
            <span v-text="registerData.typeText"></span>
          </div>
        </div>
      </a> -->
      <mt-field label="学历" placeholder="请输入您的学历" v-model="registerData.education" disableClear></mt-field>
      <mt-field label="微信" placeholder="请输入您的微信号" v-model="registerData.weChar" disableClear></mt-field>
      <mt-field label="邮箱" placeholder="请输入您的邮箱" v-model="registerData.email" disableClear></mt-field>
      <div class="submit-wrap" @click="registerHandler">
        <mu-raised-button label="确认" class="demo-raised-button" primary/>
      </div>
      <!--性别-->
      <mt-actionsheet :actions="sexs" v-model="sexVisible" v-show="sexVisible" cancel-text="取消"></mt-actionsheet>
      <!--类型-->
      <!-- <mt-actionsheet :actions="types" v-model="typeVisible" v-show="typeVisible" cancel-text="取消"></mt-actionsheet>  -->
      <!--出生日期选择框-->
      <birth-date-picker ref="birthDatePicker" @birthdatechange="saveBirthDate"></birth-date-picker>
      <!--城市选择框-->
      <address-picker ref="cityAddressPicker" @addresschange="saveAddress"></address-picker>
    </div>
	</div>
</template>

<script>
  import { Picker } from 'mint-ui'
  import { Toast } from 'mint-ui'
  import { Indicator } from 'mint-ui'
  import { MessageBox } from 'mint-ui'
  import { Field } from 'mint-ui'
  import util from '../../../vuex/util'
  import { tokenMethods } from '../../../vuex/util'
  import birthDatePicker from '../../wx_user/birthDatePicker.vue'
  import addressPicker from '../../wx_user/addressPicker.vue'
  import {GET_UPLOAD_TOKEN, SALE_REGISTER, GET_SALE_IDENTICODE} from '../../../vuex/types'
  var crypto = require('crypto')
	export default{
		name: 'register',
		data(){
			return {
				sexVisible: false,
				typeVisible: false,
        rg_hYzm: true,
        rg_Yzm1: '',
        rg_Yzm: '获取验证码',
        pwd_input: true,
        registerData: {
        	phone: '',
        	rg_code: '',
        	password: '',
          trueName: '',
          sex: 1,
          sexText: '男',
          idCard: '',
          workUnit: '',
          workPosition: '',
          part: '北京/北京市/东城区',
          address: '',
          referrals: '',
          birthday: '1970-01-01',
          education: '',
          educationText: '',
          weChar: '',
          email: ''
        },
        sexs: [{
          name: '男',
          method: this.selectMan
        }, {
          name: '女',
          method: this.selectWoman
        }]
			}
		},
		components: {
      addressPicker,
      birthDatePicker
    },
		methods: {
      tabpwdHandler(){
        this.pwd_input = !this.pwd_input
      },
      registerHandler() {
        var params = {};
        var md5sum = crypto.createHash('md5')
        md5sum.update(this.registerData.password)
        var strPwd = md5sum.digest('hex')

        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        var idCardReg = /^(\d{15}|\d{17}[\dxX])$/;
        params = {
          phone: this.registerData.phone,
          code: this.registerData.rg_code,
          salePwd: strPwd,
          trueName: this.registerData.trueName,
          sex: this.registerData.sex,
          idCard: this.registerData.idCard,
          workUnit: this.registerData.workUnit,
          workPosition: this.registerData.workPosition,
          part: this.registerData.part,
          address: this.registerData.address,
          referrals: this.registerData.referrals,
          birthday: this.registerData.birthday,
          education: this.registerData.education,
          weChar: this.registerData.weChar,
          email: this.registerData.email
        }
        switch (true) {
          case !(this.registerData.phone && mb.test(this.registerData.phone)):
            Toast({message: '请输入正确的手机号', duration: 4000});
            return
          case !(this.registerData.rg_code && this.registerData.rg_code.length === 4):
            Toast({message: '请输入正确的验证码', duration: 4000});
            return
          case !(this.registerData.password && this.registerData.password.length>5 && this.registerData.password.length<17):
            Toast({message: '密码只能为6到16位', duration: 4000});
            return
          case !this.registerData.trueName:
            Toast({message: '请填写您的真实姓名', duration: 4000});
            return
          case !(this.registerData.idCard && idCardReg.test(this.registerData.idCard)):
            Toast({message: '请输入正确的身份证号码', duration: 4000});
            return
          case !this.registerData.workUnit:
            Toast({message: '请填写您的单位名称', duration: 4000});
            return
          case !this.registerData.workPosition:
            Toast({message: '请填写您的工作职位', duration: 4000});
            return
          case !this.registerData.part:
            Toast({message: '请选择您的单位所在地', duration: 4000});
            return
          case !this.registerData.address:
            Toast({message: '请填写您的单位详细地址', duration: 4000});
            return
          default:
            break
        }

        Indicator.open();
        this.$store.dispatch('sale/' + SALE_REGISTER, params).then(res => {
          Indicator.close()
          if (res.data.callStatus === 'SUCCEED') {
            tokenMethods.setSalesToken(res.data.token)
            Toast('恭喜您，注册成功')
            this.$router.push('/salesIndex')
          }else{
            Toast(res.data.msg)
          }
        })
      },
			rg_hasYzm(rg_mobilephone) {
        var that = this;
        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        var sec = 60;
        if (that.registerData.phone === '' || !mb.test(that.registerData.phone)) {
          Toast('请输入正确的手机号');
        } else {
          var params = { phone: that.registerData.phone }
          this.$store.dispatch('sale/' + GET_SALE_IDENTICODE, params).then(res => {
            for(let i=0; i<=60; i++) {
              window.setTimeout(function(){
                if (sec != 0) {
                  that.rg_hYzm = false;
                  that.rg_Yzm1 = sec + "秒后重发" ;
                  sec--;
                } else {
                  sec = 60;//如果倒计时结束就让  获取验证码显示出来
                  that.rg_hYzm = true;
                  that.rg_Yzm = '获取验证码';
                }
              }, i * 1000)
            }
          })
        }
      },
      openPicker(name) {
        this.$refs[name].open()
      },
      saveAddress(e) {
        let part = e.split(' ').join('/')
        this.registerData.part = part
      },
      saveBirthDate(value) {
        this.registerData.birthday = value
      },
      fillZero(val) {
        return val<10 ? '0'+ val : val
      },
      open(picker) {
        this.dateValue = this.personInfo.birthday
        this.$refs[picker].open()
      },
      selectMan() {
        this.registerData.sex = 1
        this.registerData.sexText = '男'
      },
      selectWoman() {
        this.registerData.sex = 2
        this.registerData.sexText = '女'
      },
			back() {
        this.$router.go(-1)
      }
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
	.form-wrap{
		padding: px2vw(88) px2vw(20);
    .code_btn{
      font-size: px2vw(26);
      color: #207bce;
    }
		.mint-cell-title, .mint-cell-text{
			min-width: 170px;
		}
    input[type="text"], input[type="password"]{
      border: none;
      padding: 0;
      margin: 0;
      font-size: px2vw(26);
    }
    .first-field{
      .mint-cell-wrapper{
        background-image: none;
      }
    }
	}
</style>
<style scoped lang="scss" rel="stylesheet/scss">
	@import "../../../common/sass/factory";
  .pwd_eye{
    .eye_btn{
      width: px2vw(88);
      height: px2vw(88);
      posiyion: relative;
      img{
        width: px2vw(30);
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }
    }
  }
  .back-btn{
    width: px2vw(88);
    height: px2vw(88);
    line-height: px2vw(88);
    position: relative;
    .header_back {
      width: px2vw(18);
      height: px2vw(29);
      position: absolute;
      top: 50%;
      left: px2vw(30);
      transform: translate(0, -50%)
    }
  }
  .submit-wrap{
    width: 100%;
    margin: px2vw(30) 0;
    text-align: center;
    .mu-raised-button{
      width: 100%;
      background-color: $themeColor;
    }
  }
	.logIn_header {
    width: 100vw;
    height: px2vw(88);
    line-height: px2vw(88);
    position: fixed;
    top: 0;
    z-index: 99;
    border-bottom:  px2vw(1) solid $borderColor;
    text-align: center;
    background-color: $themeColor;
    .logWithCode {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: px2vw(200);
      height: px2vw(88);
      line-height: px2vw(88);
      display: inline-block;
      text-align: center;
      font-size: px2vw(36);
      color: #fff;
    }
  }
</style>
