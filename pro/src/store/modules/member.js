import * as types from '../types'
import {store} from 'assets/js/store.js'

/**
 * 接口/action2/MyMemberInfo.ashx ,
 * AuthStatus true number 认证状态 0待处理，1成功，-1失败
 */

const state = {
    // 流程认证步骤, 1.填写车行信息，2.实名认证，3.提交审核，4.审核认证
    applyFlowType: 1,
    // 认证状态
    applyStatus: false,     //认证状态初始化为false
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