<template>
	<div class="c-header">
		<div class="g-hd">
		    <div class="m-hd">
		        <div class="f__w1200 f__clearfix">
		            <div class="m-logo f__fl">
		                <a href="javascript:;" class="u-lk">
		                    <img src="../../assets/img/logo.png" alt="logo" />
		                </a>
		            </div><!-- 网站LOGO -->

		            <div class="m-city f__fl">
		                <a href="javascript:;" class="u-lk">南昌<i class="iconfont icon-arrowdown1"></i></a>
		                <div class="m-down f__hide">
		                    
		                </div><!-- 城市盒子 -->
		            </div><!-- 城市 -->

		            <div class="m-site-lk f__fr">
		                <ul class="m-lk-list">
		                    <li class="u-item login">
		                        <a href="javascript:;" class="u-lk lg"><i class="i-user-lgn"></i>登录</a>
		                        <span>/</span>
		                        <a href="javascript:;" class="u-lk">注册</a>
		                    </li>
		                    <li class="u-item">
		                        <a href="javascript:;"  class="u-lk">下载APP</a>
		                    </li>
		                    <li class="u-item">
		                        <a href="javascript:;"  class="u-lk">服务保障</a>
		                    </li>
		                    <li class="u-item">
		                        <router-link to="/sellCar" class="u-lk">我要卖车</router-link>
		                    </li>
		                    <li class="u-item">
		                        <router-link to="/buyCar" class="u-lk">我要收车</router-link>
		                    </li>
		                    <li class="u-item">
		                        <router-link to="/home" class="u-lk">首页</router-link>
		                    </li>
		                </ul>
		            </div><!-- 站点链接 -->
		        </div><!-- 1200px布局 -->
		        
		    </div>
		</div><!-- 头部 -->
	</div>
</template>

<script>

    export default {
    	name: 'c-header',
    	data () {
    		return {
    			
    		}
    	},
        mounted(){

        },
    }
</script>

<!-- 限定作用域 -->
<style lang="stylus" rel="stylesheet/stylus" scope>
    @import './header.styl'
</style>