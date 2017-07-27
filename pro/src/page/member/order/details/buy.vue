<template>
    <div class="buyOrderDetails">
        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="我的订单"
            >
            <div slot="content">
                
                <member-inner>
                    <div class="m-buy-order">
                        
                        <div class="m-hd">
                            <div class="m-progress">
                                进度
                            </div><!-- 订单进度 -->
                            <div class="m-statusText">
                                <div class="u-txt-box">订单状态说明订单状态说明订单状态说明订单状态说明订单状态说明订单状态说明订单状态说明订单状态说明订单状态说明订单状态说明订单状态说明订单状态说明</div>
                            </div><!-- 订单状态说明 -->
                            <div class="m-operate-box f__clearfix">
                                
                                <template v-if="orderData.status==1"
                                    >
                                    <a class="u-btn v2" title="签署合同"
                                        @click="signContract(orderData.id)"
                                        >签署合同</a>
                                </template>

                                <template v-if="orderData.status==2"
                                    >
                                    <a class="u-btn v2" title="支付保证金"
                                        @click="payDeposit(orderData.id)"
                                        >支付保证金</a>
                                </template>

                                <template v-if="orderData.status==4"
                                    >
                                    <a class="u-btn v2" title="支付尾款"
                                        @click="finalPay(orderData.id)"
                                        >支付尾款</a>
                                </template>

                                <template v-if="orderData.status==6"
                                    >
                                    <a class="u-btn v2" title="确认签收"
                                        @click="signOff(orderData.id)"
                                        >确认签收</a>
                                </template>

                                <template v-if="orderData.status>=0&&
                                        orderData.status<=6"
                                    >
                                    <a class="u-btn" title="取消订单"
                                        @click="cancelOrder(orderData.id,orderData.status)" 
                                        >取消订单</a>
                                </template>

                                <template v-if="orderData.status>=0&&
                                        orderData.status<=6"
                                    >
                                    <a class="u-btn" title="申请维权"
                                        @click="safeguard(orderData.id)"
                                        >申请维权仲裁</a>
                                </template>

                            </div><!-- 操作区域 -->
                        </div><!-- 头部 -->
                        
                        <div class="m-con">
                            <div class="u-part m-seller-info">
                                <div class="u-tit"
                                    ><span class="tit">卖家信息</span>
                                </div><!-- 标题 -->
                                <div class="u-con">
                                    <ul class="u-lst f__clearfix">
                                        <li class="u-item">
                                            <span class="attr">卖家：</span>
                                            <span class="data">{{sellerData.contacter}}</span>
                                        </li>
                                        <li class="u-item">
                                            <span class="attr">车行名称：</span>
                                            <span class="data">{{sellerData.cdgName}}</span>
                                        </li>
                                        <li class="u-item">
                                            <span class="attr">联系方式：</span>
                                            <span class="data">{{sellerData.tel}}</span>
                                        </li>
                                    </ul>
                                </div><!-- 内容 -->
                            </div><!-- 卖家信息 -->
                            <div class="u-part m-order-info">
                                <div class="u-tit"
                                    ><span class="tit">订单信息</span>
                                </div><!-- 标题 -->
                                <div class="u-con">
                                    <div class="order-info">
                                        <div class="u-line">
                                            <div class="attr">订单编号：</div>
                                            <div class="data">{{orderData.id}}</div>
                                        </div>
                                        <div class="u-line">
                                            <div class="attr">创建时间：</div>
                                            <div class="data">{{orderData.createTime}}</div>
                                        </div>
                                    </div><!-- 订单信息 -->
                                    <div class="product-info">
                                        <div class="u-pic-box">
                                            <div class="u-pic">
                                                <img :src="orderData.imgUrl" :alt="orderData.carTitle"/>
                                            </div>
                                        </div><!-- 图片容器 -->
                                        <div class="info-con">
                                            <div class="u-title"
                                                >{{orderData.carTitle}}
                                            </div>
                                            <div class="u-other"
                                                >   <span class="attr">车辆所在地</span>
                                                    <span class="data">{{orderData.inCity}}</span>

                                                    <span class="cut">|</span>
                                                  
                                                    <span class="attr">上牌时间</span>
                                                    <span class="data">{{orderData.plateDate | dateYearFormat}}</span>

                                                    <span class="cut">|</span>

                                                    <span class="attr">表显里程</span> 
                                                    <span class="data">{{orderData.mileage | mileFn(2)}}</span>
                                            </div>
                                            <div class="u-other"
                                                >   <span class="attr">排放标准</span>
                                                    <span class="data">{{basicInfo.dischargeStandard}}</span>

                                                    <span class="cut">|</span>
                                                  
                                                    <span class="attr">营运类型</span>
                                                    <span class="data">{{basicInfo.serviceType}}</span>

                                                    <span class="cut">|</span>
                                                    
                                                    <span class="attr">牌照归属地</span> 
                                                    <span class="data">{{basicInfo.inProvince}}</span>
                                            </div>
                                            <div class="u-price"
                                                >订单总额：
                                                <span class="price">
                                                    <em class="vital">{{orderData.price | priceFormat(2)}}</em>万元
                                                </span>
                                            </div>
                                        </div><!-- 信息内容 -->
                                    </div><!-- 商品信息 -->
                                </div><!-- 内容 -->
                            </div><!-- 订单信息 -->
                        </div><!-- 内容 -->

                    </div><!-- 买车订单 -->
                </member-inner>

            </div><!-- 买车订单详情内容 -->
        </member-layout>
    </div>
