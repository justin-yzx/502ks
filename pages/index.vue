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
  import axios from 'axios'
  import bookitem from '@/components/BookItem'
  import bookblock1 from '@/components/BookBlock1'
  import bookblock2 from '@/components/BookBlock2'
  export default {
    components:{
      bookitem,
      bookblock1,
      bookblock2,
    },
    async asyncData () {
      let { data } = await axios.get('/api/getbooklist')
      return { bookList: data.data }
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
