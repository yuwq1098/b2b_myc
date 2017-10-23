<!--  
 **  @description 4s新车组件
 --> 

<template>
	<div class="newCars">
	    <div class="m-lst-con">
            <ul class="m-lst f__clearfix">
                <template v-for="(item,index) in carList">
                    <li class="m-item">
                        <a class="u-box" @click.stop="enter4sStop($event,item.shopId)" :data-id="item.shopId">
                            <div class="pic-box">
                                <img class="photo" :src="item.seriesPhoto" :alt="item.brandSeries"/>
                            </div><!--图片容器-->
                            <div class="info-con">
                                <div class="brand">{{item.brandSeries}}</div><!-- 品牌 -->
                                <div class="mode">
                                    <em class="quotes"></em>
                                    <span>{{item.mode}}</span>
                                    <em class="quotes"></em>
                                </div><!--型号-->
                                <div class="guide">厂家指导价 {{item.officialPrice}}</div><!-- 指导价 -->
                                <div class="price">
                                    平台尊享价<em class="vital">{{item.price | priceFormat(2)}}</em>万
                                </div><!-- 真实价格 -->
                            </div><!-- 新车信息 -->
                        </a>
                    </li>
                </template>
            </ul>
        </div>
		
	</div><!-- 汽车信息盒子 -->
</template>



<script>

	export default {
        name: "newCars",
        // 注册组件
        components:{
            
        },
        // 数据
        data() {
            return{
                // 是否有保证金
                hasDeposit: false,
            }
        },
        // 值传递
        props:{
            // 车辆列表
            carList: {
                type: Array,
                default(){
                    return [];
                }
            },
        },
        //数据侦听
        watch:{

        },
        // 创建实例
        created(){

        },
        // 当vue实例挂载到dom上时触发的事件
        mounted(){
            
        },
        // 自定义函数(方法)
        methods: {
            // 进入4s店
            enter4sStop(ev,shopId){
                
            }
        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .m-lst-con
        width 948px
        height 632px
        .m-lst
            width 960px
            height 632px
            .m-item
                width 240px - 12px
                height 310px
                float left
                margin 0 12px 12px 0
                background #fff
                .u-box
                    width @width - 20px
                    height @height - 16px
                    _display()
                    padding 8px 10px
                    .guide
                        width 100%
                        height 100%
                    .pic-box
                        width 208px
                        height 140px
                        _translate3d(0,6px,0)
                        _transitionAll(.15s,cubic-bezier(0.37, 0.57, 0.6, 0.71))
                        _imgwrap()
                        color #333
                    .info-con
                        width 208px - 8px
                        height 136px
                        padding 12px 4px 6px
                        position relative
                        .brand
                            max-height 44px
                            line-height 22px
                            color #333
                            font-size 15px
                            margin 0 0 6px
                            _ellipsis(2)
                        .mode
                            line-height 25px
                            color #999
                            font-size 14px
                            margin-bottom 4px
                            .quotes
                                font-size 16px
                                color #bbb
                            span
                                line-height 19px
                                background #DFF5FF
                                color #33ADA7
                                font-size 12px
                                padding 2px 5px
                                _verticalTextAlign(top)
                        .guide
                            height 24px
                            line-height @height
                            font-size 12px
                            text-align right
                            _display()
                            // _textDec(line-through)
                            color #999
                            _completeCenter(auto,0,auto,25px)
                        .price
                            width @width
                            _display()
                            font-size 12px
                            text-align right
                            height 28px
                            line-height @height
                            _completeCenter(auto,0,auto,0px)
                            color #ff6533
                            .vital
                                font-size 17px
                                margin 0 2px 0 4px
                &:hover
                    _boxShadow(15px,rgba(0,0,0,.1),-2px,4px)
                    .pic-box
                        _translate3d(0,0,0)
                        


</style>
