<template>
    <div class="buyOrder">
        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="我的订单"
            >
            <div slot="content">
                
                <member-inner>
                    <div class="m-order-con">
                        <div class="m-tab-box">
                            <ul class="m-tab-lst f__clearfix">
                                <li class="m-item">
                                    <a href="javascript:;"
                                        class="u-tab-lk">全部订单
                                    </a>
                                </li>
                                <li class="m-item">
                                    <a href="javascript:;"
                                        class="u-tab-lk">带卖方发起合同
                                    </a>
                                </li>
                                <li class="m-item">
                                    <a href="javascript:;"
                                        class="u-tab-lk">待签署合同
                                    </a>
                                </li>
                                <li class="m-item">
                                    <a href="javascript:;"
                                        class="u-tab-lk">待支付保证金
                                    </a>
                                </li>
                                <li class="m-item">
                                    <a href="javascript:;"
                                        class="u-tab-lk">待卖方支付保证金
                                    </a>
                                </li>
                                <li class="m-item">
                                    <a href="javascript:;"
                                        class="u-tab-lk">待支付托管车款
                                    </a>
                                </li>
                                <li class="m-item">
                                    <a href="javascript:;"
                                        class="u-tab-lk">待卖方过户
                                    </a>
                                </li>
                                <li class="m-item">
                                    <a href="javascript:;"
                                        class="u-tab-lk">待验收
                                    </a>
                                </li>
                                <li class="m-item">
                                    <a href="javascript:;"
                                        class="u-tab-lk">过户成功
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="m-tab-wrap">

                        </div>
                    </div>
                </member-inner>

            </div><!-- 买车订单内容 -->
        </member-layout>
    </div>
</template>

<script>

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue'
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue' 

    export default {
        
        name: "buyOrder",
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
