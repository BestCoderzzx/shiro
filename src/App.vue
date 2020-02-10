<template>
  	<element>
		<transition name="fade"
		            mode="out-in">
			<router-view></router-view>
		</transition>
  	</element>
</template>

<script>

export default {
  name: 'App'
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
</style>

<script>
import Index from './components/Index.vue'
export default {
  name: 'App',
  components:{
			'v-index':Index
		}
}
</script>
