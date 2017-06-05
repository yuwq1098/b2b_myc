<template>
	<div class="myWallet">
        <div class="g-mn-con">
            <m-head>我的钱包</m-head>
            <m-hint>
                <p>说明：电脑端暂不支持提现。如需提现，请到<em class="u-vital">“木有车app-我的-我的钱包”</em>中进行提现。<a class="u-vital">木有车app下载链接&gt;&gt;</a></p>
            </m-hint><!-- 提示 -->

            <div class="m-wallet-con f__clearfix">
                <div class="m-info-box f__fl">
                    <div class="u-info">您当前账户的钱包余额为<span class="u-vital">5050.00</span>元，已冻结金额为<span class="u-vital">0.00</span>元。</div><!-- 信息 -->
                    <div class="u-explain">钱包余额是您在木有车上交易所的金额，粉丝收益以及返利，可用于支付的金额。</div><!-- 提示说明 -->
                </div>
                <router-link :to="{path:'/member/wallet/bill'}" class="u-btn f__fl" tag="button" title="查看详细账单">查看详细账单</router-link>
            </div><!-- 钱包信息 -->

        </div>
	</div>
</template>

<script>
    import MHint from "components/base/mHint.vue"
    import MHead from "components/base/memberHd.vue"

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
            MHint,
            MHead,
        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import './wallet.styl'
</style>
