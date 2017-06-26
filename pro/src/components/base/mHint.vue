<template>
	<div class="mHint">
        <div class="m-hint-bar">
            <slot></slot>
        </div><!-- 提示条组件 -->
	</div>
</template>

<script>
	export default {
        name: "mHint",
        // 数据
        data() {
            return{
                
            }
        },
        props:{

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
    .m-hint-bar
        _display()
        margin 15px 0
        padding 0 15px
        font-size 15px
        color #545454
        height 44px 
        line-height 44px
        background #fff6e5
        border 1px solid #f9c874
        .u-vital
            color $c_blue
</style>
