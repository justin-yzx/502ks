<template>
  <div>
    <div class="search-top">
      <div class="search-box">
        <img src="@/assets/search.png">
        <input 
          v-model="str"
          type="text"
          placeholder="搜索你想要的内容"
        >
      </div>
      <div
        class="search-btn"
        @click="search"
      >搜索</div>
    </div>
    <div class="book-list">
      <bookitem
        v-for="(item,index) in bookItem"
        :key="index"
        :book-data="item"
      />
    </div>
  </div>
</template>

<script>
  import { BASE_URL } from "@/config";
  import axios from 'axios'
  import bookitem from '@/components/BookItem'
  export default {
    name: "Search",
    components:{
      bookitem
    },
    data(){
      return{
        str:'',
        bookItem:[],
      }
    },
    methods:{
      async search(){
        if(this.str.length === 0){
          return
        }
        let { data } = await axios.get(BASE_URL+'/api/getsearch?str='+this.str)
        this.bookItem=data.data
      }
    }
  }
</script>

<style scoped lang="stylus">
  .book-list{
    padding-top 60px
  }
  .search-top{
    height: 55px;
    width: 100%;
    position: fixed;
    top: 0;
    z-index 800
    display flex
    background: white;
    align-items center
    justify-content center
    .search-btn{
      color: #6a7a8a;
      padding-left 10px
    }
    .search-box{
      width 80%
      display flex
      align-items center
      background #f4f6f8
      height 30px
      border-radius 20px
      input{
        outline none
        border none
        background rgba(0,0,0,0)
        width 80%
        margin-left 5px
      }
      img{
        display block
        width 20px
        height 20px
        margin-left 10px
      }
    }
  }
</style>
