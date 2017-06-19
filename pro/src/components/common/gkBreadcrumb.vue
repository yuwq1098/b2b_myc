<template>
	<div class="gkBreadCrumb">
	    <div class="m-crm">
            <span>当前位置：</span>
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">北京二手车</el-breadcrumb-item>
                <el-breadcrumb-item>大众朗逸2011款1.6L手动品悠版</el-breadcrumb-item>
            </el-breadcrumb>
        </div><!-- 面包屑 -->
	</div><!-- geek面包屑 -->
</template>

<script>
    
	export default {
        name: "gkBreadCrumb",
        // 数据
        props:{
            
        },
        data() {
            return{
                
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
            overflow hidden
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
