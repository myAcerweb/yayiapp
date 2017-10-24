// actions types
export const GET_CAROUSEL = 'GET_CAROUSEL'                                // 获取首页轮播图
export const GET_BRAND = 'GET_BRAND'                                      // 获取所有品牌
export const GET_CLASSIFY = 'GET_CLASSIFY'                                // 获取所有分类
export const GET_CLASSIFY_QUERY = 'GET_CLASSIFY_QUERY'                    // 分类查询
export const GET_ITEM_DETAIL = 'GET_ITEM_DETAIL'                          // 获取商品详情
export const REGISTER_MSG = 'REGISTER_MSG'                                // 注册
export const GET_LOGIN = 'GET_LOGIN'                                      // 密码登录
export const GET_LOGIN_MSG = 'GET_LOGIN_MSG'                              // 短信登录
export const GET_LOGIN_OUT = 'GET_LOGIN_OUT'                              // 登出
export const GET_IDENTICODE = 'GET_IDENTICODE'                            // 获取验证码
export const GET_FORGETCODE = 'GET_FORGETCODE'                            // 忘记密码修改
export const ADD_IN_CAR = 'ADD_IN_CAR'                                    // 加入购物车
export const GET_CAR_LIST = 'GET_CAR_LIST'                                // 获取我的购物车
export const GET_PERSON_LIST = 'GET_PERSON_LIST'                          // 获取我的个人信息
export const SAVE_PERSON_LIST = 'SAVE_PERSON_LIST'                        // 保存个人信息
export const SAVE_CERTIFICATION = 'SAVE_CERTIFICATION'                    // 保存资质认证
export const DEL_CAR_GOODS = 'DEL_CAR_GOODS'                              // 删除购物车商品
export const UPDATE_GOODS_NUM = 'UPDATE_GOODS_NUM'                        // 更新购物车数量
export const COLLECT_CARGO = 'COLLECT_CARGO'                              // 添加收藏
export const CANCEL_CARGO = 'CANCEL_CARGO'                                // 取消收藏
export const GET_GOODS_COLLECT = 'GET_GOODS_COLLECT'                      // 获取我的个人收藏信息
export const SEARCH_WORD = 'SEARCH_WORD'                                  // 搜索框搜索
export const GET_ADDRESS = 'GET_ADDRESS'                                  // 获取收货地址列表信息
export const DEL_ADDRESS = 'DEL_ADDRESS'                                  // 删除收货地址列表信息
export const PAY_ZFB_COIN = 'PAY_ZFB_COIN'                                // 支付宝充值钱币
export const PAY_WX_COIN = 'PAY_WX_COIN'                                  // 微信充值钱币
export const EDIT_ADDRESS = 'EDIT_ADDRESS'                                // 修改收货地址列表信息
export const SAVE_ADDRESS = 'SAVE_ADDRESS'                                // 保存收货地址列表信息
export const GET_FREIGHT = 'GET_FREIGHT'                                  // 根据地址计算运费
export const GET_SUBMIT = 'GET_SUBMIT'                                    // 用户提交订单
export const GET_QB_NOW = 'GET_QB_NOW'                                    // 用户查询qb余额
export const GET_QB_DK = 'GET_QB_DK'                                      // 查询qb抵扣
export const QUERY_BIND = 'QUERY_BIND'                                    // 查询是否绑定
export const BIND_CUSTOMER = 'BIND_CUSTOMER'                              // 绑定客服代表
export const QB_DISCOUNT = 'QB_DISCOUNT'                                  // 乾币优惠码兑换
export const QB_DETAIL = 'QB_DETAIL'                                      // 获取乾币明细

// mutstions types
export const TOGGLE_INDEX_CAROUSEL = 'TOGGLE_INDEX_CAROUSEL'              // 获取首页轮播图
export const TOGGLE_INDEX_BRAND = 'TOGGLE_INDEX_BRAND'                    // 获取首页品牌库
export const SAVE_ORDERS_DETAILS = 'SAVE_ORDERS_DETAILS'                  // 存放用户单个订单详情

export const SAVE_BRAND_AND_CLASSIFY = 'SAVE_BRAND_AND_CLASSIFY'                  // 保存标签和分类信息
export const SAVE_CK_CHECKED_DATE = 'SAVE_CK_CHECKED_DATE'                  // 保存创客我的业绩选择的日期


export const COMPANY_INVOICE = 'COMPANY_INVOICE'                          // 存取普通公司发票信息
export const ADDRESS_SELECT = 'ADDRESS_SELECT'                             //存取地址的选择index


//  getters types
export const DONE_INDEX_CAROUSEL = 'DONE_INDEX_CAROUSEL'                  // 获取首页轮播图
export const DONE_INDEX_BRAND = 'DONE_INDEX_BRAND'                        // 获取首页品牌库


