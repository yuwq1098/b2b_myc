/** 
* @name store.js
* @description 封装的vuex状态管理组件 
* @creatDate 2017-6-15
* @author Geek.Yu  email:1098654043@qq.com
*/ 

import Vue from 'vue'
import Vuex from 'vuex'

// 用户信息
import user from './modules/user'
// 本地数据（所选城市等等）
import localData from './modules/local'
// 登录/注册/忘记密码框的显示状态
import sign from './modules/sign'
// 用户中心的一些数据状态管理
import member from './modules/member'
// 一些公共的状态
import common from './modules/common'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        localData,
        sign,
        member,
        common
    }
})