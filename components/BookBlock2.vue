<template>
  <div class="block">
    <blocktitle/>
    <threebook/>
    <bookitem
      v-for="item in 2"
      :key="item"/>
  </div>
</template>

<script>
  import threebook from '@/components/ThreeBook'
  import bookitem from '@/components/BookItem'
  import blocktitle from '@/components/BlockTitle'
  export default {
    name: "BookBlock1",
    components:{
      threebook,
      bookitem,
      blocktitle
    }
  }
</script>

<style lang="stylus">
  .block
    border-bottom 8px solid #f4f5f7
</style>
