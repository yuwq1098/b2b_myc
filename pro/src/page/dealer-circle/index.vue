<!-- 车商圈 -->

<template>
	<div class="dealerCircle">
	    <div>我是车商圈，蛋疼</div>
	</div>
</template>


<script>

    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // vuex状态管理
    import { mapGetters,mapActions } from 'vuex'
    // 工具类
    import {dataToJson} from "assets/js/util.js"
    // dom操作类
    import * as geekDom from 'assets/js/dom.js'
    
    
	export default {
        name: "dealerCircle",
        // 在当前模块注册组件
        components:{
            
        },
        // 数据
        data() {
            return{
                              
            }
        },
        // 生命周期,开始的时候
        created(){

        },
        // 当dom挂载到$el上的钩子事件
        mounted(){
            
        },
        activated(){

        },

        // 退出的生命周期钩子
        deactivated(){
            
        },

        // 数据侦听
        watch:{

        },

        // 属性计算
        computed:{

        },
        methods:{
            
        }
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'
</style>
