// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueTheMask from 'vue-the-mask'
import VueLodash from 'vue-lodash'
import Notifications from 'vue-notification'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {store} from './store/store'
import VModal from 'vue-js-modal'

Vue.use(VModal, { dialog: true })
Vue.use(BootstrapVue)
Vue.use(Notifications)
Vue.use(VueTheMask)
Vue.use(VueLodash, {name: '_'})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store: store,
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
