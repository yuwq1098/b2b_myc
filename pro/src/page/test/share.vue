<template>
	<div class="share">
        <div class="box-inner">
            <div class="m-share-link f__clearfix">
                <a class="u-block" @click="share.weibo()"><i class="icon weibo"></i></a><!-- 新浪微博 -->
                <a class="u-block" @click="share.qzone()"><i class="icon qzone"></i></a><!-- QQ空间 -->
                <a class="u-block" @click="share.tqq()"><i class="icon tqq"></i></a><!-- 腾讯微博 -->
                <a class="u-block" @click="share.qq()"><i class="icon qq"></i></a><!-- QQ好友 -->
                <a class="u-block" @click="share.renren()"><i class="icon renren"></i></a><!-- 人人网 -->
                <a class="u-block" @click="share.douban();"><i class="icon douban"></i></a><!-- 豆瓣网 -->
                <a class="u-block" @click="share.kaixin();"><i class="icon kaixin"></i></a><!-- 开心网 -->
                <a class="u-block" @click="share.facebook();"><i class="icon facebook"></i></a><!-- 脸书 -->
                <a class="u-block" @click="share.twitter();"><i class="icon twitter"></i></a><!-- 推特 -->
                <a class="u-block" @click="share.linkedin();"><i class="icon linkedin"></i></a><!-- 领英 -->
                <a class="u-block" @click="share.weixin();"><i class="icon weixin"></i></a><!-- 微信 -->
                <!-- <a class="u-block" @click="share.weixin();">weixin</a>微信
                <a class="u-block" @click="share.weixin(function(qrcode){ alert(qrcode); });">weixin with callback</a>微信回调 -->
            </div>
        </div>
	</div>
</template>

<script>
    
    // 引入外部js的组件
    import simpleShare from "assets/js/simple-share.js"

	export default {
        name: "share",
        // 数据
        data() {
            return {
                share: {},
            }
        },
        //生命周期,开始的时候
        created(){

        },
        // 当实例挂载到$el上时
        mounted(){
            this.share = new simpleShare({
                title: '淘宝',
                content: '淘宝是个很不错的购物网站',
                pic: 'http://gtms01.alicdn.com/tps/i1/T1SwHiFnlkXXc.QAHh-202-55.png'
            });
        },
        methods: {
            
        },
        // 在当前模块注册组件
        components:{

        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .box-inner
        height 400px
        .m-share-link
            width 1200px
            height 28px
            .u-block
                width @height
                height @width
                margin 0 8px 0 0
                _display()
                float left
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

</style>
