<template>
  <div class="head">
    <div
      v-if="show"
      class="left">
      <img
        src="@/assets/back.png"
        @click="back"
      >
    </div>
    <div class="title">
      {{ title }}
    </div>
  </div>
</template>

<script>
  export default {
    name: "Head",
    props: {
      title: {
        type: String,
        defult: '',
        required: true
      },
      backurl:{
        type: String,
        defult: '/',
        required: true
      },
      show:{
        type: Boolean,
        defult: true,
        required: true
      }
    },
    methods: {
      back() {
        location.href=this.backurl
      }
    }
  }
</script>

<style scoped lang="stylus">
  .head {
    position fixed
    height 44px
    width 100%
    top: 0
    background white
    box-shadow: 0 4px 6px 0 #eff7ff;
    z-index 500
    .left {
      position absolute
      left 10px
      top 6px
      z-index 5

      img {
        width 32px
        display block
        z-index 2
      }
    }

    .title {
      position absolute
      top: 0
      left 0
      width 100%
      line-height 44px
      font-size 16px
      text-align center
    }
  }
</style>
