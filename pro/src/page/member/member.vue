<template>
	<div class="member">
	    <div class="g-doc">
            <div class="g-bd">
                <section class="f__w1200">
                    <div class="m-bd-wrap f__clearfix">
                        <sidebar class="f__fl"></sidebar><!-- 侧边栏 -->
                        <section class="m-bd-mn f__fr">
                            <transition name="fade" mode="out-in">
                                <keep-alive>
                                    <router-view></router-view>
                                </keep-alive>
                            </transition>
                        </section>     
                    </div>
                </section><!-- 1200px布局 -->
            </div><!-- 网页主体 -->
            
            <!-- 引入底部站点服务图示 -->
            <c-foot-server></c-foot-server>
		</div>
	</div>
</template>

<script>
    // 侧边栏
    import sidebar from "page/member/sidebar/sidebar.vue"
    import cFootServer from "components/foot/foot-svr.vue"

	export default {
        name: "member",
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
            sidebar,
            cFootServer,
        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .g-doc
        .g-bd
            .m-bd-wrap
                margin 40px 0 40px
                .m-bd-mn
                    width 980px
                    min-height 600px
                    &.fade-enter-active,&.fade-enter-active
                        _transitionAll(2s)
                    &.fade-enter
                        _opacity(0)
                        _translate3d(80px)
                    &.fade-leave-active
                        _opacity(0)
                        _translate3d(80px)
</style>
