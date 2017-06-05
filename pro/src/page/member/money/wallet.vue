<template>
	<div class="myWallet">
        <p>我是我的钱包页面</p>
	    <router-link :to="{path:'/member/wallet/bill'}">前往账单详情页</router-link>
        
	</div>
</template>

<script>
	export default {
        name: "myWallet",
        // 数据
        data() {
            return{
                
            }
        },
        // 自定义函数(方法)
        methods: {
            
        },
        // 在当前模块注册组件
        components:{

        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import './wallet.styl'
</style>
