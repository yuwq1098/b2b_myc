<!--  
 **  @description 买卖车首页小组件
 --> 

<template>
	<div class="buysell">
        <section class="box-inner f__clearfix">
            <div class="buycar f__fl">
                <div class="enter-title f__clearfix">
                    <a class="u-tit sellcar">
                        <em class="txt">我要卖车</em>
                        <i class="iconfont icon-enter"></i>
                    </a>
                    <div class="search-box js__search">
                        <input type="text" class="search-input" placeholder="请输入感兴趣的品牌、车系"/>
                        <button class="search-btn">
                            <i class="iconfont icon-search"></i><!-- 放大镜 -->
                        </button>
                    </div><!-- 搜索框 -->
                </div><!-- 进入买车的标题 -->

                <div class="filtrate">
                    <div class="brand f__clearfix">
                        <template v-for="(item,index) in hotBrand">
                            <a class="u-label"
                                @click.stop="goSearchBrand(item.id,item.name)"
                                >
                                <img class="logo" :src="item.imgUrl" :alt="item.name"/>
                                <span class="name">{{item.name}}</span>
                            </a>
                        </template>
                        <a href="javascript:;" class="u-label">
                            <i class="iconfont icon-icon-test"></i>
                            <span class="name">更多</span>
                        </a>
                    </div><!-- 品牌 -->
                    
                    <div class="price f__clearfix">
                        <template v-for="(item,index) in priceList">
                            <a class="u-label"
                                :class="{'light': item.isHot}"
                                @click.stop="goSearchPrice(item.min,item.max,item.title)"
                                >
                                <p class="name">{{item.title}}</p>
                            </a>
                        </template>
                    </div><!-- 价格 -->
                </div><!-- 条件筛选 -->
            </div><!-- 买车/筛选 -->

            <div class="m-4sStop f__fr">
                <div class="enter-title f__clearfix">
                    <a class="u-tit joinIn">
                        <em class="txt">4s店加盟</em>
                        <i class="iconfont icon-enter"></i>
                    </a>
                </div>
            </div><!-- 卖车/加盟4s店 -->
        </section>
	</div><!-- 汽车信息盒子 -->
</template>

<script>
    
    // 获取数据的api
    import api from "api/getData.js"
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // vuex状态管理
    import { mapGetters, mapActions } from 'vuex'
    // 本地数据搜索价格
    import { homePriceList } from "api/localJson/home.js"
    // b2b条件过滤相关构造类
    import {filterShowData,filterDataClass,searchFilterClass} from "base/class/b2bFilter.js"

	export default {
        name: "buysell",
        // 注册组件
        components:{
            
        },
        // 数据
        data() {
            return {
                // 可搜索价格列表
                priceList: homePriceList, 
            }
        },
        props:{
            // 热门品牌
            hotBrand:{
                type: Array,
                default () {
                    return []
                },
            },
        },
        // 属性计算
        computed:{
            
        },
        //数据侦听
        watch:{
           
        },
        created(){

        },
        mounted(){
            
        },
        // 自定义函数(方法)
        methods: {
            //vuex的actions
            ...mapActions(["setUserFilterData",'setSearchFilterList']),

            // 按车辆品牌查询
            goSearchBrand(id,label){
                // 清空本地存储中的搜索记录
                this.clearFilterData();
                setTimeout(() => {

                    // 设置展示给界面  用户所选条件集合中 汽车品牌的lable
                    this.userFilterData.brand = label; 
                    // 设置展示给界面  用户所选条件集合中 汽车车系的lable 为空
                    this.userFilterData.series = ""; 
                    // 设置真实向api请求的字段 汽车品牌的id
                    this.searchFilterList.CarBrandId = id; 

                    this.setUserFilterData(this.userFilterData);
                    this.setSearchFilterList(this.searchFilterList);
                })
                setTimeout(() => {
                    this.$router.push({path:'/b2bHall'});
                },20)
            },

            // 按车辆价格查询
            goSearchPrice(min,max,title){
                // 清空本地存储中的搜索记录
                this.clearFilterData();
                setTimeout(() => {
                    // 设置展示给界面  用户所选条件集合中 价格的lable
                    this.userFilterData.price = title; 
                    // 设置真实向api请求的字段 价格区间
                    this.searchFilterList.B2BPriceFrom = min||'';
                    this.searchFilterList.B2BPriceTo = max||''; 
                    // 设置相关数据
                    this.setUserFilterData(this.userFilterData);
                    this.setSearchFilterList(this.searchFilterList);
                })
                setTimeout(() => {
                    this.$router.push({path:'/b2bHall'});
                },20)
            },

            // 清空本地存储中的搜索记录
            clearFilterData(){
                //清空用户展示记录
                let data  = {}
                this.userFilterData = new filterDataClass(data);
                this.searchFilterList = new searchFilterClass(data);
                //将用户选中的数据都存在本地中
                this.setUserFilterData(this.userFilterData);
                //将用户选中的 向后台发起api请求数据 存在本地中
                this.setSearchFilterList(this.searchFilterList);
            },
            
        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .buysell
        .box-inner
            width 1200px - 96px
            height 260px - 40px
            _display()
            padding 24px 48px
            position relative
            .buycar
                width 680px
            .m-4sStop
                width 385px
            .buycar,.m-4sStop
                height @height
                .enter-title
                    height 45px
                    line-height @height
                    margin-bottom 20px
                    color #444
                    .u-tit
                        height 44px
                        line-height @height
                        float left
                        &:hover
                            color #45A9E2
                        .txt
                            font-size 18px
                            padding 0 0 0 4px
                        .iconfont
                            font-size 18px
                            _display(inline-block)
                            _translate3d(-4px,0,0)
                    .search-box
                        float right
                        width 320px - 2px
                        height 45px - 2px
                        background #f3f3f7
                        _borderAll(#f3f3f7)
                        _borderRadius(22px)
                        position relative
                        .search-input
                            width 276px
                            height 43px
                            background transparent
                            _verticalTextAlign(top)
                            border none
                            padding-left 20px
                            _placeholder(#aaa,14px,43px)
                        .search-btn
                            width 25px
                            height 25px
                            border none
                            _completeCenter(auto,14px,9px,auto)
                            background transparent
                            .iconfont
                                font-size 25px
                                color #888
                                cursor pointer
                                &:hover
                                    color #45A9E2    
                        &:hover
                            _borderAll(#ddd)
            .filtrate
                color #444
                .brand
                    .u-label
                        width 92px
                        height 32px
                        line-height @height
                        _display()
                        padding-top 8px
                        margin-right 4px
                        margin-bottom 12px
                        float left
                        text-align center
                        .logo
                            _display(inline-block)
                            width 24px
                            height 24px
                            _verticalTextAlign(middle)
                            margin-right 3px
                        .iconfont
                            _display(inline-block)
                            font-size 22px
                            _verticalTextAlign(middle)
                            _translate3d(0,1px,0)
                            margin-right 2px
                            color #333
                        .name
                            font-size 13px
                            _verticalTextAlign(middle)
                .price
                    .u-label
                        padding-top 8px
                        width 92px
                        height 32px
                        line-height @height
                        _display()
                        margin-right 4px
                        font-size 13px
                        float left
                        text-align center
                .u-label:hover
                    color #45A9E2
                    
</style>
