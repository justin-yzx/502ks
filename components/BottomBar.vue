<template>
  <div class="bottom-bar">
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
</template>

<script>
  export default {
    name: "BottomBar",
    data(){
      return{
        tag:0
      }
    }
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
    display flex
    justify-content space-around

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
