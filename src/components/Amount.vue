<template>
  <div>
    <p class="cus-label">Сумма перевода</p>
    <b-input-group :append="currency">
      <b-form-input type="tel"
                    required
                    :name="amountName"
                    :value="amountValue"
                    :placeholder="sumPlaceholder()"
                    :formatter="endInputValue">
      </b-form-input>
    </b-input-group>
    <p class="cus-label">Итоговая сумма</p>
    <b-input-group :append="currency">
      <b-form-input type="tel"
                    required
                    :placeholder="endSumPlaceholder()"
                    :value="endValue"
                    :formatter="sumInputValue">
      </b-form-input>
    </b-input-group>
    <p class="commission">
      Коммиссия <strong> {{minCommissionValue}}  {{ currency }}</strong> ({{ commissionPercent }}%,
      но не менее {{ minCommissionValue }} {{ currency }})<br>
      <span class="conditions">Совершая перевод, вы соглашаетесь с <br> условиями <a href="#">оферты</a></span>
    </p>
  </div>
</template>
<script>

import {AMOUNT, COMMISSION} from '../constants/index'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Amount',
  data () {
    return {
      amountName: AMOUNT,
      sumInpVal: '',
      endInpVal: ''
    }
  },
  props: ['setValueToState'],
  computed: {
    ...mapState({
      amountValue: state => state.payment[AMOUNT] || '',
      commission: state => state.payment[COMMISSION] / 100,
      minCommissionValue: state => state.amount.params.minCommissionValue,
      commissionPercent: state => state.amount.params.commissionPercent,
      currency: state => state.amount.params.currency,
      minSum: state => state.amount.params.minSum,
      maxSum: state => state.amount.params.maxSum,
      minEndValue: state => state.amount.params.minEndValue,
      maxEndValue: state => state.amount.params.maxEndValue,
      endValue: state => state.payment.endValue || ''
    })
  },
  methods: {
    ...mapActions({
      getAmount: 'getAmount'
    }),
    endInputValue: function (value, event) {
      let newValue = parseFloat(value)
      const commission = this.calcCommission(newValue)
      const endValue = this.calcEndInputValue(newValue, commission)
      if (this.commissionPercent) {
        this.setValueToState(newValue, event && event.target.name)
        this.setValueToState(endValue, 'endValue')
        this.setValueToState(commission * 100, COMMISSION)
      }
      return newValue || ''
    },
    sumInputValue: function (value) {
      let newValue = parseFloat(value)
      let sumInpVal
      if (value === '' || newValue < this.minCommissionValue + this.minSum) {
        sumInpVal = ''
      } else if ((newValue * this.commissionPercent / 100) < this.minCommissionValue) {
        sumInpVal = (newValue * 100 - this.minCommissionValue * 100) / 100
      } else {
        sumInpVal = Math.round((newValue / (100 + this.commissionPercent) * 100) * 100) / 100
      }
      if (this.commissionPercent) {
        this.setValueToState(sumInpVal, AMOUNT)
        this.setValueToState((newValue - sumInpVal) * 100, COMMISSION)
        this.setValueToState(newValue, 'endValue')
      }
      return newValue || ''
    },
    calcCommission: function (value) {
      let commission = value * this.commissionPercent / 100
      commission = (commission < 50) ? this.minCommissionValue : commission
      return commission
    },
    calcEndInputValue: function (value, commission) {
      return Math.round(((value * 100 + commission * 100) / 100) * 100) / 100
    },
    sumPlaceholder: function () {
      return `От ${this.minSum || 0} до ${this.maxSum || 0}`
    },
    endSumPlaceholder: function () {
      return `От ${this.minEndValue || 0} до ${this.maxEndValue || 0}`
    }
  },
  created () {
    this.getAmount()
  }
}
</script>
<style scoped>
  .commission {
    color: #909291;
    font-size: 12px;
  }
  .commission strong, .conditions{
    color: black;
  }
  .conditions a{
    color: #49924d;
  }
  .input-group{
    margin-bottom: 10px;
    width: 360px;
  }
  .form-control{
    border-radius: 0;
    border-right: 0;
    box-shadow: none;
    font-size: 14px;
    height: 40px;
  }
  .input-group-text {
    border-radius: 0;
    background-color: #ffffff;
    border-left: 0;
    color: #909291;
    font-weight: normal;
    font-size: 19px;
    height: 40px;
  }
  .cus-input{
    align-items: flex-start;
    display: flex;
    flex-direction: column;
  }
  .cus-label{
    color: #909291;
    display: block;
    font-size: 13px;
    font-weight: normal;
    margin: 0;
  }
  @media only screen and (max-width: 767px){
    .input-group, .form-control {
      min-width: 100%;
    }
    .commission {
      text-align: center;
    }
  }
</style>
