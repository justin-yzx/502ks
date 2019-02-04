<template>
  <div>
    <div class="head">
      <img
        :src="img"
        class="book-img">
      <div class="book-head">
        <div class="book-name">{{ bookname }}</div>
        <div class="book-auth">{{ bookauther }}</div>
      </div>
    </div>
    <div
      :class="descTag?'desc-little':''"
      class="book-desc "
      @click="descTag=!descTag">
      {{ desc?desc:'暂无简介' }}
    </div>
    <div
      class="ml-list"
      @click="gochapter">
      <span class="ml-title">目录</span>
      <span>{{ muName }}</span>
    </div>
    <div class="cnxh">
      <div class="title">
        精选推荐
      </div>
      <div class="cnxh-box">
        <threebook
          v-for="(item,index) in cnxhList"
          :key="index"
          :bookitem="item"/>
      </div>
    </div>
    <div class="bottom">
      <div
        v-if="!hasBook"
        class="bottom-btn join"
        @click="join">加入书架</div>
      <div
        v-if="hasBook"
        class="bottom-btn join">已在书架</div>
      <div
        class="bottom-btn"
        @click="read">立即阅读</div>
    </div>
  </div>
</template>

<script>
  import { BASE_URL } from "@/config";
  import axios from 'axios'
  import threebook from '@/components/ThreeBook'
  export default {
    name: "Id",
    components:{
      threebook,
    },
    data(){
      return{
        bookid:'',
        tag:0,
        descTag:true,
        muName:'',
        muId:'',
        oldNum:1,
        bookList:[],
        bookshelf:[],
      }
    },
    async asyncData({params}){
      let {data}=await axios.get(BASE_URL+'/api/getbookinfo?id='+params.id)
      if(data.code==200){
        return {
          bookname:data.data[0]['bookname'],
          desc:data.data[0]['desc'],
          img:data.data[0]['img'],
          bookauther:data.data[0]['bookauther'],
          type:data.data[0]['type'],
        }
      }else {
        return{
          bookname:'',
          desc:''
        }
      }
    },
    head(){
      return{
        title: this.bookname,
        meta:[
          { name: 'description', content: this.bookname+'--'+this.desc }
        ]
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
      },
      hasBook(){
        for(let i=0;i<this.bookshelf.length;i++){
          if(this.bookshelf[i]['bookid'] === this.bookid){
            return true
          }
        }
        return false
      }
    },
    watch:{
      bookshelf(){
        localStorage.bookshelf=JSON.stringify(this.bookshelf)
      }
    },
    mounted(){
      this.bookid=this.$route.params.id
      let oldNum=localStorage.getItem(this.bookid)
      if(oldNum !== null){
        try {
          this.oldNum = parseInt(oldNum)
        }catch (e) {
          this.oldNum = 1
        }
      }
      this.$axios.get('/api/getchapterlist', {
        params: {
          id: this.bookid,
          pagenum: this.oldNum,
          pagesize: 1,
        },
      }).then(res=>{
        if(res.code==200){
          this.muName=res.data.length>0?res.data[0]['chaptername']:''
          this.muId=res.data.length>0?res.data[0]['chapterid']:''
        }
      })
      axios.get(BASE_URL+'/api/getpageinforecommend').then(res=>{
        let data=res.data
        this.bookList=data.data
      })

      let bookArr=localStorage.getItem('bookshelf')

      if(!bookArr){
        localStorage.bookshelf='[]'
        bookArr='[]'
      }else {
        try{
          let bookArrObj=JSON.parse(bookArr)
          if(typeof bookArrObj === 'object'){
            this.bookshelf=bookArrObj
          }else {
            this.bookshelf=[]
          }
        }catch (e) {
          this.bookshelf=[]
        }
      }

    },

    methods:{
      gochapter(){
        this.$router.push('/chapterlist/'+this.bookid)
      },
      join(){
        if(this.hasBook){
          return
        }
        this.bookshelf.push({
          img:this.img,
          bookname:this.bookname,
          bookauther:this.bookauther,
          type:this.type,
          desc:this.desc,
          bookid:this.bookid,
        })
      },
      read(){
        if(this.muId){
          location.href=`/book/${this.muId}`
        }else {
          toast('暂无书籍信息')
        }
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .head{
    height 144px
    background #F9F9F9
    .book-img{
      width 80px
      height 129px
      display block
      margin-left 16px
      padding-top 16px
      float left
      box-sizing border-box
    }
    .book-head{
      width 200px
      float left
      margin-left 16px
      margin-top 16px
      .book-name{
        margin-top 20px
        font-size: 17px;
        color: #212832;
        font-weight 600
      }
      .book-auth{
        margin-top 15px
        font-size: 12px;
        color: #8D939D;
      }
    }
  }
  .book-desc{
    font-size: 14px;
    color: #5D646E;
    letter-spacing: 0;
    text-align: justify;
    line-height: 24px;
    width 90%
    margin 16px auto
  }

  .desc-little{
    word-break: break-all;
    display: flex;
    display: -webkit-box;
    /* autoprefixer: ignore next */
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    text-overflow:ellipsis;
  }
  .ml-list{
    height 54px
    line-height 36px
    font-size: 13px;
    color: #8D939D;
    padding-left 16px
    border-bottom 8px solid rgb(244,245,247)
    border-top 8px solid rgb(244,245,247)
    .ml-title{
      color black
      font-size 18px
    }
    span{
      vertical-align middle
    }
  }

  .cnxh{
    margin-bottom 50px
    border-bottom 8px solid rgb(244,245,247)
    padding-bottom 10px
    .title{
      font-size 16px
      color #000
      font-weight 600
      margin 10px 0 5px
      padding 0 16px
    }
  }

  .bottom{
    position fixed
    bottom 0
    width 100%
    height 50px
    line-height 50px
    display flex
    background white
    .bottom-btn{
      width 50%
      text-align center
    }
    .join{
      background #26C37D
      color #fff
    }
  }
</style>

