import * as types from '../types'
import * as api from './api';
import axios from 'axios'
// import { Toast } from 'mint-ui';

const state = {
  baseUrl: 'http://47.93.48.111:8080/api',
  bannerList: [],
  brandListData: [],
  classifyList: [],
  classifyList2: [],
  //商品列表页请求数据
  queryItemSearchParams: {currentPage: 1},
  productsList: [],
  productsScrollText: '',
  qiNiuToken: {},            //七牛token
  goodNum: 1,
  goodSku: '',
  goodStar: null,
  nowStock: '', //商品库存
  qbBalance: '',  //用户乾币余额
  nowGoodDetails: {}, //商品详情
  orderDetails: {},     //用户商品订单
  address: {}, //存储编辑地址信息
  orderList: [],             //用户商品订单
  addressToGo: 0,//储存跳转信息 1 跳转地址确认页面
  addressSelect: -1, //确认订单页面 选择收货地址 的编号默认为-1
  addressBack: 0, //判断添加地址页面返回按钮 返回到哪里 1为后退到订单确认页面 0为history -1

  brandAndClassify: {oneClassify:null,classifyTwoName:null}, //保存一级和二级分类目录选中项

  companyInvoice: {}, //保存普通公司发票信息

  checkedDate: {},//保存创客我的业绩选择的日期

}

const getters = {
  [types.DONE_INDEX_CAROUSEL]: state => {
    return state.bannerList
  },
  [types.DONE_INDEX_BRAND]: state => {
    return state.brandListData
  },
  [types.COMPANY_INVOICE]: state => {
    return state.companyInvoice
  },
  [types.ADDRESS_SELECT]: state => {
    return state.addressSelect
  },
}

const mutations = {
  //保存用户选择地址的index
  [types.ADDRESS_SELECT](state, all) {
    state.addressSelect = all
  },
  //保存普通公司发票信息
  [types.COMPANY_INVOICE](state, all) {
    state.companyInvoice = all
  },
  [types.TOGGLE_INDEX_CAROUSEL](state, all) {
    state.bannerList = all
  },
  [types.TOGGLE_INDEX_BRAND](state, all) {
    state.brandListData = all
  },
  //存储分类和商标的请求参数信息
  [types.SAVE_CLASSIFY_AND_BRAND_INFO](state, all) {
    //将合并后的参数传给state
    state.queryItemSearchParams = Object.assign(state.queryItemSearchParams, all)
  },
  //存储分类和商标的请求参数信息
  [types.SAVE_PRODUCTS_LIST](state, all) {
    //将合并后的参数传给state
    state.productsList = all
  },
  // [types.TOGGLE_INDEX_CLASSIFY](state, all) {
  //     for (var i = 0; i < state.classifyItems.length; i++) {
  //         state.classifyItems[i].items = all
  //     }
  // },
  //存放用户的订全部单列表
  [types.SAVE_ORDERS_DETAILS](state, all) {
    state.orderDetails = all
  },
  //保存标签和分类
  [types.SAVE_BRAND_AND_CLASSIFY](state, all) {
    state.brandAndClassify = all
  },

  //保存创客我的业绩选择的日期
  [types.SAVE_CK_CHECKED_DATE](state, all) {
    state.checkedDate = all
  }
}

