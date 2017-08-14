<!--  
 **  @description 分享组件
 --> 

<template>
    <div class="gkShare">
        <div class="m-share-box">
            <div class="lk-wrap f__clearfix">
                
                <a class="u-block filter" title="分享至新浪微博" 
                    @click="f_weibo()"
                    ><i class="icon weibo"></i>
                </a><!-- 新浪微博 -->
                
                <a class="u-block filter" title="分享至QQ好友"
                    @click="f_qq()"
                    ><i class="icon qq"></i>
                </a><!-- QQ好友 -->
                
                <a class="u-block filter" title="分享至微信"
                    @click="f_weixin()"
                    ><i class="icon weixin"></i>
                </a><!-- 微信 -->

                <a class="u-block filter" title="分享至QQ空间" 
                    @click="f_qzone()"
                    ><i class="icon qzone"></i>
                </a><!-- QQ空间 -->
                
                <a class="u-block filter" title="分享至人人网"
                    @click="f_renren()">
                    <i class="icon renren"></i>
                </a><!-- 人人网 -->
                
                <a class="u-block filter" title="分享至开心网"
                    @click="f_kaixin()"
                    ><i class="icon kaixin"></i>
                </a><!-- 开心网 -->
                
                <a class="u-block filter" title="分享至豆瓣网"
                    @click="f_douban()"
                    ><i class="icon douban"></i>
                </a><!-- 豆瓣网 -->

                <a class="u-block filter" title="分享至领英"
                    @click="f_linkedin()"
                    ><i class="icon linkedin"></i>
                </a><!-- 领英 -->
                
                
            </div>
        </div><!-- 分享盒子 -->
        
        <div class="shareWX-box" v-show="isShowWXbox" ref="shareWXBox">
            <div class="m-mask" @click="closeWXBox()"></div><!-- 遮罩层 -->
            <div class="m-code">
                <div class="inner">
                    <div class="u-hd">
                        <p class="tit">分享至微信朋友圈</p>
                        <a class="u-btn close"
                            @click.stop="closeWXBox()"
                            >
                            <i class="iconfont icon-guanbi1"></i>
                        </a>
                    </div><!-- 头部 -->
                    <div class="u-pic">
                        <img :src="WXcode" alt="分享至微信朋友圈" />
                    </div>
                    <div class="u-ft">
                        <p class="desc">打开微信，点击底部的“发现”，使用 “扫一扫” 即可将网页分享到我的朋友圈</p>
                    </div>
                </div>
            </div>    
        </div><!-- 微信扫码盒子 -->

    </div>
</template>

