<template>
	<div class="memberHd">
        <div class="m-hd">
            <h3 class="u-tit">
                <slot></slot>
            </h3>
        </div><!-- 会员中心顶部标题组件 -->
	</div>
</template>

<script>
	export default {
        name: "memberHd",
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
    .m-hd
        height 48px
        line-height 48px
        font-size 18px
        padding 0 12px
        _spacingPlus(3px)
        background #e2e2e2
        margin-bottom 20px
        .u-tit
            color #313536
</style>
