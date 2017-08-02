<!--  
 **  @description 日期选择器（不带时间）
 --> 

<template>
    <div class="datePicke">
        <div class="m-gk-cascader">
            <el-date-picker
                v-model="selectedDate"
                type="date"
                :placeholder="placeholder"
                style="width:100%"
                :picker-options="pickerOptions"
                ref="datePicke"
                >
            </el-date-picker>
        </div>
    </div>
</template>

<script>

    import * as geekDom from "assets/js/dom.js"  

    export default {
        name: "datePicke",
        // 数据
        data() {
            return{
                selectedDate: "",   // 用户选择的时间
                pickerOptions: {},  // 日期选择器的配置
            }
        },
        props:{
            disabledPrevYear: Number,
            placeholder:{
                type: String,
                default: "请选择日期"
            },
            // 初始化的值
            initValue:{
                type: String,
                default: "",
            },
        },
        // 数据侦听
        watch:{
            // 当用户选中的值变化了，再将事件派发给父组件
            selectedDate: function(val){
                this.$emit("dateChangeEnd",this.selectedDate)
            },
            initValue(val){
                this.selectedDate = val;
            }
        },
        // 再次进入生命周期钩子(因为keep-alive的原因,created和mounted在页面切换过程中都是无效的)
        activated(){
            setTimeout(() => {
                let me = this;
                this.pickerOptions.disabledDate = function(time) {
                    return time.getTime() < +new Date(geekDom.getDateByInt(me.disabledPrevYear));
                }
            })
            
        },
        // 自定义函数(方法)
        methods: {
            // 清空日期数据
            clearDate(){
                this.selectedDate = "";
            }
        },
        // 在当前模块注册组件
        components:{

        },
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'

</style>
