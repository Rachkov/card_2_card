<template>
  <div>
    <b-container>
      <h4>История передводов</h4>
      <item-history></item-history>
    </b-container>
  </div>
</template>

<script>
import ItemHistory from '../components/ItemHistory.vue'

export default {
  name: 'History',
  components: {
    ItemHistory
  }
}
</script>

<style scoped>

</style>
