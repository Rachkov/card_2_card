<template>
  <div>
    <p>Номер телефона <i class="fa fa-arrow-right" aria-hidden="true"></i> <span>Код из SMS</span> <i class="fa fa-arrow-right" aria-hidden="true"></i> Пароль</p>
    <b-form @submit="next" class="entryForm">
      <b-form-group label="Код из SMS">
        <b-form-input type="tel"
                      :value="otpReg"
                      :formatter="otpValue"
                      required>
        </b-form-input>
        <a href="#">Получить код еще раз</a>
      </b-form-group>
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
  name: 'OtpReg',
  computed: {
    ...mapState({
      otpReg: state => state.registration.otp || ''
    })
  },
  methods: {
    ...mapActions({
      addUserDataToState: 'addUserDataToState',
      registrationVerify: 'registrationVerify'
    }),
    otpValue: function (value) {
      this.setUserToState(value, 'otp')
      return value
    },
    setUserToState: function (value, name) {
      this.addUserDataToState({value, name})
    },
    next: function (evt) {
      evt.preventDefault()
      this.$router.push('passwordreg')
      this.registrationVerify()
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
  i {
    font-size: 11px;
    color: #909291;
  }
  a {
    color: #49924d;
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
  .form-control{
    border-radius: 0;
    box-shadow: none;
    color: black;
    font-size: 16px;
    height: 40px;
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
