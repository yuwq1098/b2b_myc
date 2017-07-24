<!--
-  @description 我的购物车
-->

<template>
	<div class="shoppingCart">
	    <div class="g-doc">
            <div class="g-bd">    
                <section class="f__w1200">
                
                    <gk-bread-crumb
                        :crumbItems="crumbItems"
                        ></gk-bread-crumb><!-- 面包屑组件 -->
                    <div class="m-cart-box">
                        
                    </div><!-- 购物车内容 -->

                </section><!-- 1200px布局 -->
            </div><!-- 网页主体 -->
		</div>
	</div>
</template>

<script>
    // 面包屑组件
    import gkBreadCrumb from "components/common/gkBreadcrumb.vue"
    // 网站外层面包屑列表本地化资源
    import {crumbsInfo} from "api/localJson/homeCrumb.js"

	export default {
        name: "shoppingCart",
        // 在当前模块注册组件
        components:{
            gkBreadCrumb,
        },
        // 数据
        data() {
            return{

                // 面包屑列表信息
                crumbItems: crumbsInfo['shoppingCart'],
                
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
    @import 'index.styl'

</style>

