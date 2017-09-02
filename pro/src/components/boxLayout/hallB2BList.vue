<template>
	<div class="hallB2bList">
	    <div class="m-lst-con">
            <ul class="m-lst f__clearfix">
                <template>
                    <li class="m-item" v-for="(item,index) in carList">
                        <hall-b2b-box
                            :carInfo="item"
                            :loginStatus="loginStatus"
                            :isAuthSuccess="memberData&&memberData.isAuthSuccess"
                            >
                        </hall-b2b-box>
                    </li>
                </template>
            </ul>
        </div>
		
	</div><!-- 汽车信息盒子 -->
</template>

<script>
    
    // b2b车辆信息盒子组件
    import hallB2bBox from "components/common/hallB2bBox.vue"

	export default {
        name: "hallB2bList",
        // 在当前模块注册组件
        components:{
            hallB2bBox,
        },
        // 数据
        data() {
            return{

            }
        },
        props:{
            carList: Array,
            loginStatus: {
                type: Boolean,
                default: false,
            },
            memberData: Object,
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
