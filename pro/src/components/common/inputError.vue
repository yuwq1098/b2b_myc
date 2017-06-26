<!--  
 **  @description 表单头 + 验证
 --> 

<template>
    <div class="inputError">
        <div class="u-item-hd f__clearfix">
            <span class="u-tit">{{title}}</span>
            <p class="u-error"
                :class="[errorAlign]"
                v-show="isShow"
                >
                <i class="iconfont icon-shenhebutongguo"></i>
                <span class="text">{{errorTetx}}</span>
            </p>
        </div>
    </div>
</template>

<script>

    export default {
        name: "inputError",
        // 数据
        data() {
            return{
                selectedVal: '',
            }
        },
        props:{
            title: {
                type: String,
                default: "小标题",
            },
            errorTetx: {
                type: String,
                default: "错误提示",
            },
            errorAlign:{
                type: String,
                default: "right",
            },
            isShow:{
                type: Boolean,
                default: false,
            }
        },
        // 数据侦听
        watch:{
            
        },
        // 再次进入生命周期钩子(因为keep-alive的原因,created和mounted在页面切换过程中都是无效的)
        activated(){

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
    .u-item-hd
        height 32px
        line-height 32px
        margin-bottom 4px
        position relative
        .u-tit
            font-size 14px
            float left
            color #4A5C69
            font-weight 700
            _spacingPlus(2px)
        .u-error
            font-size 12px
            color #F74062
            &.right
                float right
            &.left
                position absolute
                left 220px
                top 0
            .iconfont
                font-size 15px
                margin 0 0px 0 0
</style>
