<!--
 **  @description 出价弹出组件
 -->

 <template>
    <div class="bidPopup" ref="bidPopup">
        <div class="m-mask" @click="cancelBidPopup()"></div><!-- 遮罩层 -->
        <div class="popup-wrapper">
            <section class="popup-adorn">
                <i class="iconfont icon-baojia1"></i>
            </section><!-- 装饰物 -->
            <a class="u-btn cancel" title="关闭报价框" @click="cancelBidPopup()">
                <i class="iconfont icon-guanbi1"></i>
            </a><!-- 关闭 -->
            <div class="bid-content">
                <header class="dialog-title">请输入您的意向价</header>
                <template v-if="hasAuth!='1'">
                    <p class="no-apply">您尚未通过认证</p>
                </template>
                <template v-else>
                    <div class="current-price">当前批发价：<em>{{ownerFixedPrice | priceFormat(2)}}万</em></div>
                </template>

                <div class="ipt-box">
                    <span class="ipt-error"
                        v-show="errors.has('intentionPrice')"
                        >{{errors.first('intentionPrice')}}</span>
                    <input class="intention-price" type="text"
                        v-model="thePrice" placeholder="输入意向价" />
                    <span class="unit">万</span>
                </div>
                <button class="bid-submit" @click="bidSubmit()">提交</button>

                <template v-if="oldPriceInfo.time">
                    <section class="old-price">
                        <div class="u-tit">我的最近报价</div>
                        <div class="u-con">
                            <span class="time">{{oldPriceInfo.time | formatDate}}</span>
                            <span class="price">{{oldPriceInfo.price | priceFormat(2)}}万</span>
                        </div>
                    </section><!-- 最近报价 -->
                </template>
                <template v-else>
                    <p class="no-old-price">您还没有对这辆车进行过报价~~</p>
                </template>
            </div><!-- 内容 -->
        </div><!-- 弹出层 -->
    </div><!-- 出价弹出组件 -->
</template>

<script>

    // dom操作类
    import * as geekDom from 'assets/js/dom.js'
    //引入表单验证
    import { Validator } from 'vee-validate';

    export default {

        name: "bidPopup",
        // 在当前模块注册组件
        validator: null,
        components:{

        },
        // 数据
        data() {
            return{
                // 当前输入的报价
                thePrice: "",
                // 发布订单的表单验证报错集合
                errors: null,
            }
        },
        props:{
            // 我的最近报价信息
            oldPriceInfo: {
                type: Object,
                default(){
                    return {};
                }
            },
            // 一口价
            ownerFixedPrice: Number,
            // 是否通过认证
            hasAuth: String,
        },
        computed:{

        },
        created(){
            this.validator = new Validator({
                intentionPrice: 'required|between:0.1,3000|decimal:2',
            });
            this.$set(this, 'errors', this.validator.errors);
            setTimeout(()=>{
                // 禁止鼠标滚轮事件
                geekDom.preventScroll(this.$refs.bidPopup);
            })
        },
        mounted(){

        },
        // 自定义函数(方法)
        methods: {

            // 关闭报价框
            cancelBidPopup(){
                this.reset();
                this.$emit("cancelBidPopup");
            },
            // 提交报价
            bidSubmit(){
                // 是否通过认证
                if(this.hasAuth!='1'){
                    return;
                }
                // 数据是否输入合法/验证
                this.validator.validate('intentionPrice',this.thePrice).then((res)=>{
                    if (res) {
                        return;
                    }else{
                        reject();
                    }
                }).then(()=>{
                    if(this.thePrice>=this.ownerFixedPrice){
                        this.errors.remove('intentionPrice');
                        this.errors.add('intentionPrice', "意向价格应低于原批发车价", 'auth');
                        reject();
                    }
                    var rangePrice = (+this.ownerFixedPrice * 0.4).toFixed(2);
                    if((this.thePrice<this.ownerFixedPrice - (+rangePrice))) {
                        this.errors.remove('intentionPrice');
                        this.errors.add('intentionPrice', "意向价格最多比原批发车价低40%", 'auth');
                        reject();
                    }else{
                        return;
                    }
                }).then(()=>{
                    this.$emit("putBidPopup",this.thePrice)
                }).catch((error)=>{
                    // console.log("失败了");
                });
            },
            // 数据重置
            reset(){
                this.thePrice = "";
            }
        },
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .bidPopup
        width 100%
        height 100%
        _completeCenter(,,,,fixed)
        z-index 1911
        .m-mask
            width 100%
            height 100%
            background rgba(0,0,0,.8)
            z-index 1
        .popup-wrapper
            width 380px
            height 320px
            _completeCenter(,,,,fixed)
            z-index 2
            .popup-adorn
                width 80px
                height @width
                _completeCenter(,,-40px,auto)
                _borderRadius()
                background #fff
                text-align center
                position relative
                z-index 2
                .iconfont
                    font-size 56px
                    color #fa3
                    _display()
                    _completeCenter(,,7px,auto)
            .u-btn.cancel
                width 32px
                height @width
                text-align center
                line-height @height
                z-index 2
                _completeCenter(auto,15px,25px,auto)
                _borderRadius()
                .iconfont
                    color #959595
                    font-size 28px
                    _display()
                    _translate3d(0,1px)
                &:hover
                    .iconfont
                        color #ff6533
            .bid-content
                width @width - 48px
                height @height - 60px
                background #fff
                _completeCenter()
                padding 45px 24px 15px
                text-align center
                .dialog-title
                    height 32px
                    line-height @height
                    margin-bottom 13px
                    font-size 24px
                    color #222
                .current-price
                    color #959595
                    font-size 13px
                    height 18px
                    line-height @height
                    margin-bottom 20px
                    em
                        color #ff6533
                .no-apply
                    color #959595
                    font-size 13px
                    height 18px
                    line-height @height
                    margin-bottom 20px
                .ipt-box
                    height 40px
                    width 100%
                    margin 0 0 18px
                    position relative
                    .ipt-error
                        position absolute
                        right 15px
                        height 22px
                        line-height @height
                        bottom - @height * 0.4
                        background #fff
                        padding 0 6px
                        color #ff6533
                    input.intention-price
                        width @width
                        height @height
                        padding 0 12px
                        _boxSizing()
                        _borderAll(#e2e2e2)
                        _borderRadius(2px)
                        _display()
                        font-size 14px
                    .unit
                        _completeCenter(auto,12px)
                        height 20px
                        line-height 20px
                        text-align right
                button.bid-submit
                    height 42px
                    width 100%
                    border none
                    font-size 16px
                    _spacingPlus(8px)
                    _borderRadius(2px)
                    background #FFAA33
                    color #fff
                    &:hover
                        background @background - 8%
                    &:active
                        background @background + 2%
                .old-price
                    margin-top 18px
                    .u-tit
                        height 22px
                        line-height @height
                        margin-bottom 10px
                        font-size 15px
                        color #666
                        &:before,&:after
                            content ""
                            _display(inline-block)
                            width 68px
                            height 1px
                            background #c2c2c2
                            _verticalTextAlign(middle)
                            margin 0 10px
                            _translate3d(0,-1px)
                    .u-con
                        height 18px
                        line-height @height
                        font-size 13px
                        color #959595
                        span
                            margin 0 8px
                .no-old-price
                    height 22px
                    line-height @height
                    font-size 13px
                    color #959595
                    margin-top 28px
</style>
