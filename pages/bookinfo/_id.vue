<template>
  <div>{{ txt }}</div>
</template>

<script>
  export default {
    name: "Id",
    data(){
      return{
        txt:''
      }
    },
    created(){
      this.txt=this.$route.params.id
    }
  }
</script>

