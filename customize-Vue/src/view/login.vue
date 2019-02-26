<template>
   <div class='title'>
       <h1>
         {{title}}
       </h1>
       <div class="content">
         <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="账号">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
    <el-form-item label="密码">
    <el-input v-model="form.password"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">登录</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
       </div>
       
   </div>
</template>

<script>
export default {
  data () {
    return {
        title:"登录页",
        form: {
          name: '',
          password: ''
        }
    }
  },
  components: {

  },
  mounted(){
      debugger
      console.log(10)
  },
   methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
 }
</script>

<style scoped lang="scss">
.title{
  border: 1px solid greenyellow
}
 
</style>
