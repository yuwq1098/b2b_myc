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
		    <div class="m-login-tab f__clearfix">
		    	<a href="javascript:;" class="u-tab-item" @click="changeLoginType(0)" :class="{active:loginType==0}">
		    		密码登录
		    	</a>
		    	<a href="javascript:;" class="u-tab-item"  @click="changeLoginType(1)" :class="{active:loginType==1}">
		    		短信验证码登录
		    	</a>
		    </div><!-- 登录方式选择 -->

            <div class="m-login-ipt" v-show="loginType==0">
                <form class="m-form-gp" @submit.prevent="submitSignIn" ref="signInForm">
                	<div class="m-gp-line">
                	    <div class="u-ipt-box error">
                	    	<input v-validate data-rules="required|mobile" name="username"  class="u-ipt" v-model="lgForm.username" type="text" placeholder="输入手机号/用户名" />
                	    	<div class="u-ico">
                	    	    <i class="iconfont icon-zhanghuffffffpx"></i><!-- 用户 -->
                	    	</div>
                	    </div>
                        <p v-show="false" class="error-validate">用户名输入错误</p><!-- 错误提示 -->
                	</div>
                	<div class="m-gp-line">
                	    <div class="u-ipt-box code">
            				<input class="u-ipt" v-model="lgForm.vcode" type="text" placeholder="请输入图形验证码" />
            			</div>
                		<a class="u-vcode">
                			<img :src="vcodeUrl" @click.stop="getCode"/>
                		</a><!-- 验证码区域 -->
                        <p v-show="false" class="error-validate">请输入图形验证码</p><!-- 错误提示 -->
                	</div>
                	<div class="m-gp-line">
                	    <div class="u-ipt-box">
                		    <input class="u-ipt" v-model="lgForm.password" name="password" type="password" placeholder="6-10位数字、字母、符号的组合" />
                		    <!-- <div class="u-ico">
                		    	<i class="iconfont icon-mimaffffffpx"></i>锁
                		    </div> -->
                		</div>
                        <p v-show="false" class="error-validate">请输入密码</p><!-- 错误提示 -->
                	</div>
                	<div class="m-gp-line m-btn-oper">
                		<button class="u-btn login-btn">登录</button>
                	</div>
                </form>
            </div>
            
            <div class="m-login-ipt" v-show="loginType==1">
		    	<form class="m-form-gp" @submit.prevent="submitSignInByPhone"  ref="signInByPhoneForm">
                	<div class="m-gp-line">
                	    <div class="u-ipt-box">
                	    	<input class="u-ipt" type="text" placeholder="请输入手机号" />
                	    	<div class="u-ico">
                	    	    <i class="iconfont icon-zhanghuffffffpx"></i><!-- 用户 -->
                	    	</div>
                	    </div>
                	</div>
                	<div class="m-gp-line">
                	    <div class="u-ipt-box code">
            				<input class="u-ipt" type="text" placeholder="请输入图形验证码" />
            			</div>
                		<a class="u-vcode">
                			<img :src="vcodeUrl" @click.stop="getCode"/>
                		</a><!-- 验证码区域 -->
                	</div>
                	<div class="m-gp-line">
                	    <div class="u-ipt-box code">
                		    <input class="u-ipt" placeholder="6位数字验证码" />
                		</div>
                		<button class="m-code">发送验证码</button><!-- 发送验证码 -->
                	</div>
                	<div class="m-gp-line m-btn-oper">
                		<button class="u-btn login-btn">登录</button>
                	</div>
                </form>
		    </div>

		    <div class="m-other-oper f__clearfix">
		    	<a href="javascript:;" class="u-lk register" @click="goRegister">立即注册</a>
		    	<a href="javascript:;" class="u-lk forget" @click="goForget">忘记密码</a>
		    </div><!-- 其他操作 -->

		</div><!-- 登录 -->	
    </div>
	
</template>

<script>
    
    import api from "api/getData.js"
    import { mapActions } from 'vuex'

    export default {
    	name: 'signIn',
    	data () {
    		return {
    			boxTitle : "登录",
    			loginType: 0,  //0=密码登录， 1=验证码登录
			    lgForm:{
                    username: "",
                    vcode: "",
                    password: "",
			    },
			    lgFormByPhone:{
                    
			    },
			    vcodeUrl: require("../../assets/img/get_vcode__001.png"),
            }
    	},
    	//属性计算
    	computed:{
            validateUserName(){
                
            },
    	},
    	methods:{
            ...mapActions({ setUserInfo: 'setUserInfo' }),
    		pwdFocus(e){
               e.target.type="password"
    		},
    		pwdBlur(e){
    			let el = e.target;
    		},
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
            //获取验证码
            getCode(){
            	let num = Math.ceil(Math.random()*5)
            	this.vcodeUrl = require("../../assets/img/get_vcode__00"+num+".png");
            },
            //登录表单提交(普通登录)
            submitSignIn(){
                var me = this;
                //本地存储方法
                let {store} = this.method;
                
            	let lgForm = this.lgForm;

                if (!lgForm.username || !lgForm.password || !vcode.password) {
                    console.log('请填写完整')
                    return;
                }
                
                // 解构赋值
                var [data] = [{}]; 
                data.username = lgForm.username;
                data.userpass = lgForm.password;
                data.loginType = 'BusinessPC';

                api.Login(data)
                    .then(res => {
                        if(res.code === 0){
                            store.set('AccessToken',res.data.AccessToken);
                            store.set('AccessSecret',res.data.AccessSecret);
                            this.setUserInfo(res.data)

                            me.closeBox();
                            me.$notify({
                                title: '登录成功',
                                message: '这是一条成功的提示消息',
                                type: 'success',
                                duration: 2000,
                            });

                            api.getMyMemberInfo(data)
                                .then(data => {
                                    console.log(data);
                                })
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            //登录表单提交(手机号登录)
            submitSignInByPhone(){
            	var formData = JSON.stringify(this.user); // 这里才是你的表单数据
                console.log(formData)
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