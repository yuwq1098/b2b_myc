<!--  
 **  @description 城市级联选择组件
 --> 

<template>
    <div class="gkCitySelect">
        <div class="m-city-sel">
            <el-cascader
                :options="options"
                @active-item-change="cityChange"
                :props="props"
                v-model="selectedOptions"
                style="width: 100%"
                :class="{'hasVal':selectedOptions.length>0}"
                :placeholder="placeholder"
                ref="cityCascader"
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
        name: "gkCitySelect",
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
                // 当它有值再外传
                if(val.length>0){
                    let allName =  this._getCityAllName()
                    this.$emit("valChangeEnd",this.selectedOptions,allName)
                }
            }
        },
        computed:{
            isNotKeepAlive(){
                return this.$router.currentRoute.meta.notKeepAlive;
            }
        },
        props:{
            placeholder:{
                type: String,
                default: "请选择城市"
            },
            myValue:{
                type: String,
                default: ""
            }
        },

        // 不使用keep-alive时,走这个生命周期
        created(){
            this._getProvinceOptions();   //获取省份级联选择框的初始选项
            // 当有用户默认指定的值时
        },

        // 再次进入生命周期钩子(因为keep-alive的原因,created和mounted在页面切换过程中都是无效的)
        activated(){
            
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
            },
            
            // 获取城市全名
            _getCityAllName(){
                let arr = this.$refs.cityCascader.currentLabels;
                let allName = "";
                if(arr&&arr.length==2){
                    arr.forEach((item,index)=>{
                        if(index==arr.length-1){
                            allName = allName + item
                        }else{
                            allName = allName + item + "/"
                        }
                    });
                    return allName;
                };
            },
            
            // 清除值
            clearVal(){
                this.selectedOptions = [];          
            },

        },
        // 在当前模块注册组件
        components:{

        },
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus">
    @import '~assets/css/mixin.styl'
    .m-city-sel
        width 170px
        .el-cascader
            width @width
            height 30px
            .el-cascader__label
                height 30px
                line-height @height
            .el-input
                .el-input__icon
                    color #c2c2c2
                    font-size 12px
            .el-input__inner
                _borderAll(#d8d8d8)
                _borderRadius(2px)
                height 32px
                padding 3px 10px
                color #40474a
                _placeholder(#a5a5a5)
            &.hasVal
                .el-input__icon
                    _display(none)
                .el-input__inner
                    _borderAll($c_blue)
                .el-cascader__label
                    color $c_blue
    .el-cascader-menus
        margin 7px 0
    .el-cascader-menu
        padding 3px 0
        .el-cascader-menu__item
            font-size 13px
            padding 4px 8px
            height 34px
            line-height 26px
        .el-cascader-menu__item:hover
            background #f2f2f2
            color $c_blue
        .el-cascader-menu__item.is-active,
        .el-cascader-menu__item.is-active:hover
            background-color $c_blue
            color #f4f4f4

        
</style>
