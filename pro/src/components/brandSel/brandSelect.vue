<template>
	<div class="brandSelect">

	    <div class="m-category f__clearfix">
            <div class="m-brand-wrap f__fl">
                <div class="u-hd">
                    <a href="javascript:;" @mouseover="isShowAllBrand=true" class="u-lk" :class="{'on':isShowAllBrand}">品牌<i class="iconfont icon-caretdown"></i></a>
                    <div class="m-all-brand-box" @mouseleave="isShowAllBrand=false" id="js__all_brand" v-show="isShowAllBrand">
                        <div class="m-brand-group" v-for="n in gpLength" :class="{'last-group':n==gpLength}">
                            <div class="u-gp-hd">
                                <ul class="u-gup-hd-lst f__clearfix">
                                    <li class="u-hd-item" v-for="(item,index) in brandList" v-if="index>=(7*(n-1))&&index<=(7*n)-1" :class="{'on':index==(7*(n-1))}">{{item.title}}</li>
                                </ul>
                            </div>
                            <div class="u-gp-con" :class="{'last-item':n==gpLength}">
                                <ul class="u-gp-lst f__clearfix" v-for="(group,index) in brandList" v-if="index>=(7*(n-1))&&index<=(7*n)-1" :class="{'active':index==(7*(n-1))}">
                                    <li class="u-gp-item" v-for="item in group.items">
                                        <a class="u-lk"
                                            target="_blank" 
                                            @click.stop="goSearchBrand(item.id,item.name)">{{item.name}}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div><!-- 所有品牌展示的盒子 -->
                </div>
                <div class="u-con f__clearfix" v-if="hotBrand.length>0">
                    <template v-for="item in hotBrand">
                        <a class="u-lk"
                            target="_blank" 
                            @click.stop="goSearchBrand(item.id,item.name)">
                            <img :src="item.imgUrl" :alt="item.name" />
                            <p class="u-tit">{{item.name}}</p>
                        </a>
                    </template>
                </div><!-- 热门品牌显示 -->
                
            </div>
            <div class="m-price-wrap f__fl">
                <div class="u-hd">
                    <a href="javascript:;">价格</a>
                </div>
                <div class="u-con f__clearfix">
                    <template v-for="(item,index) in priceList">
                        <a class="u-lk"
                            target="_blank" 
                            :class="{'light':item.isHot}"
                            @click.stop="goSearchPrice(item.min,item.max,item.title)">
                            <p class="u-tit">{{item.title}}</p>
                        </a>
                    </template>
                </div>
            </div>
        </div><!-- 种类（快速选择） -->

	</div><!-- 首页条件查询区 -->
</template>

