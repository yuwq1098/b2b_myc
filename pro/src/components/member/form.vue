<!--  
 **  @description 主要用于会员中心的表单组件
 --> 


<template>
    <div class="gkForm">
        <div class="m-gk-form">
            <slot></slot><!-- 表单组 -->

            <div class="m-botton-wrap">
                <slot name="btnBox"></slot>
            </div><!-- 按钮区域 -->
        </div>
    </div>
</template>

<script>

    export default {

        name: "gkForm",
        // 在当前模块注册组件
        components:{

        },
        // 数据
        data() {
            return{
                
            }
        },
        // 自定义函数(方法)
        methods: {
            
        },    
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .m-gk-form
        width 450px
        margin 0 auto 0 -40px
        padding 30px 0
        .m-botton-wrap
            padding-left 135px
            .u-btn
                _display(inline-block)
                height 42px
                line-height 42px
                _spacingPlus(2px)
                padding 0 15px
                margin-right 10px
                background #2F98E2
                color #f0f0f0
                _borderRadius(2px)
                &.primary
                    background #2F98E2
                    color #f0f0f0
                    &:hover
                        background @background - 10%
                &.hollow
                    height @height - 2px
                    _borderAll(#e2e2e2)
                    background #fff
                    color #40474a

</style>
