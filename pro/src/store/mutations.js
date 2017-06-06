import {
	IS_SHOW_LOADING,
} from './mutation-types.js'


export default {
	[IS_SHOW_LOADING](state,bool){
		state.isShowLoading = bool;
	}
}