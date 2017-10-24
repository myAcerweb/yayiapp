import Vue from 'vue'
import Router from 'vue-router'
import Tab from '@/components/Wap/tab'
import Index from '@/components/Wap/index/index'
import classifyIndex from '@/components/Wap/classify/classifyIndex'
import shoppingCar from '@/components/Wap/shoppingCar/shoppingCar'
import suborder from '@/components/Wap/shoppingCar/suborder'
import pay from '@/components/Wap/shoppingCar/pay'
import mine from '@/components/Wap/mine/mine'
import details from '@/components/Wap/brandDes/brandDes'
import productsList from '@/components/Wap/productsList/productsList'
import logIn from '@/components/Wap/logIn/logIn'
import register from '@/components/Wap/register/register'
import logInMsg from '@/components/Wap/logIn/logInMsg'
import forgetPwd from '@/components/Wap/logIn/forgetPwd'
import personalData from '@/components/Wap/mine/personalData'
import collect from '@/components/Wap/mine/collect'
import searchWord from '@/components/Wap/index/searchWord'
import confirmAddress from '@/components/Wap/shoppingCar/confirmAddress'
import myCoin from '@/components/Wap/mine/myCoin'
import invoice from '@/components/Wap/shoppingCar/invoice'
import customerService from '@/components/Wap/mine/customerService'
import paySucced from '@/components/Wap/shoppingCar/paySucced'

import exchange from '@/components/Wap/mine/exchange'
import exchangeDetail from '@/components/Wap/mine/exchangeDetail'


import coinDetail from '@/components/Wap/mine/coinDetail'
import payResult from '@/components/Wap/mine/payResult'
import coinCash from '@/components/Wap/mine/coinCash'
import coinCashDetail from '@/components/Wap/mine/coinCashDetail'
import cashSetting from '@/components/Wap/mine/cashSetting'


/*order页面组件*/
import Order from '@/components/Wap/order/order'
import OrderDetail from '@/components/Wap/order/orderDetail'
import AllOrders from '@/components/Wap/order/children/allOrders'
import DeliveryOrders from '@/components/Wap/order/children/deliveryOrders'
import EvaluateOrders from '@/components/Wap/order/children/evaluateOrders'
import PaymentOrders from '@/components/Wap/order/children/paymentOrders'
import ReceivedOrders from '@/components/Wap/order/children/receivedOrders'
import Logistics from '@/components/Wap/order/logistics'
import Comment from '@/components/Wap/order/comment'


import address from '@/components/Wap/mine/adress'
import addAddress from '@/components/Wap/mine/addAddress'


/*wx_user组件*/
import User from '@/components/wx_user/user'
import UserBindWx from '@/components/wx_user/children/userBindWx'
import Bindinfo from '@/components/wx_user/children/bindinfo'
import UserRegisterWx from '@/components/wx_user/children/userRegisterWx'
import QrCode from '@/components/wx_user/qrcode'

//创客组件
import salesIndex from '@/components/salesWap/index/index'
import salesCustomer from '@/components/salesWap/customer/salesCustomer'
import salesLogin from '@/components/salesWap/login/login'
import salesForgetPwd from '@/components/salesWap/login/forgetPwd'
import salesRegister from '@/components/salesWap/register/saleRegister'
import salesRange from '@/components/salesWap/saleCharts/saleCharts'
import SalePersonal from '@/components/salesWap/personal/salePersonal'
import SaleWallet from '@/components/salesWap/personal/subpage/saleWallet'
import WithdrawSetting from '@/components/salesWap/personal/subpage/withdrawSetting'
import SaleWithdraw from '@/components/salesWap/personal/subpage/saleWithdraw'
import myCustomer from '@/components/salesWap/customer/myCustomer'
import customerDetails from '@/components/salesWap/customer/customerDetails'

