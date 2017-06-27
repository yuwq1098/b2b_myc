<template>
    <div class="memberHome">
        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="我的主页"
            >
            <div slot="content">
                会员中心主页

            </div><!-- 会员中心主页内容 -->
        </member-layout>
    </div>
</template>

<script>

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue' 

    export default {
        
        name: "memberHome",
        // 在当前模块注册组件
        components:{
            memberLayout,
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
