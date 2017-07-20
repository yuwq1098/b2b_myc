<template>
    <div class="merchantDetails">
        <div class="g-doc">
            <div class="g-bd">
                <section class="f__w1200">
                    <gk-bread-crumb
                        :crumbItems="crumbItems"
                        ></gk-bread-crumb><!-- 面包屑组件 -->
                    <div class="m-merchant-box">
                        <div class="m-merchant-hd">

                            <div class="m-cdgName f__clearfix">
                                <span class="u-name">{{merchantData.name}}</span>
                                <span class="u-type">{{merchantData.authType}}</span>
                            </div><!-- 车行名称 -->

                            <div class="m-collect f__clearfix">
                                <div class="grade">
                                    <el-rate
                                        v-model="gradeNum"
                                        disabled
                                        show-text
                                        text-color="#F1AD0D"
                                        text-template="5.0"
                                        >
                                    </el-rate>
                                </div>
                                <div class="attention not"
                                    @mouseover="attentionFn(0,1)"
                                    @mouseleave="attentionFn(0,2)"
                                    v-if="!merchantData.isFavorite"
                                    >
                                    <span class="txt">{{attentionNot.text}}</span><i class="iconfont"
                                        @click="setAttention(1,merchantData.id)"
                                        :class="[attentionNot.isHover?'icon-like_fill':'icon-like']"></i>
                                </div>
                                <div class="attention yes"
                                    @mouseover="attentionFn(1,1)"
                                    @mouseleave="attentionFn(1,2)"
                                    v-if="merchantData.isFavorite"
                                    >
                                    <span class="txt">{{attentionYes.text}}</span><i class="iconfont"
                                        @click="setAttention(2,merchantData.id)"
                                        :class="[attentionYes.isHover?'icon-like':'icon-like_fill']"></i>
                                </div>
                                <transition name="tips">
                                    <div class="attention-tips" v-if="tipsShow.isShow">{{tipsShow.tipsText}}</div>
                                </transition>
                                
                            </div><!-- 评分与收藏 -->

                            <div class="m-contact">
                                <span class="name">{{merchantData.username}}</span>
                                <span class="tel">{{merchantData.tel}}</span>
                            </div><!-- 联系人信息 -->

                            <div class="m-result f__clearfix">
                                <p class="u-info">
                                    <span class="attr">在售：</span>
                                    <span class="data">{{merchantData.onSale}}<em class="unit">（辆）</em></span>

                                </p>
                                <p class="u-info">
                                    <span class="attr">已成交：</span>
                                    <span class="data">{{merchantData.fixtureNumber}}<em class="unit">（单）</em></span>
                                </p>
                            </div><!-- 在售及已成交 -->

                            <div class="m-address">
                                <p class="u-address">
                                    <span class="attr">车行地址：</span>
                                    <span class="data">{{merchantData.address | addressFormat}}</span>
                                </p>
                            </div><!-- 地址 -->
                        </div><!-- 头部车商信息 -->
                        <div class="m-merchant-con">
                            <div class="m-hd">
                                <p class="u-tit">在售车辆</p>
                            </div><!-- 标题 -->
                            <div class="m-lst-wrap">
                                <div class="merchantCar-swiper" v-if="merchantCarList.length>0">
                                    <swiper :options="swiperOption"  ref="mySwiper">  
                                       <!-- 这部分放你要渲染的那些内容 -->  
                                       <template v-for="(group,index) in slideCarList">
                                            <swiper-slide>  
                                                <ul class="m-car-lst f__clearfix">
                                                    <template v-for="(item,index) in group">
                                                        <li class="u-item">
                                                            <merchant-car-Box
                                                                :carInfo="item"
                                                                >
                                                            </merchant-car-Box>
                                                        </li>
                                                    </template>
                                                </ul>
                                            </swiper-slide>
                                        </template>
                                       
                                        <!-- 这是轮播的小圆点 -->  
                                        <div class="swiper-pagination"
                                            v-show="merchantCarList.length>8"
                                            slot="pagination">
                                        </div>

                                    </swiper>  
                                </div><!-- 卖车大厅的轮播图 -->
                                <div class="not-content-wrap" 
                                    v-if="merchantCarList.length==0">
                                    <not-content
                                        speak="该车行比较懒，已经没有在售车辆了，我们去别处瞅瞅!"
                                        >
                                        <router-link :to="{path:'/'}" class="u-lk" tag="a">网站首页&gt;</router-link>
                                        <router-link :to="{path:'/b2bHall'}" class="u-lk" tag="a">B2B大厅&gt;</router-link>
                                    </not-content><!-- 缺省组件 -->
                                </div><!-- 缺省组件容器 -->
                                
                            </div><!-- 列表容器 -->
                        </div><!-- 所属车辆列表信息 -->
                    </div><!-- 盒子 -->
                    
                </section>
            </div>
        </div>
    </div>
</template>

