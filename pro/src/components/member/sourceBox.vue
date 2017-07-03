<!--  
 **  @description 车源信息盒子组件
 --> 

 <template>
    <div class="sourceBox">
        <div class="m-source-box">
            <a href="javascript:;" class="m-lk">
                <div class="m-pic-box">
                    <p class="u-label" 
                        v-if="sourceInfo.status == '1'||sourceInfo.status =='2'"
                        >上架时间：{{sourceInfo.shelveTime | dateDayFormat}}</p>
                    <p class="u-label audit" 
                        v-if="sourceInfo.status == '0'"
                        >审核中</p>
                    <p class="u-label soldOut"
                        v-if="sourceInfo.status == '-1'"
                        >已下架</p>
                    <p class="u-label success" 
                        v-if="sourceInfo.status == '3'"
                        >交易成功</p>
                    <p class="u-label error" 
                        v-if="sourceInfo.status == '-2'"
                        >审核失败</p>
                    <div class="u-pic">
                        <img :src="sourceInfo.imgUrl" :alt="sourceInfo.title"/>
                    </div>
                </div>
                
                <div class="m-con-box">
                    <div class="u-mask">
                        <router-link 
                            :to="{path:'/b2bCar', query:{CarId:sourceInfo.id}}"
                            v-if="sourceInfo.status == '1'||sourceInfo.status =='2'"
                            class="u-lk-box"
                            >
                            <div class="view-icon"><i class="iconfont icon-yuedu"></i></div>
                            <p class="txt">预览详情</p>
                        </router-link>
                        <a href="javascript:;" class="u-lk-box audit"
                            v-if="sourceInfo.status == '0'"
                            >
                            <div class="view-icon"><i class="iconfont icon-time_act"></i></div>
                            <p class="txt">审核中</p>
                        </a>
                        <a href="javascript:;" class="u-lk-box audit"
                            v-if="sourceInfo.status == '3'"
                            >
                            <div class="view-icon"><i class="iconfont icon-chenggong"></i></div>
                            <p class="txt">交易成功</p>
                        </a>
                        <a href="javascript:;" class="u-lk-box soldOut"
                            v-if="sourceInfo.status == '-1'"
                            >
                            <div class="view-icon"><i class="iconfont icon-iconzhenghe35"></i></div>
                            <p class="txt">已下架</p>
                        </a>
                        <a href="javascript:;" class="u-lk-box audit"
                            v-if="sourceInfo.status == '-2'"
                            >
                            <div class="view-icon"><i class="iconfont icon-group13"></i></div>
                            <p class="txt">审核失败</p>
                        </a>
                    </div><!-- 遮罩内容（操作部分） -->
                    <div class="u-con">
                        <div class="tit">【{{sourceInfo.inCity}}】{{sourceInfo.title}}</div>
                        <div class="price-views f__clearfix">
                            <span class="price"><em class="vital">{{sourceInfo.price | priceFormat(2)}}</em>万</span>
                            <p class="views"><i class="iconfont icon-yuedu"></i>{{sourceInfo.viewPeople}}</p>
                        </div>
                        <div class="other">{{sourceInfo.plateDate | dateFn}} · {{sourceInfo.mileage | mileFn(2)}}
                        </div>

                        <div class="btn-wrap one f__clearfix" v-if="sourceInfo.status == '2'">
                            <router-link :to="{path:'/member/sellOrder'}" class="u-btn" tag="a"
                                >前往卖车订单
                            </router-link>
                        </div><!-- 在售 -->
                        
                        <div class="btn-wrap three f__clearfix" v-if="sourceInfo.status == '1'">
                            <a class="u-btn" 
                                @click="addedSource(sourceInfo.id,'置顶')"
                                >置顶</a>
                            <a class="u-btn" 
                                @click="editSource(sourceInfo.id)"
                                >编辑</a>
                            <a class="u-btn" 
                                @click="soldOutSource(sourceInfo.id)"
                                >下架</a>
                        </div><!-- 交易中 -->

                        <div class="on-btn" v-if="sourceInfo.status == '0'">
                            <p class="txt">正在审核，请耐心等待</p>
                        </div><!-- 审核中 -->

                        <div class="btn-wrap one f__clearfix" v-if="sourceInfo.status == '3'">
                            <router-link :to="{path:'/sellSend'}" class="u-btn" tag="a"
                                >再来一发
                            </router-link>
                        </div><!-- 交易成功 -->

                        <div class="btn-wrap three f__clearfix"
                            v-if="sourceInfo.status == '-1'">
                            <a class="u-btn tiny"
                                @click="editSource(sourceInfo.id)"
                                style="width: 56px">编辑</a>
                            <a class="u-btn tiny" 
                                @click="addedSource(sourceInfo.id)"
                                style="width: 77px">再次上架</a>
                            <a class="u-btn tiny"
                                @click="delSource(sourceInfo.id)"
                                style="width: 56px">删除</a>
                        </div><!-- 已下架 -->

                        <div class="btn-wrap two f__clearfix" v-if="sourceInfo.status == '-2'">
                            <a class="u-btn"
                                @click="editSource(sourceInfo.id)"
                                style="width: 120px">重新编辑</a>
                            <a class="u-btn"
                                @click="delSource(sourceInfo.id)"
                                style="width: 72px">删除</a>
                        </div><!-- 审核失败 -->

                    </div><!-- 信息内容 -->
                </div><!-- 车源主要信息 -->
            </a>
        </div>
    </div>
