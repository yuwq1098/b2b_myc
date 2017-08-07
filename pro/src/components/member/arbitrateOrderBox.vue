<!--  
 **  @description 订单信息盒子组件
 --> 

 <template>
    <div class="arbitrateOrderBox">
        <div class="m-order-box">
            <div class="m-info-hd f__clearfix">
                <div class="u-item no">
                    订单号：
                    <a class="u-lk"
                        @click="enterDetails(orderInfo.id)"
                        title="查看仲裁详情"
                        >
                        <em class="vital">{{orderInfo.id}}</em>
                    </a>
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
                <template v-if="auth=='buyer'">
                    <div class="u-item seller-name"
                        >卖家：{{orderInfo.sellerName}}<em class="vital">（{{orderInfo.sellerTel}}）</em>
                    </div>
                </template>
                <template v-else-if="auth=='seller'">
                    <div class="u-item seller-name"
                        >买家：{{orderInfo.buyerName}}<em class="vital">（{{orderInfo.buyerTel}}）</em>
                    </div>
                </template>
                
            </div><!-- 订单信息头部 -->
            <div class="m-info-con">
                <div class="m-order-info">
                    <a class="u-box-lk"
                        @click="enterDetails(orderInfo.id)"
                        title="查看仲裁详情"
                        >
                        <div class="u-pic">
                            <img v-lazy="orderInfo.imgUrl" :alt="orderInfo.carTitle"/>
                        </div>
                        <div class="u-con">
                            <div class="tit">{{orderInfo.carTitle}}</div>
                            <div class="city">
                                <span>{{orderInfo.inCity | addressFormat}}</span>
                                
                            </div>
                            <div class="other">{{orderInfo.plateDate | dateFn}} · {{orderInfo.mileage | mileFn(2)}}</div>
                        </div>
                    </a>
                </div><!-- 车辆信息 -->

                <div class="m-status">
                    <div class="u-status-desc">{{orderInfo.orderDesc}}</div><!-- 订单状态描述 -->
                </div><!-- 订单状态 -->

                <div class="m-price">
                    <div class="u-price">
                        <span class="price">订单总额：
                            <em class="vital"
                                >{{orderInfo.price | priceFormat(2)}}</em>
                            <em class="unit">万元</em>
                        </span>
                    </div><!-- 成交价 -->
                </div><!-- 订单总额 -->

            </div><!-- 订单信息内容 -->
        </div>
    </div>
</template>

<script>
    
    // 订单信息的构造类
    import {orderInfo} from 'base/class/order.js'

    export default {

        name: "arbitrateOrderBox",
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
                    return new orderInfo({})   
                },
            },
            // 买/卖家身份
            auth: {
                type: String,
                default: "",
            }
        },

        // 自定义函数(方法)
        methods: {
            // 进入维权详情
            enterDetails(orderId){
                if(this.auth=='buyer'){
                    this.$router.push({path:'/member/arbitrateBuy',query:{cid:orderId}})
                }else if(this.auth=='seller'){
                    this.$router.push({path:'/member/arbitrateSell',query:{cid:orderId}})
                }
                return;
                
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
                width 488px
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
                            _completeCenter(0,auto)
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
                    &:hover
                        .u-con
                            .tit
                                color #222
                                text-decoration underline

            .m-status
                width 235px - 10px
                height 102px
                padding 0 5px
                _completeCenter(503px,auto)
                text-align right
                .u-status-desc
                    font-size 16px
                    padding 30px 0 0
                    text-align center
                    height 28px
                    line-height 28px
            .m-price
                width 210px - 20px
                height 102px
                padding 0 15px 0 5px
                _completeCenter(auto,0)
                .u-price
                    height 32px
                    line-height @height
                    text-align right
                    _completeCenter(auto,15px,auto,0)
                    .price
                        .vital
                            color #ff6533
                            font-size 20px
                            margin 0 3px 0 1px
                        .unit
                            color #ff6533
                            font-size 12px

</style>
