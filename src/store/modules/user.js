import Vue from 'vue'
import {changePassword, deleteProfile, profile, sessionId} from '../../util/http'

const state = {
  sessionId: '',
  oldPassword: '',
  newPassword: '',
  deletePassword: ''
}

const mutations = {
  setUserData: function (state, {value, name}) {
    Vue.set(state, name, value)
  },
  setSessionId: function (state, sessionId) {
    Vue.set(state, 'sessionId', sessionId)
  },
  cleanPasswords: function (state) {
    Vue.set(state, 'oldPassword', '')
    Vue.set(state, 'newPassword', '')
  },
  deleteSession: function (state) {
    localStorage.setItem('msisdn', '')
    localStorage.setItem('email', '')
    localStorage.setItem('sessionId', '')
    Vue.set(state, 'sessionId', '')
    Vue.set(state, 'deletePassword', '')
  }
}

const actions = {
  addUserDataToState: function ({commit}, payload) {
    commit('setUserData', payload)
  },
  startSession: function ({commit}, {msisdn, password}) {
    sessionId(msisdn, password).then(response => {
      localStorage.setItem('sessionId', response.data.sessionId)
      profile(localStorage.sessionId).then(response => {
        localStorage.setItem('msisdn', response.data.msisdn)
        localStorage.setItem('email', response.data.contactEmail)
      })
      commit('setSessionId', response.data.sessionId)
    })
  },
  getSessionId: function ({commit}) {
    const sessionId = localStorage.getItem('sessionId')
    if (sessionId) {
      commit('setSessionId', sessionId)
    }
  },
  changePasswordState: function ({commit}) {
    changePassword(state.oldPassword, state.newPassword, state.sessionId)
    commit('cleanPasswords')
  },
  deleteProfileState: function ({commit}) {
    deleteProfile(state.deletePassword, state.sessionId)
    commit('deleteSession')
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
