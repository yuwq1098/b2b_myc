<template>
    <div id="signUp">
        <div class="m-mask-bg"></div><!-- 遮罩层 -->
        <div class="m-sign-box signup">
		    <div class="m-sign-hd">
		    	<span class="m-hd-tit">{{boxTitle}}</span>
		    	<a href="javascript:;" class="u-close" @click="closeBox">
		    		<i class="iconfont icon-close"></i>
		    	</a>
		    </div>

            <div class="m-login-tab one">
                <a href="javascript:;" class="u-tab-item active">
                    注册账户
                </a>
            </div><!-- 框标题 -->


            <div class="m-login-ipt">
                <div class="m-form-gp">
                    <div class="m-gp-line">
                        <div class="item-error" v-if="errors.has('telReg')">
                            <p class="error-txt">
                                <i class="iconfont icon-jinggao1"></i>{{errors.first('telReg')}}</p>
                        </div><!-- 错误验证 -->
                        <div class="u-ipt-box">
                            <input class="u-ipt"
                                v-model="telReg" 
                                auto-complete="off" type="text" placeholder="请输入手机号" />
                            <div class="u-ico">
                                <i class="iconfont icon-zhanghuffffffpx"></i><!-- 用户 -->
                            </div>
                        </div>
                    </div>
                    <div class="m-gp-line">
                        <div class="item-error" v-if="errors.has('passReg')">
                            <p class="error-txt">
                                <i class="iconfont icon-jinggao1"></i>{{errors.first('passReg')}}</p>
                        </div><!-- 错误验证 -->
                        <div class="u-ipt-box">
                            <input class="u-ipt"
                                v-model="passReg" 
                                auto-complete="off" type="password" placeholder="设置您的密码" />
                        </div>
                    </div>
                    <div class="m-gp-line">
                        <div class="item-error" v-if="errors.has('imgCodeReg')">
                            <p class="error-txt">
                                <i class="iconfont icon-jinggao1"></i>{{errors.first('imgCodeReg')}}</p>
                        </div><!-- 错误验证 -->
                        <div class="u-ipt-box code">
                            <input class="u-ipt" 
                                v-model="imgCodeReg" 
                                auto-complete="off" type="text" placeholder="请输入图形验证码" />
                            <a href="javascript:;"
                                class="img-btn" 
                                @click="getImgCodeReg()"
                                >
                                <img class="u-pic" 
                                    :src="'https://www.muyouche.com/action2/ImgRandomCode.ashx?FS=18&a='+timestamp"/>
                            </a>
                        </div>
                    </div>
                    <div class="m-gp-line">
                        <div class="item-error" v-if="errors.has('smsCodeReg')">
                            <p class="error-txt">
                                <i class="iconfont icon-jinggao1"></i>{{errors.first('smsCodeReg')}}</p>
                        </div><!-- 错误验证 -->
                        <div class="u-ipt-box code">
                            <input class="u-ipt"
                                v-model="smsCodeReg"
                                auto-complete="off" placeholder="请输入短信验证码" />
                            <a href="javascript:;"
                                class="code-btn" 
                                @click="getSmsCode()"
                                v-if="!waitSeconds"
                                >获取验证码
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
                            @click="getSmsCode('voice')"
                            class="u-lk">获取不到短信验证码？试试语音验证</a>
                    </div>

                    <div class="m-gp-line m-btn-oper">
                        <button class="u-btn login-btn" @click="onSubmit">登录</button>
                    </div>
                </div>
            </div>

		    <div class="m-other-oper f__clearfix">
		    	<a href="javascript:;" class="u-lk register" @click="goLogin">已有账号？直接登录</a>
		    	<a href="javascript:;" class="u-lk forget" @click="goForget">忘记密码</a>
		    </div><!-- 其他操作 -->
		</div><!-- 注册 -->	
    </div>
	
</template>

