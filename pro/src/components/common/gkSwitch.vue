<!--  
 **  @description Switch开关
 --> 

<template>
    <div class="gkSwitch">
        <div class="m-switch-wrap f__clearfix">
            <span class="u-info">{{text}}</span>
            <el-switch
                v-model="switchVal"
                on-color="#2BDE7B"
                :width="48"
                on-text="是"
                off-color="#FF4D66"
                off-text="否"
                >
            </el-switch>
        </div>
    </div>
</template>

<script>

    export default {
        name: "gkSwitch",
        // 数据
        data() {
            return{
                switchVal: "",
            }
        },
        props:{
            text:{
                type: String,
                default: "这是一个开关Switch"
            }
        },
        // 数据侦听
        watch:{
            switchVal:function(val){
                this.$emit("switchEnd",this.switchVal)
            }
        },
        // 再次进入生命周期钩子(因为keep-alive的原因,created和mounted在页面切换过程中都是无效的)
        activated(){

        },
        // 自定义函数(方法)
        methods: {
            
        },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .el-switch
        cursor pointer
        *
            cursor pointer     
</style>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .m-switch-wrap
        line-height 28px
        height 28px
        .el-switch
            margin-top 3px
            float right
            margin-right 8px
        .u-info
            height 28px
            line-height 28px
            color #4a5c69
            _spacingPlus()
            float right
            

</style>
