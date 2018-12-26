<template>
  <div>
    <div class="page-defult">页面不见了呢</div>
    <div
      class="btn"
      @click="gohome">去找书</div>
  </div>
</template>

<script>
  export default {
    name: "Defult",
    methods:{
      gohome(){
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped lang="stylus">
  .page-defult
    text-align center
    font-size 23px
    margin-top 100px
  .btn
    margin 100px auto
    text-align center
    width 80px
    height 30px
    line-height 30px
    background #3BC18E
    color white
    border-radius 5px
</style>
