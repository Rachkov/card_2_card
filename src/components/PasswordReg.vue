<template>
  <div>
    <p>Номер телефона <i class="fa fa-arrow-right" aria-hidden="true"></i> Код из SMS <i class="fa fa-arrow-right" aria-hidden="true"></i> <span>Пароль</span></p>
    <b-form @submit="onSubmit" class="entryForm">
      <b-form-group label="Придумайте пароль">
        <b-input-group>
          <b-form-input :type="type"
                        required
                        :value="passwordReg"
                        :formatter="passwordRegValue"
                        placeholder="Введите пароль">
          </b-form-input>
          <b-input-group-append>
            <b-btn v-on:click="showPassword"><i class="fa fa-eye" aria-hidden="true"></i></b-btn>
          </b-input-group-append>
        </b-input-group>
        <p>От 8 до 20 символов</p>
      </b-form-group>
      <p class="extra">Нажимая на кнопку, вы соглашаетесь с <a href="#">условиями<br> распространения услуги</a> </p>
      <div class="stepNav">
        <router-link class="btnCancel" to="/auth">Отмена</router-link>
        <b-button class="btnSubmit" type="submit">Далее</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PasswordReg',
  computed: {
    ...mapState({
      passwordReg: state => state.registration.passwordreg || '',
      sessionId: state => state.user.sessionId
    })
  },
  data () {
    return {
      type: 'password'
    }
  },
  methods: {
    ...mapActions({
      addUserDataToState: 'addUserDataToState',
      registrationConfirm: 'registrationConfirm'
    }),
    passwordRegValue: function (value) {
      this.setUserToState(value, 'passwordreg')
      return value
    },
    setUserToState: function (value, name) {
      this.addUserDataToState({value, name})
    },
    showPassword: function () {
      if (this.type === 'password') {
        this.type = 'text'
      } else {
        this.type = 'password'
      }
    },
    onSubmit: function (evt) {
      evt.preventDefault()
      this.registrationConfirm()
    }
  },
  beforeUpdate () {
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
  p{
    text-align: center;
    color: #909291;
  }
  span {
    font-size: 15px;
    font-weight: bold;
    color: black;
  }
  p i {
    font-size: 11px;
    color: #909291;
  }
  a {
    color: #49924d;
  }
  .extra {
    color: black;
    padding-bottom: 35px;
  }
  .entryForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
  }
  .b-form-group {
    width: 360px;
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
    padding: 5px 50px 5px 50px;
  }
  .btnSubmit:hover{
    background-color: #31bd37;
    border: 0;
  }
  .stepNav {
    padding-top: 35px;
    width: 360px;
    display: flex;
    justify-content: space-between;
  }
  .btnCancel {
    padding: 5px 50px 5px 50px;
    border: 1px solid #49924d;
    border-radius: 3px;
    text-decoration: none;
    transition: all ease-out 250ms;
  }
  .btnCancel:hover {
    background-color: #a2dea2;
    color: white;
  }
  @media only screen and (max-width: 767px){
    .b-form-group {
      min-width: 100%;
    }
    .entryForm {
      padding-left: 15px;
      padding-right: 15px;
    }
  }
</style>
