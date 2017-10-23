<!--  
 **  @description 明星车商组件
 --> 

<template>
	<div class="starDealer">
	    <div class="m-lst-con">
            <div class="u-part top">
                <ul class="dealer-list f__clearfix">
                    <template v-for="(item,index) in dealerInfo.topThree">
                        <li class="item">
                            <router-link class="u-box" tag="a"
                                :to="{path:'/merchantDetails',query:{'cid':item.mid}}"
                                :title="'进入'+item.cdgName">
                                <div class="dealer-inner">
                                    <div class="dealer-pic">
                                        <img :src="item.faceUrl" :alt="item.faceUrl"/>
                                    </div><!-- 车商图片 -->
                                    <div class="dealer-con">
                                        <h4 class="name">{{item.cdgName}}</h4>
                                        <div class="address">{{item.address}}</div>
                                        <div class="onsale">{{item.carCount}}辆在售</div>
                                    </div>
                                </div><!-- 车商信息 -->
                            </router-link>
                        </li>
                    </template>
                </ul>
            </div><!-- 上部分 -->

            <div class="u-part bottom">
                <ul class="dealer-list f__clearfix">
                    <template v-for="(item,index) in dealerInfo.normal">
                        <li class="item">
                            <router-link class="u-box" tag="a"
                                :to="{path:'/merchantDetails',query:{'cid':item.mid}}"
                                :title="'进入'+item.cdgName">
                                <div class="dealer-pic">
                                    <img :src="item.faceUrl" :alt="item.faceUrl"/>
                                </div><!-- 车商图片 -->
                                <div class="dealer-con">
                                    <h4 class="name">{{item.cdgName}}</h4>
                                    <div class="address">{{item.address}}</div>
                                    <div class="onsale">{{item.carCount}}辆在售</div>
                                </div><!-- 内容 -->
                            </router-link>
                        </li>
                    </template>
                </ul>
            </div><!-- 下部分 -->

        </div>
	</div><!-- 汽车信息盒子 -->
</template>

<script>
    
	export default {
        name: "starDealer",
        // 注册组件
        components:{

        },
        // 数据
        data() {
            return{
                
            }
        },
        props:{
            // 车商信息
            dealerInfo: {
                type: Object,
                default(){
                    return {
                        topThree: [],
                        normal: []
                    };
                }
            },
        },
        //数据侦听
        watch:{

        },
        created(){
            
        },
        mounted(){

        },
        // 自定义函数(方法)
        methods: {
            
        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .m-lst-con
        width 948px
        height 632px
        .u-part.top
            height 292px
            margin 0 0 18px
            .dealer-list
                width 948px
                .item
                    width 306px
                    height 292px
                    float left
                    background #fff
                    &:not(:last-child)
                        margin-right 15px
                    .dealer-inner
                        width @width - 32px
                        height @height - 32px - 28px
                        position relative
                        padding 30px 16px
                        .dealer-pic
                            width 130px
                            height 130px
                            _imgwrap()
                            margin 0 auto
                        .dealer-con
                            text-align center
                            .name
                                height 32px
                                line-height 32px
                                color #ac17f8
                                font-size 16px
                                font-weight normal
                                margin-top 12px
                            .address
                                line-height 20px
                                padding 4px 0
                                font-size 12px
                                color #999
                            .onsale
                                height 28px
                                line-height 28px
                                color #44B0DA
                                font-size 14px
                        &:hover
                            _boxShadow(15px,rgba(0,0,0,.1),-2px,4px)
                    .u-box
                        _display()
                        width 100%
                        height 100%
        .u-part.bottom
            width 948px
            height 322px
            .dealer-list
                width 948px + 14px
                .item
                    width 467px
                    height 154px
                    float left
                    position relative
                    margin 0 14px 14px 0
                    background #fff
                    .u-box
                        _display()
                        width 467px - 205px
                        padding 0 0 0 205px
                        height 100%
                        position relative
                    .dealer-pic
                        width 100px
                        height 100px
                        position absolute
                        top 27px
                        left 85px
                        _imgwrap()
                    .dealer-con
                        width 262px - 22px
                        height 154px - 44px
                        padding 22px 0
                        position relative
                        .name
                            height 30px
                            line-height @height
                            color #ac17f8
                            font-weight normal
                            font-size 16px
                            _ellipsis(1)
                        .address
                            max-height 40px
                            line-height 20px
                            font-size 12px
                            padding 4px 0
                            color #aaa
                            _ellipsis(2)
                        .onsale
                            height 28px
                            line-height @height
                            color #44B0DA
                    &:hover
                        _boxShadow(15px,rgba(0,0,0,.1),-2px,4px)

</style>