const actions = {
  [types.ADDRESS_SELECT]({commit}, all) {
    commit(types.ADDRESS_SELECT, all);
  },
  [types.COMPANY_INVOICE]({commit}, all) {
    commit(types.COMPANY_INVOICE, all);
  },
  // 获取首页轮播图
  [types.GET_CAROUSEL]() {
    return new Promise((resolve, reject) => {
      api.getCarousel().then((data) => {
        Promise.resolve(data).then(function (value) {
          state.bannerList = value.splice(1)
        }, function (value) {
          // 不会被调用
        });
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 获取所有品牌
  [types.GET_BRAND]() {
    return new Promise((resolve, reject) => {
      api.getBrand().then((data) => {
        Promise.resolve(data).then(function (value) {
          state.brandListData = value
        }, function (value) {
          // 不会被调用
        });
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 获取所有分类信息
  // [types.GET_CLASSIFY]() {
  //   return new Promise((resolve, reject) =>  {
  //     api.getClassify().then((data) => {
  //       Promise.resolve(data).then(function (value) {
  //         state.classifyList = value
  //       }, function (value) {
  //         // 不会被调用
  //       });
  //     }).catch((err) => {
  //       reject(err);
  //     });
  //   });
  // },
  // 获取所有分类信息
  [types.GET_CLASSIFY](context, params) {
    return new Promise((resolve, reject) => {
      api.getClassify(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 获取分类查询
  [types.GET_CLASSIFY_QUERY](context, params) {
    return new Promise((resolve, reject) => {
      api.getClassify(params).then((data) => {
        Promise.resolve(data).then(function (value) {
          state.classifyList = value
          for (var i = 0; i < state.classifyList.length; i++) {
            let index = i
            var obj = {
              oneClassify: state.classifyList[i].oneClassify,
            };
            api.getItemQuery(obj).then((res) => {
              state.classifyList[index].classifyTwoList = res.data.data
            }).catch((err) => {
              reject(err);
            });
          }
        }, function (value) {
          // 不会被调用
        });
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 获取商品详情
  [types.GET_ITEM_DETAIL](context, params) {
    return new Promise((resolve, reject) => {
      api.getItemDetail(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 获取地址列表信息
  [types.GET_ADDRESS](context, params) {
    return new Promise((resolve, reject) => {
      api.getAddress(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 修改地址列表信息
  [types.EDIT_ADDRESS](context, params) {
    return new Promise((resolve, reject) => {
      api.editAddress(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 保存地址列表信息
  [types.SAVE_ADDRESS](context, params) {
    return new Promise((resolve, reject) => {
      api.saveAddress(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 删除地址列表信息
  [types.DEL_ADDRESS](context, params) {
    return new Promise((resolve, reject) => {
      api.delAddress(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 用户注册
  [types.REGISTER_MSG](context, params) {
    return new Promise((resolve, reject) => {
      api.postRegister(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  // 用户密码登录
  [types.GET_LOGIN](context, params) {
    return new Promise((resolve, reject) => {
      api.getLogIn(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  // 用户登出
  [types.GET_LOGIN_OUT](context, params) {
    return new Promise((resolve, reject) => {
      api.getPersonList(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  // 用户短信验证码登录
  [types.GET_LOGIN_MSG](context, params) {
    return new Promise((resolve, reject) => {
      api.getLogInMsg(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  // 获取用户订单
  [types.GET_ORDER_LIST](context, params) {
    return new Promise((resolve, reject) => {
      api.getOrderList(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  // 获取短信登录验证码
  [types.GET_IDENTICODE](context, params) {
    return new Promise((resolve, reject) => {
      api.getIdentiCode(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  // 查询是否绑定
  [types.QUERY_BIND](context, params) {
    return new Promise((resolve, reject) => {
      api.queryBind(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  // 绑定客服代表
  [types.BIND_CUSTOMER](context, params) {
    return new Promise((resolve, reject) => {
      api.bindCustomer(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  // 获取忘记密码修改
  [types.GET_FORGETCODE](context, params) {
    return new Promise((resolve, reject) => {
      api.getForgetCode(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },


  //查询销售姓名
  [types.QUERY_SALE_NAME](context, params) {
    return new Promise((resolve, reject) => {
      api.querySaleName(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  //绑定销售
  [types.BIND_SALE](context, params) {
    return new Promise((resolve, reject) => {
      api.bindSale(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },

  //获取品牌和商标列表
  [types.GET_ALL_CLASSIFY_AND_BRAND](context, params) {
    return new Promise((resolve, reject) => {
      api.getAllClassifyAndBrand(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  //商品根据分类和品牌以及排序查询
  [types.QUERY_ITEM_SEARCH](context, params) {
    //提交请求信息
    context.commit(types.SAVE_CLASSIFY_AND_BRAND_INFO, params)
    return new Promise((resolve, reject) => {
      api.queryItemSearch(context.state.queryItemSearchParams).then((data) => {
        if (context.state.queryItemSearchParams.currentPage === 1) {
          context.commit(types.SAVE_PRODUCTS_LIST, data)
        } else {
          if (data.length) {
            context.state.productsScrollText = '正在加载更多'
          } else {
            context.state.productsScrollText = '没有更多内容了'
          }
          let temp = context.state.productsList
          data.forEach(item => {
            temp.push(item)
          })
          context.commit(types.SAVE_PRODUCTS_LIST, temp)
        }
        resolve(data)
      }).catch((err) => {
        console.error(err)
      });
    });
  },
  //获取七牛云上传token
  [types.GET_UPLOAD_TOKEN](context, params) {
    return new Promise((resolve, reject) => {
      api.getUpToken(params).then((data) => {
        context.state.qiNiuToken = {
          token: data.msg
        }
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  //更新用户信息
  [types.UPDATE_USER_INFO](context, params) {
    return new Promise((resolve, reject) => {
      api.updateUserInfo(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  //更新销售的信息
  [types.UPDATE_SALE_INFO](context, params) {
    return new Promise((resolve, reject) => {
      api.updateSaleInfo(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      })
    })
  },
  // 获取加入购物车
  [types.ADD_IN_CAR](context, params) {
    return new Promise((resolve, reject) => {
      api.addInCar(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  // 获取加入购物车
  [types.GET_CAR_LIST](context, params) {
    return new Promise((resolve, reject) => {
      api.getCarList(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  // 获取我的个人资料
  [types.GET_PERSON_LIST](context, params) {
    return new Promise((resolve, reject) => {
      api.getPersonList(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  // 保存个人资料
  [types.SAVE_PERSON_LIST](context, params) {
    return new Promise((resolve, reject) => {
      api.savePersonList(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  // 保存资质认证
  [types.SAVE_CERTIFICATION](context, params) {
    return new Promise((resolve, reject) => {
      api.saveCertification(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  // 获取收藏商品的信息
  [types.GET_GOODS_COLLECT](context, params) {
    return new Promise((resolve, reject) => {
      api.getGoodsCollect(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  //删除购物车商品
  [types.DEL_CAR_GOODS](context, params) {
    return new Promise((resolve, reject) => {
      api.delCarGoods(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  //更新购物车数量
  [types.UPDATE_GOODS_NUM](context, params) {
    return new Promise((resolve, reject) => {
      api.updateGoodsNum(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  //添加收藏
  [types.COLLECT_CARGO](context, params) {
    return new Promise((resolve, reject) => {
      api.collectCargo(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  //取消收藏
  [types.CANCEL_CARGO](context, params) {
    return new Promise((resolve, reject) => {
      api.cancelCargo(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  //搜索框搜索
  [types.SEARCH_WORD](context, params) {
    return new Promise((resolve, reject) => {
      api.searchWord(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  [types.CANCEL_USER_ORDER](context, params) {
    return new Promise((resolve, reject) => {
      api.cancelOrder(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  [types.QUERY_ORDER_DEATILS](context, params) {
    return new Promise((resolve, reject) => {
      api.queryOrderDetails(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  // 支付宝支付充值乾币
  [types.PAY_ZFB_COIN](context, params) {
    return new Promise((resolve, reject) => {
      api.payZfbCoin(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  // 微信支付充值乾币
  [types.PAY_WX_COIN](context, params) {
    return new Promise((resolve, reject) => {
      api.payWxCoin(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  // 充值乾币优惠码
  [types.QB_DISCOUNT](context, params) {
    return new Promise((resolve, reject) => {
      api.QbDiscount(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  // 获取乾币明细
  [types.QB_DETAIL](context, params) {
    return new Promise((resolve, reject) => {
      api.QbDetail(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  // 根据地址计算运费
  [types.GET_FREIGHT](context, params) {
    return new Promise((resolve, reject) => {
      api.getFreight(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  // 用户提交订单
  [types.GET_SUBMIT](context, params) {
    return new Promise((resolve, reject) => {
      api.getSubmit(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  // 用户查询qb余额
  [types.GET_QB_NOW](context, params) {
    return new Promise((resolve, reject) => {
      api.getQbNow(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  // 查询qb抵扣
  [types.GET_QB_DK](context, params) {
    return new Promise((resolve, reject) => {
      api.getQbDk(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  //发表评论
  [types.PUBLISH_COMMENT](context, params) {
    return new Promise((resolve, reject) => {
      api.publishCommit(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },

  [types.QUERY_ORDER_LOG](context, params) {
    return new Promise((resolve, reject) => {
      api.queryOrderLog(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  [types.CONFIRM_ORDER](context, params) {
    return new Promise((resolve, reject) => {
      api.confirmOrder(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  //查询发票
  [types.QUERY_ORDER_INVOICE](context, params) {
    return new Promise((resolve, reject) => {
      api.queryOrderInvoice(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },


  //获取左侧边栏列表
  [types.GET_PRODUCT_LEFT](context, params) {
    return new Promise((resolve, reject) => {
      api.getProductLeft(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  //展示商品分类
  [types.SHOW_CLASSIFY](context, params) {
    return new Promise((resolve, reject) => {
      api.showClassify(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  // 获取品牌列表
  [types.GET_BRAND_LIST](context, params) {
    return new Promise((resolve, reject) => {
      api.getBrandList(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  // 商品根据分类和品牌以及排序查询(Post)
  [types.QUERY_ITEM_SEARCH_POST](context, params) {
    return new Promise((resolve, reject) => {
      api.queryItemSearchPost(params).then((data) => {
        // state.productData = data.data.data
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },

  // 获取主推产品
  [types.GET_MAIN_PULL_PRODUCT](context, params) {
    return new Promise((resolve, reject) => {
      api.getMainPullProduct(params).then((data) => {
        // state.productData = data.data.data
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },



  //创客登录
  [types.SALE_LOGIN](context, params) {
    return new Promise((resolve, reject) => {
      api.saleLogin(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  //创客短信登录
  [types.SALE_MSG_LOGIN](context, params) {
    return new Promise((resolve, reject) => {
      api.saleMsgLogin(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  //创客获取验证码
  [types.GET_SALE_IDENTICODE](context, params) {
    return new Promise((resolve, reject) => {
      api.getSaleCaptcha(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  //创客忘记密码
  [types.SALE_FORGET_PWD](context, params) {
    return new Promise((resolve, reject) => {
      api.saleFrogetPwd(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  //创客排行榜banner
  [types.SALE_CHARTS_BANNER](context, params) {
    return new Promise((resolve, reject) => {
      api.getCarousel(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },


  //创客我的业绩
  [types.GET_SALES_MY_ORDER](context, params) {
    return new Promise((resolve, reject) => {
      api.GetSaleMyOrder(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },

  //获取创客发现在创客页面的已注册信息
  [types.GET_LOGINED](context, params) {
    return new Promise((resolve, reject) => {
      api.getLogin(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  //获取创客发现在创客页面的未注册信息
  [types.GET_NO_LOGINED](context, params) {
    return new Promise((resolve, reject) => {
      api.getNoLogin(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  //获取创客我的客户页面的注册信息
  [types.GET_MY_CUSTOMER](context, params) {
    return new Promise((resolve, reject) => {
      api.getMyCustomer(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },

}

export default {
  state,
  getters,
  mutations,
  actions
}
