<!--
 **  @description 放大镜组件 => 属于车辆详情的效果
 -->

<template>
    <div class="magnifyingGlass">
        <div class="m-magnifying">
            <div id="normal-box" ref="normalBox">
                <div id="mark"
                    ref="mark"
                    @mouseover="glassOver"
                    @mouseout="glassOut"
                    @mousemove="glassMove($event)"
                    ></div>
                <div id="float-box" ref="floatBox"></div>
                <img class="u-pic" :src="imageUrl" alt="正常的图" />
            </div>
            <div id="large-box" ref="largeBox">
                <div class="large-wrap" ref="largePic">
                    <img class="pic-large" :src="imageUrl" alt="放大的图" />
                </div>
            </div>
        </div><!-- 放大镜效果 -->
    </div>
</template>

<script>

    // dom操作类
    import * as geekDom from 'assets/js/dom.js'

    export default {
        name: "magnifyingGlass",
        // 数据
        data() {
            return{

            }
        },
        props:{
            imageUrl: String,
        },
        // 数据侦听
        watch:{
            imageUrl(val){
                this.init();
            }
        },
        created(){
            this.init();
        },
        // 再次进入生命周期钩子(因为keep-alive的原因,created和mounted在页面切换过程中都是无效的)
        activated(){

        },
        // 自定义函数(方法)
        methods: {
            // 初始化代码
            init(){
                this.$nextTick(()=>{
                    this.normalDom = this.$refs.normalBox;
                    this.markDom = this.$refs.mark;
                    this.floatDom = this.$refs.floatBox;
                    this.largeDom = this.$refs.largeBox;
                    this.largePicDom = this.$refs.largePic;
                })
            },
            // 控制对应元素显示隐藏
            isShowToggle(display){
                this.floatDom.style.display = display
                this.largeDom.style.display = display
            },
            // 鼠标放在遮罩层上时
            glassOver(){
                this.isShowToggle("block")
            },
            // 鼠标离开遮罩层上时
            glassOut(){
                this.isShowToggle("none")
            },
            // 鼠标在遮罩层上移动时
            glassMove(ev){
                var _event = ev || window.event;  //兼容多个浏览器的event参数模式

                // 计算浮动框(放大镜)位置
                var left = _event.clientX - geekDom.getPosition(this.normalDom).left - this.floatDom.offsetWidth / 2;
                // 解决滚动条滚动后,鼠标相对屏幕位置与效果需要的结果有出入的BUG
                var top = geekDom.getScrollTop() + _event.clientY - geekDom.getPosition(this.normalDom).top - this.floatDom.offsetHeight / 2;

                // 左右临界处判断
                if (left < 0) {
                    left = 0;
                } else if (left > (this.markDom.offsetWidth - this.floatDom.offsetWidth)) {
                    left = this.markDom.offsetWidth - this.floatDom.offsetWidth;
                }

                // 上下临界处判断
                if (top < 0) {
                    top = 0;
                } else if (top > (this.markDom.offsetHeight - this.floatDom.offsetHeight)) {
                    top = this.markDom.offsetHeight - this.floatDom.offsetHeight;
                }

                // 设置浮动框(放大镜)位置
                this.floatDom.style.left = left + "px";   //oSmall.offsetLeft的值是相对什么而言
                this.floatDom.style.top = top + "px";

                // 计算偏移比例(当前值/最大偏移量)
                var percentX = left / (this.markDom.offsetWidth - this.floatDom.offsetWidth);
                var percentY = top / (this.markDom.offsetHeight - this.floatDom.offsetHeight);

                // 设置放大镜副本(大图位置)
                this.largePicDom.style.left = - percentX * (this.largePicDom.offsetWidth - this.largeDom.offsetWidth) + "px";
                this.largePicDom.style.top = - percentY * (this.largePicDom.offsetHeight - this.largeDom.offsetHeight ) + "px";

            }
        },
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    $imgWidth = 625px
    $imgHeight = 420px
    .m-magnifying
        width $imgWidth
        height $imgHeight
        position relative
        _opactiy(.5)
        #mark
            position absolute
            _display()
            _opacity(0)
            width @width
            height @height
            background-color #fff
            z-index 10
            cursor pointer
        #normal-box
            width @width
            height @height
            position relative
            _overflow()
            .u-pic
                width @width
                height auto
                _completeCenter()
        #float-box
            _display(none)
            width 510px * 0.4
            height 430px * 0.4
            position absolute
            background rgba(39, 51, 60, 0.5)
            _borderAll(#5B6671)
            _opacity(.5)
            z-index 1
        #large-box
            width 510px
            height 430px
            _display(none)
            _overflow()
            _completeCenter(665px,auto,0,auto)
            .large-wrap
                width $imgWidth * 2.5
                height $imgHeight * 2.5
                position absolute
                _overflow()
                .pic-large
                    width @width
                    height auto
                    _completeCenter()
</style>
