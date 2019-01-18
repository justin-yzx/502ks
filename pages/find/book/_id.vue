<template>
  <div 
    id="read" 
    :style="{ backgroundColor: bodyBg}">
    <div
      :style="{ fontSize: fontSize+'px',color:colorFont}" 
      class="content-box-p" 
      @click="showMenu=!showMenu">
      <div style="font-size: 18px">{{ thisNum.chaptername }}</div>
      <div>{{ content }}</div>
    </div>
    <div 
      v-if="showMenu" 
      class="top-operate-zone">
      <span 
        class="top-back" 
        @click="back"><img src="@/assets/back-w.png"></span>
      <div class="top-right">
        <span @click="gohome">首页</span>
        <span @click="join">加入书架</span>
        <img
          v-if="readFlag!==2"
          src="@/assets/play.png"
          @click="read">
        <img
          v-if="readFlag===2"
          src="@/assets/stop.png"
          @click="read">
      </div>
    </div>
    <div class="operate-zone">
      <div 
        v-if="setMenu && showMenu" 
        class="zone-2">
        <div class="colors-arr"><span 
          v-for="(item,index) in colorArr"
          :key="index"
          :class="borderIndex==index?'active':''"
          :style="{ backgroundColor: colorArr[index]}"
          @click="changeBg(index)"/></div>
        <div class="font-sizes">
          <span @click="changeSize('reduce')">Aa-</span>
          <span @click="changeSize('add')">Aa+</span>
        </div>
      </div>
      <div 
        v-if="showMenu" 
        class="zone-1">
        <span><img 
          src="@/assets/last.png" 
          @click="previous"><em>上一章</em></span>
        <span><img src="@/assets/content.png"><em @click="mulu">目录</em></span>
        <span @click="setMenu=!setMenu"><img src="@/assets/set.png"><em>设置</em></span>
        <span 
          v-if="!nightDay" 
          @click="setDayNight('night')"><img src="@/assets/night.png"><em>夜间</em></span>
        <span 
          v-else 
          @click="setDayNight('day')"><img src="@/assets/day.png"><em>白天</em></span>
        <span><img 
          src="@/assets/next.png" 
          @click="nuxt"><em>下一章</em></span>
      </div>
    </div>
  </div>
</template>

