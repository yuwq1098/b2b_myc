<template>
	<div class="noticeBar">
	    <div class="m-notice-bar">
            <div class="m-tit">今日成交</div><!-- 标题 -->
            <div class="m-notice-info">
                <ul class="u-notice-lst f__clearfix" ref="noticeList">
                    <li class="u-notice-item" v-for="item in noticeList">{{item.title}}</li>
                </ul>
            </div>
        </div>
	</div><!-- 汽车信息盒子 -->
</template>

<script>
    
    import {autoNoticeHorizontal} from "assets/js/dom.js";
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
            this.$nextTick(function(){
                setTimeout(() => {
                    let noticeList = this.$refs.noticeList;
                    autoNoticeHorizontal(noticeList);
                },2000)
            })
        },
        activated(){
            
        },
        deactivated(){
            let noticeList = this.$refs.noticeList;
            autoNoticeHorizontal(noticeList,true);
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
        width 1200px - 30px
        background #fff
        _boxShadow(8px,rgba(0,0,0,.05))
        padding 0 15px
        height 60px
        line-height 60px
        overflow hidden
        position relative
        .m-tit
            width 110px
            height 60px
            font-size 24px
            font-weight bold
            color $c_blue
            _spacingPlus()
            _completeCenter(15px,auto)
        .m-notice-info
            width @width - 120px
            margin-left 120px
            overflow hidden
            .u-notice-lst
                width 500%
                height 60px
                overflow hidden
                .u-notice-item
                    float left
                    margin-right 72px
                    font-size 14px
                    color #ff6533

</style>
