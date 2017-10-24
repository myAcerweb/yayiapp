import {
  get,
  getWithToken,
  getWithSaleToken,
  post,
  postWithToken,
  postWithSaleToken,
  wx_get,
  noErrorPost,
  noErrorGet,
  noErrorTokenGet,
  noErrorTokenPost
} from '../base';

// 获取轮播图
export function getCarousel(params) {
  return get('/adv/showAdv', params);
}

// 获取所有品牌
export function getBrand(params) {
  return get('/item/brandList', params);
}

// 获取所有分类
export function getClassify(params) {
  return get('/item/showClassify', params);
}

// 获取商品详情
export function getItemDetail(params) {
  return postWithToken('/item/itemDetailDes', params);
}

// 分类查询
export function getItemQuery(params) {
  return postWithToken('/item/queryItemSearchGet', params);
}

//获取所有商品分类和品牌列表
export function getAllClassifyAndBrand(params) {
  return get('/item/getAllClassifyAndBrand', params)
}

//商品根据分类和品牌以及排序查询
export function queryItemSearch(params) {
  return get('/item/queryItemSearch', params)
}

// 用户注册
export function postRegister(params) {
  return post('/app/register', params);
}

// 用户密码登录
export function getLogIn(params) {
  return post('/user/pwdLogin', params);
}

// 用户密码登出
export function getLogOut(params) {
  return postWithToken('/user/reLogin', params);
}

//获取七牛云上传token
export function getUpToken(params) {
  return noErrorGet('/file/getUpToken', params)
}

// 用户短信验证码登录
export function getLogInMsg(params) {
  return post('/user/noteLogin', params)
}

// 获取验证码
export function getIdentiCode(params) {
  return post('/user/getVerifyCode', params);
}

// 忘记密码确认
export function getForgetCode(params) {
  return post('/user/forgetPwd', params);
}

// 加入购物车
export function addInCar(params) {
  return postWithToken('/cart/add', params);
}

// 获取我的购物车
export function getCarList(params) {
  return getWithToken('/cart/list', params);
}

// 获取我的个人资料
export function getPersonList(params) {
  return getWithToken('/userPersonalInfo/detail', params);
}

// 查询是否绑定
export function queryBind(params) {
  return getWithToken('/userPersonalInfo/queryBind', params);
}

// 绑定客服代表
export function bindCustomer(params) {
  return postWithToken('/userManageList/bind', params);
}

// 保存个人资料
export function savePersonList(params) {
  return postWithToken('/userPersonalInfo/updateUser', params);
}

// 保存资质认证
export function saveCertification(params) {
  return postWithToken('/userPersonalInfo/updateCertification', params);
}

// 获取个人收藏的商品信息
export function getGoodsCollect(params) {
  return getWithToken('/mystar/shows', params);
}

// 获取地址列表信息
export function getAddress(params) {
  return getWithToken('/shoppingAdress/showShippingAddress', params);
}

// 删除地址信息
export function delAddress(params) {
  return postWithToken('/shoppingAdress/deleteShippingAddress', params);
}

// 修改地址信息
export function editAddress(params) {
  return postWithToken('/shoppingAdress/update', params);
}

// 保存地址信息
export function saveAddress(params) {
  return postWithToken('/shoppingAdress/insert', params);
}

// 删除购物车商品
export function delCarGoods(params) {
  return postWithToken('/cart/delete', params);
}

// 更新购物车数量
export function updateGoodsNum(params) {
  return postWithToken('/cart/updateNum', params);
}

// 添加收藏
export function collectCargo(params) {
  return postWithToken('/cart/star', params);
}

// 取消收藏
export function cancelCargo(params) {
  return postWithToken('/mystar/deleteOne', params);
}

// 搜索框搜索
export function searchWord(params) {
  return postWithToken('/item/itemSearch', params);
}

// 获取订单详情
export function getOrderList(params) {
  return postWithToken('/OrderDetails/show', params);
}

// 取消用户订单
export function cancelOrder(params) {
  return postWithToken('/OrderDetails/cancel', params);
}

export function queryOrderDetails(params) {
  return postWithToken('/showUserOrderManage/queryOrderDetails', params);
}


//获取左侧边栏列表
export function getProductLeft(params) {
  return get('/item/getAllClassifyAndBrand', params);
}

//展示商品分类
export function showClassify(params) {
  return get('/item/showClassify', params);
}

//获取品牌列表
export function getBrandList(params) {
  return get('/item/brandList', params);
}

//商品根据分类和品牌以及排序查询(Post)
export function queryItemSearchPost(params) {
  return post('/item/queryItemSearch', params);
}

//获取主推产品
export function getMainPullProduct(params) {
  return get('/item/getAllRecommendItemList', params);
}

