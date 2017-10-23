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

	export default {
        name: "buysell",
        // 注册组件
        components:{
            
        },
        // 数据
        data() {
            return {

            }
        },
        props:{
            
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
                        background #f0f0f4
                        _borderAll(#f0f0f4)
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
                                &:hover
                                    cursor pointer
            
                            
</style>
