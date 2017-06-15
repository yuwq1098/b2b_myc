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
                                <div class="m-srh-result-box" v-show="isShowSchResultBox">
                                    <gk-select
                                        :selectList="srhResultList"
                                        >
                                    </gk-select>
                                </div><!-- 查询结果列表 -->
                                
                                <input type="text" @blur="allSearchInputVal=''" @input="allSearchInput" class="u-ipt" placeholder="请输入感兴趣的品牌、车系" id="brandSearch" v-model="allSearchInputVal" autocomplete="off"/>
                                <a href="javascript:;" class="u-btn">立即搜索</a>
                                <router-link :to="{path:'/sellCar'}" class="u-btn v2">我要卖车</router-link>
                            </section>
                            
                        </div><!-- 搜索框 -->

                        <div class="m-category-wrap">
                            <brand-select></brand-select>
                        </div><!-- 汽车品牌，价格条件搜索 -->
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
                        <div class="m-etc-bg f__w1200">
                            <div class="m-info">
                                <h2 class="u-tit">二手车<em class="vital">B2B</em>市场</h2>
                                <p class="u-txt">车商首选 全国二手车批发大厅</p>
                                <router-link :to="{path:'/buyCar'}" class="u-btn">立即进入</router-link>
                            </div>
                            <div class="u-img-bg"></div><!-- 车背景装饰 -->
                        </div>
                    </div><!-- B2B专区大厅入口 -->

                    <div class="f__w1200">
                        <div class="m-notice-bar-warp">
                            <notice-info-bar
                                :noticeList="noticeBarList" 
                                >
                            </notice-info-bar><!-- 公告条 -->
                        </div><!-- 今日成交公告条 -->

                        <div class="m-lst-group">
                            <div class="m-lst-hd f__clearfix">
                                <h3 class="f__fl">
                                    <span class="u-tit">全国二手车B2C交易市场</span>
                                    <span class="u-sep">/</span>
                                    <span class="u-des">最全的二手车资源，农行合作，交易安全无忧</span>
                                </h3>
                                <a href="javascript:;" class="u-more f__fr">
                                    更多<i class="iconfont icon-fanhui6"></i>
                                </a>
                            </div>
                            <div class="carListWrap" v-if="b2cCarList.length>0">
                                <car-list-box
                                    :carlist="b2cCarList"
                                    car-to-path="/carDetails"
                                    boxType="b2c"
                                    >
                                </car-list-box>    
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
    import {serverList,noticeBarList} from "api/localJson/home.js"
    import {b2cCarInfo} from "base/class/carInfo.js"
    import {searchCarResult} from "base/class/searchResult.js"

    import gkSelect from "components/base/gkSelect.vue"
    import carListBox from "components/boxLayout/carListBox.vue"
    import brandSelect from "components/brandSel/brandSelect.vue"
    import noticeBar from "components/common/noticeBar.vue"
    
    //搜索延迟,300ms
    const SEARCH_DELAY = 500

    export default {
        name: 'home',
        // 注册组件
        components: {
            cFootServer,
            carListBox,
            brandSelect,
            gkSelect,
            noticeInfoBar: noticeBar,
        },
        data () {
            return {
                //全部搜索的绑定值
                allSearchInputVal: "",
                //用户缓暂搜索值的集合，当用户清空时，也同时清空
                srhValItems : [],
                srhResultList: [],            // 搜索结果列表
                isShowSchResultBox: false,    // 是否显示查询结果列表
                isOkSearch: true,             // 是否允许用户触发搜索
                b2cCarList: [],
                serverList: serverList,
                noticeBarList: noticeBarList,
            }
        },
        created () {
            // this.$store.dispatch('getAllProvince');
            //获取b2b二手车大厅列表
            this._getB2cCarList();
            
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
            //清空用户搜索结果集合
            this.srhValItems = [];
        },
        methods:{
            //获取B2B大厅车辆列表
            _getB2cCarList(){
                var data = {
                    "PageSize": 8,
                    "PageIndex": 1,
                }
                api.getB2BCarList(data).then((res) => {
                    this.b2cCarList = this._normalizeB2cCarInfo(res.data)
                })
            },
            //使用b2c抽象类完成carInfo
            _normalizeB2cCarInfo(list){
                let carInfo = [];
                list.forEach((item, index) => {
                    carInfo.push(new b2cCarInfo(item))
                });
                return carInfo;
            },
            //通过用户输入获取对应信息
            allSearchInput(){
                
                if(this.allSearchInputVal=="") return;

                this.srhValItems.push(this.allSearchInputVal);
                //如果没有过延缓搜索规定的时间，那么久延迟搜索
                if(!this.isOkSearch){
                    console.log("不能触发搜索了");
                    return;
                }
                //获取用户最后一次输入的值
                let lastSrhVal = this.srhValItems[this.srhValItems.length-1];
                let data = {
                    "PageSize": 20,
                    "PageIndex": 1,
                    "LikeKey": lastSrhVal,
                }
                api.getB2BCarList(data).then((res) => {
                    this.srhResultList = this._normalizeSearchCarResult(res.data)
                })
                setTimeout(() => {
                    this.isOkSearch = true;
                    if(this.allSearchInputVal=="") return;
                    api.getB2BCarList(data).then((res) => {
                        this.srhResultList = this._normalizeSearchCarResult(res.data)
                    })
                },SEARCH_DELAY)
                if(this.isOkSearch) this.isOkSearch = false;

            },
            //使用b2c抽象类完成carResult
            _normalizeSearchCarResult(list){
                let carResultList = [];
                list.forEach((item) => {
                    carResultList.push(new searchCarResult(item))
                });
                return carResultList;
            },

        },
        watch:{
            //侦听用户搜索的值，当其为空时，清空搜索结果集
            allSearchInputVal(val){
                if(val==""){
                    this.srhValItems = [];
                    this.srhResultList = [];
                }
            },
            //搜索结果列表
            srhResultList(val){
                this.isShowSchResultBox = val.length<=0 ? false : true;
            }
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

