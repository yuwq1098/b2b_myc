<!--  
 **  @description 定制的输入框input
 --> 

<template>
    <div class="gkInput">
        <div class="m-input-wrap">
            <el-input 
                :placeholder="placeholder"
                v-model="inputVal"
                @input="inputChangeEnd"
                @blur="inputChangeEnd"
                ref="myInput"
                >
            </el-input>
            <span v-if="unit" class="u-unit">{{unit}}</span>
        </div>
    </div>
</template>

<script>

    export default {
        name: "gkSwitch",
        // 数据
        data() {
            return{
                inputVal: "",
            }
        },
        props:{
            placeholder:{
                type: String,
                default: "请填写数据"
            },
            // 初始化的值
            initValue:{
                type: [String,Number],
                default: "",
            },
            //单位
            unit: String,
            // 输入类型
            iptType:{
                type: String,
                default: "text",
            },
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

            inputChangeEnd(){
                
                if(this.iptType==='number'){
                    this.$nextTick(() => {
                        this.inputVal = this.inputVal.replace(/[^\d]+/g,'');
                    });
                }
                
                setTimeout(()=>{
                    this.$emit("inputChangeEnd",this.inputVal);
                });
                
            },
        },
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .m-input-wrap
        position relative
        .u-unit
            _display(inline-block)
            height 24px
            line-height 24px
            font-size 13px
            color #4a5c69
            _completeCenter(auto,10px)
            text-align right
</style>