</template>

<script>

    export default {

        name: "sourceBox",
        // 在当前模块注册组件
        components:{

        },
        // 数据
        data() {
            return{
                
            }
        },
        props:{
            // 车源信息
            sourceInfo: Object,
            // 盒子类型
            boxType: {
                type: String,
                default: ""
            } 
        },
        // 自定义函数(方法)
        methods: {
            // 上架车源(当已是上架时，刷新置顶，每天一次)
            addedSource(id,acted){
                this.$emit("addedSource",id,acted);
            },
            // 编辑车源 
            editSource(id){
                this.$emit("editSource",id);
            },
            // 下架车源 
            soldOutSource(id){
                this.$emit("soldOutSource",id);
            },
            // 删除车源
            delSource(id){
                this.$emit("delSource",id);
            }
        },    
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .m-source-box
        width 225px
        height 260px
        _boxShadow(12px,rgba(0,0,0,.08))
        position relative
        .m-lk
            _display()
            width 100%
            height 100%
            _overflow()
            position relative
            .m-pic-box
                width @width
                height 165px
                position relative
                .u-label
                    _display()
                    z-index 9
                    height 26px
                    line-height 26px
                    font-size 12px
                    padding 0 12px 0 8px
                    background #ff6533
                    color #f0f0f0
                    _transitionAll(.2s)
                    _borderRadius(12px,top-right)
                    _borderRadius(12px,bottom-right)
                    _completeCenter(0,auto,25px,auto)
                    &.audit,&.soldOut,&.success,&.error
                        padding 0 20px 0 15px
                    &.audit
                        background #5972EA
                    &.soldOut
                        background #f45
                    &.success
                        background #06AB9B
                    &.error
                        background #f45
                .u-pic
                    width @width
                    height @height
                    _completeCenter()
                    _imgwrap()
            .m-con-box
                width 100%
                height 170px
                z-index 15
                _completeCenter(,,165px,auto)
                _transitionAll(.3s)
                .u-mask
                    width 100%
                    height 120px
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
                                margin 17px 0 0
                            .txt
                                margin 2px 0 0
                                _spacingPlus(2px)
                        &.soldOut
                            .view-icon
                                margin 18px 0 0
                                line-height 38px 
                                .iconfont
                                    font-size 38px
                            .txt
                                margin -1px 0 0
                                _spacingPlus(2px)
                .u-con
                    width 225px - 12px
                    height @height - 12px
                    padding 6px
                    background #fff
                    _completeCenter(0,auto,auto,0)
                    z-index 2
                    color #40474a
                    .tit
                        height 48px
                        line-height 24px
                        font-size 15px
                        _ellipsis(2)
                        margin 0 0 7px
                    .price-views
                        height 28px
                        line-height 28px
                        width 100%
                        position relative
                        color #91989C
                        font-size 13px
                        margin 0 0 6px 0px
                        .price
                            float left
                            padding 0 0 0 2px
                            height 28px
                            .vital
                                color #ff6533
                                font-weight bold
                                font-family "Montserrat-Bold","黑体"
                                font-size 18px
                                margin 0 3px 0 0
                        .views
                            float right
                            padding 0 3px 0 21px
                            font-size 14px
                            position relative
                            .iconfont
                                width 20px
                                height 20px
                                line-height 20px
                                text-align center
                                font-size 16px
                                _completeCenter(0,auto,5px,auto)
                    .other
                        color #91989C
                        font-size 13px
                        _ellipsis()
                        margin 0 0 12px 0
                    .btn-wrap
                        height 32px
                        width 213px - 8px
                        line-height 32px
                        padding 0 4px
                        .u-btn
                            _display()
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
                        &.one
                            width 213px - 30px
                            margin 0
                            padding 0 15px
                            .u-btn
                                width 183px
                                _spacingPlus(3px)
                                margin 0 auto
                        &.two
                            width 213px - 10px + 11px
                            margin 0 0 0 -11px
                            .u-btn
                                width 96px
                                margin 0 0 0 11px
                        &.three
                            width 213px - 8px + 8px
                            margin 0 0 0 -8px
                            .u-btn
                                width 63px
                                margin 0 0 0 8px
                    .on-btn
                        text-align center
                        height 22px
                        line-height 22px
                        padding 8px 0 0
                        .txt
                            _display(inline-block)
                            font-size 13px
                            height 21px
                            color #91989c
                            _border(bottom,#d2d2d2)

            &:hover
                _boxShadow(15px,rgba(0,0,0,.10),-4px,4px)
                .m-pic-box
                    .u-label
                        _transitionAll(.28s,cubic-bezier(0.14, 0.46, 0.46, 1.02))
                        _translate3d(-@width,0)
                .m-con-box
                    _transitionAll(.3s,cubic-bezier(0.14, 0.46, 0.46, 1.02))
                    _translate3d(0,-75px)
                    .u-mask
                        _transitionAll(.3s,cubic-bezier(0.14, 0.46, 0.46, 1.02))
                        _translate3d(0,-90px)
</style>
