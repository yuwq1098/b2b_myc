<template>
	<div class="myApply">
        <div class="g-mn-con">
            <m-head>我的认证</m-head>
        </div>
        
        <div class="">
            <apply-flow></apply-flow>
        </div>

	</div>
</template>

<script>
    
    import MHead from "components/base/memberHd.vue"
    import applyFlow from "./apply_flow.vue"
	export default {
        name: "myApply",
        // 数据
        data() {
            
        },
        // 自定义函数(方法)
        methods: {
            
        },
        // 在当前模块注册组件
        components:{
            MHead,
            applyFlow,
        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import './apply.styl'
</style>
