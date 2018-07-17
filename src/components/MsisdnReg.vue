<template>
  <div>
    <p><span>Номер телефона</span> <i class="fa fa-arrow-right" aria-hidden="true"></i> Код из SMS <i class="fa fa-arrow-right" aria-hidden="true"></i> Пароль</p>
    <b-form @submit="next" class="entryForm">
      <b-form-group label="Номер телефона">
        <b-input-group prepend="+7">
          <b-form-input type="tel"
                        required
                        class="inputTelNumber"
                        :value="msisdnRegValue"
                        :formatter="telNumberValue"
                        v-mask="'##########'"
                        placeholder="000 000-00-00"></b-form-input>
        </b-input-group>
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
  name: 'MsisdnReg',
  computed: {
    ...mapState({
      msisdnRegValue: state => state.registration.msisdnreg || ''
    })
  },
  methods: {
    ...mapActions({
      addUserDataToState: 'addUserDataToState',
      registrationStart: 'registrationStart'
    }),
    telNumberValue: function (value) {
      this.setUserToState(value, 'msisdnreg')
      return value
    },
    setUserToState: function (value, name) {
      this.addUserDataToState({value, name})
    },
    next: function (evt) {
      evt.preventDefault()
      this.registrationStart()
      this.$router.push('otpreg')
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
