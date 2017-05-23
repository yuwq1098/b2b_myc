<template>
	<div class="hello">
		<div class="g-doc">
		    <div class="g-hd">
		        <div class="f__w1200">
                    <div class="f__fl m-logo">
			        	<div class="u-img-box">
			        		<img src="../../assets/img/logo.png" alt="木有车LOGO"/>
			        	</div>
			        </div><!-- logo区 -->

			        <div class="f__fl m-select-city">
			        	<a href="javascript:;" class="u-lk-city">南昌<i class="iconfont"></i></a>
			        	<div class="m-city-box f__show">
			        		<div class="m-city-sch">
			        			<input class="u-ipt f__fc" value="" placeholder="请输入城市名称" />
			        		</div><!-- 搜索区 -->
			        		<div class="m-city-ix">
			        			<ul class="u-lst">
			        				<a href="javascript:;" class="u-link" v-for="value in indexofCity" v-text="value"></a>
			        			</ul>
			        		</div><!-- 城市索引 -->
			        		<div class="m-city-map">
			        			
			        		</div><!-- 城市link地图 -->
			        	</div><!-- 包含所有城市link的盒子 -->
			        </div><!-- logo区 -->

			        <div class="f__fr m-nav-wrap">
			        	<ul class="m-snav">
			        	    <li class="item" v-for="nav in navItem">
                                <a :href="nav.hashUrl" class="u-lk">{{ nav.name }}</a>
			        	    </li>
			        		<li class="item">
			        			<a href="javascript:;" class="u-lk u-lk-lg">
			        			    <i class="iconfont"></i>登录</a>/
			        			<a href="javascript:;" class="u-lk u-lk-reg">注册</a>
			        		</li>
			        	</ul>
			        </div><!-- 导航区 -->
		        </div><!-- 1200布局 -->
		    </div><!-- 头部 -->

		    <div class="g-bd">
		        
		    </div><!-- 主体 -->

		    <div class="g-ft">
		        <div class="f__w1200">
                    <div class="m-lk-main">
                        <div class="f__fl m-lk-list">
                        	<a href="javascript:;" class="u-lk">关于我们</a>
                        	<a href="javascript:;" class="u-lk">加入我们</a>
                        	<a href="javascript:;" class="u-lk">帮助中心</a>
                            <a href="javascript:;" class="u-lk">用户反馈</a>
                        	<a href="javascript:;" class="u-lk">商家申请</a>
                        	<a href="javascript:;" class="u-lk">优信易购</a>
                        	<a href="javascript:;" class="u-lk">网站地图</a>
                        </div><!-- 链接集合 -->
                        <div class="f__pr m-ewm-wrap">
                        	<div class="f__fl m-ewm-box">
                        		<img src="../../assets/img/ewm2.png" alt="扫码关注微信公众号" />
                        		<p class="u-tit">微信公众号</p>
                        		<p class="u-txt">时讯动态早知道</p>
                        	</div>
                        	<div class="f__fr m-ewm-box">
                        		<img src="../../assets/img/ewm2.png" alt="扫码下载APP" />
                        		<p class="u-tit">APP下载</p>
                        		<p class="u-txt">车源福利少不了</p>
                        	</div>
                        </div><!-- 二维码容器 -->
                    </div><!-- 主要链接 -->
                    <div class="m-lk-hot">
                        <div class="m-lk-wrap">
                        	<div class="m-lk-group">
                        		<h4 class="u-tit">热门城市：</h4>
                        		<div class="m-lk-list">
                        			<a href="javascript:;" class="u-lk">二手车交易市场</a>
                        			<a href="javascript:;" class="u-lk">二手车报价</a>
                        			<a href="javascript:;" class="u-lk">广州二手车交易市场</a>
                        			<a href="javascript:;" class="u-lk">上海二手车交易市场</a>
                        			<a href="javascript:;" class="u-lk">深圳二手车交易市场</a>
                        			<a href="javascript:;" class="u-lk">天津二手车交易市场</a>
                        			<a href="javascript:;" class="u-lk">成都二手车交易市场</a>
                        			<a href="javascript:;" class="u-lk">二手车交易市场</a>
                        			<a href="javascript:;" class="u-lk">二手车交易市场</a>
                        			<a href="javascript:;" class="u-lk">二手车交易市场</a>
                        			<a href="javascript:;" class="u-lk">二手车交易市场</a>
                        			<a href="javascript:;" class="u-lk">二手车交易市场</a>
                        			<a href="javascript:;" class="u-lk">二手车报价</a>
                        			<a href="javascript:;" class="u-lk">广州二手车交易市场</a>
                        			<a href="javascript:;" class="u-lk">上海二手车交易市场</a>
                        			<a href="javascript:;" class="u-lk">深圳二手车交易市场</a>
                        			<a href="javascript:;" class="u-lk">天津二手车交易市场</a>
                        			<a href="javascript:;" class="u-lk">成都二手车交易市场</a>
                        			<a href="javascript:;" class="u-lk">二手车交易市场</a>
                        			<a href="javascript:;" class="u-lk">二手车交易市场</a>
                        			<a href="javascript:;" class="u-lk">二手车交易市场</a>
                        			<a href="javascript:;" class="u-lk">二手车交易市场</a>
                        			<a href="javascript:;" class="u-lk">二手车交易市场</a>
                        			<a href="javascript:;" class="u-lk">二手车报价</a>
                        			<a href="javascript:;" class="u-lk">广州二手车交易市场</a>
                        			<a href="javascript:;" class="u-lk">上海二手车交易市场</a>
                        			<a href="javascript:;" class="u-lk">深圳二手车交易市场</a>
                        			<a href="javascript:;" class="u-lk">天津二手车交易市场</a>
                        			<a href="javascript:;" class="u-lk">成都二手车交易市场</a>
                        			<a href="javascript:;" class="u-lk">二手车交易市场</a>
                        			<a href="javascript:;" class="u-lk">二手车交易市场</a>
                        			<a href="javascript:;" class="u-lk">二手车交易市场</a>
                        			<a href="javascript:;" class="u-lk">二手车交易市场</a>
                        		</div>
                        		<div class="u-arrows" @click="">
                        		    <i class="iconfont"></i>
                        		</div><!-- 箭头(控制)link列表显示的数量 -->
                        	</div>
                        	<div class="m-lk-group">
                        		<h4 class="u-tit">热门品牌：</h4>
                        		<div class="m-lk-list">
                        			<a href="javascript:;" class="u-lk">南昌五十铃二手车</a>
                        			<a href="javascript:;" class="u-lk">南昌黄海二手车</a>
                        			<a href="javascript:;" class="u-lk">南昌别克二手车</a>
                                    <a href="javascript:;" class="u-lk">南昌纳智捷二手车</a>
                                    <a href="javascript:;" class="u-lk">南昌新凯二手车</a>
                                    <a href="javascript:;" class="u-lk">南昌宝马二手车</a>
                                    <a href="javascript:;" class="u-lk">南昌福田二手车</a>
                                    <a href="javascript:;" class="u-lk">南昌路特斯二手车</a>
                                    <a href="javascript:;" class="u-lk">南昌五十铃二手车</a>
                                    <a href="javascript:;" class="u-lk">南昌现代二手车</a>
                                    <a href="javascript:;" class="u-lk">南昌五十铃二手车</a>
                        			<a href="javascript:;" class="u-lk">南昌黄海二手车</a>
                        			<a href="javascript:;" class="u-lk">南昌别克二手车</a>
                                    <a href="javascript:;" class="u-lk">南昌纳智捷二手车</a>
                                    <a href="javascript:;" class="u-lk">南昌新凯二手车</a>
                                    <a href="javascript:;" class="u-lk">南昌宝马二手车</a>
                                    <a href="javascript:;" class="u-lk">南昌福田二手车</a>
                                    <a href="javascript:;" class="u-lk">南昌路特斯二手车</a>
                                    <a href="javascript:;" class="u-lk">南昌五十铃二手车</a>
                                    <a href="javascript:;" class="u-lk">南昌现代二手车</a>
                                    <a href="javascript:;" class="u-lk">南昌五十铃二手车</a>
                        			<a href="javascript:;" class="u-lk">南昌黄海二手车</a>
                        			<a href="javascript:;" class="u-lk">南昌别克二手车</a>
                                    <a href="javascript:;" class="u-lk">南昌纳智捷二手车</a>
                                    <a href="javascript:;" class="u-lk">南昌新凯二手车</a>
                                    <a href="javascript:;" class="u-lk">南昌宝马二手车</a>
                                    <a href="javascript:;" class="u-lk">南昌福田二手车</a>
                                    <a href="javascript:;" class="u-lk">南昌路特斯二手车</a>
                                    <a href="javascript:;" class="u-lk">南昌五十铃二手车</a>
                                    <a href="javascript:;" class="u-lk">南昌现代二手车</a>
                                    <a href="javascript:;" class="u-lk">南昌五十铃二手车</a>
                        			<a href="javascript:;" class="u-lk">南昌黄海二手车</a>
                        			<a href="javascript:;" class="u-lk">南昌别克二手车</a>
                                    <a href="javascript:;" class="u-lk">南昌纳智捷二手车</a>
                                    <a href="javascript:;" class="u-lk">南昌新凯二手车</a>
                                    <a href="javascript:;" class="u-lk">南昌宝马二手车</a>
                                    <a href="javascript:;" class="u-lk">南昌福田二手车</a>
                                    <a href="javascript:;" class="u-lk">南昌路特斯二手车</a>
                                    <a href="javascript:;" class="u-lk">南昌五十铃二手车</a>
                                    <a href="javascript:;" class="u-lk">南昌现代二手车</a>
                        		</div>
                        		<div class="u-arrows" @click="">
                        		    <i class="iconfont"></i>
                        		</div><!-- 箭头(控制)link列表显示的数量 -->
                        	</div>
                        	<div class="m-lk-group">
                        		<h4 class="u-tit">热门车系：</h4>
                        		<div class="m-lk-list">
                        			<a href="javascript:;" class="u-lk">南昌二手江南风光</a>
                        			<a href="javascript:;" class="u-lk">南昌二手东南菱利</a>
                        			<a href="javascript:;" class="u-lk">南昌二手赛宝赛宝</a>
                        			<a href="javascript:;" class="u-lk">南昌二手海马323</a>
                        			<a href="javascript:;" class="u-lk">南昌二手日产D22皮卡</a>
                        			<a href="javascript:;" class="u-lk">南昌二手东风多功能商用车</a>
                        			<a href="javascript:;" class="u-lk">南昌二手天马风驰</a>
                        			<a href="javascript:;" class="u-lk">南昌二手丰田柯斯达</a>
                        			<a href="javascript:;" class="u-lk">南昌二手美亚海狮</a>
                        			<a href="javascript:;" class="u-lk">南昌二手本田思迪</a>
                        			<a href="javascript:;" class="u-lk">南昌二手江南风光</a>
                        			<a href="javascript:;" class="u-lk">南昌二手江南风光</a>
                        			<a href="javascript:;" class="u-lk">南昌二手赛宝赛宝</a>
                        			<a href="javascript:;" class="u-lk">南昌二手海马323</a>
                        			<a href="javascript:;" class="u-lk">南昌二手日产D22皮卡</a>
                        			<a href="javascript:;" class="u-lk">南昌二手东风多功能商用车</a>
                        			<a href="javascript:;" class="u-lk">南昌二手天马风驰</a>
                        			<a href="javascript:;" class="u-lk">南昌二手丰田柯斯达</a>
                        			<a href="javascript:;" class="u-lk">南昌二手美亚海狮</a>
                        			<a href="javascript:;" class="u-lk">南昌二手本田思迪</a>
                        			<a href="javascript:;" class="u-lk">南昌二手江南风光</a>
                        			<a href="javascript:;" class="u-lk">南昌二手江南风光</a>
                        			<a href="javascript:;" class="u-lk">南昌二手赛宝赛宝</a>
                        			<a href="javascript:;" class="u-lk">南昌二手海马323</a>
                        			<a href="javascript:;" class="u-lk">南昌二手日产D22皮卡</a>
                        			<a href="javascript:;" class="u-lk">南昌二手东风多功能商用车</a>
                        			<a href="javascript:;" class="u-lk">南昌二手天马风驰</a>
                        			<a href="javascript:;" class="u-lk">南昌二手丰田柯斯达</a>
                        			<a href="javascript:;" class="u-lk">南昌二手美亚海狮</a>
                        			<a href="javascript:;" class="u-lk">南昌二手本田思迪</a>
                        			<a href="javascript:;" class="u-lk">南昌二手江南风光</a>
                        			<a href="javascript:;" class="u-lk">南昌二手江南风光</a>
                        			<a href="javascript:;" class="u-lk">南昌二手赛宝赛宝</a>
                        			<a href="javascript:;" class="u-lk">南昌二手海马323</a>
                        			<a href="javascript:;" class="u-lk">南昌二手日产D22皮卡</a>
                        			<a href="javascript:;" class="u-lk">南昌二手东风多功能商用车</a>
                        			<a href="javascript:;" class="u-lk">南昌二手天马风驰</a>
                        			<a href="javascript:;" class="u-lk">南昌二手丰田柯斯达</a>
                        			<a href="javascript:;" class="u-lk">南昌二手美亚海狮</a>
                        			<a href="javascript:;" class="u-lk">南昌二手本田思迪</a>
                        			<a href="javascript:;" class="u-lk">南昌二手江南风光</a>
                        		</div>
                        		<div class="u-arrows" @click="">
                        		    <i class="iconfont"></i>
                        		</div><!-- 箭头(控制)link列表显示的数量 -->
                        	</div>
                        	<div class="m-lk-group">
                        		<div class="u-tit">友情链接：</div>
                        		<div class="m-lk-list">
                        			<a href="javascript:;" class="u-lk">更多</a>
                        		</div>
                        		<div class="u-arrows" @click="">
                        		    <i class="iconfont"></i>
                        		</div><!-- 箭头(控制)link列表显示的数量 -->
                        	</div>
                        </div>
                    </div><!-- 热门链接 -->
                    <div class="m-cprt-info">
                    	<div class="f__fl">
                    		<p class="u-cprt-txt">业务合作单位：优信拍（北京）二手车鉴定评估有限公司</p>
                    		<p class="u-cprt-txt">
                    		    <span>Copyright © 2015-2017 优估 All Rights Reserved 版权所有</span> 
                    		    <span>优估(上海) 信息科技有限公司</span>
                    		</p>
                    		<p class="u-cprt-txt">
                    		    <span>沪ICP备15036207号-2</span>
                    		    <span><i class="u-img-integrity"></i>沪公网安备 31011402001229号</span>
                    		    <span>沪通信管自贸【2017】4号</span>
                    		    <span>联系电话：021-10106088</span>
                    		</p>
                    	</div>
                    	<div class="m-cfate-wrap">
                            <img src="../../assets/img/integrity.png" alt="身份验证许可网站" />
                            <img src="../../assets/img/knetSeal.png" alt="诚信网站" />
                    	</div><!-- 证书区域 -->
                    </div><!-- 版权信息 -->
		        </div>
		    </div><!-- 尾部 -->
            
            <div class="m-sd-bot">
            	<div class="m-btn-wrap tel">
            		<div class="u-btn">
            			<i class="iconfont"></i>免费电话
            		</div>
            		<div class="m-ref-tel">
            			<input type="text" placeholder="请输入电话号码" />
            			<p>免费电话</p>
            		</div>
            	</div><!-- 免费电话 -->
            	<div class="m-btn-wrap app">
            		<div class="u-btn">
            			<i class="iconfont"></i>APP
            		</div>
            		<div class="m-ref-app">
            			<img src="../../assets/img/knetSeal.png" alt="扫码下载APP" />
            			<div class="u-close"><i class="iconfont"></i></div><!-- 关闭 -->
            		</div>
            	</div><!-- APP下载 -->
            	<div class="m-btn-wrap gzh">
            		<div class="u-btn">
            			<i class="iconfont"></i>APP
            		</div>
            		<div class="m-ref-gzh">
            			<img src="../../assets/img/knetSeal.png" alt="关注公众号" />
            			<p>关注公众号</p>
            			<p>车源福利少不了</p>
            		</div>
            	</div><!-- 关注公众号 -->
            	<div class="m-btn-wrap bktop">
            		<i class="iconfont"></i>
            	</div><!-- 返回顶部 -->
            </div><!-- 右下角悬浮栏 -->

		</div><!-- 文档 -->
	</div>
</template>

<script>
export default {
	name: 'hello',
	data () {
		return {
			msg: 'Welcome to Your Vue.js App',
			indexofCity: ['周边','热门','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
		    navItem: [
		    	{
		    		name: "首页",
		    		hashUrl: "/home"
		    	},
		    	{
		    		name: "买车",
		    		hashUrl: "/buyCar"
		    	},
		    	{
		    		name: "卖车",
		    		hashUrl: "/sellCar"
		    	},
		    	{
		    		name: "付一半",
		    		hashUrl: "/payHalf"
		    	},
		    	{
		    		name: "新车",
		    		hashUrl: "/newCar"
		    	},
		    	{
		    		name: "宝典",
		    		hashUrl: "/cheats"
		    	},
		    	{
		    		name: "服务保障",
		    		hashUrl: "/guarantee"
		    	},
		    	{
		    		name: "APP下载",
		    		hashUrl: "/download"
		    	},
		    ],
		}
	}
}
</script>

<!-- 限定作用域 -->
<style lang="stylus" rel="stylesheet/stylus" scope>
    @import './home.styl'
</style>

