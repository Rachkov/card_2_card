<template>
  <div>
    <div class="itemCard" v-for="item in items" :key="item.token">
      <b-card v-b-toggle="`${item.token}`" variant="primary">
        <b-row :class="`paymentItem ${item.result.status === 'FAILED' ? 'red' : item.result.status === 'SUCCESS' ? 'green' : 'yellow'}`">
          <div class="paymentDay">
            <strong>{{ getDate(item.finishedAt) }}</strong><br>
            {{ getTime(item.finishedAt) }}
          </div>
          <div class="cardTitle">
            {{ cardTitle(item.src.title) }}
          </div>
          <div class="cardInfo">
            <img :src="getPanBrand(item.src.pan)">
            <p>{{ item.src.pan.slice(-4) }}</p>
          </div>
          <div class="lineToCard">
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
          </div>
          <div class="cardInfo">
            <img :src="getPanBrand(item.src.pan)">
            <p>{{ item.src.pan.slice(-4) }}</p>
          </div>
          <!--<div class="cardInfo">
            <img :src="getPanBrand(item.dst.pan)">
            <p>{{ item.dst.pan.slice(-4) }}</p>
          </div>-->
          <div class="allSum">
            <strong>{{ (item.amount / 100).toFixed(2) }} {{ item.currency }}</strong>
          </div>
        </b-row>
      </b-card>
      <b-collapse :id="item.token">
        <b-card>
          <b-row :class="`itemCollapse ${item.result.status === 'FAILED' ? 'red' : item.result.status === 'SUCCESS' ? 'green' : 'yellow'}`">
            <div class="headerOperation">
              <h3 :class="`${item.result.status === 'FAILED' ? 'operationRed' : item.result.status === 'SUCCESS' ? 'operationGreen' : 'operationYellow'}`">{{ operationResult(item.result.status) }}</h3>
              <div class="headerButtons">
                <b-button><i class="fa fa-repeat" aria-hidden="true"></i></b-button>
                <b-button><i class="fa fa-download" aria-hidden="true"></i></b-button>
                <b-button><i class="fa fa-print" aria-hidden="true"></i></b-button>
              </div>
            </div>
            <div class="morePayInfo">
              <h5>Перевод с карты на карту</h5>
              <table>
                <tr class="line">
                  <td>Номер транзакции</td>
                  <td>{{ item.result.trxId }}</td>
                </tr>
                <tr>
                  <td>Сумма</td>
                  <td>{{ (item.amount / 100).toFixed(2) }} {{ item.currency }}</td>
                </tr>
                <tr>
                  <td>Размер комиссии</td>
                  <td>{{ (item.commission / 100).toFixed(2) }} {{ item.currency }}</td>
                </tr>
                <tr class="line">
                  <td>Итоговая сумма</td>
                  <td class="allSumValue">{{ ((item.amount + item.commission) / 100).toFixed(2) }} {{ item.currency }}</td>
                </tr>
                <tr>
                  <td>Код RRN</td>
                  <td>{{ item.result.rrn }}</td>
                </tr>
                <tr class="line">
                  <td>Код авторизации</td>
                  <td>{{ item.result.approvalCode }}</td>
                </tr>
                <tr class="trx">
                  <td>Карта отправителя</td>
                  <td><img :src="getPanBrand(item.src.pan)">{{ cardTitle(item.src.title) }}</td>
                </tr>
                <tr class="line">
                  <td>Карта получателя</td>
                  <td><img :src="getPanBrand(item.src.pan)"></td>
                </tr>
              </table>
            </div>
          </b-row>
        </b-card>
      </b-collapse>
    </div>
    <div class="wrapBtnMore">
      <b-button @click="showMore" class="btnMore">Показать больше</b-button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import visa from '../assets/resources/visa.svg'
