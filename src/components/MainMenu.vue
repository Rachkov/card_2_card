<template>
  <div>
    <b-navbar toggleable="md">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav class="left-nav">
          <router-link :class="`${active === '/home' ? 'active': ''}`" v-if="!sessionId" to="/home">Перевести деньги</router-link>
          <router-link :class="`${active === '/home' ? 'active': ''}`" v-if="sessionId" to="/home">Главная</router-link>
          <router-link :class="`${active === '/auth' ? 'active': ''}`" v-if="!sessionId" to="/auth" class="hidden-sm auth">
            <i class="fa fa-user-circle-o" aria-hidden="true"></i> Войти в сервис
          </router-link>
          <router-link :class="`${active === '/registration' ? 'active': ''}`" v-if="!sessionId" to="/registration" class="hidden-sm auth">
            <i class="fa fa-check-circle" aria-hidden="true"></i> Зарегистрироваться
          </router-link>
          <router-link :class="`${active === '/history' ? 'active': ''}`" v-if="sessionId" to="/history" class="hidden-sm">История переводов</router-link>

          <router-link class="visible-xs" to="#">Мои карты</router-link>
          <router-link to="/settings" class="visible-xs">Настройки</router-link>
          <router-link class="visible-xs" to="#">Лимиты и комиссии</router-link>
          <router-link class="visible-xs" to="#">Помощь</router-link>
          <router-link class="visible-xs" @click="exit" to="/home">Выйти</router-link>

        </b-navbar-nav>

        <!-- Right aligned nav items -->

        <b-navbar-nav v-if="!sessionId" class="ml-auto">
          <router-link :class="`${active === '/auth' ? 'active': ''}`" v-if="!sessionId" to="/auth" class="visible-sm auth">
            <i class="fa fa-user-circle-o" aria-hidden="true"></i>
          </router-link>
          <router-link :class="`${active === '/registration' ? 'active': ''}`" v-if="!sessionId" to="/registration" class="visible-sm auth">
            <i class="fa fa-check-circle" aria-hidden="true"></i>
          </router-link>
        </b-navbar-nav>

        <b-navbar-nav v-if="sessionId" class="ml-auto hidden-xs">

          <b-nav-item-dropdown variant="link" right no-caret>
            <template slot="button-content">
              <span class="fa fa-ellipsis-h"></span>
            </template>
            <router-link to="/history" class="visible-sm dropdown-item">История переводов</router-link>
            <b-dropdown-item href="#">Мои карты</b-dropdown-item>
            <router-link to="/settings" class="dropdown-item">Настройки</router-link>
            <b-dropdown-item href="#">Лимиты и комиссии</b-dropdown-item>
            <b-dropdown-item href="#">Помощь</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item @click="exit" href="/home"><span class="fa fa-sign-out"></span></b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MainMenu',
  props: ['active'],
  computed: {
    ...mapState({
      sessionId: state => state.user.sessionId
    })
  },
  methods: {
    exit: function () {
      localStorage.clear()
    }
  }
}
</script>

<style>
  #__BVID__7__BV_button_ {
    padding: 0;
  }
</style>

<style scoped>
  .navbar-light .left-nav .active {
    background-color: red;
    color: white;
  }
  .left-nav .nav-item {
    padding: 0;
  }
  .router-link-active {
    text-decoration: none;
  }
  .navbar-light .left-nav a:hover {
    background-color: #dfefea;
    color: black;
    text-decoration: none;
  }
  .navbar-light .left-nav a {
    background-color: #f8f8f8;
    color: #49924d;
    padding: 12px 80px 12px 80px;
    border-radius: 3px;
  }
  .navbar-light .ml-auto .nav-link, .navbar-light .ml-auto .b-nav-dropdown {
    background-color: #49924d;
    color: white;
    border-radius: 50px;
    height: 35px;
    width: 35px;
    padding: 0;
    margin-left: 10px;
  }
  .navbar-light .ml-auto .nav-link span {
    padding-top: 7px;
    padding-left: 10px;
    font-size: 20px;
  }
  .navbar-light .ml-auto .nav-link:hover, .navbar-light .ml-auto .b-nav-dropdown:hover {
    background-color: red;
  }
  .dropdown-menu .dropdown-item{
    color: #49924d;
    font-size: 14px;
  }
  .fa{
    color: white;
  }
  .navbar .navbar-collapse .ml-auto .nav-item a#__BVID__7__BV_button_ .nav-link {
    padding: 0;
  }
  .navbar-light .left-nav .active:hover {
    background-color: red;
    color: white;
  }
  .left-nav .auth i{
    color: #49924d;
    font-size: 20px;
  }
  .ml-auto .auth i{
    color: #49924d;
    font-size: 32px;
    padding-left: 10px;
  }
  .ml-auto .auth i:hover {
    color: red;
  }
  @media only screen and (max-width: 775px){
    .left-nav {
      font-size: 13px;
    }
  }
</style>
