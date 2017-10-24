<template>
  <div class="userRegisterWx-container">
    <!--牙医身份表单区域-->
    <div class="user-container" v-if="!isSale">
      <p class="textPrompt">温馨提示 ：您的微信已成功牙医abc账号，可直接微信登录www.yayiabc.com购买商品。</p>
      <mt-field class="must-fill" label="真实姓名：" v-model="trueName" placeholder="请输入您的姓名"></mt-field>
      <mt-radio title="性别：" align="right" v-model="sex" :options="['男', '女']"></mt-radio>
      <mt-radio title="类型：" align="right" v-model="type" :options="['个人', '机构']"></mt-radio>
      <!--个人区域-->
      <div class="personal-container" v-if="type === '个人'">
        <mt-field label="出生日期：" v-model="birthday" placeholder="请选择出生日期">
          <mt-button type="primary" size="small" @click="openPicker('birthDatePicker')">+</mt-button>
        </mt-field>
        <mt-field class="must-fill" label="单位名称：" v-model="companyName" placeholder="请输入您的单位名称"></mt-field>
        <mt-field class="must-fill" label="地区：" v-model="part" placeholder="请选择所在地区">
          <mt-button type="primary" size="small" @click="openPicker('cityAddressPicker')">+</mt-button>
        </mt-field>
        <mt-field class="must-fill" label="详细地址：" v-model="workAddress" placeholder="请填写详细地址"></mt-field>
        <pic-upload @picupload="savePicUrl('doctorPic',$event)" :picResources="doctorPic" title="口腔执业医师资格证：" :isMust="true"></pic-upload>
      </div>
      <!--机构区域-->
      <div class="organization-container" v-if="type === '机构'">
        <mt-field label="出生日期：" v-model="birthday" placeholder="请选择出生日期">
          <mt-button type="primary" size="small" @click="openPicker('birthDatePicker')">+</mt-button>
        </mt-field>
        <mt-field class="must-fill" label="单位名称：" v-model="companyName" placeholder="请输入您的单位名称"></mt-field>
        <mt-field class="must-fill" label="地区：" v-model="part" placeholder="请选择所在地区">
          <mt-button type="primary" size="small" @click="openPicker('cityAddressPicker')">+</mt-button>
        </mt-field>
        <mt-field class="must-fill" label="详细地址：" v-model="workAddress" placeholder="请填写详细地址"></mt-field>
        <pic-upload @picupload="savePicUrl('medicalLicense',$event)" :picResources="medicalLicense" title="医疗机构执业许可证：" :isMust="true"></pic-upload>
        <pic-upload @picupload="savePicUrl('businessLicense',$event)" :picResources="businessLicense" title="营业执照：" :isMust="true"></pic-upload>
        <pic-upload @picupload="savePicUrl('taxRegistration',$event)" :picResources="taxRegistration" title="税务登记：" :isMust="true"></pic-upload>
        <pic-upload @picupload="savePicUrl('openingPermit',$event)" :picResources="openingPermit" title="开户许可证："></pic-upload>
        <pic-upload @picupload="savePicUrl('doctorPic',$event)" :picResources="doctorPic" title="医师执业资格证："></pic-upload>
        <pic-upload @picupload="savePicUrl('radiologicalPermit',$event)" :picResources="radiologicalPermit" title="放射诊疗许可证："></pic-upload>
        <pic-upload @picupload="savePicUrl('idCardPositive',$event)" :picResources="idCardPositive" title="法人身份证（正面）："></pic-upload>
        <pic-upload @picupload="savePicUrl('idCardOtherside',$event)" :picResources="idCardOtherside" title="法人身份证（反面）："></pic-upload>

      </div>
    </div>

    <!--创客身份表单区域-->
    <div class="sale-container" v-if="isSale">
      <p class="textPrompt">温馨提示 ：您的微信已成功绑定创客账号，可直接微信登录www.yayiabc.com/saleslog查看业绩等。</p>
      <div class="name">
        <mt-field class="must-fill" label="真实姓名：" v-model="trueName" placeholder="请输入您的姓名"></mt-field>
      </div>
      <div class="sex">
        <mt-radio title="性别：" align="right" v-model="sex" :options="['男', '女']"></mt-radio>
      </div>
      <mt-field class="must-fill" label="身份证号：" v-model="idCard" placeholder="请输入您的身份证号"></mt-field>
      <mt-field class="must-fill" label="工作单位：" v-model="workUnit" placeholder="请输入您的工作单位"></mt-field>
      <mt-field class="must-fill" label="工作职位：" v-model="workPosition" placeholder="请输入您的工作职位"></mt-field>
      <mt-field class="must-fill" label="地区：" v-model="part" placeholder="请选择所在地区">
        <!--<mt-palette-button content="+"-->
        <!--:mainButtonStyle="mainBtnStyle"-->
        <!--ref="addressBtn" @expanded="openPicker('cityAddressPicker')"></mt-palette-button>-->
        <mt-button type="primary" size="small" @click="openPicker('cityAddressPicker')">+</mt-button>
      </mt-field>
      <mt-field class="must-fill" label="详细地址：" v-model="address" placeholder="请填写详细地址"></mt-field>
      <mt-field label="推荐人姓名：" v-model="referrals" placeholder="请填写您的推荐人姓名"></mt-field>
      <mt-field label="出生日期：" v-model="birthday" placeholder="请选择出生日期">
        <!--<mt-palette-button content="+" :mainButtonStyle="mainBtnStyle" ref="birthBtn"-->
        <!--@expanded="openPicker('birthDatePicker')"></mt-palette-button>-->
        <mt-button type="primary" size="small" @click="openPicker('birthDatePicker')">+</mt-button>
      </mt-field>
      <mt-field label="学历：" v-model="education" placeholder="请填写您的学历"></mt-field>
      <mt-field label="微信号：" v-model="weChar" placeholder="请填写您的微信号"></mt-field>
      <mt-field label="邮箱：" v-model="email" placeholder="请填写您的邮箱"></mt-field>

      <div class="postalType-container ">
        <h3 class="title must-fill">提现设置</h3>
        <mt-radio title="类型：" align="right" v-model="postalType" :options="['支付宝', '银行卡']"></mt-radio>
        <div class="pay-container" v-if="postalType === '支付宝'">
          <mt-field class="must-fill" label="开户者：" v-model="openName" placeholder="请填写您的开户者"></mt-field>
          <mt-field class="must-fill" label="支付宝账号：" v-model="accountNumber" placeholder="请填写您的支付宝账号"></mt-field>
        </div>
        <div class="bank-container" v-if="postalType === '银行卡'">
          <mt-field class="must-fill" label="银行：" v-model="bankName" placeholder="请填写您的银行"></mt-field>
          <mt-field class="must-fill" label="开户者：" v-model="openName" placeholder="请填写您的开户账号"></mt-field>
          <mt-field class="must-fill" label="银行卡账号：" v-model="accountNumber" placeholder="请填写您的银行卡账号"></mt-field>
        </div>
      </div>
    </div>

    <mt-button class="enter-btn" type="primary" @click="enter" size="large">确定</mt-button>

    <!--出生日期选择框-->
    <birth-date-picker ref="birthDatePicker" @birthdatechange="saveBirthDate"></birth-date-picker>
    <!--城市选择框-->
    <address-picker ref="cityAddressPicker" @addresschange="savePart"></address-picker>
  </div>
