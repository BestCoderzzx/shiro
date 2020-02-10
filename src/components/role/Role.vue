<template>
  <element>	
		<el-breadcrumb separator="/" :lg="3">
			<el-breadcrumb-item :to="{ path: '/' }">角色管理</el-breadcrumb-item>
			<el-breadcrumb-item>角色列表</el-breadcrumb-item>
		</el-breadcrumb>
		<div style="margin-bottom: 15px;"></div>
		<el-form :inline="true" :model="roleInfo" class="demo-form-inline d_jump">
		  <el-form-item label="角色名">
		    <el-input   v-model="roleInfo.rolename"  placeholder="角色名"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit" >查询</el-button>
		    <!--<el-button type="primary" @click="toAddrole" >添加</el-button>-->
		    <el-button type="success" @click="toAddRole">添加</el-button>
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
      prop="roleName"
      label="角色名"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="createDate"
      label="创建时间"
      ></el-table-column>
    <el-table-column
      label="操作"
      width="180">
      <template slot-scope="scope">
        <el-button @click="grantResource(scope.row)" type="primary" size="small">授权</el-button>
        <el-button type="danger" size="small" @click="editRole(scope.row)">编辑</el-button>
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
		<!--<v-roleAdd ref="addrole" :the=this></v-roleAdd>-->
		
		<el-dialog
	  title="角色分配权限"
	  :visible.sync="dialogVisible"
	  width="40%"
	  >
	  
    <p>菜单树</p>
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      ref="tree"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span v-if="data.level<3">{{ node.label }}</span>
        <span v-else-if="data.level==3">{{ node.label }}(权限)</span>
      </span>
    </el-tree>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="dialogVisible = false">取 消</el-button>
	    <el-button type="primary" @click="submitRoleResource">确 定</el-button>
	  </span>
	</el-dialog>
		
   </element>
</template>

<script>
//	import qs from 'qs';
//import roleAdd from './roleAdd.vue';
  export default {
    data() {
      return {
      	//表单数据模型
        roleInfo: {
          rolename: '',
          createDate:''
        },
        currentPage:1,//当前页
        pageSize:5,//每页10条
        total:0,//总条数
        dialogVisible: false,
        loading:true,
        dialogVisible:false,
        data: [],
        selectRoleId:0,
        //列表数据模型
        tableData: [{
          roleName: '',
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
    	  this.$http.post('/role/queryList',this.$qs.stringify({
    	  	rolename:this.roleInfo.rolename,
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
    	//查询树形数据集合
    	queryTreeData(){
  	    const the = this;
    	  this.$http.post('/role/queryResourceTree',this.$qs.stringify({roleId:the.selectRoleId})).then(function(result){
    	  		console.log(result.data);
    	  		if(result.data.code==200){
    	  			the.data = JSON.parse(JSON.stringify(result.data.result.list));
	  				  the.$refs.tree.setCheckedKeys(result.data.result.ids,true);
    	  		}
    	  }).catch(function(error){
    	  	 console.log(error);
    	  })
    	},
    	toAddRole(){
    		//打开添加用户对话框
//  		this.$refs.addrole.dialogVisible = true;
				this.$router.push({path:'/roleAdd'});
    	},
    	//授权菜单
    	grantResource(row){
    		console.log(row.id);//row.id 为用户ID  row为每行动态的用户信息
    		this.selectRoleId = row.id;
    		this.dialogVisible=true;
    		this.queryTreeData();
    	},
    	submitRoleResource(){
    		//提交授权
    		const resourceArr = this.$refs.tree.getCheckedNodes(false,true);
    		if(resourceArr==undefined||resourceArr.length==0){
    			 this.$message({
	          message: '请选择授权的功能菜单',
	          type: 'warning'
	        });
	        return;
    		}
    		console.log(resourceArr);
    		const ids = [];
    		for(const i in resourceArr){
    			  const resource = resourceArr[i];
    			  console.log(resource.id);
    			  ids.push(resource.id);
    		}
    		console.log(ids.join(","));
    		console.log(this.selectRoleId);
    		
  	    const the = this;
    	  this.$http.post('/role/commitGrantResource',this.$qs.stringify({roleId:the.selectRoleId,resourceIds:ids.join(",")})).then(function(result){
    	  		console.log(result.data);
    	  		if(result.data.code==200){
    	  			  the.$message({
				          message: '角色授权成功',
				          type: 'warning'
				        });
				        the.dialogVisible=false;
    	  		}
    	  }).catch(function(error){
    	  	 console.log(error);
    	  })
    		
    	},
    	//编辑
    	editRole(row){
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
        this.$refs.addrole.dialogVisible = true;
        this.$refs.addrole.roleId = row.uid;
      },
      handleDelete(index, row) {
        console.log(index, row);
        var _the = this;
        this.$confirm('确认删除该用户吗')
          .then(_ => {
            _the.$http.get('/role/deleteById',{params:{uid:row.uid}}).then((res)=>{
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

</style>