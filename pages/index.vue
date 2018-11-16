<template>
  <div>
    <nuxt-link
      v-for="(item,index) in bookList"
      :key="index"
      :to="`bookinfo/${item.bookid}`">
      <bookitem
        :book-data="item"
        @click="clickBook(item)"/>
    </nuxt-link>

    <bookblock1/>
    <bookblock2/>
  </div>
</template>

<script>
  import bookitem from '@/components/BookItem'
  import bookblock1 from '@/components/BookBlock1'
  import bookblock2 from '@/components/BookBlock2'
  export default {
    components:{
      bookitem,
      bookblock1,
      bookblock2,
    },
    data(){
      return{
        bookList:[]
      }
    },
    async created(){
      let data = await this.$axios.get('/api/getbooklist')
      if(data.code===200){
        this.bookList=data.data
      }
    },
    methods:{
      clickBook(item){
        console.log(item)
      }
    }
  }
</script>

<style>

</style>
