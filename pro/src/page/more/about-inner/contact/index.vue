<!--  
 **  @description 网站更多功能 - 联系我们
 --> 

<template>
	<div class="contact">
        
        <!-- 关于我们内容的布局组件 -->
        <about-layout
            title="联系我们"
            >
            <div class="m-info-gp">
                <section class="info-item box-pb30 f__clearfix">
                    <div class="u-ico">
                        <i class="iconfont icon-dianhua-005"></i>
                    </div><!-- 图标 -->
                    <div class="u-con">
                       <span class="txt-t3 mr-10">400-900-9936（9:00-18:00）</span>
                       <span class="txt-t1">免费咨询、建议、投诉</span> 
                    </div><!-- 内容 -->
                </section><!-- 咨询建议 -->

                <section class="info-item box-pb30 f__clearfix">
                    <div class="u-ico">
                        <i class="iconfont icon-weixin3"></i>
                    </div><!-- 图标 -->
                    <div class="u-con">
                        <span class="txt-t3 mr-10">木有车微信公众号</span>
                        <span class="txt-t1">关注最新平台活动，了解最新车源信息</span>
                        <div class="line-box">
                            <div class="u-pic">
                                <img :src="WXCodeImg" alt="木有车微信公众号"/>
                            </div>
                        </div> 
                    </div><!-- 内容 -->
                </section><!-- 微信公众号 -->

                <section class="info-item f__clearfix">
                    <div class="u-ico">
                        <i class="iconfont icon-dizhi1"></i>
                    </div><!-- 图标 -->
                    <div class="u-con">
                       <span class="txt-t3">江西省南昌市红谷滩万达中心B3写字楼30层3002室</span>
                       <div class="line-box">
                           <baidu-map class="bm-view" 
                                ak="Mn8GKZWK4BpQYNWm7eIK0u3g2riVODba"
                                :center="bmCenter"
                                :zoom="zoom"
                                @ready="bmReady"
                                :scroll-wheel-zoom="true"
                                >
                                <bm-marker :position="{lng: 115.856572, lat: 28.701403}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
                                    <bm-label content="江西南昌木有车" :labelStyle="{color: '#F22', border: '1px solid #F22', padding: '2px 4px', fontSize : '13px'}" :offset="{width: -35, height: 36}"/>
                                </bm-marker>
                                <bm-copyright
                                    anchor="BMAP_ANCHOR_TOP_RIGHT"
                                    :copyright="copyright">
                                </bm-copyright>
                                <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
                            </baidu-map>
                       </div>
                    </div><!-- 内容 -->
                </section><!-- 公司位置 -->

            </div><!-- 联系我们 -->
        </about-layout>

	</div>
</template>

<script>
    
    // 网站更多功能内容布局组件
    import aboutLayout from 'page/more/common/layout/index.vue'
    // 引入百度地图组件
    import {BaiduMap,BmMarker,BmLabel,BmCopyright,BmNavigation} from 'vue-baidu-map'

    export default {
        name: "contact",
        // 在当前模块注册组件
        components:{
            aboutLayout,
            BaiduMap,
            BmNavigation,
            BmMarker,
            BmLabel,
            BmCopyright,
        },
        // 数据
        data() {
            return{
                WXCodeImg: require('assets/img/myc_ewm_wechat.jpg'),
                // 百度地图定位
                bmCenter: { lng: 0, lat: 0 },
                zoom: 19,
                copyright: [],
            }
        },
        // 自定义函数(方法)
        methods: {
            // 百度地图就绪
            bmReady ({BMap, map}) {
                // console.log(BMap, map)
                this.bmCenter.lng = 115.856572
                this.bmCenter.lat = 28.701403
                this.copyright = [
                    {id: 1, content: '<a>江西木有车网络股份有限公司</a>'}
                ]
            }
        },
        
	}

</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'

</style>
