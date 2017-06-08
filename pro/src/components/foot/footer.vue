<template>
	<div class="footer">
		<div class="g-ft">
            <section class="m-ft-bxo f__w1200">
                <div class="m-ft-ct f_clearfix">
                    <div class="m-lk-wrap f_clearfix">
                        <dl class="m-item" v-for="group in linkList">
                            <dt class="u-tit">{{group.title}}</dt>
                            <dd v-for="item in group.itemList">
                                <router-link :to="item.path" class="u-lk">{{item.name}}</router-link>
                            </dd>
                        </dl>
                    </div><!-- 链接区 -->
                    <div class="m-ewm-wrap f__clearfix">
                        <div class="u-ewm-box">
                            <img src="../../assets/img/wechat-ewm.jpg" alt="微信公众号" />
                            <p>微信公众号</p>
                        </div>
                        <div class="u-ewm-box v2">
                            <img src="../../assets/img/wechat-ewm.jpg" alt="微信公众号" />
                            <p>下载APP</p>
                        </div>
                    </div><!-- 二维码区域 -->
                    <div class="m-tel-box">
                        <p class="u-tit">售后客服电话</p>
                        <p class="u-tel">{{serviceTel}}</p>
                        <p class="u-txt">免费咨询（咨询、投诉、建议）</p>
                        <p class="u-txt">周一至周六 9:00-18:00（工作时间）</p>
                    </div><!-- 联系方式 -->
                </div><!-- 底部主要内容 -->
                <div class="m-ft-cprt">
                    <p v-text="copyright.info"></p> 
                </div><!-- 版权声明模块 -->
            </section>
        </div><!-- 网站底部 -->
	</div>
</template>

<script>

    export default {
    	name: 'footer',
    	data () {
    		return {
                serviceTel: "400-900-9936",
                copyright:{
                    info: "Copyright © 2016-2017 木有车 All Rights Reserved 版权所有 南昌小目标车网科技发展股份有限公司",
                },
    			linkList:[
                    {
                        title: "关于我们",
                        itemList:[
                            {
                                name: "公司介绍",
                                path: ""
                            },
                            {
                                name: "联系我们",
                                path: ""
                            },
                            {
                                name: "加入我们",
                                path: ""
                            },
                        ]
                    },
                    {
                        title: "交易流程",
                        itemList:[
                            {
                                name: "收车流程",
                                path: ""
                            },
                            {
                                name: "卖车流程",
                                path: ""
                            },
                            {
                                name: "异地收车",
                                path: ""
                            },
                        ]
                    },
                    {
                        title: "交易流程",
                        itemList:[
                            {
                                name: "收车流程",
                                path: ""
                            },
                            {
                                name: "卖车流程",
                                path: ""
                            },
                            {
                                name: "异地收车1",
                                path: ""
                            },
                        ]
                    }
                ]
    		}
    	},
        mounted(){

        },
    }
</script>

<!-- 限定作用域 -->
<style lang="stylus" rel="stylesheet/stylus" scope>
    @import './foot.styl'
</style>