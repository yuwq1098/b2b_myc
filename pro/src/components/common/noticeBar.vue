<template>
	<div class="noticeBar">
	    <div class="m-notice-bar">
            <div class="m-tit">今日成交：</div><!-- 标题 -->
            <div class="m-notice-info">
                <ul class="u-notice-lst f__clearfix">
                    <li class="u-notice-item" v-for="item in noticeList">{{item.title}}</li>
                </ul>
            </div>
        </div>
	</div><!-- 汽车信息盒子 -->
</template>

<script>

	export default {
        name: "noticeBar",
        // 数据
        props:{
            noticeList: Array,
        },
        data() {
            return{
                
            }
        },
        mounted(){

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
    .m-notice-bar
        width 1200px
        margin 20px 0
        height 48px
        line-height 48px
        overflow hidden
        position relative
        .m-tit
            width 130px
            height 48px
            font-size 24px
            color $c_blue
            font-weight bold
            _spacingPlus()
            _completeCenter(0,auto)
        .m-notice-info
            width @width - 138px
            margin-left 138px
            .u-notice-lst
                width 500%
                height 48px
                overflow hidden
                .u-notice-item
                    float left
                    margin-right 72px
                    font-size 14px
                    color #545454

</style>
