<template>
<el-row class="tac" style="height: 800px;">
  <el-col :span="24">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="toJumpContent('/user')">用户列表</el-menu-item>
          <!--<el-menu-item index="1-2" @click="toJumpContent('/container')">角色列表</el-menu-item>-->
          <!--<el-menu-item index="1-3" @click="toJumpContent('/permissionIndex')">菜单列表</el-menu-item>-->
        </el-menu-item-group>
      </el-submenu>
      
      <el-submenu index="3">
        <template slot="title">
	        <i class="el-icon-document"></i>
	        <span slot="title">角色管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1" @click="toJumpContent('/role')">角色列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      
      <el-submenu index="2">
      	<template slot="title">
	        <i class="el-icon-menu"></i>
	        <span slot="title">菜单管理</span>
        </template>
        <el-menu-item-group>
          <!--<el-menu-item index="2-1" @click="toJumpContent('/category')">商品分类</el-menu-item>-->
          <!--<el-menu-item index="2-1" @click="toJumpContent('/addGoods')">添加商品</el-menu-item>-->
          <el-menu-item index="2-2" @click="toJumpContent('/resource')">菜单列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      
      
    </el-menu>
  </el-col>
  
</el-row>
</template>
<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      toJumpContent(url){
      	//主体页面跳转路由设置
      	console.log(url);
      	this.$router.push({
          path: url,
        })
      }
    }
  }
</script>

<style>
a {
  text-decoration: none;
}


a:link,
a:hover,
a:active,
a:visited{
text-decoration: none;
color:white
}

a:{
  -webkit-tap-heighlight-color: transparent;
}

	
</style>