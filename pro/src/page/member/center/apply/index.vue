<template>
	<div class="authApply">
        <div class="g-mn-con">
            <member-hd>车行认证</member-hd>
        </div>
        
        <div class="m-flow-wrap">
            <apply-flow :step="step" :flowItems="flowItems"></apply-flow>
        </div><!-- 认证流程容器 -->

        <div class="m-apply-wrap">
            <div class="m-apply-con v1" v-show="step===1">
                
            </div>
            <div class="m-apply-con v2" v-show="step===2">
                
            </div>
            <div class="m-apply-con v3" v-show="step===3">
                
            </div>
            <div class="m-apply-con v4" v-show="step===4">
                
            </div>
        </div>

	</div>
</template>

<script>
    
    import memberHd from "components/base/memberHd2.vue"
    import applyFlow from "./apply_flow.vue"
    import {applyFlowItems as flowItems} from "api/localJson/flowData.js"


	export default {
        name: "authApply",
        // 数据
        data() {
            return{
                flowItems: flowItems,
                step: 1,
            }
        },
        // 自定义函数(方法)
        methods: {
            //提交
            onSubmit() {
                console.log('submit!');
            },
        },
        // 在当前模块注册组件
        components:{
            memberHd,
            applyFlow,
        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'
</style>
