<template>
  <b-col sm="12" md="12">
    <b-row>
      <b-col sm="12" md="6" class="sent-data">
        <left-card :brand="myCardBrand" :handleChange="changeBrand" :setValueToState="setValueToState"></left-card>
      </b-col>
      <b-col sm="12" md="6" class="get-data">
        <right-card :brand="personCardBrand" :handleChange="changeBrand" :setValueToState="setValueToState"></right-card>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import visa from '../assets/resources/visa.svg'
import mastercard from '../assets/resources/mastercard.svg'
import maestro from '../assets/resources/maestro.svg'
import leftCard from './CardLeft.vue'
import rightCard from './CardRight.vue'

export default {
  components: {
    leftCard,
    rightCard
  },
  data () {
    return {
      myCardBrand: '',
      personCardBrand: ''
    }
  },
  name: 'Cards',
  props: ['setValueToState'],
  methods: {
    changeBrand: function (brand, value) {
      if (value[0] === '4') {
        this[brand] = visa
      } else if (value[0] === '5') {
        this[brand] = mastercard
      } else if (value[0] === '6') {
        this[brand] = maestro
      } else {
        this[brand] = null
      }
    }
  }
}
</script>

<style scoped>
  .sent-data {
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    padding-bottom: 25px;
  }
  .get-data {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding-bottom: 25px;
  }
  @media only screen and (max-width: 767px){
    .sent-data, .get-data {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
  }
</style>
