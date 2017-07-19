<template>
	<div class="download">
        <div class="m-app-dwonload">
            <div class="m-ad">
            </div>
            <div class="m-mn">
                <div class="m-dowmload">
                    <section class="f__w1200">
                        <div class="inner">
                            <div class="lk-wrap">
                                <a class="u-btn android"
                                    :href="linkInfo[0].url" target="_blank">
                                    {{linkInfo[0].title}}
                                </a>
                                <a class="u-btn ios"
                                    :href="linkInfo[1].url" target="_blank">
                                    {{linkInfo[1].title}}
                                </a>
                            </div><!-- 链接下载 -->
                            <div class="ewm-wrap">
                                <div class="u-pic">
                                    <img :src="ewmInfo.url" />
                                </div>
                                <p class="u-txt">{{ewmInfo.title}}</p>
                            </div><!-- 二维码下载 -->
                        </div><!-- 下载区域 -->
                    </section>
                </div>
                
                <div class="m-con-item part1">
                    <section class="f__w1200 inner">
                        <div class="img-bg v1">
                        
                        </div><!-- 全国车源 -->
                    </section>
                </div>

                <div class="m-con-item part2">
                    <section class="f__w1200 inner">
                        <div class="img-bg v2">
                        
                        </div><!-- 为车商贴心打造 -->
                    </section>
                </div>
                <div class="m-con-item part3">
                    <section class="f__w1200 inner">
                        <div class="img-bg v3">
                        
                        </div><!-- 签署合同 -->
                    </section>
                </div>
            </div>
        </div>
	</div>
</template>

<script>

	export default {
        name: "download",
        // 数据
        data() {
            return{
                // 下载链接信息
                linkInfo:[
                    {
                        title:"安卓客户端",
                        url: "https://www.baidu.com",
                    },
                    {
                        title:"苹果客户端",
                        url: "https://www.baidu.com",
                    },
                ],
                // 二维码下载
                ewmInfo:{
                    title: "二维码下载",
                    url:require("assets/img/myc_ewm_app.jpg"),
                }
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
