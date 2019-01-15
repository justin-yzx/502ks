<template>
  <transition name="fade">
    <div 
      v-show="posy>4000" 
      id="mtop" 
      :style="{backgroundImage:'url('+backgroundImg+')'}" 
      class="mtop" 
      @click="ClickTop"/>
  </transition>
</template>

<script>
  export default {
    name: 'BackTop',
    props:{
      backgroundImg:{
        type:String,
        default:'https://st.lzbook.net/static/new/com.lianzainovel/imags/icon_up.png'
      }
    },
    data() {
      return {
        posy: 0
      }
    },
    mounted() {
      document.addEventListener('scroll', () => {
        this.posy = this.getScrollTop();
      }, false);
    },
    methods: {
      ClickTop() {
        this.$emit('click')
        let top=this.getScrollTop();
        window.scrollBy(0, 0-top);
      },
      getScrollTop() {
        let scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
          scrollTop = document.body.scrollTop;
        }
        return scrollTop;
      }
    },

  }
</script>

<style lang="stylus" scoped>
 .mtop {
    position:fixed;
    right: 15px;
    bottom:60px;
    height :45px;
    width:45px;
    border-radius:100%;
    opacity: 1;
    z-index :800;
    border: 0 solid #F4F5F7;
    -webkit-box-shadow:0 1px 2px 0 rgba(184,197,217,0.20);
    -webkit-transform: translate3d(0, 0, 0);
    background-size:100% 100%;
  }

</style>


