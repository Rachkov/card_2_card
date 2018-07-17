import Vue from 'vue'
import {regMsisdn, regOtp, regConfirm, profile} from '../../util/http'

const state = {
  msisdnreg: '',
  otp: '',
  passwordreg: ''
}

const mutations = {
  setUserData: function (state, {value, name}) {
    Vue.set(state, name, value)
  },
  setSessionId: function (state, sessionId) {
    Vue.set(state, 'sessionId', sessionId)
  },
  cleanState: function (state) {
    Vue.set(state, 'msisdnreg', '')
    Vue.set(state, 'otp', '')
    Vue.set(state, 'passwordreg', '')
  }
}

const actions = {
  addUserDataToState: function ({commit}, payload) {
    commit('setUserData', payload)
  },
  registrationStart: function () {
    regMsisdn(state.msisdnreg)
  },
  registrationVerify: function () {
    regOtp(state.msisdnreg, state.otp)
  },
  registrationConfirm: function ({commit}) {
    regConfirm(state.msisdnreg, state.otp, state.passwordreg).then(response => {
      localStorage.setItem('sessionId', response.data.sessionId)
      profile(localStorage.sessionId).then(response => {
        localStorage.setItem('msisdn', response.data.msisdn)
      })
      commit('setSessionId', response.data.sessionId)
      commit('cleanState')
    })
  },
  getSessionId: function ({commit}) {
    const sessionId = localStorage.getItem('sessionId')
    if (sessionId) {
      commit('setSessionId', sessionId)
    }
  }
}

const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}
