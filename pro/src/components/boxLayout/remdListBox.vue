<template>
	<div class="remdListBox">
	    <div class="m-lst-con">
            <ul class="m-lst f__clearfix">
                <template>
                    <li class="m-item" v-for="(item,index) in carList">
                        <recommend-box
                            :carInfo="item"
                            :loginStatus="loginStatus"
                            :hasDeposit="hasDeposit"
                            >
                        </recommend-box>
                    </li>
                </template>
            </ul>
        </div>
		
	</div><!-- 汽车信息盒子 -->
</template>

<script>
    
    // b2b车辆信息盒子组件
    import recommendBox from "components/common/recommendBox.vue"

	export default {
        name: "b2bCarListBox",
        // 在当前模块注册组件
        components:{
            recommendBox,
        },
        // 数据
        data() {
            return{
                // 是否有保证金
                hasDeposit: false,
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
            memberData:{
                handler(curVal,oldVal){
                    if(curVal){
                        this.hasDeposit = +(curVal.credit)>1000;
                    }
                },
                deep:true
            }
        },
        created(){
            setTimeout(() => {
                if(this.memberData){
                    this.hasDeposit = +(this.memberData.credit)>1000;
                }
            })
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
        width 1200px
        position relative
        .m-lst
            width 1220px
            margin -20px 0
            padding 0 0 0
            .m-item
                float left
                width 285px
                margin 20px 20px 0 0

</style>
