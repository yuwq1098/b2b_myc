<!--  
 **  @description 会员中心的缺省页
 --> 

<template>
    <div class="notContent">
        <div class="m-not-box">
            <div class="u-pic">
                <img :src="noConImg" />
            </div><!-- 图片 -->
            <div class="u-con">
                <div class="u-speak">{{speak}}</div><!-- 描述 -->
                <div class="u-other f__clearfix">
                    <slot>
                        <router-link :to="{path:'/'}" class="u-lk" tag="a">网站首页&gt;</router-link>
                    </slot>
                </div><!-- 按钮拓展 -->
            </div><!-- 内容 -->
            
        </div><!-- 缺省页布局 -->
    </div>
</template>

<script>

    export default {
        name: "notContent",
        // 数据
        data() {
            return{
                noConImg: require("assets/img/no_product.png"),
            }
        },
        props:{
            // 错误提示文本
            speak:{
                type: String,
                default: '这是一条缺省提示'
            },
        },
        watch:{

        },
        //退出的生命周期钩子
        deactivated(){

        },
        // 自定义函数(方法)
        methods: {

        },    
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .m-not-box
        width 580px
        height 220px
        margin 120px auto 80px
        position relative
        .u-pic
            width 175px
            height 180px
            _completeCenter(0px,auto,0,auto)
            _imgwrap()
        .u-con
            width @width - 220px
            height @height - 60px
            margin 0 0 0 220px
            padding 30px 0
            position relative
            .u-speak
                font normal 18px/35px "Microsoft YaHei"
                _spacingPlus(2px)
            .u-other
                height 36px
                width @width
                _completeCenter(0,auto,auto,45px)
                .u-lk
                    _display()
                    float left
                    height 36px
                    line-height 36px
                    font-size 15px
                    _spacingPlus()
                    padding 0 18px
                    margin-right 15px
                    _borderRadius(4px)
                    background #2F98E2
                    color #f0f0f0
                    &:hover
                        background @background - 10%

</style>
