import api from 'api/getData.js'
import * as types from '../types'
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
        localStorage.setItem('loginInfo', JSON.stringify(res))
        localStorage.setItem('loginStatus', true)
        commit(types.SET_LOGIN_INFO, res)
        commit(types.SET_LOGIN_STATUS, true)
    },

    /**
     * 登录注销
     */
    setSignOut({ commit }) {
        localStorage.removeItem('loginStatus')
        localStorage.removeItem('loginInfo')
        commit(types.SET_LOGIN_STATUS, false)
        commit(types.SET_LOGIN_INFO, {})
    },

    /**
     * 请求用户信息
     */
    getUserData({ commit }, res) {
        api.getMyMemberInfo(res)
            .then(res => {
                console.log(res);
                commit(types.GET_USER_DATA, res.data)
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