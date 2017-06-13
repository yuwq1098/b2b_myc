import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import localData from './modules/local'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        localData,
    }
})