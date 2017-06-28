<template>
    <div id="signIn">
        <div class="m-mask-bg"></div><!-- 遮罩层 -->
        <div class="m-sign-box signin">
		    <div class="m-sign-hd">
		    	<span class="m-hd-tit">{{boxTitle}}</span>
		    	<a href="javascript:;" class="u-close" @click="closeBox">
		    		<i class="iconfont icon-close"></i>
		    	</a>
		    </div>
		    <!-- <div class="m-login-tab f__clearfix">
		    	<a href="javascript:;" class="u-tab-item" @click="changeLoginType(0)" :class="{active:loginType==0}">
		    		密码登录
		    	</a>
		    	<a href="javascript:;" class="u-tab-item"  @click="changeLoginType(1)" :class="{active:loginType==1}">
		    		短信验证码登录
		    	</a>
		    </div> --><!-- 登录方式选择 -->
            <div class="m-login-tab one">
                <a href="javascript:;" class="u-tab-item active">
                    账号登录
                </a>
            </div><!-- 框标题 -->


            <div class="m-login-ipt" v-show="loginType==0">
                <div class="m-form-gp">
                	<div class="m-gp-line">
                        <div class="item-error" v-if="errors.has('nameOne')">
                            <p class="error-txt">
                                <i class="iconfont icon-jinggao1"></i>{{errors.first('nameOne')}}</p>
                        </div><!-- 错误验证 -->
                	    <div class="u-ipt-box">
                	    	<input name="username" auto-complete="off" class="u-ipt" v-model="nameOne" type="text" placeholder="输入手机号" />
                	    	<div class="u-ico">
                	    	    <i class="iconfont icon-zhanghuffffffpx"></i><!-- 用户 -->
                	    	</div>
                	    </div>
                	</div>

                	<div class="m-gp-line">
                        <div class="item-error" v-if="errors.has('passOne')">
                            <p class="error-txt">
                                <i class="iconfont icon-jinggao1"></i>{{errors.first('passOne')}}</p>
                        </div><!-- 错误验证 -->
                	    <div class="u-ipt-box">
                		    <input class="u-ipt" v-model="passOne" auto-complete="off" name="password" type="password" placeholder="由6~22位数字、字母的组合" />
                		</div>
                	</div>
                	<div class="m-gp-line m-btn-oper">
                		<button class="u-btn login-btn" @click="onSubmitOne">登录</button>
                	</div>
                </div>
            </div><!-- 普通登录方式 -->


            <div class="m-login-ipt" v-show="loginType==1">
		    	<div class="m-form-gp">
                	<div class="m-gp-line">
                        <div class="item-error" v-if="errors.has('telTwo')">
                            <p class="error-txt">
                                <i class="iconfont icon-jinggao1"></i>{{errors.first('telTwo')}}</p>
                        </div><!-- 错误验证 -->
                	    <div class="u-ipt-box">
                	    	<input class="u-ipt"
                                v-model="telTwo" 
                                auto-complete="off" type="text" placeholder="请输入手机号" />
                	    	<div class="u-ico">
                	    	    <i class="iconfont icon-zhanghuffffffpx"></i><!-- 用户 -->
                	    	</div>
                	    </div>
                	</div>

                	<div class="m-gp-line">
                        <div class="item-error" v-if="errors.has('imgCodeTwo')">
                            <p class="error-txt">
                                <i class="iconfont icon-jinggao1"></i>{{errors.first('imgCodeTwo')}}</p>
                        </div><!-- 错误验证 -->
                	    <div class="u-ipt-box code">
            				<input class="u-ipt" 
                                v-model="imgCodeTwo" 
                                auto-complete="off" type="text" placeholder="请输入图形验证码" />
                            <a href="javascript:;"
                                class="img-btn" 
                                @click="getImgCodeTwo()"
                                >
                                <img class="u-pic" 
                                    :src="'http://www.muyouche.com/action2/ImgRandomCode.ashx?FS=18&a='+timestamp"/>
                            </a>
            			</div>
                	</div>
                	<div class="m-gp-line">
                        <div class="item-error" v-if="errors.has('smsCodeTwo')">
                            <p class="error-txt">
                                <i class="iconfont icon-jinggao1"></i>{{errors.first('smsCodeTwo')}}</p>
                        </div><!-- 错误验证 -->
                	    <div class="u-ipt-box code">
                		    <input class="u-ipt"
                                v-model="smsCodeTwo"
                                auto-complete="off" placeholder="请输入短信验证码" />
                            <a href="javascript:;"
                                class="code-btn" 
                                @click="getSmsCodeTwo()"
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
                    
                	<div class="m-gp-line m-btn-oper">
                		<button class="u-btn login-btn"  @click="onSubmitTwo">登录</button>
                	</div>
                </div>
		    </div><!-- 手机号登录方式 -->


		    <div class="m-other-oper f__clearfix">
		    	<a href="javascript:;" class="u-lk register" @click="goRegister">没有账号？前往注册</a>
		    	<a href="javascript:;" class="u-lk forget" @click="goForget">忘记密码</a>
		    </div><!-- 其他操作 -->

		</div><!-- 登录 -->	
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
    	name: 'signIn',
        // 自定义表单验证
        validator: null,
    	data () {
    		return {
    			boxTitle : "登录",
    			loginType: 0,  //0=密码登录， 1=验证码登录
                
                // 表单验证报错集合
                errors: null,
                // 普通登录
                nameOne: "",
                passOne: "",
                // 手机号登录
                telTwo: "",
                imgCodeTwo: "",
                smsCodeTwo: "",
                // 图形验证码所用时间戳
                timestamp: (+new Date()).valueOf(),
                // 验证码等待时间
                waitSeconds: 0,

            }
    	},
        //生命周期,该组件被创建的时候
        created(){
            
            this.validator = new Validator({
                nameOne: 'required|mobile',
                passOne: 'required|alpha_dash|min:6|max:22',
                telTwo: 'required|mobile',
                imgCodeTwo: 'required|min:4|max:4',
                smsCodeTwo: 'required|min:4|max:4',
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
            nameOne(val){
                this.validator.validate('nameOne',val);
            },
            passOne(val){
                this.validator.validate('passOne',val);
            },
        },
    	methods:{
            ...mapActions(['setUserInfo']),

            //关闭登录框
            closeBox(){
                this.$emit('closeSignIn');
            },
            //更换登录模式
            changeLoginType(num){
                this.loginType = num
            },
            //立即去注册
            goRegister(){
                this.$emit('openSignUp');
            },
            //忘记密码，去找回密码
            goForget(){
                this.$emit('openForget');
            },


            //登录表单提交(普通登录)
            onSubmitOne(){
                let me = this;
                this.validator.validateAll({
                    nameOne: this.nameOne,
                    passOne: this.passOne,
                }).then(() => {
                    
                    let data = {
                        username: this.nameOne,
                        userpass: this.passOne,
                        loginType: 'BusinessPC'
                    }
                    me.putCommitOne(data);
                    
                }).catch(error => {
                    console.log(error);
                });

            },
            
            // 提交普通登录
            putCommitOne(data){
                api.Login(data)
                    .then(res => {
                        if(res.code === SYSTEM.CODE_IS_OK){
                            this.setUserInfo(res.data)
                            this.closeBox();
                            this.$notify({
                                title: '登录成功',
                                message: '恭喜您登录成功！',
                                type: 'success',
                                duration: 1200,
                            });
                            //清空普通登录框
                            this.resetOne();

                        }else if(res.code==SYSTEM.CODE_IS_ERROR){
                            this.resetOne();
                            setTimeout(() => {
                                this.errors.remove('nameOne');
                                this.errors.add('nameOne', res.msg, 'auth');
                            })
                            
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            
            //重置普通登录表单数据
            resetOne(){
                this.nameOne = "";
                this.passOne = "";
                // 因为设置为空时会触发数据侦听的验证方法，所以给个setTimeOut
                setTimeout(() => {
                    this.errors.clear();
                })
            },
            
            //登录表单提交(手机号登录)
            onSubmitTwo(){
                let me = this;
                this.validator.validateAll({
                    telTwo: this.telTwo,
                    imgCodeTwo: this.imgCodeTwo,
                    smsCodeTwo: this.smsCodeTwo,
                }).then(() => {
                    let data = {
                        username: this.nameOne,
                        userpass: this.passOne,
                        loginType: 'BusinessPC'
                    }
                    me.putCommitOne(data);
                    
                }).catch(error => {
                    console.log(error);
                });
            },

            //获取验证码
            getImgCodeTwo(){
                this.timestamp = (+new Date()).valueOf();
            },

    	}
    }
</script>

<!-- 限定作用域 -->
<style lang="stylus" rel="stylesheet/stylus" scope>
    @import './sign.styl'
    
</style>