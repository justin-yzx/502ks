<template>
  <div class="block">
    <blocktitle
      :title="title"
    />
    <bookitem
      v-for="(item,index) in bookitem"
      :key="index"
      :book-data="item"
    />
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
    },
    props:{
      bookitem:{
        defult:()=>[],
        type:Array,
        required:true
      },
      title:{
        type:String,
        defult:'标题',
        required:true
      }
    }
  }
</script>

<style lang="stylus">
  .block
    border-bottom 8px solid #f4f5f7
</style>
