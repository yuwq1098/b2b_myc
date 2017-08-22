<!--  
 **  @description 网站更多功能 - 隐私保护承诺
 --> 

<template>
    <div class="privacy">
        
        <!-- 关于我们内容的布局组件 -->
        <about-layout
            title="隐私保护承诺"
            >
            <div class="m-help-con">
                <p class="u-article"
                    >隐私权是每个人的重要权利，木有 · 车公司非常重视用户个人信息和隐私的保护。在使用木有 · 车公司的网站、产品和服务前，请您务必仔细阅读并透彻理解本《隐私政策》。一旦您选择使用或继续使用，即表示您认可并接受本《隐私政策》现有内容及其可能随时更新的内容，同意我们按照本《隐私政策》收集、使用、披露、储存和分享，或以其他方式运用您的相关信息。
                </p>

                <div class="m-info-box">
                    
                    <div class="u-gp">
                        <h5 class="tit">信息收集</h5>
                        <h6 class="subtit">您提供的信息</h6>
                        <p class="desc">我们会对您直接提供的信息进行保存。比如：我们会记录您的注册信息，寻求客服或者其他和我们沟通的记录。记录信息的种类包括：用户基本信息（姓名、邮箱和图片）、公司信息、财务信息（您的交易帐户）以及其他您选择提供的信息。</p>

                        <h6 class="subtit">使用服务自动收集的信息</h6>
                        <p class="desc">当你接触或者使用我们的服务时，我们将自动收集您的信息包括： Log 信息（我们记录所有您使用服务时的log信息，包括浏览器信息、使用时间、浏览的网页、IP地址、及来源）。</p>
                        <p class="desc">Cookies和其他跟踪技术的信息：我们使用多种技术记录信息，包括但不限于：向您的电脑或移动设备种cookies。Cookies是一些存在您的硬件上的小数据包，用以帮助我们提高服务的质量及您的使用体验，了解在哪些区域和功能上受欢迎，以及统计流量等。</p>
                    </div>

                    <div class="u-gp">
                        <h5 class="tit">信息使用</h5>
                        <h6 class="subtit">我们将您的信息用于以下用途：</h6>
                        <p class="desc">提供、维护和改善我们的服务；</p>
                        <p class="desc">发送技术通知、系统更新、安全警告、支持和管理信息；</p>
                        <p class="desc">回应您的意见、问题和要求，并提供客户服务；</p>
                        <p class="desc">统计车商活跃度及使用趋势；</p>
                        <p class="desc">联系、结合其他途径的信息，帮助更好理解用户需求，提供更好的服务；</p>
                        <p class="desc">联系、结合其他途径的信息，帮助更好理解用户需求，提供更好的服务；</p>
                        <p class="desc">其他相关信息采集的用途。</p>
                    </div>

                    <div class="u-gp">
                        <h5 class="tit">用户安全措施</h5>
                        <p class="desc">木有 · 车（muyouche.com）会采取合理的手段来保护您的信息，防止丢失、误用、窃取等。</p>
                    </div>

                    <div class="u-gp">
                        <h5 class="tit">Cookies及本地存储LocalStorge</h5>
                        <p class="desc">大部分浏览器默认接受cookies和本地存储localStroge，您也可以在浏览器删除或者禁止cookies及本地存储localstroge。</p>
                        <p class="desc">请注意如果选择删除或禁止cookies及本地存储localstroge，将会影响到对我们服务的正常使用。</p>
                    </div>
                    
                    <div class="u-gp">
                        <h5 class="tit">联系我们</h5>
                        <h6 class="subtit">如果您有任何关于隐私协议的问题，请联系我们：</h6>
                        <p class="desc">木有车公司技术邮箱：<em class="vital">support@muyouche.com</em></p>
                        <p class="desc">技术维护人员邮箱：<em class="vital">1098654043@qq.com</em></p>

                    </div>
                    

                </div>

            </div>
        </about-layout>

    </div>
</template>

<script>
    
    // 网站更多功能内容布局组件
    import aboutLayout from 'page/more/common/layout/index.vue' 

    export default {
        name: "privacy",
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