/*ProductList组件*/
import ProductList from '@/components/Wap/ProductList/ProductList.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: {name: 'index'}},
    {
      path: '/yayi',
      component: Tab,
      name: 'tab',
      children: [
        {path: '/yayi/index', component: Index, name: 'index'},
        {path: '/yayi/classify', component: classifyIndex, name: 'classifyIndex'},
        {path: '/yayi/shoppingCar', component: shoppingCar, name: 'shoppingCar'},
        {path: '/yayi/mine', component: mine, name: 'mine'},
      ]
    },
    {
      path: '/logIn',
      name: 'logIn',
      component: logIn,
    },
    {
      path: '/register',
      name: 'register',
      component: register,
    },
    {
      path: '/customerService',
      name: 'customerService',
      component: customerService,
    },
    {
      path: '/logInMsg',
      name: 'logInMsg',
      component: logInMsg,
    },
    {
      path: '/suborder',
      name: 'suborder',
      component: suborder,
    },
    {
      path: '/pay',
      name: 'pay',
      component: pay,
    },
    {
      path: '/forgetPwd',
      name: 'forgetPwd',
      component: forgetPwd,
    },
    {
      path: '/details/:goodId',
      name: 'details',
      component: details,
    },
    {
      name: 'wx_user',
      path: '/wx_user',
      component: User,
      children: [
        {path: '/wx_user/userBindWx', component: UserBindWx, name: 'userBindWx'},
        {path: '/wx_user/bindinfo', component: Bindinfo, name: 'bindinfo'},
        {path: '/wx_user/userRegisterWx', component: UserRegisterWx, name: 'userRegisterWx'}
      ]
    },
    {
      name: 'qrcode',
      path: '/qrcode',
      component: QrCode
    },
    {
      name: 'productsList',
      path: '/productsList',
      component: productsList
    },
    {
      name: 'personalData',
      path: '/personalData',
      component: personalData
    },
    {
      name: 'collect',
      path: '/collect',
      component: collect
    },
    {
      name: 'searchWord',
      path: '/searchWord',
      component: searchWord
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      children: [
        {path: '/order', redirect: {name: 'allOrders'}},
        {path: '/order/allOrders', component: AllOrders, name: 'allOrders'},
        {path: '/order/deliveryOrders', component: DeliveryOrders, name: 'deliveryOrders'},
        {path: '/order/evaluateOrders', component: EvaluateOrders, name: 'evaluateOrders'},
        {path: '/order/paymentOrders', component: PaymentOrders, name: 'paymentOrders'},
        {path: '/order/receivedOrders', component: ReceivedOrders, name: 'receivedOrders'}
      ]
    },
    {
      name: 'orderDetail',
      path: '/orderDetail',
      component: OrderDetail
    },
    {
      name: 'address',
      path: '/address',
      component: address
    },
    {
      name: 'addAddress',
      path: '/addAddress',
      component: addAddress
    },
    {
      name: 'payResult',
      path: '/payResult',
      component: payResult
    },
    {
      name: 'confirmAddress',
      path: '/confirmAddress',
      component: confirmAddress
    },
    {
      name: 'myCoin',
      path: '/myCoin',
      component: myCoin,
      children: [
        {
          name: 'coinDetail',
          path: '/coinDetail',
          component: coinDetail
        },
        {
          name: 'exchange',
          path: '/exchange',
          component: exchange
        },
        {
          name: 'exchangeDetail',
          path: '/exchangeDetail',
          component: exchangeDetail
        }
      ]
    },
    {

      name: 'productList',
      path: '/productList',
      component: ProductList
    },
    {
      name: 'logistics',
      path: '/logistics',
      component: Logistics
    },
    {
      name: 'comment',
      path: '/comment',
      component: Comment
    },
    {
      name: 'invoice',
      path: '/invoice',
      component: invoice
    },
    {
      name: 'salesIndex',
      path: '/salesIndex',
      component: salesIndex
    },
    {
      name: 'salesCustomer',
      path: '/salesCustomer',
      component: salesCustomer
    },
    {
      name: 'paySucced',
      path: '/paySucced',
      component: paySucced
    },
    {
      name: 'salesLogin',
      path: '/salesLogin',
      component: salesLogin
    },
    {
      name: 'salesForgetPwd',
      path: '/salesForgetPwd',
      component: salesForgetPwd
    },
    {
      name: 'salesRegister',
      path: '/salesRegister',
      component: salesRegister
    },
    {
      name: 'salesRange',
      path: '/salesRange',
      component: salesRange
    },
    {
      name: 'salePersonal',
      path: '/salePersonal',
      component: SalePersonal
    },
    {
      name: 'saleWallet',
      path: '/salePersonal/saleWallet',
      component: SaleWallet
    },
    {
      name: 'withdrawSetting',
      path: '/salePersonal/withdrawSetting',
      component: WithdrawSetting
    },
    {
      name: 'saleWithdraw',
      path: '/salePersonal/saleWithdraw',
      component: SaleWithdraw
    },
    {
      name: 'myCustomer',
      path: '/myCustomer',
      component: myCustomer
    },
    {

      name: 'customerDetails',
      path: '/customerDetails',
      component: customerDetails
    },
    {
      name: 'coinCash',
      path: '/coinCash',
      component: coinCash
    },
    {
      name: 'coinCashDetail',
      path: '/coinCashDetail',
      component: coinCashDetail
    },
    {
      name: 'cashSetting',
      path: '/cashSetting',
      component: cashSetting

    },
  ]
})
