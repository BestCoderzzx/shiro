<template>
<el-form ref="form" :model="form" :rules="userRules" label-width="80px">
  <el-form-item label="用户名" prop="userName">
    <el-input v-model="form.userName" style="width: 50%;"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="passwd">
    <el-input v-model="form.passwd" style="width: 50%;"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">保存</el-button>
    <el-button @click="onCancel">取消</el-button>
  </el-form-item>
</el-form>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          userName: '',
          passwd: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        userRules:{
        	userName: [
            { required: true, message: '请填写用户名', trigger: 'blur' },
          ],
          passwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
        const the = this;
        this.$refs.form.validate((valid) => {
        	  if(valid){
    	  	     	  this.$http.post('/user/saveUser',this.$qs.stringify({
					    	  	userName:this.form.userName,
					    	  	passwd:this.form.passwd
					    	  })).then(function(result){
					    	  		console.log(result.data);
					    	  		if(result.data.code==200){
					    	  			  the.$router.push({path:'/user'});
					    	  		}	
					    	  }).catch(function(error){
					    	  	 console.log(error);
					    	  })
        	  }
        })
     
        
      },
      onCancel(){
      	this.$router.push({path:'/user'});
      }
    }
  }
</script>