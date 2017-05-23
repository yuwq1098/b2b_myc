// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/index.js'
import FastClick from 'fastclick'
import 'assets/css/reset.styl'; // 引入公共样式
import 'assets/css/main.styl'; // 引入公共样式

Vue.config.productionTip = false

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}


Vue.use(VueRouter)
const router = new VueRouter({
	routes,
	mode: "hash",
	strict: process.env.NODE_ENV !== 'production'
})


new Vue({
	router,
}).$mount('#app')

