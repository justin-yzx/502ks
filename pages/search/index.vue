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
    <div class="defult-box">
      <div 
        v-if="searchList.length>0&&first"
        class="c-box">
        <div class="title">
          搜索历史
          <img
            class="delete"
            src="@/assets/delet.png"
            @click="deleteList"
          >
        </div>
        <div class="btn-box">
          <div
            v-for="item in searchList"
            :key="item"
            class="search-btn"
            @click="historySearch(item)"
          >{{ item }}</div>
        </div>
      </div>
      <div
        v-if="!first&&bookItem.length===0"
        class="no-res">
        <img src="@/assets/noressearch.png">
        <div>对不起，未能找到您想要的小说</div>
      </div>
      <div 
        v-if="first||(bookItem.length===0&&!first)"
        class="c-box">
        <div class="title">
          猜你喜欢
        </div>
        <div class="cnxh-box">
          <threebook 
            v-for="(item,index) in cnxhList" 
            :key="index" 
            :bookitem="item"/>
        </div>
      </div>
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
  import threebook from '@/components/ThreeBook'
  export default {
    name: "Search",
    components:{
      bookitem,
      threebook
    },
    async asyncData () {
      let { data } = await axios.get(BASE_URL+'/api/getindexlist')
      return { bookList: data.data }
    },
    data(){
      return{
        str:'',
        bookItem:[],
        searchList:[],
        first:true,
      }
    },
    computed:{
      cnxhList(){
        if(this.bookList.length>8){
          return [
            this.bookList.slice(0,3),
            this.bookList.slice(3,6),
            this.bookList.slice(6,9)
          ]
        }else {
          return []
        }
      }
    },
    mounted(){
      this.searchList=JSON.parse(localStorage.searchList?localStorage.searchList:"[]")
    },
    methods:{
      async search(){
        if(this.str.length === 0){
          return
        }
        this.bookItem=[{}]
        this.first=false
        let list = JSON.parse(localStorage.searchList?localStorage.searchList:"[]")
        if( list.indexOf(this.str)===-1){
          list.push(this.str)
        }
        this.searchList=list
        localStorage.searchList=JSON.stringify(list)
        let { data } = await axios.get(BASE_URL+'/api/getsearch?str='+this.str)
        this.bookItem=data.data
      },
      deleteList(){
        this.searchList=[]
        localStorage.searchList=JSON.stringify([])
      },
      historySearch(str){
        this.str=str;
        this.search()
      }
    },
  }
</script>

<style scoped lang="stylus">
  .defult-box{
    padding-top 60px
    .no-res{
      padding-bottom 16px
      border-bottom 5px solid #F5F5F5
      img{
        margin 30px auto
        display block
      }
      div{
        text-align center
      }
    }
    .c-box{
      padding 0 16px
      .title{
        font-size 16px
        color #000
        font-weight 600
        margin 10px 0 5px
        .delete{
          float right
          width 20px
        }
      }
      .btn-box{
        .search-btn{
          display inline-block
          padding 2px 5px
          background #cbcbcb
          color #47494e
          border-radius 5px
          margin 4px 5px
        }
      }
    }
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
