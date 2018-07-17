import Vue from 'vue'
import { getAmount } from '../../util/http'

const state = {
  params: {}
}

const mutations = {
  amountParam: function (state, responce) {
    let params = {}
    params.minCommissionValue = responce.rule[0].commissionValue.minValue / 100
    params.currency = responce.currency
    params.commissionPercent = responce.rule[0].commissionValue.percentValue
    params.minSum = responce.rule[0]['min-sum'] / 100
    params.maxSum = responce.rule[0]['max-sum'] / 100
    params.minEndValue = (params.minSum + params.minCommissionValue)
    params.maxEndValue = params.maxSum + params.maxSum / 100 * params.commissionPercent
    Vue.set(state, 'params', params)
  }
}

const actions = {
  getAmount: function ({commit}) {
    getAmount().then(params => commit('amountParam', params.data))
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
