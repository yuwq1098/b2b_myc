<template>
    <div class="payPass">

        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="安全中心"
            >
            <div slot="content">
                <member-inner>
                    
                    <div class="m-payPass-wrap">
                        <div class="m-box-inner">
                            <div class="m-flow-hd">
                                <div class="u-flow-box">
                                    <div class="u-progress-wrap"
                                        :class="'flow'+tabShowIndex">
                                        <div class="progress-bar"></div>
                                    </div><!-- 进度条 -->

                                    <div class="u-part v1" 
                                        :class="{'on':tabShowIndex>=1}">
                                        <div class="part-no">1</div>
                                        <div class="txt">验证身份</div>
                                    </div>
                                    <div class="u-part v2"
                                        :class="{'on':tabShowIndex>=2}">
                                        <div class="part-no">2</div>
                                        <div class="txt">设置支付密码</div>
                                    </div>
                                    <div class="u-part v3"
                                        :class="{'on':tabShowIndex==3}">
                                        <div class="part-no">3</div>
                                        <div class="txt">完成</div>
                                    </div>
                                </div>
                            </div><!-- 流程进度 -->
                            <div class="m-flow-con">
                                <div class="m-tb-con" 
                                    v-if="tabShowIndex==1">
                                    <div class="u-tb-wrap">
                                        <div class="u-line-box phone">
                                            <span class="u-attr">已验证手机：</span>
                                            <div class="u-txt">{{memberData.tel | telFormat}}</div>
                                        </div><!-- 已验证手机 -->
                                        <div class="u-line-box imgCode">
                                            <div class="line-error" v-if="errors.has('imgCode')">
                                                <p class="error-txt">
                                                    <i class="iconfont icon-jinggao1"></i>{{errors.first('imgCode')}}</p>
                                            </div><!-- 错误验证 -->
                                            <div class="line-inner">
                                                <span class="u-attr">图形验证码：</span>
                                                <div class="u-ipt-box">
                                                    <input class="u-ipt" 
                                                        v-model="imgCode" 
                                                        auto-complete="off" type="text" placeholder="请输入图形验证码" />
                                                    <a href="javascript:;"
                                                        class="img-btn" 
                                                        @click="getImgCode()"
                                                        >
                                                        <img class="u-pic" 
                                                            :src="'https://www.muyouche.com/action2/ImgRandomCode.ashx?FS=18&a='+timestamp"/>
                                                    </a>
                                                    <a class="u-lk" 
                                                        @click="getImgCode()"
                                                        >看不清？换一张</a>
                                                </div>
                                            </div>
                                        </div><!-- 图形验证码 -->
                                        <div class="u-line-box smsCode">
                                            <div class="line-error" v-if="errors.has('smsCode')">
                                                <p class="error-txt">
                                                    <i class="iconfont icon-jinggao1"></i>{{errors.first('smsCode')}}</p>
                                            </div><!-- 错误验证 -->
                                            <div class="line-inner">
                                                <span class="u-attr">短信验证码：</span>
                                                <div class="u-ipt-box">
                                                    <input class="u-ipt"
                                                        v-model="smsCode"
                                                        auto-complete="off" placeholder="请输入短信验证码" />
                                                    <a href="javascript:;"
                                                        class="code-btn" 
                                                        @click="getSmsCode()"
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
                                                        @click="getSmsCode(getSmsCode('voice'))" 
                                                        >没有收到短信？</a>
                                                </div>
                                            </div>
                                            
                                        </div><!-- 短信验证码 -->
                                        <div class="u-btn-box">
                                            <a href="javascript:;" class="u-btn"
                                                @click="goPartTwo()"
                                                >下一步</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="m-tb-con"
                                    v-if="tabShowIndex==2">
                                    <div class="u-tb-wrap v2">
                                        <div class="u-line-box input">
                                            <div class="line-error" v-if="errors.has('payPass')">
                                                <p class="error-txt">
                                                    <i class="iconfont icon-jinggao1"></i>{{errors.first('payPass')}}</p>
                                            </div><!-- 错误验证 -->
                                            <div class="line-inner">
                                                <div class="u-ipt-box">
                                                    <input class="u-ipt" 
                                                        v-model="payPass" 
                                                        name="payPass"
                                                        auto-complete="off" type="password" placeholder="请输入支付密码" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="u-line-box input">
                                            <div class="line-error" v-if="errors.has('checkPayPass')">
                                                <p class="error-txt">
                                                    <i class="iconfont icon-jinggao1"></i>{{errors.first('checkPayPass')}}</p>
                                            </div><!-- 错误验证 -->
                                            <div class="line-inner">
                                                <div class="u-ipt-box">
                                                    <input class="u-ipt" 
                                                        v-model="checkPayPass" 
                                                        auto-complete="off" type="password" placeholder="请再次输入支付密码" />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="u-btn-box v2">
                                            <a href="javascript:;" class="u-btn"
                                                @click="onSubmit()"
                                                >确认并提交</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="m-tb-con"
                                    v-if="tabShowIndex==3">
                                    
                                    <div class="m-res-box">
                                        <div class="u-ico">
                                            <i class="iconfont icon-chenggong"></i>
                                        </div><!-- 图标 -->
                                        <p class="u-txt">恭喜您成功设置支付密码!</p>
                                    </div><!-- 结果 -->
                                </div>
                            </div><!-- 流程内容 -->
                        </div>
                    </div><!-- 设置密码的页面容器 -->

                </member-inner>
            </div><!-- 设置支付密码页面内容 -->
        </member-layout>

        
    </div>
