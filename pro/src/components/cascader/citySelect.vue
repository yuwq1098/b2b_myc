<!--  
 **  @description 城市级联选择组件
 --> 

<template>
    <div class="cityCascader">
        <div class="m-gk-cascader">
            <el-cascader
                :options="options"
                @active-item-change="cityChange"
                :props="props"
                v-model="selectedOptions"
                style="width: 100%"
                :placeholder="placeholder"
                >
            </el-cascader>
        </div>
    </div>
</template>

<script>
    
    // 级联下拉的构造类
    import {provinceCascader,cityCascader} from "base/class/cascader.js"
    // 获取数据的api
    import api from "api/getData.js"

    export default {
        name: "modelCascader",
        // 数据
        data() {
            return{
                // 车型级联选择
                options: [],

                // 已经选择的值=>用以判断用户是否真的选中了值
                selectedOptions: [],

                // 级联选择组件的props
                props: {
                    value: 'value',
                    children: 'children'    
                }
            }
        },
        // 数据侦听
        watch:{
            // 当用户选中的值变化了，再将事件派发给父组件
            selectedOptions: function(val){
                this.$emit("valChangeEnd",this.selectedOptions)
            }
        },
        props:{
            placeholder:{
                type: String,
                default: "请选择城市"
            }
        },
        // 再次进入生命周期钩子(因为keep-alive的原因,created和mounted在页面切换过程中都是无效的)
        activated(){
            this._getProvinceOptions();   //获取省份级联选择框的初始选项
        },

        // 自定义函数(方法)
        methods: {

            // 获取省份级联选择框的初始选项
            _getProvinceOptions(){
                api.getAllProvince().then((res) => {
                    this.options = this._normalizes(res.data,1);
                })
            },

            //根据车省份获取城市
            _getCityOptions(code,index){
                api.getCityForProvince(code).then((res) => {
                    this.options[index].children = this._normalizes(res.data,2);
                })
            },
            
            // 格式化相关选项   @type  =1 省份， =2 城市
            _normalizes(list,type){
                let arr = [];
                list.forEach((item, index) => {
                    switch(type){
                        case 1:
                            arr.push(new provinceCascader(item));
                            break;
                        case 2:
                            arr.push(new cityCascader(item));
                            break;
                    }
                    
                })
                return arr;
            },

            // 城市级联选择选中值发生变化
            cityChange(val){
                this.options.forEach((item, index) => {
                    let code = val[0];
                    if(item.value == code){
                        this._getCityOptions(code,index);
                        return;
                    }
                })
            }  
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
