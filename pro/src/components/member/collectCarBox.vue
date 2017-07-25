<!--  
 **  @description 车辆收藏的车辆信息盒子
 --> 

 <template>
    <div class="collectCarBox">
        <div class="m-car-box">
            <a class="u-lk-box" @click="enterCar(carInfo.id,carInfo.status)">
                <div class="u-pic-box">
                    <span class="u-label">{{carInfo.authType}}</span>
                    <div class="u-pic">
                        <img :src="carInfo.imgUrl" :alt="carInfo.title"/>
                    </div><!-- 图片容器 -->
                </div><!-- 图片容器 -->
                <div class="u-con-box">
                    <div class="u-mask">
                        <a href="javascript:;" class="u-lk-box"
                            v-if="carInfo.status == '1'||carInfo.status =='2'"
                            >
                            <div class="view-icon"><i class="iconfont icon-yuedu"></i></div>
                            <p class="txt">预览详情</p>
                        </a>
                        <a href="javascript:;" class="u-lk-box audit"
                            v-if="carInfo.status == '0'"
                            >
                            <div class="view-icon"><i class="iconfont icon-time_act"></i></div>
                            <p class="txt">审核中</p>
                        </a>
                        <a href="javascript:;" class="u-lk-box audit"
                            v-if="carInfo.status == '3'"
                            >
                            <div class="view-icon"><i class="iconfont icon-chenggong"></i></div>
                            <p class="txt">交易成功</p>
                        </a>
                        <a href="javascript:;" class="u-lk-box soldOut"
                            v-if="carInfo.status == '-1'"
                            >
                            <div class="view-icon"><i class="iconfont icon-iconzhenghe35"></i></div>
                            <p class="txt">已下架</p>
                        </a>
                        <a href="javascript:;" class="u-lk-box audit"
                            v-if="carInfo.status == '-2'"
                            >
                            <div class="view-icon"><i class="iconfont icon-group13"></i></div>
                            <p class="txt">审核失败</p>
                        </a>
                        <a href="javascript:;" class="u-lk-box arbitration"
                            v-if="carInfo.status == '-10'"
                            >
                            <div class="view-icon"><i class="iconfont icon-zhongcaiguanli"></i></div>
                            <p class="txt">仲裁中</p>
                        </a>
                    </div><!-- 遮罩内容-->
                    <div class="u-con">
                        <div class="u-tit">{{carInfo.title}}</div><!-- 标题 -->
                        <template v-if="!theCurAuth=='成功认证'">
                            <div class="u-price">
                                <template v-if="theCurAuth=='未认证'"><em class="info">未认证</em>
                                    </template>
                                <template v-if="theCurAuth==='认证中'"><em class="info">认证中</em>
                                    </template>
                                <template v-if="theCurAuth=='未通过认证'"><em class="info">未通过认证</em>
                                    </template>
                            </div>
                        </template>
                        <template v-else-if="!hasCredit">
                            <div class="u-price">
                                <em class="info">信誉保证金不足</em>
                            </div>
                        </template>
                        <template v-else>
                            <div class="u-price">批发价：
                                <em class="vital">{{carInfo.price | priceToFixed(2)}}</em>
                            </div><!-- 价格 -->    
                        </template>
                        
                        <div class="u-merchant">车商：{{carInfo.cdgName}}</div><!-- 车商 -->
                        <div class="u-other">{{carInfo.city}} · {{carInfo.plateDate | dateYearFormat}} · {{carInfo.mileage | mileFn(1)}}</div><!-- 其他 -->
                        <div class="btn-wrap">
                            <a class="u-btn cancel" 
                                @click.stop="delCar(carInfo.id,index)" 
                                title="取消收藏">取消收藏
                            </a>
                        </div>
                    </div><!-- 内容 -->
                </div><!-- 内容容器 -->
            </a>
        </div>
    </div>
</template>

