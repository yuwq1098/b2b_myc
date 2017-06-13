import * as types from '../types'
import {store} from 'assets/js/store.js'

const state = {
    // 用户当前选择的城市
    currentCity: store.get("currentCity") || '南昌',
}

const actions = {
    //设置用户当前选择的城市
    setCurrentCity({ commit }, data) {
        store.set("currentCity",data);
    },
}

const getters = {
    currentCity: state => state.currentCity,
}

const mutations = {
    [types.SET_CURRENT_CITY](state, res){
        state.currentCity = res;
    },
}

export default {
    state,
    actions,
    getters,
    mutations
}