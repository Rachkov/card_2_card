<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-form @submit="onSubmit">
          <cards :setValueToState="setValueToState"></cards>
          <b-col sm="12" md="12" class="wrapFormCard">
            <b-col sm="12" md="6">
              <div class="formCard">
                <div class="cus-input">
                  <div class="emailInp">
                    <b-form-checkbox>Отправить чек на e-mail</b-form-checkbox>
                    <b-form-input type="email"
                                  placeholder="Ваш E-mail">
                    </b-form-input>
                  </div>
                  <amount class="amount" :setValueToState="setValueToState"></amount>
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="6">
              <div class="formCardMes">
                <div class="cus-input">
                  <b-form-checkbox>Добавить сообщение получателю<i class="fa fa-question-circle-o" aria-hidden="true"></i></b-form-checkbox>
                </div>
              </div>
            </b-col>
          </b-col>
          <b-col sm="12" md="12" class="wrapButton">
            <b-col sm="12" md="6">
              <my-button buttonText="Перевести"></my-button>
            </b-col>
          </b-col>
        </b-form>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import amount from './Amount.vue'
import cards from './Cards.vue'
import myButton from './MyButton.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    amount,
    cards,
    myButton
  },
  name: 'FormCard',
  computed: {
    ...mapGetters({
      getPayment: 'getPayment'
    })
  },
  methods: {
    ...mapActions({
      addValueToState: 'addValueToState',
      startPayment: 'startPayment'
    }),
    async onSubmit (evt) {
      evt.preventDefault()
      this.startPayment(this.getPayment)
    },
    setValueToState: function (value, name) {
      this.addValueToState({value, name})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .form-control{
    border-radius: 0;
    box-shadow: none;
    font-size: 14px;
    height: 40px;
    width: 360px;
  }
  .custom-control-input {
    height: 13px;
    width: 13px;
  }
  .custom-control-label {
    display: block;
    font-size: 13px;
    font-weight: normal;
    margin: 0;
  }
  .cus-input{
    color: #909291;
    align-items: flex-start;
    display: flex;
    flex-direction: column;
  }
  label{
    display: inline;
  }
  .wrapFormCard, .wrapButton {
    margin-bottom: 20px;
    padding: 0;
  }
  .emailInp {
    padding-bottom: 10px;
  }
  .formCard, .formBut {
    align-items: flex-end;
    display: flex;
    flex-direction: column;
  }
  .formCardMes {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
  }
  @media only screen and (max-width: 767px){
    .formCard, .formCardMes {
      display: flex;
      align-items: center;
    }
    .cus-input, .form-control, .amount, .emailInp {
      min-width: 100%;
    }
  }
</style>
