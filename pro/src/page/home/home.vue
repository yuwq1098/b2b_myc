<!-- 网站首页 -->
<template>
    <div class="home">
        <div class="g-doc">
            <div class="g-bd">
                <div class="g-ad">
                    <div class="m-sld">
                        <swiper :options="swiperOption" id="index-carousel" ref="mySwiper">  
                            <!-- 这部分放你要渲染的那些内容 -->  
                            <template v-for="item in swiperItems">
                                <swiper-slide >
                                    <a :href="item.href?item.href:'javascript:;'">
                                        <img :src="item.imgUrl" :alt="item.title"/>
                                    </a>
                                </swiper-slide>  
                            </template>
                            <!-- 这是轮播的小圆点 -->  
                            <div class="swiper-pagination" slot="pagination"></div>  
                        </swiper>
                    </div><!-- 轮播摸块 -->
                </div><!-- 广告区 -->

                <div class="g-bd-ct">
                    <div class="f__w1200">
                        <div class="m-all-search">
                            <section class="search-box f__clearfix">
                                <div class="m-srh-result-box" v-show="isShowSchResultBox" ref="schResultBox">
                                    <srh-select
                                        :selectList="srhResultList"
                                        >
                                    </srh-select>
                                </div><!-- 查询结果列表 -->
                                
                                <input type="text" ref="allSearchInputBox" @input="allSearchInput" class="u-ipt" placeholder="请输入感兴趣的品牌、车系" id="brandSearch" v-model="allSearchInputVal" autocomplete="off"/>
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
    import { swiper, swiperSlide } from 'vue-awesome-swiper'  

    import {mapActions} from 'vuex'
    import cFootServer from "components/foot/foot-svr.vue"
    import {dataToJson} from "assets/js/util.js"
    import * as geekDom from "assets/js/dom.js"
    import api from "api/getData.js"
    import {serverList,noticeBarList,swiperItems} from "api/localJson/home.js"
    import {b2cCarInfo} from "base/class/carInfo.js"
    import {searchCarResult} from "base/class/searchResult.js"

    import srhSelect from "components/common/srhSelect.vue"
    import carListBox from "components/boxLayout/carListBox.vue"
    import brandSelect from "components/brandSel/brandSelect.vue"
    import noticeBar from "components/common/noticeBar.vue"
    
    //搜索延迟,300ms
    const SEARCH_DELAY = 500

    export default {
        name: 'home',
        // 注册组件
        components: {
            swiper,  
            swiperSlide,
            cFootServer,
            carListBox,
            brandSelect,
            srhSelect,
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

                serverList: serverList,          //网站b2c收费服务
                noticeBarList: noticeBarList,    //公告滚动条的信息列表
                swiperItems: swiperItems,        //首页轮播图数据集合

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
                    spaceBetween: 30,  
                    onSlideChangeEnd: swiper => {  
                        //这个位置放swiper的回调方法  
                        this.page = swiper.realIndex+1;  
                        this.index = swiper.realIndex;  
                    }   
                },
            }
        },
        created () {
            // this.$store.dispatch('getAllProvince');
            //获取b2b二手车大厅列表
            this._getB2cCarList();

        },
        mounted(){
            
        },
        //keep-alive之后页面会缓存，不会执行created(),和mounted(),但是会执行activated()
        activated() {
            //更新swiper(强制初始化)
            if(this.mySwiper){
                this.mySwiper.init()
            }
        },
        computed:{
            mySwiper() {  
                return this.$refs.mySwiper.swiper;  
            }  
        },
        //退出的生命周期钩子
        deactivated(){
            //清空用户搜索结果集合
            this.srhValItems = [];
            this.isShowSchResultBox = false;
            this.allSearchInputVal = "";
        },
        methods:{
            //获取B2C大厅车辆列表
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

            //处理事件冒泡
            _searchCancelBubble(){
                let me = this;
                let [schResultBox,allSearchInputBox] = [
                    this.$refs.schResultBox,
                    this.$refs.allSearchInputBox
                ]
                // 事件冒泡
                geekDom.cancelBubbleTwo(
                    schResultBox,
                    allSearchInputBox,
                    function(){
                        me.allSearchInputVal = "";
                    }
                );
            }

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
            },
            // 侦听结果框显示的状态
            isShowSchResultBox(val){
                let [schResultBox,allSearchInputBox] = [
                    this.$refs.schResultBox,
                    this.$refs.allSearchInputBox
                ]
                if(val){
                    this._searchCancelBubble();
                }else{
                    //清空首页的 文档点击事件
                    document.onclick = null;
                    schResultBox.onclick = null;
                    allSearchInputBox.onclick = null;
                }
            }
        }
    }
</script>



<!-- 修改外部插件（组件）的样式时，不要加scoped，最好文件分成两个 -->
<style lang="stylus" rel="stylesheet/stylus">
    @import './indexSwiper.styl'
</style>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import './home.styl'
</style>

