<!--
 **  @description 出价弹出组件
 -->

 <template>
    <div class="bidPopup">
        <div class="m-mask"></div><!-- 遮罩层 -->
        <div class="popup-wrapper">
            <section class="popup-adorn">
                <i class="iconfont icon-baojia1"></i>
            </section><!-- 装饰物 -->
            <a class="u-btn cancel" href="javascript:;">
                <i class="iconfont icon-guanbi1"></i>
            </a><!-- 关闭 -->
            <div class="bid-content">
                
            </div><!-- 内容 -->
        </div><!-- 弹出层 -->
    </div><!-- 出价弹出组件 -->
</template>

<script>

    export default {

        name: "bidPopup",
        // 在当前模块注册组件
        components:{

        },
        // 数据
        data() {
            return{

            }
        },
        props:{

        },
        computed:{

        },
        // 自定义函数(方法)
        methods: {

        },
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .bidPopup
        .m-mask
            width 100%
            height 100%
            _completeCenter(,,,,fixed)
            background rgba(0,0,0,.7)
            z-index 20170911
        .popup-wrapper
            width 380px
            height 340px
            _completeCenter(,,,,fixed)
            z-index 20170912
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
            .bid-content
                width @width
                height @height
                background #fff
                _completeCenter()
</style>
