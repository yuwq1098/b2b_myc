<!--  
 **  @description b2b车辆详情页 车店在售车源列表
 --> 

<template>
	<div class="onSaleList">
	    <div class="m-lst-con">
            <ul class="m-lst f__clearfix">
                <template>
                    <li class="m-item" v-for="(item,index) in carList">
                        <on-sale-car-box
                            :carInfo="item"
                            :loginStatus="loginStatus"
                            :hasAuth="hasAuth"
                            :hasTextGradient="hasTextGradient"
                            >
                        </on-sale-car-box>
                    </li>
                </template>
            </ul>
        </div>
		
	</div><!-- 汽车信息盒子 -->
</template>

<script>
    
    // dom操作方法
    import * as geekDom from "assets/js/dom.js"
    // b2b在售车源信息盒子组件
    import onSaleCarBox from "components/common/onSaleCarBox.vue"

	export default {
        name: "onSaleList",
        // 在当前模块注册组件
        components:{
            onSaleCarBox,
        },
        // 数据
        data() {
            return{
                // 支持文字渐变
                hasTextGradient: geekDom.supportCssToBrowser(['-webkit-background-clip','-webkit-text-fill-color']),
            }
        },
        props:{
            carList: Array,
            loginStatus: {
                type: Boolean,
                default: false,
            },
            hasAuth: {
                type: String,
                default: "",
            },
        },
        //数据侦听
        watch:{

        },
        created(){
            
        },
        mounted(){
            
        },
        // 自定义函数(方法)
        methods: {
            
        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .m-lst-con
        padding 15px 0 0
        width 1200px
        .m-lst
            width 1215px
            _translate3d(0,-15px)
            margin 0 0 0 -15px
            .m-item
                float left
                width 228px
                margin 15px 0 0 15px

</style>