</template>

<script type="text/ecmascript-6">
  import picUpload from '../pic-upload.vue'
  import addressPicker from '../addressPicker.vue'
  import birthDatePicker from '../birthDatePicker.vue'
  import { Toast } from 'mint-ui'
  import { GET_UPLOAD_TOKEN, UPDATE_USER_INFO, UPDATE_SALE_INFO } from '../../../vuex/types'
  import { tokenMethods } from '../../../vuex/util'


  export default {
    data() {
      return {
        isBindSale: false,
        phone: '',
        salePhone: '',
        saleName: '',
        token: '',
        isSale: false,
        trueName: '',
        sex: '男',
        type: '个人',
        workUnit: '',                               //工作单位（销售）
        companyName: '',                            //单位名称（个人）
        part: '',                                   //区域地址 （必填）
        workAddress: '',                            //详细地址 （用户）
        address: '',                                //详细地址 （销售）
        cityOpen: true,                             //城市选择框状态
        postalType: '支付宝',                        //提款类型
        birthday: '',                               //出生日期
        email: '',                                  //邮箱
        weChar: '',                                 //微信号
        education: '',                              //学历
        workPosition: '',                           //职位     （创客 必填）
        idCard: '',                                 //身份证号 （创客 必填）
        referrals: '',                               //推荐人姓名
        bankName: '',                               //银行 （银行 必填）
        openName: '',                               //支付宝或者银行开户人
        accountNumber: '',                          //银行卡或者账号（银行 必填）
        number: '',                                 //是否已经注册
        entry: '',
        /*图片变量信息*/
        businessLicense: '',                        //营业执照
        medicalLicense: '',                         //医疗许可证
        taxRegistration: '',                        //税务
        doctorPic: '',                              //医师执业资格证（机构）
        openingPermit: '',                          //开户许可证
        radiologicalPermit: '',                     //放射诊疗许可证
        idCardOtherside: '',                        //身份证反面
        idCardPositive: ''                         //身份证正面
      }
    },
    components: { picUpload, addressPicker, birthDatePicker },
    methods: {
      openPicker(type) {
        this.$refs[type].open()
      },
      savePart(e) {
        let part = e.split(' ').join(',')
        this.part = part
      },
      saveBirthDate(e) {
        this.birthday = e
      },
      savePicUrl(type, e) {
        switch (type) {
          case 'doctorPic':
            this.doctorPic = e
            break
          case 'businessLicense':
            this.businessLicense = e
            break
          case 'medicalLicense':
            this.medicalLicense = e
            break
          case 'taxRegistration':
            this.taxRegistration = e
            break
          case 'openingPermit':
            this.openingPermit = e
            break
          case 'radiologicalPermit':
            this.radiologicalPermit = e
            break
          case 'idCardPositive':
            this.idCardPositive = e
            break
          case 'idCardOtherside':
            this.idCardOtherside = e
            break
          default:
            break
        }
      },
      enter() {
        let params = {} //注册请求参数
        //判断身份
        if (this.isSale) {
          //销售员身份
          switch (true) {
            case !this.trueName:
              Toast({ message: '请填写您的真实姓名', duration: 4000 });
              return
            case !this.idCard:
              Toast({ message: '请填写您的身份证号', duration: 4000 });
              return
            case !this.workUnit:
              Toast({ message: '请填写您的工作单位', duration: 4000 });
              return
            case !this.workPosition:
              Toast({ message: '请填写您的工作职位', duration: 4000 });
              return
            case !this.part:
              Toast({ message: '请选择您所在的地区', duration: 4000 });
              return
            case !this.address:
              Toast({ message: '请填写您的详细地址', duration: 4000 });
              return
            default:
              break
          }
          params.trueName = this.trueName
          params.openid = this.openid
          params.phone = this.phone
          params.sex = (this.sex === '男' ? 1 : 2)
          params.idCard = this.idCard
          params.workUnit = this.workUnit
          params.workPosition = this.workPosition
          params.part = this.part
          params.address = this.address
          params.referrals = this.referrals
          params.birthday = this.birthday
          params.education = this.education
          params.weChar = this.weChar
          params.email = this.email
          params.number = this.number //表示是否已经注册
          params.postalType = this.postalType
          //创客提现验证
          if (this.postalType === '支付宝') {
            //            支付宝提现方式
            switch (true) {
              case !this.openName:
                Toast({ message: '请填写您支付宝的开户人', duration: 4000 });
                return
              case !this.accountNumber:
                Toast({ message: '请填写您支付宝账号', duration: 4000 });
                return
              default:
                break
            }
            params.openName = this.openName
            params.accountNumber = this.accountNumber
          }
          else {
            //银行提现方式
            switch (true) {
              case !this.openName:
                Toast({ message: '请填写您的银行开户人', duration: 4000 });
                return
              case !this.accountNumber:
                Toast({ message: '请填写您的银行卡账号', duration: 4000 });
                return
              case !this.bankName:
                Toast({ message: '请填写您的提现银行', duration: 4000 });
                return
              default:
                break
            }
            params.openName = this.openName
            params.accountNumber = this.accountNumber
            params.bankName = this.bankName
          }
          //todo 创客注册接口 执行跳转（可以不用带token）
          this.$store.dispatch(UPDATE_SALE_INFO, params).then(res => {
            tokenMethods.setToken((this.token || res.token))
            Toast({ message: '客服代表账号绑定成功', duration: 4000 })
            this.$router.replace({
              path: '/wx_user/bindinfo',
              query: { role: 'sale', phone: this.phone, token: (this.token || res.token) }
            })
          })
        }
        else {
          //牙医身份
          if (this.type === '机构') {
            //todo 牙医机构用户注册
            switch (true) {
              case !this.trueName:
                Toast({ message: '请填写您的真实姓名', duration: 4000 });
                return
              case !this.birthday:
                Toast({ message: '请填写您的真实姓名', duration: 4000 });
                return
              case !this.companyName:
                Toast({ message: '请填写您的单位名称', duration: 4000 });
                return
              case !this.part:
                Toast({ message: '请选择您的单位所在地', duration: 4000 });
                return
              case !this.workAddress:
                Toast({ message: '请填写您的单位详细地址', duration: 4000 });
                return
              case !this.medicalLicense:
                Toast({ message: '请上传您机构的医疗机构执业许可证', duration: 4000 });
                return
              case !this.businessLicense:
                Toast({ message: '请上传您机构的营业执照', duration: 4000 });
                return
              case !this.taxRegistration:
                Toast({ message: '请上传您机构的税务登记', duration: 4000 });
                return
              default:
                break
            }
            //todo type参数
            params.trueName = this.trueName
            params.phone = this.phone
            params.birthday = this.birthday
            params.sex = (this.sex === '女' ? 2 : 1)
            params.number = this.number
            params.openid = this.openid
            params['certification.type'] = 2
            params['certification.companyName'] = this.companyName
            params['certification.part'] = this.part
            params['certification.workAddress'] = this.workAddress
            params['certification.medicalLicense'] = this.medicalLicense
            params['certification.businessLicense'] = this.businessLicense
            params['certification.taxRegistration'] = this.taxRegistration
            //非必填参数
            params['certification.openingPermit'] = this.openingPermit
            params['certification.doctorPic'] = this.doctorPic
            params['certification.radiologicalPermit'] = this.radiologicalPermit
            params['certification.idCardPositive'] = this.idCardPositive
            params['certification.idCardOtherside'] = this.idCardOtherside
            console.info('查看机构用户注册的请求参数', params)
          }
          else {
            //牙医个人用户注册
            switch (true) {
              case !this.trueName:
                Toast({ message: '请填写您的真实姓名', duration: 4000 });
                return
              case !this.companyName:
                Toast({ message: '请填写您的单位名称', duration: 4000 });
                return
              case !this.birthday:
                Toast({ message: '请填写您的真实姓名', duration: 4000 });
                return
              case !this.part:
                Toast({ message: '请选择您的单位所在地', duration: 4000 });
                return
              case !this.workAddress:
                Toast({ message: '请填写您的单位详细地址', duration: 4000 });
                return
              case !this.doctorPic:
                Toast({ message: '请上传您的口腔执业医师资格证', duration: 4000 });
                return
              default:
                break
            }
            params.trueName = this.trueName
            params.phone = this.phone
            params.openid = this.openid
            params.birthday = this.birthday
            params.sex = (this.sex === '女' ? 2 : 1)
            params['certification.type'] = 1
            params['certification.companyName'] = this.companyName
            params['certification.part'] = this.part
            params['certification.workAddress'] = this.workAddress
            params['certification.doctorPic'] = this.doctorPic
            params.number = this.number
            console.info('查看个人用户注册的请求参数', params)
          }
          this.$store.dispatch(UPDATE_USER_INFO, params).then(res => {
            //todo 跳转到bindInfo组件（可能已经注册且绑定过销售信息）
            console.info('查看更新用户信息返回数据', params)
            Toast({ message: '微信已成功绑定账号！', duration: 4000 });
            this.$router.replace({
              path: '/wx_user/bindinfo',
              query: {
                role: 'doctor',
                phone: this.phone,
                isBindSale: this.isBindSale,
                token: (this.token || res.data.token),
                entry: this.entry,
                salePhone: this.salePhone,
                saleName: this.saleName
              }
            })
          })
        }
      },
      _init() {
        //获取入口
        this.entry = this.$route.query.entry
        this.openid = this.$route.query.openid
        //获取用户状态类型
        this.isSale = this.wxUserInfo.isSale
        if (!this.isSale) {
          //牙医用户初始化
          this._userInit()
        } else {
          this._saleInit()
        }
      },
      _userInit() {
        //牙医用户初始化
        let userInfo = this.wxUserInfo
        console.info('查看牙医用户初始化信息', userInfo)
        //初始化一些个人信息
        if (userInfo.isBindSale) {
          //如果绑定了销售
          this.isBindSale = true
          this.saleName = userInfo.saleBindInfo.trueName
          this.salePhone = userInfo.saleBindInfo.phone
        }
        this.trueName = userInfo.trueName
        this.token = userInfo.token
        this.phone = userInfo.phone || this.$route.query.phone
        this.birthday = userInfo.birthday
        this.sex = (userInfo.sex === 2 ? '女' : '男')
        this.companyName = userInfo.companyName
        this.part = userInfo.part
        this.workAddress = userInfo.workAddress
        this.number = userInfo.number
        if (userInfo.type === 1) {
          this.type = '个人'
          this.doctorPic = userInfo.doctorPic
        }
        else {
          this.type = '机构'
          this.medicalLicense = userInfo.medicalLicense
          this.doctorPic = userInfo.doctorPic
          this.businessLicense = userInfo.businessLicense
          this.idCardOtherside = userInfo.idCardOtherside
          this.idCardPositive = userInfo.idCardPositive
          this.openingPermit = userInfo.openingPermit
          this.radiologicalPermit = userInfo.radiologicalPermit
          this.taxRegistration = userInfo.taxRegistration
        }
      },
      _saleInit() {
        let saleInfo = this.wxUserInfo
        this.trueName = saleInfo.trueName
        this.token = saleInfo.token
        this.phone = saleInfo.phone || this.$route.query.phone
        this.sex = (saleInfo.sex === 2 ? '女' : '男')
        this.idCard = saleInfo.idCard
        this.workUnit = saleInfo.workUnit
        this.workPosition = saleInfo.workPosition
        this.part = saleInfo.part
        this.address = saleInfo.address
        this.referrals = saleInfo.referrals
        this.birthday = saleInfo.birthday
        this.education = saleInfo.education
        this.weChar = saleInfo.weChar
        this.email = saleInfo.email
        this.number = saleInfo.number //表示是否已经注册
        if (saleInfo.postalType === '支付宝') {
          //提现类型为支付宝
          this.postalType = '支付宝'
          this.openName = saleInfo.openName
          this.accountNumber = saleInfo.accountNumber
        }
        else {
          this.postalType = '银行卡'
          this.bankName = saleInfo.bankName
          this.openName = saleInfo.openName
          this.accountNumber = saleInfo.accountNumber
        }
      }
    },
    computed: {
      wxUserInfo() {
        return this.$store.state.wx.wxUserInfo
      }
    },
    created() {
      //获取七牛token,防止重复请求
      this.$store.dispatch(GET_UPLOAD_TOKEN).then(res => {
        this.qiNiuToken = {
          token: res.msg
        }
      })
      this._init()
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .userRegisterWx-container {
    padding: 0 px2vw(66);
    font-size: px2vw(30);
    .textPrompt {
      font-size: px2vw(30);
      font-weight: 600;
      color: $themeColorHover;
      margin-bottom: px2vw(40);
    }
    .mint-radiolist-title {
      font-size: px2vw(30);
    }
    .mint-cell-wrapper {
      font-size: px2vw(27);
    }
    .sale-container {
      .textPrompt {
        font-size: px2vw(30);
      }
    }
    .enter-btn {
      margin: px2vw(80) 0;
    }
    .postalType-container {
      .title {
        text-indent: px2vw(20);
        margin-top: px2vw(50);
        padding-bottom: px2vw(10);
        font-size: px2vw(30);
        border-bottom: 1px solid #ccc;
        &.must-fill:before {
          top: px2vw(-10);
          left: px2vw(-20);
        }
      }
    }
    /*必填项样式*/
    .must-fill {
      position: relative;
      &:before {
        content: '*';
        position: absolute;
        z-index: 1993;
        color: red;
        top: px2vw(20);
        left: px2vw(0);
      }
    }
  }
</style>
