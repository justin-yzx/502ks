<template>
  <div>
    <headdiv
      :title="type[$route.params.type]"
      :show="true"
      backurl="/classify"
    />
    <div style="height: 50px"/>
    <backtop/>
    <bookitem
      v-for="(item,index) in booklist"
      :key="index"
      :book-data="item"
    />
    <infinite-loading
      @infinite="infiniteHandler">
      <span
        slot="no-more"
        class="nomore">没有更多数据了</span>
      <span
        slot="no-results"
        class="nomore">没有更多数据了</span>
    </infinite-loading>
  </div>
</template>

<script>
  import backtop from '@/components/backtop'
  import headdiv from '@/components/head'
  import bookitem from '@/components/BookItem'


  export default {
    name: "Bookshelf",
    components:{
      backtop,
      headdiv,
      bookitem,
    },
    data(){
      return{
        booklist:[],
        pagenum: 1,
        pagesize: 20,
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
      infiniteHandler($state){
        this.$axios.get('/api/getclassifydetail', {
          params: {
            type: this.$route.params.type,
            pagenum: this.pagenum,
            pagesize: this.pagesize,
          },
        }).then((res) => {
          if (res.data.length == this.pagesize) {
            this.pagenum += 1;
            this.booklist = [...this.booklist, ...res.data]
            $state.loaded();
          } else {
            this.booklist = [...this.booklist, ...res.data]
            $state.complete();
          }
        });
      }
    }
  }
</script>

<style scoped lang="stylus">
  .none{
    text-align center
    padding-top 50px
  }
  .nomore {
    font-size 10px
    color #7f828b
    margin-bottom 20px
    display block
  }
</style>