</template>

<script>

    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // vuex状态管理
    import {mapGetters,mapActions} from 'vuex'
    // 工具类
    import {dataToJson} from "assets/js/util.js"
    // dom操作类
    import * as geekDom from 'assets/js/dom.js'
    // 用户信息的构造类
    import {memberInfo} from 'base/class/member.js'

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue' 
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue'

    //引入表单验证
    import { Validator } from 'vee-validate';
    // 最大等待秒数
    const MAX_WAIT_SECONDS = 120;

    export default {

        name: "payPass",
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
                // 选项卡显示
                tabShowIndex: "",
                // 支付密码
                payPass: "",
                // 确认支付密码
                checkPayPass: "",
                // 图形验证码
                imgCode: "",
                // 短信验证码
                smsCode: "",
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
        //属性值计算
        computed:{
            ...mapGetters(['userData']),
            
            hasSetPayPass(){
                return this.memberData.hasPaypwd;
            }
        },
        //生命周期,开始的时候
        created(){
            this.validator = new Validator({
                payPass: 'required|number|min:6|max:6',
                checkPayPass: 'required|confirmed:payPass',
                imgCode: 'required|min:4|max:4',
                smsCode: 'required|min:4|max:4',
            });
            this.$set(this, 'errors', this.validator.errorBag);
        },
        mounted(){

        },
        activated(){
            this.reset();
            // 获取用户信息
            this.getMemberInfo();
            // 获取当前选项卡索引并显示对应的数据
            // this.tabShowIndex = this.$router.currentRoute.query.tabIndex||1;
            this.tabShowIndex = 1;
        },
        //退出的生命周期钩子
        deactivated(){

        },
        //数据侦听
        watch:{
            payPass(val){
                this.validator.validate('payPass',val);
            },
            checkPayPass(val){
                this.validator.validate('checkPayPass',val);
            },
            imgCode(val){
                this.validator.validate('imgCode',val);
            },
            smsCode(val){
                this.validator.validate('smsCode',val);
            },
            hasSetPayPass(val){
                if(val){
                    this.$notify({
                        title: '您已设置过密码',
                        message: "您已设置过密码，可以进行修改密码及忘记密码操作来更改您的密码",
                        type: 'warning',
                        duration: 2000,
                    });
                    // 返回上一页
                    this.$router.go(-1);
                }
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

            // 提交验证，进入第二步
            goPartTwo(){
                
                let me = this;
                this.validator.validateAll({
                    imgCode: this.imgCode,
                    smsCode: this.smsCode,
                }).then((res) => {
                    // 如果验证不成功
                    if(!res) return;

                    this.tabShowIndex = 2
                }).catch(error => {
                    console.log(error);
                });
            },
            
            // 提交密码设置
            onSubmit(){
                let me = this;
                this.validator.validateAll({
                    payPass: this.payPass,
                    checkPayPass: this.checkPayPass,
                }).then((res) => {

                    // 如果验证不成功
                    if(!res) return;
                    
                    // 密码修改的数据
                    let data = {
                        NewPayPwd: me.payPass,
                    }
                    me.putCommit(data,function(){
                        me.tabShowIndex = 3
                        // 成功了就重置
                        me.reset();
                    });
                    
                }).catch(error => {
                    console.log(error);
                });
            },

            // 提交支付密码设置
            putCommit(data,callBack){
                api.setPayPass(data).then((res)=>{
                    if(res.code==SYSTEM.CODE_IS_OK){
                        // 回调
                        if(callBack){
                            callBack()
                        }
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.resetPass();
                        this.$notify({
                            title: '设置支付密码失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                });
            },

            //获取图形验证码
            getImgCode(){
                this.timestamp = (+new Date()).valueOf();
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
            
            // 获取短信验证码
            getSmsCode(oType){
                let codeType = oType||'text';

                if(this.imgCode==""||this.errors.first('imgCode')){
                    this.errors.remove('imgCode');
                    this.errors.add('imgCode', "请输入图形验证码", 'auth');
                    return;
                }

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
                        this.errors.add('imgCodeR', msg, 'auth');
                    }
                });
            },

            // 重置（清空）
            reset(){
                this.payPass = "";
                this.checkPayPass = "";
                this.imgCode = "";
                this.smsCode = "";
                // 时间戳
                this.timestamp = (+new Date()).valueOf();
                // 我的定时器
                this.myInterval&&clearInterval(this.myInterval);
                setTimeout(()=>{
                    this.myInterval = null;
                    // 验证码等待时间
                    this.waitSeconds =  0;
                })
                // 因为设置为空时会触发数据侦听的验证方法，所以给个setTimeOut
                setTimeout(() => {
                    this.errors.clear();
                })
                
            },
            
            // 重置（清空）支付密码
            resetPass(){
                this.payPass = "";
                this.checkPayPass = "";
                // 因为设置为空时会触发数据侦听的验证方法，所以给个setTimeOut
                setTimeout(() => {
                    this.errors.clear();
                })
            }
        },    
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'

</style>
