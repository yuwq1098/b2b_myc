<!--  
 **  @description 车源管理父容器组件
 --> 

 <template>
    <div class="sourceCon">
        <div class="m-manage-con">
            <slot name="content">

            </slot>
            <div class="m-more" v-show="isShowMore">
                <a href="javascript:;" class="u-lk" v-if="!isNotMore">获取更多...</a>
                <p u="u-txt" v-if="isNotMore">没有更多了~</p>
            </div>
        </div>
    </div>
</template>

<script>

    export default {

        name: "sourceCon",
        // 在当前模块注册组件
        components:{

        },
        // 数据
        data() {
            return{
                
            }
        },
        props:{
        	// 是否到底了(是否没有更多)
            isNotMore:{
                type: Boolean,
                default: false,
            },
            // 是否显示更多
            isShowMore:{
                type: Boolean,
                default: false,
            },
        },
        // 自定义函数(方法)
        methods: {
            
        },    
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .m-manage-con
        width 100%
        min-height 420px
        margin 15px 0 0
        .m-more
            margin 30px 0 0
            padding 0 0 45px
            height 42px
            line-height 42px
            text-align center
            position relative
            .u-lk
                _display(inline-block)
                height 40px
                line-height @height
                padding 0 50px
                font-size 16px
                color #4B5861
                _borderAll(#4B5861)
                _spacingPlus(3px)
                _borderRadius(21px)
                &:hover
                    color #2f98e2
                    _borderAll(#2f98e2)

        
</style>
