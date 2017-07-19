<template>
	<div class="appCodeBox">
	    <div class="m-app-box">
            <span class="u-tip">扫我<i class="i-angle"></i></span><!-- 扫码小提示 -->
            <i class="i-point"></i><!-- 通信点 -->
            <i class="i-line"></i><!-- 上出声口 -->
            <div class="u-screen">
                <div class="u-pic">
                    <img class="u-imgCode" :src="imgCodeUrl" alt="扫码发单"/>
                </div>
                <div class="u-tit">立即扫码</div>
                <div class="u-txt">使用手机发单</div>
            </div><!-- 屏幕 -->
            <i class="i-app-home"></i><!-- 手机home键 -->
            <i class="i-shadow">
                <i class="i-line-l"></i><!-- 左线 -->
                <i class="i-line-r"></i><!-- 右线 -->
                <i class="i-white"></i><!-- 白色 -->
            </i><!-- 阴影 -->
        </div>
	</div><!-- 手机扫码盒子 -->
</template>

<script>
    
	export default {
        name: "appCodeBox",
        // 数据
        props:{
            
        },
        data() {
            return{
                imgCodeUrl: require("assets/img/myc_ewm_app.jpg"),
            }
        },
        mounted(){

        },
        //重新进入该组件
        activated(){
            
        },
        //销毁
        deactivated(){
            
        },
        // 自定义函数(方法)
        methods: {
            
        },
        // 在当前模块注册组件
        components:{

        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .m-app-box
        width 106px
        height 182px
        background #e2e2e2
        _borderRadius(10px)
        _completeCenter(auto,15px)
        .u-tip
            _completeCenter(-42px,auto,-7px,auto)
            width 54px
            height 26px
            line-height 26px
            text-align center
            color #f4f4f4
            line-height 26px
            font-size 12px
            _borderRadius(8px)
            _spacingPlus(2px)
            background #00BCD4
            .i-angle
                _completeCenter(auto,6px,auto,-7px)
                width 0
                height 0;
                border-top 8px solid #00BCD4
                border-left 7px solid transparent
                border-right 3px solid transparent
        .i-point
            width 4px
            height 4px
            _completeCenter(35px,auto,10px,auto)
            _borderRadius()
            background #313536
        .i-line
            width 26px
            height 2px
            _completeCenter(auto,35px,11px,auto)
            _borderRadius(1px)
            background #313536
        .u-screen
            width 88px
            height 132px
            background #fff
            _borderRadius(2px)
            _completeCenter(,,20px,auto)
            .u-pic
                width 84px
                margin 2px 2px
                height 84px
                .u-imgCode
                    width @width
                    height @height
            .u-tit,.u-txt
                color #ff6533
                text-align center
            .u-tit
                font-size 15px
                line-height 18px
                font-weight bold
                _spacingPlus()
            .u-txt
                margin-top 3px
                line-height 15px
                font-size 12px
        .i-app-home
            width 18px
            height 18px
            _completeCenter(,,auto,5px)
            _borderRadius()
            _gradient(#a8a8a8,#ededed,top)
        .i-shadow
            position absolute
            bottom -70px
            width 106px
            height 69px
            _gradient(#e2e2e2,#fff,top)
            _opacity(.8)
            _borderRadius(9px,top-left)
            _borderRadius(9px,top-right)
            .i-white
                height 44px
                background #fff
                _completeCenter(10px,10px,auto,0)


</style>
