<!--  
 **  @description b2b车辆信息盒子组件
 --> 

 <template>
    <div class="recommendBox">
        <div class="m-car-box">

            <a class="m-lk" target="_blank"
                @click="enterCarDetails(carInfo.id)"
                >
                <div class="m-pic-box">
                    <div class="time-block">
                        <p class="time">{{carInfo.shelveTime | formatDate}}上架</p>
                    </div><!-- 时间标签 -->
                    <div class="u-pic">
                        <img v-lazy="carInfo.imgUrl" :alt="carInfo.name"/>
                    </div>
                    <div class="pic-shade"></div><!-- 效果遮罩 -->
                </div><!-- 图片盒子 -->

                <div class="m-con-box">

                    <div class="u-mask"></div><!-- 朦灰层 -->
                    <div class="u-con">
                        <div class="u-tit">[{{carInfo.inCity}}]{{carInfo.name}}</div><!-- 标题 -->

                        <div class="u-other">
                            <span class="attr">上牌 {{carInfo.plateDate | dateYearFormat}}年</span>
                            <span class="cut">|</span>
                            <span class="attr">里程 {{carInfo.mileage | mileFn(1)}}</span>
                        </div><!-- 其他 -->

                        <div class="u-price">
                            <span class="retail"><em class="attr">零售价：</em><em class="vital">{{carInfo.retailPrice | priceFormat(2)}}</em><em>万元</em></span>
                        </div><!-- 价格 -->
                        
                    </div><!-- 车辆信息内容 -->
                </div>
            </a>

        </div>
    </div>
</template>

<script>
    
    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'

    // b2b车辆信息构造类
    import {b2bCarInfo} from "base/class/carInfo.js"

    export default {

        name: "recommendBox",
        // 在当前模块注册组件
        components:{

        },
        // 数据
        data() {
            return{
                
            }
        },
        computed:{

        },
        props:{
            carInfo: {
                type: Object,
                default(){
                    return new b2bCarInfo({});
                }
            },
        },
        // 自定义函数(方法)
        methods: {
            // 进入车辆详情
            enterCarDetails(id){
                // 获取hash 带参中的车辆ID
                let carId = this.$router.currentRoute.query.CarId;
                if(carId===id){
                    this.$notify({
                        title: '已是该车源的详情页面',
                        message: "已是该车源的详情页面，请不要重复点击",
                        type: 'warning',
                        duration: 2000,
                    });
                }else{
                    this.$router.push({path:'/b2bCar', query: { CarId: id }})
                }
            },
        },    
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'

    $picHeight = 160px
    .m-car-box
        width 228px
        height 270px
        background #fff
        _boxShadow(12px,rgba(0,0,0,.15))
        .m-lk
            _display()
            width @width
            height @height
            _overflow()
            position relative
            .m-pic-box
                width @width
                height $picHeight
                position relative
                .time-block
                    height 22px
                    position absolute
                    right 12px
                    bottom 12px
                    z-index 10
                    _transitionAll(.2s)
                    .time
                        height 20px
                        font-size 12px
                        line-height @height
                        background #27333C - rgba(0,0,0,.2)
                        color #f2f2f2
                        padding 0 11px
                        _spacingPlus()
                        _borderRadius(@height * 1/2)
                .pic-shade
                    width 0px
                    height 0px
                    &:before
                        _display()
                        content ""
                        _completeCenter(0,auto,0,auto)
                        width 100%
                        height $picHeight * 0.6
                        border-top $picHeight * 0.4 solid rgba(255,255,255,0.4)
                        background rgba(255,255,255,0.2)
                        _transform(scale3d(3,1.5,1) translate3d(40%,-75%,0) rotate3d(0,0,1,45deg))
                        -webkit-transition -webkit-transform 0.5s cubic-bezier(0.14, 0.46, 0.46, 1.02)
                        transition transform 0.5s cubic-bezier(0.14, 0.46, 0.46, 1.02)
                .u-pic   
                    width @width
                    height @height
                    _completeCenter()
                    _overflow()
                    _transitionAll(.28s,cubic-bezier(0.14, 0.46, 0.46, 1.02))
                    img
                        width @width + 10px
                        height auto
                        _completeCenter(-5px,auto,0,0)
                        _opacity(1)
            .m-con-box
                width @width
                height 110px
                z-index 15
                _completeCenter(,,160px,auto)
                _transitionAll(.3s)
                .u-con
                    width @width - 20px
                    height @height - 16px
                    padding 8px 10px
                    background #fff
                    _completeCenter(0,auto,auto,0)
                    z-index 2
                    .u-tit
                        height 44px
                        line-height 22px
                        margin-bottom 6px
                        font-size 14px
                        _ellipsis(2)
                        color #444
                    .u-other
                        height 22px
                        line-height 22px
                        font-size 12px
                        color #999
                        .attr
                            margin-right 4px
                        .cut
                            zoom 0.8
                            margin-right 4px
                    .u-price
                        height 22px
                        line-height 22px
                        font-size 12px
                        .retail
                            color #999
                            .vital
                                font-size 16px
                                color $c_blue
                                margin-right 3px

            &:hover
                _boxShadow(20px,rgba(0,0,0,.10),6px,6px)
                .m-pic-box
                    .pic-shade
                        &:before
                            _transform(scale3d(3,1.5,1) translate3d(-40%,75%,0) rotate3d(0,0,1,45deg))
                    .u-pic
                        _opacity(.65)
                        _transitionAll(.28s,cubic-bezier(0.14, 0.46, 0.46, 1.02),.2s)
                    .time-block
                        _transitionAll(.2s,cubic-bezier(0.14, 0.46, 0.46, 1.02),.05s)
                        _translate3d(0,50px)
                .m-con-box
                    .u-con .u-tit
                        color #111
                        text-decoration underline
</style>
