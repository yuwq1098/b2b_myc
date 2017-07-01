<!--  
 **  @description 会员中心的缺省页(二号风格)
 --> 

<template>
    <div class="noContent">
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
        name: "noContent",
        // 数据
        data() {
            return{
                noConImg: require("assets/img/no-content.jpg"),
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
        width 600px
        height 220px
        margin 100px auto 60px 100px
        position relative
        .u-pic
            width 240px
            height 195px
            _completeCenter(0px,auto,5px,auto)
            _imgwrap()
        .u-con
            width @width - 255px
            height @height - 60px
            margin 0 0 0 255px
            padding 30px 0
            position relative
            .u-speak
                margin 15px 0 0
                color #959595
                font normal 15px/28px "Microsoft YaHei"
                _spacingPlus()
            .u-other
                height 32px
                width @width
                _completeCenter(0,auto,auto,55px)
                .u-lk
                    _display()
                    float left
                    height 32px
                    line-height 32px
                    font-size 14px
                    _spacingPlus()
                    padding 0 20px
                    margin-right 15px
                    _borderRadius(4px)
                    background #2F98E2
                    color #f0f0f0
                    &:hover
                        background @background - 10%

</style>
