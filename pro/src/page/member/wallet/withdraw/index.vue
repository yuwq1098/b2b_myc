<template>
    <div class="withdraw">

        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="现金账户"
            >
            <div slot="content">
                <member-inner>
                    <div class="m-withdraw-box">
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
                                <span class="tit">提现</span>
                            </div>
                            <div class="u-line-gp">
                                <div class="u-line-box">
                                    <div class="box-inner">
                                        <span class="attr">提现金额(元)：</span>
                                        <div class="ipt">
                                            <input type="number" class="user-input" step="10" min="1" 
                                                v-model="withdrawAmount" 
                                                placeholder="请输入提现金额" />
                                        </div>
                                        <div class="line-error" v-if="errors.has('wMoney')">
                                            <p class="error-txt">
                                                <i class="iconfont icon-jinggao1"></i>{{errors.first('wMoney')}}</p>
                                        </div><!-- 错误验证 -->
                                    </div>
                                </div>
                                <div class="u-line-box">
                                    <div class="box-inner">
                                        <span class="attr">选择提现类型：</span>
                                        <div class="ipt radio-ipt">
                                            <el-radio class="radio" v-model="withdrawType" label="1">账户余额</el-radio>
                                            <el-radio class="radio" v-model="withdrawType" label="2">信誉保证金</el-radio>
                                        </div>
                                    </div>
                                </div>
                                <div class="u-line-box">
                                    <div class="box-inner">
                                        <span class="attr">您打算提现至：</span>
                                        <div class="pay-method">
                                            <ul class="pay-md-lst f__clearfix">
                                                <li class="u-item"
                                                    :class="{'on':wPayType=='1'}"
                                                    >
                                                    <a class="u-box"
                                                        @click="changeWPayMethod('1')"
                                                        >
                                                        <div class="pay-bg zfb"></div>
                                                        <i class="icon"></i>
                                                    </a>
                                                </li><!-- 支付宝 -->
                                                <li class="u-item"
                                                    :class="{'on':wPayType=='2'}"
                                                    >
                                                    <a class="u-box"
                                                        @click="changeWPayMethod('2')"
                                                        >
                                                        <div class="pay-bg nh"></div>
                                                        <i class="icon"></i>
                                                    </a>
                                                </li><!-- 农行支付 -->
                                            </ul>
                                        </div><!-- 支付方式选择 -->
                                    </div>
                                </div>
                                <template v-if="wPayType=='1'">
                                    <div class="u-line-box">
                                        <div class="box-inner">
                                            <span class="attr">您的支付宝账号：</span>
                                            <div class="ipt">
                                                <input type="text" class="user-input"
                                                    v-model="alipayAccount" 
                                                    placeholder="请输入您的支付宝账号" />
                                            </div>
                                            <div class="line-error" v-if="errors.has('alipayAccount')">
                                                <p class="error-txt">
                                                    <i class="iconfont icon-jinggao1"></i>{{errors.first('alipayAccount')}}</p>
                                            </div><!-- 错误验证 -->
                                        </div>
                                    </div>
                                    <div class="u-line-box" >
                                        <div class="box-inner">
                                            <span class="attr">真实姓名：</span>
                                            <div class="ipt">
                                                <input type="text" class="user-input"
                                                    v-model="realName" 
                                                    placeholder="请输入您的真实姓名" />
                                            </div>
                                            <div class="line-error" v-if="errors.has('realName')">
                                                <p class="error-txt">
                                                    <i class="iconfont icon-jinggao1"></i>{{errors.first('realName')}}</p>
                                            </div><!-- 错误验证 -->
                                        </div>
                                    </div>
                                </template><!-- 支付宝提现 -->
                                
                                <template v-if="wPayType=='2'">
                                    <div class="u-line-box" >
                                        <div class="box-inner">
                                            <span class="attr">您的农行卡号：</span>
                                            <div class="ipt">
                                                <input type="text" class="user-input"
                                                    v-model="nBankCard" 
                                                    placeholder="请输入您的农行卡号" />
                                            </div>
                                            <div class="line-error" v-if="errors.has('nBankCard')">
                                                <p class="error-txt">
                                                    <i class="iconfont icon-jinggao1"></i>{{errors.first('nBankCard')}}</p>
                                            </div><!-- 错误验证 -->
                                        </div>
                                    </div>
                                    <div class="u-line-box" >
                                        <div class="box-inner">
                                            <span class="attr">农行开户名：</span>
                                            <div class="ipt">
                                                <input type="text" class="user-input"
                                                    v-model="nOpenAccountName" 
                                                    placeholder="请输入您的农行开户名" />
                                            </div>
                                            <div class="line-error" v-if="errors.has('nOpenAccountName')">
                                                <p class="error-txt">
                                                    <i class="iconfont icon-jinggao1"></i>{{errors.first('nOpenAccountName')}}</p>
                                            </div><!-- 错误验证 -->
                                        </div>
                                    </div>
                                </template><!-- 银行卡提现 -->
                                
                                <div class="u-line-box" >
                                    <div class="box-inner">
                                        <span class="attr">您的手机号：</span>
                                        <div class="ipt">
                                            <p class="data-txt">{{memberData.tel | telFormat}}</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="u-line-box" >
                                    
                                    <div class="line-top-error" v-if="errors.has('imgCode')">
                                        <p class="error-txt">
                                            <i class="iconfont icon-jinggao1"></i>{{errors.first('imgCode')}}</p>
                                    </div><!-- 错误验证 -->

                                    <div class="box-inner">
                                        <span class="attr">图形验证码：</span>
                                        <div class="ipt code-ipt">
                                            <input type="text" class="user-input"
                                                v-model="imgCode" 
                                                placeholder="请输入图形验证码" />
                                        </div>
                                        <a class="img-btn" 
                                            @click="getImgCode()"
                                            >
                                            <img class="u-pic" 
                                                :src="'https://www.muyouche.com/action2/ImgRandomCode.ashx?FS=18&a='+timestamp"/>
                                        </a><!-- 图形验证码 -->
                                        <a class="u-lk" 
                                            @click="getImgCode()"
                                            >看不清？换一张</a>
                                    </div>
                                </div>

                                <div class="u-line-box" >
                                    
                                    <div class="line-top-error" v-if="errors.has('smsCode')">
                                        <p class="error-txt">
                                            <i class="iconfont icon-jinggao1"></i>{{errors.first('smsCode')}}</p>
                                    </div><!-- 错误验证 -->
                                    <div class="box-inner">
                                        <span class="attr">短信验证码：</span>
                                        <div class="ipt code-ipt">
                                            <input type="text" class="user-input"
                                                v-model="smsCode" 
                                                placeholder="请输入短信验证码" />
                                        </div>
                                        <a href="javascript:;"
                                            class="code-btn" 
                                            @click="getCode()"
                                            v-if="!waitSeconds"
                                            >获取验证码
                                        </a>
                                        <a href="javascript:;" 
                                            class="code-btn disable"
                                            v-if="waitSeconds"
                                            >
                                            {{waitSeconds}}s后重新发送
                                        </a>
                                        <a class="u-lk"
                                            @click="getCode('voice')" 
                                            >没有收到短信？</a>
                                    </div>
                                </div>

                                <div class="u-line-box last">
                                    <div class="box-inner">
                                        <span class="attr">支付密码：</span>
                                        <div class="ipt">
                                            <input type="password" class="user-input"
                                                v-model="payPass" 
                                                placeholder="请输入支付密码" />
                                        </div>
                                        <div class="line-error" v-if="errors.has('payPass')">
                                            <p class="error-txt">
                                                <i class="iconfont icon-jinggao1"></i>{{errors.first('payPass')}}</p>
                                        </div><!-- 错误验证 -->
                                    </div>
                                </div>


                                <div class="u-btn-box">
                                    <a class="u-btn"
                                        @click="goWithdraw"
                                        >确认提现
                                    </a>
                                </div>
                            </div>
                        </div><!-- 选择支付的操作 -->

                    </div><!-- 提现 -->
                </member-inner>
            </div><!-- 提现页面内容 -->
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
    // 用户信息的构造类
    import {memberInfo} from 'base/class/member.js'

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue' 
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue'

    // 引入表单验证
    import { Validator } from 'vee-validate';

    // 最大等待秒数
    const MAX_WAIT_SECONDS = 120;

    export default {
        name: "withdraw",
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
                // 用户数据
                memberData: {},
                // 账户余额
                accountData: new balanceData({}),
                
                // 提现金额
                withdrawAmount: "",
                // 提现类型 1.平台余额充值  2.信誉保证金充值
                withdrawType: "1",

                // 提现到哪里
                wPayType: "1",
                
                // 支付宝账号
                alipayAccount: "",
                // 真实姓名   
                realName: "",
                // 农行卡号
                nBankCard: "",
                // 农行开户名
                nOpenAccountName:"",
                
                // 图形验证码
                imgCode: '',
                // 短信验证码
                smsCode: '',
                // 支付密码
                payPass: '',
                
                // 时间戳
                timestamp: (+new Date()).valueOf(),
                // 表单验证报错集合
                errors: null,

                // 我的定时器
                myInterval: null,
                // 验证码等待时间
                waitSeconds: 0,

            }
        },
        //生命周期,开始的时候
        created(){

            this.validator = new Validator({
                wMoney: 'required|number|between:1,1000000|decimal:2',     // 提现金额
                alipayAccount: 'required|alpha_dash',                   // 支付宝账号
                nBankCard: 'required|alpha_dash',                       // 农行卡号
                realName: 'required|CN_EN',                        // 真实姓名
                nOpenAccountName: 'required|CN_EN',                // 农行开户名
                imgCode: 'required|min:4|max:4',
                smsCode: 'required|min:4|max:4',
                payPass: 'required|number|min:6|max:6',      // 支付密码
            });
            this.$set(this, 'errors', this.validator.errorBag);

        },
        mounted(){

        },
        activated(){

            this.reset();

            // 获取用户信息
            this.getMemberInfo();
            // 获取账户余额
            this.getUserAccount();
        },
        //退出的生命周期钩子
        deactivated(){
            // 重置
            this.reset();
        },
        // 数据侦听
        watch:{
            // 提现金额
            withdrawAmount(val){
                // 提现类型 余额充值 or 信誉保证金
                this.validator.validate('wMoney',val);
            },
            // 支付宝账号
            alipayAccount(val){
                this.validator.validate('alipayAccount',val);
            },
            // 真实姓名
            realName(val){
                this.validator.validate('realName',val);
            },
            // 农行卡号
            nBankCard(val){
                this.validator.validate('nBankCard',val);
            },
            // 农行开户名
            nOpenAccountName(val){
                this.validator.validate('nOpenAccountName',val);
            },
            // 图形验证码
            imgCode(val){
                this.validator.validate('imgCode',val);
            },
            // 短信验证码
            smsCode(val){
                this.validator.validate('smsCode',val);
            },
            // 支付密码
            payPass(val){
                this.validator.validate('payPass',val);
            }
        },
        // 自定义函数(方法)
        methods: {
            
            // 格式化用户信息
            _normalizeMember(data) {
                return new memberInfo(data);
            },

            // 获取用户信息
            getMemberInfo(){
                let data = {}
                api.getMyMemberInfo(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.memberData = this._normalizeMember(res.data);
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

            // 获取图形验证码
            getImgCode(){
                this.timestamp = (+new Date()).valueOf();
            },

            // 获取验证码
            getCode(type){
                if(this.imgCode==""||this.errors.first('imgCode')){
                    this.errors.remove('imgCode');
                    this.errors.add('imgCode', "请输入图形验证码", 'auth');
                    return;
                }
                let codeType = type||'text';

                // 获取短信验证码
                this.getSMSCode(codeType,(state,msg)=>{

                    if(state){ //成功

                        this.waitSeconds = MAX_WAIT_SECONDS;
                        this.myInterval = setInterval(() => {
                            this.waitSeconds--;
                            if(this.waitSeconds==0){
                                clearInterval(this.myInterval)
                            }
                        },1000);

                    }else{  //失败
                        this.errors.remove('imgCode');
                        this.errors.add('imgCode', msg, 'auth');
                    }
                });

            },

            // 向后台获取短信验证码，发送到用户手机上
            getSMSCode(type,callBack){
                let data = {
                    Mobile: this.memberData.tel,
                    ImgCode: this.imgCode,
                    CodeType: type||'text',
                }
                let isSuccess;
                api.getSMSCode(data).then(res=>{
                    if(res.code==SYSTEM.CODE_IS_OK) {
                        isSuccess = true;
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        isSuccess = false;
                    }
                    if(callBack){
                        callBack(isSuccess,res.msg);
                    }
                })
            },

            // 切换提现目标（对象）
            changeWPayMethod(type){
                this.wPayType = type;

                this.withdrawAmount= "";
                this.alipayAccount = "";
                this.realName = "";
                this.nBankCard = "";
                this.nOpenAccountName = "";
                this.imgCode = '';
                this.smsCode = '';
                // 时间戳
                this.timestamp = (+new Date()).valueOf();

                // 因为设置为空时会触发数据侦听的验证方法，所以给个setTimeOut
                setTimeout(() => {
                    this.errors.clear();
                })
            },

            // 提现方法
            goWithdraw(){

                // 重定指针
                let me = this;

                // 支付宝提现
                if(this.wPayType=='1'){
                    this.validator.validateAll({
                        wMoney: this.withdrawAmount,
                        alipayAccount: this.alipayAccount,
                        realName: this.realName,
                        imgCode: this.imgCode,
                        smsCode: this.smsCode,
                        payPass: this.payPass,
                    }).then((res) => {
                        // 如果验证不成功
                        if(!res) return;
                        // 提交提现申请
                        this.putCommit();

                    }).catch(error => {
                        console.log(error);
                    });

                }else if(this.wPayType=='2'){  // 农行提现
                    
                    this.validator.validateAll({
                        wMoney: this.withdrawAmount,
                        nBankCard: this.nBankCard,
                        nOpenAccountName: this.nOpenAccountName,
                        imgCode: this.imgCode,
                        smsCode: this.smsCode,
                        payPass: this.payPass,
                    }).then((res) => {
                        // 如果验证不成功
                        if(!res) return;
                        // 提交提现申请
                        this.putCommit();

                    }).catch(error => {
                        console.log(error);
                    });

                }
            },

            // 提交提现申请
            putCommit(){
                
                let me = this;
                if(this.withdrawType=='2'&&this.payAmount>1500){
                    this.$alert('我司平台规则规定，信誉保证金的提现数额不能高于1500元。', '违规提现', {
                        confirmButtonText: '我知道了',
                        type: 'error',
                    });
                    return;
                }

                let data = {
                    
                    Amount: this.withdrawAmount,        // 提现金额
                    PayPwd: this.payPass,        // 支付密码
                    SMSCode: this.smsCode,       // 短信验证码
                    AmountType: this.wPayType=='1'?'平台余额':'信誉保证金',    // 提现类别
                    
                };

                // 提现目标
                if(this.wPayType=='1'){
                    data.Account = this.alipayAccount;       // 支付宝账号
                    data.AccountType = "alipay";
                    data.FullName = this.realName;    // 真实姓名
                }else if(this.wPayType=='2'){
                    data.Account = this.nBankCard;           // 农行卡号
                    data.AccountType = "abc";                
                    data.FullName = this.nOpenAccountName;    // 开户名
                }

                api.withdrawCashApply(data).then((res)=>{
                    if(res.code==SYSTEM.CODE_IS_OK){
                        me.$confirm('提现申请成功，审核需要一定时间，请耐心等待，未审核通过资金将原路返回！点击我知道了返回我的钱包', '提现申请成功', {
                            confirmButtonText: '我知道了',
                            cancelButtonText: '取消',
                            }).then(() => {
                                me.$router.push({path:'/member/wallet'})
                            }).catch(() => {
                                
                            });
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.reset();
                        this.$notify({
                            title: '提现失败',
                            message: res.msg,
                            type: 'error',
                            duration: 2000,
                        });
                    }
                });

            },

            // 重置（清空）
            reset(){
                
                this.withdrawAmount= "";
                this.withdrawType= "1";
                this.wPayType = "1";
                this.alipayAccount = "";
                this.realName = "";
                this.nBankCard = "";
                this.nOpenAccountName = "";
                this.imgCode = '';
                this.smsCode = '';
                this.payPass = '';
                // 时间戳
                this.timestamp = (+new Date()).valueOf();

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
    .m-withdraw-box
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
