<template>
  <div class="group">
    <div class="item">
      <h3>Номер телефона</h3>
      <h1>+{{ number }}</h1>
    </div>
    <div class="item">
      <h3>Пароль</h3>
      <b-form @submit="changePasswordSbm">
        <b-form-group label="Старый пароль">
          <b-input-group>
            <b-form-input :type="type"
                          required
                          :value="oldPasswordValue"
                          :formatter="oldPassword"
                          placeholder="От 8 до 20 символов">
            </b-form-input>
            <b-input-group-append>
              <b-btn v-on:click="showPassword"><i class="fa fa-eye" aria-hidden="true"></i></b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
        <b-form-group label="Новый пароль">
          <b-input-group>
            <b-form-input :type="type"
                          required
                          :value="newPasswordValue"
                          :formatter="newPassword"
                          placeholder="От 8 до 20 символов">
            </b-form-input>
            <b-input-group-append>
              <b-btn v-on:click="showPassword"><i class="fa fa-eye" aria-hidden="true"></i></b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
        <b-button class="btnSubmit" type="submit">Изменить</b-button>
        <v-dialog/>
      </b-form>
    </div>
    <div class="item">
      <h3>Удаление профиля</h3>
      <p>Удаление личных карт, сохраненных карт и истории</p>
      <b-form @submit="deleteProfileSbm">
        <b-form-group label="Текущий пароль">
          <b-input-group>
            <b-form-input :type="type"
                          required
                          :value="deletePasswordValue"
                          :formatter="deletePassword"
                          placeholder="От 8 до 20 символов">
            </b-form-input>
            <b-input-group-append>
              <b-btn v-on:click="showPassword"><i class="fa fa-eye" aria-hidden="true"></i></b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
        <b-button class="btnSubmit" type="submit">Удалить профиль</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Settings',
  data () {
    return {
      type: 'password',
      number: localStorage.getItem('msisdn')
    }
  },
  computed: {
    ...mapState({
      oldPasswordValue: state => state.user.oldPassword || '',
      newPasswordValue: state => state.user.newPassword || '',
      deletePasswordValue: state => state.user.deletePassword || ''
    })
  },
  methods: {
    ...mapActions({
      addUserDataToState: 'addUserDataToState',
      changePasswordState: 'changePasswordState',
      deleteProfileState: 'deleteProfileState'
    }),
    oldPassword: function (value) {
      this.setPasswordToState(value, 'oldPassword')
      return value
    },
    newPassword: function (value) {
      this.setPasswordToState(value, 'newPassword')
      return value
    },
    deletePassword: function (value) {
      this.setPasswordToState(value, 'deletePassword')
      return value
    },
    setPasswordToState: function (value, name) {
      this.addUserDataToState({value, name})
    },
    showPassword: function () {
      if (this.type === 'password') {
        this.type = 'text'
      } else {
        this.type = 'password'
      }
    },
    changePasswordSbm: function (evt) {
      evt.preventDefault()
      this.changePasswordState()
    },
    deleteProfileSbm: function (evt) {
      evt.preventDefault()
      this.deleteProfileState()
      this.$router.replace('/home')
    }
  }
}
</script>

<style scoped>
  .group {
    display: grid;
    justify-content: space-around;
    grid-template-columns: repeat(auto-fit, 360px);
  }
  .item {
    background-color: white;
    border: 1px solid #a2a4a3;
    border-radius: 2px;
    padding: 30px 30px;
    margin: 10px 10px;
  }
  .item h1 {
    text-align: center;
    padding-top: 20px;
  }
  .btnSubmit {
    background-color: #49924d;
    border: 0;
    border-radius: 3px;
    color: #ffffff;
    font-size: 14px;
    height: 35px;
    margin-top: 15px;
    padding: 5px 15px 5px 15px;
  }
  .btnSubmit:hover{
    background-color: #31bd37;
    border: 0;
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
  .input-group-append button{
    background-color: #ffffff;
    color: blue;
    border-left: 0;
    border-color: #c9cbca;
  }
  i {
    font-size: 23px;
  }
</style>
