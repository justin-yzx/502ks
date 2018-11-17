<template>
  <div class="set-box">
    <div class="color-list">
      <div
        v-for="item in 6"
        :key="item"
        :class="getColorClass(item-1)"
        class="color-item"
        @click="clickColor(item-1)"/>
    </div>
    <div class="font-list">
      <div @click="fontsize(0)">A-</div>
      <div @click="fontsize(1)">A+</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BottomBarSet",
    data(){
      return{
        list:[
          'color1',
          'color2',
          'color3',
          'color4',
          'color5',
          'color6'
        ],
        colorItem:0,
      }
    },
    watch:{
      colorItem(){
        this.$emit('colorChange',this.colorItem)
      }
    },
    mounted(){
      this.colorItem=localStorage.color?Number(localStorage.color):0
    },
    methods:{
      clickColor(item){
        this.colorItem=item
        localStorage.color=item
      },
      getColorClass(item){
        let str=this.list[item]
        if(item===this.colorItem){
          str+=' active'
        }
        return str
      },
      fontsize(num){
        this.$emit('fontChange',num)
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .set-box{
    position absolute
    bottom 50px
    height 90px
    width 100%
    background rgba(45, 35, 41, 0.8)
    .color-list{
      margin-top 20px
      display flex
      justify-content space-around
      .color-item{
        width 40px
        height 20px
        border 2px solid #2d2329
      }
      .active{
        border-color #26C37D
      }
      .color1{
        background #FAF2DE
      }
      .color2{
        background #444443
      }
      .color3{
        background #D6EAD5
      }
      .color4{
        background #F1E2CD
      }
      .color5{
        background #F7E3EA
      }
      .color6{
        background #E5F8EC
      }
    }
    .font-list{
      display flex
      justify-content space-around
      color white
      div{
        height 60px
        line-height 60px
        font-size 20px
      }
    }
  }
</style>
