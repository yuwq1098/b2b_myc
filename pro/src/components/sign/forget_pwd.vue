<template>
    <div id="forgetPwd">
        <div class="m-mask-bg"></div><!-- 遮罩层 -->
        <div class="m-sign-box forget">
            <div class="m-sign-hd">
                <span class="m-hd-tit">{{boxTitle}}</span>
                <a href="javascript:;" class="u-close" @click="closeBox">
                    <i class="iconfont icon-close"></i>
                </a>
            </div>

            <div class="m-login-tab one">
                <a href="javascript:;" class="u-tab-item active">
                    忘记密码
                </a>
            </div><!-- 框标题 -->

            <div class="m-login-ipt">
                <div class="m-form-gp">
                    <div class="m-gp-line">
                        <div class="item-error" v-if="errors.has('newPass')">
                            <p class="error-txt">
                                <i class="iconfont icon-jinggao1"></i>{{errors.first('newPass')}}</p>
                        </div><!-- 错误验证 -->
                        <div class="u-ipt-box">
                            <input class="u-ipt"
                                v-model="newPass" 
                                auto-complete="off" type="password" placeholder="设置您的新密码" />
                        </div>
                    </div>
                    <div class="m-gp-line">
                        <div class="item-error" v-if="errors.has('tel')">
                            <p class="error-txt">
                                <i class="iconfont icon-jinggao1"></i>{{errors.first('tel')}}</p>
                        </div><!-- 错误验证 -->
                        <div class="u-ipt-box">
                            <input class="u-ipt"
                                v-model="telephone" 
                                auto-complete="off" type="text" placeholder="请输入手机号" />
                            <div class="u-ico">
                                <i class="iconfont icon-zhanghuffffffpx"></i><!-- 用户 -->
                            </div>
                        </div>
                    </div>
                    <div class="m-gp-line">
                        <div class="item-error" v-if="errors.has('imgCode')">
                            <p class="error-txt">
                                <i class="iconfont icon-jinggao1"></i>{{errors.first('imgCode')}}</p>
                        </div><!-- 错误验证 -->
                        <div class="u-ipt-box code">
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
                        </div>
                    </div>
                    <div class="m-gp-line">
                        <div class="item-error" v-if="errors.has('smsCode')">
                            <p class="error-txt">
                                <i class="iconfont icon-jinggao1"></i>{{errors.first('smsCode')}}</p>
                        </div><!-- 错误验证 -->
                        <div class="u-ipt-box code">
                            <input class="u-ipt"
                                v-model="smsCode"
                                auto-complete="off" placeholder="请输入短信验证码" />
                            <a href="javascript:;"
                                class="code-btn" 
                                @click="getCode()"
                                v-if="!waitSeconds"
                                >获取短信验证码
                            </a>
                            <a 
                                href="javascript:;" 
                                class="code-btn disable"
                                v-if="waitSeconds"
                                >
                                {{waitSeconds}}s后重新发送
                            </a>
                        </div>
                    </div>
                    <div class="gp-other">
                        <a href="javascript:;" 
                            @click="getCode('voice')"
                            class="u-lk">获取不到短信验证码？试试语音验证</a>
                    </div>
                    <div class="m-gp-line m-btn-oper">
                        <button class="u-btn login-btn" @click="onSubmit">登录</button>
                    </div>
                </div>
            </div>


            <div class="m-other-oper f__clearfix">
                <a href="javascript:;" class="u-lk forget" @click="goLogin">返回登录</a>
            </div><!-- 其他操作 -->

		</div><!-- 忘记密码 -->	
    </div>
	
</template>

