<!--  
 **  @description 订单信息盒子组件
 --> 

 <template>
    <div class="buyOrderBox">
        <div class="m-order-box">
            <div class="m-info-hd f__clearfix">
                <div class="u-item no">
                    订单号：
                    <router-link
                        :to="{path:'/member/buyOrderDetails',query:{cid:orderInfo.id}}"
                        class="u-lk" 
                        title="查看订单详情"
                        >
                        <em class="vital">{{orderInfo.id}}</em>
                    </router-link>
                </div>
                <div class="u-item create-time"
                    v-if="orderInfo.status!=7"
                    >
                    创建时间：{{orderInfo.createTime}}
                </div>
                <div class="u-item create-time"
                    v-if="orderInfo.status==7"
                    >
                    交易完毕：{{orderInfo.statusTime}}
                </div>
                <div class="u-item seller-name">
                    卖家：{{orderInfo.sellerName}}<em class="vital">（{{orderInfo.sellerTel}}）</em>
                </div>
            </div><!-- 订单信息头部 -->
            <div class="m-info-con">
                <div class="m-order-info">
                    <router-link
                        :to="{path:'/member/buyOrderDetails',query:{cid:orderInfo.id}}"
                        class="u-box-lk"
                        :title="orderInfo.carTitle"
                        tag="a"
                        >
                        <div class="u-pic">
                            <img v-lazy="orderInfo.imgUrl" :alt="orderInfo.carTitle"/>
                        </div>
                        <div class="u-con">
                            <div class="tit">{{orderInfo.carTitle}}</div>
                            <div class="city">
                                <span>{{orderInfo.inCity | addressFormat}}</span>
                                <span class="price">订单总额：
                                    <em class="vital"
                                        >{{orderInfo.price | priceFormat(2)}}</em>
                                    <em class="unit">万元</em>
                                </span>
                            </div>
                            <div class="other">{{orderInfo.plateDate | dateFn}} · {{orderInfo.mileage | mileFn(2)}}</div>
                        </div>
                    </router-link>
                </div><!-- 车辆信息 -->
                <div class="m-pay-info">
                    <div class="u-line u-money"
                        v-if="orderInfo.status==4||
                                orderInfo.status==5||
                                orderInfo.status==6||
                                orderInfo.status==7"
                        >
                        <div class="data">￥<em class="vital">{{orderInfo.price | priceFormat(2)}}</em>万元</div>
                        <p class="tips">
                            <template
                                v-if="orderInfo.status==4"
                                >（共需支付）
                            </template>
                            <template
                                v-if="orderInfo.status==5||
                                        orderInfo.status==6||
                                        orderInfo.status==7"
                                >（已支付尾款）
                            </template>
                        </p>
                    </div><!-- 支付金额 -->

                    <div class="u-line u-deposit">
                        <div class="data">￥<em class="vital">3000</em>元</div>
                        <p class="tips">
                            <template
                                v-if="orderInfo.status==0||
                                        orderInfo.status==1||
                                        orderInfo.status==2"
                                >（需支付保证金）
                            </template>
                            <template
                                v-if="orderInfo.status>2&&
                                    orderInfo.status<=7"
                                >（已支付保证金）
                            </template>
                        </p>
                    </div><!-- 支付金额 -->

                </div><!-- 支付信息 -->

                <div class="m-status">
                    <div class="u-status-desc">{{orderInfo.statusDesc}}</div><!-- 订单状态描述 -->
                    <div class="u-enter">
                        <router-link
                            :to="{path:'/member/buyOrderDetails',query:{cid:orderInfo.id}}"
                            class="u-lk" 
                            title="查看订单详情"
                            >查看订单详情
                        </router-link>
                    </div>
                </div><!-- 交易状态 -->

                <div class="m-operate">
                    
                    <div class="u-line f__clearfix"
                        v-if="orderInfo.status>=0&&
                            orderInfo.status<=6"
                        >
                        <a class="u-lk" title="取消订单"
                            @click="cancelOrder(orderInfo.id,orderInfo.status)" 
                            >取消订单</a>
                    </div>

                    <!-- <div class="u-line f__clearfix"
                        v-if="orderInfo.status==0||
                            orderInfo.status==1||
                            orderInfo.status==2||
                            orderInfo.status==3||
                            orderInfo.status==4||
                            orderInfo.status==5||
                            orderInfo.status==6"
                        >
                        <a class="u-lk" title="申请维权"
                            @click="safeguard(orderInfo.id)"
                            >申请维权仲裁</a>
                    </div> -->

                    <div class="u-line f__clearfix"
                        v-if="orderInfo.status==1"
                        >
                        <a class="u-lk" title="签署合同"
                            @click="signContract(orderInfo.id)"
                            >签署合同</a>
                    </div>

                    <div class="u-line f__clearfix"
                        v-if="orderInfo.status==2"
                        >
                        <a class="u-lk" title="支付保证金"
                            @click="payDeposit(orderInfo.id)"
                            >支付保证金</a>
                    </div>

                    <div class="u-line f__clearfix"
                        v-if="orderInfo.status==4"
                        >
                        <a class="u-lk" title="支付尾款"
                            @click="finalPay(orderInfo.id)"
                            >支付尾款</a>
                    </div>

                    <div class="u-line f__clearfix"
                        v-if="orderInfo.status==6"
                        >
                        <a class="u-lk" title="确认签收"
                            @click="signOff(orderInfo.id)"
                            >确认签收</a>
                    </div>

                </div><!-- 操作 -->
            </div><!-- 订单信息内容 -->
        </div>
    </div>