<script>
  import {BASE_URL} from "@/config";
  import axios from 'axios'
  import replaceStr from './replaceStr'

  export default {
    async asyncData({params}) {
      let req = params.id.split(',')
      let {data} = await axios.get(`${BASE_URL}/api/getcontent?id=${req[0]}`)
      if (data.code == 200) {
        return {
          content: replaceStr(data.data['book']['booktxt']),
          bookid: data.data['book']['bookid'],
          lastNum: data.data['lastNum'],
          nextNum: data.data['nextNum'],
          thisNum: data.data['thisNum'],
        }
      } else {
        return {
          content: '',
          bookid: '',
          lastNum: '',
          nextNum: '',
          thisNum: '',
        }
      }
    },
    head() {
      return {
        title: this.thisNum.chaptername
      }
    },
    data() {
      return {
        colorArr: ['#d1f9d5', '#f0e0c5', '#ffddef', '#e4e4e4'],
        bodyBg: '#d1f9d5', //整体背景
        borderIndex: 0,//色块
        fontSize: '16',//字体大小
        nightDay: false,
        showMenu: false,
        setMenu: false,
        colorFont: '#333',
        readFlag:1,
      }
    },
    mounted () {
      try {
        window.speechSynthesis.cancel()
      }catch (e) {}
      this.bodyBg = localStorage.getItem('bgSave') ? localStorage.getItem('bgSave') : this.colorArr[0];
      this.borderIndex = localStorage.getItem('bgSaveIndex') ? localStorage.getItem('bgSaveIndex') : 0;
      this.fontSize = localStorage.getItem('fontSizeSave') ? localStorage.getItem('fontSizeSave') : this.fontSize;
      this.colorFont = localStorage.getItem('colorFont') ? localStorage.getItem('colorFont') : this.colorFont;
    },
    methods: {
      read(){
        try {
          if(this.readFlag === 1){
            var msg = new SpeechSynthesisUtterance(this.content);
            window.speechSynthesis.cancel()
            setTimeout(()=>{
              window.speechSynthesis.speak(msg);
            },200)
            this.readFlag=2
          }else if(this.readFlag === 2){
            window.speechSynthesis.pause()
            this.readFlag=3
          }else {
            window.speechSynthesis.resume()
            this.readFlag=2
          }
        }catch (e) {
          toast("您的浏览器暂不支持此功能，请下载最新版谷歌浏览器体验在线阅读",5000)
        }

      },
      back(){
        try {
          window.speechSynthesis.cancel()
        }catch (e) {}
        location.href='/bookinfo/'+this.bookid
      },
      mulu(){
        try {
          window.speechSynthesis.cancel()
        }catch (e) {}
        location.href='/chapterlist/'+this.bookid
      },
      previous(){
        try {
          window.speechSynthesis.cancel()
        }catch (e) {}
        if(!this.lastNum){
          toast('已经是第一章喽~')
          return
        }
        location.href='/book/'+this.lastNum.chapterid
      },
      nuxt(){
        try {
          window.speechSynthesis.cancel()
        }catch (e) {}
        if(!this.nextNum){
          toast('已经是最后一章喽~')
          return
        }
        location.href='/book/'+this.nextNum.chapterid
      },
      gohome(){
        location.href='/'
      },
      join(){
        //todo 加入书架
        toast('敬请期待')
      },
      changeBg(index) {
        this.nightDay = false;
        this.bodyBg = this.colorArr[index];
        localStorage.setItem('bgSave', this.bodyBg);
        this.borderIndex = index;
        localStorage.setItem('bgSaveIndex', this.borderIndex);
        localStorage.setItem('colorFont', '#333');
        this.colorFont = "#333";
      },
      changeSize(way) {
        if (way == 'reduce') {
          if (this.fontSize == 10) {
            toast('字体不能再小了..');
            return false
          }
          this.fontSize = parseInt(this.fontSize) - 2;
          localStorage.setItem('fontSizeSave', this.fontSize)
        } else if (way == 'add') {
          if (this.fontSize == 20) {
            toast('字体不能再大了..');
            return false
          }
          this.fontSize = parseInt(this.fontSize) + 2;
          localStorage.setItem('fontSizeSave', this.fontSize)
        }
      },
      //设置白天夜间模式
      setDayNight(mode) {
        console.log(mode)
        if (mode == 'day') {
          this.nightDay = false;
          this.colorFont = "#333";
          localStorage.setItem('colorFont', '#333');
          if (localStorage.getItem('bgSave') == 'rgba(0,0,0,.7)') {
            this.bodyBg = this.colorArr[this.borderIndex];
          } else {
            this.bodyBg = localStorage.getItem('bgSave') ? localStorage.getItem('bgSave') : this.bodyBg;

          }
          localStorage.setItem('bgSave', this.bodyBg);
        } else if (mode == 'night') {
          this.nightDay = true;
          this.bodyBg = 'rgba(0,0,0,.7)';
          this.colorFont = "#989898";
          localStorage.setItem('bgSave', this.bodyBg);
          localStorage.setItem('colorFont', '#989898');
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>

  #read .whiteColor {
    color: #989898;
  }

  .content-box-p {
    min-height 800px
    padding: 50px 16px 130px;
    white-space: pre-line;
    font-weight: 300;
  }

  .top-operate-zone {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 500;
    height: 44px;
    background: #333;
  }

  .top-back {
    float: left;
    padding: 10px;
  }

  .top-back img {
    width: 22px;
    opacity: .8;
  }

  .top-right {
    position relative
    float: right;
    margin-right: 16px;
    span,img{
      vertical-align middle
    }
    img{
      padding-left 10px
    }
  }

  .top-right span {
    margin-left: 10px;
    line-height: 44px;
    color: #fff;
    font-weight: 300;
  }

  .operate-zone {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 500;
  }

  .zone-1 {
    color: #fff;
    background: #333;
    padding: 5px 0;
    overflow: hidden;
  }

  .zone-1 span {
    width: 20%;
    display: block;
    float: left;
    text-align: center;
  }

  .zone-1 span img {
    display: block;
    width: 22px;
    height: 22px;
    margin: 0px auto;
  }

  .zone-1 span em {
    font-style: normal;
    font-size: 14px;
    font-weight: 300;
  }

  .zone-2 {
    background: rgba(0, 0, 0, .4);
    padding: 10px;
    overflow: hidden;
  }

  .colors-arr {
    overflow: hidden;
    margin-bottom: 10px;
  }

  .colors-arr span, .font-sizes span {
    width: 40px;
    height: 20px;
    display: block;
    float: left;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin-right: 10px;
  }

  .colors-arr span.active {
    border: 2px solid #26C37D;
  }

  .font-sizes span {
    color: #fff;
    background: rgba(0, 0, 0, .4);
    text-align: center;
    line-height: 20px;
    font-size: 12px;
  }
</style>
