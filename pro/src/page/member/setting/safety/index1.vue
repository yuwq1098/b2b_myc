<template>
	<div class="safetySetting">

        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="安全中心"
            >
            <div slot="content">

                <div class="m-safety-con">
                    <transition name="fade" mode="in-out">
                        <router-view></router-view>
                    </transition>
                </div>

            </div><!-- 安全中心内容 -->
        </member-layout>
        
	</div>
</template>

<script>

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue' 

	export default {
        name: "safetySetting",
        // 在当前模块注册组件
        components:{
            memberLayout,
        },
        created(){
            console.log(this.$router)
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
    .m-safety-con
        margin 60px 40px 40px
</style>