<script>

    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // vuex状态管理
    import {mapActions} from 'vuex'

    //引入表单验证
    import { Validator } from 'vee-validate';
    // 最大等待秒数
    const MAX_WAIT_SECONDS = 120;


    export default {
    	name: 'forgetPwd',
        // 自定义表单验证
        validator: null,
    	data () {
    		return {
    			boxTitle : "忘记密码",
                newPass: '',
                telephone: '',
                imgCode: '',
                smsCode: '',
                timestamp: (+new Date()).valueOf(),
                // 表单验证报错集合
                errors: null,
                // 我的定时器
                myInterval: null,
                // 验证码等待时间
                waitSeconds: 0,
    		}
    	},
        //生命周期,该组件被创建的时候
        created(){
            
            this.validator = new Validator({
                newPass: 'required|alpha_dash|min:6|max:22',
                tel: 'required|mobile',
                imgCode: 'required|min:4|max:4',
                smsCode: 'required|min:4|max:4',
            });
            this.$set(this, 'errors', this.validator.errorBag);
            
        },
        activated(){
            this.errors.clear();
            
        },
        //退出的生命周期钩子
        deactivated(){
            this.errors.clear();
        },
        //数据侦听
        watch:{
            newPass(val){
                this.validator.validate('newPass',val);
            },
            telephone(val){
                this.validator.validate('tel',val);
            },
            imgCode(val){
                this.validator.validate('imgCode',val);
            },
            smsCode(val){
                this.validator.validate('smsCode',val);
            }
        },
    	methods:{
            ...mapActions(['setSignOut']),
            // 获取图形验证码
            getImgCode(){
                this.timestamp = (+new Date()).valueOf();
            },
            // 获取验证码
            getCode(oType){
                let codeType = oType||'text';
                if(this.telephone==""||this.errors.first('tel')){
                    this.errors.remove('newPass');
                    this.errors.add('newPass', "请正确输入您的手机号", 'auth');
                }else{
                    if(this.imgCode==""||this.errors.first('imgCode')){
                        this.errors.remove('imgCode');
                        this.errors.add('imgCode', "请输入图形验证码", 'auth');
                        return;
                    }
                    //验证手机号是否已被注册
                    this.verifyPhone(this.telephone,(res)=>{

                        if(res){    // 已注册（平台已有）
                            
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

                        }else{      // 未注册（平台没有）
                            this.errors.remove('tel');
                            this.errors.add('tel', "此手机号未被注册", 'auth');
                        }
                        
                    })
                    
                }
            },
            // 验证手机号是否重复
            verifyPhone(mobile,callBack){
                let data = {
                    Mobile: mobile
                }
                let isRepeat;
                api.checkMobileCanReg(data).then(res=>{
                    if(res.code==-1) {
                        isRepeat = true;
                    }else{
                        isRepeat = false;
                    }
                    if(callBack){
                        callBack(isRepeat);
                    }
                })
            },
            // 向后台获取短信验证码，发送到用户手机上
            getSMSCode(type,callBack){
                let data = {
                    Mobile: this.telephone,
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
            // 提交
            onSubmit(){
                let me = this;
                this.validator.validateAll({
                    newPass: this.newPass,
                    tel: this.telephone,
                    imgCode: this.imgCode,
                    smsCode: this.smsCode,
                }).then(() => {
                    // 密码修改的数据
                    let data = {
                        Mobile: me.telephone,
                        SMSCode: me.smsCode,
                        NewPwd: me.newPass
                    }
                    me.putCommit(data);
                    
                }).catch(error => {
                    console.log(error);
                });
            },
            // 提交修改
            putCommit(data){
                api.forgotPassword(data).then((res)=>{
                    this.closeBox();
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.$notify({
                            title: '密码找回成功',
                            message: '请重新登录！',
                            type: 'success',
                            duration: 1500,
                        });
                        this.$router.push({ path: '/'})
                        this.reset();
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.errors.remove('newPass');
                        this.errors.add('newPass', "无效的短信验证码", 'auth');
                    }
                });
            },
            // 重置（清空）
            reset(){
                this.newPass = "";
                this.telephone = "";
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

    		//关闭忘记密码框
    		closeBox(){
    			this.$emit('closeForgetPwd');
    		},

            //立即去登录
            goLogin(){
                this.$emit('openSignIn');
            },

    	},
        mounted(){
         
        },
    }
</script>

<!-- 限定作用域 -->
<style lang="stylus" rel="stylesheet/stylus" scope>
    @import './sign.styl'
    
</style>