// 支付宝支付充值乾币PAY_ZFB_COIN
export function payZfbCoin(params) {
  return getWithToken('/pay/recharge', params);
}

// 微信充值乾币PAY_WX_COIN
export function payWxCoin(params) {
  return getWithToken('/appPay/unifiedOrderCharge', params);
}

// 根据运费计算地址
export function getFreight(params) {
  return getWithToken('/po/upateAddress', params)
}


// 用户提交订单
export function getSubmit(params) {
  return postWithToken('/po/generaOrder', params);
}

// 提交评论接口
export function publishCommit(params) {
  return postWithToken('/OrderDetails/makeSureCom', params);
}

// 查看物流接口
export function queryOrderLog(params) {
  return postWithToken('/OrderDetails/seeLog', params);
}

// 确认收货
export function confirmOrder(params) {
  return postWithToken('/OrderDetails/confirmReceipt', params);
}

// 查看发票
export function queryOrderInvoice(params) {
  return postWithToken('/OrderDetails/queryOrderInvoice', params);
}

// 用户查询Qb余额
export function getQbNow(params) {
  return getWithToken('/userMyQb/query', params);
}

// 用户Qb抵扣
export function getQbDk(params) {
  return getWithToken('/po/Ded', params);
}

// 乾币优惠码兑换
export function QbDiscount(params) {
  return getWithToken('/benefit/use', params);
}

// 获取乾币明细
export function QbDetail(params) {
  return getWithToken('/userMyQb/query', params);
}


/*
wx_绑定用户&扫码绑定销售的接口
*/

//wx获取微信端用户登录的状态信息
export function getUserWxState(params) {
  return wx_get('/WXx/returnSignAndMessage', params)
}

//wx绑定手机号接口
export function wxBindUser(params) {
  return noErrorPost('/wxLogin/bindUser', params)
}

//wx牙医注册页接口
export function wxUserRegister(params) {
  return noErrorPost('/user/register', params)
}

//wx创客注册接口
export function wxSaleRegister(params) {
  return noErrorPost('/saleLog/register', params)
}

//wx查询销售姓名
export function querySaleName(params) {
  return noErrorTokenGet('/userPersonalInfo/queryBind', params)
}

//wx绑定销售
export function bindSale(params) {
  return noErrorTokenPost('/user/bindSale', params)
}

//wx扫码登录
export function wxLogin(params) {
  return wx_get('/wxLogin/login', params)
}


//wx查看或者修改用户信息
export function updateUserInfo(params) {
  return post('/wxLogin/updateUserInfo', params)
}

//wx查看或者修改销售员信息
export function updateSaleInfo(params) {
  return post('/wxLogin/updateSaleInfo', params)
}

// 获取用户登录验证码
export function getUserCaptcha(params) {
  return noErrorPost('/user/getVerifyCode', params)
}


/*
  创客系统接口
*/

// 创客注册
export function saleRegister(params) {
  return post('/appSale/register', params)
}

// 创客登录
export function saleLogin(params) {
  return post('/saleLog/pwdLogin', params)
}

// 创客短信登录
export function saleMsgLogin(params) {
  return post('/saleLog/noteLogin', params)
}

// 创客获取验证码
export function getSaleCaptcha(params) {
  return get('/saleLog/getVerifyCode', params)
}

// 创客忘记密码
export function saleFrogetPwd(params) {
  return post('/saleLog/forgetPwd', params)
}

//创客查询个人信息
export function saleInfoQuery(params) {
  return getWithSaleToken('/saleInfo/query', params)
}

//创客查询排行榜文字数据
export function saleRankingDate(params) {
  return getWithSaleToken('/rankingList/compareData', params)
}

//创客查询排行榜table数据
export function saleRankingList(params) {
  return getWithSaleToken('/rankingList/list', params)
}


//创客查询排行榜table数据
export function saleLogout(params) {
  return getWithSaleToken('/saleLog/reLogin', params)
}

//创客体现设置
export function updatePostal(params) {
  return postWithSaleToken('/saleInfo/updatePostal', params)
}

// 创客我的业界
export function GetSaleMyOrder(params) {
  return getWithSaleToken('/saleMyOrder/myOrderData', params);
}


//获取已注册的信息
export function getLogin(params) {
  return postWithSaleToken('/findCus/registered', params)
}

//获取未注册的信息
export function getNoLogin(params) {
  return postWithSaleToken('/findCus/unregistered', params)
}


//创客发送验证码
export function getSaleVcode(params) {
  return wx_get('/witManage/gitVcode', params)
}

//创客提现
export function submitWit(params) {
  return postWithSaleToken('/witManage/submitWit', params)
}
//获取我的客户的信息
  export function getMyCustomer(params) {
    return getWithSaleToken('/saleMyClient/myClient', params)
  }

