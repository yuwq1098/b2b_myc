<template>
    <div class="contractDetails">
        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="合同详情"
            >
            <div slot="content">
                
                <member-inner>

                    <div class="m-details-con"
                        >
                        <div class="m-hd" v-show="false">
                            <div class="tit">发起卖车合同</div>
                        </div><!-- 头部 -->
                        <div class="m-con">
                            <div class="m-section">
                                <div class="u-hd"
                                    ><span class="tit">签署双方</span>
                                </div>
                                <div class="u-con sign-all">
                                    <div class="u-gp-line f__clearfix">
                                        <div class="gp-item u-name">
                                            <div class="attr">甲方（卖方）：</div>
                                            <div class="data">{{contractBodyData.seller}}</div>
                                        </div>
                                        <div class="gp-item u-identity">
                                            <div class="attr">身份证号码：</div>
                                            <div class="data no">{{contractBodyData.sellerIdcNo}}</div>
                                        </div>
                                    </div>
                                    <div class="u-gp-line f__clearfix">
                                        <div class="gp-item u-name">
                                            <div class="attr">乙方（买方）：</div>
                                            <div class="data">{{contractBodyData.buyer}}</div>
                                        </div>
                                        <div class="gp-item u-identity">
                                            <div class="attr">身份证号码：</div>
                                            <div class="data no">{{contractBodyData.buyerIdcNo}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="m-section">
                                <div class="u-hd"
                                    ><span class="tit">车辆基本信息</span>
                                </div>
                                <div class="u-con order">
                                    <div class="order-con">
                                        <div class="product-info">
                                            <div class="u-pic-box">
                                                <div class="u-pic">
                                                    <img v-lazy="orderData.imgUrl" :alt="orderData.carTitle"/>
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
                                </div>
                            </div><!-- 车辆基本信息 -->

                            <div class="m-section">
                                <div class="u-hd"
                                    ><span class="tit">车辆信息补充</span>
                                </div>
                                <div class="u-con car-details">
                                    
                                    <div class="u-line-box">
                                        <div class="box-inner">
                                            <div class="attr">车牌号码：</div>
                                            <div class="ipt text-show">
                                                <div class="txt"
                                                    >{{contractBodyData.plateNumber}}
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- 车牌号码 -->

                                    <div class="u-line-box">
                                        <div class="box-inner">
                                            <div class="attr">车架号：</div>
                                            <div class="ipt text-show">
                                                <div class="txt no"
                                                    >{{contractBodyData.vin}}
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- 车架号 -->

                                    <div class="u-line-box">
                                        <div class="box-inner">
                                            <div class="attr">发动机号：</div>
                                            <div class="ipt text-show">
                                                <div class="txt no"
                                                    >{{contractBodyData.engineNumber}}
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- 发动机号 -->
                                </div>
                            </div><!-- 车辆信息补充 -->

                            <div class="m-section">
                                <div class="u-hd"
                                    ><span class="tit">车况描述</span>
                                </div>
                                <div class="u-con car-other">

                                    <div class="u-line-box f__clearfix">
                                        <div class="box-inner radio-two">
                                            <div class="attr">抵押按揭：</div>
                                            <div class="ipt text-show">
                                                <div class="txt"
                                                    >{{contractBodyData.hasMortgage | boolFormat}}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="box-inner radio-two">
                                            <div class="attr">能否过户：</div>
                                            <div class="ipt text-show">
                                                <div class="txt"
                                                    >{{contractBodyData.transfer | canFormat }}
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- 有无抵押/能否过户 -->

                                    <div class="u-line-box">
                                        <div class="box-inner">
                                            <div class="attr">提档预计时间：</div>
                                            <div class="ipt text-show">
                                                <div class="txt no"
                                                    >{{contractBodyData.pickArchiveDate}}
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- 提档预计时间 -->

                                    <div class="u-line-box">
                                        <div class="box-inner">
                                            <div class="attr">最晚提档时间：</div>
                                            <div class="ipt text-show">
                                                <div class="txt no"
                                                    >{{contractBodyData.buyerPickCarDate}}
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- 最晚提档时间 -->

                                    <div class="u-line-box">
                                        <div class="box-inner">
                                            <div class="attr">车况说明：</div>
                                            <div class="ipt long-text">
                                                <div class="txt"
                                                    >{{contractBodyData.carOtherDesc}}
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- 车况说明 -->

                                    <div class="u-line-box">
                                        <div class="box-inner">
                                            <div class="attr">成交价：</div>
                                            <div class="ipt text-show">
                                                <div class="txt price"
                                                    ><em class="vital">{{contractBodyData.finalPrice | priceFormat(2)}}</em>万元
                                                </div>
                                            </div>

                                        </div>
                                    </div><!-- 成交价 -->

                                    <div class="u-line-box f__clearfix">
                                        <div class="box-inner text-two">
                                            <div class="attr">卖方保证金：</div>
                                            <div class="ipt text-show">
                                                <div class="txt price"
                                                    ><em class="vital">{{contractBodyData.sellerDeposit | priceFormat(2)}}</em>元
                                                </div>
                                            </div>
                                        </div>
                                        <div class="box-inner text-two">
                                            <div class="attr">买方保证金：</div>
                                            <div class="ipt text-show">
                                                <div class="txt price"
                                                    ><em class="vital">{{contractBodyData.buyerDeposit | priceFormat(2)}}</em>元
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- 卖/买方保证金 -->

                                    <div class="u-line-box">
                                        <div class="box-inner long-attr">
                                            <div class="attr">使用平台托管部分尾款：</div>
                                            <div class="ipt text-show">
                                                <div class="txt"
                                                    >{{contractBodyData.needEntrust | boolFormat}}
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- 有无抵押/能否过户 -->

                                    <div class="u-line-box" v-if="contractBodyData.needEntrust=='true'">
                                        <div class="box-inner">
                                            <div class="attr">托管尾款：</div>
                                            <div class="ipt text-show">
                                                <div class="txt price"
                                                    ><em class="vital">{{contractBodyData.entrustMoney | priceFormat(2)}}</em>元
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- 尾款金额 -->

                                </div>
                            </div><!-- 车况描述 -->
                            
                            <div class="m-section">
                                <div class="u-hd"
                                    ><span class="tit">车辆转让协议</span>
                                </div>
                                <div class="u-con more">
                                    <div class="u-line-box margin">
                                        <div class="box-inner">
                                            <div class="vital-tips">买卖双方经协商签订以下车辆转让协议书，共同遵守。</div>
                                        </div>
                                        <div class="box-inner more-box">
                                            <div class="attr">办理过户：</div>
                                            <div class="ipt text-info">
                                                <div class="txt">
                                                    <div>买方应主动积极按卖方提供备案过户所需资料，并协助办理过户手续，取得过户受理。</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="box-inner more-box">
                                            <div class="attr">违约责任：</div>
                                            <div class="ipt text-info">
                                                <div class="txt">
                                                    <div>1.托运车:买方接车后，与合同描述不符、卖方无条件退还保证金，并承担损失费用，如买方要求退车，卖方无条件接受。
                                                    </div>
                                                    <div>2.上门验车:买方验车完成成交后，出现的任何问题和卖方无关。</div>
                                                    <div>3.买方上门验车如与合同描述不符，卖方无条件退还保证金，并承担损失费用。</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="box-inner more-box">
                                            <div class="attr">纠纷解决：</div>
                                            <div class="ipt text-info">
                                                <div class="txt">
                                                    <div>任何因本协议引起的争议，如果无法通过协商解决的，任何一方依法有权向有管辖权的人民法院起诉。</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="box-inner more-box">
                                            <div class="attr">法律效力：</div>
                                            <div class="ipt text-info">
                                                <div class="txt">
                                                    <div>本协议经买卖双方共同签署后生效，本协议书原件与传真/扫描件均具有同等法律效力。本协议未尽事宜将由协议双方协商一致并作出书面补充。该书面补充是本协议不可分割的组成部分，与本书面协议具有同等法律效力。</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- 有无抵押/能否过户 -->
                                    <div class="u-line-box">
                                        <div class="box-inner more-box v2">
                                            <div class="attr">甲方（卖方）签名：</div>
                                            <div class="ipt sign-box">
                                                <div class="u-pic">
                                                    <img class="sign-img"
                                                        v-if="contractDetails.sellerSignImg"
                                                        :src="contractDetails.sellerSignImg" 
                                                        alt="签名图片" />
                                                </div><!-- 签名图片 -->
                                                <div class="other-info">
                                                    <span class="o-attr">卖方联系电话：</span>
                                                    <p class="o-data">{{contractDetails.sellerTel}}</p>
                                                    <span class="o-attr">卖方签署时间：</span>
                                                    <p class="o-data">{{contractDetails.sellerSignTime}}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- 有无抵押/能否过户 -->
                                    <div class="u-line-box">
                                        <div class="box-inner more-box v2">
                                            <div class="attr">乙方（买方）签名：</div>
                                            <div class="ipt sign-box">
                                                <div class="u-pic">
                                                    <img class="sign-img"
                                                        v-if="contractDetails.buyerSignImg"
                                                        :src="contractDetails.buyerSignImg" 
                                                        alt="签名图片" />
                                                    <div class="not-pic"
                                                        v-if="!contractDetails.buyerSignImg"
                                                        >乙方未签名
                                                    </div>
                                                </div><!-- 签名图片 -->
                                                <div class="other-info"
                                                    v-if="contractDetails.buyerSignImg">
                                                    <span class="o-attr">买方联系电话：</span>
                                                    <p class="o-data">{{contractDetails.buyerTel}}</p>
                                                    <span class="o-attr">买方签署时间：</span>
                                                    <p class="o-data">{{contractDetails.buyerSignTime}}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- 有无抵押/能否过户 -->
                                </div>
                            </div><!-- 注意事项及合同签名 -->

                            <div class="m-operate">
                                <div class="u-btn-box">
                                    <div class="agr-info">
                                        <div class="info" 
                                            >买卖双方已同意
                                            <a href="javascript:;" class="u-lk"
                                                >《车辆转让协议》
                                            </a>
                                        </div>
                                    </div>
                                    <a href="javascript:;"
                                        class="u-btn"
                                        @click="goBack()"
                                        >了解了，返回上一页</a>
                                </div>
                            </div><!-- 确认发起合同/操作区域 -->

                        </div><!-- 内容 -->
                    </div><!-- 合同详情 -->

                </member-inner>

            </div><!-- 合同详情 -->
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

    // dom操作类
    import * as geekDom from 'assets/js/dom.js'

    // 合同详情信息/合同内容信息的构造类
    import {contractDetails,contractBody,orderInfo} from 'base/class/order.js'
    // 车辆详细信息的构造类
    import {basicInfo} from 'base/class/carDetails.js'

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue'
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue'

    export default {
        
        name: "contractDetails",
        // 在当前模块注册组件
        components:{
            memberLayout,
            memberInner,
        },
        // 数据
        data() {
            return{
                // 订单id
                orderId: "",
                // 合同详情信息
                contractDetails: new contractDetails({}),
                // 合同内容信息
                contractBodyData: new contractBody({}),
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

            // 获取订单Id
            this.orderId = this.$router.currentRoute.query.cid||"";
            // 获取合同详情信息
            this.getContractDetails();
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
                        this.payAmount = this.orderData.managedPrice;
                        // 获取车辆详情信息
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
            
            // 车辆详情信息
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

            // 格式化合同详情信息
            _normalizeContractDetails(data) {
                return new contractDetails(data);
            },

            // 格式化合同内容信息
            _normalizeContractBody(data) {
                return new contractBody(data);
            },

            // 获取合同详情信息
            getContractDetails(){
                var data = {
                    OrderId : this.orderId,
                }
                api.orderContractView(data).then((res) => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        
                        // 合同详情内容
                        this.contractDetails = this._normalizeContractDetails(res.data);
                        // 合同内容信息
                        this.contractBodyData = this._normalizeContractBody(this.contractDetails.contractBody);

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
            
            // 返回上一步
            goBack(){
                this.$router.go(-1);
            },
        },
        
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'
</style>
