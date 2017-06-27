<template>
    <div class="merchantCollect">

        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="车行收藏"
            >
            <div slot="content">
                车行收藏内容

            </div><!-- 车行收藏内容 -->
        </member-layout>
        
    </div>
</template>

<script>

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue' 

    export default {

        name: "merchantCollect",
        // 在当前模块注册组件
        components: {
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
