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

            <div class="g-filter">
                <section class="filter-box f__clearfix  f__w1200">
                    <buysell-wrap></buysell-wrap><!-- 买车卖车小操作容器 -->
                </section><!-- 过滤容器 -->
            </div><!-- 过滤区 -->

            <div class="g-lowPrice">
                <section class="area-inner f__w1200">
                    <a href="javascript:;" class="u-box"></a>
                </section>
            </div><!-- 低价区 -->

            <div class="g-lemon-market m-layout">
                <section class="box-inner f__w1200 f__clearfix">
                    <div class="u-lt-ad f__fl">
                        <div class="u-bg-pic">
                        
                        </div><!-- 图片 -->
                    </div><!-- 左侧/广告 -->
                    <div class="u-rt-con f__fr">
                         <wholesale-market
                            :carList="b2bCarList"
                            :eggsList="goldenEggsCar"
                        ></wholesale-market>
                    </div><!-- 右侧/内容 -->
                </section>
            </div><!-- 二手车B2B市场 -->

            <div class="g-carDealer m-layout" v-if="!!starDealerInfo">
                <section class="box-inner f__w1200 f__clearfix">
                    <div class="u-lt-ad f__fl">
                        <div class="u-bg-pic">
                            
                        </div><!-- 图片 --> 
                    </div><!-- 左侧/广告 -->
                    <div class="u-rt-con f__fr">
                        <star-dealer :dealerInfo="starDealerInfo"></star-dealer>
                    </div><!-- 右侧/内容 -->
                </section>
            </div><!-- 明星车商 -->

            <div class="g-newCars m-layout">
                <section class="box-inner f__w1200 f__clearfix">
                    <div class="u-lt-ad f__fl">
                        <div class="u-bg-pic">
                             
                        </div><!-- 图片 -->
                    </div><!-- 左侧/广告 -->
                    <div class="u-rt-con f__fr">
                        <new-cars :carList="newCarsList"></new-cars>
                    </div><!-- 右侧/内容 -->
                </section>
            </div><!-- 新车专区 -->

            <div class="g-recommend m-carlist-box">
                <section class="box-inner f__w1200">
                    <header class="u-head f__clearfix">
                        <h3 class="f__fl">
                            <span class="u-tit">热门推荐</span>
                        </h3>
                    </header><!-- 头部 -->
                    <section class="u-con">
                        <remd-list-box :carList="youLikeList"></remd-list-box>
                    </section><!-- 内容 -->
                    <a class="u-btn batch" @click="changeBatch()">点击换一批车源<i class="iconfont icon-xiangyou1"></i></a>
                </section>
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
    import { swiperItems } from "api/localJson/home.js"

    // b2b/b2c车辆信息构造类
    import { b2bCarInfo, b2cCarInfo, lowPriceInfo, goldenEggsInfo, newCarInfo } from "base/class/carInfo.js"
    // 车商信息的构造类
    import { dealerInfo } from 'base/class/dealerCircle.js'
    
    // 买车卖车
    import buysellWrap from 'components/boxLayout/buysell.vue'
    // 明星车商
    import starDealer from "components/boxLayout/starDealer.vue"
    // 二手车批发市场
    import wholesaleMarket from "components/boxLayout/saleMarket.vue"
    // 4s新车
    import newCars from "components/boxLayout/newCars.vue"
    // 相似推荐车辆列表组件
    import remdListBox from "components/boxLayout/remdListBox.vue"

    export default {
        name: 'home',
        // 注册组件
        components: {
            swiper,
            swiperSlide,
            buysellWrap,
            starDealer,
            wholesaleMarket,
            newCars,
            remdListBox,
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
                // 红包车
                goldenEggsCar: [],
                // 明星车商信息
                starDealerInfo: {},
                // b2b二手车
                b2bCarList: [],
                // 新车(4s新车)
                newCarsList: [],
                // 猜你喜欢
                youLikeList: [],
            }
        },
        //keep-alive之后页面会缓存，不会执行created(),和mounted(),但是会执行activated()
        activated() {
            
            // 获取红包车列表
            this.getGoldenEggsList();
            // 获取 b2b车辆列表
            this.getB2bCarList();
            // 获取明星车商的列表数据
            this.getStarDealerInfo();
            // 获取 4s新车数据
            this.getNewCarsBy4S();
            // 获取 猜你喜欢的数据
            this.getYouLike();

            //更新swiper(强制初始化)
            this.$nextTick(() => {
                // 首页轮播图
                if(this.siteHomeSwiper){
                    this.siteHomeSwiper.init()
                }
            });
        },

        //退出的生命周期钩子
        deactivated(){
            
        },
        // 属性值计算
        computed:{
            siteHomeSwiper() {  
                return this.$refs.siteHomeSwiper.swiper;  
            }
        },
        // 数据侦听
        watch:{

        },
        // 实例方法
        methods:{
        
            // 使用 红包车构造类完成格式化
            normalizeGoldenEggs(info){
                let carInfo = [];
                carInfo.push(new goldenEggsInfo(info))
                return carInfo;
            },

            // 获取 红包车列表
            getGoldenEggsList(){
                var data = {
                    "ActType":"GoldenEggCar"
                }
                // 获取 红包车
                api.goldenEggsCar(data).then((res) => {
                    this.goldenEggsCar = this.normalizeGoldenEggs(res.data);
                })
            },

            //使用b2b抽象类完成carInfo
            normalizeB2bCarInfo(list){
                let carInfo = [];
                list.forEach((item, index) => {
                    carInfo.push(new b2bCarInfo(item))
                });
                return carInfo;
            },

            // 获取 b2b车辆列表
            getB2bCarList(){
                var data = {
                    "PageSize": 8,
                    "PageIndex": 1,
                }
                // 获取b2b大厅车辆数据
                api.getB2BCarList(data).then((res) => {
                    this.b2bCarList = this.normalizeB2bCarInfo(res.data)
                })
            },
            
            // 格式化明星车商列表数据
            normalizeDealerInfo(list){
                // 前三
                let topThree = [];
                // 正常
                let normal = [];
                list.forEach((item,index) => {
                    if(index<3){
                        topThree.push(new dealerInfo(item));
                    }else{
                        normal.push(new dealerInfo(item));
                    }
                })
                return {
                    topThree,
                    normal,
                };
            },

            // 获取明星车商信息
            getStarDealerInfo(){
                let data = {
                    PageIndex: 1,
                    PageSize: 7,
                }
                // 发起车商信息api信息请求
                api.carDealerCircleRanking(data).then((res) => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        // 车商信息
                        this.starDealerInfo = this.normalizeDealerInfo(res.data.CdgList);
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '信息获取失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                });
            },

            //使用 新车信息构造类完成
            normalizeNewCarsInfo(list){
                let carInfo = [];
                list.forEach((item, index) => {
                    carInfo.push(new newCarInfo(item))
                });
                return carInfo;
            },

            // 获取4s新车
            getNewCarsBy4S(){
                let data = {
                    PageIndex: 1,
                    PageSize: 8,
                }
                api.newCarListHall(data).then((res) => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.newCarsList = this.normalizeNewCarsInfo(res.data);
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '信息获取失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500
                        })
                    }
                });
            },

            //使用b2b抽象类完成carInfo
            _normalizeYouLike(list){
                let carInfo = [];
                list.forEach((item, index) => {
                    if(index<5){
                        carInfo.push(new b2bCarInfo(item))
                    }
                });
                return carInfo;
            },

            // 获取猜你喜欢数据
            getYouLike(){
                api.getGuessYouLike().then((res) => {
                    this.youLikeList = this._normalizeYouLike(res.data)
                });
            },

            // 猜你喜欢（换一批）
            changeBatch(){
                api.getGuessYouLike('NewBatch').then((res) => {
                    this.youLikeList = this._normalizeYouLike(res.data)
                });
            },

        }
    }
</script>



<!-- 修改外部插件（组件）的样式时，不要加scoped，最好文件分成两个 -->
<style lang="stylus" rel="stylesheet/stylus">
    @import './indexSwiper.styl'
</style>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import './index.styl'
</style>

