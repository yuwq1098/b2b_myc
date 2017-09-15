
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

// dom操作方法
import * as geekDom from "assets/js/dom.js"


// 改变客服dom样式
import mycKefu from "assets/js/kefu_control.js"
// url请求根路经
import {rootURL} from 'api/rootUrl.js'

//引入vue字段过滤器
import * as filters from './filter'
Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) //注册过滤器

// 引入表单验证vee-validate插件
import {VeeValidate, vConfig, validator} from './validate.js';  //自定义的验证
// 加载验证相关的东西，以及配置
Vue.use(VeeValidate, vConfig, validator);


//引入岩东的js
import * as yyd from 'assets/js/yydjs.js';

// 引入木有车网站的公共样式
import 'assets/css/index.styl'

// 将根路径赋给 Vue原型方法
Vue.prototype.URL = function(){
  return rootURL;
};

// <script src="https://cc.dns4.cn/kf/vclient/state.php?shopid=200741" language="javascript" type="text/javascript"></script>
// function createKefuScript(){
//     var newScriptDom = document.createElement("script");
//     newScriptDom.src = "https://cc.dns4.cn/kf/vclient/state.php?shopid=200741";
//     newScriptDom.language = "javascript";
//     newScriptDom.type = "text/javascript";
//     document.body.appendChild(newScriptDom);
//     newScriptDom = null;
// }

// // 调用
// createKefuScript();

// 设置页面文档信息
function setDocumentTitle(option){
    var defaults,                 // 默认配置
        setting;                  // 实际的配置
    // 默认配置
    defaults = {
        title: '木有车',
        meta: [
          { hid: 'description', name: 'description', content: '这是木有车B2B的一个页面描述' }
        ]
    };
    // 参数继承
    setting = Object.assign(defaults,option);

    document.title = setting.title+"__木有车B2B汽车服务平台 - 木有车（www.muyouche.com）"
}

// 将文档标题赋给 Vue原型方法
Vue.prototype.docTitle = setDocumentTitle;

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

// 线上环境，暴力ban掉console.log/dir/info
if(rootURL!="/api"){
    // geekDom.setNullConsole(['log','dir','info','warn'])
    geekDom.setNullConsole(['log','dir','info'])
}

// 路由导航钩子beforeEach，在路由进入前调用
router.beforeEach((to, from, next) => {

  // 如果是会员中心的路径，那么就禁用客服
  if(to.path.match(/[/]member/g)){
      to.meta.isEnabledKefu = true;
  }

  // 判断是否不启用kefu
  if(to.meta.isEnabledKefu == void 0){
      mycKefu();
  }else{
      var myc_kefu_di_dom = document.getElementById("myc_kefu");
      if(myc_kefu_di_dom){
        geekDom.removeClass(myc_kefu_di_dom,'f__display_block');
      }
  }

  // 设置每个页面的文档信息
  if(to.meta.hasDocInfo == void 0 && to.meta.title != void 0){
      var options = {
          title: to.meta.title,
      }
  }
  setDocumentTitle(options);

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
    document.body.scrollTop = 0
  }
});

var app = new Vue({
	router,
  store,
}).$mount('#app')


var bus = new Vue();
export {app,bus}

