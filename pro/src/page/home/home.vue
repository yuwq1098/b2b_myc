<!-- 网站首页 -->
<template>
	<div class="home">
		<div class="g-doc">
            <div class="g-bd">
                <div class="g-ad">
                    <div class="m-sld">
                        <div class="swiper-container" id="index-carousel">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <a href="javascript:;">
                                        <img src="../../assets/img/figure01_tiny.jpeg" alt=""/>
                                    </a>
                                </div>
                                <div class="swiper-slide">
                                    <a href="javascript:;">
                                        <img src="../../assets/img/figure02_tiny.jpeg" alt=""/>
                                    </a>
                                </div>
                                <div class="swiper-slide">
                                    <a href="javascript:;">
                                        <img src="../../assets/img/figure03_tiny.jpeg" alt=""/>
                                    </a>
                                </div>
                                <div class="swiper-slide">
                                    <a href="javascript:;">
                                        <img src="../../assets/img/figure04_tiny.jpeg" alt=""/>
                                    </a>
                                </div>
                                <div class="swiper-slide">
                                    <a href="javascript:;">
                                        <img src="../../assets/img/figure05_tiny.jpeg" alt=""/>
                                    </a>
                                </div>
                            </div><!-- 图片容器 -->
                            <div class="swiper-pagination"></div><!-- 引入分页器 -->
                        </div>
                    </div><!-- 轮播摸块 -->
                </div><!-- 广告区 -->

                <div class="g-bd-ct">
                    <div class="f__w1200">
                        <div class="m-all-search">
                            <section class="search-box f__clearfix">
                                <input type="text" class="u-ipt" placeholder="请输入感兴趣的品牌、车系" id="brandSearch" autocomplete="off"/>
                                <a href="javascript:;" class="u-btn">立即搜索</a>
                                <a href="javascript:;" class="u-btn v2">我要卖车</a>
                            </section>
                        </div><!-- 搜索框 -->

                        <div class="m-category f__clearfix">
                            <div class="m-brand-wrap f__fl">
                                <div class="u-hd">
                                    <a href="javascript:;" class="u-lk">品牌<i class="iconfont icon-caretdown"></i></a>
                                </div>
                                <div class="u-con f__clearfix">
                                    <a href="javascript:;" class="u-lk" v-for="n in 16">
                                        <img src="../../assets/img/b_84.png" alt="大众" />
                                        <p class="u-tit">大众</p>
                                    </a>
                                </div>
                            </div>
                            <div class="m-price-wrap f__fl">
                                <div class="u-hd">
                                    <a href="javascript:;">价格</a>
                                </div>
                                <div class="u-con f__clearfix">
                                    <a href="javascript:;" class="u-lk">5万以内</a>
                                    <a href="javascript:;" class="u-lk">5-10万</a>
                                    <a href="javascript:;" class="u-lk">10-15万</a>
                                    <a href="javascript:;" class="u-lk light">15-20万</a>
                                    <a href="javascript:;" class="u-lk">20-30万</a>
                                    <a href="javascript:;" class="u-lk">30-50万</a>
                                    <a href="javascript:;" class="u-lk light">50-80万</a>
                                    <a href="javascript:;" class="u-lk light">80万以上</a>
                                </div>
                            </div>
                        </div><!-- 种类（快速选择） -->
                    </div>

                    <div class="f__w1200">
                        <div class="m-b2c-svr">
                            <ul class="m-svr-lst f__clearfix">
                                <li class="u-svr-item" v-for="(item,index) in serverList" :class="{lastItem:index==serverList.length - 1}">
                                    <a href="javascript:;" class="u-lk">
                                        <img :src="item.imgUrl" :alt="item.title" />
                                    </a>
                                </li>
                            </ul>
                        </div><!-- 付费服务 -->
                    </div>

                    <div class="m-b2b-entrance">
                        <div class="m-etc-bg">
                            <div class="">
                                <h2 class="u-tit">二手车<em class="vital">B2B</em>市场</h2>
                                <p class="u-txt">车商首选 全国二手车批发大厅</p>
                                <a href="javascript:;" class="u-btn">立即进入</a>
                            </div>
                            <div class="u-img-bg"></div><!-- 车背景装饰 -->    
                        </div>
                    </div><!-- B2B专区大厅入口 -->

                    <div class="f__w1200">
                        <div class="m-notice-box">
                            <div class="m-tit">今日成交：</div><!-- 标题 -->
                            <div class="m-notice-bar">
                                <ul class="u-notice-lst">
                                    <li class="u-notice-item">谁谁谁，成交了xxxxxxxxxxd.</li>
                                    <li class="u-notice-item">谁谁谁，成交了xxxxxxxxxxd.</li>
                                    <li class="u-notice-item">谁谁谁，成交了xxxxxxxxxxd.</li>
                                    <li class="u-notice-item">谁谁谁，成交了xxxxxxxxxxd.</li>
                                </ul>
                            </div>
                        </div><!-- 成交公告区域 -->

                        <div class="m-lst-group">
                            <div class="m-lst-hd f__clearfix">
                                <h3 class="f__fl">
                                    <span class="u-tit">全国二手车批发市场</span>
                                    <span class="u-sep">/</span>
                                    <span class="u-des">最全的二手车资源，农行合作，交易安全无忧</span>
                                </h3>
                                <a href="javascript:;" class="u-more f__fr">
                                    更多<i class="iconfont icon-fanhui6"></i>
                                </a>
                            </div>
                            <div class="m-lst-con">
                                <ul class="m-lst f__clearfix">
                                    <li class="m-item" v-for="item in b2bCarList">
                                        <router-link :to="{path:'/carDetails',query: { CarId: item.CarId }}" class="u-box">
                                            <div class="u-pic">
                                                <img v-lazy="item.FileUri" :alt="item.Title"/>
                                            </div>
                                            <div class="u-con">
                                                <h5 class="u-tit">
                                                    {{item.Title}}
                                                </h5>
                                                <p class="u-des">{{item.CarInCity}}/{{item.ShelveTime | dateFnToYear }}/{{item.Mileage | mileFn}}</p>
                                                <div class="u-price">
                                                    批发价:<em>{{item.B2BPrice}}万</em>
                                                </div>
                                                <a href="javascript:;" class="u-lk">
                                                    <p class="u-count">
                                                        <strong>215</strong>
                                                        次
                                                    </p>
                                                    <p>围观</p>
                                                </a>
                                            </div>
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </div><!-- 列表信息展示组 -->
                    </div>
                    
                </div><!-- 网页内容 -->

            </div><!-- 网页主体 -->
            
            <!-- 引入底部站点服务图示 -->
            <c-foot-server></c-foot-server>
            
		</div><!-- 文档 -->
	</div>
