<template>
	<div class="personalSetting">

        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="个人资料设置"
            >
            <div slot="content">
                <member-inner>
                    <p>个人资料设置</p>
                </member-inner>
            </div><!-- 个人资料设置内容 -->
        </member-layout>

	</div>
</template>

<script>
    
    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue' 
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue' 

	export default {
        name: "personalSetting",
        // 在当前模块注册组件
        components:{
            memberLayout,
            memberInner,
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
