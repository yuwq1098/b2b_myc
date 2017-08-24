<!--  
 **  @description 网站更多功能 - 交易流程详解
 --> 

<template>
    <div class="dealFlow">
        
        <!-- 关于我们内容的布局组件 -->
        <about-layout
            title="B2B交易规则"
            >
            <div class="m-help-con">
                <p class="u-article"
                    ><span class="u-no"></span>进入二手车B2B大厅须进行商家认证，并交付<em class="vital">{{creditText}}</em>信誉保证金，信誉保证金是对买卖双方的信誉保障，只要你发布的车辆不在买卖车辆的交易状态，或者在B2B批发大厅没有车辆上架的情况下，你的信誉保证金可以随时随地提现。
                </p>
                <p class="u-article"
                    ><span class="u-no"></span>B2B批发大厅每成交一辆二手车买卖双方平台各收取200元交易费，交易费是买卖双方上家与平台平分。
                </p>
                <p class="u-article"
                    ><span class="u-no"></span>在B2B批发大厅里，卖方同一天同一辆车只能发布一次车源信息。
                </p>
                <p class="u-article"
                    ><span class="u-no"></span>买方在B2B批发大厅里秒杀车辆成功后，由于自身原因取消订单，那么买方将承担违约责任，平台将从买方所交的信誉保证金中扣除200元用于赔付给发布车辆信息的卖方。
                </p>
                <p class="u-article"
                    ><span class="u-no"></span>卖方在B2B批发大厅里发布的二手车，若在线下或其他渠道已经售出，必须立即在B2B批发大厅（注：车辆管理页面）里选择下架，否则一旦被买方在B2B批发大厅里秒杀成功，卖方将承担违约责任，平台将从卖方所交的<em class="vital">{{creditText}}</em>信誉保证金中扣除200元用于赔付给买方。
                </p>
                <p class="u-article"
                    ><span class="u-no"></span>在B2B批发大厅里买卖双方协商好后，需在平台上签署车辆电子买卖合同，在合同中声明车况，是否需要平台托管尾款，以及平台托管尾款的金额。车辆电子买卖合同签署成功后，双方均需在平台上缴纳3000元的交易保证金。交易保证金由买方发起，当买方缴纳3000元交易保证金后，若卖方不缴纳3000元交易保证金或由于自身原因取消订单，卖方将承担违约责任，平台将从卖方所交<em class="vital">{{creditText}}</em>信誉保证金中扣除200元用于赔付给买方，买方已缴纳3000元的交易保证金退回到平台上你的个人钱包余额里，买方可随时随地提现或用于平台上其他交易。
                </p>
                <p class="u-article"
                    ><span class="u-no"></span>买卖双方各缴纳3000元交易保证金后，若买方在交易中，发现卖方发布的车辆信息与签订合同描述不一致，买家可在平台申请维权，经平台仲裁审核确定卖方违约后，平台将扣除卖家所交的3000元交易保证金全额赔付给守约方（买方）。反之，买卖双方各缴纳3000元交易保证金后，如果在交易中，卖方所发布的车辆信息与签订合同描述的一致，这个时候买方由于由于自身原因取消订单，卖方可在平台申请维权，经平台仲裁审核确定买方违约后，平台将扣除买方所交的3000元交易保证金全额赔付给守约方（卖方）。
                </p>
                <p class="u-article"
                    ><span class="u-no"></span>买卖双方顺利成交后，双方已缴纳的3000元交易保证金各自退回到平台上你的个人钱包余额里，平台将自动扣除买卖双方各200元交易费，剩余交易保证金买卖双方可随时提现或用于平台上其他交易。 木有车首创全国二手车B2B批发大厅杜绝了一切车辆虚假信息的发布，只要商家发布的车辆信息存在虚假，您的交易保证金就会被扣除用于全额赔付给守约的一方，最大的保障了买卖双方的合法权益。 特别声明：本规则为B2B批发大厅专用规则，若本规则与木有车平台《合作商家协议》不一致的，以本规则为准。 （最终解释权归南昌小目标车网科技发展股份有限公司所有）
                </p>
            </div>
        </about-layout>

    </div>
</template>

<script>
    
    // 网站更多功能内容布局组件
    import aboutLayout from 'page/more/common/layout/index.vue' 
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'

    export default {
        name: "dealFlow",
        // 在当前模块注册组件
        components:{
            aboutLayout,
        },
        // 数据
        data() {
            return{
                // 支付信誉保证金提示文本
                creditText: SYSTEM.DEAL_CREDIT_TEXT,
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
