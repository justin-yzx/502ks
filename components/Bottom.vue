<template>
  <div class="bottom-bar">
    <div 
      :class="tag==1?'active':''" 
      class="bar-btn" 
      @click="choose(1)">
      <img 
        class="img1" 
        src="@/assets/booksp.png">
      <img 
        class="img2"
        src="@/assets/booksp-active.png">
      <span>书架</span>
    </div>
    <div 
      :class="tag==2?'active':''" 
      class="bar-btn" 
      @click="choose(2)">
      <img 
        class="img1" 
        src="@/assets/book.png">
      <img 
        class="img2" 
        src="@/assets/book-active.png">
      <span>书城</span>
    </div>
    <div 
      :class="tag==3?'active':''" 
      class="bar-btn" 
      @click="choose(3)">
      <img 
        class="img1" 
        src="@/assets/class.png">
      <img 
        class="img2" 
        src="@/assets/class-active.png">
      <span>分类</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Bottom",
    props:{
      tag:{
        defult:1,
        type:Number,
        required:true
      }
    },
    methods:{
      choose(num){
        if(num==1&&num!=this.tag){
          console.log(1)
        }
        if(num==2&&num!=this.tag){
          console.log(2)
        }
        if(num==3&&num!=this.tag){
          console.log(3)
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .bottom-bar{
    position fixed
    bottom 0
    z-index 500
    width 100%
    height 44px
    padding 0 30px
    display flex
    justify-content space-between
    background #fff
    .bar-btn{
      img{
        width 20px
        margin 2px auto 0
      }
      span{
        color #000
        font-size 12px
      }
      .img2{
        display none
      }
      .img1{
        display block
      }
    }
    .active{
      .img2{
        display block
      }
      .img1{
        display none
      }
      span{
        color #26C37D
      }
    }
  }
</style>
