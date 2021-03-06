
/** 
* @description 用户信息状态管理 
* @creatDate 2017-6-15
* @author Geek.Yu  email:1098654043@qq.com
*/ 

import api from 'api/getData.js'
import * as types from '../types'
// 引入系统变量
import * as SYSTEM from 'api/system.js'
import {store} from 'assets/js/store.js'

const state = {
    // 用户登录状态
    loginStatus: store.get("loginStatus") || false,
    // 用户登录信息
    loginInfo: store.get("loginInfo") || {},
    // 用户信息
    userData: {},
}

const actions = {
    /**
     * 用户登录
     */
    setUserInfo({ commit }, res) {
        store.set('loginInfo', JSON.stringify(res))
        store.set('loginStatus', true)
        commit(types.SET_LOGIN_INFO, res)
        commit(types.SET_LOGIN_STATUS, true)
    },

    /**
     * 登录注销
     */
    setSignOut({ commit }) {
        store.remove('loginStatus')
        store.remove('loginInfo')
        store.remove('userData')
        commit(types.SET_LOGIN_STATUS, false)
        commit(types.SET_LOGIN_INFO, {})
        commit(types.GET_USER_DATA, {})
    },

    /**
     * 请求用户信息
     */
    getUserData({ commit }, params) {
        api.getMyMemberInfo(params.data)
            .then(res => {
                if(res.code==SYSTEM.CODE_IS_OK){
                    store.set('userData', res.data)
                    commit(types.GET_USER_DATA, res.data)
                }else if(res.code==SYSTEM.CODE_IS_OUT){
                    if(params.callBack){
                        params.callBack()
                    }
                }
                
            })
    }
}

const getters = {
    userData: state => state.userData,
    loginInfo: state => state.loginInfo,
    loginStatus: state => state.loginStatus,
}

const mutations = {
    [types.SET_LOGIN_INFO](state, res) {
        state.loginInfo = res
    },

    [types.SET_LOGIN_STATUS](state, status) {
        state.loginStatus = status
    },

    [types.GET_USER_DATA](state, res) {
        state.userData = res
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}