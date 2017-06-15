
/** 
* @description 用户中心的一些数据状态管理
* @creatDate 2017-6-15
* @author Geek.Yu  email:1098654043@qq.com
*/ 

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

}

const getters = {

}

const mutations = {
    
}

export default {
    state,
    actions,
    getters,
    mutations
}