<!--  
 **  @description 车型级联选择组件
 --> 

<template>
	<div class="modelCascader">
        <div class="m-gk-cascader">
            <el-cascader
                :options="options"
                @active-item-change="brandModelChange"
                :props="props"
                v-model="selectedOptions"
                :placeholder="placeholder"
                style="width: 100%"
                >
            </el-cascader>
        </div>
	</div>
</template>

<script>
    
    // 级联下拉的构造类
    import {brandCascader,seriesCascader,modelCascader} from "base/class/cascader.js"
    // 获取数据的api
    import api from "api/getData.js"
    // 工具类引用
    import {dataToJson} from "assets/js/util.js"

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
            // 文本框提示
            placeholder:{
                type: String,
                default: "请选择相应车型"
            }
        },
        // 再次进入生命周期钩子(因为keep-alive的原因,created和mounted在页面切换过程中都是无效的)
        activated(){
            this._getBrandOptions();   //获取车型级联选择框的初始选项
        },

        // 自定义函数(方法)
        methods: {

            // 获取车型级联选择框的初始选项
            _getBrandOptions(){
                api.getCarBrand().then((res) => {
                    this.options = this._normalizes(res.data,1);
                })
            },

            //根据车品牌获取车系
            _getSeriesOptions(id,index){
                api.getCarSeriesByBrand(id).then((res) => {

                    this.options[index].children = this._normalizes(res.data,2);
                })
            },

            //根据车系获取车型
            _getModelOptions(id,bIndex,sIndex){
                api.getCarModel(id).then((res) => {
                    this.options[bIndex].children[sIndex].children = this._normalizes(res.data,3);
                })
            },
            
            // 格式化相关选项   @type  =1 车品牌，车系，车型
            _normalizes(list,type){
                let arr = [];
                list.forEach((item, index) => {
                    switch(type){
                        case 1:
                            arr.push(new brandCascader(item));
                            break;
                        case 2:
                            arr.push(new seriesCascader(item));
                            break;
                        case 3:
                            arr.push(new modelCascader(item));
                            break;
                    }
                    
                })
                return arr;
            },

            // 车型级联选择选中值发生变化
            brandModelChange(val){
                if(val.length<=1){
                    this.options.forEach((item, index) => {
                        let id = val[0];
                        if(item.value == id){
                            this._getSeriesOptions(id,index);
                            return;
                        }
                    })
                }else if(val.length==2){
                    this.options.forEach((item, index) => {
                        let bId = val[0];
                        if(item.value == bId){
                            this.options[index].children.forEach((sItem, sIndex) => {
                                let sId = val[1];
                                if(sItem.value == sId){
                                    this._getModelOptions(sId,index,sIndex);
                                    return;
                                }
                            })
                        }
                    })
                }
                
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
