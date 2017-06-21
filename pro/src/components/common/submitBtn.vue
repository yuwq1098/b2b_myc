<!--  
 **  @description 表单提交
 --> 

<template>
    <div class="submitBtn">
        <div class="m-submit-wrap">
            <el-button 
                type="primary"
                @click="submitFn"
                >
                {{btnText}}
            </el-button>
        </div>
    </div>
</template>

<script>

    export default {
        name: "submitBtn",
        // 数据
        data() {
            return{
                
            }
        },
        props:{
            btnText:{
                type: String,
                default: "提交"
            }
        },
        // 数据侦听
        watch:{

        },
        // 再次进入生命周期钩子(因为keep-alive的原因,created和mounted在页面切换过程中都是无效的)
        activated(){

        },
        // 自定义函数(方法)
        methods: {
            // 表单提交
            submitFn(){
                this.$emit("submitTrigger")
            }
        },
    }
</script>


<style lang="stylus" rel="stylesheet/stylus">
.el-button
    cursor pointer
    *
        cursor pointer
</style>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '../../assets/css/mixin.styl'
    .m-submit-wrap
        width 100%
        height 60px
        line-height 60px
        position relative
        .el-button
            height 38px
            width 180px
            font-size 15px
            _spacingPlus(3px)
            _completeCenter()
            background $c_blue + 5% - 3deg
            &:hover
                background $c_blue + 3%
</style>
