<template>
  <div class="formBut">
    <b-button type="submit" class="button">{{ buttonText }}</b-button>
  </div>
</template>

<script>
export default {
  name: 'MyButton',
  props: ['buttonText']
}
</script>

<style scoped>
  .btn-secondary {
    background-color: #49924d;
    border: 0;
    border-radius: 3px;
    color: #ffffff;
    margin-top: -10px;
    font-size: 14px;
  }
  .btn-secondary:hover{
    background-color: #31bd37;
    border: 0;
  }
  .formBut button {
    height: 40px;
    width: 360px;
  }
  @media only screen and (max-width: 767px){
    .formBut {
      display: flex;
      align-items: center;
    }
    .button {
      min-width: 100%;
    }
  }
</style>
