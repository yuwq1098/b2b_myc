<template>
	<div class="bankCardEdit">

        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="绑定银行卡"
            >
            <div slot="content">
                <member-inner>
                    <div class="m-bankCard-wrap">
                     <div class="">
                            修改银行卡的页面
                        </div><!-- 银行卡绑定 -->
                    </div><!-- 银行卡容器 -->
                </member-inner>
            </div><!-- 银行卡添加/修改内容 -->
        </member-layout>

	</div>
</template>

<script>
    
    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // vuex状态管理
    import {mapActions} from 'vuex'
    // 工具类
    import {dataToJson} from "assets/js/util.js"
    // dom操作类
    import * as geekDom from 'assets/js/dom.js'

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue' 
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue'



	export default {
        name: "bankCardEdit",
        // 自定义表单验证
        validator: null,
        // 在当前模块注册组件
        components:{
            memberLayout,
            memberInner,
        },
        // 数据
        data() {
            return{


            }
        },
        //生命周期,开始的时候
        created(){

        },
        mounted(){

        },
        activated(){

        },
        //退出的生命周期钩子
        deactivated(){

        },
        // 数据侦听
        watch:{

        },
        // 自定义函数(方法)
        methods: {

        },
        
	}
</script>


<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'

</style>
