<template>
  <div>
    <div
      :style="{background:bgList[selectTag],color:txtList[selectTag]}"
      class="read-content"
      @click="barTag=!barTag">{{ txt }}</div>
    <BottomBar v-show="barTag"/>
  </div>
</template>

<script>
  import BottomBar from '@/components/BottomBar'
  export default {
    name: "Id",
    components:{
      BottomBar
    },
    data(){
      return{
        txt:'',
        selectTag:0,
        barTag:false,
        bgList:[
          "#FAF2DE",
          "#1D1D1D",
          "#D6EAD5",
          "#F1E2CD",
          "#F7E3EA",
          "#E5F8EC"
        ],
        txtList:[
          "#302C22",
          "#515151",
          "#30342F",
          "#413729",
          "#912D42",
          "#2E523D"
        ]
      }
    },
    async created(){
      let res=await this.$axios.get(`/api/getcontent?id=${this.$route.params.id}`)
      if(res.code==200){
        this.txt=res.data[0]['booktxt']
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .read-content
    white-space: pre-line;
    font-size 14px
    text-indent 2em
    padding 20px
</style>
