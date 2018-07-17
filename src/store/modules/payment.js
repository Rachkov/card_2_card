import Vue from 'vue'
import {
  AMOUNT,
  COMMISSION,
  DST_PAN,
  SRC_CSC,
  SRC_EXPIRY,
  SRC_EXPIRY_MM,
  SRC_EXPIRY_YY,
  SRC_PAN,
  URL_AMOUNT_PARAMS
} from '../../constants'
import {getToken, startPay, getReturnUrl, payment} from '../../util/http'

const state = {
  param: {},
  currency: URL_AMOUNT_PARAMS.currency,
  paymentId: URL_AMOUNT_PARAMS.paymentId,
  'src.type': 'card',
  [SRC_PAN]: '',
  [SRC_CSC]: '',
  'dst.type': 'card',
  [DST_PAN]: '',
  [AMOUNT]: '',
  [SRC_EXPIRY_MM]: '',
  [SRC_EXPIRY_YY]: '',
  [COMMISSION]: '',
  'endValue': ''
}

const mutations = {
  setValueToState: function (state, {value, name}) {
    Vue.set(state, name, value)
  },
  paymentParam: function (state, response) {
    Vue.set(state, 'param', response)
    Vue.set(state, AMOUNT, response.amount)
    Vue.set(state, COMMISSION, response.commission)
    Vue.set(state, 'endValue', (response.commission / 100) + response.amount)
  },
  clearAmount: function (state) {
    Vue.set(state, AMOUNT, '')
    Vue.set(state, COMMISSION, '')
    Vue.set(state, 'endValue', '')
  }
}

const actions = {
  addValueToState: function ({commit}, payload) {
    commit('setValueToState', payload)
  },
  startPayment: function ({commit}, payload) {
    getToken().then(response => startPay({ ...payload, returnUrl: getReturnUrl(response.data.token) }, response.data.token).then(response => (window.location.href = response.data.url)))
  },
  payment: function ({commit}, token) {
    payment(token).then(param => commit('paymentParam', param.data))
  }
}

const getters = {
  getPayment: state => {
    let obj = {}
    Object.keys(state).filter(key => key !== [SRC_EXPIRY_MM] || key !== [SRC_EXPIRY_YY]).forEach((key) => {
      const value = typeof state[key] === 'string' ? state[key].replace(/\s/g, '') : state[key]
      obj = {...obj, [key]: value}
    })
    obj = {...obj, [SRC_EXPIRY]: `${state[SRC_EXPIRY_MM]}${state[SRC_EXPIRY_YY]}`}
    return obj
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
