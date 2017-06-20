<template>
	<div class="promptInfo">
        <div class="m-prompt-info">
            <span class="u-tip">温馨提示：</span>
            <p class="u-info">{{info}}</p>
        </div>
	</div><!-- 温馨提示 -->
</template>

<script>
    
	export default {
        name: "promptInfo",
        // 数据
        props:{
            info: String, 
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
    .m-prompt-info
        padding 0 15px
        position relative
        color #a5a5a5
        margin 10px 0 0
        padding 0 0 10px
        min-height 28px
        .u-tip
            width 80px
            line-height 28px
            text-align right
            _display()
            _completeCenter(15px,auto,0,auto)
        .u-info
            padding-left 98px
            line-height 28px


</style>
