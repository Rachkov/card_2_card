<template>
  <div>
    <h4>Данные отправителя</h4>
    <div class="card">
      <img class="brand" :src="brand">
      <div class="numCard">
        <label>
          <span>Номер карты</span>
          <b-form-input id="myCardNum"
                        required
                        :name="srcPanName"
                        :value="srcPanValue"
                        :formatter="handleChangePan"
                        v-mask="'#### #### #### #### ###'"
                        type="text">
          </b-form-input>
        </label>
      </div>
      <b-row class="cardParam">
        <b-col cols="6" sm="6" md="6" class="dateCard">
          <p>Срок действия</p>
          <b-form-input type="text"
                        required
                        :name="srcExpiryMonthName"
                        :value="srcExpiryMonthValue"
                        placeholder="ММ"
                        v-mask="'##'"
                        :formatter="handleFormatter">
          </b-form-input>/
          <b-form-input type="text"
                        required
                        :name="srcExpiryYearName"
                        :value="srcExpiryYearValue"
                        placeholder="ГГ"
                        v-mask="'##'"
                        :formatter="handleFormatter">
          </b-form-input>
        </b-col>
        <b-col cols="6" sm="6" md="6" class="cvvCard">
          <label>
            <p>CVV/CVC <i class="fa fa-question-circle-o" aria-hidden="true"></i></p>
            <b-form-input type="text"
                          required
                          :name="srcCscName"
                          :value="srcCscValue"
                          v-mask="'###'"
                          :formatter="handleFormatter">
            </b-form-input>
          </label>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import {SRC_PAN, SRC_CSC, SRC_EXPIRY_YY, SRC_EXPIRY_MM, SRC_EXPIRY} from '../constants/index'
import { mapState } from 'vuex'

export default {
  name: 'CardLeft',
  props: ['handleChange', 'setValueToState', 'brand'],
  data () {
    return {
      srcPanName: SRC_PAN,
      srcCscName: SRC_CSC,
      srcExpiryYearName: SRC_EXPIRY_YY,
      srcExpiryMonthName: SRC_EXPIRY_MM,
      srcExpiryName: SRC_EXPIRY
    }
  },
  computed: {
    ...mapState({
      srcPanValue: state => state.payment[SRC_PAN],
      srcExpiryMonthValue: state => state.payment[SRC_EXPIRY_MM],
      srcExpiryYearValue: state => state.payment[SRC_EXPIRY_YY],
      srcCscValue: state => state.payment[SRC_CSC]
    })
  },
  methods: {
    handleChangePan: function (value, event) {
      this.setValueToState(value, event && event.target.name)
      this.handleChange('myCardBrand', value)
      return value
    },
    handleFormatter: function (value, event) {
      this.setValueToState(value, event && event.target.name)
      return value
    }
  }
}
</script>

<style scoped>
  .success {
    border-color: red;
  }
  h4 {
    text-align: center;
  }
  .cardParam {
    padding-left: 15px;
  }
  .card {
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(0,0,0,0.2);
    height: 210px;
    width: 360px;
  }
  .form-control{
    border-radius: 0;
    height: 28px;
    font-size: 14px;
    box-shadow: none;
  }
  .cvvCard .form-control, .dateCard .form-control {
    height: 20px;
    display: inline;
    padding: 0;
  }
  .brand {
    float: right;
    min-height: 44px;
    max-height: 44px;
    min-width: 65px;
    padding-top: 12px;
    padding-right: 15px;
    margin-left: auto;
  }
  .numCard {
    margin-bottom: 20px;
    padding-top: 28px;
    padding-left: 30px;
  }
  .numCard span, .dateCard p, .cvvCard p {
    align-items: flex-start;
    display: flex;
    font-size: 12px;
    font-weight: normal;
    margin: 0;
  }
  .cvvCard i {
    font-size: 25px;
    font-weight: lighter;
    padding-left: 5px;
  }
  .numCard input {
    border: 0;
    border-bottom: 1px solid black;
    width: 300px;
  }
  .dateCard {
    padding-left: 15px;
  }
  .dateCard p {
    padding-bottom: 8px;
  }
  .dateCard input {
    border: 0;
    border-bottom: 1px solid black;
    text-align: center;
    width: 30px;
  }
  .cvvCard input {
    border: 0;
    border-bottom: 1px solid black;
    width: 50px;
  }
</style>
