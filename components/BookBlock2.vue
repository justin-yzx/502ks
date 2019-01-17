<template>
  <div class="block">
    <blocktitle
      :title="title"
    />
    <threebook
      :bookitem="bookitem.slice(0,3)"
    />
    <bookitem
      v-for="(item,index) in bookitem.slice(3,6)"
      :key="index"
      :book-data="item"
    />
  </div>
</template>

<script>
  import threebook from '@/components/ThreeBook'
  import bookitem from '@/components/BookItem'
  import blocktitle from '@/components/BlockTitle'
  export default {
    name: "BookBlock2",
    components:{
      threebook,
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

<style lang="stylus" scoped>
  .block
    border-bottom 8px solid #f4f5f7
</style>
