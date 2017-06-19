<!--
-  @description 填写卖车单子的页面（仿造第一车网）,未登录不可访问
-->

<template>
	<div class="sendCar">
	    <div class="g-doc">
            <div class="g-bd">
                <section class="f__w1200">
                    <gk-bread-crumb></gk-bread-crumb><!-- 面包屑组件 -->
                </section><!-- 1200px布局 -->
                <div class="m-send-con">
                    <div class="m-banner-box">
                        <img :src="bannerInfo.imgUrl" :alt="bannerInfo.title"/>
                    </div><!-- 填写表单的小广告图 -->
                    <section class="f__w1200">
                        <div class="m-bill-wrap">
                            <div class="m-bill-hd">
                                <p class="u-tit">
                                    <span class="text">请认真填写个人车辆信息，</span>
                                    <span class="vital">极速审核发车</span>
                                </p>
                            </div><!-- 头部标题 -->
                            <div class="m-bill-con">
                                
                            </div><!-- 车单内容 -->
                        </div><!-- 用户填单(发单) -->
                    </section>
                </div><!-- 填写表单处 -->
            </div><!-- 网页主体 -->
		</div>
	</div>
</template>

<script>

    // 面包屑组件
    import gkBreadCrumb from "components/common/gkBreadcrumb.vue"
    // 获取m卖车填单页的本地相关数据
    import {sendBannerInfo} from "api/localJson/sell.js"

	export default {
        name: "sendCar",
        // 在当前模块注册组件
        components:{
            gkBreadCrumb,
        },
        // 数据
        data() {
            return{
                bannerInfo: sendBannerInfo,
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
    @import './sendCar.styl'
</style>
