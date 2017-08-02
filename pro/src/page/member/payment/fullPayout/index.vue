<template>
    <div class="fullPayout">
        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="支付托管车款(尾款)"
            >
            <div slot="content">
                
                <member-inner>
                    <div class="m-payment-con"
                        >
                        <div class="m-section">
                            <div class="m-tit"
                                ><span class="tit">支付相关</span>
                            </div>
                            <div class="m-con">
                                <div class="info-line">
                                    <div class="attr">收款方：</div>
                                    <div class="data">木有车第三方资金托管平台</div>
                                </div>
                                <div class="info-line">
                                    <div class="attr">支付类型：</div>
                                    <div class="data">（买方）支付托管车辆尾款</div>
                                </div>
                                <div class="info-line">
                                    <div class="attr">订单编号：</div>
                                    <div class="data no">{{orderData.id}}</div>
                                </div>
                                <div class="info-line">
                                    <div class="attr">支付金额：</div>
                                    <div class="data">
                                        <span class="price"
                                            ><em class="vital">{{orderData.managedPrice | priceFormat(2)}}</em>元
                                        </span>
                                    </div>
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
                                ><span class="tit">支付方式</span>
                            </div>
                            <div class="m-con">
                                <div class="pay-con">
                                    <div class="pay-method">
                                       <div class="u-tips">请在以下几种支付方式中选择一种进行支付</div>
                                        <ul class="pay-md-lst f__clearfix">
                                            <li class="u-item"
                                                :class="{'on':payType=='5'}"
                                                >
                                                <a class="u-box"
                                                    @click="changePayMethod('5')"
                                                    >
                                                    <div class="pay-bg ye"></div>
                                                    <i class="icon"></i>
                                                </a>
                                            </li><!-- 余额支付 -->
                                            <li class="u-item"
                                                :class="{'on':payType=='1'}"
                                                >
                                                <a class="u-box"
                                                    @click="changePayMethod('1')"
                                                    >
                                                    <div class="pay-bg zfb"></div>
                                                    <i class="icon"></i>
                                                </a>
                                            </li><!-- 支付宝 -->
                                            <li class="u-item"
                                                :class="{'on':payType=='2'}"
                                                >
                                                <a class="u-box"
                                                    @click="changePayMethod('2')"
                                                    >
                                                    <div class="pay-bg wx"></div>
                                                    <i class="icon"></i>
                                                </a>
                                            </li><!-- 微信 -->
                                            <li class="u-item"
                                                :class="{'on':payType=='3'}"
                                                >
                                                <a class="u-box"
                                                    @click="changePayMethod('3')"
                                                    >
                                                    <div class="pay-bg nh"></div>
                                                    <i class="icon"></i>
                                                </a>
                                            </li><!-- 农行支付 -->
                                            <li class="u-item"
                                                :class="{'on':payType=='4'}"
                                                >
                                                <a class="u-box"
                                                    @click="changePayMethod('4')"
                                                    >
                                                    <div class="pay-bg union"></div>
                                                    <i class="icon"></i>
                                                </a>
                                            </li><!-- 银联支付 -->
                                        </ul>
                                    </div><!-- 支付方式选择 -->
                                </div>
                                <div class="u-line-box"
                                    :class="{'last-new':payType=='5'}"
                                    v-show="payType=='5'"
                                    >
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
                        </div><!-- 支付方式选择 -->

                        <div class="m-operate">
                            <div class="u-btn-box">
                                <div class="u-tips"
                                    >实付：<span class="price"
                                            >￥<em class="vital">{{payAmount | priceFormat(2)}}</em>元
                                        </span>
                                </div>
                                <a href="javascript:;"
                                    class="u-btn"
                                    @click="goPay()"
                                    >立即支付</a>
                            </div>
                        </div><!-- 确认支付/操作区域 -->

                    </div><!-- 支付托管车款 -->
                </member-inner>

            </div><!-- 支付托管车款 -->
        </member-layout>

        <div class="m-gk-alerts" 
            v-if="isShow_WX_code"
            >
            <div class="m-mask"></div><!-- 遮罩层 -->
            <div class="m-alert-box">
                <div class="inner">
                    <div class="u-hd">
                        <p class="txt">支付
                            <span class="data"
                                >￥<em class="vital">{{payAmount | priceFormat(2)}}</em>
                            </span>
                        </p>
                        <a class="u-btn close"
                            @click="closeAlertsBox()"
                            >
                            <i class="iconfont icon-guanbi1"></i></a>
                    </div><!-- 头部 -->
                    <div class="u-con">
                        <div class="wx-code" v-show="!isWX_success">
                            <img class="u-code" :src="WX_codeBase64" alt="扫码支付" />
                        </div>
                        <div class="success" v-show="isWX_success">
                            <div class="u-icon">
                                <i class="iconfont icon-chenggong"></i>
                            </div>
                            <p class="txt">支付成功</p>
                        </div>

                    </div><!-- 内容 -->
                    <div class="u-other">
                        <div class="txt" v-show="!isWX_success">正在微信支付中...</div>
                        <div class="txt" v-show="isWX_success">支付成功，正在自动关闭...</div>
                    </div><!-- 提示 -->
                </div><!-- 内容容器 -->
            </div>
        </div><!-- 扫码支付 -->

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
        
        name: "fullPayout",
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

                // 支付方式选择  1.支付宝支付，2.微信支付，3.农行支付，4.银联支付 5.余额支付
                payType: "5",
                // 支付密码
                payPass: "",    
                // 车辆交易托管尾款
                payAmount: "",   
           
                
                // 表单验证报错集合
                errors: null,
                // 是否显示微信扫码支付
                isShow_WX_code: false,
                // 微信二维码
                WX_codeBase64: "",
                // 微信交易流水号
                WX_tradeId: "",
                // 微信轮询定时器 清除函数
                clearWX_check: null,
                // 微信支付成功
                isWX_success: false,
            }
        },
        //生命周期,开始的时候
        created(){
            this.validator = new Validator({ 
                payPass: 'required|number|min:6|max:6',            // 支付密码
            });
            this.$set(this, 'errors', this.validator.errorBag);
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
            this.clearWX_check&&this.clearWX_check();
            // 重置数据
            this.reset();

        },
        // 属性值计算
        computed:{

        },
        // 数据侦听
        watch:{
            
            // 交易流水id
            WX_tradeId(val){
                if(val){
                    geekDom.yydTimer((clear)=>{
                        this.checkWXPayStatus(val);
                        this.clearWX_check = clear;
                    },5000);
                }else{
                    this.clearWX_check&&this.clearWX_check();
                }
            },

            // 支付密码
            payPass(val){
                this.validator.validate('payPass',val);
            },

        },

        // 自定义函数(方法)
        methods: {

            // 关闭提示框
            closeAlertsBox(){
                this.isShow_WX_code= false;
                this.WX_codeBase64 = "";
                // 清空支付流水号
                this.WX_tradeId= "";
            },

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

            // 切换支付方式
            changePayMethod(type){
                this.payType = type;
            },

            // 立即支付
            goPay(){

                // 指定指针
                let me = this; 
                let thePayPass = this.payType == '5'?this.payPass:'111111';

                this.validator.validateAll({
                    payPass: thePayPass,
                }).then((res) => {
                    
                    // 如果验证成功
                    if(res){

                        let data = {
                            // 充值金额
                            payAmount : this.payAmount,
                            payPass : thePayPass,
                            orderId: this.orderId,
                            // 充值类型选择
                            amountType: "B2B买方车款",
                        }

                        // 充值方式选择
                        switch(this.payType){
                            case '1':
                                data.payType = "alipay"
                                break;
                            case '2':
                                data.payType = "wxpay_native"    // 微信扫码支付
                                break;
                            case '3':
                                data.payType = "abc"
                                break;
                            case '4':
                                data.payType = "union_pay"
                                break;
                            case '5':
                                data.payType = "balance_pay"
                                break;
                        }
                        
                        // 农行或网银支付接入方式; 1-电脑接入 2-手机网页接入
                        data.clientType = "1";

                        me.putCommit(data,function(res){
                            if(data.payType=="alipay"||data.payType=="abc"||data.payType=="union_pay"){
                                me.$confirm('正在进行支付操作，完成支付后请确认成功支付', '支付操作中', {
                                    confirmButtonText: '确认成功支付',
                                    cancelButtonText: '取消',
                                    }).then(() => {
                                        me.$notify({
                                            title: '充值成功',
                                            message: "充值成功，正在跳转至订单详情界面！",
                                            type: 'success',
                                            duration: 2000,
                                        });
                                        // 订单详情
                                        setTimeout(()=>{
                                            me.$router.push({path:'/member/buyOrderDetails',query:{cid:me.orderId}})
                                        },300)
                                    }).catch(() => {
                                        
                                    });
                            }else if(data.payType=="wxpay_native"){
                                // 打开二维码扫码提示框
                                me.isShow_WX_code = true;
                                me.WX_tradeId = res.data.TradeId;
                                // 微信二维码
                                QRCode.toDataURL(res.data.QRCodeUrl, function (err, url) {
                                    me.WX_codeBase64 = url
                                })
                            }else if(data.payType=="balance_pay"){  // 余额支付
                                
                                me.$notify({
                                    title: '充值成功',
                                    message: "充值成功，正在跳转至订单详情界面！",
                                    type: 'success',
                                    duration: 2000,
                                });
                                // 订单详情
                                setTimeout(()=>{
                                    me.$router.push({path:'/member/buyOrderDetails',query:{cid:me.orderId}})
                                    
                                },300)
                            }
                            
                        });

                    }

                }).catch(error => {
                    console.log(error);
                });

                
            },

            // 提交充值请求
            putCommit(data,callBack){

                // 请求充值接口
                api.rechargeAmount(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        // 回调
                        if(callBack){
                            callBack(res);
                        }
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '支付失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            },
            
            // 微信支付状态查询
            checkWXPayStatus(tradeId){
                
                let data = {
                    TradeId: tradeId,
                }
                // 支付状态查询
                api.checkPayStatus(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        if(res.data){
                            this.WX_codeBase64 = "";
                            // 清空支付流水号
                            this.WX_tradeId= "";
                            // 微信扫码支付成功提示
                            this.isWX_success= true;
                            
                            setTimeout(()=>{
                                this.reset();
                                this.$notify({
                                    title: '充值成功',
                                    message: "充值成功，正在跳转至订单详情界面！",
                                    type: 'success',
                                    duration: 2000,
                                });
                                this.$router.push({path:'/member/buyOrderDetails',query:{cid:this.orderId}}) 
                            },2000)
                            return;
                        }

                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '查询失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            },

            // 数据重置
            reset(){

                // 支付方式选择  1.支付宝支付，2.微信支付，3.农行支付，4.银联支付 5.余额支付
                this.payType = "5";
                // 支付密码
                this.payPass = "";
                // 因为设置为空时会触发数据侦听的验证方法，所以给个setTimeOut
                this.isShow_WX_code = false;
                // 微信二维码
                this.WX_codeBase64 = "";
                this.WX_tradeId = "";
                this.clearWX_check = "";

                this.isWX_success = false;

                setTimeout(() => {
                    this.errors.clear();
                })
            },


        },
        
    }
</script>

<!-- 二维码提示弹窗组件 -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~page/member/wallet/recharge/gk_alerts.styl'
</style>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'
</style>
