<!--  
 **  @description 更多网站功能 - 侧边栏
 --> 

 <template>
    <div id="aside">
        <aside class="m-aside-box">
            <header class="m-hd">
                <div class="tit">{{sideTitle}}</div>
            </header>
            <ul class="aside-lst">
                <template v-for="item in sideMenu">
                	<li class="u-item">
	                    <a href="javascript:;" class="u-lk"
                            v-if="!item.hash">{{item.title}}</a>
                        <router-link class="u-lk"
                            :to="item.hash"
                            v-if="item.hash" tag="a">
                            {{item.title}}
                        </router-link>
	                </li>
                </template>
            </ul>
        </aside><!-- 侧边栏 -->    
    </div>
</template>


<script>
    
	export default {
        name: "aside",
        // 在当前模块注册组件
        components:{
            
        },
        // 数据
        data() {
            return{
                
            }
        },
        props:{
            sideTitle:String,
            sideMenu:Array,
        },
        // 生命周期被创建时
        created() {

        },
        // 切换回本组件时
        activated() {

        },
        //退出的生命周期钩子
        deactivated(){
            
        },
        // 属性计算
        computed:{

        },
        //数据侦听
        watch:{

        },
        // 自定义函数(方法)
        methods: {
             
        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .m-aside-box
        width 210px
        min-height 380px
        background #fff
        .m-hd
            width 100%
            height 71px
            background url('../../../../assets/img/about-label.png') center top no-repeat
            position relative
            top -7px
            .tit
                text-align center
                font-size 18px
                color #fff
                height 50px
                line-height @height
                _spacingPlus(2px)
        .aside-lst
            width @width
            _border(top,#ededed)
            .u-item
                width @width
                height 54px
                line-height @height
                _border(bottom,#ededed)
                text-align left
                font-size 14px
                color #7a7f86
                .u-lk
                    _display()
                    width @width - 68px
                    height 100%
                    padding 0 0 0 68px
                    position relative
                    &:hover
                        color $c_blue
                    &.router-link-active
                        color $c_blue
                        &:before
                            content ""
                            _display()
                            width 7px
                            height @height
                            background $c_blue
                            _completeCenter(-4px,auto,auto,0)
</style>
