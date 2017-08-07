<template>
    <div id="app">
        <div class="g-doc" 
            :class="{'noWebSide':!$router.currentRoute.meta.hasWebSide}">
	        <!-- 引入网站头部 -->
	        <keep-alive>
	            <c-head></c-head>
	        </keep-alive>

		    <keep-alive>
			    <router-view v-if="!$router.currentRoute.meta.notKeepAlive"></router-view>
			</keep-alive>
			<router-view v-if="$router.currentRoute.meta.notKeepAlive"></router-view>
		    
	        <!-- 引入loading -->
		    <loading></loading>
	        
	        <!-- 引入网站底部 -->
	        <keep-alive>
	        	<c-foot></c-foot>
	        </keep-alive>

	        <!-- 引入侧边条 -->
            <transition name="slide-right">
                <web-side v-if="$router.currentRoute.meta.hasWebSide"></web-side>
            </transition>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import loading from 'base/loading/loading.vue'
    import cHead from "components/head/header.vue"
    import cFoot from "components/foot/footer.vue"
    // 网站侧边导航
    import webSide from "components/webSidebar"

    

	export default {
	    name: 'app',
        bus: new Vue(), //首先建立一个空的Vue实例作为事件的中转
	    data(){
            return {

            }
	    },
        components:{
            loading,
            cHead,
            cFoot,
            webSide,
        },
        created () {

        },
        mounted(){

        },
        activated() {
        	
        },
        computed:{

        },
        watch:{
        	// $route (to, from) {
        	// 	console.log("什么意思",to);
         //    },
        }
	}

</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'

    // 滑动过渡效果
    .slide-right-enter-active
        _transitionAll(.4s)
    .slide-right-leave-active
        _transitionAll(.3s,cubic-bezier(0.22, 0.61, 0.21, 0.92))
    
    .slide-right-enter
        _opacity(0)
        right -40px
    .slide-right-leave-active
        _opacity(0)
        right -40px
    
    .g-doc
        _boxSizing()
        border-right 40px solid transparent
        &.noWebSide
            _boxSizing(content-box)
            border none
</style>

