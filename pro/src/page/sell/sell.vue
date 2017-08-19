<!--
-  @description 我要卖车的大厅
-->

<template>
	<div class="sellHome">
	    <div class="g-doc">
            <div class="g-bd">    
                <section class="f__w1200">
                    <gk-bread-crumb
                        :crumbItems="crumbItems"
                        ></gk-bread-crumb><!-- 面包屑组件 -->
                </section><!-- 1200px布局 -->
                <div class="m-hall-mn">
                    <div class="m-center">
                        <section class="f__w1200 inner">
                            <div class="m-tb">
                                <router-link  class="u-btn fill" :to="{path:'/sellSend'}" 
                                    >立即发车
                                </router-link>
                                <a href="javascript:;" class="u-btn hollow"
                                    >免费询价
                                </a>
                                <div class="u-info">
                                    <span class="tips">咨询热线</span>
                                    <div class="data">400-900-9936</div>
                                </div>
                            </div>
                            <div class="m-tit">
                                <div class="u-tit">直卖全国，高价成交</div>
                                <div class="u-desc">
                                    <span class="txt">二手车交易一条龙服务极速成交</span>
                                </div>
                            </div>
                        </section>
                    </div><!-- 中心内容 -->
                    <div class="m-hall-other">
                        <section class="f__w1200 inner">
                            <div class="u-svr-bg"></div><!-- 买车服务保障/优势 -->
                        </section>
                    </div><!-- 其他内容 -->
                </div><!-- 卖车大厅主要内容 -->
                
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
        name: "sellHome",
        // 在当前模块注册组件
        components:{
            gkBreadCrumb,
        },
        // 数据
        data() {
            return{

                // 面包屑列表信息
                crumbItems: crumbsInfo['sellHome'],
                
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
    @import 'sell.styl'

</style>

