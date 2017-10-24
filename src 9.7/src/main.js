// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Global from './components/Wap/global/global'
import Vuex from 'vuex'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import store from './vuex/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import VueLazyload from 'vue-lazyload'

const FastClick = require('fastclick')

Vue.use(Vuex)
Vue.use(MintUI)
Vue.use(ElementUI)
Vue.use(MuseUI)

// Vue.component(Rate.name, Rate)

//vue-lazyLoad图片懒加载插件
Vue.use(VueLazyload, {
  loading: './static/loading.gif',
})

//微信端生成二位码库
Vue.prototype.QRCode = QRCode
Vue.config.productionTip = false
//设置全局global
Vue.prototype.global = Global
//绑定fastClick
FastClick.attach(document.body)

Vue.directive('tap', {
  bind: function (el, binding) {
    var startTx, startTy, endTx, endTy;
    el.addEventListener("touchstart", function (e) {
      var touch = e.touches[0];
      startTx = touch.clientX;
      startTy = touch.clientY;
      el.addEventListener("touchend", function (e) {
        var touch = e.changedTouches[0];
        endTx = touch.clientX;
        endTy = touch.clientY;
        if (Math.abs(startTx - endTx) < 6 && Math.abs(startTy - endTy) < 6) {
          var method = binding.value.method;
          var params = binding.value.params;
          method(params);
        }
      }, false);
    }, false);

  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
})
