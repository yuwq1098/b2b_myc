<!--  
 **  @description select下拉选择器
 --> 

<template>
    <div class="gkSelect">
        <div class="m-gk-select" v-if="options">
            <el-select 
                v-model="selectedVal"
                style="width:100%"
                :placeholder="placeholder"
                >
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>
    </div>
</template>

<script>

    export default {
        name: "gkSelect",
        // 数据
        data() {
            return{
                selectedVal: '',
            }
        },
        props:{
            // 文本框提示
            placeholder:{
                type: String,
                default: "请选择"
            },
            options: {
                type: Array,
                default: function () {
                    let arr = [
                        {
                            label: '测试1',
                            value: '1',
                        },
                        {
                            label: '测试2',
                            value: '2',
                        },
                    ]
                    return arr
                } 
            },
            // 初始化的值
            initValue:{
                type: [String,Number],
                default: "",
            },

        },
        // 数据侦听
        watch:{
            // 当用户选中的值变化了，再将事件派发给父组件
            selectedVal: function(val){
                this.$emit("selectedEnd",this.selectedVal)
            },
            initValue(val){
                if(this.options.length==0) return;
                this.options.forEach((item,index) => {
                    if(item.value.toString()==val){
                        this.changeSelected(item.label,item.value);
                    }
                })
            }
        },
        // 再次进入生命周期钩子(因为keep-alive的原因,created和mounted在页面切换过程中都是无效的)
        activated(){

        },
        // 自定义函数(方法)
        methods: {
            changeSelected(label,value){
                this.selectedVal = value;
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
