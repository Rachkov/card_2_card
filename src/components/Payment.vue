<template>
  <div>
    <h1 id="result">{{ getStatus() }}</h1>
    <table>
      <tr>
        <td>Номер операции</td>
        <td>{{ trxId }}</td>
      </tr>
      <tr>
        <td>Дата</td>
        <td>{{ getDate() }}</td>
      </tr>
      <tr>
        <td>Время</td>
        <td>{{ getTime() }}</td>
      </tr>
      <tr>
        <td>Код RRN</td>
        <td>{{ rrn }}</td>
      </tr>
      <tr>
        <td>Код авторизации</td>
        <td>{{ approvalCode }}</td>
      </tr>
      <th><p><b>Данные отправителя</b></p></th>
      <tr>
        <td>Карта отправителя</td>
        <td>{{ srcpan }}</td>
      </tr>
      <th><p><b>Данные получателя</b></p></th>
      <tr>
        <td>Карта получателя</td>
        <td>{{ dstpan }}</td>
      </tr>
      <tr>
        <td class="sum">Сумма</td>
        <td>{{ amount }} {{ currency }}</td>
      </tr>
      <tr>
        <td>Размер комиссии</td>
        <td>{{ getCommission() }} {{ currency }}</td>
      </tr>
      <tr>
        <td><p><b>Итоговая сумма</b></p></td>
        <td><strong>{{ getAllSum() }} {{ currency }}</strong></td>
      </tr>
    </table>
    <button v-on:click="clearAmount"><router-link to="/home">Готово!</router-link></button>
    <router-link to="/home">Повторить</router-link>
  </div>
</template>

<script>
import queryString from 'query-string'
import moment from 'moment'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Payment',
  computed: {
    ...mapState({
      amount: state => state.payment.param.amount / 100,
      commission: state => state.payment.param.commission / 100,
      currency: state => state.payment.param.currency,
      finishedAt: state => state.payment.param.finishedAt,
      srcpan: state => state.payment.param.src && state.payment.param.src.pan,
      dstpan: state => state.payment.param.dst && state.payment.param.dst.pan,
      status: state => state.payment.param.result && state.payment.param.result.status,
      rrn: state => state.payment.param.result && state.payment.param.result.rrn,
      trxId: state => state.payment.param.result && state.payment.param.result.trxId,
      approvalCode: state => state.payment.param.result && state.payment.param.result.approvalCode
    })
  },
  methods: {
    ...mapMutations({
      clearAmount: 'clearAmount'
    }),
    ...mapActions({
      payment: 'payment'
    }),
    getUrlToken: function (str) {
      const query = queryString.parse(str.replace(/^\??/, ''))
      return query.token
    },
    getDate: function () {
      moment.locale('ru')
      return moment(this.finishedAt).format('LL')
    },
    getTime: function () {
      moment.locale('ru')
      return moment(this.finishedAt).format('LT')
    },
    getAllSum: function () {
      return this.amount + this.commission
    },
    getCommission: function () {
      if (this.commission === null) {
        return this.commission
      } else {
        return this.commission.toFixed(2)
      }
    },
    getStatus: function () {
      if (this.status === 'SUCCESS') {
        document.getElementById('result').classList.add('green')
        return 'Операция выполнена успешно'
      } else if (this.status === 'UNKNOWN') {
        document.getElementById('result').classList.add('red')
        return 'Операция не выполнена'
      }
    }
  },
  created: function () {
    const token = this.getUrlToken(window.location.search)
    this.payment(token)
  }
}
</script>

<style scoped>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h1 {
    margin-top: 50px;
    margin-bottom: 50px;
  }
  td {
    padding-right: 100px;
  }
  p {
    color: black;
    padding-top: 10px;
  }
  .sum {
    padding-top: 10px;
  }
  a {
    color: green;
    text-decoration: underline;
  }
  a:hover {
    text-decoration: none;
  }
  .paymentNav {
    display: flex;
    justify-content: space-between;
  }
  .green {
    color: green;
  }
  .red {
    color: red;
  }
</style>
