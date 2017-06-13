<template>
	<div class="brandSelect">

	    <div class="m-category f__clearfix">
            <div class="m-brand-wrap f__fl">
                <div class="u-hd">
                    <a href="javascript:;" class="u-lk">品牌<i class="iconfont icon-caretdown"></i></a>
                </div>
                <div class="u-con f__clearfix" v-if="hotBrand.length>0">
                    <a href="javascript:;" class="u-lk" v-for="item in hotBrand" :data-brand-id="item.id" >
                        <img :src="item.imgUrl" :alt="item.name" />
                        <p class="u-tit">{{item.name}}</p>
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

	</div><!-- 首页条件查询区 -->
</template>

<script>

    import api from "api/getData.js"
    import {dataToJson} from "assets/js/util.js"
    import {brandInfo} from "base/class/brand.js"

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
            }
        },
        mounted(){
            //获取汽车品牌列表
            this._getB2BCarBrandList();
            // this._getCarSeries();
        },
        // 自定义函数(方法)
        methods: {
            //获取B2B车辆品牌列表
            _getB2BCarBrandList(){
                api.getCarBrand().then((res) => {
                    //品牌map集合
                    this.carBrandMap = this._normalizeBrandInfo(res.data)
                    //热门品牌列表
                    this.hotBrand = this.carBrandMap.hotBrand;
                    this.brandList = this.carBrandMap.brandList;
                })
            },
            //使用b2c抽象类完成brandInfo
            _normalizeBrandInfo(list){
                let map = {
                    hot: {
                        title: HOT_BRAND_NAME,
                        items: []
                    }
                }
                list.forEach((item, index) => {
                    if (index < HOT_BRAND_LEN) {
                        map.hot.items.push(new brandInfo(item));
                    }
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
                let hot = []
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
                var brandMap = {
                    hotBrand: map.hot.items,
                    brandList: nature,
                }
                return brandMap;
            },

            //根据车品牌获取车系
            _getCarSeries(){
                let [data] = [{}]
                data.brandid = '5';
                api.getCarSeriesByBrand(data).then((res) => {
                    console.log("根据车品牌获取车系",dataToJson(res.data));
                })
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
        _border(#f0f0f0,2px)
        _boxShadow(12px,rgba(0,0,0,.15))
        overflow hidden
        margin-bottom 30px
        & .u-hd
            height 62px
            line-height 62px
            text-align center
            _spacingPlus(2px)
            font-size 15px
            a,a:hover
                color #313536
                cursor default
        .m-brand-wrap .u-hd i
            color #313536
            font-size 14px
            margin-left 3px
        & .u-con
            height 191px
            padding 15px
            _border(top,#ededed,1px)
        .m-brand-wrap
            width 850px
            .u-hd
                .u-lk:hover
                    color $c_blue
                    cursor pointer
                    .iconfont
                        color @color
            .u-con
                width @width - 50px
                padding 18px 25px
                _border(right,#ededed,1px)
                .u-lk
                    float left
                    width 100px
                    height 92px
                    position relative
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
                    &.light
                        color #ff6533
            
</style>
