import Vue from 'vue'
import Vuex from 'vuex'
import payment from './modules/payment'
import amount from './modules/amount'
import user from './modules/user'
import registration from './modules/registration'
import history from './modules/history'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    payment,
    amount,
    user,
    registration,
    history
  }
})
