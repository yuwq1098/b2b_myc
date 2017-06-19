<template>
	<div class="appCodeBox">
	    <div class="m-app-box">
            <div class="u-app-con">
                
            </div>
        </div>
	</div><!-- 手机扫码盒子 -->
</template>

<script>
    
	export default {
        name: "appCodeBox",
        // 数据
        props:{
            
        },
        data() {
            return{
                
            }
        },
        mounted(){

        },
        //重新进入该组件
        activated(){
            
        },
        //销毁
        deactivated(){
            
        },
        // 自定义函数(方法)
        methods: {
            
        },
        // 在当前模块注册组件
        components:{

        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .m-app-box
        width 106px
        height 182px
        background #e2e2e2
        _borderRadius(10px)
        _completeCenter(auto,15px)
        .u-app-con
            width 88px
            height 132px
            background #fff
            _borderRadius(2px)
            _completeCenter(,,20px,auto)

</style>
