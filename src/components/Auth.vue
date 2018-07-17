<template>
  <div>
    <b-form @submit="onSubmit" class="entryForm">
      <h2>Вход в сервис денежных переводов</h2>
      <b-form-group label="Номер телефона">
        <b-input-group prepend="+7">
          <b-form-input type="tel"
                        required
                        class="inputTelNumber"
                        v-model="msisdnValue"
                        v-mask="'##########'"
                        placeholder="000 000-00-00"></b-form-input>
        </b-input-group>
      </b-form-group>
      <b-form-group label="Пароль">
        <b-input-group>
          <b-form-input :type="type"
                        required
                        class="inputPassword"
                        v-model="passValue"
                        placeholder="Введите пароль"></b-form-input>
          <b-input-group-append>
            <b-btn v-on:click="showPassword"><i class="fa fa-eye" aria-hidden="true"></i></b-btn>
          </b-input-group-append>
        </b-input-group>
        <a href="#">Забыли пароль?</a>
      </b-form-group>
      {{sessionId}}
      <b-button type="submit"
                class="btnSubmit">Войти</b-button>
      <p>Еще нет аккаунта в сервисе переводов?<br><router-link to="/registration">Зарегистрироваться</router-link></p>
    </b-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Auth',
  data () {
    return {
      type: 'password',
      msisdnValue: '',
      passValue: ''
    }
  },
  computed: {
    ...mapState({
      sessionId: state => state.user.sessionId
    })
  },
  methods: {
    ...mapActions({
      startSession: 'startSession'
    }),
    showPassword: function () {
      if (this.type === 'password') {
        this.type = 'text'
      } else {
        this.type = 'password'
      }
    },
    onSubmit (evt) {
      evt.preventDefault()
      this.startSession({msisdn: this.msisdnValue, password: this.passValue})
    }
  },
  updated () {
    if (this.sessionId) {
      this.$router.push('/home')
    }
  },
  created () {
    if (this.sessionId) {
      this.$router.push('/home')
    }
  }

}
</script>

<style scoped>
  a {
    color: #49924d;
  }
  p {
    font-size: 12px;
    color: #909291;
    padding-top: 70px;
    text-align: center;
  }
  .entryForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
  }
  .b-form-group, .btnSubmit {
    width: 360px;
  }
  legend {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .input-group-text {
    border-radius: 0;
    background-color: #ffffff;
    border-right: 0;
    color: black;
    font-weight: normal;
    font-size: 17px;
    height: 40px;
    padding-right: 0;
  }
  .form-control{
    border-radius: 0;
    box-shadow: none;
    color: black;
    font-size: 16px;
    height: 40px;
  }
  .inputTelNumber {
    border-left: 0;
  }
  .input-group-append button{
    background-color: #ffffff;
    color: blue;
    border-left: 0;
    border-color: #c9cbca;
  }
  i {
    font-size: 23px;
  }
  .btnSubmit {
    background-color: #49924d;
    border: 0;
    border-radius: 3px;
    color: #ffffff;
    font-size: 14px;
    height: 35px;
    margin-top: 35px;
  }
  .btnSubmit:hover{
    background-color: #31bd37;
    border: 0;
  }
  @media only screen and (max-width: 767px){
    .b-form-group, .btnSubmit {
      min-width: 100%;
    }
    .entryForm {
      padding-left: 15px;
      padding-right: 15px;
    }
  }
</style>
