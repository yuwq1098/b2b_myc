<!-- 网站首页 -->
<template>
    <div class="home">
        <div class="g-doc">
            <div class="g-carousel">
                <div class="m-sld">
                    <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="siteHomeSwiper">
                        <!-- 这部分放你要渲染的那些内容 -->  
                        <template v-for="item in swiperItems">
                            <swiper-slide >
                                <template v-if="!item.path">
                                    <a href="javascript:;" class="u-box">
                                        <img :src="item.imgUrl" :alt="item.title" class="pic"/>
                                    </a>
                                </template>
                                <template v-else>
                                    <router-link class="u-box"
                                        :to="{path:item.path}" tag="a"
                                        >
                                        <img :src="item.imgUrl" :alt="item.title" class="pic"/>
                                    </router-link>
                                </template>
                            </swiper-slide>  
                        </template>
                        <!-- 这是轮播的小圆点 -->  
                        <div class="swiper-pagination" slot="pagination"></div>  
                    </swiper>
                </div><!-- 轮播摸块 -->
            </div><!-- 轮播区 -->

            <div class="g-search">
                <section class="search-box f__clearfix">

                </section><!-- 搜索容器 -->
            </div><!-- 搜索区 -->

            <div class="g-filter">
                <section class="filter-box f__clearfix">
                      
                </section><!-- 过滤容器 -->
            </div><!-- 过滤区 -->

            <div class="g-lowPrice">
                
            </div><!-- 低价区 -->

            <div class="g-lemon-market">
            
            </div><!-- 二手车B2B市场 -->

            <div class="g-carDealer">
            
            </div><!-- 明星车商 -->

            <div class="g-newCars">
            
            </div><!-- 新车专区 -->

            <div class="g-recommend">
                
            </div><!-- 热门推荐 -->
            
        </div><!-- 文档 -->
        
    </div>
</template>

<script>

    // 获取数据的api
    import api from "api/getData.js"
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // 轮播组件
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    // 首页静态数据
    import {swiperItems} from "api/localJson/home.js"

    export default {
        name: 'home',
        // 注册组件
        components: {
            swiper,
            swiperSlide,
        },
        data () {
            return {
                // notNextTick是一个组件自有属性，假如你需要刚加载便使用获取swiper对象来做什么事，那么这个属性一定要是true
                notNextTick: true,
                // 轮播静态数据
                swiperItems: swiperItems,        //首页轮播图数据集合
                // 轮播组件配置
                swiperOption: {
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    autoplay : 3500,
                    speed: 500,                         //速度
                    loop: true,                         //环路
                    paginationClickable: true,          //分页点击
                    pagination: '.swiper-pagination',   //分页器
                    // 关闭淡出，保留淡入
                    fade: {
                        crossFade: false,
                    },
                    spaceBetween: 0,
                    onSlideChangeEnd: (swiper) => {
                        //这个位置放swiper的回调方法
                        this.page = swiper.realIndex+1;
                        this.index = swiper.realIndex;
                    },
                    onAutoplayStop: (swiper) => {
                        swiper.startAutoplay();
                    }
                },
            }
        },
        //keep-alive之后页面会缓存，不会执行created(),和mounted(),但是会执行activated()
        activated() {

        },

        //退出的生命周期钩子
        deactivated(){

        },
        computed:{

        },
        watch:{


        },
    }
</script>



<!-- 修改外部插件（组件）的样式时，不要加scoped，最好文件分成两个 -->
<style lang="stylus" rel="stylesheet/stylus">
    @import './indexSwiper.styl'
</style>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import './index.styl'
</style>

