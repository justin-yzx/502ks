<template>
  <div
    v-show="show"
    class="bottom-bar">
    <bottomBarSet
      v-show="tag==1"
      @fontChange="fontChange"
      @colorChange="colorChange"/>
    <chapterTab
      v-if="tag==0"
      :bookid="bookid"
      :num="num"
    />
    <div class="bar-box">
      <div
        :class="{active:tag==0}"
        class="bar-item"
        @click="tag=0">
        <img
          class="img1"
          src="@/assets/read_icon_catalog_nor.png">
        <img
          class="img2"
          src="@/assets/read_icon_catalog_pre.png">
        <div>目录</div>
      </div>
      <div
        :class="{active:tag===1}"
        class="bar-item"
        @click="tag=1">
        <img
          class="img1"
          src="@/assets/read_icon_setting_nor.png">
        <img
          class="img2"
          src="@/assets/read_icon_setting_pre.png">
        <div>设置</div>
      </div>
    </div>
  </div>
</template>

<script>
  import bottomBarSet from './BottomBarSet'
  import chapterTab from './chapterTab'
  export default {
    name: "BottomBar",
    components:{
      bottomBarSet,
      chapterTab
    },
    props:{
      show:{
        type:Boolean,
        default: false
      },
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
        tag:-1
      }
    },
    watch:{
      show(){
        if(this.show){
          this.tag=-1
        }
      }
    },
    methods:{
      colorChange(index){
        this.$emit('colorChange',index)
      },
      fontChange(index){
        this.$emit('fontChange',index)
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .bottom-bar{
    position fixed
    width 100%
    height 50px
    left 0
    bottom 0
    background #252422
    font-size: 11px;
    color: #D0D0D0;
    z-index 500
    .bar-box{
      display flex
      justify-content space-around
      width 100%
      height 100%
    }

    .active{
      color #26C37D
      .img1{
        display none
      }
      .img2{
        display block !important
      }
    }
    .bar-item{
      .img2{
        display none
      }
      img{
        width 22px
        display block
        margin-top 5px
      }
    }
  }
</style>
