<template>
  <div>
    <bottom :tag="2"/>
    <backtop/>
    <div
      class="search"
      @click="search">
      <img src="@/assets/search.png">
      <span>搜索</span>
    </div>
    <bookblock1
      :bookitem="bookData[0]"
      title="不看后悔系列"
    />
    <bookblock2
      :bookitem="bookData[1]"
      title="本本经典再现"
    />
    <bookblock1
      :bookitem="bookData[2]"
      title="必读完本系列"
    />
    <bookblock2
      :bookitem="bookData[3]"
      title="主编精选推荐"
    />
    <bookblock1
      :bookitem="bookData[4]"
      title="本周人气热书"
    />
    <bookblock2
      :bookitem="bookData[5]"
      style="margin-bottom: 55px"
      title="老书虫必读"
    />
  </div>
</template>

<script>
  import { BASE_URL } from "@/config";
  import axios from 'axios'
  import bookitem from '@/components/BookItem'
  import bookblock1 from '@/components/BookBlock1'
  import bookblock2 from '@/components/BookBlock2'
  import backtop from '@/components/backtop'
  import bottom from '@/components/Bottom'

  export default {
    components:{
      bookitem,
      bookblock1,
      bookblock2,
      backtop,
      bottom,

    },
    async asyncData () {
      let { data } = await axios.get(BASE_URL+'/api/getindexlist')
      return { bookList: data.data }
    },
    computed:{
      bookData(){
        if(this.bookList.length>35){
          return [
            this.bookList.slice(0,6),
            this.bookList.slice(6,12),
            this.bookList.slice(12,18),
            this.bookList.slice(18,24),
            this.bookList.slice(24,30),
            this.bookList.slice(30,36),
          ]
        }else {
          return []
        }
      }
    },
    methods:{
      search(item){
        this.$router.push('/search')
      }
    }
  }
</script>

<style scoped lang="stylus">
  .search{
    display: flex;
    justify-content: center;
    align-items: center;
    height 45px
    border 8px solid #f4f5f7;
    img{
      width: 16px;
      height: 16px;
      display: block;
    }
    span{
      padding-left 8px
      height 16px
      line-height 16px
      font-size 12px
      color #7f828b
    }
  }
</style>
