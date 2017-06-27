<!--  
 **  @description 主要用于会员中心的表单item组件
 --> 


<template>
    <div class="gkFormItem">
        <div class="m-form-item">
            <div class="item-error" v-if="errorShow">
                <p class="error-txt">
                    <i class="iconfont icon-jinggao1"></i>{{errorText}}</p>
            </div>
            <div class="item-inner">
                <span class="tit">{{title}}</span>
                <div class="info">
                    <slot></slot>
                    <div class="smsCode">
                        <slot name="code"></slot>    
                    </div><!-- 手机验证码 -->
                </div>
            </div>
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
                inputVal: "",
            }
        },
        props:{
            // 错误提示文本
            errorText:{
                type: String,
                default: '这是一条错误提示'
            },
            // 错误提示文本的显隐
            errorShow:{
                type: Boolean,
                default: false
            },
            // 当前输入框的标题
            title:{
                type: String,
                default: '这是一个标题'
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
    .m-form-item
        width 450px
        min-height 42px
        padding 0 0 20px
        .item-error
            height 28px
            line-height 30px
            margin 0 0 8px 135px
            background #FBEBE6
            _borderAll(#ff6533)
            _borderRadius(1px)
            color #777
            font-size 12px
            .error-txt
                margin-left 10px
                position relative
                padding-left 22px
                .iconfont
                    width 20px
                    height 20px
                    line-height 20px
                    font-size 18px
                    color #ff6533
                    _completeCenter(0,auto)
        .item-inner
            height 42px
            position relative
            .tit
                text-align right
                width 120px
                height @height
                line-height @height
                color #777
                font-size 15px
                _spacingPlus()
                _completeCenter(0,auto,0,auto)
            .info
                width @width - 135px
                height @height
                margin-left 135px
                position relative
                .u-ipt
                    width @width
                    height @height
                    _borderRadius(1px)
                    padding 0 15px
                    _borderAll(#e2e2e2)
                    &:disabled
                        background #f0f2f4
                .smsCode
                    width @width
                    height @height
                    .code-ipt
                        width @width * 0.6 - 8px
                        height @height 
                        _borderRadius(1px)
                        padding 0 15px
                        _borderAll(#e2e2e2)
                        &:disabled
                            background #f0f2f4
                    .code-btn
                        _display()
                        width @width * 0.4 - 6px
                        text-align center
                        height @height
                        line-height @height
                        background #2F98E2
                        color #f0f0f0
                        _borderRadius(2px)
                        _spacingPlus(2px)
                        _completeCenter(auto,0)
                        &:hover
                            background @background + 12%

</style>
