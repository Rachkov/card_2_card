import Vue from 'vue'
import { payments } from '../../util/http'

const state = {
  items: []
}

const mutations = {
  historyItems: function (state, response) {
    let items = []
    items = response.items
    Vue.set(state, 'items', [...state.items, ...items])
    Vue.set(state, 'totalCount', response.totalCount)
  },
  clearItems: function (state) {
    Vue.set(state, 'items', [])
  }
}

const actions = {
  getHistory: function ({commit}, {pagesize, pagenum}) {
    payments(localStorage.getItem('sessionId'), pagesize, pagenum).then(response => commit('historyItems', response.data))
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