<script>
    
    import $ from "jquery"
    // 获取数据的api
    import api from "api/getData.js"
    // 工具函数
    import {dataToJson} from "assets/js/util.js"
    // vuex状态管理
    import { mapGetters,mapActions } from 'vuex'
    // 车辆品牌信息构造类
    import {brandInfo} from "base/class/brand.js"
    // 数据hash匹配
    import * as hashData from "api/localJson/hashData.js"
    // b2b条件过滤相关构造类
    import {filterShowData,filterDataClass,searchFilterClass} from "base/class/b2bFilter.js"
    //本地的过滤筛选数据
    import * as filterData from "api/localJson/filter.js"

    // 本地数据搜索价格
    import {searchPriceList} from "api/localJson/home.js"

    // 热门品牌
    const HOT_BRAND_LEN = 16
    const HOT_BRAND_NAME = '热门'

	export default {
        name: "brandSelect",
        data() {
            return{
                carBrandMap: {},
                hotBrand: [],
                brandList: [],
                isShowAllBrand: false,
                priceList: searchPriceList,
            }
        },
        mounted(){
            //获取汽车品牌列表
            this._getB2BCarBrandList();

            //获取热门品牌列表
            this._getHotBrandList();

        },
        computed:{
            // 仅读取，值只须为函数
            gpLength: function () {
                return (Math.ceil(this.brandList.length/7))
            },
        },
        // 自定义函数(方法)
        methods: {

            //vuex的actions
            ...mapActions(["setUserFilterData",'setSearchFilterList']),

            //获取B2B车辆品牌列表
            _getB2BCarBrandList(){
                api.getCarBrand().then((res) => {
                    //品牌map集合
                    this.brandList = this._normalizeBrandInfo(res.data);
                    
                    //显示更多的品牌信息的事件
                    this._allBrandevent();
                })
            },

            //使用b2c抽象类完成brandInfo
            _normalizeBrandInfo(list){
                let map = { }
                list.forEach((item, index) => {
                    const key = item.key_word
                    if (!map[key]) {
                        map[key] = {
                            title: key,
                            items: []
                        }
                    }
                    map[key].items.push(new brandInfo(item));
                })
                // 为了得到有序列表，我们需要处理 map
                let nature = []
                //循环map分别得到两个数组
                for (let key in map) {
                    let val = map[key]
                    if (val.title.match(/[a-zA-Z]/)) {
                        nature.push(val)
                    }
                }

                //根据字母A-Za-z规则顺序排序
                nature.sort((a,b) => {
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0);
                })
                //将nature数据连接在around数据背后一起返回出去
                return nature;
            },

            //获取热门品牌列表
            _getHotBrandList(){
                let data = {
                    Qty:16
                }
                api.getHotBrand(data).then((res) => {
                    this.hotBrand = this._normalizeHotBrand(res.data);
                })
            },

            //使用构造类格式化热门品牌
            _normalizeHotBrand(list){
                let hot = [];
                list.forEach((item, index) => {
                    if(index<HOT_BRAND_LEN){
                        hot.push(new brandInfo(item));
                    }
                })
                return hot;
            },

            //显示更多的品牌信息的事件
            _allBrandevent(){
                setTimeout(() => {
                    let js__all_brand = $("#js__all_brand");
                    let brandGroup = js__all_brand.find(".m-brand-group");
                    let groupHeadList = brandGroup.find(".u-gup-hd-lst");
                    let groupContent = brandGroup.find(".u-gp-con");
                    
                    groupHeadList.find(".u-hd-item").on("mouseover",function(){
                        let me = $(this);
                        let index = me.index();
                        let parentDom = me.parent(".u-gup-hd-lst");
                        let parentHead = me.parents(".u-gp-hd")
                        let groupCon = parentHead.siblings(".u-gp-con");
                        let groupConList = groupCon.find(".u-gp-lst");
                        let currentConList = groupConList.eq(index);

                        me.addClass("on").siblings(".u-hd-item").removeClass("on");
                        currentConList.addClass("active").siblings().removeClass("active");
                          
                    });
                },20)
            },
            
            // 按车辆品牌查询，进入b2b车辆大厅页
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
            
            // 按车辆价格查询，进入b2b车辆大厅页
            goSearchPrice(min,max,title){
                // 清空本地存储中的搜索记录
                this.clearFilterData();
                setTimeout(() => {

                    // 设置展示给界面  用户所选条件集合中 价格的lable
                    this.userFilterData.price = title; 
                    // 设置真实向api请求的字段 价格区间
                    this.searchFilterList.B2BPriceFrom = min||'';
                    this.searchFilterList.B2BPriceTo = max||''; 

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

        // 在当前模块注册组件
        components:{
            
        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .m-category
        background #fff
        height 284px
        _boxShadow(8px,rgba(0,0,0,.05))
        margin-bottom 25px
        & .u-hd
            height 62px
            line-height 62px
            text-align center
            _spacingPlus(2px)
            font-size 15px
            a,a:hover
                color #313536
                cursor default
        .m-brand-wrap .u-hd .iconfont
            color #313536
            font-size 14px
            margin-left 3px
        & .u-con
            height 191px
            padding 15px
            _border(top,#ededed,1px)
        .m-brand-wrap
            width 850px
            position relative
            .u-hd
                _transitionAll(.1s)
                .iconfont
                    _display(inline-block)
                    _transformOrigin(,47.5%)
                .u-lk:hover,
                .u-lk.on
                    color $c_blue
                    cursor pointer
                    .iconfont
                        color @color
                        _rotate(180deg)
                        -webkit-transition all .1s linear,rotate .15s ease-in-out 
                        -moz-transition all .1s linear,rotate .15s ease-in-out 
                        transition all .1s linear,rotate .15s ease-in-out 
                .m-all-brand-box
                    position absolute
                    top 62px
                    left 0
                    width 850px - 4px - 40px
                    padding 20px
                    min-height 200px
                    border 2px solid $c_blue
                    background #fff
                    z-index 9
                    &::before
                        content ""
                        _display()
                        width 850px
                        height 64px
                        position absolute
                        top -64px
                        left -2px
                        cursor pointer
                    .m-brand-group
                        margin-bottom 15px
                        &.last-group
                            margin-bottom 0
                        .u-gp-hd
                            .u-hd-item
                                background #f2f2f2
                                width 28px
                                text-align center
                                height 28px
                                line-height 28px
                                _display()
                                font-size 16px
                                color #545454
                                margin-right 12px
                                _borderRadius()
                                float left
                                cursor pointer
                                &.on
                                    background $c_blue
                                    color #f4f4f4
                        .u-gp-con
                            margin-top 10px
                            min-height 30px
                            padding-bottom 15px
                            _border(bottom,#e2e2e2)
                            &.last-item
                                padding-bottom 0
                                border none
                            .u-gp-lst
                                _display(none)
                                &.active
                                    _display()
                                .u-gp-item
                                    float left
                                    height 30px
                                    line-height 30px
                                    margin-right 15px

            .u-con
                width @width - 50px
                padding 18px 25px
                _border(right,#ededed,1px)
                .u-lk
                    float left
                    width 100px
                    height 92px
                    position relative
                    &:hover
                        color #ff6533
                    img
                        width 54px
                        height 54px
                        margin 0 23px
                    .u-tit
                        margin 5px 0 0
                        line-height 25px
                        text-align center

        .m-price-wrap
            width 350px
            .u-con
                width @width - 50px
                padding 25px 25px 15px
                height 182px
                .u-lk
                    float left
                    height 50px
                    line-height 50px
                    margin 0 0 8px
                    text-align center
                    font-size 13px
                    width @width * (1/3)
                    &:hover
                        color #ff6533
                    &.light
                        color #ff6533
            
</style>
