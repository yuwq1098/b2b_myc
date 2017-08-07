<template>
    <div class="contractSell">
        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="卖方发起合同"
            >
            <div slot="content">
                
                <member-inner>
                    <div class="m-sell-con"
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
                                            <div class="data">{{contractData.seller}}</div>
                                        </div>
                                        <div class="gp-item u-identity">
                                            <div class="attr">身份证号码：</div>
                                            <div class="data no">{{contractData.sellerIdcNo}}</div>
                                        </div>
                                    </div>
                                    <div class="u-gp-line f__clearfix">
                                        <div class="gp-item u-name">
                                            <div class="attr">乙方（买方）：</div>
                                            <div class="data">{{contractData.buyer}}</div>
                                        </div>
                                        <div class="gp-item u-identity">
                                            <div class="attr">身份证号码：</div>
                                            <div class="data no">{{contractData.buyerIdcNo}}</div>
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
                                            <div class="ipt">
                                                <input type="text" class="user-input" step="10" min="1" 
                                                    v-model="plateNumber" 
                                                    placeholder="请输入交易车辆的车牌号" />
                                            </div>
                                            <div class="line-error" v-if="errors.has('plateNumber')">
                                                <p class="error-txt">
                                                    <i class="iconfont icon-jinggao1"></i>{{errors.first('plateNumber')}}</p>
                                            </div><!-- 错误验证 -->
                                        </div>
                                    </div><!-- 车牌号码 -->

                                    <div class="u-line-box">
                                        <div class="box-inner">
                                            <div class="attr">车架号：</div>
                                            <div class="ipt">
                                                <input type="text" class="user-input"
                                                    v-model="vin" 
                                                    placeholder="请输入交易车辆的车架号" />
                                            </div>
                                            <div class="line-error" v-if="errors.has('vin')">
                                                <p class="error-txt">
                                                    <i class="iconfont icon-jinggao1"></i>{{errors.first('vin')}}</p>
                                            </div><!-- 错误验证 -->
                                        </div>
                                    </div><!-- 车架号 -->

                                    <div class="u-line-box">
                                        <div class="box-inner">
                                            <div class="attr">发动机号：</div>
                                            <div class="ipt">
                                                <input type="text" class="user-input" step="10" min="1" 
                                                    v-model="engineNumber" 
                                                    placeholder="请输入交易车辆的发动机号" />
                                            </div>
                                            <div class="line-error" v-if="errors.has('engineNumber')">
                                                <p class="error-txt">
                                                    <i class="iconfont icon-jinggao1"></i>{{errors.first('engineNumber')}}</p>
                                            </div><!-- 错误验证 -->
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
                                            <div class="ipt radio-ipt v1">
                                                <el-radio class="radio" v-model="hasMortgage" :label="true">有</el-radio>
                                                <el-radio class="radio" v-model="hasMortgage" :label="false">无</el-radio>
                                            </div>
                                        </div>
                                        <div class="box-inner radio-two">
                                            <div class="attr">能否过户：</div>
                                            <div class="ipt radio-ipt v2">
                                                <el-radio class="radio" v-model="canTransfer" :label="true">能过户</el-radio>
                                                <el-radio class="radio" v-model="canTransfer" :label="false">不能过户</el-radio>
                                            </div>
                                        </div>
                                    </div><!-- 有无抵押/能否过户 -->

                                    <div class="u-line-box">
                                        <div class="box-inner">
                                            <div class="attr">提档预计时间：</div>
                                            <div class="ipt date-ipt">
                                                <date-picke
                                                    @dateChangeEnd="pickArchiveDateEnd"
                                                    :disabledPrevYear="0"
                                                    placeholder="请选择提档预计时间"
                                                    ref="pickArchiveDate"
                                                    >
                                                </date-picke>
                                            </div>
                                            <div class="line-error" v-if="errors.has('pickArchiveDate')">
                                                <p class="error-txt">
                                                    <i class="iconfont icon-jinggao1"></i>{{errors.first('pickArchiveDate')}}</p>
                                            </div><!-- 错误验证 -->
                                        </div>
                                    </div><!-- 提档预计时间 -->

                                    <div class="u-line-box">
                                        <div class="box-inner">
                                            <div class="attr">最晚提档时间：</div>
                                            <div class="ipt date-ipt">
                                                <date-picke
                                                    @dateChangeEnd="buyerPickCarDateEnd"
                                                    :disabledPrevYear="0"
                                                    placeholder="请选择最晚提档时间"
                                                    ref="buyerPickCarDate"
                                                    >
                                                </date-picke>
                                            </div>
                                            <div class="line-error" v-if="errors.has('buyerPickCarDate')">
                                                <p class="error-txt">
                                                    <i class="iconfont icon-jinggao1"></i>{{errors.first('buyerPickCarDate')}}</p>
                                            </div><!-- 错误验证 -->
                                        </div>
                                    </div><!-- 最晚提档时间 -->

                                    <div class="u-line-box">
                                        <div class="box-inner">
                                            <div class="attr">车况说明：</div>
                                            <div class="ipt textarea-ipt">
                                                <textarea class="u-textarea" 
                                                    v-model="carDesc" 
                                                    type="text" placeholder="请在此处输入您正在交易车辆的车况">
                                                </textarea>
                                            </div>
                                            <div class="line-error textarea-ipt" v-if="errors.has('carDesc')">
                                                <p class="error-txt">
                                                    <i class="iconfont icon-jinggao1"></i>{{errors.first('carDesc')}}</p>
                                            </div><!-- 错误验证 -->
                                        </div>
                                    </div><!-- 车况说明 -->

                                    <div class="u-line-box">
                                        <div class="box-inner">
                                            <div class="attr">成交价：</div>
                                            <div class="ipt">
                                                <input type="text" class="user-input" step="10" min="1" 
                                                    v-model="finalPrice" 
                                                    placeholder="请输入成交价，单位（万元）" />
                                            </div>
                                            <span class="u-unit">万元</span>
                                            <div class="line-error" v-if="errors.has('finalPrice')">
                                                <p class="error-txt">
                                                    <i class="iconfont icon-jinggao1"></i>{{errors.first('finalPrice')}}</p>
                                            </div><!-- 错误验证 -->
                                        </div>
                                    </div><!-- 成交价 -->

                                    <div class="u-line-box f__clearfix">
                                        <div class="box-inner text-two">
                                            <div class="attr">卖方保证金：</div>
                                            <div class="ipt text-show">
                                                <div class="txt price"
                                                    ><em class="vital">{{sellerDeposit | priceFormat(2)}}</em>元
                                                </div>
                                            </div>
                                        </div>
                                        <div class="box-inner text-two">
                                            <div class="attr">买方保证金：</div>
                                            <div class="ipt text-show">
                                                <div class="txt price"
                                                    ><em class="vital">{{buyerDeposit | priceFormat(2)}}</em>元
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- 卖/买方保证金 -->

                                    <div class="u-line-box">
                                        <div class="box-inner long-attr">
                                            <div class="attr">使用平台托管部分尾款：</div>
                                            <div class="ipt radio-ipt">
                                                <el-radio class="radio" v-model="needTrustee" :label="true">是</el-radio>
                                                <el-radio class="radio" v-model="needTrustee" :label="false">否</el-radio>
                                            </div>
                                        </div>
                                    </div><!-- 有无抵押/能否过户 -->

                                    <div class="u-line-box" v-if="needTrustee">
                                        <div class="box-inner">
                                            <div class="attr">托管尾款：</div>
                                            <div class="ipt">
                                                <input type="text" class="user-input" step="10" min="1" 
                                                    v-model="trusteeMoney" 
                                                    placeholder="请输入平台托管尾款，单位（元）" />
                                            </div>
                                            <span class="u-unit">元</span>
                                            <div class="line-error" v-if="errors.has('trusteeMoney')">
                                                <p class="error-txt">
                                                    <i class="iconfont icon-jinggao1"></i>{{errors.first('trusteeMoney')}}</p>
                                            </div><!-- 错误验证 -->
                                        </div>
                                    </div><!-- 尾款金额 -->

                                </div>
                            </div>
                            
                            <div class="m-section">
                                <div class="u-hd"
                                    ><span class="tit">注意事项及合同签名</span>
                                </div>
                                <div class="u-con more">
                                    <div class="u-line-box">
                                        <div class="box-inner more-box">
                                            <div class="attr">注意事项：</div>
                                            <div class="ipt text-info">
                                                <div class="txt">
                                                    <div>1.【保证金】双方协商好价格并在平台签订电子购车合同后，双方各自缴纳3000元交易保证金，交易成功后，将原路返回。</div>
                                                    <div>2.【托运车】买家接车后，与合同描述不符，卖家无条件退还保证金，并承担损失费用。若卖方要求退车，卖方必须无条件接受。</div>
                                                    <div>3.【上门验车】买方上门验车，如与合同描述不符，卖家无条件退还保证金，并承担损失费用。若卖方要求退车，卖方必须无条件接受。</div>
                                                    <div>4.【交易完成】买方验车完成签收后，出现任何问题与卖方无关。</div>
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
                                                        v-if="signImg" 
                                                        :src="signImg" 
                                                        alt="签名图片" />
                                                    <p class="not-pic" v-if="!signImg"
                                                        >请先完成签名
                                                    </p>
                                                </div><!-- 签名图片 -->
                                                <template v-if="!signImg">
                                                    <a href="javascript:;" class="u-btn"
                                                        @click="goSign()">立即签名</a><!-- 签名 -->
                                                </template>
                                                <template v-else-if="signImg">
                                                    <a href="javascript:;" class="u-btn"
                                                        @click="goSign()">重新签名</a><!-- 签名 -->
                                                </template>
                                                
                                                
                                            </div>
                                        </div>
                                    </div><!-- 有无抵押/能否过户 -->
                                </div>
                            </div><!-- 注意事项及合同签名 -->

                            <div class="m-operate">
                                <div class="u-btn-box">
                                    <div class="agr-info">
                                        <div class="info" 
                                            >已阅读
                                            <a href="javascript:;" class="u-lk"
                                                >《车辆转让协议》
                                            </a>
                                        </div>
                                        <div class="ipt-check">
                                            <el-checkbox 
                                                v-model="isAgree"
                                                >
                                            </el-checkbox>
                                        </div>
                                    </div>
                                    <a href="javascript:;"
                                        class="u-btn"
                                        @click="sponsorContract()"
                                        >发起合同</a>
                                </div>
                            </div><!-- 确认发起合同/操作区域 -->

                        </div><!-- 内容 -->
                    </div><!-- 卖方发起合同 -->
                </member-inner>

            </div><!-- 卖方发起合同 -->
        </member-layout>
        
        
        <div class="m-sign-alerts" v-show="isShow_signBox">
            <div class="m-mask"></div><!-- 遮罩层 -->
            <div class="m-alert-box">
                <div class="inner">
                    <div class="u-hd">
                        <p class="txt">甲方（卖家）签名</p>
                        <a class="u-btn close"
                            @click="closeAlertsBox()"
                            >
                            <i class="iconfont icon-guanbi1"></i></a>
                    </div><!-- 头部 -->
                    <div class="u-con">
                        
                        <div class="u-sign-wrap" id="js__signParent">
                            <canvas id="js__signWrap" ref="signWrap" width="280" height="100"></canvas>
                        </div><!-- 签名区域 -->                        

                    </div><!-- 内容 -->
                    <div class="u-operate-btn">
                        <a href="javascript:;" class="u-btn reset"
                            @click="resetSign()"
                            >重新签名
                        </a>
                        <a href="javascript:;" class="u-btn success"
                            @click="signSuccess()"
                            >确认完成
                        </a>
                    </div><!-- 操作区 -->
                </div><!-- 内容容器 -->
            </div>
        </div><!-- 签名弹出框 -->

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
    // 发起合同信息的构造类
    import {sponsorContract,orderInfo} from 'base/class/order.js'
    // 车辆详细信息的构造类
    import {basicInfo} from 'base/class/carDetails.js'
    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue'
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue'

    // 日期选择器
    import datePicke from "components/common/datePicke.vue"


    // 引入表单验证
    import { Validator } from 'vee-validate';

    export default {
        
        name: "contractSell",
        // 在当前模块注册组件
        components:{
            memberLayout,
            memberInner,
            // 日期选择器组件
            datePicke,
        },
        // 数据
        data() {
            return{
                canvasBox: "",
                // 订单id
                orderId: "",
                // 订单合同信息
                contractData: new sponsorContract({}),
                // 订单详情信息
                orderData: new orderInfo({}),
                // 车辆基本信息
                basicInfo:{},
                
                // 车牌号码
                plateNumber: "",
                // 车架号
                vin: "",
                // 发动机号
                engineNumber: "",
                // 是否抵押按揭
                hasMortgage: false,
                // 能否过户
                canTransfer: true,
                
                // 提档预计时间
                pickArchiveDate: "",
                // 最晚提档时间
                buyerPickCarDate: "",
                // 车况信息
                carDesc: "",
                // 成交价
                finalPrice: "",
                // 卖方保证金
                sellerDeposit: 3000,
                // 买方保证金
                buyerDeposit: 3000,
                // 是否使用平台托管
                needTrustee: true,
                // 托管金额
                trusteeMoney: "",
                
                // 签名框显示
                isShow_signBox: false,
                
                // canvas签名图片
                canvasImg: "",
                // 签名图片
                signImg: "",
                // 签名图片Id
                signImgId: "",
                
                // 同意转让协议
                isAgree: true,

                // 表单验证报错集合
                errors: null,
            }
        },
        //生命周期,开始的时候
        created(){
            
            this.validator = new Validator({ 
                plateNumber: 'required|plateNumber',              // 车牌号码
                vin: 'required|alpha_dash|min:17|max:17',         // 车架号
                engineNumber: 'required',                         // 发动机号
                pickArchiveDate: 'required',                      // 提档预计时间
                buyerPickCarDate: 'required',                     // 最晚提档时间
                carDesc: "required|min:10|max:300",               // 车况说明
                // 成交价/万元
                finalPrice: "required|between:1,3000|decimal:2",
                // 托管金额/元
                trusteeMoney: "required|between:1,30000000|decimal:2",
            });
            this.$set(this, 'errors', this.validator.errors);
        },
        mounted(){
            
        },
        activated(){

            // 重置数据
            this.reset();
            // canvas画布
            this.canvasBox = document.getElementById('js__signParent');
            // 获取订单Id
            this.orderId = this.$router.currentRoute.query.cid||"";
            // 获取发起合同模板信息
            this.getContractTemplate();
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

            // 车牌号码
            plateNumber(val){
                this.validator.validate('plateNumber',val);
            },

            // 车架号
            vin(val){
                this.validator.validate('vin',val);
            },

            // 发动机号
            engineNumber(val){
                this.validator.validate('engineNumber',val);
            },

            // 车况说明
            carDesc(val){
                this.validator.validate('carDesc',val);
            },

            // 成交价
            finalPrice(val){
                this.validator.validate('finalPrice',val);
            },

            // 是否使用平台托管车款
            needTrustee(val){
                this.trusteeMoney = "";
                this.errors.remove('trusteeMoney');
            },

            // 托管尾款
            trusteeMoney(val){
                this.validator.validate('trusteeMoney',val);
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
            
            // 格式化合同模板信息
            _normalizeSponsorContract(data) {
                return new sponsorContract(data);
            },

            // 获取合同模板详情
            getContractTemplate(){
                var data = {
                    OrderId : this.orderId,
                }
                api.sellerNeedContract(data).then((res) => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        
                        // 合同模板内容
                        this.contractData = this._normalizeSponsorContract(res.data);
                        // 卖方保证金
                        this.sellerDeposit = this.contractData.sellerDeposit;
                        // 买方保证金
                        this.buyerDeposit = this.contractData.buyerDeposit;
                        // 车架号
                        this.vin = this.contractData.vin
                        // 能否过户
                        this.canTransfer = this.contractData.transfer
                        // 成交价
                        this.finalPrice = +this.contractData.finalPrice
                        // 车况说明
                        this.carDesc = this.contractData.otherDescription                      

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

            // 提档预计时间
            pickArchiveDateEnd(selected){
                let curDateTime = geekDom.formatDateByDate("yyyy-MM-dd",selected);
                this.pickArchiveDate = curDateTime;
                this.validator.validate('pickArchiveDate',curDateTime);
                if(!this.errors.has('buyerPickCarDate')&&!this.errors.has('pickArchiveDate')){
                    let [peDate,ofDate] = [ +new Date(this.buyerPickCarDate),+new Date(this.pickArchiveDate)];
                    if(peDate<ofDate){
                        this.errors.remove('buyerPickCarDate');
                        this.errors.add('buyerPickCarDate', "最晚提档时间不能早于提档预计时间", 'auth');
                    }
                }else{
                    this.errors.remove('buyerPickCarDate');
                }
            },

            // 最晚提档时间
            buyerPickCarDateEnd(selected){
                let curDateTime = geekDom.formatDateByDate("yyyy-MM-dd",selected);
                this.buyerPickCarDate = curDateTime;
                this.validator.validate('buyerPickCarDate',curDateTime);
                if(this.pickArchiveDate==""){
                    this.validator.validate('pickArchiveDate',pickArchiveDate);
                }else if(!this.errors.has('buyerPickCarDate')&&!this.errors.has('pickArchiveDate')){
                    let [peDate,ofDate] = [ +new Date(this.buyerPickCarDate),+new Date(this.pickArchiveDate)];
                    if(peDate<ofDate){
                        this.errors.remove('buyerPickCarDate');
                        this.errors.add('buyerPickCarDate', "最晚提档时间不能早于提档预计时间", 'auth');
                    }
                }
            },
            
            // 发起合同
            sponsorContract(){
                
                let me = this;
                // 未同意协议
                if(!this.isAgree){
                    this.$alert('请先同意并阅读协议，同意协议后，方可发起合同', '温馨提示', {
                            confirmButtonText: '我知道了',
                            type: 'warning',
                            callback: () => {
                                return;
                            }
                        });
                    return;
                }
                // 未上传签名
                if(!this.signImg||!this.signImgId){
                    this.$alert('请先签名并完成签名，完成签名后方可完成签名，方可发起合同', '未上传签名', {
                            confirmButtonText: '我知道了',
                            type: 'warning',
                            callback: () => {
                                return;
                            }
                        });
                    return;
                }
                
                this.validator.validateAll({

                    plateNumber: this.plateNumber,              // 车牌号码
                    vin: this.vin,                              // 车架号
                    engineNumber: this.engineNumber,            // 发动机号
                    carDesc: this.carDesc,                      // 车况说明
                    finalPrice: this.finalPrice,                // 成交价/万元
                    trusteeMoney: this.trusteeMoney,            // 托管金额/元

                }).then((res) => {
                    // 如果验证不成功
                    if(!res) {
                        this.$notify.error({
                            title: '填写不完整',
                            message: '请认真填写完所有合同信息',
                            type: 'error',
                            duration: 2000,
                        });
                        document.body.scrollTop = 320
                        return;
                    };
                    
                    // 验证提档预计时间
                    if(!this.errors.has('buyerPickCarDate')&&!this.errors.has('pickArchiveDate')){
                        let [peDate,ofDate] = [ +new Date(this.buyerPickCarDate),+new Date(this.pickArchiveDate)];
                        if(peDate<ofDate){
                            this.errors.remove('buyerPickCarDate');
                            this.errors.add('buyerPickCarDate', "最晚提档时间不能早于提档预计时间", 'auth');
                            // 发起合同信息填写错误
                            this.sponsorErrorTips();
                            return;
                        }
                    }
                    
                    this.$confirm('尊贵的用户，您好！请认真确认您发起的合同内容信息的准确性，避免给您带来不必要的麻烦！', '温馨提示', {
                        confirmButtonText: '确认发起合同',
                        cancelButtonText: '再仔细看看',
                        type: 'warning'
                    }).then(() => {
                        // 立即发起合同
                        this.putCommit();
                    }).catch(() => {
                        return;
                    });

                }).catch(() => {
                    this.$notify.error({
                        title: '填写不完整',
                        message: '请认真填写完所有合同信息',
                        type: 'error',
                        duration: 2000,
                    });
                    document.body.scrollTop = 320
                });

            },

            // 发布车辆信息填写不合逻辑
            issueErrorTips(){
                this.$notify.error({
                    title: '部分信息填写不合理',
                    message: '请认真填写完所有合同信息',
                    type: 'error',
                    duration: 2000,
                });
                document.body.scrollTop = 320
            },

            // 卖家提交发起合同的请求
            putCommit(){

                let data = {
                    // 订单ID
                    OrderId : this.orderId,
                    // 合同内容
                    ContractBody: {
                        Seller: this.contractData.seller,
                        SellerIdcNo: this.contractData.sellerIdcNo,
                        Buyer: this.contractData.buyer,
                        BuyerIdcNo: this.contractData.buyerIdcNo,

                        PlateNumber: this.plateNumber,
                        VinNumber: this.vin,
                        EngineNumber: this.engineNumber,
                        HasMortgage: this.hasMortgage,
                        CanTransfer: this.canTransfer,
                        PickArchiveDate: this.pickArchiveDate,
                        BuyerPickCarDate: this.buyerPickCarDate,

                        CarOtherDescription: this.carDesc,
                        FinalPrice: this.finalPrice,
                        SellerCashDeposit: this.sellerDeposit,
                        BuyerCashDeposit: this.buyerDeposit,
                        NeedEntrustCarMoney: this.needTrustee,
                        CarMoneyValue: this.trusteeMoney,

                    },
                    // 签名文件ID
                    ContractFileId: this.signImgId,
                }

                // 请求发起（签）合同接口
                api.signContractSeller(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.$notify({
                            title: '成功发起合同',
                            message: "恭喜成功发起合同，等待买家签署合同",
                            type: 'success',
                            duration: 2000,
                        });
                        setTimeout(() => {
                            this.$router.push({path:'/member/sellOrderDetails',query:{cid:this.orderId}});
                        },800)
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '发起合同失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            },


            // 立即去签名
            goSign(){
                this.isShow_signBox = true;
                setTimeout(()=>{
                    // 开始签名
                    this.signBrush();
                })
                
            },

            // 关闭签名弹出框
            closeAlertsBox(){
                this.isShow_signBox = false;
            },

            // 重置签名 
            resetSign(){
                
                // 清空签名图片
                this.canvasImg = "";
                let signWrap = document.getElementById("js__signWrap");

                this.canvasBox.removeChild(signWrap);
                let newCanvas = document.createElement('canvas');

                newCanvas.id = "js__signWrap";
                newCanvas.width = "280";
                newCanvas.height = "100";
                
                this.canvasBox.appendChild(newCanvas);
                
                // 签名方法
                this.signBrush();
            },

            // 完成签名
            signSuccess(){
                this.fileUpload("甲方签名",this.canvasImg);
            },

            //图片上传
            fileUpload(name,base64str){
                let me = this;
                let data = {
                    title: name,
                    dataUrl: base64str,
                }
                // 上传至隐私类图片
                api.uploadPrivateFileBase64(data).then(res=>{
                    this.isLoading = false;
                    if(res.code==SYSTEM.CODE_IS_OK){

                        this.signImg = res.data.imgUrl;
                        this.signImgId = res.data.imgId;
                        // 关闭签名框
                        this.isShow_signBox = false;
                        
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '签名图片上传失败',
                            message: res.msg,
                            type: 'error',
                            duration: 2000,
                        });
                    }
                })
            },
            
            // 签名方法
            signBrush(){
                let me = this;
                let signWrap = document.getElementById("js__signWrap");
                // let signWrap = this.$refs.signWrap;
                geekDom.brush(signWrap,2,"#222",function(base64Img){
                    me.canvasImg = base64Img;
                });
            },
            
            // 重置数据
            reset(){

                this.plateNumber= "";
                this.vin= "";
                this.engineNumber= "";
                this.hasMortgage= false;
                this.canTransfer= true;
                this.pickArchiveDate= "";
                // 清空组件数据
                this.$refs.pickArchiveDate.clearDate();
                this.buyerPickCarDate= "";
                // 清空组件数据
                this.$refs.buyerPickCarDate.clearDate();
                this.carDesc= "";
                this.finalPrice= "";
                this.sellerDeposit= 3000;
                this.buyerDeposit= 3000;
                this.needTrustee= true;
                this.trusteeMoney= "";
                this.isShow_signBox= false;
                this.canvasImg= "";
                this.signImg= "";
                this.signImgId= "";
                this.isAgree= true;

                // 因为设置为空时会触发数据侦听的验证方法，所以给个setTimeOut
                setTimeout(() => {
                    this.errors.clear();
                })
            },
            
        },
        
    }
</script>


<!-- 限定作用域"scoped" -->
<style lang="stylus" rel="stylesheet/stylus">
    @import '~assets/css/mixin.styl'
    .m-sell-con
        .u-line-box
            .radio-ipt
                _display()
                .el-radio
                    color #4b5861
                    & *
                        cursor pointer
                .el-radio__label
                    padding-left 8px
                .el-radio__input
                    vertical-align top
                    _translate3d(0,10px)
            .date-ipt
                .el-date-editor
                    .el-input__inner
                        height 38px
                        line-height 38px
                        _borderAll(#4B5861 + 75%)
                        _placeholder(#b2b2b2)
                        _borderRadius(0)
                        &:hover,&:focus
                            _borderAll(#4B5861)
                    .el-input__icon
                        color #4B5861 + 75%
        .el-checkbox__input
            .el-checkbox__inner
                cursor pointer

</style>

<!-- 二维码提示弹窗组件 -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '../sign_alerts.styl'
</style>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'

</style>
