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
            }
        }
    }
</script>

<!-- 限定作用域 -->
<style lang="stylus" rel="stylesheet/stylus" scope>
    @import './sign.styl'
</style>