<template>
	<div class="safetySetting">
        <div class="m-member-mn">
            <div class="m-member-hd">
                <p class="tit">{{title}}</p>
            </div>
            <div class="m-member-con">
                <slot name="content">
                    页面内容
                </slot>
            </div>
        </div>
	</div>
</template>

<script>

	export default {
        name: "safetySetting",
        // 数据
        data() {
            return{
                
            }
        },
        props:{
            title:{
                type: String,
                default: "页面标题",
            }
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
    .m-member-mn
        width 980px
        color #40474A
        .m-member-hd
            width @width
            height 54px
            line-height 52px
            background #DFE4E6
            
            .tit
                _display(inline-block)
                font-size 18px
                font-weight bold
                _spacingPlus(3px)
                padding 0 15px
                position relative
                &:before
                    _display()
                    content ""
                    height 3px
                    background $c_blue
                    _completeCenter(0,-5px,auto,-2px)

        .m-member-con
            width @width - 2px
            _borderAll(#E7EaEd)
            margin-top 15px
            min-height 400px
            background #fff
</style>
