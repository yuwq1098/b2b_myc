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
                                                <input type="text" class="user-input" step="10" min="1" 
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
                            </div>

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
                                                <a href="javascript:;" class="u-btn">立即签名</a><!-- 签名 -->
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
        
        
        <div class="m-sign-alerts">
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
                        
                        <div class="u-sign-wrap">
                            <canvas id="js__signWrap" ref="signWrap" width="220" height="220"></canvas>
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
    import {sponsorContract} from 'base/class/order.js'
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
                // 订单id
                orderId: "",
                // 订单合同信息
                contractData: new sponsorContract({}),
                
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
            this.$set(this, 'errors', this.validator.errorBag);
        },
        mounted(){
            
        },
        activated(){

            // 获取订单Id
            this.orderId = this.$router.currentRoute.query.cid||"";
            // 获取发起合同模板信息
            this.getContractTemplate();

            this.signBrush();
        
        },
        // 退出的生命周期钩子
        deactivated(){

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
            _normalizeSponsorContract(data) {
                return new sponsorContract(data);
            },

            // 获取订单详情
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
                        this.vin = +this.contractData.vin
                        // 能否过户
                        this.canTransfer = this.contractData.transfer
                        // 成交价
                        this.finalPrice = +this.contractData.finalPrice
                        // 车况说明
                        this.carDesc = this.contractData.otherDescription

                        console.log(dataToJson(this.contractData));                            

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
                    this.validator.validate('pickArchiveDate',this.form.fixedPrice);
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
                console.log("发起合同");
            },
            
            // 关闭签名弹出框
            closeAlertsBox(){
                console.log("关闭签名弹出框");
            },

            // 重置签名 
            resetSign(){
                console.log("重置签名");
            },

            // 完成签名
            signSuccess(){
                console.log("完成签名");
            },
            
            // 签名方法
            signBrush(){
                var signWrap = document.getElementById("js__signWrap");
                geekDom.brush(signWrap,1,"#ff4455",function(){
                    console.log("结束了");
                });

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
