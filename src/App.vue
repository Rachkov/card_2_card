<template>
  <div id="app">
    <main-menu :active="active"></main-menu>
    <router-view/>
  </div>
</template>

<script>
import MainMenu from './components/MainMenu.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    MainMenu
  },
  data () {
    return {
      active: this.$route.matched[0].path
    }
  },
  name: 'App',
  methods: {
    ...mapActions({
      getSessionId: 'getSessionId'
    })
  },
  created () {
    this.getSessionId()
  },
  beforeUpdate () {
    const path = this.$route.matched[0].path
    if (this.active !== path) {
      this.active = path
    }
  }
}
</script>

<style>
  body {
    background-color: #f8f8f8;
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
  }
  h4 {
    color: #82807e;
    font-size: 18px;
  }
  .row{
    padding: 0;
    margin: 0;
  }
</style>
