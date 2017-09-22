<!--  
 **  @description b2b车辆信息盒子组件
 --> 

 <template>
    <div class="b2bCarBox">
        <div class="m-car-box">

            <a class="m-lk" target="_blank"
                @click="enterCarDetails(carInfo.id)"
                >
                <div class="m-pic-box">
                    <p class="u-label" :class="{'merchant':theAuthType=='企业车商'}">
                        <span class="txt">{{theAuthType}}</span>
                    </p><!-- 标签 -->
                    <div class="u-pic">
                        <img v-lazy="carInfo.imgUrl" :alt="carInfo.name"/>
                    </div>
                </div><!-- 图片盒子 -->

                <div class="m-con-box">
                    <div class="u-mask">
                        <div class="u-icon-box">
                            <div class="view-icon"><i class="iconfont icon-yuedu"></i></div>
                            <p class="txt">预览详情</p>
                        </div><!-- 图标容器 -->
                    </div><!-- 朦灰层 -->
                    <div class="u-con">
                        <div class="u-tit">{{carInfo.name}}</div>
                        <div class="u-price">
                            <template v-if="!loginStatus">
                                <span class="price"
                                    ><em class="info">未登录</em>
                                </span>
                            </template>
                            <template v-else>
                                <template v-if="!isAuthSuccess">
                                    <span class="price"
                                        ><em class="info">您尚未认证</em>
                                    </span>
                                </template>
                                <template v-else>
                                    <span class="price"
                                        ><em class="vital">{{carInfo.price | priceFormat(2)}}</em>万
                                    </span>
                                </template>
                            </template>
                            <span class="retail"><em class="data">{{carInfo.retailPrice | priceFormat(2)}}万</em></span>
                        </div>
                        <div class="u-addCart">

                            <template v-if="!loginStatus">
                                <a class="u-btn not"
                                    @click.stop="noLogin()"
                                    ><i class="iconfont icon-addCart"></i>
                                    <span class="txt">加入购物车</span>
                                </a>
                            </template>

                            <template v-else>
                                <a class="u-btn not"
                                    v-if="carInfo.hasInCart==''"
                                    @click.stop="inShopingCart(carInfo.id)"
                                    >
                                    <i class="iconfont icon-addCart"></i>
                                    <span class="txt">加入购物车</span>
                                </a>
                                <a href="javascript:;" class="u-btn"
                                    v-else>
                                    <i class="iconfont icon-addCart"></i>
                                    <span class="txt">已加入购物车</span>
                                </a>
                            </template>

                        </div><!-- 加入购物车 -->

                        <div class="u-other">{{carInfo.inCity}} | {{carInfo.plateDate | dateYearFormat}} | {{carInfo.mileage | mileFn(1)}}</div><!-- 其他 -->
                        <div class="u-cdg-info f__clearfix">
                            <p class="cname">{{carInfo.cName}}</p>
                            <p class="time">{{carInfo.shelveTime | dateFormatRemoverYear}}</p>
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
    // vuex状态管理
    import { mapActions } from 'vuex'

    export default {

        name: "b2bCarBox",
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
            // 是否成功认证
            isAuthSuccess: {
                type: Boolean,
                default: false,
            },

        },
        computed:{
            theAuthType(){
                if(this.carInfo.authType=="个人车行"){
                    return "个人车商";
                }else if(this.carInfo.authType=="企业车行"){
                    return "企业车商";
                }
            }
        },
        // 自定义函数(方法)
        methods: {
            ...mapActions(['getMyShoppingNumber']),
            
            // 未登录（请先登录）
            noLogin(){
                this.$notify({
                    title: '您尚未登录',
                    message: '登录后可进行加入购物车操作',
                    type: 'warning',
                    duration: 1500,
                });
            },

            // 加入购物车
            inShopingCart(id){
                let data = {
                    ActType: 'Add',
                    CarId: id,
                }
                api.manageShoppingCart(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.carInfo.hasInCart = true;
                        // 重新获取购物车内车辆数量
                        this.getMyShoppingNumber();
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
        height 315px
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
                    background-size cover
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
                    &.merchant
                        background url('../../assets/img/car-lable-02.png') 0 0 no-repeat
                        background-size cover

                .u-pic
                    width @width
                    height @height
                    _completeCenter()
                    _overflow()
                    img
                        width @width + 10px
                        height auto
                        _completeCenter(-5px,auto,0,0)
            .m-con-box
                width @width
                height 180px
                z-index 15
                _completeCenter(,,210px,auto)
                _transitionAll(.3s)
                .u-mask
                    width 100%
                    height 135px
                    _completeCenter(0,auto,0,auto)
                    background rgba(0,0,0,.65)
                    _transitionAll(.25s)
                    .u-icon-box
                        color #f0f0f0
                        text-align center
                        .view-icon
                            margin 36px 0 0
                            line-height 42px 
                            .iconfont
                                font-size 42px
                        .txt
                            margin -2px 0 0
                            font-size 14px
                            _spacingPlus(2px)
                .u-con
                    width @width - 16px
                    height @height - 10px
                    padding 5px 8px
                    background #fff
                    _completeCenter(0,auto,auto,0)
                    z-index 2
                    color #40474a
                    .u-tit
                        height 56px
                        line-height 28px
                        font-size 16px
                        _ellipsis(2)
                        margin 0 0 7px
                    .u-price
                        height 32px
                        line-height 32px
                        margin 0 0 10px
                        font-size 14px
                        .price
                            color #ff6533
                            .vital
                                font-size 21px
                            .info
                                font-size 15px
                        .retail
                            color #a5a5a5
                            margin 0 0 0 5px
                            .data
                                text-decoration line-through
                    .u-addCart
                        width 90px
                        text-align center
                        height 28px
                        line-height 25px
                        _completeCenter(auto,10px,68px,auto)
                        .u-btn
                            _display()
                            width @width
                            height @height
                            _borderRadius(3px)
                            background #b2b2b2
                            color #f2f2f2
                            .iconfont 
                                font-size 16px
                                color @color
                                _display(inline-block)
                                _translate3d(0,2px)
                            .txt
                                font-size 12px
                                color @color
                            &.not
                                background #2e98e2
                                &:hover
                                    background @background - 10%
                    .u-other
                        height 24px
                        line-height 24px
                        margin 0 0 10px
                        color #a5a5a5
                    .u-cdg-info
                        height 24px
                        line-height 24px
                        color #a5a5a5
                        .cname
                            float left
                            width 165px
                            _ellipsis()
                        .time
                            float right

            &:hover
                _boxShadow(20px,rgba(0,0,0,.10),6px,6px)
                .m-pic-box
                    .u-label
                        _transitionAll(.28s,cubic-bezier(0.14, 0.46, 0.46, 1.02))
                        _translate3d(0,-80px)
                .m-con-box
                    _transitionAll(.3s,cubic-bezier(0.14, 0.46, 0.46, 1.02))
                    _translate3d(0,-75px)
                    // -webkit-backface-visibility: hidden;
                    // -webkit-transform-style: preserve-3d;
                    .u-mask
                        _transitionAll(.3s,cubic-bezier(0.14, 0.46, 0.46, 1.02))
                        _translate3d(0,-135px )

</style>
