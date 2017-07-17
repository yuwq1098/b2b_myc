<template>
	<div class="webSidebar">
	    <div class="m-sidebar-wrap">
            <div class="m-expand-bg"></div><!-- 防抖动背景 -->
            <div class="m-sidebar-con">
                <ul class="u-side-lst f__clearfix">
                    <li class="u-side-item u-member">
                        <a href="javascript:;" class="u-lk">
                            <div class="icon">
                                <i class="iconfont icon-huiyuanzhongxin"></i>
                            </div>
                        </a>
                    </li><!-- 会员中心 -->
                    <li class="u-side-item u-collect">
                        <a href="javascript:;" class="u-lk">
                            <div class="icon">
                                <i class="iconfont icon-shoucang11"></i>
                            </div>
                        </a>
                    </li><!-- 收藏 -->
                    <li class="u-side-item u-wallet">
                        <a href="javascript:;" class="u-lk">
                            <div class="icon">
                                <i class="iconfont icon-qianbao8"></i>
                            </div>
                        </a>
                    </li><!-- 钱包 -->
                </ul>
            </div><!-- 真实的导航条内容 -->
            <div class="m-sidebar-other">
                <ul class="u-side-lst f__clearfix">
                    <li class="u-side-item u-ewm">
                        <a href="javascript:;" class="u-lk">
                            <div class="icon">
                                <i class="iconfont icon-erweima3"></i>
                            </div>
                        </a>
                    </li><!-- 二维码 -->
                    <li class="u-side-item u-backTop">
                        <a href="javascript:;" class="u-lk">
                            <div class="icon">
                                <i class="iconfont icon-fanhuidingbu"></i>
                            </div>
                        </a>
                    </li><!-- 返回顶部 -->
                </ul>
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
