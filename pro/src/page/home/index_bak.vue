<!-- 网站首页 -->
<template>
    <div class="home">
        <div class="g-doc">
            <div class="g-bd">
                <div class="g-csl" v-if="true">
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

                                <!-- 输入 -->
                                <input type="text" ref="allSearchInputBox"
                                    class="u-ipt"
                                    placeholder="请输入感兴趣的品牌、车系"
                                    @blur="searchEvent(0)"
                                    @focus="searchEvent(1)"
                                    @input="allSearchInput"
                                    v-model="allSearchInputVal" autocomplete="off"
                                />
                                <router-link :to="{path:'/b2bHall'}" class="u-btn">我要买车</router-link>
                                <router-link :to="{path:'/sellHome'}" class="u-btn v2">我要卖车</router-link>
                            </section>

                        </div><!-- 搜索框 -->

                        <div class="m-category-wrap">
                            <brand-select
                                :rsIndex="resSearchIndex"
                                ></brand-select>
                        </div><!-- 汽车品牌，价格条件搜索 -->
                    </div>

                    <div class="f__w1200">
                        <div class="m-svr-box">
                            <server-box></server-box>
                        </div><!-- 平台特色服务 -->
                    </div><!-- 1200布局 -->

                    <div class="m-b2b-entrance">
                        <div class="m-etc-bg f__w1200">
                            <div class="m-info">
                                <h2 class="u-tit">二手车<em class="vital">B2B</em>市场</h2>
                                <p class="u-txt">车商首选 全国二手车批发大厅</p>
                                <router-link :to="{path:'/b2bHall'}" class="u-btn">立即进入</router-link>
                            </div>
                            <div class="u-img-bg"></div><!-- 车背景装饰 -->
                        </div>
                    </div><!-- B2B专区大厅入口 -->

                    <div class="f__w1200">
                        <div class="m-carlist-container">
                            <div class="m-lst-wrap v1">
                                <div class="m-lst-hd f__clearfix">
                                    <h3 class="f__fl">
                                        <span class="u-tit">热门好车</span>
                                        <span class="u-sep">/</span>
                                        <span class="u-des">最全的二手车资源，农行合作，交易安全无忧</span>
                                    </h3>
                                </div><!-- 列表头 -->
                                <div class="m-lst-con f__clearfix">
                                    <b2b-car-list-box
                                        :carList="b2bCarList"
                                        :loginStatus="loginStatus"
                                        :memberData="memberData"
                                        >
                                    </b2b-car-list-box>
                                </div><!-- 列表内容 -->
                            </div><!-- 热门好车 -->
                        </div><!-- 主要的信息列表盒子 -->

                    </div><!-- 1200布局 -->


                    <div class="m-trade-star">
                        <section class="inner-box f__w1200 f__clearfix">
                            <div class="star-dealer-bg"></div><!-- 背景 -->
                            <div class="dealer-box">
                                <ul class="dealer-lst f__clearfix" v-if="starDealerList.length>0">
                                    <template v-for="(item,index) in starDealerList">
                                        <li class="u-item v1"
                                            ref="starDealerBoxDom"
                                            :class="{'last-line':index>=6,
                                                    'corner-tl':index==0,
                                                    'corner-tr':index==2,
                                                    'corner-bl':index==6,
                                                    'corner-br':index==8,
                                                    'top-block':index==1,
                                                    'right-block':index==5,
                                                    'bottom-block':index==7,
                                                    'left-block':index==3,
                                                    'center-block':index==4,
                                                    }"
                                            @mousemove="starDealerBoxHoverEvent($event,index)"
                                            @mouseleave="starDealerBoxLeaveEvent($event,index)"
                                        >
                                            <router-link class="u-box" tag="a"
                                                :to="{path:'/merchantDetails',query:{'cid':item.mid}}"
                                                :title="'进入'+item.cdgName">
                                                <div class="u-pic" name="avatarWrap">
                                                    <img :src="item.faceUrl" :alt="item.nikeName"/>
                                                </div>
                                                <div class="info-con">
                                                    <h4 class="cdg-name">{{item.cdgName}}</h4>
                                                    <p class="owner-info">{{item.city}}-{{item.nikeName}}</p>
                                                    <p class="has-credit" v-if="item.hasCredit==1">已缴纳保证金</p>

                                                    <div class="onsale">
                                                        <em class="vital">{{item.carCount}}</em>
                                                        <span>在售</span>
                                                    </div>
                                                </div><!-- 信息 -->
                                            </router-link>
                                        </li>
                                    </template>
                                </ul>
                                <ul class="dealer-lst f__clearfix" v-else>
                                    <template v-for="(item,index) in 9">
                                        <li class="u-item v1"
                                            :class="{'last-line':index>=6,
                                                    'corner-tl':index==0,
                                                    'corner-tr':index==2,
                                                    'corner-bl':index==6,
                                                    'corner-br':index==8,
                                                    'top-block':index==1,
                                                    'right-block':index==5,
                                                    'bottom-block':index==7,
                                                    'left-block':index==3,
                                                    'center-block':index==4,
                                                    }">
                                        </li>
                                    </template>
                                </ul>
                            </div><!-- 明星车商 -->
                        </section><!-- 1200px布局 -->
                    </div><!-- 交易明星/明星车商 -->


                    <div class="f__w1200">
                        <div class="m-carlist-container">

                            <div class="m-lst-wrap v2">
                                <div class="m-lst-hd f__clearfix">
                                    <h3 class="f__fl">
                                        <span class="u-tit">猜你喜欢</span>
                                    </h3>
                                </div><!-- 列表头 -->
                                <div class="m-lst-con f__clearfix">
                                    <remd-list-box
                                        :carList="youLikeList"
                                        >
                                    </remd-list-box>
                                </div><!-- 列表内容 -->

                                <div class="m-btn-wrap">
                                    <a class="u-btn" @click="changeBatch()">换一批</a>
                                </div><!-- 换一批按钮 -->
                            </div><!-- 猜你喜欢 -->

                        </div><!-- 主要的信息列表盒子 -->
                    </div><!-- 1200布局 -->


                </div><!-- 网页内容 -->

            </div><!-- 网页主体 -->

            <!-- 引入底部站点服务图示 -->
            <c-foot-server></c-foot-server>

        </div><!-- 文档 -->
    </div>