<script>

    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // vuex状态管理
    import { mapActions } from 'vuex'

    //引入表单验证
    import { Validator } from 'vee-validate';
    // 最大等待秒数
    const MAX_WAIT_SECONDS = 120;

    export default {
    	name: 'signUp',
        // 自定义表单验证
        validator: null,
    	data () {
    		return {
    			boxTitle : "注册",
                // 注册字段
                telReg: "",
                passReg: "",
                imgCodeReg: "",
                smsCodeReg: "",

                // 表单验证报错集合
                errors: null,
                // 图形验证码所用时间戳
                timestamp: (+new Date()).valueOf(),
                // 我的定时器
                myInterval: null,
                // 验证码等待时间
                waitSeconds: 0,

    		}
    	},
        //生命周期,该组件被创建的时候
        created(){
            
            this.validator = new Validator({
                telReg: 'required|mobile',
                passReg: 'required|alpha_dash|min:6|max:22',
                imgCodeReg: 'required|min:4|max:4',
                smsCodeReg: 'required|min:4|max:4',
            });
            this.$set(this, 'errors', this.validator.errorBag);
            
        },
        mounted(){
            
        },
        activated(){

        },
        deactivated(){
            
        },
        //数据侦听
        watch:{
            telReg(val){
                this.validator.validate('telReg',val);
            },
            passReg(val){
                this.validator.validate('passReg',val);
            },
            imgCodeReg(val){
                this.validator.validate('imgCodeReg',val);
            },
            smsCodeReg(val){
                this.validator.validate('smsCodeReg',val);
            }
        },
        methods:{

            //关闭登录框
    		closeBox(){
    			this.$emit('closeSignUp');
    		},
    		//立即去注册
            goLogin(){
                this.$emit('openSignIn');
            },
    		//忘记密码，去找回密码
    		goForget(){
            	this.$emit('openForget');
            },

            //获取图形验证码
            getImgCodeReg(){
                this.timestamp = (+new Date()).valueOf();
            },
            
            // 获取短信验证码
            getSmsCode(oType){
                let codeType = oType||'text';
                if(this.telReg==""||this.errors.first('telReg')){
                    this.errors.remove('telReg');
                    this.errors.add('telReg', "请正确输入您的手机号", 'auth');
                }else{
                    if(this.imgCodeReg==""||this.errors.first('imgCodeReg')){
                        this.errors.remove('imgCodeReg');
                        this.errors.add('imgCodeReg', "请输入图形验证码", 'auth');
                        return;
                    }
                    //验证手机号是否已被注册
                    this.verifyPhone(this.telReg,(res)=>{

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
                                    this.errors.remove('imgCodeReg');
                                    this.errors.add('imgCodeReg', msg, 'auth');
                                }
                            });

                        }else{      // 未注册（平台没有）
                            this.errors.remove('telReg');
                            this.errors.add('telReg', "此手机号已被注册", 'auth');
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
                        callBack(!isRepeat);
                    }
                })
            },
            // 向后台获取短信验证码，发送到用户手机上
            getSMSCode(type,callBack){
                let data = {
                    Mobile: this.telReg,
                    ImgCode: this.imgCodeReg,
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
                    telReg: this.telReg,
                    passReg: this.passReg,
                    imgCodeReg: this.imgCodeReg,
                    smsCodeReg: this.smsCodeReg,
                }).then((res) => {
                    // 如果验证成功
                    if(res){
                        // 密码修改的数据
                        let data = {
                            mobile: me.telReg,
                            password: me.passReg,
                            vcode: me.smsCodeReg,
                            channel: 'H5',
                        }
                        me.putCommit(data);
                    }
                    
                }).catch(error => {
                    console.log(error);
                });
            },
            // 提交修改
            putCommit(data){
                api.register(data).then((res)=>{
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.closeBox();
                        this.$notify({
                            title: '注册成功',
                            message: '请重新登录！',
                            type: 'success',
                            duration: 1500,
                        });
                        this.$router.push({ path: '/'})
                        this.reset();
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.reset();
                        setTimeout(() => {
                            this.errors.remove('telReg');
                            this.errors.add('telReg', res.msg, 'auth');
                        })
                    }
                });
            },
            // 重置（清空）
            reset(){
                this.telReg = "";
                this.passReg = "";
                this.imgCodeReg = "";
                this.smsCodeReg = "";
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
                
            }

        }
    }
</script>

<!-- 限定作用域 -->
<style lang="stylus" rel="stylesheet/stylus" scope>
    @import './sign.styl'
</style>