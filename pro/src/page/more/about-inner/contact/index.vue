<!--  
 **  @description 网站更多功能 - 联系我们
 --> 

<template>
	<div class="contact">
        
        <!-- 关于我们内容的布局组件 -->
        <about-layout
            title="联系我们"
            >
            <p class="">联系我们</p>
        </about-layout>

	</div>
</template>

<script>
    
    // 网站更多功能内容布局组件
    import aboutLayout from 'page/more/common/layout/index.vue' 

    export default {
        name: "contact",
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