</template>


<script>
    
    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // 工具类
    import {dataToJson} from "assets/js/util.js"
    // 订单信息的构造类
    import {orderInfo} from 'base/class/order.js'
    // 卖家车行信息的构造类
    import {basicInfo,otherInfo} from 'base/class/carDetails.js'

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue'
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue' 

    export default {
        
        name: "buyOrderDetails",
        // 在当前模块注册组件
        components:{
            memberLayout,
            memberInner,
        },
        // 数据
        data() {
            return{
                // 订单ID
                orderId: 0,
                // 订单详情信息
                orderData: new orderInfo({}),
                // 车辆基本信息
                basicInfo:{},
                // 卖家车行信息
                sellerData: {},
            }
        },
        //生命周期,开始的时候
        created(){
            
        },
        mounted(){

        },
        activated(){
            // 获取hash 带参中的订单ID
            this.orderId = this.$router.currentRoute.query.cid;

            // 获取订单详情信息
            this.getOrderDetail();
        },
        // 退出的生命周期钩子
        deactivated(){

        },
        // 属性值计算
        computed:{

        },
        // 数据侦听
        watch:{

        },
        // 自定义函数(方法)
        methods: {

            // 格式化订单信息
            _normalizeOrderInfo(data) {
                return new orderInfo(data);
            },

            // 获取订单详情
            getOrderDetail(){
                var data = {
                    OrderId : this.orderId,
                }
                api.getB2BOrderDetail(data).then((res) => {
                    if(res.code==SYSTEM.CODE_IS_OK){

                        this.orderData = this._normalizeOrderInfo(res.data[0]);
                        // 获取卖家车行信息
                        this.getCarDetailsInfo(this.orderData.carId);
                        console.log("订单信息",dataToJson(this.orderData));

                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '信息获取失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            },

            // 格式化车辆基本信息
            _normalizeBasicInfo(data) {
                return new basicInfo(data);
            },
            
            // 格式化车辆其他信息
            _normalizeOtherInfo(data) {
                return new otherInfo(data);
            },

            // 卖家车行信息
            getCarDetailsInfo(carId){
                var data = {
                    CarId : carId,
                }
                api.getCarDetalis(data).then((res) => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        
                        // 获取车辆详情基本信息
                        this.basicInfo = this._normalizeBasicInfo(res.data.CarInfo)
                        console.log("车辆详情信息",dataToJson(this.basicInfo));
                        // 获取车辆其他相关信息
                        this.sellerData = this._normalizeOtherInfo(res.data.OtherInfo);
                        console.log("卖家车行信息",dataToJson(this.sellerData));

                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '信息获取失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            },
            
            // 取消订单
            cancelOrder(id,status){
                let addStr = (status>2)?'，以及3000元交易保证金':''
                this.$confirm('您正在进行取消订单的操作，取消订单成功后，我司平台将会扣除您一定的信誉保证金'+addStr+'，请认真考虑后再确认取消订单！', '取消订单提示', {
                        confirmButtonText: '继续取消订单',
                        cancelButtonText: '再考虑看看',
                        type: 'warning'
                    }).then(() => {
                        this.cancelBuyOrder(id);
                    }).catch(() => {
                        
                    });
            },
            
            // 买方强制取消订单
            cancelBuyOrder(orderId){
                let data = {
                    OrderId: orderId,
                    OrderStatus: "-2",
                }
                api.changeB2BOrderStatus(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.$notify({
                            title: '成功取消订单',
                            message: "您已成功取消订单，平台将自动扣取您一定的信誉保证金，祝您生活愉快！",
                            type: 'success',
                            duration: 2000,
                        });
                        console.log("取消订单")
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '取消订单失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            },

            // 申请维权
            safeguard(id){
                console.log("申请维权");
            },
            // 买家签合同
            signContract(id){
                this.$router.push({path:'/member/contractBuy',query:{cid:id}})
            },
            // 支付保证金
            payDeposit(id){
                this.$router.push({path:'/member/orderPay',query:{cid:id,auth:'buyer'}})
            },
            // 支付托管车款(尾款)
            finalPay(id){
                this.$router.push({path:'/member/fullPayout',query:{cid:id}})
            },
            // 确认签收
            signOff(id){
                this.$router.push({path:'/member/signOff',query:{cid:id}})
            },

        },
        
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'buy.styl'
</style>
