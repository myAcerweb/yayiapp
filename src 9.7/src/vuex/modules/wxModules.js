import * as types from '../types'
import * as api from './api';

const state = {
  wxUserInfo: {}            //存放的个人用户信息（微信端口！！）
}


const mutations = {
  // [types.xxx](state, all) {
  // }
}

const getters = {}

const actions = {
  //微信扫码登录
  [types.WX_SCAN_QRCODE](context, params) {
    return new Promise((resolve, reject) => {
      api.wxLogin(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  //绑定用户接口
  [types.WX_BIND_USER](context, params) {
    return new Promise((resolve, reject) => {
      api.wxBindUser(params)
        .then((data) => {
          let tempInfo = {} //存放临时的用户变量
          tempInfo.token = data.token
          if (params.type === '1') { //身份是医生
            console.info('打印bind_user返回的数据', data)
            tempInfo.isSale = false
            if (data.errorCode === 'Username_NOT_Exist') { //医生身份用户不存在
              tempInfo.number = 2                                                       //表示未注册（必须）
            }
            else if (data.errorCode === 'No_Error') {
              let res = data.data
              //表示已经注册(存一些用户状态)
              if (res.saleId) {
                //表示绑定过的
                tempInfo.isBindSale = true
                tempInfo.saleBindInfo = {
                  trueName: res.saleinfo.trueName,
                  phone: res.saleinfo.phone
                }
              }
              tempInfo.number = 1                                                           //表示已经注册（必须）
              tempInfo.trueName = res.trueName
              tempInfo.phone = res.phone
              tempInfo.sex = res.sex
              tempInfo.type = res.certification.type || 1                                   //默认为个人用户
              let d = new Date(res.birthday)
              tempInfo.birthday = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
              tempInfo.companyName = res.certification.companyName || ''
              tempInfo.workAddress = res.certification.workAddress || ''
              tempInfo.part = res.certification.part || ''
              if (tempInfo.type === 1) {
                tempInfo.doctorPic = res.certification.doctorPic || ''                      //医疗机构执业许可证
              }
              else {
                tempInfo.businessLicense = res.certification.businessLicense || ''          //营业执照
                tempInfo.taxRegistration = res.certification.taxRegistration || ''          //税务登记证
                tempInfo.medicalLicense = res.certification.medicalLicense || ''            //医疗机构执业许可证
                // tempInfo.failReason = res.certification.failReason                       //资质认证未通过原因
                tempInfo.doctorPic = res.certification.doctorPic || ''                      //医师资格证图片
                tempInfo.idCardOtherside = res.certification.idCardOtherside || ''          //法人身份证反面
                tempInfo.idCardPositive = res.certification.idCardPositive || ''            //法人身份证正面
                tempInfo.openingPermit = res.certification.openingPermit || ''              //开户许可证
                tempInfo.radiologicalPermit = res.certification.radiologicalPermit || ''    //放射诊疗许可证
              }
            }
          }
          else {
            tempInfo.isSale = true //表示是销售
            if (data.errorCode === 'Username_NOT_Exist') {
              tempInfo.number = 2 //表示未注册（下个接口使用）
            }
            else if (data.errorCode === 'No_Error') {
              let res = data.data
              //表示已经注册(存一些用户状态)
              tempInfo.number = 1 //表示已经注册（下个接口使用）
              tempInfo.trueName = res.trueName
              tempInfo.phone = res.phone
              tempInfo.sex = res.sex
              let d = new Date(res.birthday)
              tempInfo.birthday = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
              tempInfo.workUnit = res.workUnit
              tempInfo.idCard = res.idCard
              tempInfo.workPosition = res.workPosition
              tempInfo.part = res.part
              tempInfo.address = res.address
              tempInfo.referrals = res.referrals
              tempInfo.education = res.education
              tempInfo.email = res.email
              tempInfo.weChar = res.weChar
              tempInfo.postalType = res.postalType
              if (tempInfo.postalType === '支付宝') {
                tempInfo.openName = res.openName
                tempInfo.accountNumber = res.accountNumber
              }
              else {
                //提现方式为银行卡
                tempInfo.openName = res.openName
                tempInfo.accountNumber = res.accountNumber
                tempInfo.bankName = res.bankName
              }
            }
          }
          context.state.wxUserInfo = tempInfo
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
  //牙医用户接口
  [types.WX_USER_REGISTER](context, params) {
    return new Promise((resolve, reject) => {
      api.wxUserRegister(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  //创客用户接口
  [types.WX_SALE_REGISTER](context, params) {
    return new Promise((resolve, reject) => {
      api.wxSaleRegister(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 获取微信登陆验证码
  [types.GET_LOGIN_CAPTCHA](context, params) {
    return new Promise((resolve, reject) => {
      api.getUserCaptcha(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 获取微信端用户登录的状态信息
  [types.GET_USER_WX_STATE](context, params) {
    return new Promise((resolve, reject) => {
      api.getUserWxState(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
}

export default {state, getters, mutations, actions}
