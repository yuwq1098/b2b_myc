<template>
	<div class="recharge">

        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="现金账户"
            >
            <div slot="content">
                <member-inner>

                    <div class="m-recharge-box">
                        <div class="m-info m-balance">
                            <div class="u-hd">
                                <span class="tit">余额信息</span>
                            </div><!-- 头部 -->
                            <div class="u-con">
                                <div class="u-line-info">
                                    <span class="attr">账户余额(元)：</span>
                                    <p class="data"
                                        >￥<em class="vital">{{accountData.balance | priceFormat(2)}}</em>
                                    </p>
                                </div>
                                <div class="u-line-info">
                                    <span class="attr">信誉保证金余额（元）：</span>
                                    <p class="data"
                                        >￥<em class="vital">{{accountData.xinyu | priceFormat(2)}}</em>
                                    </p>
                                </div>
                            </div><!-- 内容 -->
                        </div><!-- 余额信息 -->

                        <div class="m-info m-pay-operate">
                            <div class="u-hd">
                                <span class="tit">充值</span>
                            </div>
                            <div class="u-line-gp">
                                <div class="u-line-box">
                                    <div class="box-inner">
                                        <span class="attr">充值金额(元)：</span>
                                        <div class="ipt">
                                            <input type="number" class="user-input" step="10" min="1" 
                                                v-model="payAmount" 
                                                placeholder="请输入充值金额" />
                                        </div>
                                        <div class="line-error" v-if="errors.has('rMoney')">
                                            <p class="error-txt">
                                                <i class="iconfont icon-jinggao1"></i>{{errors.first('rMoney')}}</p>
                                        </div><!-- 错误验证 -->
                                    </div>
                                </div>
                                <div class="u-line-box">
                                    <div class="box-inner">
                                        <span class="attr">选择充值类型：</span>
                                        <div class="ipt radio-ipt">
                                            <el-radio class="radio" v-model="rechargeType" label="1">账户余额</el-radio>
                                            <el-radio class="radio" v-model="rechargeType" label="2">信誉保证金</el-radio>
                                        </div>
                                    </div>
                                </div>
                                <div class="u-line-box last">
                                    <div class="box-inner">
                                        <span class="attr">选择支付方式：</span>
                                        <div class="pay-method">
                                            <ul class="pay-md-lst f__clearfix">
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
                                                </li><!-- 农行支付 -->
                                            </ul>
                                        </div><!-- 支付方式选择 -->
                                    </div>
                                </div>
                                <div class="u-btn-box">
                                    <a class="u-btn"
                                        @click="goRecharge"
                                        >前往充值
                                    </a>
                                </div>
                            </div>
                        </div><!-- 选择支付的操作 -->

                        <!-- <div class="m-info m-recharge-record">
                            <div class="u-hd">
                                <span class="tit">充值记录</span>
                            </div>
                        </div> --><!-- 充值记录 -->
                    </div><!-- 充值 -->

                </member-inner>
            </div><!-- 充值页面内容 -->
        </member-layout>

	</div>
</template>

<script>
    
    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // vuex状态管理
    import {mapActions} from 'vuex'
    // 工具类
    import {dataToJson} from "assets/js/util.js"
    // dom操作类
    import * as geekDom from 'assets/js/dom.js'

    // 账户余额及账单信息的构造类
    import {balanceData} from 'base/class/account.js'

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue' 
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue'

    // 引入表单验证
    import { Validator } from 'vee-validate';


	export default {
        name: "recharge",
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

                // 账户余额
                accountData: new balanceData({}),
                // 充值类型 1.平台余额充值  2.信誉保证金充值
                rechargeType: "",
                // 充值金额
                payAmount: "",
                // 支付方式选择  1.支付宝支付，2.微信支付，3.农行支付
                payType: "1",
                // 表单验证报错集合
                errors: null,

            }
        },

        //生命周期,开始的时候
        created(){
            
            this.validator = new Validator({
                rMoney: 'required|between:1,100000|decimal:2',
            });

            this.$set(this, 'errors', this.validator.errorBag);

            
        },
        mounted(){

        },
        activated(){
            // 数据重置
            this.reset();
            // 获取账户余额
            this.getUserAccount();
            this.rechargeType = this.$router.currentRoute.query.type.toString()||"1";
        },
        // 退出的生命周期钩子
        deactivated(){
            // 重置数据
            this.reset();
        },
        // 数据侦听
        watch:{
            // 充值金额
            payAmount(val){
                // 充值类型 余额充值 or 信誉保证金
                this.validator.validate('rMoney',val);
            },
            
        },

        // 自定义函数(方法)
        methods: {

            // 格式化账户余额
            _normalizeBalance(data) {
                return new balanceData(data);
            },

            // 获取账户余额
            getUserAccount(){
                let data = {}
                api.getUserAccount(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.accountData = this._normalizeBalance(res.data);
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
            
            // 去充值
            goRecharge(){
                
                // 指定指针
                let me = this; 
                
                this.validator.validate('rMoney', this.payAmount).then((res) => {
                    // 如果验证成功
                    if(res){
                        if(this.rechargeType=="2"&&this.payAmount>1000){
                            this.$alert('我司平台规则规定，信誉保证金的充值数额不能高于1000元。', '违规充值', {
                                confirmButtonText: '我知道了',
                                type: 'error',
                            });
                            return;
                        }

                        let data = {
                            // 充值金额
                            payAmount : this.payAmount,
                        }

                        // 充值类型选择
                        switch(this.rechargeType){
                            case '1':
                                data.amountType = "平台余额"
                                break;
                            case '2':
                                data.amountType = "信誉保证金"
                                break;
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
                        }
                        
                        // 农行或网银支付接入方式; 1-电脑接入 2-手机网页接入
                        data.clientType = "1";
                        
                        me.putCommit(data,function(){
                            if(data.payType=="alipay"||data.payType=="abc"||data.payType=="union_pay"){
                                console.log("正在进行充值操作，使用支付宝、银联、农行")
                            }else if(data.payType=="使用微信扫码支付"){
                                console.log("使用微信扫码支付");
                            }
                            
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
                
            },

            // 提交提现请求
            putCommit(data,callBack){

                // 请求充值接口
                api.rechargeAmount(data).then(res => {
                    console.log(res.code)
                    console.log(SYSTEM.CODE_IS_OK)
                    console.log(typeof res.code)
                    console.log(typeof SYSTEM.CODE_IS_OK)
                    console.log(res.code==SYSTEM.CODE_IS_OK)
                    if(res.code==SYSTEM.CODE_IS_OK){

                        console.log("进来了不");
                        // 回调
                        if(callBack){
                            callBack()
                        }
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '充值失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            },

            // 数据重置
            reset(){
                // 充值类型
                this.rechargeType = "";
                // 充值金额
                this.payAmount = "";
                // 支付方式选择  1.支付宝支付，2.微信支付，3.农行支付
                this.payType = "1";
            },

        },
        
	}
</script>

<!-- 限定作用域"scoped" -->
<style lang="stylus" rel="stylesheet/stylus">
    @import '~assets/css/mixin.styl'
    .m-recharge-box
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
                    _translate3d(0,11px)

</style>


<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'
    
</style>
