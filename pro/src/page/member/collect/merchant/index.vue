<template>
    <div class="merchantCollect">

        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="车行收藏"
            >
            <div slot="content">
                
                <member-inner>
                    <div class="m-collect-wrap">
                        <ul class="m-merchant-lst f__clearfix">
                            <template v-for="n in 8">
                                <li class="m-item">
                                    <a href="javascript:;" class="u-lk-box" title="进入南昌恒丰车业">
                                        <div class="m-face">
                                            <img :src="userFace" alt="">
                                        </div><!-- 头像 -->
                                        <div class="m-info">
                                            <div class="u-hd f__clearfix">
                                                <p class="u-cdg f__fl">
                                                    南昌恒丰车业</p>
                                                <p class="u-name f__fl"><span class="u-attr">联系人：</span>李勇</p>
                                            </div>
                                            <div class="u-grade f__clearfix">
                                                <p class="volume f__fl">
                                                    <span class="u-attr">成交数：</span><em class="vital">6</em>单
                                                </p>
                                                <p class="grade f__fl">
                                                    <span class="u-attr">评分：</span><em class="vital">4.6</em>分
                                                </p>
                                            </div>
                                            <div class="u-address">
                                                <span class="u-attr">地址：</span>
                                                <em class="address">江西省 · 南昌市 · 洪都北大道李家庄二手车市场</em>
                                            </div>
                                        </div><!-- 车商信息 -->
                                    </a>
                                </li>
                            </template>
                        </ul>
                    </div>
                </member-inner>

            </div><!-- 车行收藏内容 -->
        </member-layout>
        
    </div>
</template>

<script>

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue'
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue' 

    export default {

        name: "merchantCollect",
        // 在当前模块注册组件
        components: {
            memberLayout,
            memberInner,
        },
        // 数据
        data() {
            return{
                userFace: require("assets/img/logos-pic2.png"),
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
