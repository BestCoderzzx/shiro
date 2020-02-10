<template>
<el-form ref="form" :model="form" :rules="roleRules" label-width="80px">
  <el-form-item label="角色名" prop="roleName">
    <el-input v-model="form.roleName" style="width: 50%;"></el-input>
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
          roleName: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        roleRules:{
        	roleName: [
            { required: true, message: '请填写角色名', trigger: 'blur' },
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
    	  	     	  this.$http.post('/role/saveRole',this.$qs.stringify({
					    	  	roleName:this.form.roleName
					    	  })).then(function(result){
					    	  		console.log(result.data);
					    	  		if(result.data.code==200){
					    	  			  the.$router.push({path:'/role'});
					    	  		}	
					    	  }).catch(function(error){
					    	  	 console.log(error);
					    	  })
        	  }
        })
     
        
      },
      onCancel(){
      	this.$router.push({path:'/role'});
      }
    }
  }
</script>