<script>

    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // 工具类
    import {dataToJson} from "assets/js/util.js"
    // 网站外层面包屑列表本地化资源
    import {crumbsInfo} from "api/localJson/homeCrumb.js"

    // 车行信息的构造类
    import {merchantInfo} from 'base/class/merchantInfo.js'
    // 车行车辆信息的构造类
    import {merchantCarInfo} from "base/class/carInfo.js"
    // dom操作类
    import * as geekDom from 'assets/js/dom.js'
    // 面包屑组件
    import gkBreadCrumb from "components/common/gkBreadcrumb.vue"
    // 车行车辆信息盒子组件
    import merchantCarBox from "components/common/merchantCarBox.vue"
    // 会员中心缺省组件
    import notContent from 'components/member/notCon.vue' 

    // swiper轮播组件
    import { swiper, swiperSlide } from 'vue-awesome-swiper'


    export default {
        name: "merchantDetails",
        // 自定义表单验证
        validator: null,
        // 在当前模块注册组件
        components:{
            gkBreadCrumb,
            merchantCarBox,
            notContent,
            swiperSlide,
            swiper,
        },
        // 数据
        data() {
            return{

                // 车行（或卖家）ID
                merchantId: "",
                // 车行数据
                merchantData: new merchantInfo({}),
                // 分数
                gradeNum: 5,
                // 车行车辆的信息列表
                merchantCarList: [],
                // 焦点图列表
                slideCarList: [],
                 
                // 未关注的信息
                attentionNot:{
                    text: "关注",
                    isHover: false,
                },
                // 已关注的信息
                attentionYes:{
                    text: "已关注",
                    isHover: false,
                },
                // 关注提示
                tipsShow: {
                    tipsText: "",
                    isShow: false,
                }, 
                // 我的延时器
                mySetTimeOut: null,
                
                // 焦点图设置
                swiperOption: {  
                    //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true  
                    notNextTick: true,  
                    pagination: '.swiper-pagination',  
                    slidesPerView: 'auto',  
                    centeredSlides: true,  
                    paginationClickable: true,  
                    spaceBetween: 30,  
                    onSlideChangeEnd: swiper => {  
                        //这个位置放swiper的回调方法  
                        this.page = swiper.realIndex+1;  
                        this.index = swiper.realIndex;  
                    }  
                }  
            }
        },
        //生命周期,开始的时候
        created(){

        },
        mounted(){

        },
        activated(){
            // 获取卖家ID
            this.merchantId = this.$router.currentRoute.query.cid||0;
            // 获取卖家信息
            this.getMerchantInfo(this.merchantId);

        },
        //退出的生命周期钩子
        deactivated(){

        },
        // 数据侦听
        watch:{

        },
        // 属性计算
        computed:{
            slidePage(){
                let page = Math.ceil(this.merchantCarList.length/8);
                return page; 
            },
            // 面包屑列表信息
            crumbItems(){
                if(this.merchantData){
                    return crumbsInfo['merchantInfoDetails'](this.merchantData.name)
                }
            },

        },
        // 自定义函数(方法)
        methods: {
            // 格式化车行信息
            _normalizeMerchant(data) {
                return new merchantInfo(data);
            },
            // 格式化车行车辆信息列表
            _normalizeCarList(list) {
                let arr = [];
                list.forEach((item,index) => {
                    arr.push(new merchantCarInfo(item));
                })
                // 数组翻倍的方法
                // arr = geekDom.doubleArray(arr,5);
                return arr;
            },
            // 格式化焦点图车辆列表
            _normalizeSlideCarList(list) {
                let map = [];
                list.forEach((item,index)=>{
                    let key = Math.floor((index)/8);
                    if (!map[key]) {
                        map[key] = [item];
                    }else{
                        map[key].push(item);
                    }
                })
                return map;
            },

            // 获取卖家信息
            getMerchantInfo(id){
                let data = {
                    SellerId: id,
                }
                api.CDGStoreDetails(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.merchantData = this._normalizeMerchant(res.data);
                        this.merchantCarList = this._normalizeCarList(this.merchantData.carList);
                        // 延迟获取焦点图列表
                        setTimeout(()=>{
                            this.slideCarList = this._normalizeSlideCarList(this.merchantCarList);
                        })
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
            // 鼠标悬浮在关注图标上触发的效果事件
            attentionFn(isFavorite,mouseFn){
                if(isFavorite==0){
                    if(mouseFn==1){
                        this.attentionNot = {
                            text: "立即关注",
                            isHover: true,
                        }
                    }else{
                        this.attentionNot = {
                            text: "关注",
                            isHover: false,
                        }
                    }
                }else{
                    if(mouseFn==1){
                        this.attentionYes = {
                            text: "取消关注",
                            isHover: true,
                        }
                    }else{
                        this.attentionYes = {
                            text: "已关注",
                            isHover: false,
                        }
                    }
                }
            },
            // 关注和取消关注的事件
            setAttention(type,id){
                let act = "";
                let tips = "";
                if(type==1){
                    act="Add";
                    tips = "关注成功";
                }else{
                    act="Delete"
                    tips = "成功取消关注";
                }
                
                let data = {
                    ActType: act,
                    SellerId: id
                }
                
                // 关注和取消关注
                api.myFavoriteCdg(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        // 清除我的延时器
                        clearTimeout(this.mySetTimeOut);
                        this.tipsShow.tipsText = tips;
                        this.tipsShow.isShow = true;
                        // 假刷新
                        if(type==1){
                            this.merchantData.isFavorite = true;
                        }else{
                            this.merchantData.isFavorite = false;
                        }
                        this.mySetTimeOut = setTimeout(()=>{
                            this.tipsShow.isShow = false;   
                        },300)

                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '操作失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            }
        },
        
    }
</script>


<style lang="stylus" rel="stylesheet/stylus">
    @import '~assets/css/mixin.styl'
    .m-merchant-hd
        .m-collect
            .grade
                margin-top 4px
                .el-rate
                    height 20px
                    line-height 20px
                .el-rate__icon
                    font-size 15px
                    _spacingPlus(-1px)
                .el-rate__text
                    font-size 15px
</style>

<!-- 修改外部插件（组件）的样式时，不要加scoped，最好文件分成两个 -->
<style lang="stylus" rel="stylesheet/stylus">
    @import 'swiper.styl'
</style>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'

</style>
