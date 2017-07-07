<template>
	<div class="b2bCarListBox">
	    <div class="m-lst-con">
            <ul class="m-lst f__clearfix">
                <template>
                    <li class="m-item" v-for="(item,index) in carlist">
                        <b2b-car-box
                            :carInfo="item"
                            :loginStatus="loginStatus"
                            >
                        </b2b-car-box>
                    </li>
                </template>
            </ul>
        </div>
		
	</div><!-- 汽车信息盒子 -->
</template>

<script>
    
    // b2b车辆信息盒子组件
    import b2bCarBox from "components/common/b2bCarBox.vue"

	export default {
        name: "b2bCarListBox",
        // 在当前模块注册组件
        components:{
            b2bCarBox,
        },
        // 数据
        props:{
            carlist: Array,
            loginStatus: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return{
                
            }
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
        padding 5px 0 0
        width 1200px
        .m-lst
            width 1220px
            .m-item
                float left
                width 285px
                margin 20px 20px 0 0
                // .m-lk
                //     _display()
                //     width 100%
                //     height 100%
                //     _overflow()
                //     position relative
                // &:hover
                //     _transitionAll(.3s,cubic-bezier(0.04, 0.65, 0.65, 0.92))
                //     _translate3d(,-4px);
                //     _boxShadow(20px,rgba(0,0,0,.15),1px,10px)
                //     h5.u-tit
                //         font-size 16px
                // .u-pic
                //     width 285px
                //     height 200px
                //     img 
                //         width 100%
                //         height 100%
                // .u-con
                //     width 260px
                //     position relative
                //     padding 0 14px
                //     h5.u-tit
                //         height 28px
                //         line-height 28px
                //         font-size 15px
                //         overflow hidden
                //         font-weight normal
                //         margin-top 10px
                //     .u-des
                //         height 22px
                //         line-height 22px
                //         color #959595
                //     .u-price
                //         margin-top 15px
                //         height 22px
                //         line-height 22px
                //         color #545454
                //         em
                //             font-size 20px
                //             color #ff6533
                //             margin-left 3px
                //             font-weight normal
                //     .u-lk
                //         width 85px
                //         height 42px
                //         background #0479cc
                //         color #fff
                //         text-align center
                //         position absolute
                //         top 48px
                //         right 14px
                //         _borderRadius(3px)
                //         p 
                //             font-size 13px
                //             line-height 18px
                //             &.u-count
                //                 margin-top 3px
                //         p strong
                //             font-weight normal
                //     .u-price-low
                //         font-size 13px
                //         position absolute
                //         bottom 0px
                //         right 20px
                //         color #ff6533

</style>
