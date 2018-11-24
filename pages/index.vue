<template>
  <div>
    <nuxt-link
      v-for="(item,index) in bookList"
      :key="index"
      :to="`/bookinfo/${item.bookid}`">
      <bookitem
        :book-data="item"
        @click="clickBook(item)"/>
    </nuxt-link>
  </div>
</template>

<script>
  import { BASE_URL } from "@/config";
  import axios from 'axios'
  import bookitem from '@/components/BookItem'
  import bookblock1 from '@/components/BookBlock1'
  import bookblock2 from '@/components/BookBlock2'
  export default {
    components:{
      bookitem
    },
    async asyncData () {
      let { data } = await axios.get(BASE_URL+'/api/getbooklist')
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
