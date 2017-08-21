<!--  
 **  @description 网站更多功能 - 隐私保护承诺
 --> 

<template>
    <div class="privacy">
        
        <!-- 关于我们内容的布局组件 -->
        <about-layout
            title="隐私保护承诺"
            >
            <p class="">隐私保护承诺</p>
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
