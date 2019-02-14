<template>
  <div>
    <headdiv
      :show="false"
      title="书架"
      backurl=""
    />
    <div style="height: 50px"/>
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
  import headdiv from '@/components/head'


  export default {
    name: "Bookshelf",
    components:{
      bottom,
      backtop,
      bookitem,
      headdiv
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
