<!--  
 **  @description 网站更多功能 - 友情链接
 --> 

<template>
	<div class="partner">

        <!-- 关于我们内容的布局组件 -->
        <about-layout
            title="友情链接"
            >
            <div class="m-about-con">
                <div class="m-hd box-pb25">
                    <strong class="subtit">友链合作邮箱：</strong>
                    <p class="txt">1098654043@qq.com</p>
                </div><!-- 简历投放邮箱 -->

                <div class="u-article"
                    >木有 · 车欢迎与各类汽车网站互换友情链接，如与本站合作需贵站<em class="vital">百度权重≥1</em>，联系人<em class="vital">QQ：1098654043</em>。
                    <!-- <a target="_blank"   href="https://www.muyouche.com/"  title="前往木有车二手车">木有车二手车</a> -->
                    <div class="copy-code">
                        <span class="attr">复制a链接：</span>
                        <p class="code">&lt;a target=&quot;_blank&quot;   href=&quot;https://www.muyouche.com/&quot;  title=&quot;前往木有车二手车&quot;&gt;木有车二手车&lt;/a&gt;</p>
                    </div>
                </div>

                <div class="m-info-box">
                    <h6 class="subtit">友情链接：</h6>
                    <ul class="link-lst f__clearfix">
                        <template v-for="item in linkItem">
                            <li class="u-item">
                                <a target="_blank" class="u-lk"
                                    :class="{'vital':item.vital}" 
                                    :href="item.sitelink" 
                                    :title="'前往'+item.sitenmae"
                                    >{{item.sitenmae}}
                                </a>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>

        </about-layout>

	</div>
</template>

<script>
    
    // 合作友链的本地数据
    import {partnerLink} from "api/localJson/partner.js"
    // 网站更多功能内容布局组件
    import aboutLayout from 'page/more/common/layout/index.vue' 

	export default {
        name: "partner",
        // 在当前模块注册组件
        components:{
            aboutLayout,
        },
        // 数据
        data() {
            return{
                // 合作友链链接信息集合
                linkItem: partnerLink,
            }
        },
        // 自定义函数(方法)
        methods: {
            
        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'
</style>
