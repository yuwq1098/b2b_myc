<!--  
 **  @description 多行文本输入器
 --> 

<template>
    <div class="gkTextArea">
        <div class="m-textarea">
            <div class="m-textarea-box">
                <el-input 
                    ref="myTextArea"
                    type="textarea"
                    :autosize="{ minRows: 6, maxRows: 8}"
                    resize="none"
                    :maxlength="maxLength"
                    :placeholder="placeholder"
                    v-model="inputVal"
                    @blur="inputEnd"
                    @input="inputEnd"
                    >
                </el-input>
            </div>
            <div class="m-other-box f__clearfix">
                <p class="u-info f__fl"
                    v-if="isShowTips"
                    >{{tips}}</p>
                <span class="u-count f__fr"><em class="vital">{{inputVal.length}}</em>/{{maxLength}}</span>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "gkTextArea",
        // 数据
        data() {
            return{
                inputVal: "",
            }
        },
        props:{
            maxLength: {
                type: Number,
                default: 300,
            },
            tips:{
                type: String,
                default: '*请填写300字之内的说明'
            },
            placeholder:{
                type: String,
                default: '请填写300字之内的说明'
            },
            isShowTips:{
                type: Boolean,
                default: true
            },
            // 初始化的值
            initValue:{
                type: String,
                default: "",
            }
        },
        // 数据侦听
        watch:{
            initValue(val){
                this.inputVal = val;
            }
        },
        created(){
            
        },
        // 再次进入生命周期钩子(因为keep-alive的原因,created和mounted在页面切换过程中都是无效的)
        activated(){
            
        },
        // 自定义函数(方法)
        methods: {
            // 当输入框失去焦点时触发
            inputEnd(){
                if(!this.inputVal) return;
                this.$emit("inputEnd",this.inputVal)
            }
        },
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .m-textarea
        margin 0 0 5px
        .m-other-box
            height 28px
            line-height 28px
            color #b2b2b2
            .u-count
                font-size 13px
                .vital
                    color #ff6533

</style>
