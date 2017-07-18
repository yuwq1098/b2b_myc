
/** 
* @description 登录/注册/忘记密码框的显示状态 
* @creatDate 2017-6-15
* @author Geek.Yu  email:1098654043@qq.com
*/ 

import * as types from '../types'
import {store} from 'assets/js/store.js'

const state = {
    // 是否打开登录框
    isOpenSignInBox: false,
}

const actions = {
    changeSignInBox({ commit }, params) {
        commit(types.SET_SIGN_IN_BOX_SHOW_STATUS, params)   
    }
}

const getters = {
    isOpenSignInBox: state => state.isOpenSignInBox,
}

const mutations = {
    // 设置购物车数量
    [types.SET_SIGN_IN_BOX_SHOW_STATUS](state, res) {
        state.isOpenSignInBox = res
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}