<script>

    export default {

        name: "collectCarBox",
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
            // 是否登录
            hasLogin: {
                type: Boolean,
                default: false,
            },
            // 认证标识
            hasAuth: {
                type: String,
                default: "",
            },
            // 是否有足额保证金
            hasCredit: {
                type: Boolean,
                default: false,
            }
        },
        // 属性计算
        computed:{
            // 当前认证信息
            theCurAuth(val){
                switch(val){
                    case "":
                        return "未认证";
                        break;
                    case "0":
                        return "认证中";
                        break;
                    case "1":
                        return "成功认证";
                        break;
                    case "-1":
                        return "未通过认证";
                        break;
                }
            },
        },
        // 自定义函数(方法)
        methods: {
            // 进入车辆详情
            enterCar(id,status){
                if(!(status == '1'||status =='2')) return;
                this.$emit("enterCar",id)
            },
            // 取消车辆收藏
            delCar(id,index){
                this.$emit("delCar",id,index)
            },
        },    
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .m-car-box
        width 180px - 2px
        height 245px
        _boxShadow(8px,rgba(0,0,0,.05),0,0)
        _borderAll(#ededed)
        _overflow()
        position relative
        .u-lk-box
            _display()
            width @width
            height @height
        .u-pic-box
            width 180px
            height 130px
            position relative
            _overflow()
            .u-label
                height 22px
                line-height 22px
                background #ff6533
                font-size 12px
                padding 0 10px 0 5px 
                _spacingPlus()
                z-index 2
                color #f2f2f2
                _transitionAll(.2s)
                _borderRadius(11px,top-right)
                _borderRadius(11px,bottom-right)
                _completeCenter(0,auto,12px,auto)
            .u-pic
                width @width
                height @height
                _overflow()
                _imgwrap()
                img
                    _transitionAll(.3s)
        .u-con-box
            color #40474a
            width @width
            font-size 13px
            z-index 15
            background #fff
            height 115px + 40px
            _transitionAll(.3s)
            _completeCenter(,,130px,auto)
            .u-mask
                width 100%
                height 90px
                _completeCenter(0,auto,0,auto)
                background rgba(0,0,0,.65)
                _transitionAll(.25s)
                .u-lk-box
                    color #f0f0f0
                    text-align center
                    .view-icon
                        margin 19px 0 0
                        line-height 30px 
                        .iconfont
                            font-size 30px
                    .txt
                        margin -3px 0 0
                        font-size 14px
                        _spacingPlus()
                    &.audit
                        .view-icon
                            margin 19px 0 0
                        .txt
                            margin 4px 0 0
                            _spacingPlus(2px)
                    &.soldOut
                        .view-icon
                            margin 18px 0 0
                            line-height 38px 
                            .iconfont
                                font-size 38px
                        .txt
                            margin -6px 0 0
                            _spacingPlus(2px)
                    &.arbitration
                        .view-icon
                            margin 18px 0 0
                            line-height 38px 
                            .iconfont
                                font-size 38px
                        .txt
                            margin -6px 0 0
                            _spacingPlus(2px)
            .u-con
                width @width - 14px
                padding 5px 7px
                z-index 2
                background #fff
                height @height - 10px
                _completeCenter(0,auto,0,auto)
                .u-tit
                    line-height 20px
                    height 40px
                    margin-bottom 5px
                    _ellipsis(2)
                .u-price,.u-merchant
                    height 18px
                    line-height 18px
                    font-size 12px
                    margin-bottom 2px
                    color #959595
                    _ellipsis()
                    .vital
                        color #ff6533
                        font-size 13px
                    .info
                        color #ff6533
                        font-size 14px
                .u-price
                    margin 0 0 4px 
                .u-other
                    font-size 12px
                    color #959595
                    height 18px
                    line-height 18px
                    _ellipsis()
                .btn-wrap
                    height 28px
                    width @width - 8px
                    line-height @height
                    padding 0 4px
                    margin 8px 0 0
                    .u-btn
                        _display()
                        width @width
                        height @height
                        line-height @height
                        text-align center
                        background #5F6A6F
                        color #e2e2e2
                        _spacingPlus(5px)
                        _borderRadius(2px)
                        font-size 13px
                        float left
                        &.tiny
                            font-size 12px
                            _spacingPlus(3px)
                        &:hover
                            background #293135

        &:hover
            _boxShadow(15px,rgba(0,0,0,.10),-4px,4px)
            _borderAll(#e2e2e2)
            .u-pic-box
                .u-label
                    _transitionAll(.28s,cubic-bezier(0.14, 0.46, 0.46, 1.02))
                    _translate3d(-@width,0)
                .u-pic-01
                    img
                        _scale(1.05)
                        _transitionAll(.3s,cubic-bezier(0.43, 0.71, 0.79, 1.07))
            .u-con-box
                _transitionAll(.3s,cubic-bezier(0.14, 0.46, 0.46, 1.02))
                _translate3d(0,-40px)
                .u-mask
                    _transitionAll(.3s,cubic-bezier(0.14, 0.46, 0.46, 1.02))
                    _translate3d(0,-90px)
                .u-con
                    .u-tit
                        color #222
                    .u-tit-01
                        color $c_blue

</style>
