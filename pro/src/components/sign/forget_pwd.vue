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

            <div class="m-login-ipt">
                <form class="m-form-gp" @submit.prevent="submitForget"  ref="forgetForm">
                    <div class="m-gp-line">
                        <div class="u-ipt-box">
                            <input class="u-ipt" type="text" v-model="forgetForm.telephone" placeholder="请输入手机号" />
                            <div class="u-ico">
                                <i class="iconfont icon-zhanghuffffffpx"></i><!-- 用户 -->
                            </div>
                        </div>
                    </div>
                    <div class="m-gp-line">
                        <div class="u-ipt-box code">
                            <input class="u-ipt" type="text" v-model="forgetForm.vcode" placeholder="请输入图形验证码" />
                        </div>
                        <a class="u-vcode">
                            <img :src="vcodeUrl" @click.stop="getCode"/>
                        </a><!-- 验证码区域 -->
                    </div>
                    <div class="m-gp-line">
                        <div class="u-ipt-box code">
                            <input class="u-ipt" type="text" v-model="forgetForm.ncode" placeholder="6位数字验证码" />
                        </div>
                        <button class="m-code">发送验证码</button><!-- 发送验证码 -->
                    </div>
                    <div class="m-gp-line m-btn-oper">
                        <button class="u-btn login-btn">登录</button>
                    </div>
                </form>
            </div>

		</div><!-- 忘记密码 -->	
    </div>
	
</template>

<script>

    export default {
    	name: 'forgetPwd',
    	data () {
    		return {
    			boxTitle : "忘记密码",
                forgetForm: {
                    telephone: "",
                    vcode:"",
                    ncode:"",
                },
                vcodeUrl: require("../../assets/img/get_vcode__001.png"),
    		}
    	},
    	methods:{
    		//关闭登录框
    		closeBox(){
    			this.$emit('closeForgetPwd');
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