<template>
  <div id="app">
    <div>
      <el-radio v-model="isEditState" label="true">编辑状态</el-radio>
      <el-radio v-model="isEditState" label="false">答题状态</el-radio>
    </div>
    <HelloWorld :isEditState="Boolean(isEditState==='true')"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return {
      isEditState:'true'
    }
  },
  watch:{
    radio(n){
      console.log(n);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