import mastercard from '../assets/resources/mastercard.svg'
import maestro from '../assets/resources/maestro.svg'
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  name: 'ItemHistory',
  computed: {
    ...mapState({
      totalCount: state => state.history.totalCount,
      items: state => state.history.items
    })
  },
  methods: {
    ...mapMutations({
      clearItems: 'clearItems'
    }),
    ...mapActions({
      getHistory: 'getHistory'
    }),
    getDate: function (value) {
      moment.locale('ru')
      return moment(value).calendar().split(',')[0]
    },
    getTime: function (value) {
      moment.locale('ru')
      return moment(value).format('LTS')
    },
    getPanBrand: function (value) {
      if (value[0] === '4') {
        return visa
      } else if (value[0] === '5') {
        return mastercard
      } else if (value[0] === '6') {
        return maestro
      }
    },
    cardTitle: function (value) {
      if (value.length > 14) {
        return `${value.slice(0, 13)}...`
      } else {
        return value.slice(0, 14)
      }
    },
    operationResult: function (value) {
      if (value === 'SUCCESS') {
        return 'Операция выполнена успешно'
      } else if (value === 'FAILED') {
        return 'Операция не выполнена'
      } else {
        return 'Неизвестно'
      }
    },
    showMore: function () {
      if (this.items.length < this.totalCount) {
        this.getHistory({pagesize: 10, pagenum: this.items.length / 10})
      }
    }
  },
  created () {
    this.getHistory({pagesize: 10, pagenum: 0})
  },
  beforeDestroy () {
    this.clearItems()
  }
}
</script>

<style scoped>
  h5 {
    font-size: 15px;
    font-weight: bold;
  }
  td {
    padding: 5px 385px 5px 0px;
  }
  .card-body {
    padding: 0;
  }
  .itemCard {
    margin-bottom: 10px;
  }
  .itemCollapse {
    display: flex;
    flex-direction: column;
  }
  .paymentItem {
    display: flex;
    justify-content: space-between;
  }
  .paymentDay {
    padding: 10px;
  }
  .cardTitle {
    padding: 15px 80px;
  }
  .cardInfo {
    padding: 0px 40px;
  }
  .cardInfo p {
    padding-left: 10px;
  }
  .lineToCard {
    padding: 15px;
  }
  .allSum {
    padding: 15px 10px;
  }
  .red {
    border-left: 5px solid red;
  }
  .yellow {
    border-left: 5px solid yellow;
  }
  .green {
    border-left: 5px solid green;
  }
  .operationRed {
    color: red;
  }
  .operationYellow {
    color: yellow;
  }
  .operationGreen {
    color: green;
  }
  .headerOperation {
    display: flex;
  }
  .headerOperation h3, .morePayInfo {
    padding: 20px;
  }
  .headerButtons {
    display: flex;
    align-items: center;
  }
  .headerButtons button {
    background-color: white;
    border-radius: 4px;
    border: 1px solid #49924d;
    color: #49924d;
    padding: 7px 17px;
    font-size: 20px;
  }
  .headerButtons button:hover {
    background-color: #a2dea2;
    color: white;
  }
  .line {
    border-bottom: 1px solid #b4b4b4;
  }
  .allSumValue {
    padding: 1px;
    font-size: 21px;
  }
  .btnMore {
    background-color: #49924d;
    border: 0;
    border-radius: 3px;
    color: #ffffff;
    font-size: 14px;
    height: 35px;
  }
  .btnMore:hover{
    background-color: #31bd37;
    border: 0;
  }
  .wrapBtnMore {
    display: flex;
    justify-content: center;
  }
  @media only screen and (max-width: 1199px){
    .cardTitle {
      padding: 15px 50px;
    }
  }
  @media only screen and (max-width: 991px){
    .allSum {
      padding: 15px 5px;
    }
  }
  @media only screen and (max-width: 767px){
    .cardTitle {
      padding: 15px 15px;
    }
    .cardInfo {
      padding: 0px 15px;
    }
    .lineToCard {
      padding: 15px 5px;
    }
    .paymentDay {
      padding: 10px 3px;
    }
  }
  @media only screen and (max-width: 575px){
    .paymentItem {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .lineToCard, .cardTitle, .allSum {
      padding: 0;
    }
  }
</style>