</template>

<script>

    import $ from 'jquery'
    // 获取数据的api
    import api from "api/getData.js"
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // 轮播组件
    import { swiper, swiperSlide } from 'vue-awesome-swiper'  
    // vuex状态管理
    import { mapGetters,mapActions } from 'vuex'

    import cFootServer from "components/foot/foot-svr.vue"
    import {dataToJson} from "assets/js/util.js"
    import * as geekDom from "assets/js/dom.js"
    // 首页静态数据
    import {noticeBarList,swiperItems} from "api/localJson/home.js"
    // 搜索静态数据
    import {homeSearchData} from "api/localJson/search.js"

    // 用户信息的构造类
    import {memberInfo} from 'base/class/member.js'
    // 单个车店排名信息的构造类
    import {dealerInfo} from 'base/class/dealerCircle.js'
    // b2b/b2c车辆信息构造类
    import {b2bCarInfo,b2cCarInfo} from "base/class/carInfo.js"
    // 车辆搜索结果的构造类
    import {searchCarResult} from "base/class/searchResult.js"

    // 搜索结果选择组件
    import srhSelect from "components/common/srhSelect.vue"
    // 车辆品牌选择组件
    import brandSelect from "components/brandSel/brandSelect.vue"
    // 公告条
    import noticeBar from "components/common/noticeBar.vue"
    // 平台特色服务
    import serverBox from "components/common/serverBox.vue"

    // 相似推荐信息列表盒子
    import remdListBox from "components/boxLayout/remdListBox.vue"
    // b2b车辆信息列表盒子
    import b2bCarListBox from "components/boxLayout/b2bCarListBox.vue"

    //搜索延迟,150ms
    const SEARCH_DELAY = 150;

    const searchData =  homeSearchData; 

    export default {
        name: 'home',
        // 注册组件
        components: {
            swiper,
            swiperSlide,
            cFootServer,

            brandSelect,
            srhSelect,
            noticeBar,
            serverBox,
            // 猜你喜欢/相似推荐的信息盒子
            remdListBox,
            // b2b车辆信息列表盒子
            b2bCarListBox,
        },
        data () {
            return {
                // 用户信息
                memberData: null,
                // 明星车商列表
                starDealerList: [],

                // 全部搜索的绑定值
                allSearchInputVal: "",
                srhResultList: searchData,       // 搜索结果列表
                isShowSchResultBox: false,       // 是否显示查询结果列表
                resSearchIndex: 2,              // 搜索索引

                // 普通市场车辆列表
                b2cCarList: [],
                // b2b交易大厅列表数据
                b2bCarList: [],

                noticeBarList: noticeBarList,    //公告滚动条的信息列表
                swiperItems: swiperItems,        //首页轮播图数据集合
                

                // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
                notNextTick: true,

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

                youLikeList: [],     // 猜你喜欢
            }
        },


        //keep-alive之后页面会缓存，不会执行created(),和mounted(),但是会执行activated()
        activated() {

            // 获取用户信息
            this.getMemberInfo();

            //获取b2b二手车大厅列表
            this._getB2bCarList();

            // 获取明星车商的列表数据
            this._getStarDealerListData();

            // 获取猜你喜欢的数据
            this.getYouLike();
            // 
            //更新swiper(强制初始化)
            this.$nextTick(() => {
                if(this.siteHomeSwiper){
                    this.siteHomeSwiper.init()
                }
            });
        },

        //退出的生命周期钩子
        deactivated(){
            // 信息重置
            this.reset();
        },
        computed:{
            ...mapGetters(['loginStatus']),
            siteHomeSwiper() {  
                return this.$refs.siteHomeSwiper.swiper;  
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
                    this.searchCancelBubble();
                }else{
                    //清空首页的 文档点击事件
                    document.onclick = null;
                    schResultBox.onclick = null;
                    allSearchInputBox.onclick = null;
                }
            },

            // 侦听登录状态
            loginStatus(val){

                if(this.$router.currentRoute.path!="/home") return;

                if(val){
                    // 获取用户信息
                    this.getMemberInfo();
                    this._getB2bCarList();
                }else{
                    this.memberData = null;
                }
            },

        },
        methods:{

            // 格式化用户信息
            _normalizeMember(data) {
                return new memberInfo(data);
            },

            // 获取用户信息
            getMemberInfo(){
                if(!this.loginStatus) return;

                let data = {}
                api.getMyMemberInfo(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.memberData = this._normalizeMember(res.data);
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '信息获取失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            },

            //使用b2b抽象类完成carInfo
            _normalizeB2bCarInfo(list){
                let carInfo = [];
                list.forEach((item, index) => {
                    carInfo.push(new b2bCarInfo(item))
                });
                return carInfo;
            },

            //获取B2B大厅车辆列表
            _getB2bCarList(){
                var data = {
                    "PageSize": 8,
                    "PageIndex": 1,
                }
                // 获取b2b大厅车辆数据
                api.getB2BCarList(data).then((res) => {
                    this.b2bCarList = this._normalizeB2bCarInfo(res.data)
                })
            },

            // 搜索事件
            searchEvent(type){
                if(!type){
                    this.isShowSchResultBox = false;
                    console.log("失去焦点")
                }else{
                    this.isShowSchResultBox = true;
                    console.log("获取焦点")
                }
            },

            // 通过用户输入获取对应信息
            allSearchInput(){
                
                // if(this.allSearchInputVal=="") return;

                // //如果没有过延缓搜索规定的时间，那么久延迟搜索
                // if(!this.isOkSearch) return;
                // //获取用户最后一次输入的值
                // let lastSrhVal = this.srhValItems[this.srhValItems.length-1];
                // let data = {
                //     "PageSize": 20,
                //     "PageIndex": 1,
                //     "LikeKey": lastSrhVal,
                // }
                // api.getB2BCarList(data).then((res) => {
                //     this.srhResultList = this._normalizeSearchCarResult(res.data)
                // })
                // // 延时定时器
                // setTimeout(() => {
                //     this.isOkSearch = true;
                //     if(this.allSearchInputVal=="") return;
                //     api.getB2BCarList(data).then((res) => {
                //         this.srhResultList = this._normalizeSearchCarResult(res.data)
                //     })
                // },SEARCH_DELAY);
                // if(this.isOkSearch) this.isOkSearch = false;

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
            searchCancelBubble(){
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
            },

            // 格式化车行列表
            _normalizeCdgList(list) {
                let arr = [];
                list.forEach((item,index) => {
                    arr.push(new dealerInfo(item));
                })
                return arr;
            },

            // 获取明星车商数据
            _getStarDealerListData(){
                let data = {
                    PageIndex: 1,
                    PageSize: 9,
                }
                // 发起车商信息api信息请求
                api.carDealerCircleRanking(data).then((res) => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.starDealerList = this._normalizeCdgList(res.data.CdgList);
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

            // 明星车商鼠标悬浮效果
            starDealerBoxHoverEvent(ev,index){

                var _event = ev || window.event;  //兼容多个浏览器的event参数模式
                var thestarDealerDom = this.$refs.starDealerBoxDom[index];
                var avatarDom = thestarDealerDom.querySelectorAll("[name='avatarWrap']")[0];

                var boxOffsetObj = {
                    x: ev.clientX - (Math.floor(thestarDealerDom.offsetWidth/2) + geekDom.getPosition(thestarDealerDom).left),
                    y: (Math.floor(thestarDealerDom.offsetHeight/2) + geekDom.getPosition(thestarDealerDom).top) - (geekDom.getScrollTop() + ev.clientY)
                }
                // 比例
                var ratios = 0.6;
                geekDom.css(thestarDealerDom,'rotateX', Math.floor(ratios*boxOffsetObj.y/5))
                geekDom.css(thestarDealerDom,'rotateY', Math.floor(ratios*boxOffsetObj.x/14))
                var avatarRatios = 0.4;
                geekDom.css(avatarDom,'translateX',  - Math.floor(avatarRatios*boxOffsetObj.x/14))
                geekDom.css(avatarDom,'translateY', Math.floor(avatarRatios*boxOffsetObj.y/5))

            },
            // 取消悬浮
            starDealerBoxLeaveEvent(ev,index){
                var thestarDealerDom = this.$refs.starDealerBoxDom[index];
                var avatarDom = thestarDealerDom.querySelectorAll("[name='avatarWrap']")[0];
                // 删除行内样式
                thestarDealerDom.removeAttribute('style');
                avatarDom.removeAttribute('style');
            },

            // 获取猜你喜欢的数据
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

            // 重置信息
            reset(){
                // 重置用户搜索结果信息
                this.allSearchInputVal = "";
                this.srhResultList = searchData;
                this.isShowSchResultBox = false;
            }
        },
    }
</script>



<!-- 修改外部插件（组件）的样式时，不要加scoped，最好文件分成两个 -->
<style lang="stylus" rel="stylesheet/stylus">
    @import 'indexSwiper.styl'
</style>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'
</style>

