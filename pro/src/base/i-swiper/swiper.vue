<template>
    <div class="slider" ref="slider">
        <div class="large-img-group" ref="largeGroup">
            <slot name="imgMain"></slot>
        </div>
        <div class="focus-group" ref="focusGroup">
            <a href="javascript:;" class="u-btn prev">上一页</a><!-- 上一页 -->
            <div class="f-gp-wrap" ref="fGpWrap">
                <ul class="f-gp-lst f__clearfix">
                    <template v-for="(item, index) in recommends">
                        <li class="f-gp-item">
                            <a :href="item.linkUrl">
                                <img class="needsclick" :src="item.picUrl">
                            </a>
                        </li>
                    </template>
                </ul>
            </div>
            <a href="javascript:;" class="u-btn next">下一页</a><!-- 下一页 -->
        </div>
    </div>
</template>

<script>
  import {addClass} from 'assets/js/dom'
  import BScroll from 'better-scroll'

  export default {
    name: 'slider',
    props: {
        recommends:{
            type: Array,
            default: [],
        }
    },
    data() {
        return {
            dots: [],
            currentPageIndex: 0,
            autoPlay: {
                type: Boolean,
                default: true
            },
            interval: {
                type: Number,
                default: 4000
            }
        }
    },
    //在$el将内容挂载之后
    mounted() {
        setTimeout(() => {
            this._setSliderWidth()
            this._initSlider()

            if (this.autoPlay) {
                this._play()
            }
            console.log(this.recommends);
        },20)
        
        // 监听浏览器重新调整视口大小的事件
        window.addEventListener('resize', () => {
            console.log("重新调整视口大小")
            if (!this.slider) {
                return
            }
            this._setSliderWidth(true)
            this.slider.refresh()
        })
    },
    //销毁（离开这个页面时，关闭定时器，起到不占用内存的作用）
    destroyed() {
      
    },
    //定义当前组件使用的方法
    methods: {
        //设置宽度
        _setSliderWidth(isResize) {
            this.children = this.$refs.largeGroup.children

            let width = 0
            let sliderWidth = this.$refs.slider.clientWidth
            console.log(sliderWidth)
            for (let i = 0; i < this.children.length; i++) {
                let child = this.children[i]
                addClass(child, 'slider-item')

                child.style.width = sliderWidth + 'px'
                width += sliderWidth
            }
            if (this.loop && !isResize) {
                width += 2 * sliderWidth
            }
            this.$refs.largeGroup.style.width = width + 'px'
        },
        //初始化slider
        _initSlider() {
            this.slider = new BScroll(this.$refs.slider, {
                scrollX: true,
                scrollY: false,
                momentum: false,
                snap: true,
                snapLoop: true,
                snapThreshold: 0.3,
                snapSpeed: 400
            })

            this.slider.on('scrollEnd', () => {
                let pageIndex = this.slider.getCurrentPage().pageX
                if (this.loop) {
                    pageIndex -= 1
                }
                this.currentPageIndex = pageIndex

                if (this.autoPlay) {
                    console.log("scrollEnd")
                    clearTimeout(this.timer)
                    this._play()
                }
            })
        },
        _play() {
            let pageIndex = this.currentPageIndex + 1
            if (this.loop) {
                pageIndex += 1
            }
            // this.timer = setTimeout(() => {
            //     this.slider.goToPage(pageIndex, 0, 400)
            // }, this.interval)
        }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~assets/css/variable"
    .slider
        width 700px
        height 550px
        overflow hidden
        .large-img-group
            height 450px
            width @width
            overflow: hidden
            .slider-item
                float: left
                box-sizing: border-box
                overflow: hidden
                text-align: center
                a
                    display: block
                    width: 100%
                    overflow: hidden
                    text-decoration: none
                img
                    display: block
                    width: 100%
                    height 100%

        .focus-group
            height 90px
            margin-top 10px
            width @width
            overflow hidden
            position relative
            .f-gp-wrap
                width @width - 84px
                margin 0 42px
                height @height
                overflow hidden
                .f-gp-lst
                    width 1500px
                    .f-gp-item
                        width 140px
                        height @height
                        margin-right 12px 
                        float left
                        img
                            width @width
                            height @height
            .u-btn
                height @height
                width 40px
                background #e4e5f8
                color #545454
                position absolute
                bottom 0
                &.prev
                    left 0
                &.next
                    right 0


</style>