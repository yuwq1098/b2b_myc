<!--  
 **  @description 平台特色服务盒子组件
 --> 

<template>
	<div class="serverBox">
        <div class="m-svr-box">
            <ul class="m-svr-lst f__clearfix">
                <template v-for="item in serverItems">
                    <li class="u-item">
                        <div class="u-pic">
                            <img :src="item.imgUrl" :alt="item.title" />
                        </div>
                        <div class="u-tit">{{item.title}}</div>
                        <div class="u-desc">{{item.desc}}</div>
                    </li>
                </template>
            </ul>
        </div>
	</div>
</template>

<script>
    
    // 平台特色服务的本地数据
    import {serverItems} from 'api/localJson/home.js'
	export default {
        name: "serverBox",
        // 数据
        data() {
            return{
                serverItems: serverItems,
            }
        },
        props:{
            
        },
        created(){

        },
        mounted(){

        },
        activated(){
            
        },
        deactivated(){

        },
        // 自定义函数(方法)
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
    .m-svr-box
        width 1200px - 30px
        padding 15px
        .m-svr-lst
            height 150px
            width 1176px
            margin-left -9px
            .u-item
                float left
                width 156px
                height 150px - 15px
                margin-left 12px
                padding-top 15px
                .u-pic
                    width 62px
                    height 62px
                    _imgwrap()
                    margin 0 auto
                .u-tit
                    text-align center
                    height 24px
                    line-height 22px
                    font-size 14px
                    _spacingPlus(2px)
                    color $c_blue
                    margin 12px 0 0
                .u-desc
                    font-size 12px
                    margin 5px 0 0
                    line-height 20px
                    text-align center
                    color #959595
</style>
