
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
}

const actions = {
    //设置用户当前选择的城市
    setCurrentCity({ commit }, data) {
        store.set("currentCity",data);
        commit(types.SET_CURRENT_CITY, data)
    },
}

const getters = {
    currentCity: state => state.currentCity,
    currentCityName: state => state.currentCityName,
}

const mutations = {
    [types.SET_CURRENT_CITY](state, res){
        state.currentCity = store.get("currentCity") || null;
        state.currentCityName = store.get("currentCity")?store.get("currentCity").name : '南昌';
    },
}

export default {
    state,
    actions,
    getters,
    mutations
}