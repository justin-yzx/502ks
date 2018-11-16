<template>
  <div class="block">
    <blocktitle/>
    <bookitem
      v-for="item in 3"
      :key="item"/>
  </div>
</template>

<script>
  import bookitem from '@/components/BookItem'
  import blocktitle from '@/components/BlockTitle'
  export default {
    name: "BookBlock1",
    components:{
      bookitem,
      blocktitle
    }
  }
</script>

<style lang="stylus">
  .block
    border-bottom 8px solid #f4f5f7
</style>
