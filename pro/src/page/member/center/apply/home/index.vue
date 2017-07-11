<template>
    <div class="applyHome">
        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="我的认证"
            >
            <div slot="content">
                
                <member-inner>
                    <div class="m-apply-wrap">
                        <div class="m-mn">
                            <div class="u-tit">您尚未认证</div><!-- 标题 -->
                            <div class="u-speak">无法在B2B进行交易</div><!-- 说些什么 -->
                            <a href="javascript:;" class="u-btn open-up"></a><!-- 开通认证 -->
                            <a href="javascript:;" class="u-btn download"></a><!-- 下载APP -->
                        </div><!-- 认证内容 -->
                        <div class="m-other">
                            <div class="u-info">
                                <div class="u-tit">认证资料更新上传</div><!-- 标题 -->
                                <div class="u-speak">营业执照补交</div><!-- 说些什么 -->
                            </div><!-- 信息区 -->
                            <a href="javascript:;" class="u-btn replenish">立即上传</a>
                        </div><!-- 认证资料补充 -->
                    </div><!-- 认证容器 -->
                </member-inner>

            </div><!-- 我的认证主页页面内容 -->
        </member-layout>
    </div>
</template>


<script>
    
    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // 工具类
    import {dataToJson} from "assets/js/util.js"
    // dom操作类
    import * as geekDom from 'assets/js/dom.js'

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue' 
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue'


    export default {
        
        name: "applyHome",
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
        // 退出的生命周期钩子
        deactivated(){

        },
        // 属性值计算
        computed:{

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
