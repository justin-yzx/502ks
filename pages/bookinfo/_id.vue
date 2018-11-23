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
      {{ desc }}
    </div>
    <div
      class="ml-list"
      @click="tag=1">
      <span class="ml-title">目录</span>
      <span>{{ muName }}</span>
    </div>
    <chapterTab
      v-if="tag==1"
      :bookid="bookid"/>


  </div>
</template>

<script>
  import axios from 'axios'
  import chapterTab from '@/components/chapterTab'
  export default {
    name: "Id",
    components:{
      chapterTab
    },
    data(){
      return{
        bookid:'',
        tag:0,
        descTag:true,
        muName:'',
      }
    },
    async asyncData({params}){
      console.log(params)
      let {data}=await axios.get('/api/getbookinfo?id='+params.id)
      if(data.code==200){
        return {
          bookname:data.data[0]['bookname'],
          desc:data.data[0]['desc'],
          img:data.data[0]['img'],
          bookauther:data.data[0]['bookauther'],
        }
      }else {
        return{
          bookname:'',
          desc:''
        }
      }
    },
    created(){
      this.bookid=this.$route.params.id
      this.$axios.get('/api/getchapterlist', {
        params: {
          id: this.bookid,
          pagenum: 1,
          pagesize: 1,
        },
      }).then(res=>{
        if(res.code==200){
          this.muName=res.data[0]['chaptername']
        }
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .head{
    height 144px
    background #F9F9F9
    .book-img{
      width 85px
      height 120px
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

</style>

