<template>
  <div>
    <backtop />
    <headNav
      :show="true"
      title="章节"
      backurl="goback"
    />
    <div class="book-box">
      <div class="book-name">{{ bookname }}</div>
      <div class="book-num">{{ allnum }}章</div>
      <div 
        class="sort-type"
        @click="sort=!sort"
      >{{ sort?'倒序':'正序' }}</div>
    </div>
    <div
      v-for="item in bookList"
      :key="item.chapterid"
      class="chapter-list"
      @click="clickList(item)"
    >
      {{ item.chaptername }}
    </div>
  </div>
</template>

<script>
  import {BASE_URL} from "@/config";
  import axios from 'axios'
  import headNav from '@/components/head.vue'
  import backtop from '@/components/backtop'

  export default {
    name: "Chapter",
    components: {
      headNav,
      backtop
    },
    data(){
      return{
        bookList:[],
        sort:true
      }
    },
    async asyncData({params}) {
      let {data} = await axios.get(BASE_URL + '/api/getbookinfo?id=' + params.id)
      if (data.code == 200) {
        return {
          bookname: data.data[0]['bookname'],
          allnum: data.data[0]['num']
        }
      } else {
        return {
          bookname: '',
          allnum: 0
        }
      }
    },
    watch:{
      sort(){
        this.bookList.reverse()
      }
    },
    created() {
      this.$axios.get('/api/getallchapterlist', {
        params: {
          id: this.$route.params.id,
        },
      }).then(res=>{
        this.bookList=res.data
      })
    },
    methods:{
      clickList(item){
        location.href=`/book/${item.chapterid}`
      }
    }
  }
</script>

<style scoped lang="stylus">
  .book-box{
    position relative
    padding-top 54px
    padding-left 15px
    border-bottom 5px solid #F5F5F5
    .book-name{
      font-size 16px
    }
    .book-num{
      font-size 12px
      padding-top 5px
      padding-bottom 10px
    }
    .sort-type{
      position absolute
      right 15px
      top 64px
    }
  }
  .chapter-list{
    line-height 40px
    padding-left 15px
    border-bottom 1px #7f828b  dashed
  }
</style>
