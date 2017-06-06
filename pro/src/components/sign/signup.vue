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

            <div class="m-login-ipt">
                <form class="m-form-gp" @submit.prevent="submitSignUp" ref="signUpForm">
                    <div class="m-gp-line">
                        <div class="u-ipt-box">
                            <input class="u-ipt" v-model="regForm.telephone" type="text" placeholder="输入手机号/用户名" />
                            <div class="u-ico">
                                <i class="iconfont icon-zhanghuffffffpx"></i><!-- 用户 -->
                            </div>
                        </div>
                    </div>
                    <div class="m-gp-line">
                        <div class="u-ipt-box">
                            <input class="u-ipt" v-model="regForm.password" name="password" type="password" placeholder="请设置6-10位数字、字母、符号的组合" />
                        </div>
                    </div>
                    <div class="m-gp-line">
                        <div class="u-ipt-box">
                            <input class="u-ipt" v-model="regForm.checkPass" name="password" type="password" placeholder="请确认您输入的密码" />
                        </div>
                    </div>
                    <div class="m-gp-line">
                        <div class="u-ipt-box code">
                            <input class="u-ipt" v-model="regForm.vcode" type="text" placeholder="请输入图形验证码" />
                        </div>
                        <a class="u-vcode">
                            <img :src="vcodeUrl" @click.stop="getCode"/>
                        </a><!-- 验证码区域 -->
                    </div>

                    <div class="m-gp-line m-btn-oper">
                        <button class="u-btn login-btn">登录</button>
                    </div>
                </form>
            </div>

		    <div class="m-other-oper f__clearfix">
		    	<a href="javascript:;" class="u-lk register" @click="goLogin">已有账号？直接登录</a>
		    	<a href="javascript:;" class="u-lk forget" @click="goForget">忘记密码</a>
		    </div><!-- 其他操作 -->
		</div><!-- 注册 -->	
    </div>
	
</template>

<script>

    export default {
    	name: 'signUp',
    	data () {
    		return {
    			boxTitle : "注册",
                regForm : {
                    telephone: "",
                    password: "",
                    checkPass: "",
                    getCode: "",
                },
                vcodeUrl: require("../../assets/img/get_vcode__001.png"),
    		}
    	},
        mounted(){

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
            //获取验证码
            getCode(){
                let num = Math.ceil(Math.random()*5)
                this.vcodeUrl = require("../../assets/img/get_vcode__00"+num+".png");
            },
        }
    }
</script>

<!-- 限定作用域 -->
<style lang="stylus" rel="stylesheet/stylus" scope>
    @import './sign.styl'
</style>