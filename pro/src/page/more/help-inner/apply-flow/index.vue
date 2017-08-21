<!--  
 **  @description 网站更多功能 - 认证流程及审批
 --> 

<template>
    <div class="applyFlow">
        
        <!-- 关于我们内容的布局组件 -->
        <about-layout
            title="认证流程及审批"
            >
            <p class="">认证流程及审批</p>
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
