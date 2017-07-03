<template>
    <div class="payPass">

        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="安全中心"
            :isSafety="true"
            >
            <div slot="content">
                <member-inner>
                    <div v-if="showType==1">
                        设置支付密码
                    </div>
                    <div v-if="showType==2">
                        修改支付密码
                    </div>
                    <div v-if="showType==3">
                        忘记支付密码
                    </div>
                </member-inner>
            </div><!-- 设置支付密码页面内容 -->
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

        name: "payPass",
        // 在当前模块注册组件
        components:{
            memberLayout,
            memberInner,
        },
        // 数据
        data() {
            return{
                // 操作支付密码类型（1.初次设置支付密码，2.修改支付密码，3.忘记支付密码）
                showType: 0,
            }
        },
        //生命周期,开始的时候
        created(){

        },
        mounted(){

        },
        activated(){
            // 获取当前操作支付密码类型
            this.showType = this.$router.currentRoute.query.showType||1;
        },
        //退出的生命周期钩子
        deactivated(){

        },
        //数据侦听
        watch:{

        },
        // 自定义函数(方法)
        methods: {

        },    
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .m-form-wrap
        width 450px
        margin 0 auto 40px
        .user-form
            width @width
</style>
