<!--  
 **  @description 日期选择器（不带时间）
 --> 

<template>
    <div class="datePicke">
        <div class="m-gk-cascader">
            <el-date-picker
                v-model="selectedDate"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions">
            </el-date-picker>
        </div>
    </div>
</template>

<script>

    export default {
        name: "datePicke",
        // 数据
        data() {
            return{
                selectedDate: "",   //用户选择的时间
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
            }
        },
        props:{
            
        },
        // 数据侦听
        watch:{
            // 当用户选中的值变化了，再将事件派发给父组件
            selectedDate: function(val){
                this.$emit("dateChangeEnd",this.selectedDate)
            }
        },
        // 再次进入生命周期钩子(因为keep-alive的原因,created和mounted在页面切换过程中都是无效的)
        activated(){
            
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
    @import '../../assets/css/mixin.styl'

</style>
