
/** 
* @description 本地数据（所选城市等等）
* @creatDate 2017-6-15
* @author Geek.Yu  email:1098654043@qq.com
*/ 

import * as types from '../types'
import {store} from 'assets/js/store.js'

const state = {
    // 用户当前选择的城市
    currentCity: store.get("currentCity") || null,
    currentCityName: store.get("currentCity")?store.get("currentCity").name : '南昌',
    // 用户的搜索条件数据
    userFilterData: store.has("userFilterData")?store.get("userFilterData"):null,
    // 用户向后台发起api请求的数据
    searchFilterList: store.has("searchFilterList")?store.get("searchFilterList"):null,
}

const actions = {
    //设置用户当前选择的城市
    setCurrentCity({ commit }, data) {
        store.set("currentCity",data);
        commit(types.SET_CURRENT_CITY, JSON.stringify(data))
    },

    //设置用户的搜索条件数据
    setUserFilterData({ commit }, data) {
        store.set("userFilterData",data);
        commit(types.SET_USER_FILTER_DATA, JSON.stringify(data))
    },

    //清空用户的搜索条件数据
    clearUserFilterData({ commit }) {
        store.remove("userFilterData")
        commit(types.SET_USER_FILTER_DATA, {})
    },

    //设置用户向后台发起api请求的数据
    setSearchFilterList({ commit }, data) {
        store.set("searchFilterList",data);
        commit(types.SET_SEARCH_FILTER_LIST, JSON.stringify(data))
    },


}

const getters = {
    currentCity: state => state.currentCity,
    currentCityName: state => state.currentCityName,
    getUserFilterData: state => state.userFilterData,
    getSearchFilterList: state => state.searchFilterList,
}

const mutations = {
    [types.SET_CURRENT_CITY](state, res){
        state.currentCity = store.get("currentCity") || null;
        state.currentCityName = store.get("currentCity")?store.get("currentCity").name : '南昌';
    },
    [types.SET_USER_FILTER_DATA](state, res){
        state.userFilterData = res
    },
    [types.SET_SEARCH_FILTER_LIST](state, res){
        state.searchFilterList = res
    },
}

export default {
    state,
    actions,
    getters,
    mutations
}