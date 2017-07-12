<template>
    <div class="putApply">
        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="我的认证"
            >
            <div slot="content">
                
                <member-inner>
                    <div class="m-apply-wrap">

                        <div class="m-box-inner">
                            <div class="m-flow-hd">
                                <div class="u-flow-box">
                                    <div class="u-progress-wrap"
                                        :class="'flow'+tabShowIndex">
                                        <div class="progress-bar"></div>
                                    </div><!-- 进度条 -->

                                    <div class="u-part v1" 
                                        :class="{'on':tabShowIndex>=1}">
                                        <div class="part-no">1</div>
                                        <div class="txt">验证身份</div>
                                    </div>
                                    <div class="u-part v2"
                                        :class="{'on':tabShowIndex>=2}">
                                        <div class="part-no">2</div>
                                        <div class="txt">修改支付密码</div>
                                    </div>
                                    <div class="u-part v3"
                                        :class="{'on':tabShowIndex==3}">
                                        <div class="part-no">3</div>
                                        <div class="txt">完成</div>
                                    </div>
                                </div>
                            </div><!-- 流程进度 -->
                        </div>

                    </div><!-- 认证容器 -->
                </member-inner>

            </div><!-- 认证资料提交(上传审核) -->
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
        
        name: "putApply",
        // 在当前模块注册组件
        components:{
            memberLayout,
            memberInner,
        },
        // 数据
        data() {
            return{
                // 选项卡显示
                tabShowIndex: "",
            }
        },
        //生命周期,开始的时候
        created(){
            
        },
        mounted(){

        },
        activated(){
            this.tabShowIndex = 3;
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
