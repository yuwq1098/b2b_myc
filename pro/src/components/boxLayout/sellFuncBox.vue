<template>
	<div class="sellFuncBox">
	    <div class="m-lst-con">
            <ul class="m-lst f__clearfix">
                <template v-for="(item,index) in dataList">
                    <li class="u-item" :class="'u-item0'+(index + 1)">
                        <a href="javascript:;" class="u-lk" v-if="!item.pathUrl">
                            <div class="u-txt">{{item.lkTarget}}
                                <i class="iconfont icon-enter"></i></div>
                        </a>
                        <router-link :to="item.pathUrl" v-if="item.pathUrl" tag="a" class="u-lk">
                            <div class="u-txt">{{item.lkTarget}}
                                <i class="iconfont icon-enter"></i></div>
                        </router-link>
                    </li>    
                </template>
            </ul>
        </div>
		
	</div><!-- 汽车信息盒子 -->
</template>

<script>

	export default {
        name: "sellFuncBox",
        // 数据
        props:{
            dataList: Array,
        },
        data() {
            return{
                
            }
        },
        mounted(){
            
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
    .m-lst-con
        padding 5px 0 25px
        width 1200px
        .m-lst
            width 1216px
            .u-item
                float left
                background #e2e2e2
                height 194px
                width 288px
                margin-right 16px
                position relative
                for n in 1..4
                    &.u-item0{n}
                        background: url('../../assets/img/sell-step'+n+'.jpg') 0 0 no-repeat;
                        background-size 100% 100%
                .u-lk
                    width @width
                    height @height
                    _display()
                .u-txt
                    width 56px
                    text-align right
                    padding-right 13px
                    height 15px
                    line-height 15px
                    font-size 12px
                    _spacingPlus()
                    _completeCenter(18px,,auto,20px)
                    color $c_blue
                    .iconfont
                        font-size 14px
                        _completeCenter(auto,0)

</style>
