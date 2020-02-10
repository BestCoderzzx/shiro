<template>
  	 <el-container>
		  <el-header>
		  	<div id = "siteTitle">商城后台——你微笑时很美丶</div>
		  	<el-dropdown class="user_info">
	        <i class="el-icon-setting" style="margin-right: 15px"></i>
	        <el-dropdown-menu slot="dropdown">
	          <el-dropdown-item>查看</el-dropdown-item>
	          <el-dropdown-item @click.native="out_login()">退出</el-dropdown-item>
	        </el-dropdown-menu>
	      </el-dropdown>
	      <span class="user_name">你微笑时很美丶</span>
		  </el-header>
      
		  <el-container>
		    <el-aside width="200px">
		    	<v-aside></v-aside>
		    </el-aside>
		    <el-main>
		    	
		    	<transition name="fade"
		            mode="out-in">
					<!--<router-view></router-view>-->
					<router-view v-if="isRouterAlive" ></router-view>
				</transition>
		    	
		    </el-main>
		  </el-container>
		  
		  
		</el-container>
  		
  		
		 <!--<router-link to="/hello">hello page</router-link>
		 	
    <router-view/>-->
</template>

<script>
import Aside from './main/Aside.vue';
import axios from 'axios'
import qs from 'qs';
export default {
  name: 'Index',
  provide() {
    return {
       reload:this.reload
    }
  },
  data(){
    return{
         isRouterAlive : true
    }
  },
  components:{
			'v-aside':Aside
  },
  mounted(){
	  //初始化的时候，去查询后台数据
//	  this.queryPermission();
  },
  methods:{
  	queryPermission(){
	  const the = this;
    	  this.$http.post('/user/queryMyPermission').then(function(result){
    	  		console.log(result.data);
    	  		if(result.data.code==200){
    	  			alert(1);
    	  			localStorage.setItem('permissionList',JSON.stringify(result.data.result));
    	  		}
    	  }).catch(function(error){
    	  	 console.log(error);
    	  })
  	},
  	out_login(){
  		console.log('out_login');
  		localStorage.removeItem('token');
  		localStorage.removeItem('permissionList');
  		this.$router.push({path:'/login'})
  	},
  	reload(){
        this.isRouterAlive =false;
        this.$nextTick(()=>{
            this.isRouterAlive =true;
        });
    }
  }
}
</script>

<style>
  .el-header {
    background-color: #409EFF;
    color: #333;
    line-height: 60px;
  }
  
  .el-header #siteTitle{
  	text-align: center;
  	float: left;
  }
  
  .user_info,.user_name{
  	float: right;
  	margin-right: 5px;
  }
  
  .el-aside {
    color: #333;
  }
  .el-icon-setting{padding: 23.5px 10px;}
</style>
