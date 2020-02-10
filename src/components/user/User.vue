<template>
  <element>	
		<el-breadcrumb separator="/" :lg="3">
			<el-breadcrumb-item :to="{ path: '/' }">用户管理</el-breadcrumb-item>
			<el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>
		<div style="margin-bottom: 15px;"></div>
		<el-form :inline="true" :model="userInfo" class="demo-form-inline d_jump">
		  <el-form-item label="用户名">
		    <el-input   v-model="userInfo.username"  placeholder="用户名"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit" >查询</el-button>
		    <!--<el-button type="primary" @click="toAddUser" >添加</el-button>-->
		    <el-button type="success" @click="toAddUser" v-has="{perms:'userAdd'}">添加</el-button>
		  </el-form-item>
		</el-form>
		
		<!--数据列表-->
		  <el-table
		v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    :data="tableData"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    
    <el-table-column
      prop="userName"
      label="用户名"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="passwd"
      label="手机"
      >
    </el-table-column>
    <el-table-column
      prop="createDate"
      label="创建时间"
      ></el-table-column>
    <el-table-column
      label="操作"
      width="180">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="primary" size="small">授予角色</el-button>
        <el-button type="danger" size="small" @click="editUser(scope.row)" v-has="{perms:'userEdit'}">编辑</el-button>
      </template>
    </el-table-column>
    
    <!--<el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>-->

    
  </el-table>
		
		<!-- 分页 -->
		<div class="block" style="margin-top: 10px;">
	    <el-pagination
	    	background
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="currentPage"
	      :page-sizes="[5, 10, 15, 20]"
	      :page-size="100"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="total">
	    </el-pagination>
	  </div>
		
		<!-- 新增用户编辑用户对话框 -->
		<!--<v-userAdd ref="addUser" :the=this></v-userAdd>-->
		<el-dialog
		  title="提示"
		  :visible.sync="dialogVisible"
		  width="40%"
		  :before-close="handleClose">
		  <br>
        <h3>所有角色</h3>
            <ul>
              <li v-for="item in list" v-if="!item.check">
                    <el-checkbox v-model="item.check" />{{item.roleName}}</el-checkbox>
              </li>
            </ul>
        <hr>
        <br>
        <h3>已选角色</h3>
            <ul>
              <li v-for="(item,key) in list" v-if="item.check">
                    <el-checkbox type='checkbox' v-model="item.check"></el-checkbox>{{item.roleName}}
              </li>
            </ul>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="saveRoles">确 定</el-button>
		  </span>
		</el-dialog>
   </element>
</template>

<script>
//	import qs from 'qs';
//import UserAdd from './UserAdd.vue';
  export default {
    data() {
      return {
      	//表单数据模型
        userInfo: {
          email: '',
          phone: '',
          createDate:''
        },
        currentPage:1,//当前页
        pageSize:5,//每页10条
        total:0,//总条数
        loading:true,
        dialogVisible:false,
        checkUserId:0,
        list:[],//角色集合
        //列表数据模型
        tableData: [{
          userName: '',
          passwd: '',
          createDate: ''
        }]
      }
    },
//  computed:{
//  	sexTitle:function(){
//  		return this.sex==0?"女":"男";
//  	}
//  },
    mounted(){
    	  //初始化的时候，去查询后台数据
    	  this.queryData();
    },
    methods: {
    	queryData(){
    		this.loading = true;
    		const current = this.currentPage;
    	  const the = this;
    	  this.$http.post('/user/queryList',this.$qs.stringify({
    	  	username:this.userInfo.username,
    	  	currentPage:this.currentPage,
    	  	pageSize:this.pageSize
    	  })).then(function(result){
    	  		console.log(result.data);
    	  		if(result.data.code==200){
    	  			the.tableData = result.data.result.items;
    	  			the.total = result.data.result.total;
//  	  			alert(the.total);
//  	  			the.currentPage4 = current;
    	  			the.loading = false;
    	  			the.jump();
    	  		}
    	  }).catch(function(error){
    	  	 console.log(error);
    	  })
    	},
    	toAddUser(){
    		//打开添加用户对话框
//  		this.$refs.addUser.dialogVisible = true;
				this.$router.push({path:'/userAdd'});
    	},
    	//用户授予角色
    	handleClick(row){
    		console.log(row.id);//row.id 为用户ID  row为每行动态的用户信息
    		this.dialogVisible = true;
    		this.checkUserId = row.id;
    		const the = this;
    	  this.$http.post('/user/queryRoleList',this.$qs.stringify({
    	  	userId:row.id
    	  })).then(function(result){
    	  		console.log(result.data);
    	  		if(result.data.code==200){
    	  			 the.list = result.data.result;
    	  		}
    	  }).catch(function(error){
    	  	 console.log(error);
    	  })
    		
    	},
    	saveRoles(){
    		//保存用户角色
    		const userId = this.checkUserId;
    		var roleIdsArr = [];
    		
    		for(var i in this.list){
    			  if(this.list[i].check){
    			  	roleIdsArr.push(this.list[i].roleId);
    			  }
    		}
    		
    		if(roleIdsArr==''||roleIdsArr.length==0){
    			 this.$message({
	          message: '请选择角色',
	          type: 'warning'
	        });
	        return;
    		}
    		
    		console.log("userId:"+userId+" roleIds:"+roleIdsArr.join(","));
    		const the = this;
    		this.$http.post('/user/saveUserRoleIds',this.$qs.stringify({
    	  	userId:userId,
    	  	roleIds:roleIdsArr.join(",")
    	  })).then(function(result){
    	  		console.log(result.data);
    	  		if(result.data.code==200){
    	  			 the.dialogVisible = false;
    	  			 this.$message({
			          message: '用户授权成功',
			          type: 'info'
			        });
    	  		}
    	  }).catch(function(error){
    	  	 console.log(error);
    	  })
    		
    	},
    	//编辑
    	editUser(row){
    		 this.$message({
          message: '待完善',
          type: 'warning'
        });
    	},
      onSubmit() {
        console.log('submit! currentPage:'+this.currentPage);
        this.currentPage=1;
        this.queryData();
      },
      formatter(row, column) {
        return row.address;
      },
      handleEdit(index, row) {
//    	this.dialogVisible = true;  // 弹出框 编辑
//				this.$router.push({path:'/container'}) //跳转路由编辑
        console.log(row.uid);
        this.$refs.addUser.dialogVisible = true;
        this.$refs.addUser.userId = row.uid;
      },
      handleDelete(index, row) {
        console.log(index, row);
        var _the = this;
        this.$confirm('确认删除该用户吗')
          .then(_ => {
            _the.$http.get('/user/deleteById',{params:{uid:row.uid}}).then((res)=>{
		        	 _the.onSubmit();
		        	 done();
		        }).catch(()=>{
		        })
          })
          .catch(_ => {});
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize =  val;
        this.queryData();
      },
      handleCurrentChange(val) {
      	this.currentPage = val;
        console.log(`当前页: ${val}`);
        this.queryData();
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      jump() {
			    let jump = document.querySelectorAll('.d_jump')
			    // 获取需要滚动的距离
			    let total = jump.offsetTop
			    // Chrome
			    document.body.scrollTop = total
			    // Firefox
					document.documentElement.scrollTop = total
					// Safari
					window.pageYOffset = total
			},
			formatter(row, column) {
				console.log(row);
        return row.sex==0?"女":"男";
      }
    }
  }
</script>

<style>
	ul,li{ padding:5px;margin:0;list-style:none}
	ul,li,label{ padding:5px}
</style>