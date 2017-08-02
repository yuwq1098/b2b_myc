<!--  
 **  @description 表单提交
 --> 

<template>
    <div class="submitBtn">
        <div class="m-submit-wrap">
            <button
                class="el-button"
                :class="{'submiting':submiting,'autoRight':autoRight}"
                @click="submitFn"
                >
                <div class="la-line-scale la-sm" v-if="submiting">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <template v-if="!submiting">{{btnText}}</template>
                <span class="text" v-if="submiting">提交中</span>
            </button>
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
            },
            submiting:{
                type: Boolean,
                default: false
            },
            autoRight:{
                type: Boolean,
                default: false  
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
                // 如果在提交中,那么再次点击无效
                if(!this.submiting){
                    this.$emit("submitTrigger")
                }
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
    @import '~assets/css/mixin.styl'
    @import '~assets/css/line-scale.min.css'

    .m-submit-wrap
        width 100%
        height 60px
        line-height 60px
        position relative
        .el-button
            height 38px
            width 240px
            font-size 15px
            _spacingPlus(3px)
            _borderRadius(3px)
            _completeCenter()
            background $c_blue
            border none
            color #f2f2f2
            &:hover
                background @background - 12%
            &.submiting
                background #B8BCBF
                &:hover
                    background @background
                .la-line-scale
                    _completeCenter(auto,80px)
                .text
                    margin-right 30px
            &.autoRight
                width 220px
                _spacingPlus(4px)
                _borderRadius(2px)
                _completeCenter(auto,0)

</style>
