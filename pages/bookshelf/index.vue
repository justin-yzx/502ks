<template>
  <div>
    <bottom :tag="1"/>
    <backtop/>
    <div
      v-if="bookshelf.length==0"
      class="none">书架中还没加入书籍哦</div>
    <bookitem
      v-for="(item,index) in bookshelf"
      :key="index"
      :book-data="item"
    />
  </div>
</template>

<script>
  import bottom from '@/components/Bottom'
  import backtop from '@/components/backtop'
  import bookitem from '@/components/BookItem'


  export default {
    name: "Bookshelf",
    components:{
      bottom,
      backtop,
      bookitem,
    },
    data(){
      return{
        bookshelf:[]
      }
    },
    mounted(){
      this.bookshelf=JSON.parse(localStorage.bookshelf?localStorage.bookshelf:'[]')
    }
  }
</script>

<style scoped lang="stylus">
  .none{
    text-align center
    padding-top 50px
  }
</style>
