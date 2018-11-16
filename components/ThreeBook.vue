<template>
  <div class="bookline">
    <div
      v-for="item in 3"
      :key="item"
      class="book-box">
      <img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=136768666,3306654460&fm=179&app=42&f=JPEG?w=115&h=161">
      <div class="book-name">{{ name[item] }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ThreeBook",
    data(){
      return{
        name:['斗破苍穹','斗破苍穹斗破苍穹','斗破苍穹斗破苍穹斗破苍穹','斗破苍穹斗破苍穹斗破苍穹']
      }
    }
  }
</script>

<style lang="stylus">
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
