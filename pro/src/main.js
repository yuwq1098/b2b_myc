// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
//引入axios网络资源请求模块
import axios from 'axios'
import routes from './router/router.js'
// 引入elementUI组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

//引入vuex状态配置
import store from './store/store'
//引入vue图片懒加载插件
import VueLazyload from 'vue-lazyload'

//引入vue字段过滤器
import * as filters from './filter'
Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) //注册过滤器

//引入表单验证vee-validate插件
import VeeValidate from 'vee-validate';
//修改语言包
import zh_CN from 'vee-validate/dist/locale/zh_CN';
//自定义规则
import Validator from './validation';

//VeeValidate语言包切换,放自定义提示前
Validator.addLocale(zh_CN);


//自定义提示
const dictionary = {
    zh_CN: {
        messages: {
            required: (field) => field + '不能为空'
        }
    }
};
Validator.updateDictionary(dictionary);



//引入岩东的js
import * as yyd from 'assets/js/yydjs.js';

// 引入木有车网站的公共样式
import 'assets/css/index.styl'      

// 将axios 改写为 Vue 的原型属性,使得其在其他组件中一样能使用
Vue.prototype.$ajax = axios
//挂载全局方法在vue对象原型方法下
Vue.prototype.method=yyd;


Vue.use(VueRouter)
Vue.use(ElementUI)


Vue.use(VueLazyload, {
  loading: require('assets/img/car-default.jpg')
})


//路由对象
const router = new VueRouter({
	routes,
	mode: 'hash',
})

// 路由导航钩子beforeEach，在路由进入前调用
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
      if (store.state.user.loginStatus) {  // 通过vuex state获取当前的token是否存在
          next();   //通过
      }else {
          //在main中调用Element的提示组件
          ElementUI.Notification({
              title: '未登录',
              message: '您还没有登录，请先登录',
              type: 'error',
              duration: 800
          });
          next({path: from?from.path:'/home'});
          return;
      }
      next();
  }else {
      next();
  }
});

// after 钩子没有 next 方法，不能改变导航
router.afterEach((to) => {
  var notGoTop = to.meta.notGoTop||false;
  //是否不返回顶部，默认返回顶部
  if(!notGoTop){
    document.body.scrollTop = 0+"px"
  }
});


new Vue({
	router,
  store,
}).$mount('#app')

