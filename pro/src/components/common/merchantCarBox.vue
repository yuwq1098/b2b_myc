<!--  
 **  @description 车行车辆信息盒子组件
 --> 

 <template>
    <div class="merchantCarBox">
        <div class="m-car-box">
            <router-link 
                :to="{path:'/b2bCar', query:{CarId:carInfo.id}}"
                class="u-box-lk"
                >
                <div class="m-pic-box">
                    <p class="u-label">
                        零售价：{{carInfo.retailPrice | priceFormat(2)}}万
                    </p>
                    <div class="u-pic">
                        <img :src="carInfo.imgUrl" :alt="carInfo.title"/>
                    </div>
                </div>
                <div class="m-con-box">
                    <div class="u-mask">
                        <div class="u-icon-box">
                            <div class="view-icon"><i class="iconfont icon-yuedu"></i></div>
                            <p class="txt">预览详情</p>
                        </div><!-- 图标容器 -->
                    </div><!-- 朦灰层 -->
                    <div class="u-con">
                        <div class="tit">{{carInfo.title}}</div>
                        <template v-if="!isAuthSuccess">
                            <span class="u-price"
                                ><em class="info">您尚未认证</em>
                            </span>
                        </template>
                        <template v-else>
                            <div class="u-price">
                                <span class="attr">批发价：</span><span class="price">￥<em class="vital">{{carInfo.price | priceFormat(2)}}</em>万</span>
                            </div>
                        </template>
                        
                        <div class="city">车辆所在地：{{carInfo.city}}</div>
                        <div class="other">{{carInfo.plateDate | dateFn}} · {{carInfo.mileage | mileFn(2)}}
                        </div>
                    </div><!-- 真正的内容层 -->
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>

    export default {

        name: "merchantCarBox",
        // 在当前模块注册组件
        components:{

        },
        // 数据
        data() {
            return{
                
            }
        },
        props:{
            // 车辆信息
            carInfo: Object,
            // 是否成功认证
            isAuthSuccess: {
                type: Boolean,
                default: false,
            },
        },
        // 自定义函数(方法)
        methods: {

        },    
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .m-car-box
        width 250px
        height 240px
        background #fff
        _boxShadow(12px,rgba(0,0,0,.08))
        position relative
        _overflow()
        .u-box-lk
            width @width
            height @height
            _display()
            position relative
            .m-pic-box
                width @width
                height 180px
                .u-label
                    _display()
                    z-index 9
                    height 28px
                    line-height 28px
                    font-size 13px
                    padding 0 12px 0 8px
                    background #ff6533
                    color #f0f0f0
                    _transitionAll(.2s)
                    _borderRadius(12px,top-right)
                    _borderRadius(12px,bottom-right)
                    _completeCenter(0,auto,25px,auto)
                .u-pic
                    width @width
                    height @height
                    _overflow()
                    img
                        width @width
                        height auto
            .m-con-box
                width @width
                height 160px
                z-index 15
                _completeCenter(,,180px,auto)
                _transitionAll(.3s)
                background #fff
                .u-mask
                    width @width
                    height 80px
                    _completeCenter(0,auto,0,auto)
                    background rgba(22, 33, 44, 0.58)
                    _transitionAll(.25s)
                    .u-icon-box
                        color #f0f0f0
                        text-align center
                        .view-icon
                            margin 12px 0 0
                            line-height 38px 
                            .iconfont
                                font-size 38px
                        .txt
                            margin -6px 0 0
                            font-size 13px
                            _spacingPlus(2px)
                .u-con
                    width @width - 20px
                    height @height - 12px
                    padding 6px 10px
                    _completeCenter(0,auto,0,auto)
                    _transitionAll(.2s)
                    z-index 2
                    color #40474a
                    background #fff
                    .tit
                        height 48px
                        line-height 24px
                        font-size 15px
                        _ellipsis(2)
                        margin 0 0 6px
                    .u-price
                        height 36px
                        line-height @height
                        font-size 13px
                        margin 0 0 3px
                        .attr
                            color #777
                            font-size 12px
                        .price
                            font-size 14px
                            color #ff6533
                            .vital
                                font-size 22px
                                font-weight bold
                        .info
                            font-size 17px
                            color #ff6533
                        .retail
                            color #777
                            margin 0 0 0 8px
                            .data
                                text-decoration line-through
                    .city,.other
                        height 21px
                        line-height @height
                        color #777
                        font-size 12px
                    .city
                        margin 0 0 5px

        &:hover
            _boxShadow(20px,rgba(0,0,0,.12),8px,8px)
            .m-pic-box
                .u-label
                    _transitionAll(.28s,cubic-bezier(0.14, 0.46, 0.46, 1.02))
                    _translate3d(-@width,0)
            .m-con-box
                _transitionAll(.3s,cubic-bezier(0.14, 0.46, 0.46, 1.02))
                _translate3d(0,-100px)
                .u-mask
                    _transitionAll(.3s,cubic-bezier(0.14, 0.46, 0.46, 1.02))
                    _translate3d(0,-80px)

</style>
