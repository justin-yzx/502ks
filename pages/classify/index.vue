<template>
  <div>
    <headdiv
      :show="false"
      title="分类"
      backurl=""
    />
    <div style="height: 50px"/>
    <bottom :tag="3"/>
    <div class="class-box">
      <div
        v-for="item in list"
        :key="item.key"
        class="class-btn"
        @click="push(item)"
      >{{ item.value }}</div>
    </div>
  </div>
</template>

<script>
  import { BASE_URL } from "@/config";
  import axios from 'axios'
  import bottom from '@/components/Bottom'
  import headdiv from '@/components/head'
  export default {
    name: "Classify",
    async asyncData () {
      let { data } = await axios.get(BASE_URL+'/api/getclassify')
      return { list: data.data }
    },
    components:{
      bottom,
      headdiv,
    },
    methods:{
      push(item){
        location.href='/bookclassify/'+item.key
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .class-btn{
    width 40%
    height 50px
    line-height 50px
    text-align center
    float left
    color #fff
    border-radius 10px
    background #26c37d
    margin-left 5%
    margin-top 10%
    &:nth-child(odd){
      margin-right 5%
    }
  }
</style>
