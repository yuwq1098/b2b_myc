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
                >
            </el-cascader>
        </div>
	</div>
</template>

<script>
	export default {
        name: "modelCascader",
        // 数据
        data() {
            return{
                // 车型级联选择
                options: [{
                    label: '江苏',
                    value: '1',
                    children: []
                }, {
                    label: '浙江',
                    value: '5',
                    children: []
                }],

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

        },
        // 自定义函数(方法)
        methods: {
            // 车型级联选择选中值发生变化
            brandModelChange(val){
                console.log('active item:', val);
                setTimeout(() => {

                    if (val.indexOf('1') > -1 && !this.options[0].children.length) {
                        this.options[0].children = [{
                            label: '南京',
                            value: '554',
                        }];
                    } else if (val.indexOf('5') > -1 && !this.options[1].children.length) {
                        this.options[1].children = [{
                            label: '杭州',
                            value: '2064',
                        }];
                    }
                    
                }, 20);
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
    .m-hint-bar
        _display()
        margin 15px 0
        padding 0 15px
        font-size 15px
        color #545454
        height 44px 
        line-height 44px
        background #fff6e5
        border 1px solid #f9c874
        .u-vital
            color $c_blue
</style>
