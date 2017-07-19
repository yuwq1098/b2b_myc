<!--  
 **  @description 账单列表组件
 --> 

 <template>
    <div class="billList">
        <div class="m-bill-lst">
            <div class="m-tb-hd f__clearfix">
                <span class="m-hd-item w-188">交易流水号</span>
                <span class="m-hd-item w-125 text-rt">交易类别</span>
                <span class="m-hd-item w-110 text-cr">交易金额</span>
                <span class="m-hd-item w-80 text-cr">交易状态</span>
                <span class="m-hd-item w-170">交易明细</span>
                <span class="m-hd-item w-95 text-rt">交易时间</span>
            </div>
            <div class="m-tb-con">
                <ul class="m-tb-lst" v-if="billList.length>0">
                    <template v-for="(item,index) in billList">
                        <li class="m-tb-row f__clearfix">
                            <div class="u-item w-188 u-no">
                                <router-link 
                                    :to="{path:'/member/billDetails',query:{cid:item.cid}}" 
                                    class="u-lk" 
                                    title="查看订单详情"
                                    tag="a"
                                    >{{item.cid}}
                                </router-link>
                            </div>
                            <div class="u-item w-125 text-rt u-type">（{{item.belong}}）{{item.type}}</div>
                            <div class="u-item w-110 text-cr u-price">
                                <span class="vital">{{item.price | priceFormat(2)}}</span>
                            </div>
                            <div class="u-item w-80 text-cr u-status">{{item.statusText}}</div>
                            <div class="u-item w-170 u-desc">{{item.desc}}</div>
                            <div class="u-item w-95 text-rt u-time">{{item.timeEnd | dateMinuteFormat}}
                            </div>
                        </li>
                    </template>
                </ul>
                <div class="m-more" v-show="isShowMore">
                    <a href="javascript:;" class="u-lk" 
                        @click="getMoreData()"
                        v-if="!isNotMore"
                        >获取更多...</a>
                    <p class="u-txt" v-if="isNotMore">没有更多了~</p>
                </div>
                <div class="no-data" v-if="billList.length==0">
                    <not-content
                        speak="不好意思，您没有此类交易账单，快去B2B大厅看看有没有中意的爱车吧!"
                        >
                        <router-link :to="{path:'/'}" class="u-lk" tag="a">网站首页&gt;</router-link>
                        <router-link :to="{path:'/b2bHall'}" class="u-lk" tag="a">B2B大厅&gt;</router-link>
                    </not-content><!-- 缺省组件 -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    
    // 会员中心缺省组件
    import notContent from 'components/member/notCon.vue' 
    export default {

        name: "billList",
        // 在当前模块注册组件
        components:{
            notContent,
        },
        // 数据
        data() {
            return{
                
            }
        },
        props:{
            // 账单列表信息
            billList: {
                type: Array,
                default(){
                    return [];
                }
            },
            // 是否到底了(是否没有更多)
            isNotMore: {
                type: Boolean,
                default: false,
            },
            // 是否显示更多
            isShowMore:{
                type: Boolean,
                default: true,
            },
        },
        // 自定义函数(方法)
        methods: {
            // 获取更多数据
            getMoreData(){
                this.$emit("getMoreData")
            }
        },    
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .m-bill-lst
        width 948px
        padding 15px 0 30px
        .m-tb-hd
            width @width
            height 42px
            line-height 42px
            background #4B5861
            color #e2e2e2
            .m-hd-item
                _display()
                width 120px
                padding 0 15px
                font-size 14px
                _spacingPlus(2px)
                float left
        .m-tb-con
            .m-tb-lst
                min-height 208px
                .m-tb-row
                    height 40px
                    _border(bottom,#E5E8EB)
                    .u-item
                        line-height 40px
                        _display()
                        float left
                        width 120px
                        font-size 13px
                        padding 0 15px
                        _ellipsis()
                        .u-lk:hover
                            text-decoration underline

                        .vital
                            color #ff6533
                        &.u-type
                            padding 0 15px 0 5px
                            width 135px
                        &.u-price
                            padding 0 7px
                            width 126px
                        &.u-status
                            padding 0 7px
                            width 96px
                        &.u-time
                            font-size 12px
                            color #959595
                            padding 0 15px 0 0
                            width 110px
                    &:hover
                        background #eff0f3
                        .u-lk
                            color #2e98e2
            .m-more
                margin 30px 0 0
                height 38px
                line-height 38px
                text-align center
                position relative
                .u-lk
                    _display(inline-block)
                    height 36px
                    line-height @height
                    padding 0 55px
                    font-size 16px
                    color #666
                    _borderAll(#666)
                    _spacingPlus(3px)
                    _borderRadius(6px)
                    &:hover
                        color #2f98e2
                        _borderAll(#2f98e2)
                .u-txt
                    color #666
                    font-size 16px
                    _spacingPlus(2px)
        .m-tb-hd,
        .m-tb-con .m-tb-lst .m-tb-row
            .w-188
                width 188px
            .w-125
                width 125px
            .w-110
                width 110px
            .w-80
                width 80px
            .w-170
                width 170px
            .w-95
                width 95px
            .text-lt
                text-align left
            .text-rt
                text-align right
            .text-cr
                text-align center

</style>
