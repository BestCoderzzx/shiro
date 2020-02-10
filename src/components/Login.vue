<template>
  <el-form :model="userInfo" :rules="rules2" ref="userInfo" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">Shiro权限系统登录</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="userInfo.username" auto-complete="off" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="userInfo.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
//import qs from 'qs';
  export default {
    data() {
      return {
        logining: false,
        userInfo: {
          username: 'admin',
          password: '123'
        },
        rules2: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
        checked: true
      };
    },
    methods: {
      handleReset2() {
        this.$refs.userInfo.resetFields();
      },
      handleSubmit2(ev) {
        var _this = this;
//      this.$router.push({path:'/user'});
        this.$refs.userInfo.validate((valid) => {
          if (valid) {
          	_this.$http.post('/login', 
			       _this.$qs.stringify({
			        username: _this.userInfo.username,
			        password: _this.userInfo.password,
			      }))
			      .then(function (response) {
			        console.log(response);
							if(response.data.code==200){
//								console.log(response.data.data.token);
//								localStorage.setItem('userInfo',JSON.stringify(response.data.result));
				    	  _this.$http.post('/user/queryMyPermission').then(function(result){
				    	  		console.log(result.data);
				    	  		if(result.data.code==200){
				    	  			alert(1);
				    	  			localStorage.setItem('permissionList',JSON.stringify(result.data.result));
				    	  		}
				    	  }).catch(function(error){
				    	  	 console.log(error);
				    	  })

								_this.$router.push({path:'/user'});
							}	
//							
			      })
			      .catch(function (error) {
			        console.log(error);
			
			      });

//        	_this.$http.post('/admin', 
//			       qs.stringify({
//			        username: 'admin',
//			        password: 'admin',
//			      }))
//			      .then(function (response) {
//			        console.log(response);
//			      })
//			      .catch(function (error) {
//			        console.log(error);
//			
//			      });
//        	var fd = new FormData()
//						fd.append('username','admin')
//						fd.append('password','admin')
//						let config = {
//						    headers: {
//						        'Content-Type': 'multipart/form-data'
//						    }
//						}
//						 console.log(JSON.stringify(this.userInfo));
//		          _this.$http.post('/user/login',fd,config)
//            .then(res => {
//                console.log(res)
//                if(res.status == 200){
//                	localStorage.setItem('token',res.data.token); 
//                    this.$notify({
//                        title : '提示信息',
//                        message : '登录成功',
//                        type : 'success'
//                    });
//                    this.$router.push({path:'/test'})
//                }else {
//                    this.$notify({
//                        title : '提示信息',
//                        message : '账号或密码错误',
//                        type : 'error'
//                    });
//                }
//            })
//            .catch(err => {
//                console.log(err)
//            })
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>