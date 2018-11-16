<template>
  <div>
    <bookitem
      v-for="item in 10"
      :key="item"/>
  </div>
</template>

<script>
  import bookitem from '@/components/BookItem'
  export default {
    name: "Classify",
    components:{
      bookitem
    }
  }
</script>

<style lang="stylus">

</style>
