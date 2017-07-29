<template>
    <div class="arbitrateBuy">
        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="买家维权详情页"
            >
            <div slot="content">
                
                <member-inner>
                    <div class="m-arbitrate-con"
                        >
                        <div class="m-hd">
                            <div class="m-status-info">
                                <div class="u-pic"></div>
                                <div class="u-tit">您强制取消</div><!-- 标题 -->
                                <div class="u-desc">平台扣取相应保证金</div><!-- 描述 -->
                            </div>
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

                    </div><!-- 买家维权详情页 -->
                </member-inner>

            </div><!-- 买家维权详情页 -->
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
        
        name: "arbitrateBuy",
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
                        // 获取车辆其他相关信息
                        this.sellerData = this._normalizeOtherInfo(res.data.OtherInfo);

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
        },
        
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'buy.styl'
</style>
