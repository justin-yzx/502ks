<template>
  <div class="title">{{ title }}</div>
</template>

<script>
  export default {
    name: "BlockTitle",
    props:{
      title:{
        type:String,
        defult:'标题',
        required:true
      }
    }
  }
</script>

<style lang="stylus">
  .title
    height 38px
    line-height 54px
    font-size 16px
    font-weight 600
    padding-left 16px
</style>
