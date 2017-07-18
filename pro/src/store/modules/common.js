
/** 
* @description 一些公共的状态 
* @creatDate 2017-6-15
* @author Geek.Yu  email:1098654043@qq.com
*/ 

import api from 'api/getData.js'
// 引入系统变量
import * as SYSTEM from 'api/system.js'
import * as types from '../types'
import {store} from 'assets/js/store.js'

const state = {
    // 购物车数量
    shopingCartNumber: 0,
}

const actions = {
    /**
     * 获取我的购物车中车辆数量
     */
    getMyShoppingNumber({ commit }, params) {
        api.getMyShoppingCartNumber().then(res => {
            if(res.code==SYSTEM.CODE_IS_OK){
                commit(types.GET_MY_SHOPPING_NUMBER, res.data.length)
            }else if(res.code==SYSTEM.CODE_IS_ERROR){
                this.$notify({
                    title: '信息获取失败',
                    message: res.msg,
                    type: 'error',
                    duration: 1500,
                });
            }
        })   
    }
}

const getters = {
    shopingCartNumber: state => state.shopingCartNumber,
}

const mutations = {
    // 设置购物车数量
    [types.GET_MY_SHOPPING_NUMBER](state, res) {
        state.shopingCartNumber = res
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}