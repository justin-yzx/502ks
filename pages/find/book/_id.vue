<template>
  <div>
    <Defult v-if="!bookid"/>
    <div
      v-if="bookid"
      :style="{background:bgList[selectTag],color:txtList[selectTag]}"
      class="read-content"
      @click="barTag=!barTag">
      <div
        v-if="thisNum"
        class="title">
        {{ thisNum.chaptername }}
      </div>
      <div :style="{fontSize:fontList[fontTag]}">
        {{ txt }}
      </div>
      <div class="btn-box">
        <div
          v-if="lastNum"
          class="btn"
          @click="push(lastNum)">上一章</div>
        <div
          v-if="nextNum"
          class="btn"
          @click="push(nextNum)">下一章</div>
      </div>
    </div>

    <BottomBar
      :show="barTag"
      :bookid="bookid"
      :num="thisNum?thisNum.num:0"
      @fontChange="fontChange"
      @colorChange="colorChange"/>
  </div>
</template>

<script>
  import { BASE_URL } from "@/config";
  import axios from 'axios'
  import BottomBar from '@/components/BottomBar'
  import Defult from '@/components/Defult'
  export default {
    name: "Id",
    components:{
      BottomBar,
      Defult,
    },
    async asyncData({params}){
      let req=params.id.split(',')
      let {data}=await axios.get(`${BASE_URL}/api/getcontent?id=${req[0]}`)
      if(data.code==200){
        return {
          txt:data.data['book']['booktxt']
            .replace(/无弹窗小说网/g, "")
            .replace(/www.530p.com/ig, "")
            .replace(/DouLaidu/ig, "")
            .replace(/www/ig, "")
            .replace(/com/ig, "")
            .replace(/txtxiazai/ig, "")
            .replace(/org/ig, ""),
          bookid:data.data['book']['bookid'],
          lastNum:data.data['lastNum'],
          nextNum:data.data['nextNum'],
          thisNum:data.data['thisNum'],
        }
      }else {
        return{
          txt:'',
          bookid:'',
          lastNum:'',
          nextNum:'',
          thisNum:'',
        }
      }
    },
    head(){
      return{
        title: this.thisNum.chaptername
      }
    },
    data(){
      return{
        thisNum:'',
        lastNum:'',
        nextNum:'',
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
      let oldNum=localStorage.getItem(this.bookid)
      if(oldNum !== null){
        try {
          oldNum = parseInt(oldNum)
        }catch (e) {
          oldNum = 1
        }
      }
      if(oldNum<this.thisNum.num){
        localStorage.setItem(this.bookid+'',this.thisNum.num)
      }

      this.fontTag=localStorage.font?Number(localStorage.font):2
    },
    methods:{
      push(item){
        this.$router.push(`/book/${item.chapterid}`)
      },
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
    min-height 700px
    white-space: pre-line;
    font-size 14px
    text-indent 2em
    padding 20px
    .title
      white-space: normal
      font-size 20px
      font-weight: 600;
      padding-left 0
      text-indent 0px
  .btn-box
    display flex
    justify-content space-around
    margin-bottom 50px
    .btn
      text-indent 0
      text-align center
      width 80px
      height 30px
      line-height 30px
      background #3BC18E
      color white
      border-radius 5px
</style>
