<!--  
 **  @description 网站更多功能 - 认证流程及审批
 --> 

<template>
    <div class="applyFlow">
        
        <!-- 关于我们内容的布局组件 -->
        <about-layout
            title="认证流程及审批"
            >
            <div class="m-help-con">
                <p class="u-article"
                    ><span class="u-no"></span>前往会员中心--<router-link class="u-lk" title="立即前往认证中心" :to="'/member/applyHome'" tag="a">车商认证</router-link>。
                </p>
                <p class="u-article"
                    ><span class="u-no"></span>按要求填写资料并上传，企业车商认证需要额外上传营业执照。根据木有车隐私保护承诺，您的认证信息将绝对安全，不会泻露给第三方<router-link class="u-lk" title="查看隐私保护承诺" :to="'/helpCenter/privacy'" tag="a">《隐私保护承诺》</router-link>。
                </p>
                <p class="u-article"
                    ><span class="u-no"></span>提交认证后，请耐心等待审核，审核通常需要1~3个工作日，如需加急请拨打客服热线<em class="vital">400-900-9936</em>。我们将通知审核的工作人员为您加快审核进程。
                </p>
                <p class="u-article"
                    ><span class="u-no"></span>若我司平台发现您的认证信息存在虚假伪造，您的审核将不会被通过，并予以警告；情节严重者，平台将永不允其入驻。同时，我们希望您上传的图片尽量保持清晰，光线明亮，这也必将对您的信息审核有影响。
                </p>
                <p class="u-article"
                    ><span class="u-no"></span>通过认证后，您将享有木有车认证车商的特有标识，办理平台业务。需要说明的是，B2B平台大部分业务是需要先交纳一定的信誉保证金才可以使用，我们衷心希望您能在平台诚信交易，也希望能给您带来良好的交易体验。如您还有其他疑问，欢迎咨询我们的客服电话，另外，也希望您能对我们平台提出宝贵的<router-link class="u-lk" title="打开意见反馈" :to="'/about/feedback'" tag="a">意见反馈</router-link>。
                </p>
            </div>
        </about-layout>

    </div>
</template>

<script>
    
    // 网站更多功能内容布局组件
    import aboutLayout from 'page/more/common/layout/index.vue' 

    export default {
        name: "applyFlow",
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