</template>

<script>
    
    // 订单信息的构造类
    import {buyOrderInfo} from 'base/class/order.js'

    export default {

        name: "buyOrderBox",
        // 在当前模块注册组件
        components:{

        },
        // 数据
        data() {
            return{
                
            }
        },
        props:{
            // 订单列表信息
            orderInfo:{
                type: Object,
                default(){
                    return new buyOrderInfo({})   
                },
            },
        },

        // 自定义函数(方法)
        methods: {
            // 取消订单
            cancelOrder(id,status){
                this.$emit("cancelOrder",id,status);
            },
            // 申请维权
            safeguard(id){
                this.$emit("safeguard",id);
            },
            // 签合同
            signContract(id){
                this.$emit("signContract",id);
            },
            // 支付保证金
            payDeposit(id){
                this.$emit("payDeposit",id);
            },
            // 支付托管车款(尾款)
            finalPay(id){
                this.$emit("finalPay",id);
            },
            // 确认签收
            signOff(id){
                this.$emit("signOff",id);
            },
        },    
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .m-order-box
        width 948px
        color #4B5861
        .m-info-hd
            width @width - 30px - 2px
            height 30px
            line-height 30px
            background #f0f3f5
            _borderAll(#E0E5E8)
            padding 0 15px
            font-size 12px
            position relative
            .u-item
                float left
                .vital
                    color #2E98E2
                    font-size 13px
                &.no
                    float left
                    .u-lk
                        color #4B5861
                        .vital
                            color #2E98E2
                            text-decoration underline
                            font-size 14px
                            &:hover
                                color @color
                &.create-time
                    _completeCenter(420px,auto,0,auto)
                &.seller-name
                    float right
            &:hover
                .no .u-lk .vital 
                    // color #222
                    text-decoration underline
        .m-info-con
            width @width - 30px - 2px
            height 122px
            padding 0 15px
            background #fff
            margin -1px 0 0
            _borderAll(#E0E5E8)
            _border(top,#E0E5E8)
            position relative
            .m-order-info
                width 360px
                height 102px
                margin 10px 0 0
                position relative
                .u-box-lk
                    _display()
                    width @width
                    height @height
                    position relative
                    .u-pic
                        width 136px
                        height @height
                        _overflow()
                        _completeCenter(0,auto,0,auto)
                        img
                            width @width
                            height auto
                            _completeCenter(0,auto,0,0)
                    .u-con
                        width @width - 136px - 12px
                        height @height
                        margin 0 0 0 136px
                        padding 0 6px
                        color #4B5861
                        .tit
                            height 44px
                            line-height 22px
                            margin 0 0 5px 0
                            padding 4px 0 0
                            _ellipsis(2)
                        .city,.other
                            height 22px
                            line-height 22px
                            color #959595
                            font-size 13px
                        .city
                            .price
                                margin 0 0 0 10px
                                .vital
                                    color #ff6533
                                    font-size 15px
                                .unit
                                    color #ff6533
                                    font-size 12px
                    &:hover
                        .u-con
                            .tit
                                color #222
                                text-decoration underline
            .m-pay-info
                width 165px
                height 102px
                _completeCenter(393px,auto)
                .u-line
                    height 46px
                    padding 3px 0 1px
                    text-align right
                    .data
                        height 28px
                        line-height 22px
                        font-size 12px
                        color #ff6533
                        .vital
                            _display(inline-block)
                            font-size 22px
                            margin 0 3px 0 0
                            _translate3d(0,2px)
                    .tips
                        height 18px
                        line-height 18px
                        color #959595
                        font-size 12px
            .m-status
                width 180px
                height 102px
                _completeCenter(573px,auto)
                text-align right
                .u-status-desc
                    font-size 16px
                    padding 20px 0 0
                    height 28px
                    line-height 28px
                .u-enter
                    height 22px
                    line-height @height
                    margin 4px 0 0
                    .u-lk
                        font-size 13px
                        color $c_blue
                        text-decoration underline

            .m-operate
                width 160px
                height 124px - 12px
                padding 6px 0
                _completeCenter(auto,15px,6px,auto)
                text-align right
                _translate3d(0,-7px)
                .u-line
                    height 28px
                    line-height 28px
                    margin 7px 0 0
                    .u-lk
                        _display(inline-block)
                        height 28px
                        line-height 28px
                        font-size 12px
                        _spacingPlus(2px)
                        float right
                        padding 0 12px
                        background #4B5861 + 25% + 2deg
                        color #e2e2e2
                        &:hover
                            background #4B5861
                    &:nth-child(1)
                        _completeCenter(auto,0,auto,12px)
                    &:nth-child(2)
                        _completeCenter(auto,0,auto,48px)
                    &:nth-child(3)
                        _completeCenter(auto,0,auto,84px)





</style>
