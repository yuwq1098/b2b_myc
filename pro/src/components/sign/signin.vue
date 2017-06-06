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
                <form class="m-form-gp">
                	<div class="m-gp-line">
                	    <div class="u-ipt-box">
                	    	<input class="u-ipt" type="text" placeholder="输入手机号" />
                	    </div>
                	</div>
                	<div class="m-gp-line">
                	    <div class="u-ipt-box code">
            				<input class="u-ipt" type="text" placeholder="请输入图形验证码" />
                		</div>
                		<a class="u-code"></a>
                	</div>
                	<div class="m-gp-line">
                	    <div class="u-ipt-box">
                		    <input class="u-ipt" type="text" placeholder="6-10位数字、字母、符号的组合" />
                		</div>
                	</div>
                	<div class="m-gp-line m-btn-oper">
                		<button class="u-btn login-btn">登录</button>
                	</div>
                </form>
            </div>
            
            <div class="m-login-ipt" v-show="loginType==1">
		    	短信验证码登录
		    </div>
		    
		    <!-- <div class="m-login-ipt" v-show="loginType==0">
		    	<el-form :model="ruleForm" :rules="rules2" ref="ruleForm" label-width="0" class="demo-ruleForm">
				    <el-form-item prop="pass">
					    <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item prop="checkPass">
					    <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item>
					    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
					</el-form-item>
				</el-form>
		    </div> -->

		    <div class="m-other-oper f__clearfix">
		    	<a href="javascript:;" class="u-lk register" @click="goRegister">立即注册</a>
		    	<a href="javascript:;" class="u-lk forget" @click="goForget">忘记密码</a>
		    </div><!-- 其他操作 -->

		</div><!-- 登录 -->	
    </div>
	
</template>

<script>

    export default {
    	name: 'signIn',
    	data () {
    		var validatePass = (rule, value, callback) => {
		        if (value === '') {
		            callback(new Error('请输入密码'));
		        } else {
		            if (this.ruleForm.checkPass !== '') {
		                this.$refs.ruleForm.validateField('checkPass');
		            }
		            callback();
		        }
		    };
		    var validatePass2 = (rule, value, callback) => {
		        if (value === '') {
		            callback(new Error('请再次输入密码'));
		        } else if (value !== this.ruleForm.pass) {
		            callback(new Error('两次输入密码不一致!'));
		        } else {
		            callback();
		        }
		    };
    		return {
    			boxTitle : "登录",
    			loginType: 0,  //0=密码登录， 1=验证码登录
    			ruleForm: {
			        pass: '',
			        checkPass: '',
			        age: ''
			    },
			    rules2: {
			        pass: [
			            { validator: validatePass, trigger: 'blur' }
			        ],
			        checkPass: [
			            { validator: validatePass2, trigger: 'blur' }
			        ]
			    },
            }
    	},
    	methods:{
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
            }

    	},
        mounted(){
         
        },
    }
</script>

<!-- 限定作用域 -->
<style lang="stylus" rel="stylesheet/stylus" scope>
    @import './sign.styl'
    
</style>