</template>

<script>
    
    import $ from 'jquery'
    import Swiper from "static/swiper.min.js"
    import {mapActions} from 'vuex'
    import cFootServer from "components/foot/foot-svr.vue"
    import {dataToJson} from "assets/js/util.js"
    import api from "api/getData.js"
    import {serverList} from "api/localJson/home.js"
    

    export default {
    	name: 'home',
        // 注册组件
        components: {
            cFootServer,
        },
    	data () {
    		return {
    			b2bCarList: [],
                b2bCarBrand: [],
                serverList: serverList,
    		}
    	},
        created () {
            // this.$store.dispatch('getAllProvince');
            //获取b2b二手车大厅列表
            this._getB2BCarList();
            //获取汽车品牌列表
            this._getB2BCarBrandList();
            this._getCarSeries();
            
            this.mySwiper = null;
            this.$nextTick(function(){
                this.mySwiper = new Swiper('#index-carousel', {
                    autoplay: 6000,     //可选选项，自动滑动
                    autoplayDisableOnInteraction : false,  //用户操作后，不禁止自动滑动
                    effect: 'fade',
                    speed: 400,         //速度
                    loop: true,     //环路
                    paginationClickable: true,           //分页点击
                    pagination: '.swiper-pagination',   //分页器
                    // 关闭淡出，保留淡入
                    fade: {
                        crossFade: false,
                    },
                    // 如果滑动停了，那么重新开启它
                    onAutoplayStop: function(swiper){
                        this.mySwiper.startAutoplay();
                    },
                });
            })
        },
        mounted(){
            
        },
        //keep-alive之后页面会缓存，不会执行created(),和mounted(),但是会执行activated()
        activated() {
            //更新swiper
            if(this.mySwiper){
                this.mySwiper.update()
            }
            
        },
        //退出的生命周期钩子
        deactivated(){
           
        },
        methods:{
            //获取B2B大厅车辆列表
            _getB2BCarList(){
                // var [data] = [{}]
                // data.PageSize = '12';
                // data.PageIndex = '2';
                var data = {
                    "PageSize": 8,
                    "PageIndex": 1,
                }
                api.getB2BCarList(data).then((res) => {
                    this.b2bCarList = res.data;
                })
                // this.$ajax.post("/api/action2/B2BCarList.ashx",{
                //         PageSize: 8,
                //         PageIndex: 1
                //     })
                //     .this((res) => {
                //         console.log("我的数据",res);
                //     })
                // var data = {
                //     "PageSize": 8,
                //     "PageIndex": 1,
                // }
                // $.ajax({
                //      url: "/api/action2/B2BCarList.ashx",
                //      dataType: 'json',
                //      method: 'POST',
                //      data: JSON.stringify(data),
                // });
            },
            //获取B2B车辆品牌列表
            _getB2BCarBrandList(){
                api.getCarBrand().then((res) => {
                    this.b2bCarBrand = res.data;
                    console.log("汽车品牌列表",dataToJson(res.data));
                })
            },
            //根据车品牌获取车系
            _getCarSeries(){
                let [data] = [{}]
                data.brandid = '5';
                api.getCarSeriesByBrand(data).then((res) => {
                    console.log("根据车品牌获取车系",dataToJson(res.data));
                })
            },
            
        }
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus">
    @import '~static/swiper.min.css'
</style>
<style lang="stylus" rel="stylesheet/stylus">
    @import 'home.styl'
</style>

