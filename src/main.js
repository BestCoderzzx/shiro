// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import has from './common/js/btnPermissions.js';

///*引入资源请求插件*/
//import VueResource from 'vue-resource'
//
///*使用VueResource插件*/
//Vue.use(VueResource)

import axios from 'axios'
import Qs from 'qs'   //引入方式
Vue.prototype.$qs = Qs  //全局加载

Vue.prototype.$ajax = axios
axios.defaults.withCredentials = true
//axios.defaults.baseURL = 'http://106.13.227.245:9999';
axios.defaults.baseURL = 'http://localhost:8989';
Vue.prototype.$http = axios

/** 引入vueRouter **/
import VueRouter from 'vue-router';
Vue.use(VueRouter);

Vue.use(ElementUI);

Vue.config.productionTip = false

import Container from './components/Container.vue'
import User from './components/user/User.vue'
import Login from './components/Login.vue'
import Index from './components/Index.vue'

import UserAdd from './components/user/UserAdd.vue'

import Role from './components/role/Role.vue'
import RoleAdd from './components/role/RoleAdd.vue'

import Resource from './components/resource/Resource.vue'

import PermissionDend from './components/PermissionDend.vue'


//index.js
//Vue.http.interceptors.push((request, next) => {
//  //请求发送前的处理逻辑
//  alert(1);
//  let token = localStorage.getItem('token');
//  request.headers.set('admin_token', token)
//  next((response) => {
//      //请求发送后的处理逻辑
//      //根据请求的状态，response参数返回给successCallback或errorCallback
//      return response
//  })
//})
/**
 * 全局拦截器,添加token,或者必要的参数
 */
axios.interceptors.request.use(
  config => {
    // 默认参数设置：所有接口都必须传的值（比如：userId）
//  let defaultParams = {
//    userId: store.state.userId;
//  };
	console.log(1);	
    // 自定义header信息（比如token）
    config.headers['admin_token'] = localStorage.getItem('token');
    // 默认值与接口传来的参数进行合并（注：接口参数与默认值不可重复）
//  config.data = Object.assign(defaultParams, config.data);
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
// 对后端返回值做一些处理
axios.interceptors.response.use(function (res) {
  // 对响应数据做点什么
  // 数据不正常情况下返回（比如：token过期，参数不足）
    console.log("======= interceptors response =======");
//  console.log(res);
    if(undefined==res){
    	
    }
    if(res.data.code==2001){
    	router.replace({
        path: 'login',
        query: {redirect: router.currentRoute.fullPath}
    	})
    }
    if(res.data.code==403){
    	router.replace({
        path: 'permissionDend',
        query: {redirect: router.currentRoute.fullPath}
    	})
    }
    return Promise.resolve(res);
 
}, function (error) {
  // 对响应错误做点什么
//this.$router.push({path:'/login'});
return Promise.resolve(res);
});


/**2.配置路由 **/

const routes = [
	{path:'/login',component:Login},
	{path:'/',
       component:Index,
       children:[
         { path: '/permissionDend', component: PermissionDend},
         { path: '/user', component: User},
         { path: '/container', component: Container },
         { path: '/userAdd', component: UserAdd},
         { path: '/role', component: Role},
         { path: '/roleAdd', component: RoleAdd},
         { path: '/resource', component: Resource}
       ]
	}
]

/**3.实例化路由 **/
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes,
  ,scrollBehavior(to, from,savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})

// 路由判断登录 根据路由配置文件的参数
//router.beforeEach((to, from, next) => {
//  if (to.path == '/login') {
//  	localStorage.removeItem('token');
//  }
//
//	let token = localStorage.getItem('token');
//	console.log("token:"+token);
//	if (token==null && to.path != '/login') {
//		alert(2);
//	    next({ path: '/login' })
//	} else {
//	    next()
//	}
//})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})



