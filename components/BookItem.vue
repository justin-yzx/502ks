<template>
  <div 
    class="book-item" 
    @click="clickItem">
    <div class="book-img">
      <img :src="bookData.img">
    </div>
    <div class="book-r">
      <div class="book-name">{{ bookData.bookname }}</div>
      <div class="book-desc">
        {{ bookData.desc }}
      </div>
      <div class="book-bottom">
        <div class="book-auther">{{ bookData.bookauther }}</div>
        <div class="book-classify">{{ type[bookData.type] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BookItem",
    props:{
      bookData:{
        default(){
          return {}
        },
        type: Object
      }
    },
    data(){
      return{
        type:{
          'xuanhuan':'玄幻',
          'xianxia':'仙侠',
          'junshi':'军事',
          'lishi':'历史',
          'yanqing':'言情',
          'dushi':'都市',
          'wuxia':'武侠',
        }
      }
    },
    methods:{
      clickItem(){
        this.$router.push('/bookinfo/'+this.bookData.bookid)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .book-item
    position relative
    height 145px
    box-sizing border-box
    .book-img
      float left
      margin-top 16px
      margin-left 16px
      img
        width 80px
        height 113px
        display block
        box-shadow 0 2px 6px 0 rgba(184,197,217,0.40)
    .book-r
      position absolute
      left 112px
      right 16px
      top 16px
      bottom 16px
      .book-name
        padding-top 6px
        padding-bottom 8px
        font-size 15px
        line-height 15px
        color #212832
      .book-desc
        font-size 13px
        color #8D939D
        word-break break-all
        display -webkit-box
        /*! autoprefixer: ignore next */
        -webkit-box-orient vertical
        -webkit-line-clamp 2
        overflow hidden
        text-overflow ellipsis
      .book-bottom
        margin-top 16px
        .book-auther
          float left
          font-size 12px
          color #C7CCD3
        .book-classify
          float right
          font-size 10px
          padding 2px 4px
          border 1px solid #F0ADAD
          border-radius 2px
          color #F0ADAD
</style>
