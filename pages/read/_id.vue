<template>
  <div>
    <div
      :style="{background:bgList[selectTag],color:txtList[selectTag],fontSize:fontList[fontTag]}"
      class="read-content"
      @click="barTag=!barTag">{{ txt }}</div>
    <BottomBar
      :show="barTag"
      :bookid="bookid"
      @fontChange="fontChange"
      @colorChange="colorChange"/>
  </div>
</template>

<script>
  import { BASE_URL } from "@/config";
  import axios from 'axios'
  import BottomBar from '@/components/BottomBar'
  export default {
    name: "Id",
    components:{
      BottomBar
    },
    async asyncData({params}){
      console.log(params)
      let {data}=await axios.get(`${BASE_URL}/api/getcontent?id=${params.id}`)
      if(data.code==200){
        return {
          txt:data.data[0]['booktxt'],
          bookid:data.data[0]['bookid']
        }
      }else {
        return{
          txt:'',
          bookid:''
        }
      }
    },
    data(){
      return{
        txt:'',
        bookid:'',
        selectTag:0,
        fontTag:2,
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
        ],
        fontList:[
          '10px',
          '12px',
          '14px',
          '16px',
          '18px',
        ]
      }
    },
    mounted(){
      this.fontTag=localStorage.font?Number(localStorage.font):2
    },
    methods:{
      colorChange(index){
        this.selectTag=index
      },
      fontChange(index){
        if(index===1&&this.fontTag===4){
          return
        }
        if(index===0&&this.fontTag===0){
          return
        }
        if(index){
          this.fontTag++
        }else {
          this.fontTag--
        }
        localStorage.font=this.fontTag
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
