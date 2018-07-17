<template>
  <div>
    <h2>Регистрация</h2>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'Regestration',
  created () {
    this.$router.push('/registration/msisdnreg')
  }
}
</script>

<style scoped>
  h2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
</style>
