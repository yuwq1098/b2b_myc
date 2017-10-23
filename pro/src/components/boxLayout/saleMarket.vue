<!--  
 **  @description b2b二手车市场
 --> 

<template>
	<div class="saleMarket">
	    <div class="m-lst-con">
            <ul class="m-lst f__clearfix">
                <template v-for="(item,index) in carInfoList.goldenEggs">
                    <li class="m-item red-packet">
                        <a class="u-box" href="javascript:;">
                            <div class="pic-box">
                                <div class="u-pic">
                                    <img v-lazy="item.carInfo.imgUrl" :alt="item.carInfo.name"/>
                                </div>
                                <div class="red-packet"></div><!-- 红包车标识 -->
                            </div><!-- 图片盒子 -->
                            <div class="car-info">
                                <div class="u-tit">【{{item.carInfo.inCity}}】{{item.carInfo.name}}</div>
                                <div class="u-other">上牌 {{item.carInfo.plateDate | dateFnToYear}} | 里程 {{item.carInfo.mileage | mileFn(1)}}</div><!-- 其他 -->
                                <div class="u-price f__clearfix">
                                    <span class="retail f__fl"
                                        >零售价：<em class="vital">{{item.carInfo.retailPrice | priceFormat(2)}}</em>万
                                    </span>
                                </div><!-- 价格 -->
                                <div class="u-addTo f__clearfix">
                                    <div class="time">{{item.carInfo.shelveTime | dateFormatV2}}</div>
                                </div>
                            </div><!-- 车辆信息 -->
                        </a>
                    </li>
                </template>
                <template v-for="(item,index) in carInfoList.normal">
                    <li class="m-item">
                        <a class="u-box"
                            @click="enterCarDetails(item.id)"
                            >
                            <div class="pic-box">
                                <div class="u-pic">
                                    <img v-lazy="item.imgUrl" :alt="item.name"/>
                                </div>
                            </div><!-- 图片盒子 -->
                            <div class="car-info">
                                <div class="u-tit">【{{item.inCity}}】{{item.name}}</div>
                                <div class="u-other">上牌 {{item.plateDate | dateFnToYear}} | 里程 {{item.mileage | mileFn(1)}}</div><!-- 其他 -->
                                <div class="u-price f__clearfix">
                                    <span class="retail f__fl"
                                        >零售价：<em class="vital">{{item.retailPrice | priceFormat(2)}}</em>万
                                    </span>
                                </div><!-- 价格 -->
                                <div class="u-addTo f__clearfix">
                                    <div class="cdg-name">
                                        <span class="value">{{item.cName}}</span>
                                    </div><!-- 车行名称 -->
                                    <div class="time">{{item.shelveTime | dateFormatV2}}</div>
                                </div>
                            </div><!-- 车辆信息 -->
                        </a>
                    </li>
                </template>
            </ul>
        </div>
		
	</div><!-- 汽车信息盒子 -->
</template>

<script>

	export default {
        name: "saleMarket",
        // 注册组件
        components:{
            
        },
        // 数据
        data() {
            return {

            }
        },
        props:{
            // b2b车辆信息列表
            carList: {
                type: Array,
                default () {
                    return [];
                }
            },
            // 金蛋车/红包车 辆信息列表
            eggsList: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        // 属性计算
        computed:{
            // 车辆信息列表
            carInfoList(){
                var carList = this.carList;
                var eggsList = this.eggsList;
                let goldenEggs = [];
                let normal = [];
                // 保存限定的低价车信息
                if(eggsList.length==1){
                    goldenEggs = eggsList;
                }else if(eggsList.length>1){
                    eggsList.forEach((item,index) => {
                        if(index<4){
                            goldenEggs.push(item);
                        }
                    });
                }
                
                var eggsLength = goldenEggs.length;
                // 调整正常的车数据
                carList.forEach((item,index) => {
                    if(index<8-eggsLength){
                        normal.push(item);    
                    }
                })
                return {
                     'goldenEggs': goldenEggs,
                     'normal': normal,                 
                }
            }
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
            // 进入车辆详情
            enterCarDetails(id){
                this.$router.push({path:'/b2bCar', query: { CarId: id }})
            },
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
                    _display()
                    width 100%
                    height 100%
                    position relative
                .pic-box
                    width @width
                    height 170px
                    position relative
                    .u-pic
                        width @width
                        height @height
                        _completeCenter()
                        _overflow()
                        img
                            width @width + 10px
                            height auto
                            _completeCenter(-5px,auto,0,0)
                    .red-packet
                        width 36px
                        height 54px
                        background url('../../assets/img/i-red-packet.png') center center no-repeat
                        background-size 100% 100%
                        _completeCenter(auto,10px,10px,auto)
                .car-info
                    width @width - 20px
                    height 140px - 10px
                    padding 5px 10px
                    .u-tit
                        line-height 22px
                        max-height 44px
                        padding 3px 0
                        margin-bottom 3px
                        font-size 15px
                        color #555
                        _ellipsis(2)
                    .u-other
                        height 22px
                        line-height @height
                        font-size 12px
                        color #999
                    .u-price
                        height 22px
                        line-height @height
                        .retail
                            font-size 12px
                            color #999
                            .vital
                                color #ff6533
                                font-size 15px
                                margin 0 3px 0 1px
                        .info
                            color $c_blue
                    .u-addTo
                        padding 4px 0 0
                        height 30px
                        line-height @height
                        font-size 13px
                        .cdg-name
                            height 20px
                            line-height @height
                            _display(inline-block)
                            color $c_blue
                            // _verticalTextAlign(middle)
                            margin-top 4px
                            border 1px solid $c_blue
                            float left
                            max-width 105px
                            padding 0 5px
                            _ellipsis()
                            .value
                                font-size 12px
                        .time
                            color #999
                            float right
                &.red-packet
                    .car-info
                        background #FF514D
                        _gradient(#f33,#f72,left)
                        .u-tit
                            color #FFEC0B
                        .u-other
                            color #f0f0f0
                        .u-price
                            .retail
                                color #f0f0f0
                                .vital
                                    color #FFEC0B
                                    font-size 16px
                        .u-addTo
                            .time
                                color #f0f0f0
                &:hover
                    _boxShadow(15px,rgba(0,0,0,.1),-2px,4px)
                            
</style>
