<template>
    <div class="signOff">
        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="买家确认签收"
            >
            <div slot="content">
                
                <member-inner>
                    <div class="m-sign-con"
                        >
                        <div class="m-section">
                            <div class="m-tit"
                                ><span class="tit">订单相关</span>
                            </div>
                            <div class="m-con">
                                <div class="info-line">
                                    <div class="attr">订单编号：</div>
                                    <div class="data no">{{orderData.id}}</div>
                                </div>
                                <div class="info-line">
                                    <div class="attr">卖方车行名称：</div>
                                    <div class="data">{{sellerData.cdgName}}</div>
                                </div>
                                <div class="info-line">
                                    <div class="attr">联系人：</div>
                                    <div class="data">{{sellerData.contacter}}</div>
                                </div>
                                <div class="info-line">
                                    <div class="attr">联系人电话：</div>
                                    <div class="data">{{sellerData.tel}}</div>
                                </div>
                            </div>
                        </div><!-- 提示 -->

                        <div class="m-section">
                            <div class="m-tit"
                                ><span class="tit">商品信息</span>
                            </div>
                            <div class="m-con">
                                <div class="order-con">
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
                            </div>
                        </div><!-- 商品信息 -->

                        <div class="m-section">
                            <div class="m-tit"
                                ><span class="tit">支付密码</span>
                            </div>
                            <div class="m-con">
                                <div class="u-line-box">
                                    <div class="attr">填写支付密码</div>
                                    <div class="box-inner">
                                        <div class="ipt">
                                            <input type="password" class="user-input" step="10" min="1" 
                                                v-model="payPass"
                                                placeholder="请输入您的支付密码" />
                                        </div>
                                        <div class="line-error" v-if="errors.has('payPass')">
                                            <p class="error-txt">
                                                <i class="iconfont icon-jinggao1"></i>{{errors.first('payPass')}}</p>
                                        </div><!-- 错误验证 -->
                                    </div>
                                </div>
                            </div>
                        </div><!-- 提示 -->

                        <div class="m-operate">
                            <div class="u-btn-box">
                                <a href="javascript:;"
                                    class="u-btn"
                                    @click="goSignOff()"
                                    >立即签收</a>
                            </div>
                        </div><!-- 确认支付/操作区域 -->

                    </div><!-- 买家确认签收 -->
                </member-inner>

            </div><!-- 买家确认签收 -->
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
    // 订单信息的构造类
    import {orderInfo} from 'base/class/order.js'
    // 卖家车行信息的构造类
    import {basicInfo,otherInfo} from 'base/class/carDetails.js'

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue'
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue'
    
    // 引入表单验证
    import { Validator } from 'vee-validate';

    // 引入二维码转换器
    import QRCode from 'qrcode';

    export default {
        
        name: "signOff",
        // 自定义表单验证
        validator: null,
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
                // 订单详情信息
                orderData: new orderInfo({}),
                // 车辆基本信息
                basicInfo:{},
                // 卖家车行信息
                sellerData: {},

                // 支付密码
                payPass: "",    
                // 车辆交易托管尾款
                payAmount: "",   
                
                // 表单验证报错集合
                errors: null,
            }
        },
        //生命周期,开始的时候
        created(){
            this.validator = new Validator({ 
                payPass: 'required|number|min:6|max:6',            // 支付密码
            });
            this.$set(this, 'errors', this.validator.errors);
        },
        mounted(){

        },
        activated(){
            
            // 数据重置
            this.reset();

            // 获取订单Id
            this.orderId = this.$router.currentRoute.query.cid||"";

            // 获取订单详情信息
            this.getOrderDetail();

        },
        // 退出的生命周期钩子
        deactivated(){

            // 重置数据
            this.reset();

        },
        // 属性值计算
        computed:{

        },
        // 数据侦听
        watch:{

            // 支付密码
            payPass(val){
                this.validator.validate('payPass',val);
            },

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
                        this.payAmount = this.orderData.price;
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

            // 立即签收
            goSignOff(){

                this.validator.validateAll({
                    payPass: this.payPass,
                }).then((res) => {
                    
                    // 验证成功
                    if(res){
                        this.$confirm('确认签收后，系统即认为交易成功，并返还您的交易保证金，祝您生活愉快！', '您确认签收吗？', {
                                confirmButtonText: '确认签收',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                this.sellDelivery(this.orderId);
                            }).catch(() => {
                                
                            });
                    }

                }).catch(error => {
                    console.log(error);
                });

                
            },

            // 买方确认收货
            sellDelivery(orderId){
                let data = {
                    OrderId: orderId,
                    OrderStatus: "7",
                    PayPwd: this.payPass,
                }
                api.changeB2BOrderStatus(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.$notify({
                            title: '您已成功签收！',
                            message: "确认签收成功，感谢您在我司平台成功完成一笔车辆交易，祝你生活愉快，后续如果其他问题，请致电平台客服：400-9009-936",
                            type: 'success',
                            duration: 2500,
                        });
                        this.$router.push({path:'/member/buyOrderDetails',query:{cid:orderId}})
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '确认签收失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            },

            // 数据重置
            reset(){

                // 支付密码
                this.payPass = "";

                setTimeout(() => {
                    this.errors.clear();
                })
            },


        },
        
    }
</script>


<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'
</style>
