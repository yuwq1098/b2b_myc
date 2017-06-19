<!--
-  @description 我要卖车的大厅（仿造第一车网），放一些海报，还有几个入口(包括填写卖车单子)
-->

<template>
	<div class="sellHome">
	    <div class="g-doc">
            <div class="g-bd">
                <section class="f__w1200">
                    <gk-bread-crumb></gk-bread-crumb><!-- 面包屑组件 -->
                    <div class="m-sell-hall">
                        <div class="m-sell-swiper">
                            <swiper :options="swiperOption" ref="sellSwiper">  
                                <!-- 这部分放你要渲染的那些内容 -->  
                                <template v-for="item in sellSwiperItems">
                                    <swiper-slide >
                                        <a :href="item.href?item.href:'javascript:;'">
                                            <img :src="item.imgUrl" :alt="item.title"/>
                                        </a>
                                    </swiper-slide>  
                                </template>
                                <!-- 这是轮播的小圆点 -->  
                                <div class="swiper-pagination swiper-pagination1" slot="pagination"></div>
                            </swiper>

                        </div><!-- 卖车大厅的轮播图 -->
                        
                        <div class="m-sell-func">
                            
                        </div><!-- 卖车大厅的主要功能 -->

                    </div><!-- 卖车大厅内容主体 -->
                </section><!-- 1200px布局 -->
            </div><!-- 网页主体 -->
		</div>
	</div>
</template>

<script>
    // 面包屑组件
    import gkBreadCrumb from "components/common/gkBreadcrumb.vue"
    // swiper轮播组件
    import { swiper, swiperSlide } from 'vue-awesome-swiper'  

    // 获取卖车大厅的本地相关数据
    import {sellSwiperItems,sellFunctionList} from "api/localJson/sell.js"

	export default {
        name: "sellHome",
        // 在当前模块注册组件
        components:{
            gkBreadCrumb,
            swiperSlide,
            swiper,  
        },
        // 数据
        data() {
            return{
                
                sellSwiperItems: sellSwiperItems,              // 卖车大厅轮播图数据集合

                swiperOption: {  
                    //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true  
                    notNextTick: true,  
                    pagination: '.swiper-pagination',  
                    slidesPerView: 'auto',  
                    centeredSlides: true,  
                    speed: 400,                         //速度
                    loop: true,                         //环路
                    paginationClickable: true,          //分页点击
                    pagination: '.swiper-pagination',   //分页器
                    // 关闭淡出，保留淡入
                    fade: {
                        crossFade: false,
                    },
                    spaceBetween: 0,                    //间隔  
                    onSlideChangeEnd: swiper => {  
                        //这个位置放swiper的回调方法  
                        this.page = swiper.realIndex+1;  
                        this.index = swiper.realIndex;  
                    }   
                },
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

<!-- 修改外部插件（组件）的样式时，不要加scoped，最好文件分成两个 -->
<style lang="stylus" rel="stylesheet/stylus">
    @import './sellSwiper.styl'
</style>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import './sell.styl'
</style>

