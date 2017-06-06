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
		</div><!-- 忘记密码 -->	
    </div>
	
</template>

<script>

    export default {
    	name: 'forgetPwd',
    	data () {
    		return {
    			boxTitle : "忘记密码",

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