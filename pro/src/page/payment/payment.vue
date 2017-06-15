<template>
   <div class="paymentIndex">
        <div class="g-doc">
           <div class="g-bd">
               <section class="f__w1200">
                   <div class="m-crm">
                        <span>当前位置：</span>
                        <el-breadcrumb separator=">">
                            <el-breadcrumb-item :to="{ path: '/' }">北京二手车</el-breadcrumb-item>
                            <el-breadcrumb-item>大众朗逸2011款1.6L手动品悠版</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div><!-- 面包屑 -->
                    <div class="m-pay-mn">
                        <div class="m-pay-hd">
                           <pay-flow :step="step" :flowItems="flowItems"></pay-flow>
                           <div class="u-tip">双方保证金已锁定</div><!-- 提示 -->
                        </div>
                        <div class="m-pay-con">
                            <transition name="fade" mode="out-in">
                                <keep-alive>
                                    <router-view></router-view>
                                </keep-alive>
                            </transition>
                        </div>
                   </div>
                </section>
            </div>
        </div>
   </div>
</template>


<script>
    import payFlow from "./pay_flow.vue"
    import {payFlowItems as flowItems} from "api/localJson/flowData.js"

    export default{
        name: "paymentIndex",
        //数据
        data(){
           return{
                step: 1,
                flowItems: flowItems,
            }
        },
        //实例创建时
        created(){
            this.stepUpdate();
        },
        //自定义函数（方法）
        methods:{

            //根据路由的变化更新步骤高亮
            stepUpdate(){
                this.step = this.$route.meta.step||1;
            }
        },
        // 在当前模块注册组件
        components:{
            payFlow,
        },
        computed: {

        },
        mounted(){

        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            "$route": "stepUpdate"
        }
   }

</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
   @import "./payment.styl"
</style>