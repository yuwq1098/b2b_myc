<template>
	<div class="memberCon">
        <div class="m-member-mn">
            <div class="m-member-hd">
                <p class="tit">{{title}}</p>
            </div>
            <div class="m-member-con">
                <div class="m-crumbs-wrap" v-if="!isMemberHome">
                    <div class="m-crumbs-bar f__clearfix">
                        <router-link :to="{path:'/member/home'}" class="u-lk" tag="a">
                            <i class="i-home iconfont icon-htmal5icon06"></i>
                        </router-link>
                        <template v-for="item in crumbItems">
                            <router-link :to="item.path" class="u-lk">
                                {{item.pathName}}
                            </router-link>    
                        </template>
                    </div>
                </div><!-- 会员中心面包屑 -->

                <slot name="content">
                    <!-- 页面内容 -->
                </slot>
                <div class="m-safety-con" v-if="isSafety">
                    <slot name="safety">
                        <!-- 安全中心页面内容 -->
                    </slot>
                </div>
                
            </div>
        </div>
	</div>
</template>

<script>

    // 数据hash匹配
    import {crumbsHash} from "api/localJson/crumbItems.js"

	export default {
        name: "memberCon",
        // 数据
        data() {
            return{
                isMemberHome: false,
                crumbItems: [],
            }
        },
        props:{
            title:{
                type: String,
                default: "页面标题",
            },
            isSafety:{
                type: Boolean,
                default: false,
            }

        },
        //生命周期,该组件被创建的时候
        created(){
            this._getCrumbs();
        },
        activated(){
            this._getCrumbs();
        },
        //退出的生命周期钩子
        deactivated(){

        },
        // 自定义函数(方法)
        methods: {

            // 获取面包屑
            _getCrumbs(){
                if(this.$router.currentRoute.path=="/member/home"){
                    this.isMemberHome = true;
                }
                this.crumbItems = crumbsHash[this.$router.currentRoute.path];
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
    .m-member-mn
        width 980px
        color #40474A
        .m-member-hd
            width @width
            height 54px
            line-height 52px
            background #E5E8Eb
            .tit
                _display(inline-block)
                font-size 18px
                font-weight bold
                _spacingPlus(3px)
                padding 0 18px
                position relative
                &:before
                    _display()
                    content ""
                    height 3px
                    background #2F98E2
                    _completeCenter(0,-4px,auto,-2px)

        .m-member-con
            width @width - 2px
            _borderAll(#E7EaEd)
            margin-top 15px
            min-height 550px
            background #fff
            .m-safety-con
                margin 30px 40px 40px
        .m-crumbs-wrap
            padding 15px 15px 0
            .m-crumbs-bar
                height 34px
                line-height 34px
                position relative
                _border(bottom,#e2e2e2)
                .u-lk
                    min-width 14px
                    float left
                    height 26px
                    line-height 26px
                    margin 2px 0 0
                    font-size 13px
                    _display(block)
                    background #53AEEF
                    color #f0f0f0
                    padding 0 8px
                    margin 0 10px 0 0
                    position relative
                    _spacingPlus()
                    .i-home
                        _display()
                        width 20px
                        text-align center
                        height 20px
                        line-height 20px
                        font-size 18px
                        _completeCenter(,,1px)


</style>
