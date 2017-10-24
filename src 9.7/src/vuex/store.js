import Vue from 'vue'
import Vuex from 'vuex'
import index from './modules/index'
import sale from './modules/saleModules'
import wx from './modules/wxModules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    index,
    sale,
    wx
  }
})
