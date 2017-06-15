<template>
	<div class="carListBox">
	    <div class="m-lst-con">
            <ul class="m-lst f__clearfix">
                <li class="m-item" v-for="item in carlist">
                    <router-link :to="{path:carToPath, query: { CarId: item.id }}" class="u-box">
                        <div class="u-pic">
                            <img v-lazy="item.imgUrl" :alt="item.name"/>
                        </div>
                        <div class="u-con">
                            <h5 class="u-tit">
                                {{item.name}}
                            </h5>
                            <p class="u-des">{{item.inCity}}/{{item.plateDate | dateFnToYear }}/{{item.mileage | mileFn}}</p>
                            <div class="u-price">
                                零售价:<em>{{item.retailPrice | priceToFixed(1)}}</em>
                            </div>

                            <a href="javascript:;" class="u-lk" v-if="boxType=='b2b'">
                                <p class="u-count">
                                    <strong>215</strong>
                                    次
                                </p>
                                <p>围观</p>
                            </a>
                            <p class="u-price-low" v-else-if="boxType=='b2c'">
                            	最低价:<em>xxx万</em>
                            </p>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
		
	</div><!-- 汽车信息盒子 -->
</template>

<script>

	export default {
        name: "carListBox",
        // 数据
        props:{
            carlist: Array,
            carToPath: String,
            boxType: {
            	type: String,
            	default: 'b2c'
            },
        },
        data() {
            return{
                
            }
        },
        mounted(){
            
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
    @import '~assets/css/mixin.styl'
    .m-lst-con
        padding 5px 0 25px
        width 1200px
        .m-lst
            width 1220px
            .m-item
                float left
                width 285px
                height 310px
                background #fff
                _boxShadow(12px,rgba(0,0,0,.15))
                margin 20px 20px 0 0
                _transitionAll(.2s)
                &:hover
                    _transitionAll(.3s,cubic-bezier(0.04, 0.65, 0.65, 0.92))
                    _translate3d(,-4px);
                    _boxShadow(20px,rgba(0,0,0,.15),1px,10px)
                    h5.u-tit
                        font-size 16px
                .u-pic
                    width 285px
                    height 200px
                    img 
                        width 100%
                        height 100%
                .u-con
                    width 260px
                    position relative
                    padding 0 14px
                    h5.u-tit
                        height 28px
                        line-height 28px
                        font-size 15px
                        overflow hidden
                        font-weight normal
                        margin-top 10px
                    .u-des
                        height 22px
                        line-height 22px
                        color #959595
                    .u-price
                        margin-top 15px
                        height 22px
                        line-height 22px
                        color #545454
                        em
                            font-size 20px
                            color #ff6533
                            margin-left 3px
                            font-weight normal
                    .u-lk
                        width 85px
                        height 42px
                        background #0479cc
                        color #fff
                        text-align center
                        position absolute
                        top 48px
                        right 14px
                        _borderRadius(3px)
                        p 
                            font-size 13px
                            line-height 18px
                            &.u-count
                                margin-top 3px
                        p strong
                            font-weight normal
                    .u-price-low
                        font-size 13px
                        position absolute
                        bottom 0px
                        right 20px
                        color #ff6533

</style>
