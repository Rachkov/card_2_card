<template>
  <div>
    <h4>Данные получателя</h4>
    <div class="card">
      <img class="brand" :src="brand">
      <div class="numCard">
        <label>
          <span>Номер карты</span>
          <b-form-input id="personCardNum"
                        required
                        :name="dstPanName"
                        :value="dstPanValue"
                        :formatter="handleChangePan"
                        v-mask="'#### #### #### #### ###'"
                        type="text">
          </b-form-input>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import {DST_PAN} from '../constants/index'
import { mapState } from 'vuex'

export default {
  name: 'CardRight',
  props: ['handleChange', 'setValueToState', 'brand'],
  data () {
    return {
      dstPanName: DST_PAN
    }
  },
  methods: {
    handleChangePan: function (value, event) {
      this.setValueToState(value, event && event.target.name)
      this.handleChange('personCardBrand', value)
      return value
    }
  },
  computed: {
    ...mapState({
      dstPanValue: state => state.payment[DST_PAN]
    })
  }
}
</script>

<style scoped>
  h4 {
    text-align: center;
  }
  .card {
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(0,0,0,0.2);
    height: 210px;
    width: 360px;
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
  .form-control{
    border-radius: 0;
    height: 28px;
    font-size: 14px;
    box-shadow: none;
  }
  .numCard {
    margin-bottom: 20px;
    padding-top: 28px;
    padding-left: 30px;
  }
  .numCard input {
    border: 0;
    border-bottom: 1px solid black;
    width: 300px;
  }
  .numCard span {
    align-items: flex-start;
    display: flex;
    font-size: 12px;
    font-weight: normal;
    margin: 0;
  }
</style>
