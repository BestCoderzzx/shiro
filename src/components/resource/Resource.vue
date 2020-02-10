<template>
<div class="custom-tree-container">
  <!--<div class="block">
    <p>使用 render-content</p>
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      :render-content="renderContent">
    </el-tree>
  </div>-->
  <div class="block">
    <p>菜单树</p>
    <el-tree
      :data="data"
     
      node-key="id"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span v-if="data.level<3">{{ node.label }}</span>
        <span v-else-if="data.level==3">{{ node.label }}(权限)</span>
        <span>
          <el-button
            type="text"
            size="mini"
            icon="el-icon-plus"
            v-if="data.level!=3"
            @click="() => append(data)">
         
          </el-button>
          <el-button
            type="text"
            size="mini"
            v-if="data.level!=0"
            icon="el-icon-remove-outline"
            @click="() => remove(node, data)">
            
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
  
  <el-dialog
	  title="提示"
	  :visible.sync="dialogVisible"
	  width="40%"
	  >
	  <el-form ref="form" :model="resourceForm" :rules="resourceRules" label-width="80px" size="mini">
		  <el-form-item label="菜单名称" prop="resourceName">
		    <el-input v-model="resourceForm.resourceName"></el-input>
		  </el-form-item>
		  <el-form-item label="权限标识" prop="flagName">
		    <el-input v-model="resourceForm.flagName"></el-input>
		  </el-form-item>
		  <el-form-item label="菜单url" prop="url">
		    <el-input v-model="resourceForm.url"></el-input>
		  </el-form-item>
		  <el-form-item
		    label="排序"
		    prop="sort"
		  >
		    <el-input type="sort" v-model.number="resourceForm.sort" autocomplete="off"></el-input>
		  </el-form-item>
	  </el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="dialogVisible = false">取 消</el-button>
	    <el-button type="primary" @click="submitResource">确 定</el-button>
	  </span>
	</el-dialog>
  
</div>
</template>
<script>
  let id = 1000;

  export default {
    data() {
      
      const data = [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }];
      return {
        data: JSON.parse(JSON.stringify(data)),
        dialogVisible: false,
        resourceForm:{
        	resourceName:"",
        	url:"",
        	flagName:"",
        	sort:"",
        	pid:0,
        	level:0
        },
        resourceRules:{
        	resourceName: [
            { required: true, message: '请填写菜单名称', trigger: 'blur' },
          ],
          flagName: [
            { required: true, message: '请填写权限标识', trigger: 'blur' },
          ],
          url: [
            { required: true, message: '请填写菜单url', trigger: 'blur' },
          ],
          sort:[
          	{ required: true, message: '排序不能为空'},
		      	{ type: 'number', message: '排序必须为数字值'}
          ]
        },
        currentData:''
      }
    },
		mounted(){
    	  //初始化的时候，去查询后台数据
    	  this.queryTreeData();
    },
    methods: {
    	//查询树形数据集合
    	queryTreeData(){
  	    const the = this;
    	  this.$http.post('/resource/queryTree').then(function(result){
    	  		console.log(result.data);
    	  		if(result.data.code==200){
    	  			the.data = JSON.parse(JSON.stringify(result.data.result));
    	  		}
    	  }).catch(function(error){
    	  	 console.log(error);
    	  })
    	}
    	,
    	submitResource(){
    		 //新增权限管理
    		var label = this.resourceForm.resourceName;
		    const data = this.currentData;
        const the = this;
        this.resourceForm.pid = data.id;
        this.resourceForm.level = data.level+1;
        this.$refs.form.validate((valid) => {
        	  if(valid){
    	  	     	  this.$http.post('/resource/saveResource',this.$qs.stringify(this.resourceForm)).then(function(result){
					    	  		console.log(result.data);
					    	  		if(result.data.code==200){
					    	  			   the.dialogVisible = false;
					    	  			   alert(result.data.result);
									         const newChild = { id: result.data.result, label: label, children: [], pid:data.id, level:the.resourceForm.level };
									         if (!data.children) {
										          the.$set(data, 'children', []);
									         }
									         data.children.push(newChild);
									         the.$message({
										          message: '添加菜单成功！',
										          type: 'success'
									         });
									         
					    	  		}	
					    	  }).catch(function(error){
					    	  	 console.log(error);
					    	  })
        	  }
        })	 
    	},
      append(data) {
      	console.log(data);
      	//远程加载 服务器数据
      	this.dialogVisible = true;
				this.currentData = data;
				
      },

      remove(node, data) {
      	console.log(data.id);      	
      	this.open(node, data);
      },
      open(node, data) {
        this.$confirm('您将删除该菜单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	//ajax请求后台删除接口
	    	  const the = this;
	    	  this.$http.post('/resource/delResource',this.$qs.stringify({
	    	  	id:data.id
	    	  })).then(function(result){
	    	  		console.log(result.data);
	    	  		if(result.data.code==200){
									the.$message({
				            type: 'success',
				            message: '删除成功!'
				          });
				          const parent = node.parent;
					        const children = parent.data.children || parent.data;
					        const index = children.findIndex(d => d.id === data.id);
					        children.splice(index, 1);
	    	  		}
	    	  }).catch(function(error){
	    	  	 console.log(error);
	    	  })
        }).catch(() => {
                    
        });
      }
      
    }
  };
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>