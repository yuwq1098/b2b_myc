<!--
-  @description 我要卖车的大厅（仿造第一车网），放一些海报，还有几个入口(包括填写卖车单子)
-->

<template>
	<div class="sellHome">
	    <div class="g-doc">
            <div class="g-bd">
                <section class="f__w1200">
                    <gk-bread-crumb></gk-bread-crumb><!-- 面包屑组件 -->
                    <div>我是卖车大厅，没什么内容</div>
                </section><!-- 1200px布局 -->
            </div><!-- 网页主体 -->
		</div>
	</div>
</template>

<script>
    // 面包屑组件
    import gkBreadCrumb from "components/common/gkBreadcrumb.vue"

	export default {
        name: "sellHome",
        // 在当前模块注册组件
        components:{
            gkBreadCrumb,
        },
        // 数据
        data() {
            return{

            }
        },
        // 计算数据
        computed:{

        },
        // 数据侦听
        watch:{
            
        },
        //生命周期,开始的时候
        created(){

        },
        // $el 挂载的时候
        mounted() {
            
        },
        // 再次进入生命周期钩子(因为keep-alive的原因,created和mounted在页面切换过程中都是无效的)
        activated(){

        },
        //退出的生命周期钩子
        deactivated(){

        },
        // 自定义函数(方法)
        methods: {
              
        },

	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import './sell.styl'
</style>
