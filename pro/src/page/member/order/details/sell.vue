<template>
    <div class="sellOrderDetails">
        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="我的订单"
            >
            <div slot="content">
                
                <member-inner>
                    <div class="m-sell-order">
                        
                        <div class="m-hd">
                            <div class="m-progress">
                                <div class="progress-wrap"
                                    >
                                    <div class="mark"
                                        :class="{
                                            'v1':orderData.status==0,
                                            'v2':orderData.status==1,
                                            'v3':orderData.status==2,
                                            'v4':orderData.status==3,
                                            'v5':orderData.status==4,
                                            'v6':orderData.status==5,
                                            'v7':orderData.status==6,
                                            'v8':orderData.status==7,
                                            }"
                                        ></div><!-- 车辆 -->
                                    <div class="progress-gray"
                                        >
                                        <div class="progress-bar"
                                            :class="{
                                                'v1':orderData.status==0,
                                                'v2':orderData.status==1,
                                                'v3':orderData.status==2,
                                                'v4':orderData.status==3,
                                                'v5':orderData.status==4,
                                                'v6':orderData.status==5,
                                                'v7':orderData.status==6,
                                                'v8':orderData.status==7,
                                                }"
                                            ></div><!-- 进度条 -->
                                    </div>
                                </div><!-- 进度条容器 -->
                                <div class="progress-info">
                                    <ul class="u-part-lst f__clearfix">
                                        <li class="u-item"
                                            :class="{'on':orderData.status>=0}">
                                            <div class="theNo v1"></div>
                                            <p class="txt">发起合同</p>
                                        </li>
                                        <li class="u-item"
                                            :class="{'on':orderData.status>=1}">
                                            <div class="theNo v2"></div>
                                            <p class="txt">待买方签署合同</p>
                                        </li>
                                        <li class="u-item"
                                            :class="{'on':orderData.status>=3}">
                                            <div class="theNo v3"></div>
                                            <p class="txt">我方支付保证金</p>
                                        </li>
                                        <li class="u-item"
                                            :class="{'on':orderData.status>=5}">
                                            <div class="theNo v4"></div>
                                            <p class="txt">发货（过户）</p>
                                        </li>
                                        <li class="u-item"
                                            :class="{'on':orderData.status==7}">
                                            <div class="theNo v5"></div>
                                            <p class="txt">交易完成</p>
                                        </li>
                                    </ul>
                                </div>
                            </div><!-- 订单进度 -->
                            <div class="m-statusText">
                                <div class="u-txt-box">{{statusText}}</div>
                            </div><!-- 订单状态说明 -->
                            <div class="m-operate-box f__clearfix">
                                
                                <template v-if="orderData.status==0"
                                    >
                                    <a class="u-btn v2" title="发起合同"
                                        @click="sponsorContract(orderData.id)"
                                        >发起合同</a>
                                </template>

                                <template v-if="orderData.status==3"
                                    >
                                    <a class="u-btn v2" title="支付保证金"
                                        @click="payDeposit(orderData.id)"
                                        >支付保证金</a>
                                </template>

                                <template v-if="orderData.status==5"
                                    >
                                    <a class="u-btn v2" title="确认发货"
                                        @click="delivery(orderData.id)"
                                        >确认发货</a>
                                </template>

                                <template v-if="orderData.status>=0&&
                                        orderData.status<=6"
                                    >
                                    <a class="u-btn" title="取消订单"
                                        @click="cancelOrder(orderData.id,orderData.status)" 
                                        >取消订单</a>
                                </template>

                                <template v-if="orderData.status>=1&&
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
                                    ><span class="tit">买家信息</span>
                                </div><!-- 标题 -->
                                <div class="u-con">
                                    <ul class="u-lst f__clearfix">
                                        <li class="u-item">
                                            <span class="attr">买家：</span>
                                            <span class="data">{{orderData.buyerName}}</span>
                                        </li>
                                        <li class="u-item">
                                            <span class="attr">联系方式：</span>
                                            <span class="data">{{orderData.buyerTel}}</span>
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

            </div><!-- 卖车订单详情内容 -->
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
    // 车辆基本信息的构造类
    import {basicInfo} from 'base/class/carDetails.js'

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue'
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue' 

    export default {
        
        name: "sellOrderDetails",
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
            statusText(){
                if(!this.orderData) return "";
                let txt = "";
                switch(this.orderData.status){
                    case 0:
                        return txt = "买方已下单，待发起合同，若您迟迟不发起合同，对方可能会申请仲裁进行维权";
                        break;
                    case 1:
                        return txt = "我方已发起合同，等待对方签署合同，若对方迟迟不签署合同，您可以申请仲裁进行维权";
                        break;
                    case 2:
                        return txt = "待买方(买家)支付保证金，若对方迟迟未支付保证金，您可以申请仲裁维权";
                        break;
                    case 3:
                        return txt = "待我方(卖家)支付保证金，缴纳保证金后，主动强制取消订单的一方将被扣除保证金，作为（守约方）对方的补偿";
                        break;
                    case 4:
                        return txt = "待买方(买家)支付尾款，线下交易自行协商，线上交易（资金将托管至平台，交易完成后，尾款自动转入您的账户）";
                        break;
                    case 5:
                        return txt = "买方确认已付款，待我方（卖家）发货，若您迟迟不出货给对方，对方可能会申请仲裁进行维权";
                        break;
                    case 6:
                        return txt = "待买方(买家)签收，若我方如约发货并且保证车辆无问题，对方却迟迟不签收，您可以申请仲裁维权";
                        break;
                    case 7:
                        return txt = "交易完成，有后续问题，请致电平台客服：400-9009-936";
                        break;
                    return txt;
                }
            }
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

            // 卖家车行信息
            getCarDetailsInfo(carId){
                var data = {
                    CarId : carId,
                }
                api.getCarDetalis(data).then((res) => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        
                        // 获取车辆详情基本信息
                        this.basicInfo = this._normalizeBasicInfo(res.data.CarInfo)

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
            
            // 卖方强制取消订单
            cancelBuyOrder(orderId){
                let data = {
                    OrderId: orderId,
                    OrderStatus: "-1",
                }
                api.changeB2BOrderStatus(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.$notify({
                            title: '成功取消订单',
                            message: "您已成功取消订单，平台将自动扣取您一定的信誉保证金，祝您生活愉快！",
                            type: 'success',
                            duration: 2000,
                        });
                        this.$router.push({path:"/member/sellOrder"})
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

            // 卖家申请维权
            safeguard(id){
                this.$router.push({path:'/member/arbitrateApply',query:{cid:id,auth:'seller'}})
            },

             // 卖家发起合同
            sponsorContract(id){
                this.$router.push({path:'/member/contractSell',query:{cid:id}})
            },
            // 支付保证金
            payDeposit(id){
                this.$router.push({path:'/member/orderPay',query:{cid:id,auth:'seller'}})
            },
            // 确认发货
            delivery(id){
                this.$confirm('确认发货后，请您尽快出货给买方，买方收到交易的车辆后，即完成交易，若买方长时间未收到货或者无法与您取得联系，可能会申请仲裁进行维权！', '您确认发货吗？', {
                        confirmButtonText: '确认发货',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.sellDelivery(id);
                    }).catch(() => {
                        
                    });
            },

            // 卖方确认发货
            sellDelivery(orderId){
                let data = {
                    OrderId: orderId,
                    OrderStatus: "6",
                }
                api.changeB2BOrderStatus(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.$notify({
                            title: '确认发货成功',
                            message: "您已成功确认发货，买家有权发起仲裁维权，为保证您的信誉不受影响，请与买家保持沟通，诚信交易！",
                            type: 'success',
                            duration: 2000,
                        });
                        // 刷新本页数据，获取订单详情信息
                        this.getOrderDetail();
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '确认发货失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            } 
        },
        
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'sell.styl'
</style>
