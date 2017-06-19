<template>
	<div class="footer">
		<div class="g-ft">
            <section class="m-ft-bxo f__w1200">
                <div class="m-ft-ct f_clearfix">
                    <div class="m-lk-wrap">
                        <div class="m-lk-hd">
                            <p class="u-tit">木有车【汽车服务大平台】</p>
                        </div><!-- 链接区头部 -->
                        <div class="m-gp-wrap f__clearfix">
                            <template v-for="(group,index) in lkInfoItems">
                                <ul class="m-gp-item u-lk-lst f__clearfix"
                                    :class="{'last':index==lkInfoItems.length-1}"
                                >
                                    <template v-for="(item,index) in group.items">
                                        <li class="u-item">

                                            <a class="u-lk" href="javascript:;" v-if="!item.path">{{item.name}}</a><!-- 当不存在的path时 -->

                                            <router-link class="u-lk" :to="item.path" v-if="item.path" tag="a">{{item.name}}</router-link><!-- 当存在的path时 -->
                                        </li>
                                    </template>
                                </ul>
                            </template>
                        </div>
                    </div><!-- 链接区 -->
                    <div class="m-ewm-wrap f__clearfix">
                        <div class="u-ewm-box">
                            <img class="u-pic" src="../../assets/img/wechat-ewm.jpg" alt="微信公众号" />
                            <p class="u-txt">微信公众号</p>
                        </div>
                        <div class="u-ewm-box v2">
                            <img class="u-pic" src="../../assets/img/wechat-ewm.jpg" alt="微信公众号" />
                            <p class="u-txt">下载APP</p>
                        </div>
                    </div><!-- 二维码区域 -->
                    <div class="m-tel-box">
                        <div class="u-tit"><i class="iconfont icon-biaoqianlanbodianhua"></i>售后客服电话</div>
                        <p class="u-tel">{{serviceTel}}</p>
                        <p class="u-txt">免费咨询（咨询、投诉、建议）</p>
                        <p class="u-txt">周一至周六 9:00-18:00（工作时间）</p>
                    </div><!-- 联系方式 -->
                </div><!-- 底部主要内容 -->
                <div class="m-ft-cprt">
                    <div class="m-info">
                        <template v-for="(item,index) in cprtInfo">
                            <span class="span" :class="{'last':index==cprtInfo.length-1}">{{item}}</span>
                        </template>
                        <span></span>
                    </div>
                    <div class="m-pic">
                        <template v-for="(item,index) in cprtImgs">
                            <a :href="item.href?item.href:'javascript:;'" class="u-lk" :class="{'last':index==cprtInfo.length-1}">
                                <img class="u-pic" :src="item.imgUrl" :alt="item.title"/>
                            </a>
                        </template>
                    </div>
                </div><!-- 版权声明模块 -->
                
            </section>
        </div><!-- 网站底部 -->
	</div>
</template>

<script>

    // 获取底部的本地相关数据
    import * as footData from "api/localJson/foot.js"

    export default {
    	name: 'footer',
    	data () {
    		return {
                serviceTel: "400-900-9936",
                cprtInfo: footData.cprtInfo,           // 版权信息
                lkInfoItems: footData.lkInfoItems,     // 底部链接区
                cprtImgs: footData.footCprtImgItems,   // 诚信网站图片
    		}
    	},
        mounted(){

        },
    }
</script>

<!-- 限定作用域 -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import './footer.styl'
</style>