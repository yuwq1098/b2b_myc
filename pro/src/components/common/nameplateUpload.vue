<!--  
 **  @description 图片文件上传（汽车铭牌上传）
 --> 

<template>
    <div class="photoUpload">
        <div class="m-upload-wrap">
            <div class="m-oper-box f__clearfix">
                <div class="u-oper-btn" @click="onPhotoUpload">
                    <a href="javascript:;" class="u-lk">
                        <span class="u-btn-tit">点击上传车辆铭牌</span>
                        <i class="iconfont icon-shangchuan1"></i><!-- 上传小图标 -->
                    </a>
                </div><!-- 上传按钮 -->
                <div class="u-oper-tip">
                    <p class="u-txt">上传车辆铭牌图片，图片比例为10:7，支持jpg/gif/png格式，每张最大2M，为保证铭牌有效辨识度，您可以尝试上传2-3张不同角度的铭牌照片！
                    </p>
                </div><!-- 上传提示 -->
            </div><!-- 操作区 -->
            <div class="m-file-box">
                <div class="m-file-example">
                    <ul class="m-pic-lst f__clearfix">
                        <template v-for="item in nameplateExamples">
                            <li class="u-item">
                                <div class="u-pic">
                                    <img :src="item.imgUrl" :alt="'上传车辆铭牌示例-'+item.title"/>
                                </div>
                                <p class="u-info">
                                    <span>示例</span>
                                    <i>·</i>
                                    <span>{{item.title}}</span>
                                </p>
                            </li>    
                        </template>
                    </ul>
                </div><!-- 文件上传例子(当没有上传文件，文件列表为空时显示) -->
            </div><!-- 显示文件区 -->
        </div>
    </div>
</template>

<script>
    
    // 本地数据 发布车辆图片上传势力
    import {nameplateExamples} from "api/localJson/sendCar.js"

    export default {
        name: "photoUpload",
        // 数据
        data() {
            return{
                nameplateExamples: nameplateExamples,
            }
        },
        props:{
            
        },
        // 数据侦听
        watch:{
            
        },
        // 再次进入生命周期钩子(因为keep-alive的原因,created和mounted在页面切换过程中都是无效的)
        activated(){

        },
        // 自定义函数(方法)
        methods: {
            // 上传车辆文件图片
            onPhotoUpload(){
                console.log("开始上传车辆图片文件");
            }
        },
        // 在当前模块注册组件
        components:{

        },
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .m-upload-wrap
        .m-oper-box
            position relative
            height 44px
            margin-bottom 12px
            .u-oper-btn
                width 250px
                height 38px
                line-height 34px
                text-align center
                background #ff6533
                _completeCenter(0,auto)
                _spacingPlus(1px)
                _borderRadius(3px)
                color #f4f4f4
                background $c_blue + 5% - 3deg
                .iconfont
                    _display(inline-block)
                    font-size 18px
                    _translate3d(0,2px)
                &:hover
                    background $c_blue + 3%
                .u-lk
                    _display()
                    width 100%
                    height 100%
                    color #f4f4f4
            .u-oper-tip
                width 500px
                height 38px
                line-height 19px
                font-size 12px
                color #959595
                padding 3px 0
                margin-left 268px
        .m-file-box
            padding 10px 0 15px
            _border(bottom,#e2e2e2)
            margin-bottom 10px
            .m-file-example
                width 800px
                position relative
                .m-pic-lst
                    width 800px + 16px
                    margin-left -16px
                    .u-item
                        width 120px
                        margin-left 16px
                        height 114px
                        float left
                        .u-pic
                            width @width
                            height 84px
                            img
                                width @width
                                height @height
                        .u-info
                            text-align center
                            height 22px
                            line-height 22px
                            color #959595
                            font-size 12px
                            _spacingPlus()
                            margin 5px 0 3px


</style>
