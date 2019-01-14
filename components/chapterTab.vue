<template>
  <div 
    class="chapter-tab"
    @click="closeSelf">
    <div class="tab-head">
      <div class="name">{{ bookname }}</div>
      <select 
        v-model="select"
        class="select-box"
        @click.stop>
        <option 
          v-for="item in zjList"
          :key="item"
          :value="item">{{ (item-1)*100+1 }}-{{ (item-1)*100+100>allnum ? allnum : (item-1)*100+100 }}</option>
      </select>
      <span>章</span>
    </div>
    <div class="chapter-box">
      <div
        v-for="item in chapterlist"
        :key="item.chapterid"
        :class="item.num==num?'active':''"
        class="chapter-list"
        @click="clickList(item)">{{ item.chaptername }}
      </div>
      <infinite-loading
        @infinite="infiniteHandler">
        <span
          slot="no-more"
          class="nomore">没有更多数据了</span>
      </infinite-loading>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ChapterTab",
    props: {
      bookid: {
        type: String,
        default: ''
      },
      num: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        chapterlist: [],
        pagenum: 1,
        pagesize: 20,
        bookname: '',
        allnum:0,
        select:1,
      }
    },
    computed:{
      zjList(){
        let i=Math.ceil(this.allnum/100)
        return i
      }
    },
    watch:{
      select(){
        document.getElementsByClassName('chapter-box')[0].scrollTop+=10
        setTimeout(()=>{
          this.chapterlist=[]
          this.pagenum=(this.select-1)*5+1
        },100)
      }
    },
    created() {
      this.pagenum=Math.ceil(this.num/this.pagesize)
      this.$axios.get('/api/getbookinfo?id=' + this.bookid).then(res => {
        if (res.code === 200) {
          this.bookname = res.data[0]['bookname']
          this.allnum = res.data[0]['num']
        }
      })
    },
    methods: {
      closeSelf(){
        this.$emit('update:tag',-1)
      },
      infiniteHandler($state) {
        this.$axios.get('/api/getchapterlist', {
          params: {
            id: this.bookid,
            pagenum: this.pagenum,
            pagesize: this.pagesize,
          },
        }).then((res) => {
          if (res.data.length == this.pagesize) {
            this.pagenum += 1;
            this.chapterlist = [...this.chapterlist, ...res.data]
            $state.loaded();
          } else {
            this.chapterlist = [...this.chapterlist, ...res.data]
            $state.complete();
          }
        });
      },
      clickList(item) {
        this.$router.push(`/book/${item.chapterid}`)
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .nomore {
    font-size 10px
    color #7f828b
  }

  .active {
    color #3BC18E !important
  }

  .chapter-tab
    position fixed
    left 0
    top 0
    bottom 0
    right 0
    width 100%
    background rgba(0,0,0,0.4)

    .tab-head
      width 80%
      height 80px
      font-size 16px
      background #F9F9F9
      color #212832
      padding-left 20px
      .name{
        height 50px
        line-height 60px
      }
      .select-box{
        width 100px
        height 20px
        line-height 20px
      }

    .chapter-box
      position absolute
      top 80px
      left 0
      width 80%
      bottom 0
      overflow scroll
      background white

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