export const GET_PRODUCT_LEFT = 'GET_PRODUCT_LEFT'          // 获取左侧边栏列表
export const SHOW_CLASSIFY = 'SHOW_CLASSIFY'          // 展示商品分类
export const GET_BRAND_LIST = 'GET_BRAND_LIST'          // 获取品牌列表
export const QUERY_ITEM_SEARCH_POST = 'QUERY_ITEM_SEARCH_POST'             // 商品根据分类和品牌以及排序查询(Post)
export const GET_MAIN_PULL_PRODUCT = 'GET_MAIN_PULL_PRODUCT'             // 获取主推产品


export const CANCEL_USER_ORDER = 'CANCEL_USER_ORDER'                        // 取消用户订单
export const GET_ORDER_LIST = 'GET_ORDER_LIST'                              // 获取用户的商品订单
export const QUERY_ORDER_LOG = 'QUERY_ORDER_LOG'                            // 查看订单的物流
export const CONFIRM_ORDER = 'CONFIRM_ORDER'                                // 支付订单
export const QUERY_ORDER_INVOICE = 'QUERY_ORDER_INVOICE'                    // 查询发票


export const QUERY_ORDER_DEATILS = 'QUERY_ORDER_DEATILS'                  // 获取订单详情
export const PUBLISH_COMMENT = 'PUBLISH_COMMENT'                         // 发表评论


export const GET_LOGIN_CAPTCHA = 'GET_LOGIN_CAPTCHA'              // 获取获取登录信息验证码
export const GET_USER_WX_STATE = 'GET_USER_WX_STATE'              // 获取微信端用户登录的状态信息
export const WX_BIND_USER = 'WX_BIND_USER'                        // 获取微信端用户登录的状态信息
export const WX_USER_REGISTER = 'USER_REGISTER'                   // 牙医用户注册
export const WX_SALE_REGISTER = 'SALE_REGISTER'                   // 创客用户注册
export const QUERY_SALE_NAME = 'QUERY_SALE_NAME'                  // 查询销售名字
export const BIND_SALE = 'BIND_SALE'                              // 绑定销售
export const WX_SCAN_QRCODE = 'WX_SCAN_QRCODE'                    // 微信扫码登录


export const GET_ALL_CLASSIFY_AND_BRAND = 'GET_ALL_CLASSIFY_AND_BRAND'                    // 获取所有商品分类和品牌列表
export const QUERY_ITEM_SEARCH = 'QUERY_ITEM_SEARCH'                                      // 商品根据分类和品牌以及排序查询
export const SAVE_CLASSIFY_AND_BRAND_INFO = 'SAVE_CLASSIFY_AND_BRAND_INFO'                // 保存分类和商标的请求信息
export const SAVE_PRODUCTS_LIST = 'SAVE_PRODUCTS_LIST'                                    // 保存商品列表
export const GET_UPLOAD_TOKEN = 'GET_UPLOAD_TOKEN'                                        // 获取七牛云上传token
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'                                        // 更新用户信息
export const UPDATE_SALE_INFO = 'UPDATE_SALE_INFO'                                        // 更新销售信息


/*
* 创客系统管理模块
* */

export const SALEINFO_QUERY = 'SALEINFO_QUERY'                            // 更新销售信息
export const SALE_REGISTER = 'SALE_REGISTER'                              // 创客注册
export const SALE_LOGIN = 'SALE_LOGIN'                                    // 创客登录
export const SALE_MSG_LOGIN = 'SALE_MSG_LOGIN'                            // 短信登录
export const GET_SALE_IDENTICODE = 'GET_SALE_IDENTICODE'                  // 创客获取验证码
export const SALE_FORGET_PWD = 'SALE_FORGET_PWD'                          // 创客忘记密码
export const SALE_CHARTS_BANNER = 'SALE_CHARTS_BANNER'                    // 创客排行榜banner
export const SALE_RANKING_DATA = 'SALE_RANKING_DATA'                      // 创客排行榜文字数据
export const SALE_RANKING_LIST = 'SALE_RANKING_LIST'                      // 创客排行榜TABLE数据
export const SALE_USER_LOGOUT = 'SALE_USER_LOGOUT'                        // 创客用户登出
export const SALE_UPDATE_POSTAL = 'SALE_UPDATE_POSTAL'                    // 创客体现设置
export const GET_SALE_CAPTCHA = 'GET_SALE_CAPTCHA'                         // 创客获取验证码
export const SALE_SUBMIT_WITHDRAW = 'SALE_SUBMIT_WITHDRAW'                 // 创客提现申请


export const GET_LOGINED = 'GET_LOGINED'                                  //获取已注册的信息
export const GET_NO_LOGINED = 'GET_NO_LOGINED'                            //获取未注册的信息
export const GET_MY_CUSTOMER = 'GET_MY_CUSTOMER'                            //获取我客户信息


export const GET_SALES_MY_ORDER = 'GET_SALES_MY_ORDER'                                        // 创客获取我的业绩




