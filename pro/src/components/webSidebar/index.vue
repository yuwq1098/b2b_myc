<template>
	<div class="webSidebar">
	    <div class="m-sidebar-wrap">
            <div class="m-expand-bg"></div><!-- 防抖动背景 -->
            <div class="m-sidebar-con">
                
            </div><!-- 真实的导航条内容 -->
            <div class="m-sidebar-other">
                <div class="u-side-item u-ewm">
                    <div class="icon">
                        <i class="iconfont icon-erweima3"></i>
                    </div>
                </div><!-- 二维码 -->
                <div class="u-side-item u-backTop">
                    <div class="icon">
                        <i class="iconfont icon-fanhuidingbu"></i>
                    </div>
                </div><!-- 返回顶部 -->
            </div><!-- 其他内容 -->
        </div>
	</div>
</template>

<script>

	export default {
        name: "webSidebar",
        // 数据
        data() {
            return{
                
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
    @import 'index.styl'
</style>