<script>

    // 引入外部js的组件
    import simpleShare from "assets/js/simple-share.js"
    // dom操作方法
    import * as geekDom from "assets/js/dom.js"
    // 引入二维码转换器
    import QRCode from 'qrcode';

    export default {
        name: "gkShare",
        // 数据
        data() {
            return{
                share: {},
                
                // 微信二维码图片
                WXcode: "",
                isShowWXbox: false,
            }
        },
        // 子父组件通信
        props:{
            options:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        // 数据侦听
        watch:{
            
        },
        //生命周期,开始的时候
        created(){
            this.share = new simpleShare(Object.assign(this.options,{}));
            
        },
        // 当实例挂载到$el上时
        mounted(){
            
        },
        // 再次进入生命周期钩子(因为keep-alive的原因,created和mounted在页面切换过程中都是无效的)
        activated(){

        },
        // 自定义函数(方法)
        methods: {
            // 新浪微博
            f_weibo(){
                this.share.weibo();
            },
            // qq空间
            f_qzone(){
                this.share.qzone();
            },
            // 人人网
            f_renren(){
                this.share.renren();
            },
            // 开心网
            f_kaixin(){
                this.share.kaixin();
            }
            // 豆瓣网
            ,f_douban(){
                this.share.douban();
            },
            // qq好友
            f_qq(){
                this.share.qq();
            },
            // 微信
            f_weixin(){
                let me = this;
                this.share.weixin((url)=>{
                    // 鼠标滚轮事件
                    geekDom.preventScroll(this.$refs.shareWXBox);
                    
                    this.isShowWXbox = true;
                    // 微信二维码
                    QRCode.toDataURL(url, function (err, url) {
                        me.WXcode = url
                    })
                });
            },

            // 领英
            f_linkedin(){
                this.share.linkedin();
            },
            
            // 关闭微信盒子
            closeWXBox(){
                this.WXcode = "";
                this.isShowWXbox = false;
                
            }
        },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '~assets/css/mixin.styl'
    .shareWX-box
        width 100%
        height 100%
        position fixed
        left 0
        top 0
        right 0
        bottom 0
        z-index 20170721
        .m-mask
            width @width
            height @height
            background rgba(0,0,0,.55)
            cursor pointer
        .m-code
            width 365px - 20px
            height 385px - 20px
            padding 10px
            _completeCenter()
            background rgba(255,255,255,.35)
            .inner
                width @width
                height @height
                background #fff
                position relative
                .u-hd
                    height 48px
                    line-height @height
                    _border(bottom,#e2e2e2)
                    position relative
                    .tit
                        padding 0 10px
                        font-size 16px
                        color #222
                        _spacing()
                    .u-btn
                        width 25px
                        text-align center
                        height 25px
                        line-height @height
                        background #58B1F7
                        _completeCenter(auto,10px)
                        .iconfont
                            _display()
                            font-size 18px
                            color #f2f2f2
                            _translate3d(0,1px)
                            _completeCenter()
                        &:hover
                            background #58B1F7 - 20%
                .u-pic
                    width 220px
                    height @width
                    _completeCenter(,,67px,auto)
                    _imgwrap()
                .u-ft
                    width @width
                    height 58px - 12px
                    _border(top,#e2e2e2)
                    _completeCenter(,,auto,0)
                    padding 6px 0
                    .desc
                        width @width - 24px
                        height 46px
                        line-height @height * 0.5
                        font-size 12px
                        padding 0 12px
                        color #777


</style>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .m-share-box
        width 100%
        height 25px
        .lk-wrap
            width 100%
            height @height
            padding 2px 0 0 
            .u-block
                width @height
                height @width
                float left
                margin 0 6px 6px 0
                .icon
                    _display()
                    width @width
                    height @width
                    &.weibo
                        background url("../../assets/img/share_weibo.png") center center no-repeat
                        background-size cover
                    &.qzone
                        background url("../../assets/img/share_qzone.png") center center no-repeat
                        background-size cover
                    &.tqq
                        background url("../../assets/img/share_tqq.png") center center no-repeat
                        background-size cover
                    &.qq
                        background url("../../assets/img/share_qq.png") center center no-repeat
                        background-size cover
                    &.renren
                        background url("../../assets/img/share_renren.png") center center no-repeat
                        background-size cover
                    &.douban
                        background url("../../assets/img/share_douban.png") center center no-repeat
                        background-size cover
                    &.kaixin
                        background url("../../assets/img/share_kaixin.png") center center no-repeat
                        background-size cover
                    &.facebook
                        background url("../../assets/img/share_facebook.png") center center no-repeat
                        background-size cover
                    &.twitter
                        background url("../../assets/img/share_twitter.png") center center no-repeat
                        background-size cover
                    &.linkedin
                        background url("../../assets/img/share_linkedin.png") center center no-repeat
                        background-size cover
                    &.weixin
                        background url("../../assets/img/share_weixin.png") center center no-repeat
                        background-size cover
                &:hover
                    position relative
                    _borderRadius(3px)
                    _overflow()
                    _filterCustom(brightness(110%) contrast(98%) invert(2%))
                    &::before
                        content ""
                        _display()
                        height 100%
                        width 100%
                        _completeCenter(,auto,,auto)
                        // 元素不会成为鼠标事件的target
                        pointer-events none
                        mix-blend-mode screen
                        _borderRadius(2px)
                        background rgba(86, 105, 117, 0.78)

</style>
