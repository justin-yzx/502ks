<template>
  <div class="chapter-tab">
    <div class="tab-head">
      <div class="name">{{ bookname }}</div>
    </div>
    <div class="chapter-box">
      <div
        v-for="item in chapterlist"
        :key="item.chapterid"
        :class="item.num==num?'active':''"
        class="chapter-list"
        @click="clickList(item)">{{ item.chaptername }}</div>
      <infinite-loading
        @infinite="infiniteHandler"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ChapterTab",
    props:{
      bookid:{
        type: String,
        default: ''
      },
      num:{
        type: Number,
        default: 0
      }
    },
    data(){
      return{
        chapterlist:[],
        pagenum:1,
        pagesize:30,
        bookname:''
      }
    },
    created(){
      this.$axios.get('/api/getbookinfo?id='+this.bookid).then(res=>{
        if(res.code===200){
          this.bookname=res.data[0]['bookname']
        }
      })
    },
    methods:{
      infiniteHandler($state){
        this.$axios.get('/api/getchapterlist', {
          params: {
            id: this.bookid,
            pagenum: this.pagenum,
            pagesize: this.pagesize,
          },
        }).then(( res ) => {
          if (res.data.length==this.pagesize) {
            this.pagenum += 1;
            this.chapterlist=[...this.chapterlist,...res.data]
            $state.loaded();
          } else {
            this.chapterlist=[...this.chapterlist,...res.data]
            $state.complete();
          }
        });
      },
      clickList(item){
        this.$router.push(`/read/${item.chapterid},${item.num}`)
      }
    }
  }
</script>

<style lang="stylus" scoped>
.active{
  color #3BC18E !important
}
.chapter-tab
  position fixed
  left 0
  top 0
  bottom 0
  width 80%
  background #ffffff
  .tab-head
    height 80px
    line-height 80px
    font-size 16px
    background #F9F9F9
    color #212832
    padding-left 20px
    display flex
    justify-content space-between
  .chapter-box
    position absolute
    top 80px
    left 0
    width 100%
    bottom 0
    overflow scroll
    .chapter-list
      height 50px
      line-height 50px
      font-size 14px
      color #212832
      padding-left 16px
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
</style>
