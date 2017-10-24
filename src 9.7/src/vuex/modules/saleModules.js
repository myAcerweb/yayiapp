import * as types from '../types'
import * as api from './api';

const state = {
  saleInfo: {}
}


const mutations = {
  // [types.xxx](state, all) {
  // }
}

const getters = {}

const actions = {
  [types.SALEINFO_QUERY](context, params) {
    return new Promise((resolve, reject) => {
      api.saleInfoQuery(params).then((data) => {
        context.state.saleInfo = data.data
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  //创客注册
  [types.SALE_REGISTER](context, params) {
    return new Promise((resolve, reject) => {
      api.saleRegister(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  //创客登录
  [types.SALE_LOGIN](context, params) {
    return new Promise((resolve, reject) => {
      api.saleLogin(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  //创客短信登录
  [types.SALE_MSG_LOGIN](context, params) {
    return new Promise((resolve, reject) => {
      api.saleMsgLogin(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  //创客获取验证码
  [types.GET_SALE_IDENTICODE](context, params) {
    return new Promise((resolve, reject) => {
      api.getSaleCaptcha(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  //创客忘记密码
  [types.SALE_FORGET_PWD](context, params) {
    return new Promise((resolve, reject) => {
      api.saleFrogetPwd(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  //创客排行榜banner
  [types.SALE_CHARTS_BANNER](context, params) {
    return new Promise((resolve, reject) => {
      api.getCarousel(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  //创客排行榜文字数据
  [types.SALE_RANKING_DATA](context, params) {
    return new Promise((resolve, reject) => {
      api.saleRankingDate(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  //创客排行榜table数据
  [types.SALE_RANKING_LIST](context, params) {
    return new Promise((resolve, reject) => {
      api.saleRankingList(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  //创客用户登出
  [types.SALE_USER_LOGOUT](context, params) {
    return new Promise((resolve, reject) => {
      api.saleLogout(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  //创客体现设置
  [types.SALE_UPDATE_POSTAL](context, params) {
    return new Promise((resolve, reject) => {
      api.updatePostal(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },

  [types.GET_SALES_MY_ORDER](context, params) {
    return new Promise((resolve, reject) => {
      api.GetSaleMyOrder(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  [types.GET_SALE_CAPTCHA](context, params) {
    return new Promise((resolve, reject) => {
      api.getSaleVcode(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  //创客提现申请
  [types.SALE_SUBMIT_WITHDRAW](context, params) {
    return new Promise((resolve, reject) => {
      api.submitWit(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
}

export default {namespaced: true, state, getters, mutations, actions}
