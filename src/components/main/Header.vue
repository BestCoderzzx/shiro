<template>
<element>
<el-menu
  class="el-menu-demo"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#409EFF">
  <div class="commomHead">商城管理系统</div>
  
</el-menu>
</element>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
	.commomHead{
		text-align: center;
		height: 50px;
		line-height: 50px;
		background-color: #409EFF;
	}
</style>