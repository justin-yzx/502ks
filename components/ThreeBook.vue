<template>
  <div class="bookline">
    <div
      v-for="(item,index) in bookitem"
      :key="index"
      class="book-box"
      @click="clickItem(item)">
      <img :src="item.img">
      <div class="book-name">{{ item.bookname }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ThreeBook",
    props:{
      bookitem:{
        defult:()=>[],
        type:Array,
        required:true
      }
    },
    methods:{
      clickItem(item){
        this.$router.push('/bookinfo/'+item.bookid)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .bookline
    margin-top 16px
    margin-bottom 16px
    .book-box
      width 33%
      float left
      img
        display block
        margin 0 auto
        width 80px
        height 113px
        box-shadow: 0 2px 6px 0 rgba(184,197,217,0.4)
      .book-name
        text-align center
        font-size 13px
        color #212832
        width 80%
        margin 0 auto
    &:after
      content ''
      clear both
      width 0
      height 0
      display block

</style>
