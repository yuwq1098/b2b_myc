<!--  
 **  @description 网站更多功能 - 我们是谁
 --> 

<template>
	<div class="who">
        
        <!-- 关于我们内容的布局组件 -->
        <about-layout
            title="我们是谁"
            >
            <div class="m-about-con">
                <p class="u-article"
                    >木有 · 车，隶属于<em class="vital">南昌小目标车网科技发展股份有限公司</em>，是一家以新型经营模式为核心，精心打造<em class="vital">电子商务汽车服务平台</em>的互联网企业。随着信息科技的迅猛发展，互联网已成为人们生活必不可少的有效载体，网络消费正空前改变着大家的生活习惯，电子商务平台已逐渐成为人们消费模式的主体。公司创始人积累了<em class="vital">13年</em>丰富的汽车服务运营经验，独立培养出一支专业的技术开发团队，联手强大的模拟股东团队和精诚合作的业务团队，创新了一个新型的汽车服务模式。
                </p>
                <p class="u-article"
                    >木有 · 车，创造了一个让用户享优惠，商家得实惠，创客好机会的<em class="vital">互联网+</em>高效汽车服务共享平台。</p>
            </div>
        </about-layout>

	</div>
</template>

<script>
    
    // 网站更多功能内容布局组件
    import aboutLayout from 'page/more/common/layout/index.vue' 

    export default {
        name: "who",
        // 在当前模块注册组件
        components:{
            aboutLayout,
        },
        // 数据
        data() {
            return{
                
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
