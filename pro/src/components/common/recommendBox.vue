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
                    <p class="u-label">
                        <span class="txt">{{carInfo.authType}}</span>
                    </p><!-- 标签 -->
                    <div class="u-pic">
                        <img v-lazy="carInfo.imgUrl" :alt="carInfo.name"/>
                    </div>
                </div><!-- 图片盒子 -->

                <div class="m-con-box">

                    <div class="u-mask"></div><!-- 朦灰层 -->
                    <div class="u-con">
                        <div class="u-tit">[{{carInfo.inCity}}]{{carInfo.name}}</div><!-- 标题 -->

                        <div class="u-other">上牌 {{carInfo.plateDate | dateYearFormat}}年 | 里程 {{carInfo.mileage | mileFn(1)}}</div><!-- 其他 -->

                        <div class="u-price">
                            <span class="retail"><em class="attr">零售价：</em><em class="vital">{{carInfo.retailPrice | priceFormat(2)}}</em><em>万元</em></span>
                        </div><!-- 价格 -->
                        
                        <div class="u-cdg-info f__clearfix">
                            <p class="cname">{{carInfo.cName}}</p>
                        </div><!-- 商家车行信息 -->

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
        props:{
            carInfo: {
                type: Object,
                default(){
                    return new b2bCarInfo({});
                }
            },
            loginStatus: {
                type: Boolean,
                default: false,
            },
            hasDeposit: Boolean,
        },
        // 自定义函数(方法)
        methods: {
            // 加入购物车
            inShopingCart(id){
                let data = {
                    ActType: 'Add',
                    CarId: id,
                }
                api.manageShoppingCart(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.carInfo.hasInCart = true;
                        this.$notify({
                            title: '成功加入购物车',
                            message: res.msg,
                            type: 'success',
                            duration: 1500,
                        });
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '加入购物车失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            },
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
    .m-car-box
        width 285px
        height 302px
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
                height 210px
                position relative
                .u-label
                    _display()
                    width 60px
                    height 59px
                    background url('../../assets/img/car-lable-01.png') 0 0 no-repeat
                    background-size 100% 100%
                    _completeCenter(15px,auto,-8px,auto)
                    z-index 10
                    _transitionAll(.2s)
                    .txt
                        color #f2f2f2
                        width 44px
                        height 36px
                        line-height 18px
                        _spacingPlus()
                        _display()
                        text-align center
                        _completeCenter()

                .u-pic
                    width @width
                    height @height
                    _completeCenter()
                    _overflow()
                    img
                        width @width + 10px
                        height @height + 10px
                        _completeCenter(-5px,auto,-5px,auto)
            .m-con-box
                width @width
                height 120px
                z-index 15
                _completeCenter(,,210px,auto)
                _transitionAll(.3s)
                .u-con
                    width @width - 16px
                    height @height - 12px
                    padding 8px 8px 4px
                    background #fff
                    _completeCenter(0,auto,auto,0)
                    z-index 2
                    color #40474a
                    .u-tit
                        height 24px
                        line-height 24px
                        font-size 15px
                        _ellipsis(1)
                        margin 0 0 4px
                    .u-other
                        height 20px
                        line-height 20px
                        font-size 12px
                        margin 0 0 2px
                        color #959595
                    .u-price
                        height 28px
                        line-height 28px
                        margin 0 0 6px
                        font-size 13px
                        .retail
                            color #ff6533
                            .attr
                                color @color
                            .vital
                                font-size 18px

            &:hover
                _boxShadow(20px,rgba(0,0,0,.10),6px,6px)
                .m-pic-box
                    .u-label
                        _transitionAll(.28s,cubic-bezier(0.14, 0.46, 0.46, 1.02))
                        _translate3d(0,-80px)
                .m-con-box
                    .u-con .u-tit
                        text-decoration underline
</style>
