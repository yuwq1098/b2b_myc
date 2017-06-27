<!--  
 **  @description 主要用于会员中心的表单item组件
 --> 


<template>
    <div class="gkFormItem">
        <div class="m-form-item">
            <div class="item-error" v-if="errorShow">
                <p class="error-txt">
                    <i class="iconfont icon-jinggao1"></i>{{errorText}}</p>
            </div>
            <div class="item-inner">
                <span class="tit">{{title}}</span>
                <div class="info">
                    
                    <!-- input的type类型不可以动态指定 -->
                    <input 
                        class="u-ipt" 
                        type="password"
                        :placeholder="placeholder"
                        v-model="inputVal"
                        @input="inputChangeEnd"
                        @blur="inputChangeEnd"
                        v-if="inputType=='password'"
                        :name="inputName"
                        :readonly="readonly"
                        :disabled="readonly"
                        />

                    <input 
                        class="u-ipt" 
                        :placeholder="placeholder"
                        v-model="inputVal"
                        @input="inputChangeEnd"
                        @blur="inputChangeEnd"
                        v-if="inputType!='password'"
                        :name="inputName"
                        :readonly="readonly"
                        :disabled="readonly"
                        />
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "gkForm",
        // 在当前模块注册组件
        components:{

        },
        // 数据
        data() {
            return{
                inputVal: "",
            }
        },
        props:{
            // 输入框提示
            placeholder:{
                type: String,
                default: '请输入'
            },
            // 错误提示文本
            errorText:{
                type: String,
                default: '这是一条错误提示'
            },
            // 错误提示文本的显隐
            errorShow:{
                type: Boolean,
                default: false
            },
            // 当前输入框的标题
            title:{
                type: String,
                default: '这是一个标题'
            },
            // 输入框类型
            inputType:{
                type: String,
                default: 'text'
            },
            // input的name
            inputName:String,
            // 输入款只读
            readonly:{
                type: Boolean,
                default: false  
            }
        },
        // 自定义函数(方法)
        methods: {
            inputChangeEnd(){
                this.$emit("inputChangeEnd",this.inputVal)
            }
        },    
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .m-form-item
        width 450px
        min-height 42px
        padding 0 0 20px
        .item-error
            height 28px
            line-height 30px
            margin 0 0 8px 135px
            background #FBEBE6
            _borderAll(#ff6533)
            _borderRadius(1px)
            color #777
            font-size 12px
            .error-txt
                margin-left 10px
                position relative
                padding-left 22px
                .iconfont
                    width 20px
                    height 20px
                    line-height 20px
                    font-size 18px
                    color #ff6533
                    _completeCenter(0,auto)
        .item-inner
            height 42px
            position relative
            .tit
                text-align right
                width 120px
                height @height
                line-height @height
                color #777
                font-size 15px
                _spacingPlus()
                _completeCenter(0,auto,0,auto)
            .info
                width @width - 135px
                height @height
                margin-left 135px
                .u-ipt
                    width @width
                    height @height
                    _borderRadius(1px)
                    padding 0 15px
                    _borderAll(#e2e2e2)
                    &:disabled
                        background #f0f2f4

</style>
