import api from 'api/getData.js'
import * as types from '../types'
import {store} from 'assets/js/store.js'

const state = {
    // 用户登录状态
    loginStatus: JSON.parse(localStorage.getItem('loginStatus')) || false,
    // 用户登录信息
    // userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
    userInfo:null,//用户信息
    // 用户数据信息
    userData: [],
    token: false,    
}

const actions = {
    /**
     * 用户登录
     */
    setUserInfo({ commit }, data) {
        // localStorage.setItem('userInfo', JSON.stringify(res))
        // localStorage.setItem('loginStatus', true)
        // localStorage.setItem('token', '')
        // commit(types.SET_USER_INFO, res)
        // commit(types.SET_LOGIN_STATUS, true)
        console.log("进入了一个setUserInfo",data)
        commit(types.SET_TOKEN,data);  
        // api.getMyMemberInfo(data)
        //     .then(data => {
        //         console.log(data);
        //         commit(SET_USER_INFO,data.data);    
        //     })
    },

    /**
     * 退出登录
     */
    setSignOut({ commit }) {
        localStorage.removeItem('loginStatus')
        localStorage.removeItem('userInfo')
        commit(types.SET_LOGIN_STATUS, false)
        commit(types.SET_USER_INFO, {})
    },

    /**
     * 请求用户信息
     */
    getUserData({ commit }, id) {
        commit(types.COM_LOADING_STATUS, true)
        api.UserInfo(id)
            .then(res => {
                commit(types.COM_LOADING_STATUS, false)
                commit(types.GET_USER_DATA, res.data)
            })
    }
}

const getters = {
    getUserData: state => state.userData,
    loginStatus: state => state.loginStatus,
    userInfo: state => state.userInfo,
    token: state => state.token
}

const mutations = {
    [types.SET_USER_INFO](state, res) {
        state.userInfo = res;
        console.log("进入了一个mutations",state.userInfo);
    },

    [types.SET_TOKEN](state, res) {
        let obj = {}
        obj.AccessSecret = res.AccessSecret;
        obj.AccessToken = res.AccessToken;
        state.token = obj;
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